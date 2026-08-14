import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { HighlightIcon, ShareGlyph } from "@/components/bible/bible-icons";
import { StatTile, ToolScreen } from "@/components/bible/ToolScreen";
import { useLang } from "@/lib/i18n";
import { SloganBand } from "@/components/layout/SloganBand";

export const Route = createFileRoute("/bible-highlights")({
  head: () => ({
    meta: [
      { title: "الآيات الملوّنة — الكتاب المقدس | Alpha" },
      {
        name: "description",
        content: "Every verse you highlighted in Alpha, filtered by colour with share and remove actions.",
      },
      { property: "og:title", content: "الآيات الملوّنة — الكتاب المقدس | Alpha" },
      { property: "og:description", content: "Your highlighted verses, gathered in one calm place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibleHighlights,
});

const colors = [
  { id: "all", key: "bib.hl.all", swatch: "bg-gradient-to-br from-copper to-illum" },
  { id: "yellow", key: "bib.hl.yellow", swatch: "bg-amber-300" },
  { id: "pink", key: "bib.hl.pink", swatch: "bg-rose-300" },
  { id: "blue", key: "bib.hl.blue", swatch: "bg-sky-300" },
  { id: "green", key: "bib.hl.green", swatch: "bg-emerald-300" },
];

const items = [
  {
    id: 1,
    color: "yellow",
    tint: "bg-amber-200/35 border-amber-400/40",
    ar: "«لأَنَّهُ حَيْثُمَا اجْتَمَعَ اثْنَانِ أَوْ ثَلاَثَةٌ بِاسْمِي فَهُنَاكَ أَكُونُ فِي وَسْطِهِمْ»",
    en: "“For where two or three are gathered together in my name, there am I in the midst of them.”",
    refAr: "متى ١٨ : ٢٠",
    refEn: "Matthew 18:20",
  },
  {
    id: 2,
    color: "blue",
    tint: "bg-sky-200/35 border-sky-400/40",
    ar: "«الرَّبُّ نُورِي وَخَلاَصِي، مِمَّنْ أَخَافُ؟»",
    en: "“The Lord is my light and my salvation; whom shall I fear?”",
    refAr: "مزمور ٢٧ : ١",
    refEn: "Psalm 27:1",
  },
  {
    id: 3,
    color: "pink",
    tint: "bg-rose-200/35 border-rose-400/40",
    ar: "«المَحَبَّةُ تَتَأَنَّى وَتَرْفُقُ، المَحَبَّةُ لاَ تَحْسِدُ»",
    en: "“Love is patient, love is kind; love does not envy.”",
    refAr: "١ كورنثوس ١٣ : ٤",
    refEn: "1 Corinthians 13:4",
  },
  {
    id: 4,
    color: "green",
    tint: "bg-emerald-200/35 border-emerald-400/40",
    ar: "«ثِقُوا! أَنَا قَدْ غَلَبْتُ العَالَمَ»",
    en: "“Take heart! I have overcome the world.”",
    refAr: "يوحنا ١٦ : ٣٣",
    refEn: "John 16:33",
  },
];

function BibleHighlights() {
  const { t, isArabic } = useLang();
  const [filter, setFilter] = useState("all");
  const list = filter === "all" ? items : items.filter((i) => i.color === filter);

  return (
    <ToolScreen title={t("bib.hl.title")} subtitle={t("bib.hl.sub")}>
      <div className="grid grid-cols-3 gap-2.5">
        <StatTile value={isArabic ? "٢٤" : "24"} label={t("bib.hl.count")} />
        <StatTile value={isArabic ? "٧" : "7"} label={t("bib.hl.books")} />
        <StatTile value={isArabic ? "٤" : "4"} label={t("bib.hl.filter")} />
      </div>

      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {colors.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setFilter(c.id)}
            className={`press flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 font-manrope text-[11.5px] font-semibold transition-colors ${
              filter === c.id
                ? "gold-cta text-inkblue"
                : "vellum-card text-quiet"
            }`}
          >
            <span className={`size-2.5 rounded-full ${c.swatch}`} />
            {t(c.key)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((v) => (
          <article key={v.id} className={`rounded-[24px] border p-4 ${v.tint}`}>
            <p className="font-display text-[15px] leading-[2] text-inkblue">{isArabic ? v.ar : v.en}</p>
            <p className="mt-2 font-manrope text-[11px] font-semibold text-copper">
              {isArabic ? v.refAr : v.refEn}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                className="press flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white/80 py-2 font-manrope text-[11.5px] font-semibold text-inkblue"
              >
                <ShareGlyph className="size-[15px]" />
                {t("bib.act.share")}
              </button>
              <button
                type="button"
                className="press flex flex-1 items-center justify-center gap-1.5 rounded-full bg-inkblue/[0.06] py-2 font-manrope text-[11.5px] font-semibold text-quiet"
              >
                <HighlightIcon className="size-[15px]" />
                {t("bib.hl.remove")}
              </button>
            </div>
          </article>
        ))}
      </div>
      <SloganBand />
    </ToolScreen>
  );
}
