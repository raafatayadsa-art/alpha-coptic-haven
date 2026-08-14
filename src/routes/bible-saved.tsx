import { createFileRoute } from "@tanstack/react-router";

import { AlphaOmegaMark, BookmarkIcon, ShareGlyph } from "@/components/bible/bible-icons";
import { StatTile, ToolScreen } from "@/components/bible/ToolScreen";
import { useLang } from "@/lib/i18n";
import { SloganBand } from "@/components/layout/SloganBand";

export const Route = createFileRoute("/bible-saved")({
  head: () => ({
    meta: [
      { title: "الآيات المحفوظة — الكتاب المقدس | Alpha" },
      {
        name: "description",
        content: "Your saved Bible verses in Alpha — treasures from God's word, kept in one quiet collection.",
      },
      { property: "og:title", content: "الآيات المحفوظة — الكتاب المقدس | Alpha" },
      { property: "og:description", content: "Treasures from God's word, saved for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibleSaved,
});

const saved = [
  {
    id: 1,
    ar: "«أَسْتَطِيعُ كُلَّ شَيْءٍ فِي المَسِيحِ الَّذِي يُقَوِّينِي»",
    en: "“I can do all things through Christ who strengthens me.”",
    refAr: "فيلبي ٤ : ١٣",
    refEn: "Philippians 4:13",
  },
  {
    id: 2,
    ar: "«تَعَالَوْا إِلَيَّ يَا جَمِيعَ المُتْعَبِينَ وَالثَّقِيلِي الأَحْمَالِ وَأَنَا أُرِيحُكُمْ»",
    en: "“Come to me, all you who are weary and burdened, and I will give you rest.”",
    refAr: "متى ١١ : ٢٨",
    refEn: "Matthew 11:28",
  },
  {
    id: 3,
    ar: "«الرَّبُّ رَاعِيَّ فَلاَ يُعْوِزُنِي شَيْءٌ»",
    en: "“The Lord is my shepherd; I shall not want.”",
    refAr: "مزمور ٢٣ : ١",
    refEn: "Psalm 23:1",
  },
];

function BibleSaved() {
  const { t, isArabic } = useLang();

  return (
    <ToolScreen title={t("bib.sv.title")} subtitle={t("bib.sv.sub")}>
      <div className="grid grid-cols-2 gap-2.5">
        <StatTile value={isArabic ? "٣" : "3"} label={t("bib.sv.count")} />
        <StatTile value={isArabic ? "٢" : "2"} label={t("bib.hl.books")} />
      </div>

      <div className="space-y-3.5">
        {saved.map((v) => (
          <article
            key={v.id}
            className="ink-card relative isolate overflow-hidden rounded-[28px] p-5 text-vellum"
          >
            <AlphaOmegaMark className="pointer-events-none absolute -end-4 -top-4 -z-10 w-28 text-illum opacity-[0.14]" />
            <BookmarkIcon className="size-[17px] text-illum" />
            <p className="mt-3 font-display text-[16.5px] leading-[2] text-vellum">
              {isArabic ? v.ar : v.en}
            </p>
            <div className="mt-3.5 flex items-center justify-between">
              <span className="font-manrope text-[11.5px] font-semibold text-illum">
                {isArabic ? v.refAr : v.refEn}
              </span>
              <span className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label={t("bib.act.share")}
                  className="press grid size-9 place-items-center rounded-full border border-illum/25 bg-vellum/10 text-vellum/85"
                >
                  <ShareGlyph className="size-[15px]" />
                </button>
                <button
                  type="button"
                  aria-label={t("bib.act.copy")}
                  className="press rounded-full border border-illum/25 bg-vellum/10 px-3 py-2 font-manrope text-[11px] font-semibold text-vellum/85"
                >
                  {t("bib.act.copy")}
                </button>
              </span>
            </div>
          </article>
        ))}
      </div>
      <SloganBand />
    </ToolScreen>
  );
}
