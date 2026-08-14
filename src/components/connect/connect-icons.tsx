/** Hand-drawn glyph set for Alpha Connect. Presentation only. */

type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function MicGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="9" y="2.6" width="6" height="11" rx="3" />
      <path d="M5.5 11.4a6.5 6.5 0 0 0 13 0" />
      <path d="M12 18v3.4M8.6 21.4h6.8" />
    </svg>
  );
}

export function WaveGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M3 12h1.6M7 8.6v6.8M10.6 5.6v12.8M14.2 8v8M17.8 10.4v3.2M21 12h-.4" />
    </svg>
  );
}

export function ChannelGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 9.6 15 5.2v13.6L4 14.4V9.6Z" />
      <path d="M18.4 8.6a5 5 0 0 1 0 6.8" />
      <path d="M20.8 6a8.4 8.4 0 0 1 0 12" />
    </svg>
  );
}

export function ChatGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 6.6A2.6 2.6 0 0 1 6.6 4h10.8A2.6 2.6 0 0 1 20 6.6v7.2a2.6 2.6 0 0 1-2.6 2.6H10l-4.4 3.4v-3.4H6.6A2.6 2.6 0 0 1 4 13.8V6.6Z" />
      <path d="M8.4 9h7.2M8.4 12h4.8" />
    </svg>
  );
}

export function SearchGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.4" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function BellGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M6.6 10.6a5.4 5.4 0 0 1 10.8 0c0 4 1.4 5.4 1.4 5.4H5.2s1.4-1.4 1.4-5.4Z" />
      <path d="M10 19a2.2 2.2 0 0 0 4 0" />
    </svg>
  );
}

export function PlusGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 5.6v12.8M5.6 12h12.8" />
    </svg>
  );
}

export function QrGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.6" y="3.6" width="6.2" height="6.2" rx="1.6" />
      <rect x="14.2" y="3.6" width="6.2" height="6.2" rx="1.6" />
      <rect x="3.6" y="14.2" width="6.2" height="6.2" rx="1.6" />
      <path d="M14.4 14.4h2.4v2.4h-2.4zM19.2 19.2h1.2M14.4 20.4h2.4" />
    </svg>
  );
}

export function GearGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.4v2.2M12 18.4v2.2M4.9 7.9l1.9 1.1M17.2 15l1.9 1.1M4.9 16.1 6.8 15M17.2 9l1.9-1.1" />
    </svg>
  );
}

export function UsersGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="9.4" cy="9" r="3.4" />
      <path d="M3.6 19.4c.9-3 3.1-4.6 5.8-4.6s4.9 1.6 5.8 4.6" />
      <path d="M16 6.2a3.2 3.2 0 0 1 0 5.8M17.6 14.8c1.6.7 2.6 2.2 3 4.6" />
    </svg>
  );
}

export function PlayGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9 6.8 17.4 12 9 17.2V6.8Z" />
    </svg>
  );
}

export function PauseGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9.4 6v12M14.6 6v12" />
    </svg>
  );
}

export function ChevronGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="m9.5 5.5 6.5 6.5-6.5 6.5" />
    </svg>
  );
}

export function BackGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M14.5 5.5 8 12l6.5 6.5" />
    </svg>
  );
}

export function SignalGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4.6 18.4v-3M9.7 18.4v-6.4M14.8 18.4V8M19.9 18.4V4.4" />
    </svg>
  );
}

export function ShieldLockGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3.4 19 6v6c0 4.2-3 7.2-7 8.6-4-1.4-7-4.4-7-8.6V6l7-2.6Z" />
      <path d="M12 10.4v3.4" />
    </svg>
  );
}

export function ClockGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.6V12l3 1.8" />
    </svg>
  );
}

export function PaletteGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 20.4a8.4 8.4 0 1 1 8.4-8.4c0 2.5-2 3.2-3.6 3.2h-1.6a2 2 0 0 0-1.4 3.4c.5.7 0 1.8-1.8 1.8Z" />
      <path d="M8.4 9.6h.01M11.4 7.4h.01M14.8 8.8h.01" strokeWidth="2.2" />
    </svg>
  );
}

