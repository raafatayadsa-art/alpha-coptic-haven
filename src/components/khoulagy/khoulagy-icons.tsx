import type { SVGProps } from "react";

/* Hand-drawn line glyphs for the Khoulagy screens. Presentation only. */

type P = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ChaliceIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M7 4h10l-1 4.5A4.5 4.5 0 0 1 12 12a4.5 4.5 0 0 1-4-3.5L7 4Z" />
      <path d="M12 12v5m-3.5 3h7M9.5 20c0-1.7 1.1-3 2.5-3s2.5 1.3 2.5 3" />
    </svg>
  );
}

export function CenserIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3v3M8.5 6.5 12 9l3.5-2.5" />
      <path d="M7.5 11h9l-1 5.5A3 3 0 0 1 12.6 19h-1.2a3 3 0 0 1-2.9-2.5L7.5 11Z" />
      <path d="M9.5 11V9m5 2V9" />
    </svg>
  );
}

export function NoteIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M9 18V6l8-2v3l-8 2" />
      <circle cx="6.5" cy="18" r="2.5" />
    </svg>
  );
}

export function ArrowIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

export function AutoScrollIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M12 4v14m0 0-4.5-4.5M12 18l4.5-4.5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export function TypeIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M5 6h14M12 6v13" />
    </svg>
  );
}

export function SpeedIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 13l3.5-3M12 3.5v1.6" />
    </svg>
  );
}

export function SpacingIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function SettingsIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
    </svg>
  );
}

export function BookmarkIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 4h11v16l-5.5-4-5.5 4V4Z" />
    </svg>
  );
}

export function SearchIcon(props: P) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </svg>
  );
}
