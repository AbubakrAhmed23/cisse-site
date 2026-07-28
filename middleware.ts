import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { SESSION_COOKIE, verifySession } from './lib/auth';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin paneli dil öneki almaz (/tr/admin değil, /admin) ve oturum ister.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (pathname === '/admin/login') return NextResponse.next();

    const token = request.cookies.get(SESSION_COOKIE)?.value;
    if (!(await verifySession(token))) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.search = '';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  // Tüm yolları eşle, dahili Next.js yolları ve statik dosyalar hariç
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
