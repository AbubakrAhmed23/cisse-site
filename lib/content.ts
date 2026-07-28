import { unstable_cache } from 'next/cache';
import { getSupabase } from './supabase';

/** Supabase'deki tek satırın anahtarı. */
export const CONTENT_KEY = 'overrides';

/** revalidateTag ile bu etiketi temizleyince içerik anında tazelenir. */
export const CONTENT_TAG = 'site-content';

export type Overrides = Record<string, any>;

/** Panelden düzenlenen içeriğin iki dilli hali. */
export type ContentDoc = {
  tr: Overrides;
  en: Overrides;
};

export const EMPTY_DOC: ContentDoc = { tr: {}, en: {} };

/**
 * Nesneleri derin birleştirir. Diziler birleştirilmez, tamamen değiştirilir —
 * paket özellikleri veya yorum listesi silinince gerçekten silinmeli.
 */
export function deepMerge<T>(base: T, override: any): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(override)) return override as unknown as T;
  if (typeof override !== 'object') return override as T;
  if (typeof base !== 'object' || base === null || Array.isArray(base)) {
    return override as T;
  }

  const out: any = { ...base };
  for (const [k, v] of Object.entries(override)) {
    out[k] = k in (base as any) ? deepMerge((base as any)[k], v) : v;
  }
  return out as T;
}

async function fetchDoc(): Promise<ContentDoc> {
  const supabase = getSupabase();
  if (!supabase) return EMPTY_DOC;

  const { data, error } = await supabase
    .from('site_content')
    .select('data')
    .eq('key', CONTENT_KEY)
    .maybeSingle();

  // Hata durumunda siteyi düşürmüyoruz — varsayılan JSON içeriğiyle devam eder.
  if (error) {
    console.error('[content] Supabase okuma hatası:', error.message);
    return EMPTY_DOC;
  }

  const doc = data?.data as Partial<ContentDoc> | undefined;
  return { tr: doc?.tr ?? {}, en: doc?.en ?? {} };
}

/**
 * Panelden yapılan değişiklikleri getirir. Sonuç önbelleğe alınır; panel kayıt
 * ettiğinde revalidateTag(CONTENT_TAG) ile anında geçersiz kılınır.
 */
export const getOverrides = unstable_cache(fetchDoc, ['site-content-overrides'], {
  tags: [CONTENT_TAG],
});

/** Önbelleği baypas ederek okur — admin panelinin form verisi için. */
export const getOverridesFresh = fetchDoc;
