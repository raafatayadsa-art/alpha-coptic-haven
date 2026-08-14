import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SaintCard } from "@/components/synaxarium/SaintCard";
import { SynaxSectionTitle, SynaxShell } from "@/components/synaxarium/SynaxShell";
import { BookmarkGlyph, ChevronGlyph } from "@/components/synaxarium/synax-icons";
import { useLang } from "@/lib/i18n";
import { L, categories, copticToday, dayStrip, pick, saintOfDay, todaySaints, type CategoryKey } from "@/lib/synaxarium-data";
import { SloganBand } from "@/components/layout/SloganBand";

export const Route = createFileRoute("/synaxarium-day")({
  head: () => ({
    meta: [
      { title: "تذكارات اليوم — السنكسار | Alpha" },
      {
        name: "description",
        content: "Every saint and commemoration of the Coptic day, arranged as a calm gilded list inside Alpha.",
      },
      { property: "og:title", content: "تذكارات اليوم — السنكسار | Alpha" },
      { property: "og:description", content: "Browse the saints commemorated on this Coptic day." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SynaxariumDay,
});

function SynaxariumDay() {
  const { lang } = useLang();
  const [cat, setCat] = useState<CategoryKey>("all");
  const [dayIndex, setDayIndex] = useState(4);

  const all = [saintOfDay, ...todaySaints];
  const list = cat === "all" ? all : all.filter((s) => s.category === cat);

  return (
    <SynaxShell
      eyebrow={pick(L.title, lang)}
      title={`${pick(copticToday.day, lang)} ${pick(copticToday.month, lang)}`}
      subtitle={`${pick(copticToday.gregorian, lang)} · ${pick(L.todayCount, lang)}`}
      action={
        <button
          type="button"
          aria-label={pick(L.save, lang)}
          className="press grid size-10 place-items-center rounded-full border border-icongold/25 bg-synaxnight/50 text-ivory/80"
        >
          <BookmarkGlyph className="size-[17px]" />
        </button>
      }
    >
      {/* Day pager */}
      <div className="-mx-4 overflow-x-auto px-4 pt-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2">
          {dayStrip.map((d, i) => {
            const active = i === dayIndex;
            return (
              <button
                key={d.day.en}
                type="button"
                onClick={() => setDayIndex(i)}
                className={`press flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-[7px] font-manrope text-[11px] font-semibold transition-colors ${
                  active
                    ? "border-icongold/50 bg-icongold/18 text-iconleaf"
                    : "border-icongold/14 bg-synaxdeep/40 text-ivory/55"
                }`}
              >
                {pick(d.day, lang)} {pick(copticToday.month, lang)}
                <span className="font-manrope text-[9.5px] text-ivory/40">{d.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category filters */}
      <div className="-mx-4 mt-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2">
          {categories.map((c) => {
            const active = c.key === cat;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => setCat(c.key)}
                className={`press shrink-0 rounded-full border px-3 py-[7px] font-manrope text-[11px] font-semibold transition-colors ${
                  active
                    ? "border-icongold/50 bg-icongold/18 text-iconleaf"
                    : "border-icongold/14 bg-synaxdeep/40 text-ivory/55"
                }`}
              >
                {pick(c.label, lang)}
              </button>
            );
          })}
        </div>
      </div>

      <SynaxSectionTitle title={pick(L.dayTitle, lang)} caption={`${list.length}`} />
      <div className="space-y-3">
        {list.map((s) => (
          <SaintCard key={s.id} saint={s} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 font-manrope text-[11px] text-ivory/40">
        <ChevronGlyph className="size-3.5 rotate-180 rtl:rotate-0" />
        {lang === "ar" ? "اليوم السابق" : "Previous day"}
        <span className="mx-2 size-1 rounded-full bg-ivory/20" />
        {lang === "ar" ? "اليوم التالي" : "Next day"}
        <ChevronGlyph className="size-3.5 rtl:rotate-180" />
      </div>
      <SloganBand />
    </SynaxShell>
  );
}
