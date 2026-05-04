import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { submitExam } from '@/lib/orqe-data';

const schema = z.object({
  sessionId: z.string().uuid(),
  answers: z.record(z.string().uuid(), z.enum(['a', 'b', 'c', 'd']).nullable()),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }

    const result = await submitExam(parsed.data);
    return NextResponse.json(result);
  } catch (err: any) {
    if (err?.message === 'Exam already submitted') {
      return NextResponse.json({ error: 'Exam already submitted' }, { status: 409 });
    }
    console.error('[/api/exam/submit]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
