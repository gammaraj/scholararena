import { NextRequest, NextResponse } from 'next/server';

// Simple in-process rate limiter for the Edge runtime.
// Limits /api/exam/start to 10 requests per IP per 60s window.
// Note: each Edge instance has its own map; this protects against
// single-instance burst abuse. For distributed rate limiting, use Upstash Redis.

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

const ipMap = new Map<string, { count: number; resetAt: number }>();

function getRateLimitHeaders(remaining: number, resetAt: number) {
  return {
    'X-RateLimit-Limit': String(MAX_REQUESTS),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset': String(Math.ceil(resetAt / 1000)),
  };
}

export function middleware(req: NextRequest) {
  // Only rate-limit exam start
  if (req.nextUrl.pathname !== '/api/exam/start') {
    return NextResponse.next();
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  const now = Date.now();
  const entry = ipMap.get(ip);

  if (!entry || now > entry.resetAt) {
    // New window
    const resetAt = now + WINDOW_MS;
    ipMap.set(ip, { count: 1, resetAt });
    const res = NextResponse.next();
    Object.entries(getRateLimitHeaders(MAX_REQUESTS - 1, resetAt)).forEach(([k, v]) =>
      res.headers.set(k, v),
    );
    return res;
  }

  entry.count += 1;

  if (entry.count > MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait before starting another exam.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)),
          ...getRateLimitHeaders(0, entry.resetAt),
        },
      },
    );
  }

  const res = NextResponse.next();
  Object.entries(getRateLimitHeaders(MAX_REQUESTS - entry.count, entry.resetAt)).forEach(([k, v]) =>
    res.headers.set(k, v),
  );
  return res;
}

export const config = {
  matcher: ['/api/exam/start'],
};
