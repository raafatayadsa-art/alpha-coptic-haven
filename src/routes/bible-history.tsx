import { Link, createFileRoute } from "@tanstack/react-router";

import { ArrowIcon, HistoryIcon } from "@/components/bible/bible-icons";
import { StatTile, ToolScreen } from "@/components/bible/ToolScreen";
import { useLang } from "@/lib/i18n";
import { SloganBand } from "@/components/layout/SloganBand";

export const Route = createFileRoute("/bible-history")({
  head: () => ({
    meta: [
      { title: "سجل القراءة — الكتاب المقدس | Alpha" },
      {
        name: "description",
        content: "A chronological log of the Bible chapters you read recently inside Alpha.",
      },
      { property: "og:title", content: "سجل القراءة — الكتاب المقدس | Alpha" },
      { property: "og:description", content: "Where you read recently, day by day." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibleHistory,
});

const groups = [
  {
    key: "bib.hs.today",
    rows: [
      { ar: "يوحنا ١", en: "John 1", book: "jhn", ch: 1, minAr: "١٢", minEn: "12" },
      { ar: "مزمور ٢٣", en: "Psalm 23", book: "psa", ch: 23, minAr: "٤", minEn: "4" },
    ],
  },
  {
    key: "bib.hs.yesterday",
    rows: [
      { ar: "متى ٥", en: "Matthew 5", book: "mat", ch: 5, minAr: "١٨", minEn: "18" },
      { ar: "أمثال ٣", en: "Proverbs 3", book: "pro", ch: 3, minAr: "٧", minEn: "7" },
    ],
  },
  {
    key: "bib.hs.earlier",
    rows: [
      { ar: "التكوين ١", en: "Genesis 1", book: "gen", ch: 1, minAr: "١٥", minEn: "15" },
      { ar: "رومية ٨", en: "Romans 8", book: "rom", ch: 8, minAr: "٢١", minEn: "21" },
      { ar: "إشعياء ٥٣", en: "Isaiah 53", book: "isa", ch: 53, minAr: "٩", minEn: "9" },
    ],
  },
];

function BibleHistory() {
  const { t, isArabic } = useLang();

  return (
    <ToolScreen title={t("bib.hs.title")} subtitle={t("bib.hs.sub")}>
      <div className="grid grid-cols-3 gap-2.5">
        <StatTile value={isArabic ? "٧" : "7"} label={t("bib.chapters")} />
        <StatTile value={isArabic ? "٨٦" : "86"} label={t("bib.hs.minutes")} />
        <StatTile value={isArabic ? "١٢" : "12"} label={t("bib.stat.streak")} />
      </div>

      {groups.map((g) => (
        <section key={g.key}>
          <div className="mb-2.5 flex items-center gap-3 px-1">
            <span className="size-1.5 rounded-full bg-copper" />
            <h2 className="font-display text-[15px] font-semibold text-inkblue">{t(g.key)}</h2>
            <span className="gold-hairline h-px flex-1 opacity-40" />
          </div>
          <div className="vellum-card divide-y divide-shade/60 overflow-hidden rounded-[24px]">
            {g.rows.map((r) => (
              <Link
                key={r.en}
                to="/bible-read"
                search={{ book: r.book, ch: r.ch }}
                className="press flex items-center gap-3 px-4 py-3.5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-inkblue/[0.05] text-copper ring-1 ring-illum/30">
                  <HistoryIcon className="size-[15px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[14.5px] font-semibold text-inkblue">
                    {isArabic ? r.ar : r.en}
                  </span>
                  <span className="mt-0.5 block font-manrope text-[10.5px] text-quiet">
                    {isArabic ? r.minAr : r.minEn} {t("bib.hs.minutes")}
                  </span>
                </span>
                <ArrowIcon className="size-4 shrink-0 text-quiet/50 rtl:rotate-180" />
              </Link>
            ))}
          </div>
        </section>
      ))}
      <SloganBand />
    </ToolScreen>
  );
}
