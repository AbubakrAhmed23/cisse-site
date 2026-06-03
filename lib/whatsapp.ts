/**
 * WhatsApp deep-link yardımcısı.
 * Numara `NEXT_PUBLIC_WHATSAPP_NUMBER` env değişkeninden gelir.
 * Hangi formatta girilirse girilsin (0552..., 552..., +90 552..., 90552...)
 * uluslararası WhatsApp formatına (905XXXXXXXXX) normalize edilir.
 */
function normalizeNumber(raw?: string): string {
  let n = (raw || '').replace(/[^0-9]/g, '');
  if (!n) return '905555555555'; // env yoksa placeholder
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

const WHATSAPP_NUMBER = normalizeNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
