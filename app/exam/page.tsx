'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { OrqeSubject, StartExamPayload, StartExamResponse } from '@/lib/orqe-types';
import { SUBJECT_LABELS } from '@/lib/orqe-types';

const SUBJECTS: OrqeSubject[] = ['science', 'history', 'geography'];
const GRADES = Array.from({ length: 12 }, (_, i) => i + 1);

export default function ExamStartPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState<OrqeSubject | ''>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !grade || !subject) {
      setError('Please fill in all fields.');
      return;
    }

    const payload: StartExamPayload = {
      studentName: name.trim(),
      studentEmail: email.trim(),
      grade: parseInt(grade, 10),
      subject: subject as OrqeSubject,
    };

    setLoading(true);
    try {
      const res = await fetch('/api/exam/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.status === 'already_qualified') {
          router.push(`/exam/already-qualified?subject=${subject}`);
          return;
        }
        if (data.status === 'not_yet_open' || data.status === 'closed') {
          router.push('/exam/closed');
          return;
        }
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      const exam = data as StartExamResponse;

      // Store session data in sessionStorage for the exam page
      sessionStorage.setItem(
        `orqe_session_${exam.sessionId}`,
        JSON.stringify({
          sessionId: exam.sessionId,
          exam: exam.exam,
          questions: exam.questions,
          startedAt: exam.startedAt,
          subject: payload.subject,
          gradeBand: resolveGradeBand(payload.grade),
        }),
      );

      router.push(`/exam/${payload.subject}/${resolveGradeBand(payload.grade)}?session=${exam.sessionId}`);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 text-4xl">🏛️</div>
          <CardTitle className="text-2xl font-bold text-primary">ScholarArena ORQE</CardTitle>
          <CardDescription>
            Online Regional Qualifying Exam — enter your details to begin
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleStart} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="e.g. Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="grade">Current Grade</Label>
              <Select value={grade} onValueChange={setGrade} disabled={loading}>
                <SelectTrigger id="grade">
                  <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                  {GRADES.map((g) => (
                    <SelectItem key={g} value={String(g)}>
                      Grade {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={subject}
                onValueChange={(v) => setSubject(v as OrqeSubject)}
                disabled={loading}
              >
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {SUBJECT_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="pt-2 space-y-3">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Starting exam…' : 'Start Exam →'}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                You will have <strong>20 minutes</strong> once the exam begins.
                You may change answers at any time before submitting.
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function resolveGradeBand(grade: number): string {
  if (grade <= 4) return '4th_under';
  if (grade <= 6) return '5th_6th';
  if (grade <= 8) return '7th_8th';
  return '9th_12th';
}
