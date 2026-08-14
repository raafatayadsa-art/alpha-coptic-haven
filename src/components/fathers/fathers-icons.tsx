type P = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function FaArrow({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function FaChevron({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M9.5 5l7 7-7 7" />
    </svg>
  );
}

export function FaSearch({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </svg>
  );
}

export function FaScroll({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M6 4h10a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V4z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  );
}

export function FaBook({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M4 5.5A2.5 2.5 0 016.5 3H19v15H6.5A2.5 2.5 0 004 20.5V5.5z" />
      <path d="M19 18v3H6.5" />
    </svg>
  );
}

export function FaQuoteMark({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M9.6 5.2c-3.1 1.4-5 4-5 7.4 0 3.6 2 6.2 4.9 6.2 2 0 3.5-1.4 3.5-3.3 0-1.8-1.3-3.1-3-3.1-.4 0-.8.1-1 .2.3-1.9 1.6-3.5 3.4-4.4l-2.8-3zM19.6 5.2c-3.1 1.4-5 4-5 7.4 0 3.6 2 6.2 4.9 6.2 2 0 3.5-1.4 3.5-3.3 0-1.8-1.3-3.1-3-3.1-.4 0-.8.1-1 .2.3-1.9 1.6-3.5 3.4-4.4l-2.8-3z" />
    </svg>
  );
}

export function FaHeart({ className, filled }: P & { filled?: boolean }) {
  return (
    <svg {...base} fill={filled ? "currentColor" : "none"} className={className} aria-hidden="true">
      <path d="M12 20s-7-4.4-7-9.2A3.9 3.9 0 0112 8a3.9 3.9 0 017 2.8C19 15.6 12 20 12 20z" />
    </svg>
  );
}

export function FaShare({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 15V4m0 0L8.5 7.5M12 4l3.5 3.5" />
      <path d="M5 13v5a2 2 0 002 2h10a2 2 0 002-2v-5" />
    </svg>
  );
}

export function FaBookmark({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M7 4h10v16l-5-3.6L7 20V4z" />
    </svg>
  );
}

export function FaLamp({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3v2M8.5 7.5h7a3.5 3.5 0 01-3.5 5 3.5 3.5 0 01-3.5-5z" />
      <path d="M12 12.5V19m-3 2h6" />
    </svg>
  );
}

export function FaCross({ className }: P) {
  return (
    <svg {...base} className={className} aria-hidden="true">
      <path d="M12 3v18M5 9h14M8 14h8" />
    </svg>
  );
}
