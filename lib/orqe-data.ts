/**
 * ORQE Data Layer
 * All Supabase queries are centralised here. API routes call these functions.
 * Supports Supabase or local Postgres backend for testing.
 */
import { getAdminClient, getSupabaseClient } from './supabase';
import { query } from './postgres';
import type {
  DbExam,
  DbExamSession,
  ClientQuestion,
  OrqeSubject,
  OrqeGradeBand,
  OrqeAttemptType,
  AnswerOption,
  AnswerMap,
  ExamAvailability,
  AdminSessionRow,
} from './orqe-types';
import { gradeToGradeBand } from './orqe-types';

// Use the postgres.ts backend whenever DATABASE_URL is set (production + local dev),
// or when explicitly opted in via ORQE_DATA_BACKEND=local-postgres.
const useLocalPostgres =
  !!process.env.DATABASE_URL ||
  process.env.ORQE_DATA_BACKEND === 'local-postgres';

// ─── Exam availability ────────────────────────────────────────────────────────

/**
 * Check whether an exam is available for a student.
 * Returns the exam id if open, or a status string indicating why not.
 */
export async function checkExamAvailability(
  subject: OrqeSubject,
  grade: number,
  email: string,
  attemptType: OrqeAttemptType = 'first',
): Promise<ExamAvailability> {
  const gradeBand = gradeToGradeBand(grade);
  if (!gradeBand) return { status: 'not_found' };

  if (useLocalPostgres) {
    const examResult = await query<Pick<DbExam, 'id' | 'open_at' | 'close_at' | 'active'>>(
      `
      select id, open_at, close_at, active
      from exams
      where subject = $1
        and grade_band = $2
        and attempt_type = $3
        and active = true
      limit 1
      `,
      [subject, gradeBand, attemptType],
    );

    const exam = examResult.rows[0];
    if (!exam) return { status: 'not_found' };

    const now = new Date();
    if (exam.open_at && now < new Date(exam.open_at)) return { status: 'not_yet_open' };
    if (exam.close_at && now > new Date(exam.close_at)) return { status: 'closed' };

    if (attemptType === 'first') {
      const existingResult = await query<Pick<DbExamSession, 'id' | 'passed' | 'override_passed'>>(
        `
        select id, passed, override_passed
        from exam_sessions
        where exam_id = $1 and student_email = $2
        order by started_at desc
        limit 1
        `,
        [exam.id, email.toLowerCase()],
      );
      const existing = existingResult.rows[0];
      if (existing && (existing.passed || existing.override_passed)) {
        return { status: 'open', examId: exam.id, alreadyQualified: true };
      }
    }

    return { status: 'open', examId: exam.id };
  }

  const supabase = getSupabaseClient();
  const now = new Date().toISOString();
  const { data: exam, error } = await supabase
    .from('exams')
    .select('id, open_at, close_at, active')
    .eq('subject', subject)
    .eq('grade_band', gradeBand)
    .eq('attempt_type', attemptType)
    .eq('active', true)
    .single<Pick<DbExam, 'id' | 'open_at' | 'close_at' | 'active'>>();

  if (error || !exam) return { status: 'not_found' };

  if (exam.open_at && now < exam.open_at) return { status: 'not_yet_open' };
  if (exam.close_at && now > exam.close_at) return { status: 'closed' };

  if (attemptType === 'first') {
    const { data: existing } = await supabase
      .from('exam_sessions')
      .select('id, passed, override_passed')
      .eq('exam_id', exam.id)
      .eq('student_email', email.toLowerCase())
      .single<Pick<DbExamSession, 'id' | 'passed' | 'override_passed'>>();

    if (existing && (existing.passed || existing.override_passed)) {
      return { status: 'open', examId: exam.id, alreadyQualified: true };
    }
  }

  return { status: 'open', examId: exam.id };
}

// ─── Questions ────────────────────────────────────────────────────────────────

