import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { setExamWindow } from '@/lib/orqe-data';

const schema = z.object({
  examId: z.string().uuid(),
  openAt: z.string().datetime().nullable(),
  closeAt: z.string().datetime().nullable(),
  active: z.boolean(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }
    const { examId, openAt, closeAt, active } = parsed.data;
    await setExamWindow(examId, openAt, closeAt, active);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[/api/admin/orqe/window]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
