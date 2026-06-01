# CALISTHENIX — Calisthenics Koçluk Web Sitesi

Sportif, sinematik (koyu + altın) tek sayfa tanıtım sitesi. Frontend ağırlıklı,
iletişim WhatsApp üzerinden. Türkçe + İngilizce.

## Teknoloji
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS, Framer Motion (animasyon + 3D tilt hero)
- next-intl (TR/EN — `/tr`, `/en`)
- lucide-react (ikonlar)

## Geliştirme
```bash
npm install
npm run dev      # http://localhost:3000  (→ /tr'ye yönlenir)
npm run build    # üretim derlemesi
```

## Yapılandırma
- **WhatsApp numarası:** `.env.local` içindeki `NEXT_PUBLIC_WHATSAPP_NUMBER`.
  Uluslararası format, ör. Türkiye için `905xxxxxxxxx` (başında + ve boşluk yok).
- **Metinler/fiyatlar:** Tüm içerik `messages/tr.json` ve `messages/en.json`
  dosyalarında. Paket fiyatları, bio, yorumlar ve SSS buradan güncellenir.
- **Görseller:** `public/images/`. Şu an telifsiz (loremflickr) yer tutucu
  fotoğraflar var.
  - `coach.jpg` → **hero'daki koç fotoğrafı**. En iyi 3D etki için arka planı
    silinmiş, dikey (3:4) yüksek çözünürlüklü bir fotoğrafla değiştir.
  - `about.jpg`, `train-*.jpg`, `hero-bg.jpg`, `cta-bg.jpg` → ilgili bölümler.

## Deploy (Vercel)
1. Projeyi bir Git deposuna koy ve Vercel'e bağla (otomatik algılar).
2. Vercel → Settings → Environment Variables: `NEXT_PUBLIC_WHATSAPP_NUMBER`.
3. Deploy. (Sunucu/DB yok; statik + CDN.)

## Notlar
- `kalastinik.png` / `vucud.png` kök dizinde tasarım referans mockup'larıdır
  (siteye dahil değil).
