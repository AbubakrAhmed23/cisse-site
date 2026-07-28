'use client';

import { useTranslations } from 'next-intl';
import { Instagram, Youtube } from 'lucide-react';

/**
 * Instagram / YouTube ikonları.
 * Linkler admin panelinden düzenlenir; boş bırakılan ikon gösterilmez.
 */
export default function SocialLinks({
  className = '',
  size = 'md',
}: {
  className?: string;
  size?: 'md' | 'lg';
}) {
  const t = useTranslations('social');

  const links = [
    { href: t('instagram'), label: 'Instagram', Icon: Instagram },
    { href: t('youtube'), label: 'YouTube', Icon: Youtube },
  ].filter((l) => l.href);

  if (links.length === 0) return null;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`grid place-items-center rounded-full border border-gold/30 bg-gold/10 text-gold transition-all hover:scale-110 hover:border-gold/60 hover:bg-gold/20 ${
            size === 'lg' ? 'h-11 w-11' : 'h-9 w-9'
          }`}
        >
          <Icon className={size === 'lg' ? 'h-5 w-5' : 'h-[18px] w-[18px]'} />
        </a>
      ))}
    </div>
  );
}
