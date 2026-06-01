'use client';

import { motion } from 'framer-motion';

export default function SectionHeading({
  eyebrow,
  heading,
  subheading,
  center = true,
}: {
  eyebrow: string;
  heading: string;
  subheading?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
        {eyebrow}
      </span>
      <h2 className="display mt-3 text-4xl text-white sm:text-5xl">{heading}</h2>
      {subheading && <p className="mt-4 text-zinc-400">{subheading}</p>}
    </motion.div>
  );
}