export function DatabaseGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <ellipse cx="12" cy="6.4" rx="7" ry="2.8" />
      <path d="M5 6.4v11.2c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8V6.4" />
      <path d="M5 12c0 1.6 3.1 2.8 7 2.8s7-1.2 7-2.8" />
    </svg>
  );
}

export function InfoGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 11v5.2M12 8h.01" strokeWidth="2" />
    </svg>
  );
}

export function LockGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="5" y="10.4" width="14" height="9.4" rx="2.6" />
      <path d="M8.4 10.4V8a3.6 3.6 0 0 1 7.2 0v2.4" />
    </svg>
  );
}

export function TimerGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9 3h6M12 3v3.4" />
      <circle cx="12" cy="13.6" r="6.6" />
      <path d="M12 11v3l2 1.4" />
    </svg>
  );
}

export function ShareGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 15.6V4.4M8.4 7.8 12 4.2l3.6 3.6" />
      <path d="M5.4 13.4v4.4a2 2 0 0 0 2 2h9.2a2 2 0 0 0 2-2v-4.4" />
    </svg>
  );
}

export function TrashGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M5.4 7.4h13.2M9.4 7.4V5.6h5.2v1.8" />
      <path d="M7 7.4l.9 11.2a1.8 1.8 0 0 0 1.8 1.6h4.6a1.8 1.8 0 0 0 1.8-1.6L17 7.4" />
    </svg>
  );
}

export function CheckGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="m5.6 12.6 4 4 8.8-9.2" />
    </svg>
  );
}

export function HeadsetGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4.6 14.6v-2.4a7.4 7.4 0 0 1 14.8 0v2.4" />
      <rect x="2.8" y="13.4" width="4" height="6" rx="2" />
      <rect x="17.2" y="13.4" width="4" height="6" rx="2" />
      <path d="M19.4 19.4c0 1.4-1.6 2.2-3.8 2.2" />
    </svg>
  );
}

/* Channel avatar glyphs (icon picker + channel rows) */

export function ChurchGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 2.6v4M10 4.6h4" />
      <path d="M5 20.4v-8L12 8l7 4.4v8" />
      <path d="M10 20.4v-4.2h4v4.2" />
    </svg>
  );
}

export function FamilyGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="2.6" />
      <circle cx="16" cy="8" r="2.6" />
      <path d="M3.6 19.4c.6-2.6 2.3-4 4.4-4s3.8 1.4 4.4 4M12.6 19.4c.6-2.6 2.3-4 4.4-4s3.8 1.4 4.4 4" />
    </svg>
  );
}

export function BookGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4.6 5.4A2 2 0 0 1 6.6 3.4H19v15.2H6.6a2 2 0 0 0-2 2V5.4Z" />
      <path d="M12 6.4v9" />
    </svg>
  );
}

export function GroupGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="7.6" r="3" />
      <circle cx="6" cy="15" r="2.6" />
      <circle cx="18" cy="15" r="2.6" />
      <path d="M8.6 20.4c.6-1.8 1.8-2.8 3.4-2.8s2.8 1 3.4 2.8" />
    </svg>
  );
}

export function YouthGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3.4 13.9 8l5 .4-3.8 3.3 1.2 4.9L12 14l-4.3 2.6 1.2-4.9L5.1 8.4l5-.4L12 3.4Z" />
      <path d="M8 20.4h8" />
    </svg>
  );
}

export function ChoirGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9 17.4V6.6l8-1.6v10.6" />
      <circle cx="6.6" cy="17.8" r="2.4" />
      <circle cx="14.6" cy="15.8" r="2.4" />
    </svg>
  );
}

export function ServiceGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3.4v17.2M6.6 8.6h10.8" />
      <path d="M4.6 20.6h14.8" />
    </svg>
  );
}
