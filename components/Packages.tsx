'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { waLink } from '@/lib/whatsapp';
import SectionHeading from './SectionHeading';

const PLANS = [
  { key: 'starter', popular: false },
  { key: 'growth', popular: true },
  { key: 'pro', popular: false },
] as const;

export default function Packages() {
  const t = useTranslations('packages');

  return (
    <section id="packages" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading
        eyebrow={t('eyebrow')}
        heading={t('heading')}
        subheading={t('subheading')}
      />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {PLANS.map((plan, i) => {
          const name = t(`${plan.key}.name`);
          const features = t.raw(`${plan.key}.features`) as string[];
          const msg = t('whatsappPrefix', { package: name });

          return (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                plan.popular
                  ? 'border-gold/60 bg-gradient-to-b from-gold/[0.08] to-ink-800 shadow-2xl shadow-gold/10 lg:-mt-4 lg:mb-4'
                  : 'border-white/10 bg-ink-800'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wide text-ink-950">
                  <Star className="h-3.5 w-3.5 fill-ink-950" />
                  {t('popular')}
                </span>
              )}

              <h3 className="text-lg font-bold text-white">{name}</h3>
              <p className="mt-1 text-sm text-zinc-400">{t(`${plan.key}.tagline`)}</p>

              <div className="mt-5 flex items-end gap-1">
                <span className="display text-5xl text-white">{t(`${plan.key}.price`)}</span>
                <span className="mb-1.5 text-sm text-zinc-400">{t('perMonth')}</span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={waLink(msg)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-block rounded-full px-6 py-3.5 text-center text-sm font-bold transition-transform hover:scale-[1.03] ${
                  plan.popular
                    ? 'bg-gold text-ink-950 shadow-lg shadow-gold/25'
                    : 'border border-white/15 text-white hover:border-gold/50 hover:text-gold'
                }`}
              >
                {t('select')}
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
