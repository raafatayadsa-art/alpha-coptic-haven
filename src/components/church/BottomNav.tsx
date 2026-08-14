import { Link, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";

import { BibleIcon, CommunityIcon } from "@/components/church/icons";
import {
  ChurchIcon,
  HomeIcon,
  PersonIcon,
} from "@/components/church/media-icons";
import { useChromeVisibility } from "@/hooks/use-chrome-visibility";
import { useLang } from "@/lib/i18n";


type Item = {
  key: string;
  icon: ReactNode;
  to?: "/" | "/my-church" | "/bible" | "/connect" | "/profile";
  center?: boolean;
};

const items: Item[] = [
  { key: "nav.home", icon: <HomeIcon className="size-[21px]" />, to: "/" },
  { key: "nav.myChurch", icon: <ChurchIcon className="size-[21px]" />, to: "/my-church" },
  { key: "nav.bible", icon: <BibleIcon className="size-[21px]" />, to: "/bible", center: true },
  { key: "nav.community", icon: <CommunityIcon className="size-[21px]" />, to: "/connect" },
  { key: "nav.profile", icon: <PersonIcon className="size-[21px]" />, to: "/profile" },
];

const shell =
  "press flex flex-1 min-w-0 flex-col items-center gap-0.5 rounded-2xl py-1 text-ink/55 transition-opacity hover:text-ink/80";
const active = "data-[status=active]:text-ink";


/** Center tab: glowing gold glass pill (label only) so the full name always fits. */
const centerShell =
  "press group relative flex min-w-0 shrink-0 items-center justify-center rounded-[18px] px-3.5 py-1.5 text-ink " +
  "bg-linear-to-b from-gold/30 to-gold/10 shadow-[0_6px_18px_oklch(0.72_0.11_85/0.35)] " +
  "ring-1 ring-gold/50 transition-all duration-500 hover:ring-gold/75 " +
  "data-[status=active]:ring-gold/85";




export function BottomNav() {
  const { t, dir, isArabic } = useLang();
  const label = `${isArabic ? "font-arabic " : ""}text-[9.5px] font-medium leading-none`;

  /* Facebook-style: hides while scrolling up the page, returns on scroll down. */
  const visible = useChromeVisibility();

  /* Alpha Connect ships its own bottom bar — never show two bars at once. */
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname.startsWith("/connect") || pathname.startsWith("/control") || pathname.startsWith("/intro") || pathname.startsWith("/signup")) return null;


  return (
    <nav
      dir={dir}
      aria-label={t("nav.main")}
      data-bottom-nav=""
      aria-hidden={!visible}
      className={`safe-bottom fixed inset-x-0 bottom-2 z-50 mx-auto max-w-[520px] px-3 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[135%] opacity-0"
      }`}
    >

      <div className="glass-card flex items-stretch gap-0.5 rounded-[24px] px-2 py-1.5">

        {items.map((item) =>
          item.to && item.center ? (
            <Link key={item.key} to={item.to} className={centerShell}>
              {/* soft sheen that lights up on hover / active */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-3 -top-6 h-10 rounded-full bg-gold/25 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100 group-data-[status=active]:opacity-100"
              />
              <span className={`${label} relative whitespace-nowrap text-[11px] font-semibold`}>
                {t(item.key)}
              </span>
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
