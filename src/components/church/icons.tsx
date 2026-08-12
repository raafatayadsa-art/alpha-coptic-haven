/**
 * Hand-tuned line icons for the Church module design language.
 * Presentation only — no logic, no data.
 */
type IconProps = { className?: string };

const base = "shrink-0";

export const BellIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 9a6 6 0 1 0-12 0c0 4-1.5 5.5-2 6h16c-.5-.5-2-2-2-6Z" />
    <path d="M10 19a2 2 0 0 0 4 0" />
  </svg>
);

export const ShieldIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3l7 3v6c0 4.2-2.9 7.8-7 9-4.1-1.2-7-4.8-7-9V6l7-3Z" />
    <path d="M12 8.5v5M9.5 11h5" />
  </svg>
);

export const CopticCross = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3.5v17M3.5 12h17" />
    <circle cx="12" cy="12" r="2.6" />
  </svg>
);

export const VerifiedIcon = ({ className }: IconProps) => (
  <svg className={`${base} ${className ?? ""}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.2l2.2 1.7 2.8-.2 1 2.6 2.4 1.5-.6 2.7.6 2.7-2.4 1.5-1 2.6-2.8-.2L12 21.8l-2.2-1.7-2.8.2-1-2.6L3.6 16l.6-2.7-.6-2.7L6 9.1l1-2.6 2.8.2L12 2.2Z" />
    <path
      d="M8.8 12.2l2 2 4.4-4.4"
      fill="none"
      stroke="var(--ivory)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PhoneIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6.2 3.5h2.4l1.5 3.6-1.9 1.3a10.6 10.6 0 0 0 5.4 5.4l1.3-1.9 3.6 1.5v2.4a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z" />
  </svg>
);

export const ChatIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 12.5c0 3.6-3.6 6.5-8 6.5-.9 0-1.8-.1-2.6-.3L5 20.5l1-3.1C4.7 16.2 4 14.4 4 12.5 4 8.9 7.6 6 12 6s8 2.9 8 6.5Z" />
  </svg>
);

export const CalendarPlusIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3.5" y="5" width="17" height="15" rx="3.5" />
    <path d="M8 3.5v3M16 3.5v3M3.5 10h17M12 13v4M10 15h4" />
  </svg>
);

export const ChevronRight = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.5 5.5l6.5 6.5-6.5 6.5" />
  </svg>
);

export const HeartIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20s-7.5-4.3-7.5-9.4A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.5 2.4C19.5 15.7 12 20 12 20Z" />
  </svg>
);

/* Quick-link glyphs */
export const MembersIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19c.6-3 2.9-4.6 5.5-4.6S14 16 14.6 19" />
    <circle cx="17" cy="9.5" r="2.2" />
    <path d="M15 14.6c2.2-.5 4.6.8 5.2 3.4" />
  </svg>
);

export const FamiliesIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 11l8-6 8 6" />
    <path d="M6 10.5V19h12v-8.5" />
    <path d="M10.5 19v-4h3v4" />
  </svg>
);

export const ServicesIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 5.5h9a2 2 0 0 1 2 2V19H7a2 2 0 0 1-2-2V5.5Z" />
    <path d="M16 8.5h3V19h-3" />
    <path d="M8.5 9.5h4M8.5 12.5h4" />
  </svg>
);

export const GroupsIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="6.5" r="2.3" />
    <circle cx="6" cy="16" r="2.3" />
    <circle cx="18" cy="16" r="2.3" />
    <path d="M10.6 8.6 7.4 13.8M13.4 8.6l3.2 5.2M8.3 16h7.4" />
  </svg>
);

export const EventsIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="5.5" width="16" height="14" rx="3" />
    <path d="M8.5 4v3M15.5 4v3M4 10h16" />
    <circle cx="12" cy="14.5" r="1.4" />
  </svg>
);

export const HelpIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20s-7-4-7-9a3.8 3.8 0 0 1 7-2.1A3.8 3.8 0 0 1 19 11c0 5-7 9-7 9Z" />
    <path d="M12 11v3M10.6 12.5h2.8" />
  </svg>
);

export const LocationIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21s6-5.6 6-10a6 6 0 1 0-12 0c0 4.4 6 10 6 10Z" />
    <circle cx="12" cy="10.6" r="2.2" />
  </svg>
);

export const MoreIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <path d="M6.5 12h.01M12 12h.01M17.5 12h.01" />
  </svg>
);

/* Spiritual library glyphs */
export const BibleIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 5.5h9a2 2 0 0 1 2 2V19H7a2 2 0 0 1-2-2V5.5Z" />
    <path d="M16 8.5h3V19h-3" />
    <path d="M10 9v3M8.8 10.5h2.4" />
  </svg>
);

export const AgpeyaIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 20s-7.5-4.3-7.5-9.4A4.1 4.1 0 0 1 12 8.2a4.1 4.1 0 0 1 7.5 2.4C19.5 15.7 12 20 12 20Z" />
    <path d="M9 11h6M12 8.5v5" />
  </svg>
);

export const SynaxariumIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 5h12v14H6z" />
    <path d="M6 5c-1.5 0-2.5 1-2.5 2.5S4.5 10 6 10M18 5c1.5 0 2.5 1 2.5 2.5S19.5 10 18 10" />
    <path d="M9 9.5h6M9 12.5h6M9 15.5h4" />
  </svg>
);

export const KatamerosIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 5.5h6.5a1.5 1.5 0 0 1 1.5 1.5V20a1.5 1.5 0 0 0-1.5-1.5H4V5.5Z" />
    <path d="M20 5.5h-6.5A1.5 1.5 0 0 0 12 7v12a1.5 1.5 0 0 1 1.5-1.5H20V5.5Z" />
  </svg>
);

export const KhoulagyIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 3h8v5a4 4 0 0 1-8 0V3Z" />
    <path d="M12 12v4M8.5 19h7M10 16v3M14 16v3" />
  </svg>
);

export const KidsIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="6.5" r="2.4" />
    <path d="M7 20c.6-3.2 2.7-5 5-5s4.4 1.8 5 5" />
    <path d="M12 11.5V14" />
  </svg>
);

export const MyChurchIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3.5l6 4.5V19H6V8l6-4.5Z" />
    <path d="M12 3.5V1.8M10 19v-4h4v4" />
    <path d="M9.5 11h5" />
  </svg>
);

export const CommunityIcon = ({ className }: IconProps) => (
  <svg
    className={`${base} ${className ?? ""}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="8" r="2.3" />
    <circle cx="16" cy="8" r="2.3" />
    <path d="M4 19c.5-2.6 2.2-4 4-4s3.5 1.4 4 4" />
    <path d="M12 19c.5-2.6 2.2-4 4-4s3.5 1.4 4 4" />
  </svg>
);
