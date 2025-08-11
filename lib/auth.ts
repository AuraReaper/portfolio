import { NextRequest } from 'next/server';

// Simple admin authentication
// In production, use a proper auth system like NextAuth.js
export const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD || 'your-secure-password-here';

export function isAuthenticated(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');

  if (!authHeader) {
    return false;
  }

  // Check for Basic Auth
  const [type, credentials] = authHeader.split(' ');

  if (type !== 'Basic' || !credentials) {
    return false;
  }

  const decoded = Buffer.from(credentials, 'base64').toString('utf-8');
  const [username, password] = decoded.split(':');

  return username === 'admin' && password === ADMIN_PASSWORD;
}

export function createAuthResponse(): Response {
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Admin Area"',
    },
  });
}
