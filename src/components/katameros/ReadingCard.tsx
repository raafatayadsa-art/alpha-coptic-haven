import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

import { ArrowGlyph } from "@/components/katameros/katameros-icons";
import { useLang } from "@/lib/i18n";

/**
 * One lectionary reading tile — kind, reference, a calm excerpt and length.
 * Colour comes from the group's --hue pair. Presentation only.
 */
export function ReadingCard({
  kind,
  reference,
  excerpt,
  minutes,
  icon,
  hue,
  index,
}: {
  kind: string;
  reference: string;
  excerpt: string;
  minutes: number;
  icon: ReactNode;
  hue: { hue: string; hue2: string };
  index?: number;
}) {
  const { t } = useLang();

  return (
    <Link
      to="/katameros-read"
      className="press km-card relative isolate block overflow-hidden rounded-[24px] p-4"
      style={{ "--hue": hue.hue, "--hue-2": hue.hue2 } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="km-halo pointer-events-none absolute -end-10 -top-12 -z-10 size-32 rounded-full opacity-70"
      />
      <span
        aria-hidden="true"
        className="hue-bg pointer-events-none absolute inset-y-5 start-0 w-[3px] rounded-full opacity-60"
      />

      <div className="flex items-start gap-3 ps-1.5">
        <span className="hue-text grid size-10 shrink-0 place-items-center rounded-2xl border bg-nightwine/55 hue-ring">
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[17px] leading-tight font-semibold text-cream">
            {kind}
          </span>
          <span className="hue-text mt-1 inline-block rounded-full border bg-nightwine/40 px-2.5 py-0.5 font-manrope text-[10.5px] font-semibold hue-ring">
            {reference}
          </span>
        </span>
        {typeof index === "number" ? (
          <span className="font-display text-[20px] leading-none font-semibold tabular-nums text-cream/15">
            {String(index).padStart(2, "0")}
          </span>
        ) : null}
      </div>

      <p className="mt-3 line-clamp-2 ps-1.5 font-manrope text-[12px] leading-relaxed text-cream/55">
        {excerpt}
      </p>

      <div className="mt-3 flex items-center gap-2 ps-1.5">
        <span className="font-manrope text-[10.5px] text-cream/40">
          {minutes} {t("km.min")}
        </span>
        <span className="km-hairline h-px flex-1 opacity-40" />
        <span className="hue-text grid size-6 place-items-center rounded-full border bg-nightwine/40 hue-ring">
          <ArrowGlyph className="size-3 rtl:rotate-180" />
        </span>
      </div>
    </Link>
  );
}
