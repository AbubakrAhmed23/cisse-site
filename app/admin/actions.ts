'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidateTag, revalidatePath } from 'next/cache';
import { getSupabase } from '@/lib/supabase';
import { CONTENT_KEY, CONTENT_TAG, type ContentDoc } from '@/lib/content';
import { SESSION_COOKIE, createSession } from '@/lib/auth';
import { verifyPassword } from '@/lib/password';

export type ActionState = { error?: string; ok?: boolean; savedAt?: string };

/** Şifreyi doğrular ve oturum çerezini kurar. */
export async function login(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const password = String(formData.get('password') ?? '');
  const stored = process.env.ADMIN_PASSWORD_HASH;

  if (!stored || stored === 'BURAYA_HASH_GELECEK') {
    return { error: 'Sunucuda admin şifresi tanımlı değil.' };
  }

  if (!password) return { error: 'Şifre girin.' };

  // Kaba kuvvet denemelerini biraz yavaşlatır.
  await new Promise((r) => setTimeout(r, 400));

  if (!(await verifyPassword(password, stored))) {
    return { error: 'Şifre hatalı.' };
  }

  const { token, maxAge } = await createSession();
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  });

  redirect('/admin');
}

export async function logout() {
  cookies().delete(SESSION_COOKIE);
  redirect('/admin/login');
}

/** Panelden gelen içeriği Supabase'e yazar ve siteyi anında tazeler. */
export async function saveContent(doc: ContentDoc): Promise<ActionState> {
  const token = cookies().get(SESSION_COOKIE)?.value;
  const { verifySession } = await import('@/lib/auth');
  if (!(await verifySession(token))) {
    return { error: 'Oturum süresi doldu. Sayfayı yenileyip tekrar girin.' };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return { error: 'Supabase bağlantısı yapılandırılmamış (SUPABASE_URL eksik).' };
  }

  const { error } = await supabase
    .from('site_content')
    .upsert(
      { key: CONTENT_KEY, data: doc, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    );

  if (error) {
    return { error: `Kaydedilemedi: ${error.message}` };
  }

  // Önbelleği temizle — değişiklik sitede anında görünür.
  revalidateTag(CONTENT_TAG);
  revalidatePath('/', 'layout');

  return { ok: true, savedAt: new Date().toISOString() };
}
