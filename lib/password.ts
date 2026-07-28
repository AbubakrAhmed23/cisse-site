import { scrypt, randomBytes, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keylen: number
) => Promise<Buffer>;

const KEY_LEN = 64;

/**
 * Şifreyi `salt:hash` biçiminde hash'ler. Sadece kurulum betiği kullanır —
 * çıktı ADMIN_PASSWORD_HASH env değişkenine yazılır.
 *
 * Node runtime gerektirir; middleware'den (edge) import edilmemeli.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const derived = await scryptAsync(password, salt, KEY_LEN);
  return `${salt}:${derived.toString('hex')}`;
}

/** Girilen şifreyi saklanan hash ile sabit zamanlı olarak karşılaştırır. */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;

  const derived = await scryptAsync(password, salt, KEY_LEN);
  const expected = Buffer.from(hash, 'hex');

  if (expected.length !== derived.length) return false;
  return timingSafeEqual(expected, derived);
}
