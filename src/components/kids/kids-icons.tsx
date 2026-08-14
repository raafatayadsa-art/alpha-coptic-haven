/**
 * Alpha Kids — rounded, friendly line glyphs (presentation only).
 */
type P = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function KdArrow({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function KdChevron({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9.5 5l7 7-7 7" />
    </svg>
  );
}

export function KdPlay({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8.5 5.6c0-.9 1-1.4 1.7-1L18 9.2c.8.5.8 1.6 0 2L10.2 16c-.7.4-1.7-.1-1.7-1V5.6Z" />
    </svg>
  );
}

export function KdBook({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 5.5h6a2 2 0 012 2V20a2 2 0 00-2-2H4V5.5Z" />
      <path d="M20 5.5h-6a2 2 0 00-2 2V20a2 2 0 012-2h6V5.5Z" />
    </svg>
  );
}

export function KdStar({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 3.4l2.5 5.2 5.7.8-4.1 4 1 5.6-5.1-2.7-5.1 2.7 1-5.6-4.1-4 5.7-.8L12 3.4Z" />
    </svg>
  );
}

export function KdHeart({ className, filled }: P & { filled?: boolean }) {
  return (
    <svg
      {...base}
      fill={filled ? "currentColor" : "none"}
      className={className}
      aria-hidden="true"
    >
      <path d="M12 20s-7.5-4.3-7.5-9.4A4.1 4.1 0 0112 8.2a4.1 4.1 0 017.5 2.4C19.5 15.7 12 20 12 20Z" />
    </svg>
  );
}

export function KdMusic({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9 18V7l10-2v11" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </svg>
  );
}

export function KdBrush({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M15.5 4.5l4 4-8 8-4-4 8-8Z" />
      <path d="M7.5 12.5l-2 4.5 4.5-2" />
      <path d="M5 20h5" />
    </svg>
  );
}

export function KdGame({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <rect x="3" y="7.5" width="18" height="10" rx="5" />
      <path d="M7.5 10.5v4M5.5 12.5h4M15.5 11.5h.01M18 13.5h.01" />
    </svg>
  );
}

export function KdTrophy({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M8 4h8v4.5a4 4 0 01-8 0V4Z" />
      <path d="M8 5.5H5.5V7a3 3 0 003 3M16 5.5h2.5V7a3 3 0 01-3 3" />
      <path d="M12 12.5V16M9 20h6M10.5 16h3" />
    </svg>
  );
}

export function KdCross({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 4v16M5 10h14" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  );
}

export function KdSearch({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </svg>
  );
}

export function KdSparkle({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.8l1.8 4.6L18.4 9l-4.6 1.6L12 15.2l-1.8-4.6L5.6 9l4.6-1.6L12 2.8ZM18 15l.9 2.2 2.1.8-2.1.8-.9 2.2-.9-2.2-2.1-.8 2.1-.8L18 15Z" />
    </svg>
  );
}

export function KdDove({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 13c3.5.5 6-1 7.5-3.5C13 7 15.5 6 18 6.5c1.5.3 2 1.5 2 2.5 0 4.5-4 8-8.5 8-3 0-5.5-1.5-7.5-4Z" />
      <path d="M8 17.5V20" />
    </svg>
  );
}
