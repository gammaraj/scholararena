import { NextRequest, NextResponse } from 'next/server';

/**
 * Validates the Authorization: Bearer <ADMIN_API_SECRET> header.
 * Returns a 401 response if missing or invalid, null if authorized.
 * Use at the top of every admin API route handler.
 */
export function requireAdminAuth(req: NextRequest): NextResponse | null {
  const secret = process.env.ADMIN_API_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Admin API not configured' }, { status: 503 });
  }

  const auth = req.headers.get('authorization');
  if (!auth || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}
