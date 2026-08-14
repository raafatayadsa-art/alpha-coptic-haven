import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CopticCross } from "@/components/church/icons";
import { KatamerosShell } from "@/components/katameros/KatamerosShell";
import { ArrowGlyph, CalendarGlyph, SearchGlass } from "@/components/katameros/katameros-icons";
import { useLang } from "@/lib/i18n";
import { copticMonths, groupLabel, readings } from "@/lib/katameros-data";
import { SloganBand } from "@/components/layout/SloganBand";

export const Route = createFileRoute("/katameros-search")({
  head: () => ({
    meta: [
      { title: "البحث في القطمارس | Alpha" },
      {
        name: "description",
        content:
          "Search the Alpha Katameros: find a day, a feast, a Coptic date or a reading reference across vespers, matins and the Divine Liturgy.",
      },
      { property: "og:title", content: "البحث في القطمارس | Alpha" },
      { property: "og:description", content: "Find any day, feast or reading in the Alpha lectionary." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: KatamerosSearch,
});

const recent = [
  { ar: "٢٩ كيهك", en: "29 Kiahk" },
  { ar: "إنجيل باكر", en: "Matins gospel" },
  { ar: "أحد الشعانين", en: "Palm Sunday" },
];

function KatamerosSearch() {
  const { t, lang } = useLang();
  const [query, setQuery] = useState("");

  const results = readings.filter((r) =>
    query.trim().length === 0
      ? true
      : `${r.kind[lang]} ${r.ref[lang]} ${r.excerpt[lang]}`.includes(query.trim()),
  );

  return (
    <KatamerosShell title={t("km.sr.title")} subtitle={t("km.sr.sub")}>
      {/* ── Field ── */}
      <section className="km-glass flex items-center gap-2.5 rounded-[22px] px-4 py-3">
        <SearchGlass className="size-[17px] shrink-0 text-brass" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("km.sr.hint")}
          className="min-w-0 flex-1 bg-transparent font-manrope text-[12.5px] text-cream outline-none placeholder:text-cream/35"
        />
      </section>

      {/* ── Recent ── */}
      <section>
        <div className="mb-2.5 flex items-center gap-3 px-1">
          <span className="size-1.5 rounded-full bg-brass" />
          <h2 className="font-display text-[15.5px] font-semibold text-cream">{t("km.sr.recent")}</h2>
          <span className="km-hairline h-px flex-1 opacity-40" />
        </div>
        <div className="flex flex-wrap gap-2">
          {recent.map((item) => (
            <button
              key={item.en}
              type="button"
              onClick={() => setQuery("")}
              className="press rounded-full border border-cream/12 bg-wine/40 px-3 py-1.5 font-manrope text-[11px] text-cream/65"
            >
              {item[lang]}
            </button>
          ))}
        </div>
      </section>

      {/* ── Jump to a Coptic month ── */}
      <section>
        <div className="mb-2.5 flex items-center gap-3 px-1">
          <span className="size-1.5 rounded-full bg-brass" />
          <h2 className="font-display text-[15.5px] font-semibold text-cream">{t("km.sr.byMonth")}</h2>
          <span className="km-hairline h-px flex-1 opacity-40" />
        </div>
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {copticMonths.map((m) => (
            <Link
              key={m.id}
              to="/katameros-calendar"
              className="press flex shrink-0 items-center gap-1.5 rounded-full border border-cream/12 bg-wine/40 px-3 py-1.5 font-manrope text-[11px] text-cream/70"
            >
              <CalendarGlyph className="size-3.5 text-brass" />
              {m.name[lang]}
            </Link>
          ))}
        </div>
      </section>

      {/* ── Results ── */}
      <section>
        <div className="mb-2.5 flex items-center gap-3 px-1">
          <span className="size-1.5 rounded-full bg-brass" />
          <h2 className="font-display text-[15.5px] font-semibold text-cream">{t("km.sr.results")}</h2>
          <span className="km-hairline h-px flex-1 opacity-40" />
          <span className="font-manrope text-[10.5px] tabular-nums text-cream/35">{results.length}</span>
        </div>

        <div className="space-y-2.5">
          {results.map((reading) => (
            <Link
              key={reading.id}
              to="/katameros-read"
              className="press km-glass block rounded-[22px] px-4 py-3.5"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-goldleaf/25 bg-goldleaf/10 px-2.5 py-0.5 font-manrope text-[10px] font-semibold text-goldleaf">
                  {groupLabel[reading.group][lang]}
                </span>
                <span className="font-manrope text-[10.5px] text-cream/45">{reading.ref[lang]}</span>
                <ArrowGlyph className="ms-auto size-4 text-cream/25 rtl:rotate-180" />
              </div>
              <p className="mt-2 line-clamp-2 font-display text-[14.5px] leading-relaxed text-cream/85">
                {reading.excerpt[lang]}
              </p>
            </Link>
          ))}

          {results.length === 0 ? (
            <p className="km-glass rounded-[22px] px-4 py-6 text-center font-manrope text-[12px] text-cream/45">
              {t("km.sr.empty")}
            </p>
          ) : null}
        </div>
      </section>

      <footer className="flex flex-col items-center gap-2 pt-1 text-center">
        <CopticCross className="size-5 text-brass/70" />
        <p className="font-manrope text-[11.5px] text-cream/35">{t("km.footer")}</p>
      </footer>
      <SloganBand />
    </KatamerosShell>
  );
}
