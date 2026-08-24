import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";

import { CopticCross } from "@/components/church/icons";
import { KatamerosShell } from "@/components/katameros/KatamerosShell";
import {
  ArrowGlyph,
  CalendarGlyph,
  FeastStarIcon,
} from "@/components/katameros/katameros-icons";
import { useLang } from "@/lib/i18n";
import { copticMonths, majorFeasts, seasons } from "@/lib/katameros-data";
import { SloganBand } from "@/components/layout/SloganBand";

export const Route = createFileRoute("/katameros-calendar")({
  head: () => ({
    meta: [
      { title: "التقويم القبطي — القطمارس | Alpha" },
      {
        name: "description",
        content:
          "Browse the Coptic calendar in Alpha: the thirteen months, their days, the fasting seasons and the major feasts, then open any day's readings.",
      },
      { property: "og:title", content: "التقويم القبطي — القطمارس | Alpha" },
      { property: "og:description", content: "Thirteen Coptic months, seasons and feasts in one calm view." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: KatamerosCalendar,
});

const arabicDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const toArabic = (n: number) =>
  String(n)
    .split("")
    .map((d) => arabicDigits[Number(d)])
    .join("");

function KatamerosCalendar() {
  const { t, lang } = useLang();
  const [month, setMonth] = useState("abib");
  const active = copticMonths.find((m) => m.id === month) ?? copticMonths[0]!;
  const dayCount = active.id === "nasie" ? 6 : 30;
  const feastDays = [12, 21, 29];

  return (
    <KatamerosShell title={t("km.cal.title")} subtitle={t("km.cal.sub")}>
      {/* ── Month wheel ── */}
      <section>
        <div className="mb-3 flex items-center gap-3 px-1">
          <span className="size-1.5 rounded-full bg-brass" />
          <h2 className="font-display text-[16px] font-semibold text-cream">{t("km.cal.months")}</h2>
          <span className="km-hairline h-px flex-1 opacity-40" />
        </div>
        <div className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1">
          {copticMonths.map((m, i) => {
            const isActive = m.id === active.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMonth(m.id)}
                className={`press flex w-[92px] shrink-0 snap-start flex-col items-start gap-1 rounded-[20px] border px-3 py-2.5 text-start ${
                  isActive
                    ? "border-goldleaf/45 bg-goldleaf/12"
                    : "border-cream/10 bg-wine/40"
                }`}
              >
                <span className="font-manrope text-[9px] tabular-nums text-cream/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-display text-[15.5px] font-semibold ${
                    isActive ? "text-cream" : "text-cream/70"
                  }`}
                >
                  {m.name[lang]}
                </span>
                <span className="truncate font-manrope text-[8.5px] text-brass/80">
                  {m.season ? m.season[lang] : t("km.months.annual")}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Days grid of the chosen month ── */}
      <section
        className="km-band rounded-[30px] p-4"
        style={{ "--hue": "oklch(0.560 0.120 40)", "--hue-2": "oklch(0.850 0.086 70)" } as CSSProperties}
      >
        <div className="mb-3.5 flex items-center gap-3">
          <span className="hue-text grid size-9 place-items-center rounded-2xl border bg-nightwine/45 hue-ring">
            <CalendarGlyph className="size-[18px]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-display text-[17px] font-semibold text-cream">
              {active.name[lang]}
            </span>
            <span className="mt-0.5 block font-manrope text-[10px] text-cream/40">
              {t("km.cal.days")} · {lang === "ar" ? toArabic(dayCount) : dayCount}
            </span>
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: dayCount }, (_, i) => {
            const day = i + 1;
            const isToday = active.id === "abib" && day === 22;
            const isFeast = feastDays.includes(day);

            return (
              <Link
                key={day}
                to="/katameros-day"
                className={`press relative grid aspect-square place-items-center rounded-[15px] border font-display text-[14.5px] font-semibold tabular-nums ${
                  isToday
                    ? "border-goldleaf/55 bg-goldleaf/18 text-cream"
                    : "border-cream/8 bg-wine/35 text-cream/65"
                }`}
              >
                {lang === "ar" ? toArabic(day) : day}
                {isFeast && !isToday ? (
                  <span className="absolute bottom-1 size-1 rounded-full bg-brass" />
                ) : null}
              </Link>
            );
          })}
        </div>

        <div className="mt-3.5 flex items-center gap-4 px-1">
          <span className="flex items-center gap-1.5 font-manrope text-[10px] text-cream/40">
            <span className="size-2 rounded-full bg-goldleaf/70" />
            {t("km.cal.today")}
          </span>
          <span className="flex items-center gap-1.5 font-manrope text-[10px] text-cream/40">
            <span className="size-2 rounded-full bg-brass" />
            {t("km.cal.feastDay")}
          </span>
        </div>
      </section>

      {/* ── Seasons ── */}
      <section>
        <div className="mb-3 flex items-center gap-3 px-1">
          <span className="size-1.5 rounded-full bg-brass" />
          <h2 className="font-display text-[16px] font-semibold text-cream">{t("km.seasons")}</h2>
          <span className="km-hairline h-px flex-1 opacity-40" />
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {seasons.map((season) => (
            <Link
              key={season.id}
              to="/katameros-day"
              className="press km-card relative isolate overflow-hidden rounded-[22px] p-3.5"
              style={{ "--hue": season.accent, "--hue-2": season.accent } as CSSProperties}
            >
              <span
                aria-hidden="true"
                className="km-halo pointer-events-none absolute -end-7 -top-9 -z-10 size-24 rounded-full opacity-70"
              />
              <span className="block font-display text-[15px] leading-tight font-semibold text-cream">
                {season.name[lang]}
              </span>
              <span className="mt-1 block font-manrope text-[10px] text-cream/45">
                {season.span[lang]}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Feasts ── */}
      <section>
        <div className="mb-3 flex items-center gap-3 px-1">
          <span className="size-1.5 rounded-full bg-brass" />
          <h2 className="font-display text-[16px] font-semibold text-cream">{t("km.feasts")}</h2>
          <span className="km-hairline h-px flex-1 opacity-40" />
        </div>
        <div className="km-glass overflow-hidden rounded-[26px]">
          {majorFeasts.map((feast, i) => (
            <Link
              key={feast.id}
              to="/katameros-day"
              className={`press flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t border-cream/8" : ""}`}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-2xl border border-goldleaf/25 bg-goldleaf/10 text-goldleaf">
                <FeastStarIcon className="size-[17px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-[15px] font-semibold text-cream">
                  {feast.name[lang]}
                </span>
                <span className="mt-0.5 block font-manrope text-[10.5px] text-cream/45">
                  {feast.date[lang]}
                </span>
              </span>
              <ArrowGlyph className="size-4 shrink-0 text-cream/25 rtl:rotate-180" />
            </Link>
          ))}
        </div>
      </section>

      <footer className="flex flex-col items-center gap-2 pt-1 text-center">
        <CopticCross className="size-5 text-brass/70" />
        <p className="font-manrope text-[11.5px] text-cream/35">{t("km.cal.footer")}</p>
      </footer>
      <SloganBand />
    </KatamerosShell>
  );
}
