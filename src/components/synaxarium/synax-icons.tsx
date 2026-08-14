/** Hand-drawn glyph set for the Synaxarium screens. Presentation only. */

type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HaloIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="12" cy="9" r="4.2" />
      <circle cx="12" cy="9" r="6.6" strokeOpacity="0.45" />
      <path d="M5.2 20c1.3-2.6 3.8-4.1 6.8-4.1s5.5 1.5 6.8 4.1" />
    </svg>
  );
}

export function PalmIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 21V9" />
      <path d="M12 9c-2.6-2.2-5-2.6-7-1.2 1 2.5 3.2 3.9 7 4.2" />
      <path d="M12 9c2.6-2.2 5-2.6 7-1.2-1 2.5-3.2 3.9-7 4.2" />
      <path d="M12 9c-.8-2.8-.2-5 1.8-6.4 1.2 2.3.8 4.8-1.8 6.4Z" />
    </svg>
  );
}

export function CrownIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 17.5h16L18.6 8l-3.4 3L12 5.5 8.8 11 5.4 8 4 17.5Z" />
      <path d="M6.6 20.5h10.8" />
    </svg>
  );
}

export function MonkIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3c-2.4 0-4 1.9-4 4.4 0 1.6.7 2.6 1.4 3.4" />
      <path d="M12 3c2.4 0 4 1.9 4 4.4 0 1.6-.7 2.6-1.4 3.4" />
      <path d="M9.4 10.8c-2.4 1-3.9 3-4.2 5.6-.1 1.4.2 2.9.8 4.1h12c.6-1.2.9-2.7.8-4.1-.3-2.6-1.8-4.6-4.2-5.6" />
      <path d="M12 13.6v4.2M10.4 15.4h3.2" />
    </svg>
  );
}

export function ScrollIcon({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M6.5 4h11a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 17.5 20h-11" />
      <path d="M6.5 4a1.5 1.5 0 0 0 0 3H8" />
      <path d="M6.5 20a1.5 1.5 0 0 1 0-3H8" />
      <path d="M10.5 9h6M10.5 12.5h6M10.5 16h3.5" />
    </svg>
  );
}

export function CalendarGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="15" rx="3.5" />
      <path d="M3.5 10h17M8.5 3.5v3M15.5 3.5v3" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SearchGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function ArrowGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function ChevronGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function BookmarkGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M6.5 4.5h11v15l-5.5-3.6-5.5 3.6v-15Z" />
    </svg>
  );
}

export function ShareGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 16V4m0 0-3.5 3.5M12 4l3.5 3.5" />
      <path d="M5.5 13v5.5a1.5 1.5 0 0 0 1.5 1.5h10a1.5 1.5 0 0 0 1.5-1.5V13" />
    </svg>
  );
}

export function HeartGlyph({ className, filled }: P & { filled?: boolean }) {
  return (
    <svg {...base} className={className} aria-hidden="true" fill={filled ? "currentColor" : "none"}>
      <path d="M12 19.5c-.4 0-.8-.15-1.1-.42C7.2 15.9 4.5 13.5 4.5 10.4A3.9 3.9 0 0 1 8.4 6.5c1.4 0 2.7.7 3.6 1.9.9-1.2 2.2-1.9 3.6-1.9a3.9 3.9 0 0 1 3.9 3.9c0 3.1-2.7 5.5-6.4 8.68-.3.27-.7.42-1.1.42Z" />
    </svg>
  );
}

export function HeadphonesGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4.5 15v-2.5a7.5 7.5 0 0 1 15 0V15" />
      <rect x="3" y="14" width="4" height="6" rx="2" />
      <rect x="17" y="14" width="4" height="6" rx="2" />
    </svg>
  );
}

export function CenserGlyph({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3v3" />
      <path d="M8 8h8l-1 3.5a4 4 0 0 1-6 0L8 8Z" />
      <path d="M9.5 8 8 5.5M14.5 8 16 5.5" />
      <path d="M10 21c-1-1.6-.6-2.8.6-3.8M14 21c1-1.6.6-2.8-.6-3.8" />
    </svg>
  );
}
