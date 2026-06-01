'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { waLink } from '@/lib/whatsapp';
import ValueIcons from './ValueIcons';

export default function Hero() {
  const t = useTranslations('hero');
  const ref = useRef<HTMLElement>(null);

  // Fare pozisyonu (-0.5..0.5) → hafif 3D parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 120, damping: 24 };

  const imgX = useSpring(useTransform(mx, [-0.5, 0.5], [-24, 24]), spring);
  const imgY = useSpring(useTransform(my, [-0.5, 0.5], [-18, 18]), spring);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-3.5, 3.5]), spring);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), spring);
  // Rozetler ters yönde → öne çıkma hissi
  const badgeX = useTransform(mx, [-0.5, 0.5], [16, -16]);
  const badgeY = useTransform(my, [-0.5, 0.5], [12, -12]);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <>
      <section
        ref={ref}
        id="home"
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="relative flex min-h-[100svh] items-center overflow-hidden [perspective:1400px]"
      >
        {/* Tam ekran fotoğraf — fareyle hafif 3D parallax */}
        <motion.div
          style={{ x: imgX, y: imgY, rotateX, rotateY }}
          className="absolute -inset-[6%] -z-20 [transform-style:preserve-3d]"
        >
          <Image
            src="/images/herofoto.png"
            alt="Calisthenix"
            fill
            priority
            sizes="100vw"
            className="scale-110 object-cover object-[50%_28%] sm:scale-100 sm:object-[60%_25%]"
          />
        </motion.div>

        {/* Karartma katmanları — parktaki ekipman hafif görünsün, metin okunsun */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-ink-950/35" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/55 to-transparent" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />

        {/* İçerik */}
        <div className="mx-auto w-full max-w-7xl px-5 pt-24 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold backdrop-blur-sm">
              {t('eyebrow')}
            </span>

            <h1 className="mt-6">
              <span className="display block text-6xl leading-[0.92] text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)] sm:text-7xl lg:text-8xl">
                {t('titleTop')}
              </span>
              <span className="display block text-6xl leading-[0.92] text-gradient-gold sm:text-7xl lg:text-8xl">
                {t('titleHighlight')}
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base text-zinc-200 drop-shadow sm:text-lg">
              {t('subtitle')}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={waLink(t('whatsappMessage'))}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-ink-950 shadow-lg shadow-gold/25 transition-transform hover:scale-[1.03]"
              >
                {t('ctaPrimary')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#packages"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-gold/50 hover:text-gold"
              >
                {t('ctaSecondary')}
              </a>
            </div>
          </motion.div>
        </div>

        {/* Havada duran istatistik rozetleri (sağda) */}
        <motion.div
          style={{ x: badgeX, y: badgeY }}
          className="pointer-events-none absolute bottom-28 right-5 hidden flex-col gap-3 sm:right-8 lg:flex"
        >
          {[
            { value: '5+', label: t('badgeExperience') },
            { value: '200+', label: t('badgeStudents') },
            { value: '7/24', label: t('badgeSupport') },
          ].map((b) => (
            <div
              key={b.label}
              className="rounded-2xl border border-white/10 bg-ink-900/70 px-5 py-3 shadow-xl backdrop-blur-md"
            >
              <div className="display text-2xl text-gold">{b.value}</div>
              <div className="text-[11px] font-medium text-zinc-200">{b.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Aşağı kaydır göstergesi */}
        <a
          href="#training"
          aria-label="scroll"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 transition-colors hover:text-gold"
        >
          <ChevronDown className="h-7 w-7 animate-bounce" />
        </a>
      </section>

      {/* Değer ikonları */}
      <ValueIcons />
    </>
  );
}
