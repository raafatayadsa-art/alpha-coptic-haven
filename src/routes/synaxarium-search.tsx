import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SaintCard } from "@/components/synaxarium/SaintCard";
import { SynaxSectionTitle, SynaxShell } from "@/components/synaxarium/SynaxShell";
import { SearchGlyph } from "@/components/synaxarium/synax-icons";
import { useLang } from "@/lib/i18n";
import { L, categories, pick, recentSearches, saintOfDay, todaySaints } from "@/lib/synaxarium-data";

export const Route = createFileRoute("/synaxarium-search")({
  head: () => ({
    meta: [
      { title: "بحث السنكسار — قديسون وتذكارات | Alpha" },
      {
        name: "description",
        content: "Search the Coptic Synaxarium by saint, Coptic day or commemoration, with suggested lives to discover.",
      },
      { property: "og:title", content: "بحث السنكسار — قديسون وتذكارات | Alpha" },
      { property: "og:description", content: "Find any saint or commemoration in the Coptic Synaxarium." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SynaxariumSearch,
});

function SynaxariumSearch() {
  const { lang } = useLang();
  const [q, setQ] = useState("");

  return (
    <SynaxShell eyebrow={pick(L.title, lang)} title={pick(L.searchTitle, lang)} subtitle={pick(L.searchHint, lang)}>
      <div className="sx-glass mt-1 flex items-center gap-2.5 rounded-[22px] px-3.5 py-3">
        <SearchGlyph className="size-[18px] shrink-0 text-icongold" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={pick(L.search, lang)}
          className="min-w-0 flex-1 bg-transparent font-display text-[14px] text-ivory placeholder:text-ivory/35 focus:outline-none"
        />
        {q ? (
          <button
            type="button"
            onClick={() => setQ("")}
            className="press font-manrope text-[10.5px] font-semibold text-icongold"
          >
            {lang === "ar" ? "مسح" : "Clear"}
          </button>
        ) : null}
      </div>

      <div className="-mx-4 mt-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-2">
          {categories.slice(1).map((c) => (
            <button
              key={c.key}
              type="button"
              className="press shrink-0 rounded-full border border-icongold/14 bg-synaxdeep/42 px-3 py-[7px] font-manrope text-[11px] font-semibold text-ivory/60"
            >
              {pick(c.label, lang)}
            </button>
          ))}
        </div>
      </div>

      <SynaxSectionTitle title={pick(L.recent, lang)} />
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((r) => (
          <button
            key={r.en}
            type="button"
            onClick={() => setQ(pick(r, lang))}
            className="press rounded-full border border-icongold/22 bg-synaxdeep/45 px-3 py-[7px] font-manrope text-[11px] text-iconleaf/85"
          >
            {pick(r, lang)}
          </button>
        ))}
      </div>

      <SynaxSectionTitle title={pick(L.suggested, lang)} />
      <div className="space-y-3">
        {[saintOfDay, ...todaySaints].slice(0, 4).map((s) => (
          <SaintCard key={s.id} saint={s} />
        ))}
      </div>
    </SynaxShell>
  );
}
