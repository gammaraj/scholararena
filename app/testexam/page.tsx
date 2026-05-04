'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { StartExamResponse } from '@/lib/orqe-types';

/**
 * /testexam — Dev shortcut that auto-starts the 5-question History test exam
 * (7th–8th grade band) with a random test identity. No form required.
 */
export default function TestExamPage() {
  const router = useRouter();
  const [status, setStatus] = useState('Starting test exam…');

  useEffect(() => {
    const suffix = Math.random().toString(36).slice(2, 8);
    const payload = {
      subject: 'history',
      grade: 7,
      studentName: `Test Student ${suffix}`,
      studentEmail: `test-${suffix}@testexam.local`,
    };

    fetch('/api/exam/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setStatus(`Error: ${data.error ?? res.statusText}`);
          return;
        }
        const exam = data as StartExamResponse;
        sessionStorage.setItem(
          `orqe_session_${exam.sessionId}`,
          JSON.stringify({
            sessionId: exam.sessionId,
            exam: exam.exam,
            questions: exam.questions,
            startedAt: exam.startedAt,
            subject: 'history',
            gradeBand: '7th_8th',
          }),
        );
        router.replace(`/exam/history/7th_8th?session=${exam.sessionId}`);
      })
      .catch((err) => setStatus(`Network error: ${err.message}`));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-background">
      <p className="text-primary text-lg font-medium animate-pulse">{status}</p>
    </div>
  );
}
