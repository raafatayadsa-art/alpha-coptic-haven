type IconProps = { className?: string };

/**
 * Katameros glyph set — thin, hand-drawn liturgical line icons.
 * Presentation only; each icon inherits currentColor.
 */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const CenserIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 2.5v2M9.5 6.5 12 4.8l2.5 1.7" />
    <path d="M6.5 10.5h11l-1 5.5a4.6 4.6 0 0 1-4.5 3.5 4.6 4.6 0 0 1-4.5-3.5Z" />
    <path d="M8 10.5V8.6h8v1.9M10 21.5h4" />
  </svg>
);

export const ChaliceIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M6.5 4h11l-1.2 5.4A4.6 4.6 0 0 1 12 13a4.6 4.6 0 0 1-4.3-3.6Z" />
    <path d="M12 13v5.5M8.5 21h7M9.5 18.5h5" />
  </svg>
);

export const LampIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 3c1.9 2.4 3.2 4.1 3.2 6a3.2 3.2 0 0 1-6.4 0c0-1.9 1.3-3.6 3.2-6Z" />
    <path d="M12 12.2v3.3M8.5 18.5h7l-1 3h-5Z" />
  </svg>
);

export const CalendarGlyph = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="3.5" />
    <path d="M3.5 10h17M8 3.5v3M16 3.5v3M8.5 14h3" />
  </svg>
);

export const FeastStarIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 3.2l1.9 4.6 4.9.4-3.7 3.2 1.1 4.8L12 13.7l-4.2 2.5 1.1-4.8L5.2 8.2l4.9-.4Z" />
    <path d="M12 17.5v3.3" />
  </svg>
);

export const EpistleIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.6" />
    <path d="M4.5 7l7.5 5.5L19.5 7" />
  </svg>
);

export const PraxisIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 4.5h9.5a3 3 0 0 1 3 3v12H8a3 3 0 0 1-3-3Z" />
    <path d="M8 8.5h6.5M8 12h6.5M8 15.5h4" />
  </svg>
);

export const PsalmIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M9 17.5V6.2l8-1.7v11" />
    <circle cx="6.8" cy="17.8" r="2.3" />
    <circle cx="14.8" cy="15.6" r="2.3" />
  </svg>
);

export const GospelIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 5.5h6.2A1.8 1.8 0 0 1 12 7.3v12a1.6 1.6 0 0 0-1.6-1.6H4Z" />
    <path d="M20 5.5h-6.2A1.8 1.8 0 0 0 12 7.3v12a1.6 1.6 0 0 1 1.6-1.6H20Z" />
    <path d="M16.4 9v3.4M14.9 10.4h3" />
  </svg>
);

export const SearchGlass = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="11" cy="11" r="6.4" />
    <path d="M15.8 15.8 20.5 20.5" />
  </svg>
);

export const ArrowGlyph = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const HeadphonesIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4.5 14v-2a7.5 7.5 0 0 1 15 0v2" />
    <rect x="3" y="13.5" width="4" height="6.5" rx="2" />
    <rect x="17" y="13.5" width="4" height="6.5" rx="2" />
  </svg>
);

export const BookmarkGlyph = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M6.5 4.5h11v15l-5.5-3.8-5.5 3.8Z" />
  </svg>
);

export const ShareGlyph = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="17.5" cy="6" r="2.6" />
    <circle cx="6.5" cy="12" r="2.6" />
    <circle cx="17.5" cy="18" r="2.6" />
    <path d="M9 10.7 15 7.4M9 13.3l6 3.3" />
  </svg>
);

export const TextSizeGlyph = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 19 9.5 5.5 15 19M6.2 14.6h6.6M17 19V11.5M14.4 11.5h5.2" />
  </svg>
);
