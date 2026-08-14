import { createFileRoute } from "@tanstack/react-router";

import { StatsIcon } from "@/components/bible/bible-icons";
import { StatTile, ToolScreen } from "@/components/bible/ToolScreen";
import { useLang } from "@/lib/i18n";
import { SloganBand } from "@/components/layout/SloganBand";

export const Route = createFileRoute("/bible-stats")({
  head: () => ({
    meta: [
      { title: "إحصائياتي — الكتاب المقدس | Alpha" },
      {
        name: "description",
        content: "Your Alpha Bible reading in numbers: streak, chapters, minutes and the books you read most.",
      },
      { property: "og:title", content: "إحصائياتي — الكتاب المقدس | Alpha" },
      { property: "og:description", content: "Your reading in calm numbers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibleStats,
});

const topBooks = [
  { ar: "المزامير", en: "Psalms", pct: 82 },
  { ar: "يوحنا", en: "John", pct: 64 },
  { ar: "متى", en: "Matthew", pct: 51 },
  { ar: "أمثال", en: "Proverbs", pct: 34 },
];

function BibleStats() {
  const { t, isArabic } = useLang();
  const week = [22, 14, 31, 8, 26, 12, 19];

  return (
    <ToolScreen title={t("bib.st.title")} subtitle={t("bib.st.sub")}>
      <div className="grid grid-cols-3 gap-2.5">
        <StatTile value={isArabic ? "١٢" : "12"} label={t("bib.stat.streak")} />
        <StatTile value={isArabic ? "٤٦٨" : "468"} label={t("bib.stat.chapters")} />
        <StatTile value={isArabic ? "١٤٢٠" : "1,420"} label={t("bib.stat.minutes")} />
      </div>

      <section className="ink-card relative isolate overflow-hidden rounded-[28px] p-5 text-vellum">
        <span
          aria-hidden="true"
          className="illum-halo pointer-events-none absolute -end-10 -top-14 -z-10 size-52 rounded-full opacity-70"
        />
        <div className="flex items-center gap-2.5">
          <StatsIcon className="size-[17px] text-illum" />
          <h2 className="font-display text-[16px] font-semibold">{t("bib.st.week")}</h2>
        </div>
        <div className="mt-4 flex items-end gap-2">
          {week.map((v, i) => (
            <div key={i} className="flex-1">
              <div className="h-28 w-full overflow-hidden rounded-[8px] bg-vellum/[0.08]">
                <div
                  className="h-full w-full origin-bottom rounded-[8px] bg-gradient-to-t from-copper to-illum transition-transform duration-700"
                  style={{ transform: `scaleY(${v / 35})` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2.5 text-center font-manrope text-[10.5px] text-vellum/50">
          {t("bib.hs.minutes")}
        </p>
      </section>

      <section>
        <div className="mb-2.5 flex items-center gap-3 px-1">
          <span className="size-1.5 rounded-full bg-copper" />
          <h2 className="font-display text-[15px] font-semibold text-inkblue">{t("bib.st.books")}</h2>
          <span className="gold-hairline h-px flex-1 opacity-40" />
        </div>
        <div className="vellum-card space-y-3 rounded-[24px] p-4">
          {topBooks.map((b) => (
            <div key={b.en}>
              <div className="flex items-center justify-between font-manrope text-[11.5px]">
                <span className="font-semibold text-inkblue">{isArabic ? b.ar : b.en}</span>
                <span className="text-copper tabular-nums">{b.pct}%</span>
              </div>
              <div className="mt-1.5 h-[6px] overflow-hidden rounded-full bg-inkblue/10">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-copper to-illum"
                  style={{ width: `${b.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <SloganBand />
    </ToolScreen>
  );
}
