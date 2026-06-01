'use client';

import { useTranslations } from 'next-intl';
import { waLink } from '@/lib/whatsapp';

/** WhatsApp logosu (basit inline SVG) */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16.04 4C9.88 4 4.9 8.98 4.9 15.13c0 2.17.64 4.19 1.74 5.9L4.6 28l7.16-1.87a11.1 11.1 0 0 0 4.28.85h.01c6.15 0 11.13-4.98 11.13-11.13C27.18 8.98 22.2 4 16.04 4Zm6.53 15.9c-.28.78-1.64 1.5-2.27 1.56-.6.06-1.34.09-2.16-.14-.5-.16-1.14-.37-1.96-.72-3.45-1.49-5.7-4.96-5.87-5.19-.17-.23-1.4-1.86-1.4-3.55 0-1.69.89-2.52 1.2-2.86.31-.34.69-.43.92-.43l.66.01c.21 0 .5-.08.78.6.28.69.96 2.38 1.04 2.55.09.17.14.37.03.6-.11.23-.17.37-.34.57-.17.2-.36.45-.51.6-.17.17-.35.36-.15.7.2.34.89 1.47 1.91 2.38 1.31 1.17 2.42 1.53 2.76 1.7.34.17.54.14.74-.09.2-.23.85-.99 1.08-1.33.23-.34.46-.28.78-.17.31.11 2 .94 2.34 1.11.34.17.57.26.66.4.09.15.09.86-.19 1.64Z" />
    </svg>
  );
}

export default function FloatingWhatsApp() {
  const t = useTranslations('whatsapp');

  return (
    <a
      href={waLink(t('defaultMessage'))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t('float')}
      className="group fixed bottom-5 right-5 z-50 flex items-center sm:bottom-7 sm:right-7"
    >
      {/* Pulse halkası */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/60 animate-pulse-ring" />
      <span className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 transition-transform group-hover:scale-105 sm:h-16 sm:w-16">
        <WhatsAppIcon className="h-7 w-7 sm:h-8 sm:w-8" />
      </span>
      {/* Masaüstünde hover etiketi */}
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-ink-800 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 lg:block">
        {t('float')}
      </span>
    </a>
  );
}
