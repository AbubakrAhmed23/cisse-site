'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Flame, Activity, Target, Trophy } from 'lucide-react';

const VALUES = [
  { key: 'strength', icon: Flame },
  { key: 'endurance', icon: Activity },
  { key: 'focus', icon: Target },
  { key: 'discipline', icon: Trophy },
] as const;

export default function ValueIcons() {
  const t = useTranslations('values');

  return (
    <div className="border-y border-white/5 bg-ink-900/50">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-5 sm:px-8 lg:grid-cols-4">
        {VALUES.map(({ key, icon: Icon }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="flex items-center gap-4 py-7 lg:justify-center"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gold/10 text-gold ring-1 ring-gold/20">
              <Icon className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <div className="text-sm font-bold uppercase tracking-wide text-white">
                {t(`${key}.title`)}
              </div>
              <div className="text-xs text-zinc-400">{t(`${key}.desc`)}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
