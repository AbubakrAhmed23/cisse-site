'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { waLink } from '@/lib/whatsapp';
import { Dumbbell, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { id: 'training', key: 'training' },
  { id: 'about', key: 'about' },
  { id: 'packages', key: 'packages' },
  { id: 'testimonials', key: 'testimonials' },
  { id: 'faq', key: 'faq' },
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const tBrand = useTranslations('brand');
  const tHero = useTranslations('hero');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const switchLocale = (next: 'tr' | 'en') => {
    if (next !== locale) router.replace(pathname, { locale: next });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/5 bg-ink-950/85 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Marka */}
        <a href="#home" className="flex items-center gap-2.5">
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
        </a>

        {/* Masaüstü menü */}
        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="text-sm font-medium text-zinc-300 transition-colors hover:text-gold"
              >
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>

        {/* Sağ aksiyonlar */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center rounded-full border border-white/10 bg-white/5 p-0.5 text-xs font-semibold sm:flex">
            {(['tr', 'en'] as const).map((lng) => (
              <button
                key={lng}
                onClick={() => switchLocale(lng)}
                className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
                  locale === lng ? 'bg-gold text-ink-950' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {lng}
              </button>
            ))}
          </div>

          <a
            href={waLink(tHero('whatsappMessage'))}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink-950 shadow-lg shadow-gold/20 transition-transform hover:scale-[1.03] sm:inline-block"
          >
            {t('cta')}
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobil menü */}
      {open && (
        <div className="border-t border-white/5 bg-ink-950/95 px-5 py-4 backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-zinc-200 hover:bg-white/5 hover:text-gold"
                >
                  {t(l.key)}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-0.5 text-xs font-semibold">
              {(['tr', 'en'] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => switchLocale(lng)}
                  className={`rounded-full px-3 py-1.5 uppercase transition-colors ${
                    locale === lng ? 'bg-gold text-ink-950' : 'text-zinc-400'
                  }`}
                >
                  {lng}
                </button>
              ))}
            </div>
            <a
              href={waLink(tHero('whatsappMessage'))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-full bg-gold px-5 py-3 text-center text-sm font-bold text-ink-950"
            >
              {t('cta')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
