import { NextRequest, NextResponse } from 'next/server';
import { getAllSessions } from '@/lib/orqe-data';
import type { OrqeSubject } from '@/lib/orqe-types';

export async function GET(req: NextRequest) {
  try {
    const subject = req.nextUrl.searchParams.get('subject') as OrqeSubject | null;
    const sessions = await getAllSessions(subject ?? undefined);
    return NextResponse.json(sessions);
  } catch (err) {
    console.error('[/api/admin/orqe/sessions]', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
