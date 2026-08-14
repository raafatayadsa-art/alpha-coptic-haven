import { Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import { ChevronGlyph } from "@/components/synaxarium/synax-icons";
import { useLang } from "@/lib/i18n";
import { L, categoryHue, categoryLabel, pick, type Saint } from "@/lib/synaxarium-data";

/**
 * Saint entry card — gilded arch icon panel on the side, hairline meta rail.
 * Presentation only.
 */
export function SaintCard({ saint }: { saint: Saint }) {
  const { lang } = useLang();
  const hue = categoryHue[saint.category];

  return (
    <Link
      to="/synaxarium-saint"
      className="press sx-card block overflow-hidden rounded-[26px] p-3"
      style={{ "--hue": hue.hue, "--hue-2": hue.hue2 } as CSSProperties}
    >
      <div className="flex items-stretch gap-3.5">
        {/* Arched icon panel */}
        <div className="relative w-[82px] shrink-0">
          <div className="sx-arch relative h-full min-h-[104px] overflow-hidden border border-icongold/30 bg-synaxnight/70">
            {saint.image ? (
              <img
                src={saint.image}
                alt=""
                loading="lazy"
                width={912}
                height={1104}
                className="size-full object-cover"
              />
            ) : (
              <div className="grid size-full place-items-center">
                <div className="sx-halo absolute inset-0 opacity-50" />
                <span className="relative font-display text-[34px] leading-none text-iconleaf/80">
                  {saint.monogram}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-synaxnight/70 via-transparent to-transparent" />
          </div>
          <span className="absolute -top-1 left-1/2 h-3 w-px -translate-x-1/2 bg-icongold/50" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col py-1">
          <div className="flex items-center gap-2">
            <span
              className="rounded-full border px-2 py-[3px] font-manrope text-[9.5px] font-bold tracking-wide"
              style={{
                borderColor: `color-mix(in oklab, ${hue.hue2} 34%, transparent)`,
                color: hue.hue2,
                background: `color-mix(in oklab, ${hue.hue} 24%, transparent)`,
              }}
            >
              {pick(categoryLabel[saint.category], lang)}
            </span>
            <span className="font-manrope text-[10px] text-ivory/40">
              {saint.minutes} {pick(L.minutes, lang)}
            </span>
          </div>

          <h3 className="mt-1.5 line-clamp-2 font-display text-[14.5px] leading-[1.35] font-semibold text-ivory">
            {pick(saint.name, lang)}
          </h3>
          <p className="mt-0.5 line-clamp-2 text-[11.5px] leading-relaxed text-ivory/50">
            {pick(saint.excerpt, lang)}
          </p>

          <div className="mt-auto flex items-center gap-2 pt-2">
            <span className="font-manrope text-[10px] font-semibold text-icongold">
              {pick(saint.copticDate, lang)}
            </span>
            <span className="size-1 rounded-full bg-ivory/20" />
            <span className="truncate font-manrope text-[10px] text-ivory/40">{pick(saint.place, lang)}</span>
            <span className="ms-auto flex items-center gap-1 font-manrope text-[10px] font-semibold text-iconleaf/85">
              {pick(L.readLife, lang)}
              <ChevronGlyph className="size-3 rtl:rotate-180" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
