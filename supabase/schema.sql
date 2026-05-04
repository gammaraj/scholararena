-- ============================================================
-- ScholarArena ORQE — Supabase Schema
-- Run this in the Supabase SQL editor on a fresh project
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ─── Enums ────────────────────────────────────────────────────────────────────

create type orqe_subject as enum ('science', 'history', 'geography');
create type orqe_grade_band as enum ('4th_under', '5th_6th', '7th_8th', '9th_12th');
create type orqe_attempt_type as enum ('first', 'second_chance');

-- ─── Tables ───────────────────────────────────────────────────────────────────

-- One row per subject × grade_band × attempt_type
create table exams (
  id                  uuid primary key default gen_random_uuid(),
  subject             orqe_subject not null,
  grade_band          orqe_grade_band not null,
  attempt_type        orqe_attempt_type not null default 'first',
  time_limit_minutes  int not null default 20,
  pass_threshold      numeric not null default 0.70,
  open_at             timestamptz,    -- null = always open
  close_at            timestamptz,
  active              boolean not null default false,
  created_at          timestamptz default now(),
  unique (subject, grade_band, attempt_type)
);

-- 50 questions per exam
create table questions (
  id              uuid primary key default gen_random_uuid(),
  exam_id         uuid not null references exams(id) on delete cascade,
  position        int not null check (position between 1 and 50),
  prompt          text not null,
  image_url       text,
  option_a        text not null,
  option_b        text not null,
  option_c        text not null,
  option_d        text not null,
  correct_option  char(1) not null check (correct_option in ('a','b','c','d')),
  topic           text,   -- e.g. 'Biology', 'Chemistry', 'Astronomy', 'Earth Science', 'Physics', 'Math'
  unique (exam_id, position)
);

-- One session per student attempt
create table exam_sessions (
  id              uuid primary key default gen_random_uuid(),
  exam_id         uuid not null references exams(id),
  student_name    text not null,
  student_email   text not null,
  student_grade   int not null,
  started_at      timestamptz not null default now(),
  submitted_at    timestamptz,
  score           int,
  passed          boolean,
  override_passed boolean not null default false,
  attempt_number  int not null default 1
);

-- One row per question per session — upserted on answer change
create table student_answers (
  id               uuid primary key default gen_random_uuid(),
  session_id       uuid not null references exam_sessions(id) on delete cascade,
  question_id      uuid not null references questions(id),
  selected_option  char(1) check (selected_option in ('a','b','c','d')),
  updated_at       timestamptz default now(),
  unique (session_id, question_id)
);

-- ─── Row Level Security ───────────────────────────────────────────────────────

alter table exams           enable row level security;
alter table questions       enable row level security;
alter table exam_sessions   enable row level security;
alter table student_answers enable row level security;

-- Public: read active exams
create policy "public read active exams"
  on exams for select using (active = true);

-- Public: read questions for active exams
create policy "public read questions for active exams"
  on questions for select
  using (exists (
    select 1 from exams e where e.id = exam_id and e.active = true
  ));

-- Public: insert a session (student starting exam)
create policy "public insert session"
  on exam_sessions for insert with check (true);

-- Public: read any session (needed to show result page by session id)
create policy "public read session"
  on exam_sessions for select using (true);

-- Public: update session (submit)
create policy "public update session"
  on exam_sessions for update using (true);

-- Public: full access to student_answers (write as you go, read own)
create policy "public manage answers"
  on student_answers for all using (true);

-- NOTE: Admin full access is via service role key (bypasses RLS) — used
-- in server-side API routes only. Never expose service role key to client.

-- ─── Indexes ──────────────────────────────────────────────────────────────────

create index idx_sessions_email on exam_sessions(student_email);
create index idx_sessions_exam   on exam_sessions(exam_id);
create index idx_answers_session on student_answers(session_id);

-- ─── Helper: grade grading function (server-side, uses service role) ─────────

create or replace function grade_exam_session(p_session_id uuid)
returns table(score int, passed boolean) as $$
declare
  v_exam_id         uuid;
  v_pass_threshold  numeric;
  v_total           int;
  v_correct         int;
  v_score           int;
  v_passed          boolean;
begin
  -- Get exam config
  select es.exam_id, e.pass_threshold
    into v_exam_id, v_pass_threshold
    from exam_sessions es
    join exams e on e.id = es.exam_id
    where es.id = p_session_id;

  -- Count total questions
  select count(*) into v_total from questions where exam_id = v_exam_id;

  -- Count correct answers
  select count(*) into v_correct
    from student_answers sa
    join questions q on q.id = sa.question_id
    where sa.session_id = p_session_id
      and sa.selected_option = q.correct_option;

  v_score  := v_correct;
  v_passed := (v_correct::numeric / v_total) >= v_pass_threshold;

  -- Write results back
  update exam_sessions
    set score = v_score,
        passed = v_passed,
        submitted_at = coalesce(submitted_at, now())
    where id = p_session_id;

  return query select v_score, v_passed;
end;
$$ language plpgsql security definer;
