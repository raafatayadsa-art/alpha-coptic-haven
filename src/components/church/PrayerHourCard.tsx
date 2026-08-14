import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { ChevronRight } from "@/components/church/icons";
import { cn } from "@/lib/utils";

export type PrayerTone = "plain" | "featured";
export type PrayerSpan = "wide" | "tall" | "cell";

const spanClass: Record<PrayerSpan, string> = {
  wide: "col-span-2 min-h-[116px]",
  tall: "col-span-1 row-span-2 min-h-[204px]",
  cell: "col-span-1 min-h-[136px]",
};

/**
 * Ocean Deep bento tile for one Agpeya hour.
 * Colour comes from the section's --hue / --hue-2 variables, so each prayer
 * group reads as its own family. Presentation only — no logic.
 */
export function PrayerHourCard({
  name,
  time,
  icon,
  tone = "plain",
  span = "cell",
  index,
  hourId,
}: {
  name: string;
  time: string;
  icon: ReactNode;
  tone?: PrayerTone;
  span?: PrayerSpan;
  index?: number;
  /** When given, the tile opens that hour's reading screen. */
  hourId?: string | undefined;
}) {
  const shared = {
    className: cn(
      "press group relative isolate flex flex-col overflow-hidden rounded-[26px] p-4 text-start",
      tone === "featured" ? "ocean-glass" : "ocean-tile",
      spanClass[span],
    ),
  };

  const body = (
    <>
      {/* corner glow */}
      <span
        aria-hidden="true"
        className={cn(
          "ocean-halo pointer-events-none absolute -end-10 -top-12 -z-10 size-32 rounded-full opacity-70",
          tone === "featured" && "tide-drift",
        )}
      />
      {/* hue accent rail along the inner edge */}
      <span
        aria-hidden="true"
        className="hue-bg pointer-events-none absolute inset-y-5 start-0 w-[3px] rounded-full opacity-60"
      />

      <div className="flex items-start justify-between gap-2 ps-1">
        <span
          className="hue-text grid size-11 place-items-center rounded-2xl border bg-abyss/55 hue-ring"
          aria-hidden="true"
        >
          {icon}
        </span>
        {typeof index === "number" && (
          <span className="font-sora text-[22px] font-bold leading-none tabular-nums text-foam/12">
            {String(index).padStart(2, "0")}
          </span>
        )}
      </div>

      <h3
        className={cn(
          "mt-auto pt-4 ps-1 font-sora font-semibold leading-tight tracking-tight text-foam",
          span === "wide" ? "text-[18.5px]" : "text-[15.5px]",
        )}
      >
        {name}
      </h3>

      <div className="mt-2.5 flex items-center gap-2 ps-1">
        <span className="hue-text rounded-full border bg-abyss/40 px-2.5 py-1 font-manrope text-[10.5px] font-semibold tabular-nums hue-ring">
          {time}
        </span>
        <span
          aria-hidden="true"
          className="hue-text ms-auto grid size-6 place-items-center rounded-full border bg-abyss/40 transition-transform duration-500 hue-ring group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5"
        >
          <ChevronRight className="size-3 rtl:rotate-180" />
        </span>
      </div>
    </>
  );

  if (hourId) {
    return (
      <Link to="/agpeya-read" search={{ hour: hourId }} {...shared}>
        {body}
      </Link>
    );
  }

  return (
    <button type="button" {...shared}>
      {body}
    </button>
  );
}
