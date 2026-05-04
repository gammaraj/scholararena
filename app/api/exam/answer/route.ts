import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { saveAnswer } from '@/lib/orqe-data';

const schema = z.object({
  sessionId: z.string().uuid(),
  questionId: z.string().uuid(),
  selectedOption: z.enum(['a', 'b', 'c', 'd']).nullable(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    await saveAnswer(parsed.data);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[/api/exam/answer]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
