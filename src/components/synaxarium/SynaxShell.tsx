import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Screen } from "@/components/layout/Screen";
import { ArrowGlyph } from "@/components/synaxarium/synax-icons";
import { useLang } from "@/lib/i18n";
import { L, pick } from "@/lib/synaxarium-data";

export type SynaxBackTo = "/synaxarium" | "/synaxarium-day" | "/synaxarium-months";

/**
 * Shared shell for every secondary Synaxarium screen (day, saint, months,
 * search). Emerald icon-screen surface with a pinned gilded header.
 * Presentation only.
 */
export function SynaxShell({
  eyebrow,
  title,
  subtitle,
  action,
  children,
  backTo = "/synaxarium",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  backTo?: SynaxBackTo;
}) {
  const { lang, dir, isArabic } = useLang();

  return (
    <Screen className="sx-page">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-10 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        <header className="safe-top safe-sticky-top sticky top-0 z-30 px-4 pb-3 backdrop-blur-xl">
          <div className="sx-glass relative overflow-hidden rounded-[26px] px-4 pt-3.5 pb-4">
            <div className="sx-hairline absolute inset-x-6 top-0 h-px opacity-60" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-4 -left-3 font-display text-[64px] leading-none text-iconleaf/[0.07] select-none"
            >
              ⲱ
            </span>
            <div className="flex items-center gap-3">
              <Link
                to={backTo}
                aria-label={pick({ ar: "رجوع", en: "Back" }, lang)}
                className="press grid size-10 shrink-0 place-items-center rounded-full border border-icongold/25 bg-synaxdeep/60 text-ivory/85"
              >
                <ArrowGlyph className="size-[18px] rtl:rotate-180" />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="font-manrope text-[10px] font-bold tracking-[0.16em] text-icongold uppercase">
                  {eyebrow ?? pick(L.title, lang)}
                </p>
                <h1 className="truncate font-display text-[17px] font-semibold text-ivory">{title}</h1>
                {subtitle ? <p className="truncate text-[11.5px] text-ivory/50">{subtitle}</p> : null}
              </div>
              {action}
            </div>
          </div>
        </header>

        <main className="px-4 pt-2">{children}</main>
      </div>
    </Screen>
  );
}

export function SynaxSectionTitle({ title, caption }: { title: string; caption?: string }) {
  return (
    <div className="mt-7 mb-3 flex items-center gap-3 px-1">
      <span className="size-1.5 rounded-full bg-icongold" />
      <h2 className="font-display text-[16px] font-semibold tracking-tight text-ivory">{title}</h2>
      <span className="sx-hairline h-px flex-1 opacity-40" />
      {caption ? <span className="font-manrope text-[10px] font-semibold text-icongold/80">{caption}</span> : null}
    </div>
  );
}
