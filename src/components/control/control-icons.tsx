/** Alpha Control — line glyph set. Presentation only. */
import type { ReactElement } from "react";
type P = { className?: string };
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function GaugeGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 17a8 8 0 1 1 16 0" />
      <path d="M12 17l4-5" />
      <circle cx="12" cy="17" r="1.4" />
    </svg>
  );
}
export function PulseGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M3 12h3l2-5 3 10 2.5-6 2 3h5.5" />
    </svg>
  );
}
export function UsersGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5" />
      <path d="M16 5.6a3 3 0 0 1 0 5.8M17.5 18.6c-.2-1.6-.7-2.9-1.5-3.8 2.4-.3 4.4 1.2 5 3.8" />
    </svg>
  );
}
export function ChurchGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 2.5v4M10 4.5h4" />
      <path d="M5 20v-7.5L12 8l7 4.5V20" />
      <path d="M3 20h18" />
      <path d="M10.5 20v-4h3v4" />
    </svg>
  );
}
export function ContentGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 5.5A2 2 0 0 1 6 3.5h5V20H6a2 2 0 0 0-2 2z" />
      <path d="M20 5.5a2 2 0 0 0-2-2h-5V20h5a2 2 0 0 1 2 2z" />
    </svg>
  );
}
export function CommunityGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v6A2.5 2.5 0 0 1 17.5 15H9l-5 4z" />
      <path d="M8.5 9h7" />
    </svg>
  );
}
export function ChartGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 20v-6M12.5 20V8.5M17 20v-9" />
    </svg>
  );
}
export function MapGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 2.4 14.1 0 17M12 3.5c-2.4 2.4-2.4 14.1 0 17" />
    </svg>
  );
}
export function MediaGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
      <path d="M3.5 15.5l4-4 3.5 3.5 3-3 6.5 6" />
      <circle cx="15.5" cy="9" r="1.4" />
    </svg>
  );
}
export function CheckGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 12.5l4.5 4.5L19.5 6.5" />
    </svg>
  );
}
export function XGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
export function BellGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M6.5 10a5.5 5.5 0 0 1 11 0c0 4 1.5 5.5 1.5 5.5H5S6.5 14 6.5 10z" />
      <path d="M10 19a2.2 2.2 0 0 0 4 0" />
    </svg>
  );
}
export function ReportGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M6 3.5h8l4 4V20a.5.5 0 0 1-.5.5h-11A.5.5 0 0 1 6 20z" />
      <path d="M13.5 3.5V8h4.5" />
      <path d="M9 13h6M9 16.5h4" />
    </svg>
  );
}
export function ShieldGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3l7 2.5v6c0 4.4-3 7.6-7 9.5-4-1.9-7-5.1-7-9.5v-6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
export function GearGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
    </svg>
  );
}
export function PowerGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3v8" />
      <path d="M7 6.5a7 7 0 1 0 10 0" />
    </svg>
  );
}
export function SearchGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4 4" />
    </svg>
  );
}
export function GridGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="2" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="2" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="2" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2" />
    </svg>
  );
}
export function ChevronGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
export function ListGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M5 7h14M5 12h14M5 17h9" />
    </svg>
  );
}
export function MailGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5" width="17" height="14" rx="3" />
      <path d="M4 8l8 5 8-5" />
    </svg>
  );
}
export function ToggleGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="8" width="18" height="8" rx="4" />
      <circle cx="15.5" cy="12" r="2.4" />
    </svg>
  );
}
export function RocketGlyph({ className }: P) {
  return (
    <svg {...base} className={className}>
      <path d="M14 4c3.5 0 6 2.5 6 6 0 4.5-5 8.5-8 10l-4-4c1.5-3 5.5-8 6-12z" />
      <path d="M8 16l-3 3M10 6.5C7 6 4.5 7.5 4 10l3 1" />
      <circle cx="14.5" cy="9.5" r="1.5" />
    </svg>
  );
}

export const glyphByKey: Record<string, (p: P) => ReactElement> = {
  gauge: GaugeGlyph,
  pulse: PulseGlyph,
  users: UsersGlyph,
  church: ChurchGlyph,
  content: ContentGlyph,
  community: CommunityGlyph,
  chart: ChartGlyph,
  map: MapGlyph,
  media: MediaGlyph,
  check: CheckGlyph,
  bell: BellGlyph,
  reports: ReportGlyph,
  shield: ShieldGlyph,
  settings: GearGlyph,
  system: PowerGlyph,
  list: ListGlyph,
  mail: MailGlyph,
  toggle: ToggleGlyph,
  rocket: RocketGlyph,
};
