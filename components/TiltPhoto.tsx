'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type Badge = {
  value: string;
  label: string;
  /** köşe konumu */
  pos: 'tl' | 'tr' | 'bl' | 'br';
};

const POS: Record<Badge['pos'], string> = {
  tl: 'left-0 top-10 -translate-x-4',
  tr: 'right-0 top-24 translate-x-4',
  bl: 'left-2 bottom-24 -translate-x-3',
  br: 'right-0 bottom-12 translate-x-5',
};

export default function TiltPhoto({
  src,
  alt,
  badges = [],
}: {
  src: string;
  alt: string;
  badges?: Badge[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  // -0.5..0.5 normalize edilmiş fare pozisyonu
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 150,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 18,
  });

  // Rozetler için ters yönde hafif parallax (öne çıkma hissi)
  const badgeX = useTransform(mx, [-0.5, 0.5], [18, -18]);
  const badgeY = useTransform(my, [-0.5, 0.5], [18, -18]);

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
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative mx-auto w-full max-w-md select-none [perspective:1200px] lg:max-w-lg"
    >
      {/* Arka ışık halesi */}
      <div className="pointer-events-none absolute inset-0 -z-10 scale-110">
        <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/3 rounded-full bg-gold/20 blur-2xl" />
      </div>

      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative animate-float [transform-style:preserve-3d]"
      >
        {/* Fotoğraf çerçevesi */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-ink-700/60 to-ink-900 shadow-2xl">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 32rem"
              className="object-cover"
            />
            {/* Alt karartma — metin kontrastı / sinematik his */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
          </div>
        </div>

        {/* Havada duran istatistik rozetleri */}
        {badges.map((b) => (
          <motion.div
            key={b.pos}
            style={{ x: badgeX, y: badgeY, transform: 'translateZ(60px)' }}
            className={`absolute ${POS[b.pos]} z-10`}
          >
            <div className="rounded-2xl border border-white/10 bg-ink-900/85 px-4 py-3 shadow-xl backdrop-blur-md">
              <div className="display text-xl text-gold">{b.value}</div>
              <div className="text-[11px] font-medium text-zinc-300">{b.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
