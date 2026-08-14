import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

import { ArrowIcon, CheckGlyph, GridIcon, ListIcon, StarIcon } from "@/components/bible/bible-icons";
import { Screen } from "@/components/layout/Screen";
import { bookInitial, chapterStates, newTestament, oldTestament } from "@/lib/bible-data";
import { useLang } from "@/lib/i18n";

const searchSchema = z.object({
  book: z.string().catch("jhn"),
});

export const Route = createFileRoute("/bible-chapters")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "أصحاحات السفر — اختر أصحاحًا | Alpha" },
      {
        name: "description",
        content:
          "Pick a chapter in Alpha: grid or list view, read/unread markers, book progress and quick jump to your last chapter.",
      },
      { property: "og:title", content: "أصحاحات السفر — اختر أصحاحًا | Alpha" },
      { property: "og:description", content: "Choose a chapter and keep your Bible reading going." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibleChapters,
});

function BibleChapters() {
  const { t, dir, isArabic } = useLang();
  const { book: bookId } = Route.useSearch();
  const [view, setView] = useState<"grid" | "list">("grid");

  const all = [...oldTestament, ...newTestament];
  const book = all.find((b) => b.id === bookId) ?? all[0]!;
  const states = chapterStates(book.chapters);
  const done = states.filter((s) => s === "done").length;
  const pct = Math.round((done / book.chapters) * 100);
  const name = isArabic ? book.ar : book.en;

  return (
    <Screen className="scriptorium">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-10 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        {/* ── Header: book identity ── */}
        <header className="safe-top relative px-4 pb-4">
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/bible-books"
              search={{ t: oldTestament.some((b) => b.id === book.id) ? "old" : "new" }}
              aria-label={t("app.back")}
              className="press grid size-10 place-items-center rounded-2xl border border-illum/30 bg-white/70 text-inkblue"
            >
              <ArrowIcon className="size-4 ltr:rotate-180" />
            </Link>
            <button
              type="button"
              aria-label={t("bib.tool.favorites")}
              className="press grid size-10 place-items-center rounded-2xl border border-illum/30 bg-white/70 text-copper"
            >
              <StarIcon className="size-[17px]" />
            </button>
          </div>

          <div className="ink-card relative isolate mt-3 overflow-hidden rounded-[28px] p-5 text-vellum">
            <span
              aria-hidden="true"
              className="illum-halo pointer-events-none absolute -end-10 -top-12 -z-10 size-48 rounded-full opacity-70"
            />
            <div className="flex items-end gap-3">
              <span className="font-display text-[52px] leading-none font-semibold text-illum/90">
                {bookInitial(name)}
              </span>
              <div className="min-w-0 flex-1 pb-1">
                <h1 className="truncate font-display text-[24px] leading-tight font-semibold">{name}</h1>
                <p className="mt-1 font-manrope text-[11px] text-vellum/55">
                  {book.chapters} {t("bib.chapters")} · {t("bib.read")} {done}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2.5">
              <span className="h-[5px] flex-1 overflow-hidden rounded-full bg-vellum/15">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-copper to-illum"
                  style={{ width: `${pct}%` }}
                />
              </span>
              <span className="font-manrope text-[11px] font-semibold tabular-nums text-illum">{pct}%</span>
            </div>
          </div>
        </header>

        <main className="px-4">
          {/* View switch */}
          <div className="mb-3 flex items-center gap-3 px-1">
            <span className="size-1.5 rounded-full bg-copper" />
            <h2 className="font-display text-[16px] font-semibold text-inkblue">{t("bib.pickChapter")}</h2>
            <span className="gold-hairline h-px flex-1 opacity-40" />
            <div className="flex rounded-full border border-illum/30 bg-white/60 p-0.5">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-label={v === "grid" ? t("bib.view.grid") : t("bib.view.list")}
                  onClick={() => setView(v)}
                  className={`press grid size-7 place-items-center rounded-full transition-colors ${
                    view === v ? "bg-inkblue text-vellum" : "text-quiet"
                  }`}
                >
                  {v === "grid" ? <GridIcon className="size-[14px]" /> : <ListIcon className="size-[14px]" />}
                </button>
              ))}
            </div>
          </div>

          {view === "grid" ? (
            <div className="grid grid-cols-5 gap-2">
              {states.map((state, i) => (
                <Link
                  key={i}
                  to="/bible-read"
                  search={{ book: book.id, ch: i + 1 }}
                  className={`press relative grid aspect-square place-items-center rounded-[18px] font-display text-[15px] font-semibold tabular-nums ${
                    state === "done"
                      ? "bg-inkblue text-illum"
                      : state === "reading"
                        ? "gold-cta text-inkblue"
                        : "vellum-card text-inkblue/70"
                  }`}
                >
                  {i + 1}
                  {state === "done" ? (
                    <span className="absolute bottom-1.5 size-1 rounded-full bg-illum/70" />
                  ) : null}
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {states.map((state, i) => (
                <Link
                  key={i}
                  to="/bible-read"
                  search={{ book: book.id, ch: i + 1 }}
                  className="press vellum-card flex items-center gap-3 rounded-[20px] px-3.5 py-3"
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-[13px] font-display text-[14px] font-semibold tabular-nums ${
                      state === "done"
                        ? "bg-inkblue text-illum"
                        : state === "reading"
                          ? "bg-copper text-vellum"
                          : "bg-inkblue/[0.06] text-inkblue/70"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13.5px] font-semibold text-inkblue">
                      {t("bib.chapter")} {i + 1}
                    </span>
                    <span className="mt-0.5 block font-manrope text-[10.5px] text-quiet">
                      {state === "done"
                        ? t("bib.state.done")
                        : state === "reading"
                          ? t("bib.state.reading")
                          : t("bib.state.new")}
                    </span>
                  </span>
                  {state === "done" ? (
                    <CheckGlyph className="size-4 text-copper" />
                  ) : (
                    <ArrowIcon className="size-4 text-quiet/50 rtl:rotate-180" />
                  )}
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </Screen>
  );
}
