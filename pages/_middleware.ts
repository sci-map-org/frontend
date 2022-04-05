import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  if (
    process.env.NODE_ENV === 'production' &&
    req.headers.get('x-forwarded-proto') !== 'https' &&
    req.page.name !== '/api/healthcheck'
  ) {
    return NextResponse.redirect(req.url.replace('http://', 'https://'));
  } else {
    NextResponse.next();
  }
}
