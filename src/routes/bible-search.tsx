import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { ArrowIcon, SearchGlyph } from "@/components/bible/bible-icons";
import { ToolScreen } from "@/components/bible/ToolScreen";
import { useLang } from "@/lib/i18n";
import { SloganBand } from "@/components/layout/SloganBand";

export const Route = createFileRoute("/bible-search")({
  head: () => ({
    meta: [
      { title: "البحث في الكتاب المقدس | Alpha" },
      {
        name: "description",
        content: "Search verses, books and words across the whole Bible inside Alpha, with recent searches and suggestions.",
      },
      { property: "og:title", content: "البحث في الكتاب المقدس | Alpha" },
      { property: "og:description", content: "Find any verse, book or word." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibleSearch,
});

const recent = [
  { ar: "المحبة", en: "Love" },
  { ar: "النور", en: "Light" },
  { ar: "الرجاء", en: "Hope" },
  { ar: "مزمور ٢٣", en: "Psalm 23" },
];

const results = [
  {
    refAr: "يوحنا ١ : ٥",
    refEn: "John 1:5",
    book: "jhn",
    ch: 1,
    ar: "«والنور يضيء في الظلمة، والظلمة لم تدركه»",
    en: "“The light shines in the darkness, and the darkness has not overcome it.”",
  },
  {
    refAr: "متى ٥ : ١٤",
    refEn: "Matthew 5:14",
    book: "mat",
    ch: 5,
    ar: "«أنتم نور العالم»",
    en: "“You are the light of the world.”",
  },
  {
    refAr: "مزمور ١١٩ : ١٠٥",
    refEn: "Psalm 119:105",
    book: "psa",
    ch: 119,
    ar: "«سراج لرجلي كلامك ونور لسبيلي»",
    en: "“Your word is a lamp to my feet and a light to my path.”",
  },
];

function BibleSearch() {
  const { t, isArabic } = useLang();
  const [query, setQuery] = useState("");

  return (
    <ToolScreen title={t("bib.sr.title")} subtitle={t("bib.sr.sub")}>
      <div className="vellum-card flex items-center gap-2.5 rounded-[22px] px-4 py-3">
        <SearchGlyph className="size-[17px] shrink-0 text-quiet" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("bib.search.hint")}
          className="min-w-0 flex-1 bg-transparent font-manrope text-[12.5px] text-inkblue placeholder:text-quiet focus:outline-none"
        />
      </div>

      <section>
        <div className="mb-2.5 flex items-center gap-3 px-1">
          <span className="size-1.5 rounded-full bg-copper" />
          <h2 className="font-display text-[15px] font-semibold text-inkblue">{t("bib.sr.recent")}</h2>
          <span className="gold-hairline h-px flex-1 opacity-40" />
        </div>
        <div className="flex flex-wrap gap-2">
          {recent.map((r) => (
            <button
              key={r.en}
              type="button"
              onClick={() => setQuery(isArabic ? r.ar : r.en)}
              className="press vellum-card rounded-full px-3.5 py-2 font-manrope text-[11.5px] font-semibold text-quiet"
            >
              {isArabic ? r.ar : r.en}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-2.5 flex items-center gap-3 px-1">
          <span className="size-1.5 rounded-full bg-copper" />
          <h2 className="font-display text-[15px] font-semibold text-inkblue">
            {results.length} {t("bib.sr.results")}
          </h2>
          <span className="gold-hairline h-px flex-1 opacity-40" />
        </div>
        <div className="space-y-3">
          {results.map((r) => (
            <Link
              key={r.refEn}
              to="/bible-read"
              search={{ book: r.book, ch: r.ch }}
              className="press vellum-card flex items-start gap-3 rounded-[24px] p-4"
            >
              <span className="min-w-0 flex-1">
                <span className="block font-manrope text-[11px] font-semibold text-copper">
                  {isArabic ? r.refAr : r.refEn}
                </span>
                <span className="mt-1.5 block font-display text-[14px] leading-[1.95] text-inkblue">
                  {isArabic ? r.ar : r.en}
                </span>
              </span>
              <ArrowIcon className="mt-1 size-4 shrink-0 text-quiet/50 rtl:rotate-180" />
            </Link>
          ))}
        </div>
      </section>
      <SloganBand />
    </ToolScreen>
  );
}
