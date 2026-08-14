import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { ArrowIcon, AlphaOmegaMark } from "@/components/bible/bible-icons";
import { CopticCross } from "@/components/church/icons";
import { Screen } from "@/components/layout/Screen";
import { useLang } from "@/lib/i18n";

/**
 * Shared shell for every Bible tool screen (highlights, saved, notes,
 * history, journey, statistics, search). Presentation only.
 */
export function ToolScreen({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const { t, dir, isArabic } = useLang();

  return (
    <Screen className="scriptorium">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-1 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        <AlphaOmegaMark className="pointer-events-none absolute inset-x-0 top-48 z-0 mx-auto w-[44%] text-copper opacity-[0.035] illum-breathe" />

        <header className="safe-top safe-sticky-top sticky top-0 z-30 bg-vellum/85 px-4 pb-3 backdrop-blur-xl">
          <div className="relative overflow-hidden rounded-[26px] vellum-card px-4 pt-3.5 pb-4">
            <div className="copt-frieze absolute inset-x-6 top-0 opacity-50" />
            <div className="flex items-center gap-3">
              <Link
                to="/bible"
                aria-label={t("app.back")}
                className="press grid size-10 shrink-0 place-items-center rounded-full bg-white/85 text-inkblue"
              >
                <ArrowIcon className="size-[18px] ltr:rotate-180" />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="font-manrope text-[10px] font-bold tracking-[0.16em] text-copper uppercase">
                  {eyebrow ?? t("bib.title")}
                </p>
                <h1 className="truncate font-display text-[21px] font-semibold text-rubric">{title}</h1>
              </div>
              <CopticCross className="size-4 shrink-0 text-copper/70" />
            </div>
            <p className="mt-2 font-manrope text-[11.5px] text-quiet">{subtitle}</p>
          </div>
        </header>

        <main className="relative z-10 space-y-6 px-4 pt-3">{children}</main>
      </div>
    </Screen>
  );
}

export function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="vellum-card rounded-[20px] px-2.5 py-3 text-center">
      <span className="block font-display text-[20px] font-semibold text-copper">{value}</span>
      <span className="mt-0.5 block font-manrope text-[9.5px] tracking-[0.08em] text-quiet uppercase">
        {label}
      </span>
    </div>
  );
}