/** Load questions for an exam — strips correct_option before returning */
export async function getClientQuestions(examId: string): Promise<ClientQuestion[]> {
  if (useLocalPostgres) {
    const result = await query<{
      id: string;
      position: number;
      prompt: string;
      image_url: string | null;
      option_a: string;
      option_b: string;
      option_c: string;
      option_d: string;
    }>(
      `
      select id, position, prompt, image_url, option_a, option_b, option_c, option_d
      from questions
      where exam_id = $1
      order by position
      `,
      [examId],
    );

    return result.rows.map((q) => ({
      id: q.id,
      position: q.position,
      prompt: q.prompt,
      image_url: q.image_url,
      options: {
        a: q.option_a,
        b: q.option_b,
        c: q.option_c,
        d: q.option_d,
      },
    }));
  }

  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('questions')
    .select('id, position, prompt, image_url, option_a, option_b, option_c, option_d')
    .eq('exam_id', examId)
    .order('position');

  if (error || !data) throw new Error('Failed to load questions');

  return data.map((q) => ({
    id: q.id,
    position: q.position,
    prompt: q.prompt,
    image_url: q.image_url ?? null,
    options: {
      a: q.option_a,
      b: q.option_b,
      c: q.option_c,
      d: q.option_d,
    },
  }));
}

// ─── Sessions ─────────────────────────────────────────────────────────────────

export async function createExamSession(params: {
  examId: string;
  studentName: string;
  studentEmail: string;
  studentGrade: number;
  attemptNumber?: number;
}): Promise<string> {
  if (useLocalPostgres) {
    const result = await query<{ id: string }>(
      `
      insert into exam_sessions (exam_id, student_name, student_email, student_grade, attempt_number)
      values ($1, $2, $3, $4, $5)
      returning id
      `,
      [
        params.examId,
        params.studentName.trim(),
        params.studentEmail.toLowerCase().trim(),
        params.studentGrade,
        params.attemptNumber ?? 1,
      ],
    );
    return result.rows[0].id;
  }

  const admin = getAdminClient();
  const { data, error } = await admin
    .from('exam_sessions')
    .insert({
      exam_id: params.examId,
      student_name: params.studentName.trim(),
      student_email: params.studentEmail.toLowerCase().trim(),
      student_grade: params.studentGrade,
      attempt_number: params.attemptNumber ?? 1,
    })
    .select('id')
    .single<{ id: string }>();

  if (error || !data) throw new Error('Failed to create exam session');
  return data.id;
}

export async function getSessionById(sessionId: string): Promise<DbExamSession | null> {
  if (useLocalPostgres) {
    const result = await query<DbExamSession>(
      'select * from exam_sessions where id = $1 limit 1',
      [sessionId],
    );
    return result.rows[0] ?? null;
  }

  const supabase = getSupabaseClient();
  const { data } = await supabase
    .from('exam_sessions')
    .select('*')
    .eq('id', sessionId)
    .single<DbExamSession>();
  return data ?? null;
}

// ─── Answers ──────────────────────────────────────────────────────────────────

/** Upsert a single answer — called on every answer change */
export async function saveAnswer(params: {
  sessionId: string;
  questionId: string;
  selectedOption: AnswerOption | null;
}): Promise<void> {
  if (useLocalPostgres) {
    await query(
      `
      insert into student_answers (session_id, question_id, selected_option, updated_at)
      values ($1, $2, $3, $4)
      on conflict (session_id, question_id)
      do update set selected_option = excluded.selected_option,
                    updated_at = excluded.updated_at
      `,
      [params.sessionId, params.questionId, params.selectedOption, new Date().toISOString()],
    );
    return;
  }

  const admin = getAdminClient();
  const { error } = await admin
    .from('student_answers')
    .upsert(
      {
        session_id: params.sessionId,
        question_id: params.questionId,
        selected_option: params.selectedOption,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'session_id,question_id' },
    );
  if (error) throw new Error('Failed to save answer');
}

// ─── Submission & grading ─────────────────────────────────────────────────────

/**
 * Flush all answers from the final client-side answer map, then grade the session.
 * Returns score and pass/fail result.
 */
