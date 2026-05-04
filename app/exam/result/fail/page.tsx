'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultData {
  score: number;
  totalQuestions: number;
  passed: boolean;
  passThreshold: number;
}

export default function FailPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg text-center">
        <CardHeader>
          <div className="text-6xl mb-3">📚</div>
          <CardTitle className="text-2xl text-orange-700 font-bold">
            Keep Studying — You Can Do It!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {result && pct !== null && (
            <div className="bg-orange-100 rounded-xl p-4">
              <p className="text-3xl font-bold text-orange-800">
                {result.score}/{result.totalQuestions}
              </p>
              <p className="text-orange-700 text-sm mt-1">
                {pct}% — Pass threshold: {Math.round(result.passThreshold * 100)}%
                {' '}({Math.round(result.passThreshold * 100) - pct}% away from passing)
              </p>
            </div>
          )}

          <p className="text-gray-700">
            You did not reach the passing score this time. A <strong>second chance exam</strong>{' '}
            may be available — check with your teacher or coordinator for details.
          </p>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 mb-3">Try a different subject exam:</p>
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
