import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import {
  AudioIcon,
  ChurchIcon,
  GalleryIcon,
  HomeIcon,
  LibraryIcon,
  PersonIcon,
} from "@/components/church/media-icons";

type Item = { label: string; icon: ReactNode; to?: "/" | "/church" };

const items: Item[] = [
  { label: "الرئيسية", icon: <HomeIcon className="size-[21px]" />, to: "/" },
  { label: "كنيستي", icon: <ChurchIcon className="size-[21px]" />, to: "/church" },
  { label: "المكتبة", icon: <LibraryIcon className="size-[21px]" /> },
  { label: "الصوتيات", icon: <AudioIcon className="size-[21px]" /> },
  { label: "الصور", icon: <GalleryIcon className="size-[21px]" /> },
  { label: "حسابي", icon: <PersonIcon className="size-[21px]" /> },
];

const shell =
  "press flex flex-1 min-w-0 flex-col items-center gap-1 rounded-2xl py-1.5 text-ink/40 transition-colors";
const active = "data-[status=active]:text-ink";

export function BottomNav() {
  return (
    <nav
      dir="rtl"
      aria-label="التنقل الرئيسي"
      className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-[520px] px-3 pb-[max(10px,env(safe-area-inset-bottom))]"
    >
      <div className="glass-card flex items-stretch gap-0.5 rounded-[28px] px-2 py-1.5">
        {items.map((item) =>
          item.to ? (
            <Link
              key={item.label}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className={`${shell} ${active}`}
            >
              <span className="relative">
                {item.icon}
                <span className="absolute -bottom-[7px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-gold opacity-0 transition-opacity duration-500 data-[on=true]:opacity-100" />
              </span>
              <span className="font-arabic text-[9.5px] font-medium leading-none">{item.label}</span>
            </Link>
          ) : (
            <button key={item.label} type="button" className={shell}>
              {item.icon}
              <span className="font-arabic text-[9.5px] font-medium leading-none">{item.label}</span>
            </button>
          ),
        )}
      </div>
    </nav>
  );
}
