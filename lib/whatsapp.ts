'use client';

import { useTranslations } from 'next-intl';

/**
 * WhatsApp deep-link yardımcısı.
 *
 * Numara önce içerikten (admin panelinden düzenlenebilen `whatsapp.number`),
 * o boşsa `NEXT_PUBLIC_WHATSAPP_NUMBER` env değişkeninden gelir.
 * Hangi formatta girilirse girilsin (0552..., 552..., +90 552..., 90552...)
 * uluslararası WhatsApp formatına (905XXXXXXXXX) normalize edilir.
 */
function normalizeNumber(raw?: string): string {
  let n = (raw || '').replace(/[^0-9]/g, '');
  if (!n) return '905555555555'; // numara yoksa placeholder
  // Türkiye yerel format: 0XXXXXXXXXX (11 hane, 0 ile başlar) -> 90 + ...
  if (n.length === 11 && n.startsWith('0')) {
    n = '90' + n.slice(1);
  }
  // 10 hane, 5 ile başlıyor (5XXXXXXXXX) -> ülke kodunu ekle
  else if (n.length === 10 && n.startsWith('5')) {
    n = '90' + n;
  }
  return n;
}

export function buildWaLink(number: string | undefined, message: string): string {
  return `https://wa.me/${normalizeNumber(number)}?text=${encodeURIComponent(message)}`;
}

/**
 * Client component'ler için WhatsApp linki üreten hook.
 * Numara değiştiğinde tüm butonlar otomatik güncellenir.
 */
export function useWaLink(): (message: string) => string {
  const t = useTranslations('whatsapp');
  const fromContent = t('number');
  const number = fromContent || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return (message: string) => buildWaLink(number, message);
}
