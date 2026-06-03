'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const AREAS = [
  { key: 'foundations', img: '/images/1.jpeg', focal: 'object-[50%_22%]' },
  { key: 'statics', img: '/images/train-statics.jpg', focal: 'object-center' },
  { key: 'dynamics', img: '/images/train-dynamics.jpg', focal: 'object-center' },
  { key: 'mobility', img: '/images/train-mobility.jpg', focal: 'object-center' },
  { key: 'nutrition', img: '/images/train-nutrition.jpg', focal: 'object-center' },
  { key: 'roadmap', img: '/images/train-roadmap.jpg', focal: 'object-center' },
] as const;

export default function TrainingAreas() {
  const t = useTranslations('training');

  return (
    <section id="training" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHeading
        eyebrow={t('eyebrow')}
        heading={t('heading')}
        subheading={t('subheading')}
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {AREAS.map((area, i) => (
          <motion.article
            key={area.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            className="group relative overflow-hidden rounded-2xl ring-1 ring-white/10 transition-all duration-300 hover:ring-gold/40"
          >
            {/* Görsel — monokrom, hover'da renklenir ve hafif yakınlaşır */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={area.img}
                alt={t(`areas.${area.key}.title`)}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`object-cover ${area.focal} grayscale brightness-[0.85] transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100`}
              />
              {/* Tutarlı koyu gradyan — metin her fotoğrafta okunur */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
            </div>

            {/* İçerik — fotoğrafın üzerinde, sade */}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <div className="mb-3 h-0.5 w-8 bg-gold/80 transition-all duration-300 group-hover:w-12" />
              <h3 className="text-xl font-bold leading-tight text-white">
                {t(`areas.${area.key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300/90">
                {t(`areas.${area.key}.desc`)}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
