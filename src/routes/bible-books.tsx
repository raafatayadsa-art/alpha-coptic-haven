import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";

import { ArrowIcon, CodexIcon, ScrollIcon, SearchGlyph } from "@/components/bible/bible-icons";
import { BookRow } from "@/components/bible/BookRow";
import { Screen } from "@/components/layout/Screen";
import {
  newCategories,
  newTestament,
  oldCategories,
  oldTestament,
  type Testament,
} from "@/lib/bible-data";
import { useLang } from "@/lib/i18n";
import { SloganBand } from "@/components/layout/SloganBand";

const searchSchema = z.object({
  t: z.enum(["old", "new"]).catch("old"),
});

export const Route = createFileRoute("/bible-books")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "أسفار الكتاب المقدس — تصفح العهدين | Alpha" },
      {
        name: "description",
        content:
          "Browse the books of the Old and New Testament in Alpha: search by name, filter by category — Law, History, Wisdom, Prophets, Gospels, Epistles and Vision.",
      },
      { property: "og:title", content: "أسفار الكتاب المقدس — تصفح العهدين | Alpha" },
      {
        property: "og:description",
        content: "Search and filter every book of the Bible inside Alpha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibleBooks,
});

function BibleBooks() {
  const { t, dir, isArabic } = useLang();
  const { t: testament } = Route.useSearch();
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const isOld = testament === "old";
  const books = isOld ? oldTestament : newTestament;
  const categories = isOld ? oldCategories : newCategories;

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter(
      (b) =>
        (category === "all" || b.category === category) &&
        (q === "" || b.ar.includes(query.trim()) || b.en.toLowerCase().includes(q)),
    );
  }, [books, category, query]);

  const go = (next: Testament) => {
    setCategory("all");
    void navigate({ to: "/bible-books", search: { t: next } });
  };

  return (
    <Screen className="scriptorium">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-10 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        {/* ── Header ── */}
        <header className="safe-top sticky top-0 z-30 bg-vellum/85 px-4 pb-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Link
              to="/bible"
              aria-label={t("app.back")}
              className="press grid size-10 place-items-center rounded-2xl border border-illum/30 bg-white/70 text-inkblue"
            >
              <ArrowIcon className="size-4 ltr:rotate-180" />
            </Link>
            <div className="min-w-0 flex-1 text-center">
              <p className="font-display text-[17px] font-semibold text-inkblue">
                {isOld ? t("bib.ot") : t("bib.nt")}
              </p>
              <p className="font-manrope text-[10.5px] text-quiet">
                {books.length} {t("bib.books")}
              </p>
            </div>
            <span className="grid size-10 place-items-center rounded-2xl bg-inkblue text-illum">
              {isOld ? <ScrollIcon className="size-[18px]" /> : <CodexIcon className="size-[18px]" />}
            </span>
          </div>

          {/* Testament switch */}
          <div className="mt-3 flex rounded-[20px] border border-illum/30 bg-white/60 p-1">
            {(["old", "new"] as Testament[]).map((key) => {
              const on = key === testament;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => go(key)}
                  className={`press flex-1 rounded-2xl py-2 text-[12.5px] font-semibold transition-colors ${
                    on ? "bg-inkblue text-vellum" : "text-quiet"
                  }`}
                >
                  {key === "old" ? t("bib.ot") : t("bib.nt")}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <label className="vellum-card mt-3 flex items-center gap-2.5 rounded-[20px] px-3.5 py-2.5">
            <SearchGlyph className="size-4 shrink-0 text-quiet" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("bib.search.book")}
              className="w-full bg-transparent font-manrope text-[12.5px] text-inkblue outline-none placeholder:text-quiet/70"
            />
          </label>

          {/* Categories */}
          <div className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4">
            {categories.map((c) => {
              const on = c.id === category;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategory(c.id)}
                  className={`press shrink-0 rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold whitespace-nowrap transition-colors ${
                    on
                      ? "bg-copper text-vellum"
                      : "border border-illum/30 bg-white/60 text-inkblue/70"
                  }`}
                >
                  {isArabic ? c.ar : c.en}
                </button>
              );
            })}
          </div>
          <div className="gold-hairline mt-3 h-px opacity-40" />
        </header>

        <main className="space-y-2.5 px-4 pt-3">
          {visible.map((book, i) => (
            <BookRow key={book.id} book={book} index={i + 1} />
          ))}

          {visible.length === 0 ? (
            <p className="py-16 text-center font-manrope text-[12.5px] text-quiet">
              {t("bib.empty")}
            </p>
          ) : null}
        </main>
      </div>
      <SloganBand />
    </Screen>
  );
}
