/**
 * Admin panel şifresini belirler.
 *
 *   node scripts/set-password.mjs "yeni-sifre"
 *
 * Şifreyi hash'leyip .env.local içindeki ADMIN_PASSWORD_HASH satırını günceller.
 * Şifrenin kendisi hiçbir yere kaydedilmez.
 */
import { scrypt, randomBytes } from 'node:crypto';
import { promisify } from 'node:util';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const scryptAsync = promisify(scrypt);
const ENV_FILE = '.env.local';

const password = process.argv[2];

if (!password) {
  console.error('Kullanım: node scripts/set-password.mjs "yeni-sifre"');
  process.exit(1);
}

if (password.length < 8) {
  console.error('Şifre en az 8 karakter olmalı.');
  process.exit(1);
}

const salt = randomBytes(16).toString('hex');
const derived = await scryptAsync(password, salt, 64);
const hash = `${salt}:${derived.toString('hex')}`;

if (!existsSync(ENV_FILE)) {
  console.error(`${ENV_FILE} bulunamadı.`);
  process.exit(1);
}

const current = readFileSync(ENV_FILE, 'utf8');
const line = `ADMIN_PASSWORD_HASH=${hash}`;

const updated = current.includes('ADMIN_PASSWORD_HASH=')
  ? current.replace(/^ADMIN_PASSWORD_HASH=.*$/m, line)
  : `${current.trimEnd()}\n${line}\n`;

writeFileSync(ENV_FILE, updated);

console.log('✅ Şifre güncellendi.');
console.log('');
console.log('Vercel için bu değeri ortam değişkenlerine ekleyin:');
console.log(line);
