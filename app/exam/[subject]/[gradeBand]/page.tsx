'use client';

import { Suspense, useEffect, useRef, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import type { ClientQuestion, AnswerMap, AnswerOption, StartExamResponse } from '@/lib/orqe-types';

interface StoredSession {
  sessionId: string;
  exam: StartExamResponse['exam'];
  questions: ClientQuestion[];
  startedAt: string;
  subject: string;
  gradeBand: string;
}

export default function ExamPage() {
  return (
    <Suspense>
      <ExamContent />
    </Suspense>
  );
}

function ExamContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session');

  const [session, setSession] = useState<StoredSession | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [secondsLeft, setSecondsLeft] = useState<number>(20 * 60);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);

  const submittedRef = useRef(false);
  const answersRef = useRef<AnswerMap>({});

  // Keep ref in sync for use in timer callback
  useEffect(() => { answersRef.current = answers; }, [answers]);

  // Load session from sessionStorage
  useEffect(() => {
    if (!sessionId) { setLoadError('Missing session ID.'); return; }

    const raw = sessionStorage.getItem(`orqe_session_${sessionId}`);
    if (!raw) { setLoadError('Session not found. Please start the exam again.'); return; }

    try {
      const stored: StoredSession = JSON.parse(raw);
      setSession(stored);

      const elapsed = Math.floor((Date.now() - new Date(stored.startedAt).getTime()) / 1000);
      const limit = stored.exam.timeLimitMinutes * 60;
      const remaining = limit - elapsed;
      if (remaining <= 0) {
        // Time already expired — auto-submit immediately
        handleAutoSubmit(stored.sessionId, {});
      } else {
        setSecondsLeft(remaining);
      }
    } catch {
      setLoadError('Corrupted session data. Please start the exam again.');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  // Countdown timer
  useEffect(() => {
    if (!session || submittedRef.current) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!submittedRef.current) {
            handleAutoSubmit(session.sessionId, answersRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const handleAutoSubmit = useCallback(async (sid: string, currentAnswers: AnswerMap) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    await doSubmit(sid, currentAnswers);
  }, []);

  async function doSubmit(sid: string, currentAnswers: AnswerMap) {
    setSubmitting(true);
    try {
      const res = await fetch('/api/exam/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: sid, answers: currentAnswers }),
      });

      if (res.status === 409) {
        // Already submitted — redirect to result based on stored score
        router.replace(`/exam/result/pass?session=${sid}`);
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const resultPath = data.passed ? 'pass' : 'fail';
      sessionStorage.setItem(
        `orqe_result_${sid}`,
        JSON.stringify({
          score: data.score,
          totalQuestions: data.totalQuestions,
          passed: data.passed,
          passThreshold: data.passThreshold,
        }),
      );

      router.replace(`/exam/result/${resultPath}?session=${sid}`);
    } catch {
      setSubmitting(false);
      submittedRef.current = false;
    }
  }

  async function handleSelectAnswer(questionId: string, option: AnswerOption) {
    const current = answers[questionId];
    // Click same option again to deselect
    const next: AnswerOption | null = current === option ? null : option;

    setAnswers((prev) => ({ ...prev, [questionId]: next }));

    // Fire-and-forget save (best effort; final answer map sent on submit)
    fetch('/api/exam/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, questionId, selectedOption: next }),
    }).catch(() => {/* silently ignore — final submit flushes all answers */});
  }

  function handleManualSubmit() {
    if (!session || submittedRef.current) return;
    submittedRef.current = true;
    doSubmit(session.sessionId, answersRef.current);
  }

  // ── Render states ────────────────────────────────────────────────────────────

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <p className="text-destructive font-medium mb-4">{loadError}</p>
          <Button onClick={() => router.push('/exam')}>Back to Start</Button>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading exam…</p>
      </div>
    );
  }

  if (submitting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">Submitting your exam…</p>
          <p className="text-muted-foreground text-sm">Please wait, do not close this tab.</p>
        </div>
      </div>
    );
  }

  const { questions } = session;
  const answered = Object.values(answers).filter(Boolean).length;
  const total = questions.length;
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');
  const timerUrgent = secondsLeft <= 120;

  const currentQ = questions[currentIdx];
  const isLast = currentIdx === total - 1;
  const isFirst = currentIdx === 0;

  return (
    <div className="min-h-screen bg-muted">
      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-card border-b shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex flex-col min-w-0">
            <span className="font-semibold text-primary text-sm truncate">ScholarArena ORQE</span>
            <span className="text-xs text-muted-foreground">{answered}/{total} answered</span>
          </div>

          <div className={`font-mono text-xl font-bold tabular-nums ${timerUrgent ? 'text-destructive' : 'text-foreground'}`}>
            {mm}:{ss}
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="outline" disabled={submitting}>
                Submit
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Submit your exam?</AlertDialogTitle>
                <AlertDialogDescription>
                  You have answered <strong>{answered}</strong> of <strong>{total}</strong> questions.
                  {answered < total && (
                    <span className="text-accent-foreground block mt-1" style={{color:'#b87d00'}}>
                      {total - answered} question{total - answered === 1 ? '' : 's'} unanswered — they will be marked incorrect.
                    </span>
                  )}
                  Once submitted, you cannot change your answers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Go back</AlertDialogCancel>
                <AlertDialogAction onClick={handleManualSubmit}>
                  Yes, submit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Progress value={((currentIdx + 1) / total) * 100} className="h-1 rounded-none" />
      </div>

      {/* Single question */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Question counter */}
        <p className="text-xs text-muted-foreground text-right mb-3">
          Question {currentIdx + 1} of {total}
        </p>

        <QuestionCard
          question={currentQ}
          index={currentIdx}
          selected={answers[currentQ.id] ?? null}
          onSelect={(opt) => handleSelectAnswer(currentQ.id, opt)}
        />

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            disabled={isFirst}
          >
            ← Previous
          </Button>

          {isLast ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={submitting}>
                  Submit Exam ({answered}/{total} answered)
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Submit your exam?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You have answered <strong>{answered}</strong> of <strong>{total}</strong> questions.
                    {answered < total && (
                      <span className="block mt-1" style={{color:'#b87d00'}}>
                        {total - answered} unanswered question{total - answered === 1 ? '' : 's'} will be marked incorrect.
                      </span>
                    )}
                    Once submitted, you cannot change your answers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Go back</AlertDialogCancel>
                  <AlertDialogAction onClick={handleManualSubmit}>
                    Yes, submit
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button onClick={() => setCurrentIdx((i) => Math.min(total - 1, i + 1))}>
              Next →
            </Button>
          )}
        </div>

        {/* Dot navigation */}
        <div className="mt-6 flex flex-wrap justify-center gap-1.5">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setCurrentIdx(idx)}
              title={`Question ${idx + 1}${answers[q.id] ? ' (answered)' : ''}`}
              className={[
                'w-6 h-6 rounded-full text-xs font-semibold transition-all border',
                idx === currentIdx
                  ? 'bg-primary text-primary-foreground border-primary'
                  : answers[q.id]
                  ? 'bg-accent/20 text-foreground border-accent'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/40',
              ].join(' ')}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Question card component ──────────────────────────────────────────────────

