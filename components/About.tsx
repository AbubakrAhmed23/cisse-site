'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function About() {
  const t = useTranslations('about');

  const stats = [
    { value: t('statYears'), label: t('statYearsLabel') },
    { value: t('statStudents'), label: t('statStudentsLabel') },
    { value: t('statRating'), label: t('statRatingLabel') },
  ];

  return (
    <section id="about" className="border-y border-white/5 bg-ink-900/40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
        {/* Görsel */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gold/10 blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
            <Image
              src="/images/foto.png"
              alt="Calisthenix"
              fill
              sizes="(max-width: 1024px) 90vw, 40rem"
              className="object-cover object-[50%_22%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />
          </div>
        </motion.div>

        {/* Metin */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
            {t('eyebrow')}
          </span>
          <h2 className="display mt-3 text-4xl text-white sm:text-5xl">
            {t('heading')}
          </h2>
          <p className="mt-5 text-zinc-400">{t('p1')}</p>
          <p className="mt-4 text-zinc-400">{t('p2')}</p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="display text-3xl text-gold sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-xs text-zinc-400">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