export async function submitExam(params: {
  sessionId: string;
  answers: AnswerMap;
}): Promise<{ score: number; totalQuestions: number; passed: boolean; passThreshold: number; topicBreakdown: { topic: string; correct: number; total: number }[] }> {
  // 1. Get session + exam to validate it's not already submitted
  const session = await getSessionById(params.sessionId);
  if (!session) throw new Error('Session not found');
  if (session.submitted_at) throw new Error('Exam already submitted');

  if (useLocalPostgres) {
    const examResult = await query<Pick<DbExam, 'time_limit_minutes' | 'pass_threshold'>>(
      'select time_limit_minutes, pass_threshold from exams where id = $1 limit 1',
      [session.exam_id],
    );
    const exam = examResult.rows[0];
    if (!exam) throw new Error('Exam not found');

    const elapsedMs = Date.now() - new Date(session.started_at).getTime();
    const limitMs = exam.time_limit_minutes * 60 * 1000;
    if (elapsedMs > limitMs + 30_000) {
      // 30s grace window; if truly expired, we still grade what was saved
    }

    const entries = Object.entries(params.answers);
    for (const [questionId, selectedOption] of entries) {
      await query(
        `
        insert into student_answers (session_id, question_id, selected_option, updated_at)
        values ($1, $2, $3, $4)
        on conflict (session_id, question_id)
        do update set selected_option = excluded.selected_option,
                      updated_at = excluded.updated_at
        `,
        [params.sessionId, questionId, selectedOption, new Date().toISOString()],
      );
    }

    const gradeResult = await query<{ score: number; passed: boolean }>(
      'select * from grade_exam_session($1)',
      [params.sessionId],
    );
    const graded = gradeResult.rows[0];
    if (!graded) throw new Error('Grading failed');

    const countResult = await query<{ total: number }>(
      'select count(*)::int as total from questions where exam_id = $1',
      [session.exam_id],
    );

    const topicResult = await query<{ topic: string; correct: number; total: number }>(
      `
      select
        q.topic,
        count(*)::int as total,
        count(case when sa.selected_option = q.correct_option then 1 end)::int as correct
      from student_answers sa
      join questions q on q.id = sa.question_id
      where sa.session_id = $1 and q.topic is not null
      group by q.topic
      order by q.topic
      `,
      [params.sessionId],
    );

    return {
      score: graded.score,
      totalQuestions: countResult.rows[0]?.total ?? 50,
      passed: graded.passed,
      passThreshold: Number(exam.pass_threshold),
      topicBreakdown: topicResult.rows,
    };
  }

  const admin = getAdminClient();
  const supabase = getSupabaseClient();

  // 2. Check time limit hasn't been exceeded (server-side enforcement)
  const { data: exam } = await supabase
    .from('exams')
    .select('time_limit_minutes, pass_threshold')
    .eq('id', session.exam_id)
    .single<Pick<DbExam, 'time_limit_minutes' | 'pass_threshold'>>();

  if (!exam) throw new Error('Exam not found');

  const elapsedMs = Date.now() - new Date(session.started_at).getTime();
  const limitMs = exam.time_limit_minutes * 60 * 1000;
  if (elapsedMs > limitMs + 30_000) {
    // 30s grace window; if truly expired, we still grade what was saved
  }

  // 3. Flush client-side answer map to DB (catches any unsaved answers)
  const upserts = Object.entries(params.answers).map(([questionId, selectedOption]) => ({
    session_id: params.sessionId,
    question_id: questionId,
    selected_option: selectedOption,
    updated_at: new Date().toISOString(),
  }));

  if (upserts.length > 0) {
    await admin
      .from('student_answers')
      .upsert(upserts, { onConflict: 'session_id,question_id' });
  }

  // 4. Grade via database function (counts correct answers server-side)
  const { data: gradeResult, error: gradeError } = await admin
    .rpc('grade_exam_session', { p_session_id: params.sessionId });

  if (gradeError || !gradeResult?.[0]) {
    throw new Error('Grading failed');
  }

  // 5. Count total questions
  const { count: totalQuestions } = await supabase
    .from('questions')
    .select('id', { count: 'exact', head: true })
    .eq('exam_id', session.exam_id);

  // 6. Topic breakdown (join student_answers + questions via service role)
  const { data: topicRows } = await admin
    .from('student_answers')
    .select('selected_option, questions!inner(topic, correct_option)')
    .eq('session_id', params.sessionId)
    .not('questions.topic', 'is', null);

  const topicMap: Record<string, { correct: number; total: number }> = {};
  for (const row of topicRows ?? []) {
    const q = (row as any).questions;
    if (!q?.topic) continue;
    if (!topicMap[q.topic]) topicMap[q.topic] = { correct: 0, total: 0 };
    topicMap[q.topic].total++;
    if (row.selected_option === q.correct_option) topicMap[q.topic].correct++;
  }
  const topicBreakdown = Object.entries(topicMap)
    .map(([topic, v]) => ({ topic, ...v }))
    .sort((a, b) => a.topic.localeCompare(b.topic));

  return {
    score: gradeResult[0].score,
    totalQuestions: totalQuestions ?? 50,
    passed: gradeResult[0].passed,
    passThreshold: exam.pass_threshold,
    topicBreakdown,
  };
}

