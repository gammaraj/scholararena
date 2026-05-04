'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SUBJECT_LABELS } from '@/lib/orqe-types';
import type { OrqeSubject } from '@/lib/orqe-types';

export default function AlreadyQualifiedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const subject = (searchParams.get('subject') ?? 'science') as OrqeSubject;
  const label = SUBJECT_LABELS[subject] ?? subject;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg text-center">
        <CardHeader>
          <div className="text-5xl mb-3">✅</div>
          <CardTitle className="text-xl text-blue-700 font-bold">
            You&apos;ve Already Qualified!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            You have already passed the <strong>{label}</strong> qualifying exam.
            Your registration is confirmed!
          </p>
          <p className="text-gray-500 text-sm">
            Want to try qualifying in another subject?
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {(['science', 'history', 'geography'] as OrqeSubject[])
              .filter((s) => s !== subject)
              .map((s) => (
                <Button key={s} variant="outline" size="sm" onClick={() => router.push('/exam')}>
                  {SUBJECT_LABELS[s]}
                </Button>
              ))}
          </div>
          <Button className="w-full mt-2" onClick={() => router.push('/parent/register')}>
            Go to Registration →
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
