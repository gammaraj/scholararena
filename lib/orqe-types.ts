// ORQE — Online Regional Qualifying Exam types

export type OrqeSubject = 'science' | 'history' | 'geography';
export type OrqeGradeBand = '4th_under' | '5th_6th' | '7th_8th' | '9th_12th';
export type OrqeAttemptType = 'first' | 'second_chance';
export type AnswerOption = 'a' | 'b' | 'c' | 'd';

export const GRADE_BAND_LABELS: Record<OrqeGradeBand, string> = {
  '4th_under': '4th Grade & Under',
  '5th_6th':   '5th–6th Grade',
  '7th_8th':   '7th–8th Grade',
  '9th_12th':  '9th–12th Grade',
};

export const SUBJECT_LABELS: Record<OrqeSubject, string> = {
  science:   'Science',
  history:   'History',
  geography: 'Geography',
};

/** Map a raw grade number to a grade band */
export function gradeToGradeBand(grade: number): OrqeGradeBand | null {
  if (grade >= 1 && grade <= 4)  return '4th_under';
  if (grade >= 5 && grade <= 6)  return '5th_6th';
  if (grade >= 7 && grade <= 8)  return '7th_8th';
  if (grade >= 9 && grade <= 12) return '9th_12th';
  return null;
}

// ─── Database row shapes (mirrors Supabase tables) ───────────────────────────

export interface DbExam {
  id: string;
  subject: OrqeSubject;
  grade_band: OrqeGradeBand;
  attempt_type: OrqeAttemptType;
  time_limit_minutes: number;
  pass_threshold: number;  // e.g. 0.70
  open_at: string | null;  // ISO timestamp
  close_at: string | null;
  active: boolean;
  created_at: string;
}

export interface DbQuestion {
  id: string;
  exam_id: string;
  position: number;
  prompt: string;
  image_url: string | null;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  // correct_option is NOT returned to client — server-side only
}

export interface DbExamSession {
  id: string;
  exam_id: string;
  student_name: string;
  student_email: string;
  student_grade: number;
  started_at: string;
  submitted_at: string | null;
  score: number | null;
  passed: boolean | null;
  override_passed: boolean;
  attempt_number: number;
}

export interface DbStudentAnswer {
  id: string;
  session_id: string;
  question_id: string;
  selected_option: AnswerOption | null;
  updated_at: string;
}

// ─── Application-level types ──────────────────────────────────────────────────

/** Question as sent to the client (no correct_option) */
export interface ClientQuestion {
  id: string;
  position: number;
  prompt: string;
  image_url: string | null;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
}

/** In-memory answer map: question_id → selected option */
export type AnswerMap = Record<string, AnswerOption | null>;

/** Payload sent to start an exam session */
export interface StartExamPayload {
  subject: OrqeSubject;
  grade: number;        // raw grade — server resolves grade_band
  studentName: string;
  studentEmail: string;
}

/** Response from POST /api/exam/start */
export interface StartExamResponse {
  sessionId: string;
  exam: {
    id: string;
    timeLimitMinutes: number;
    totalQuestions: number;
  };
  questions: ClientQuestion[];
  startedAt: string;  // ISO timestamp — client uses this as timer reference
}

/** Payload to save a single answer (called on each answer change) */
export interface SaveAnswerPayload {
  sessionId: string;
  questionId: string;
  selectedOption: AnswerOption | null;
}

/** Payload to submit the exam */
export interface SubmitExamPayload {
  sessionId: string;
  answers: AnswerMap;  // full answer map sent on final submit as backup
}

/** Response from POST /api/exam/submit */
export interface SubmitExamResponse {
  score: number;
  totalQuestions: number;
  passed: boolean;
  passThreshold: number;
}

/** Exam window status */
export type ExamWindowStatus = 'open' | 'not_yet_open' | 'closed' | 'not_found';

/** Result of checking exam availability */
export interface ExamAvailability {
  status: ExamWindowStatus;
  examId?: string;
  alreadyQualified?: boolean;
}

// ─── Admin types ──────────────────────────────────────────────────────────────

export interface AdminSessionRow {
  id: string;
  studentName: string;
  studentEmail: string;
  studentGrade: number;
  subject: OrqeSubject;
  gradeBand: OrqeGradeBand;
  startedAt: string;
  submittedAt: string | null;
  score: number | null;
  passed: boolean | null;
  overridePassed: boolean;
  attemptNumber: number;
}