// ─── Admin ────────────────────────────────────────────────────────────────────

export async function getAllSessions(subject?: OrqeSubject): Promise<AdminSessionRow[]> {
  if (useLocalPostgres) {
    const values: unknown[] = [];
    let where = '';
    if (subject) {
      values.push(subject);
      where = 'where e.subject = $1';
    }

    const result = await query<{
      id: string;
      student_name: string;
      student_email: string;
      student_grade: number;
      started_at: string;
      submitted_at: string | null;
      score: number | null;
      passed: boolean | null;
      override_passed: boolean;
      attempt_number: number;
      subject: OrqeSubject;
      grade_band: OrqeGradeBand;
    }>(
      `
      select
        es.id,
        es.student_name,
        es.student_email,
        es.student_grade,
        es.started_at,
        es.submitted_at,
        es.score,
        es.passed,
        es.override_passed,
        es.attempt_number,
        e.subject,
        e.grade_band
      from exam_sessions es
      join exams e on e.id = es.exam_id
      ${where}
      order by es.started_at desc
      `,
      values,
    );

    return result.rows.map((row) => ({
      id: row.id,
      studentName: row.student_name,
      studentEmail: row.student_email,
      studentGrade: row.student_grade,
      subject: row.subject,
      gradeBand: row.grade_band,
      startedAt: row.started_at,
      submittedAt: row.submitted_at,
      score: row.score,
      passed: row.passed,
      overridePassed: row.override_passed,
      attemptNumber: row.attempt_number,
    }));
  }

  const admin = getAdminClient();

  let query = admin
    .from('exam_sessions')
    .select(`
      id,
      student_name,
      student_email,
      student_grade,
      started_at,
      submitted_at,
      score,
      passed,
      override_passed,
      attempt_number,
      exams!inner(subject, grade_band)
    `)
    .order('started_at', { ascending: false });

  if (subject) {
    query = query.eq('exams.subject', subject);
  }

  const { data, error } = await query;
  if (error) throw new Error('Failed to load sessions');

  return (data ?? []).map((row: any) => ({
    id: row.id,
    studentName: row.student_name,
    studentEmail: row.student_email,
    studentGrade: row.student_grade,
    subject: row.exams.subject as OrqeSubject,
    gradeBand: row.exams.grade_band as OrqeGradeBand,
    startedAt: row.started_at,
    submittedAt: row.submitted_at,
    score: row.score,
    passed: row.passed,
    overridePassed: row.override_passed,
    attemptNumber: row.attempt_number,
  }));
}

export async function setOverridePassed(sessionId: string, value: boolean): Promise<void> {
  if (useLocalPostgres) {
    await query('update exam_sessions set override_passed = $1 where id = $2', [value, sessionId]);
    return;
  }

  const admin = getAdminClient();
  const { error } = await admin
    .from('exam_sessions')
    .update({ override_passed: value })
    .eq('id', sessionId);
  if (error) throw new Error('Override update failed');
}

export async function setExamWindow(
  examId: string,
  openAt: string | null,
  closeAt: string | null,
  active: boolean,
): Promise<void> {
  if (useLocalPostgres) {
    await query(
      'update exams set open_at = $1, close_at = $2, active = $3 where id = $4',
      [openAt, closeAt, active, examId],
    );
    return;
  }

  const admin = getAdminClient();
  const { error } = await admin
    .from('exams')
    .update({ open_at: openAt, close_at: closeAt, active })
    .eq('id', examId);
  if (error) throw new Error('Exam window update failed');
}
