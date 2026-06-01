import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Tüm yolları eşle, dahili Next.js yolları ve statik dosyalar hariç
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
