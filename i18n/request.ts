import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { getOverrides, deepMerge } from '../lib/content';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const defaults = (await import(`../messages/${locale}.json`)).default;

  // Admin panelinden yapılan düzenlemeler varsayılan metinlerin üzerine yazılır.
  // Supabase kurulu değilse veya kayıt yoksa boş nesne döner, site aynen çalışır.
  const overrides = await getOverrides();
  const messages = deepMerge(defaults, overrides[locale as 'tr' | 'en'] ?? {});

  return { locale, messages };
});
