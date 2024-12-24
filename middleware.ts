// middleware.ts
import { NextResponse } from 'next/server';
import { isAuthenticated,  } from './lib/auth';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest): Promise<Response | undefined> {
  const isAuth = await isAuthenticated();
  const pathname = request.nextUrl.pathname;

  // Check if the user is trying to access a protected route
  if (pathname.startsWith('/(protected)') && !isAuth) {
    const newUrl = new URL('/(auth)/signin', request.url);
    newUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(newUrl);
  }

  // Check if the user is trying to access an auth route while authenticated
  if (pathname.startsWith('/(auth)') && isAuth) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
