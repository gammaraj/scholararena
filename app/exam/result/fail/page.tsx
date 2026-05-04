'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultData {
  score: number;
  totalQuestions: number;
  passed: boolean;
  passThreshold: number;
  topicBreakdown: { topic: string; correct: number; total: number }[];
}

function FailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session');
  const [result, setResult] = useState<ResultData | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    const raw = sessionStorage.getItem(`orqe_result_${sessionId}`);
    if (raw) setResult(JSON.parse(raw));
  }, [sessionId]);

  const pct = result ? Math.round((result.score / result.totalQuestions) * 100) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg text-center">
        <CardHeader>
          <div className="text-6xl mb-3">📚</div>
          <CardTitle className="text-2xl text-primary font-bold">
            Keep Studying — You Can Do It!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {result && pct !== null && (
            <div className="bg-muted rounded-xl p-4 border">
              <p className="text-3xl font-bold text-foreground">
                {result.score}/{result.totalQuestions}
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                {pct}% — Pass threshold: {Math.round(result.passThreshold * 100)}%
                {' '}({Math.round(result.passThreshold * 100) - pct}% away from passing)
              </p>
            </div>
          )}

          {result && result.topicBreakdown.length > 0 && (
            <div className="text-left border rounded-lg overflow-hidden">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-3 py-2 bg-muted border-b">
                Areas to Improve
              </p>
              {result.topicBreakdown.map(({ topic, correct, total }) => {
                const pct = Math.round((correct / total) * 100);
                return (
                  <div key={topic} className="flex items-center gap-3 px-3 py-2 border-b last:border-0">
                    <span className="flex-1 text-sm text-foreground">{topic}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="w-20 h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: pct >= 70 ? '#1C3664' : '#F2A900' }}
                        />
                      </div>
                      <span className="text-xs font-mono text-muted-foreground w-12 text-right">
                        {correct}/{total}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-foreground">
            You did not reach the passing score this time. A <strong>second chance exam</strong>{' '}
            may be available — check with your teacher or coordinator for details.
          </p>

          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground mb-3">Try a different subject exam:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['science', 'history', 'geography'].map((s) => (
                <Button key={s} variant="outline" size="sm" onClick={() => router.push('/exam')}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <Button variant="ghost" size="sm" className="w-full" onClick={() => router.push('/exam')}>
            Start over
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function FailPage() {
  return (
    <Suspense>
      <FailContent />
    </Suspense>
  );
}
