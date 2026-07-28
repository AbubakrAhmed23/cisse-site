import { SignJWT, jwtVerify } from 'jose';

/** Oturum çerezinin adı. */
export const SESSION_COOKIE = 'admin_session';

/** Oturum süresi: 7 gün. */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      'AUTH_SECRET tanımlı değil veya 32 karakterden kısa. .env.local dosyasına ekleyin.'
    );
  }
  return new TextEncoder().encode(secret);
}

/** Giriş başarılı olduğunda imzalı oturum jetonu üretir. */
export async function createSession(): Promise<{ token: string; maxAge: number }> {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(getSecret());

  return { token, maxAge: MAX_AGE_SECONDS };
}

/**
 * Oturum jetonunu doğrular. Edge runtime'da (middleware) da çalışır —
 * bu yüzden burada Node'a özgü hiçbir API kullanılmıyor.
 */
export async function verifySession(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload.role === 'admin';
  } catch {
    return false;
  }
}