interface QuestionCardProps {
  question: ClientQuestion;
  index: number;
  selected: AnswerOption | null;
  onSelect: (opt: AnswerOption) => void;
}

const OPTIONS: AnswerOption[] = ['a', 'b', 'c', 'd'];

function QuestionCard({ question, index, selected, onSelect }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
          {index + 1}
        </span>
        <p className="text-foreground leading-relaxed font-medium pt-0.5">{question.prompt}</p>
      </div>

      {question.image_url && (
        <div className="mb-4 rounded-lg overflow-hidden border bg-muted flex justify-center p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={question.image_url}
            alt={`Question ${index + 1} illustration`}
            className="max-h-64 object-contain"
          />
        </div>
      )}

      <div className="space-y-2.5">
        {OPTIONS.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={[
                'w-full text-left rounded-lg border px-4 py-3 text-sm transition-all',
                'flex items-center gap-3 cursor-pointer',
                isSelected
                  ? 'bg-primary border-primary text-primary-foreground font-semibold shadow-sm'
                  : 'bg-card border-border text-foreground hover:border-primary/60 hover:bg-primary/5',
              ].join(' ')}
            >
              <span
                className={[
                  'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold uppercase',
                  isSelected ? 'border-primary-foreground text-primary-foreground' : 'border-secondary text-secondary',
                ].join(' ')}
              >
                {opt}
              </span>
              <span>{question.options[opt]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
