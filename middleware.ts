import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isAuthenticated, createAuthResponse } from './lib/auth';

export function middleware(request: NextRequest) {
  // Protect all admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!isAuthenticated(request)) {
      return createAuthResponse();
    }
  }

  // Protect admin API routes
  if (
    request.nextUrl.pathname.startsWith('/api/projects') &&
    (request.method === 'POST' ||
      request.method === 'PUT' ||
      request.method === 'DELETE')
  ) {
    if (!isAuthenticated(request)) {
      return createAuthResponse();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/projects/:path*'],
};
