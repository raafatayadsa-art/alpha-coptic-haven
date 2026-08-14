import type { SVGProps } from "react";

/* Alpha iconography — hairline 1.4 stroke, rounded joins, drawn not filled. */
const base = (props: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...props,
});

export const SunriseIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M4 18h16M6.5 18a5.5 5.5 0 0 1 11 0" />
    <path d="M12 4.5v2M5.2 7.7l1.4 1.4M18.8 7.7l-1.4 1.4M2.5 21h19" />
  </svg>
);

export const HaloIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8.5" r="3.6" />
    <path d="M6.5 8.5a5.5 5.5 0 0 0 11 0" opacity=".5" />
    <path d="M5 21c1.2-3.6 3.8-5.4 7-5.4s5.8 1.8 7 5.4" />
  </svg>
);

export const CandleIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 2.6c1.8 1.9 2.7 3.3 2.7 4.4a2.7 2.7 0 0 1-5.4 0c0-1.1.9-2.5 2.7-4.4Z" />
    <path d="M9.6 10.6h4.8v9.2H9.6z" />
    <path d="M7.4 21.4h9.2" />
  </svg>
);

export const JourneyIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5 20c0-3 3-3.4 5.4-4.2C13 15 15 14 15 11.6c0-2-1.6-3-3.4-3-2 0-3.4 1.2-3.4 2.8" />
    <circle cx="18" cy="6" r="2.6" />
    <path d="M5 20h4" />
  </svg>
);

export const BookmarkIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6.5 3.8h11v16.8L12 16.6l-5.5 4z" />
  </svg>
);

export const SparkIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 3.2c.9 4 1.9 5 5.9 5.9-4 .9-5 1.9-5.9 5.9-.9-4-1.9-5-5.9-5.9 4-.9 5-1.9 5.9-5.9Z" />
    <path d="M17.6 15.4c.4 1.8.8 2.2 2.6 2.6-1.8.4-2.2.8-2.6 2.6-.4-1.8-.8-2.2-2.6-2.6 1.8-.4 2.2-.8 2.6-2.6Z" />
  </svg>
);

export const ConnectIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="6" cy="7" r="2.4" />
    <circle cx="18" cy="7" r="2.4" />
    <circle cx="12" cy="18" r="2.4" />
    <path d="M7.6 8.8 10.6 16M16.4 8.8 13.4 16M8.4 7h7.2" />
  </svg>
);

export const ShareIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 3.6v11" />
    <path d="M8.4 7.2 12 3.6l3.6 3.6" />
    <path d="M5 13.4v5.6a1.4 1.4 0 0 0 1.4 1.4h11.2a1.4 1.4 0 0 0 1.4-1.4v-5.6" />
  </svg>
);

export const ArrowLeftIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M14.5 5.5 8 12l6.5 6.5" />
  </svg>
);

export const SeedIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 21v-7.5" />
    <path d="M12 13.5c-4 0-6.5-2.3-6.5-6.2C9.5 7.3 12 9.6 12 13.5Z" />
    <path d="M12 13.5c4 0 6.5-2.3 6.5-6.2C14.5 7.3 12 9.6 12 13.5Z" />
  </svg>
);

export const SearchGlyph = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6.2" />
    <path d="m15.6 15.6 4 4" />
  </svg>
);
