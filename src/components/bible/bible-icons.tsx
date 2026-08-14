type IconProps = { className?: string };

/* Thin-line iconography for the Bible system — 1.5 stroke, rounded caps. */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ScrollIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2V4Z" />
    <path d="M6 4a2 2 0 0 0-2 2v1h2" />
    <path d="M9 9h7M9 12.5h7M9 16h4" />
  </svg>
);

export const CodexIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 6.5C10.5 5 8.4 4.4 5 4.6v13c3.4-.2 5.5.4 7 1.9 1.5-1.5 3.6-2.1 7-1.9v-13c-3.4-.2-5.5.4-7 1.9Z" />
    <path d="M12 6.5V19.5" />
  </svg>
);

export const NoteIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 5.5A1.5 1.5 0 0 1 6.5 4h8L19 8.5v10A1.5 1.5 0 0 1 17.5 20h-11A1.5 1.5 0 0 1 5 18.5v-13Z" />
    <path d="M14 4v5h5M8.5 13h7M8.5 16.2h4.5" />
  </svg>
);

export const StarIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 4.5l2.2 4.6 5 .7-3.6 3.5.85 5-4.45-2.4-4.45 2.4.85-5L4.8 9.8l5-.7L12 4.5Z" />
  </svg>
);

export const HistoryIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 7v5l3.5 2" />
    <path d="M20 12a8 8 0 1 1-2.6-5.9" />
    <path d="M20 4v3.2h-3.2" />
  </svg>
);

export const HighlightIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M8 15.5 4.8 12.3a1.5 1.5 0 0 1 0-2.1l6.6-6.6a1.5 1.5 0 0 1 2.1 0l3.9 3.9a1.5 1.5 0 0 1 0 2.1L10.8 16.2 8 15.5Z" />
    <path d="M5 20h14" />
  </svg>
);

export const PathIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M7 20V9a3 3 0 0 1 3-3h5" />
    <circle cx="7" cy="20" r="1.4" />
    <path d="M13 4.5 16.5 6 13 7.5" />
    <path d="M17 20h-3a3 3 0 0 1-3-3" />
  </svg>
);

export const StatsIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 19V5" />
    <path d="M5 19h14" />
    <path d="M9 19v-6M13 19v-9M17 19v-4" />
  </svg>
);

export const GridIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="4" y="4" width="7" height="7" rx="2" />
    <rect x="13" y="4" width="7" height="7" rx="2" />
    <rect x="4" y="13" width="7" height="7" rx="2" />
    <rect x="13" y="13" width="7" height="7" rx="2" />
  </svg>
);

export const ListIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M9 6.5h11M9 12h11M9 17.5h11" />
    <path d="M4.5 6.5h.01M4.5 12h.01M4.5 17.5h.01" />
  </svg>
);

export const SearchGlyph = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="11" cy="11" r="6" />
    <path d="M15.6 15.6 20 20" />
  </svg>
);

export const TypeIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 7V5h9v2M8.5 5v14M6.5 19h4" />
    <path d="M14 12v-1.5h6V12M17 10.5V19M15.5 19h3" />
  </svg>
);

export const NightIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5Z" />
  </svg>
);

export const AudioIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 10v4M9 7.5v9M13 5v14M17 8.5v7M21 11v2" />
  </svg>
);

export const ShareGlyph = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="17.5" cy="6" r="2.2" />
    <circle cx="6.5" cy="12" r="2.2" />
    <circle cx="17.5" cy="18" r="2.2" />
    <path d="M8.6 10.9 15.4 7.1M8.6 13.1l6.8 3.8" />
  </svg>
);

export const CheckGlyph = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 12.5 9.5 17 19 7" />
  </svg>
);

export const ArrowIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);
