/**
 * WhatsApp deep-link yardımcısı.
 * Numara `NEXT_PUBLIC_WHATSAPP_NUMBER` env değişkeninden gelir
 * (uluslararası format, ör. 905551112233). Yoksa placeholder kullanılır.
 */
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '905555555555';

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
