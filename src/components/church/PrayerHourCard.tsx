import type { ReactNode } from "react";

import { ChevronRight } from "@/components/church/icons";
import { cn } from "@/lib/utils";

export type PrayerTone = "day" | "night" | "extra" | "featured";
export type PrayerSpan = "wide" | "tall" | "cell";

const accent: Record<PrayerTone, string> = {
  day: "text-mint",
  night: "text-teal",
  extra: "text-foam/70",
  featured: "text-mint",
};

const spanClass: Record<PrayerSpan, string> = {
  wide: "col-span-2 min-h-[112px]",
  tall: "col-span-1 row-span-2 min-h-[196px]",
  cell: "col-span-1 min-h-[132px]",
};

/**
 * Ocean Deep bento tile for one Agpeya hour.
 * Presentation only — no logic, no navigation.
 */
export function PrayerHourCard({
  name,
  time,
  icon,
  tone = "day",
  span = "cell",
  index,
}: {
  name: string;
  time: string;
  icon: ReactNode;
  tone?: PrayerTone;
  span?: PrayerSpan;
  index?: number;
}) {
  return (
    <button
      type="button"
      className={cn(
        "press group relative isolate flex flex-col overflow-hidden rounded-[24px] p-4 text-start",
        tone === "featured" ? "ocean-glass" : "ocean-tile",
        spanClass[span],
      )}
    >
      {/* soft tidal glow */}
      <span
        aria-hidden="true"
        className={cn(
          "ocean-halo pointer-events-none absolute -end-8 -top-10 -z-10 size-32 rounded-full opacity-70",
          tone === "featured" && "tide-drift",
        )}
      />

      {typeof index === "number" && (
        <span className="absolute end-4 top-4 font-sora text-[11px] font-semibold tabular-nums text-foam/25">
          {String(index).padStart(2, "0")}
        </span>
      )}

      <span
        className={cn(
          "grid size-10 place-items-center rounded-2xl border border-mint/15 bg-abyss/50",
          accent[tone],
        )}
        aria-hidden="true"
      >
        {icon}
      </span>

      <h3
        className={cn(
          "mt-auto pt-4 font-sora font-semibold leading-tight tracking-tight text-foam",
          span === "wide" ? "text-[18px]" : "text-[15.5px]",
        )}
      >
        {name}
      </h3>

      <div className="mt-1.5 flex items-center gap-1.5">
        <span className={cn("size-1 rounded-full", tone === "night" ? "bg-teal" : "bg-mint")} />
        <span className="font-manrope text-[11px] font-medium text-foam/45">{time}</span>
        <ChevronRight
          className={cn(
            "ms-auto size-3.5 text-foam/30 transition-transform duration-500 rtl:rotate-180",
            "group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5",
          )}
        />
      </div>
    </button>
  );
}
