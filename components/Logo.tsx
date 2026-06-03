/**
 * CALISTHENIX amblemi — altın gradyanlı altıgen rozet içinde,
 * bara asılı front-lever figürü. Vektörel, her boyutta net.
 */
export default function Logo({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Cissesthenics"
    >
      <defs>
        <linearGradient id="cx-gold" x1="6" y1="3" x2="43" y2="45" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD27D" />
          <stop offset="0.55" stopColor="#F5A623" />
          <stop offset="1" stopColor="#E08C00" />
        </linearGradient>
      </defs>

      {/* Altıgen rozet */}
      <path
        d="M24 3 L43 13.5 V34.5 L24 45 L5 34.5 V13.5 Z"
        fill="#0f1012"
        stroke="url(#cx-gold)"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />

      {/* Pull-up barı */}
      <path
        d="M13.5 16 H34.5"
        stroke="url(#cx-gold)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {/* Figür: baş */}
      <circle cx="22.5" cy="21" r="2.5" fill="url(#cx-gold)" />
      {/* Kollar (bara uzanan) */}
      <path
        d="M22.5 18.6 C22.4 17.4 22.9 16.6 23.5 16.2"
        stroke="url(#cx-gold)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Gövde (front lever — yatay) */}
      <path
        d="M24.4 22.4 L33.5 25.8"
        stroke="url(#cx-gold)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Bacak uçları */}
      <path
        d="M33.5 25.8 L36 24.6 M33.5 25.8 L35.4 27.6"
        stroke="url(#cx-gold)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
