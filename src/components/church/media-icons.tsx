/**
 * Additional thin line icons for the Church Profile screen.
 * Same visual language as icons.tsx: 24px grid, 1.4 stroke, round caps.
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

export const SearchIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="11" cy="11" r="6.25" />
    <path d="M15.6 15.6 20 20" />
  </svg>
);

export const HomeIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 10.2 12 4l8 6.2V19a1.2 1.2 0 0 1-1.2 1.2h-3.4V15a1 1 0 0 0-1-1h-2.8a1 1 0 0 0-1 1v5.2H5.2A1.2 1.2 0 0 1 4 19v-8.8Z" />
  </svg>
);

export const ChurchIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 3v3.4M10.4 4.6h3.2" />
    <path d="M12 6.4 6.8 10v10.2h10.4V10L12 6.4Z" />
    <path d="M10.4 20.2v-4.1a1.6 1.6 0 0 1 3.2 0v4.1" />
  </svg>
);

export const LibraryIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 5.4h4.2a1.8 1.8 0 0 1 1.8 1.8v11.4a1.4 1.4 0 0 0-1.4-1.4H5V5.4Z" />
    <path d="M19 5.4h-4.2A1.8 1.8 0 0 0 13 7.2v11.4a1.4 1.4 0 0 1 1.4-1.4H19V5.4Z" />
  </svg>
);

export const AudioIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M5 13.6v-3.2M9 16.4V7.6M13 19V5M17 16.4V7.6M21 13.6v-3.2" />
  </svg>
);

export const VideoIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3.2" y="6" width="12.6" height="12" rx="3" />
    <path d="M15.8 12.8l3.5 2.4a.9.9 0 0 0 1.5-.75V9.55a.9.9 0 0 0-1.5-.75l-3.5 2.4v1.6Z" />
  </svg>
);

export const GalleryIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3.4" y="4.6" width="17.2" height="14.8" rx="3.2" />
    <circle cx="9" cy="10" r="1.5" />
    <path d="m4.4 17.4 4.3-4a1.6 1.6 0 0 1 2.2.05L15 17.4M14.2 14.4l1.6-1.5a1.6 1.6 0 0 1 2.2.05l2.5 2.4" />
  </svg>
);

export const PostIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="4" y="4.4" width="16" height="15.2" rx="3.2" />
    <path d="M7.6 9.4h8.8M7.6 12.6h8.8M7.6 15.8h5.4" />
  </svg>
);

export const InfoIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M12 11v5.2" />
    <circle cx="12" cy="8.2" r=".65" fill="currentColor" stroke="none" />
  </svg>
);

export const PlayIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M9.4 7.9v8.2a.8.8 0 0 0 1.22.68l6.4-4.1a.8.8 0 0 0 0-1.36l-6.4-4.1a.8.8 0 0 0-1.22.68Z" />
  </svg>
);

export const DownloadIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 4.6v9.6M8.6 11.2 12 14.6l3.4-3.4" />
    <path d="M5 16.6v1.2a1.6 1.6 0 0 0 1.6 1.6h10.8a1.6 1.6 0 0 0 1.6-1.6v-1.2" />
  </svg>
);

export const PagesIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M7.4 4.6h6.2L18 9v10.4H7.4V4.6Z" />
    <path d="M13.4 4.8V9H18" />
  </svg>
);

export const ClockIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M12 7.8V12l3 1.8" />
  </svg>
);

export const LockIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="5.4" y="10.4" width="13.2" height="9.2" rx="3" />
    <path d="M8.6 10.4V8.2a3.4 3.4 0 0 1 6.8 0v2.2" />
  </svg>
);

export const GlobeIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="12" r="8.2" />
    <path d="M3.9 12h16.2M12 3.8c2.1 2.3 3.2 5.1 3.2 8.2s-1.1 5.9-3.2 8.2c-2.1-2.3-3.2-5.1-3.2-8.2S9.9 6.1 12 3.8Z" />
  </svg>
);

export const MailIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3.6" y="5.6" width="16.8" height="12.8" rx="3" />
    <path d="m5.4 8.4 5.7 4a1.6 1.6 0 0 0 1.8 0l5.7-4" />
  </svg>
);

export const PersonIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="8.4" r="3.6" />
    <path d="M5.2 19.4a6.8 6.8 0 0 1 13.6 0" />
  </svg>
);

export const PlusIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 5.6v12.8M5.6 12h12.8" />
  </svg>
);

export const RetryIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M19 12a7 7 0 1 1-2.3-5.2" />
    <path d="M19.2 4.6v3.4h-3.4" />
  </svg>
);

export const CheckIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="m6.4 12.4 3.6 3.5 7.6-7.8" />
  </svg>
);
