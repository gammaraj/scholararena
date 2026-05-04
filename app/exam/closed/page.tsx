'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExamClosedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg text-center">
        <CardHeader>
          <div className="text-5xl mb-3">🔒</div>
          <CardTitle className="text-xl text-gray-700 font-bold">
            Exam Window Not Available
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            The exam is not currently open. Please check with your teacher or event coordinator
            for the scheduled exam date and time.
          </p>
          <Button variant="outline" onClick={() => router.push('/exam')}>
            Back to Start
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
