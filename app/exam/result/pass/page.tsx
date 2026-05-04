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
}

function PassContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session');
  const [result, setResult] = useState<ResultData | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    const raw = sessionStorage.getItem(`orqe_result_${sessionId}`);
    if (raw) setResult(JSON.parse(raw));
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg text-center">
        <CardHeader>
          <div className="text-6xl mb-3">🎉</div>
          <CardTitle className="text-2xl text-green-700 font-bold">
            Congratulations! You Qualified!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {result && (
            <div className="bg-green-100 rounded-xl p-4">
              <p className="text-3xl font-bold text-green-800">
                {result.score}/{result.totalQuestions}
              </p>
              <p className="text-green-700 text-sm mt-1">
                {Math.round((result.score / result.totalQuestions) * 100)}% — Pass threshold:{' '}
                {Math.round(result.passThreshold * 100)}%
              </p>
            </div>
          )}

          <p className="text-gray-700">
            You have qualified for the <strong>ScholarArena Regional Competition</strong>!
            Click below to complete your registration.
          </p>

          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            onClick={() => router.push('/parent/register')}
          >
            Register Here →
          </Button>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-500 mb-3">Want to take another subject exam?</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['science', 'history', 'geography'].map((s) => (
                <Button key={s} variant="outline" size="sm" onClick={() => router.push('/exam')}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PassPage() {
  return (
    <Suspense>
      <PassContent />
    </Suspense>
  );
}
