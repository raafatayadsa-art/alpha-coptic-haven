import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { CopticCross } from "@/components/church/icons";
import { ArrowGlyph } from "@/components/katameros/katameros-icons";
import { Screen } from "@/components/layout/Screen";
import { useLang } from "@/lib/i18n";

/**
 * Shared shell for every secondary Katameros screen (day, reading, calendar,
 * search, saved). Candle-lit wine surface, pinned manuscript header.
 * Presentation only.
 */
export function KatamerosShell({
  eyebrow,
  title,
  subtitle,
  action,
  children,
  backTo = "/katameros",
  pinHeader = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  backTo?: "/katameros" | "/katameros-calendar" | "/katameros-day";
  /** Reading screens pin their own parts rail instead, so the header scrolls. */
  pinHeader?: boolean;
}) {
  const { t, dir, isArabic } = useLang();

  return (
    <Screen className="km-page">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-1 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        <header
          className={`safe-top px-4 pb-3 backdrop-blur-xl ${
            pinHeader ? "safe-sticky-top sticky top-0 z-30" : "relative mt-[92px]"
          }`}
        >
          <div className="km-glass relative overflow-hidden rounded-[26px] px-4 pt-3.5 pb-4">
            <div className="km-hairline absolute inset-x-6 top-0 h-px opacity-60" />
            <div className="flex items-center gap-3">
              <Link
                to={backTo}
                aria-label={t("app.back")}
                className="press grid size-10 shrink-0 place-items-center rounded-full border border-goldleaf/25 bg-nightwine/50 text-cream/85"
              >
                <ArrowGlyph className="size-[18px] rtl:rotate-180" />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="font-manrope text-[10px] font-bold tracking-[0.16em] text-brass uppercase">
                  {eyebrow ?? t("km.title")}
                </p>
                <h1 className="truncate font-display text-[21px] font-semibold text-cream">{title}</h1>
              </div>
              {action ?? <CopticCross className="size-4 shrink-0 text-brass/70" />}
            </div>
            {subtitle ? (
              <p className="mt-2 font-manrope text-[11.5px] text-cream/50">{subtitle}</p>
            ) : null}
          </div>
        </header>

        <main className="relative z-10 space-y-5 px-4 pt-1">{children}</main>

        <p className="copt-band mt-8 text-center">ⲁ ⲱ ⲭ ⲥ ⲡⲛⲟⲩϯ ⲁ ⲱ</p>
      </div>
    </Screen>
  );
}
