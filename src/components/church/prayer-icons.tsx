/**
 * Thin line icons for the Agpeya hours — same language as icons.tsx
 * (24px grid, 1.4 stroke, round caps).
 */
type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const SunIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 3.2v2M12 19v1.8M3.4 12h2M18.8 12h1.8M6 6l1.4 1.4M16.7 16.7 18 18M18 6l-1.3 1.4M7.4 16.7 6 18" />
  </svg>
);

export const SunsetIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4.4 18.2h15.2" />
    <path d="M7.8 14.4a4.2 4.2 0 0 1 8.4 0" />
    <path d="M12 3.6v3.2M12 10.4 9.9 8.3M12 10.4l2.1-2.1M4.6 11.4l1.4 1.2M19.4 11.4 18 12.6" />
  </svg>
);

export const MoonIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M19.2 15.4A7.8 7.8 0 0 1 9 5.1a7.8 7.8 0 1 0 10.2 10.3Z" />
  </svg>
);

export const MoonStarIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M18 15.6A7.4 7.4 0 0 1 8.4 6a7.4 7.4 0 1 0 9.6 9.6Z" />
    <path d="M17.6 3.6v3.2M16 5.2h3.2" />
  </svg>
);

export const BookOpenIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 7.2C10.4 5.9 8.4 5.3 5.4 5.4v11.4c3-.1 5 .5 6.6 1.8 1.6-1.3 3.6-1.9 6.6-1.8V5.4c-3-.1-5 .5-6.6 1.8Z" />
    <path d="M12 7.2v11.4" />
  </svg>
);

export const NoteIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="9.4" cy="17" r="2.9" />
    <path d="M12.3 17V5.4c2 .3 3.4 1.3 4.3 3" />
  </svg>
);

export const SparkleIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M10 4.6l1.5 3.7 3.7 1.5-3.7 1.5L10 15l-1.5-3.7L4.8 9.8l3.7-1.5L10 4.6Z" />
    <path d="M17.6 14v3.4M15.9 15.7h3.4" />
  </svg>
);

export const CreedShieldIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 3.8l6.4 2.3v5.2c0 3.8-2.5 7-6.4 8.9-3.9-1.9-6.4-5.1-6.4-8.9V6.1L12 3.8Z" />
  </svg>
);
