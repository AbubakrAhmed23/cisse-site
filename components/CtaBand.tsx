'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useWaLink } from '@/lib/whatsapp';

export default function CtaBand() {
  const waLink = useWaLink();
  const t = useTranslations('ctaBand');

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/cta-bg.jpg')" }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/70" />

      <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="display text-4xl text-white sm:text-5xl lg:text-6xl">
            {t('heading')}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-zinc-300">{t('subheading')}</p>
          <a
            href={waLink(t('whatsappMessage'))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-base font-bold text-ink-950 shadow-xl shadow-gold/25 transition-transform hover:scale-[1.04]"
          >
            <MessageCircle className="h-5 w-5" />
            {t('button')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
