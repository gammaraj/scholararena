-- ============================================================
-- ScholarArena ORQE — TEST EXAM SEED
-- History · 7th–8th Grade · 5 Questions
--
-- This is a short development/QA exam. Do NOT use in production.
-- Active = true so it can be used immediately after seeding.
-- ============================================================

-- 1. Insert the test exam row
INSERT INTO exams (id, subject, grade_band, attempt_type, time_limit_minutes, pass_threshold, active)
VALUES (
  'ee570001-1111-4000-8000-000000000001',
  'history',
  '7th_8th',
  'first',
  5,      -- 1 minute per question
  0.60,   -- 3-out-of-5 to pass
  true    -- immediately active for testing
)
ON CONFLICT (subject, grade_band, attempt_type) DO UPDATE
  SET id                 = EXCLUDED.id,
      time_limit_minutes = EXCLUDED.time_limit_minutes,
      pass_threshold     = EXCLUDED.pass_threshold,
      active             = EXCLUDED.active;

-- 2. Clear any previous questions tied to this exam id
DELETE FROM questions WHERE exam_id = 'ee570001-1111-4000-8000-000000000001';

-- 3. Insert 5 questions
DO $$
DECLARE
  v_exam_id uuid := 'ee570001-1111-4000-8000-000000000001';
BEGIN

INSERT INTO questions (exam_id, position, prompt, image_url, option_a, option_b, option_c, option_d, correct_option) VALUES

-- Q1
(v_exam_id, 1,
 'Which empire did Julius Caesar help transform Rome into, before his assassination in 44 BC?',
 NULL,
 'The Byzantine Empire', 'The Roman Republic into the Roman Empire', 'The Ottoman Empire', 'The Holy Roman Empire',
 'b'),

-- Q2
(v_exam_id, 2,
 'In what year did Christopher Columbus first reach the Americas?',
 NULL,
 '1215', '1492', '1776', '1588',
 'b'),

-- Q3
(v_exam_id, 3,
 'Which ancient wonder was located in Alexandria, Egypt?',
 NULL,
 'The Colosseum', 'The Parthenon', 'The Great Lighthouse of Alexandria', 'The Temple of Artemis',
 'c'),

-- Q4
(v_exam_id, 4,
 'The Magna Carta, signed in 1215, limited the power of which English king?',
 NULL,
 'King Richard I', 'King Henry VIII', 'King John', 'King Edward I',
 'c'),

-- Q5
(v_exam_id, 5,
 'Which civilization built Machu Picchu?',
 NULL,
 'The Aztecs', 'The Maya', 'The Inca', 'The Olmecs',
 'c');

END $$;
