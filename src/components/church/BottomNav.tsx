import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { BibleIcon, CommunityIcon } from "@/components/church/icons";
import {
  ChurchIcon,
  HomeIcon,
  PersonIcon,
} from "@/components/church/media-icons";
import { useLang } from "@/lib/i18n";

type Item = {
  key: string;
  icon: ReactNode;
  to?: "/" | "/my-church" | "/bible" | "/profile";
  center?: boolean;
};

const items: Item[] = [
  { key: "nav.home", icon: <HomeIcon className="size-[21px]" />, to: "/" },
  { key: "nav.myChurch", icon: <ChurchIcon className="size-[21px]" />, to: "/my-church" },
  { key: "nav.bible", icon: <BibleIcon className="size-[21px]" />, to: "/bible", center: true },
  { key: "nav.community", icon: <CommunityIcon className="size-[21px]" /> },
  { key: "nav.profile", icon: <PersonIcon className="size-[21px]" />, to: "/profile" },
];

const shell =
  "press flex flex-1 min-w-0 flex-col items-center gap-1 rounded-2xl py-1.5 text-ink/40 transition-colors hover:text-ink/70";
const active = "data-[status=active]:text-ink";

/** Center tab: label-only glass pill (no icon) so the full name always fits. */
const centerShell =
  "press group relative flex min-w-0 shrink-0 items-center justify-center overflow-hidden rounded-[20px] px-3.5 py-2 text-ink/55 " +
  "bg-gradient-to-b from-ivory/70 to-parchment/60 ring-1 ring-ink/8 shadow-[0_1px_0_rgba(255,255,255,0.75)_inset,0_6px_16px_-8px_rgba(20,16,10,0.35)] " +
  "backdrop-blur-xl transition-all duration-500 hover:text-gold hover:from-gold/18 hover:to-gold/8 hover:ring-gold/30 " +
  "data-[status=active]:text-gold data-[status=active]:from-gold/22 data-[status=active]:to-gold/8 data-[status=active]:ring-gold/35";



export function BottomNav() {
  const { t, dir, isArabic } = useLang();
  const label = `${isArabic ? "font-arabic " : ""}text-[9.5px] font-medium leading-none`;

  /* Auto-hide the bar after 5s of no interaction; any touch/scroll brings it back. */
  const [visible, setVisible] = useState(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const arm = () => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setVisible(false), 5000);
    };
    const wake = () => {
      setVisible(true);
      arm();
    };
    arm();
    const events = ["pointerdown", "pointermove", "touchstart", "scroll", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, wake, { passive: true }));
    return () => {
      if (timer.current) clearTimeout(timer.current);
      events.forEach((e) => window.removeEventListener(e, wake));
    };
  }, []);

  return (
    <nav
      dir={dir}
      aria-label={t("nav.main")}
      data-bottom-nav=""
      aria-hidden={!visible}
      className={`safe-bottom fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[520px] px-3 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[135%] opacity-0"
      }`}
    >

      <div className="glass-card flex items-stretch gap-0.5 rounded-[28px] px-2 py-1.5">
        {items.map((item) =>
          item.to && item.center ? (
            <Link key={item.key} to={item.to} className={`${shell} text-gold`}>
              <span className="grid size-[30px] place-items-center rounded-full bg-gold/12 ring-1 ring-gold/25">
                {item.icon}
              </span>
              <span className={`${label} font-semibold`}>{t(item.key)}</span>
            </Link>
          ) : item.to ? (
            <Link
              key={item.key}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className={`${shell} ${active}`}
            >
              <span className="relative">
                {item.icon}
                <span className="absolute -bottom-[7px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-gold opacity-0 transition-opacity duration-500 data-[on=true]:opacity-100" />
              </span>
              <span className={label}>{t(item.key)}</span>
            </Link>
          ) : item.center ? (
            <button key={item.key} type="button" className={`${shell} text-gold`}>
              <span className="grid size-[30px] place-items-center rounded-full bg-gold/12 ring-1 ring-gold/25">
                {item.icon}
              </span>
              <span className={`${label} font-semibold`}>{t(item.key)}</span>
            </button>
          ) : (
            <button key={item.key} type="button" className={shell}>
              {item.icon}
              <span className={label}>{t(item.key)}</span>
            </button>
          ),

        )}
      </div>
    </nav>
  );
}
