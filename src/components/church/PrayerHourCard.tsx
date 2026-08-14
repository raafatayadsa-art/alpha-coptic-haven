import type { ReactNode } from "react";

import { ChevronRight } from "@/components/church/icons";
import { cn } from "@/lib/utils";

export type PrayerTone = "day" | "night" | "extra" | "featured";

const surface: Record<PrayerTone, string> = {
  day: "bg-gradient-to-b from-gold/16 via-parchment to-ivory ring-1 ring-gold/20",
  night: "bg-gradient-to-b from-lavender/60 via-lavender/25 to-ivory ring-1 ring-lavender",
  extra: "bg-gradient-to-b from-parchment to-ivory ring-1 ring-ink/8",
  featured: "bg-ink ring-1 ring-gold/30",
};

const halo: Record<PrayerTone, string> = {
  day: "bg-ivory text-gold ring-1 ring-gold/25 shadow-[0_6px_18px_-8px_rgba(0,0,0,0.25)]",
  night: "bg-ivory text-ink/60 ring-1 ring-lavender shadow-[0_6px_18px_-8px_rgba(0,0,0,0.2)]",
  extra: "bg-ivory text-ink/50 ring-1 ring-ink/8",
  featured: "bg-ivory/10 text-gold ring-1 ring-gold/35",
};

const titleTone: Record<PrayerTone, string> = {
  day: "text-ink",
  night: "text-ink",
  extra: "text-ink",
  featured: "text-ivory",
};

const chipTone: Record<PrayerTone, string> = {
  day: "bg-ivory/80 text-ink/55 ring-1 ring-gold/20",
  night: "bg-ivory/80 text-ink/55 ring-1 ring-lavender",
  extra: "bg-ivory/80 text-ink/50 ring-1 ring-ink/8",
  featured: "bg-gold/15 text-gold ring-1 ring-gold/30",
};

export function PrayerHourCard({
  name,
  time,
  icon,
  tone = "day",
}: {
  name: string;
  time: string;
  icon: ReactNode;
  tone?: PrayerTone;
}) {
  return (
    <button
      type="button"
      className={cn(
        "press group relative flex w-[136px] flex-none snap-start flex-col rounded-[26px] p-4 text-start shadow-[var(--shadow-soft)]",
        surface[tone],
      )}
    >
      <span className={cn("grid size-12 place-items-center rounded-full", halo[tone])} aria-hidden="true">
        {icon}
      </span>

      <h3
        className={cn(
          "mt-4 font-display text-[17px] font-semibold leading-tight tracking-tight",
          titleTone[tone],
        )}
      >
        {name}
      </h3>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[10.5px] font-semibold tracking-tight",
            chipTone[tone],
          )}
        >
          {time}
        </span>
        <span
          className={cn(
            "grid size-6 shrink-0 place-items-center rounded-full transition-transform duration-500",
            tone === "featured" ? "bg-gold/20 text-gold" : "bg-ivory text-ink/40 ring-1 ring-ink/8",
            "group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5",
          )}
          aria-hidden="true"
        >
          <ChevronRight className="size-3 rtl:rotate-180" />
        </span>
      </div>
    </button>
  );
}
