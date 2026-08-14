import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { BibleIcon, CommunityIcon } from "@/components/church/icons";
import {
  ChurchIcon,
  HomeIcon,
  PersonIcon,
} from "@/components/church/media-icons";
import { useLang } from "@/lib/i18n";

type Item = { key: string; icon: ReactNode; to?: "/" | "/my-church" | "/bible"; center?: boolean };

const items: Item[] = [
  { key: "nav.home", icon: <HomeIcon className="size-[21px]" />, to: "/" },
  { key: "nav.myChurch", icon: <ChurchIcon className="size-[21px]" />, to: "/my-church" },
  { key: "nav.bible", icon: <BibleIcon className="size-[21px]" />, to: "/bible", center: true },
  { key: "nav.community", icon: <CommunityIcon className="size-[21px]" /> },
  { key: "nav.profile", icon: <PersonIcon className="size-[21px]" /> },
];

const shell =
  "press flex flex-1 min-w-0 flex-col items-center gap-1 rounded-2xl py-1.5 text-ink/40 transition-colors";
const active = "data-[status=active]:text-ink";


export function BottomNav() {
  const { t, dir, isArabic } = useLang();
  const label = `${isArabic ? "font-arabic " : ""}text-[9.5px] font-medium leading-none`;

  return (
    <nav
      dir={dir}
      aria-label={t("nav.main")}
      className="safe-bottom fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[520px] px-3"
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
