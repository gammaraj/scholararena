import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { setOverridePassed } from '@/lib/orqe-data';
import { requireAdminAuth } from '@/lib/admin-auth';

const schema = z.object({
  sessionId: z.string().uuid(),
  value: z.boolean(),
});

export async function POST(req: NextRequest) {
  const authError = requireAdminAuth(req);
  if (authError) return authError;

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    await setOverridePassed(parsed.data.sessionId, parsed.data.value);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[/api/admin/orqe/override]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
