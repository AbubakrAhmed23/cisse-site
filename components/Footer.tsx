'use client';

import { useTranslations } from 'next-intl';
import { waLink } from '@/lib/whatsapp';
import {
  Dumbbell,
  ShieldCheck,
  RotateCcw,
  Infinity as InfinityIcon,
  Headphones,
  Instagram,
  Youtube,
} from 'lucide-react';

const NAV_LINKS = ['training', 'about', 'packages', 'testimonials', 'faq'] as const;

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tBrand = useTranslations('brand');
  const tWa = useTranslations('whatsapp');

  const trust = [
    { icon: ShieldCheck, label: t('trust.secure') },
    { icon: RotateCcw, label: t('trust.refund') },
    { icon: InfinityIcon, label: t('trust.lifetime') },
    { icon: Headphones, label: t('trust.support') },
  ];

  return (
    <footer className="border-t border-white/5 bg-ink-900">
      {/* Güven rozetleri bandı */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 border-b border-white/5 px-5 py-8 sm:px-8 md:grid-cols-4">
        {trust.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon className="h-6 w-6 shrink-0 text-gold" strokeWidth={1.75} />
            <span className="text-sm font-medium text-zinc-300">{label}</span>
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-3">
        {/* Marka */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gold/15 text-gold ring-1 ring-gold/30">
              <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="display text-lg tracking-wide text-white">
                {tBrand('name')}
              </span>
              <span className="text-[9px] font-semibold tracking-[0.25em] text-gold/80">
                {tBrand('tagline')}
              </span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-zinc-400">{t('tagline')}</p>
        </div>

        {/* Menü */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            {t('navTitle')}
          </h4>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a
                  href={`#${l}`}
                  className="text-sm text-zinc-400 transition-colors hover:text-gold"
                >
                  {tNav(l)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">
            {t('contactTitle')}
          </h4>
          <a
            href={waLink(tWa('defaultMessage'))}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
          >
            WhatsApp
          </a>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-300 transition-colors hover:border-gold/40 hover:text-gold"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-300 transition-colors hover:border-gold/40 hover:text-gold"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-5 py-6 text-center text-xs text-zinc-500 sm:px-8">
        © 2026 {tBrand('name')}. {t('rights')}
      </div>
    </footer>
  );
}
