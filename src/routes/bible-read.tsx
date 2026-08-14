import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

import {
  ArrowIcon,
  AudioIcon,
  HighlightIcon,
  NightIcon,
  NoteIcon,
  ShareGlyph,
  StarIcon,
  TypeIcon,
} from "@/components/bible/bible-icons";
import { Screen } from "@/components/layout/Screen";
import { newTestament, oldTestament, samplePassage } from "@/lib/bible-data";
import { useLang } from "@/lib/i18n";

const searchSchema = z.object({
  book: z.string().catch("jhn"),
  ch: z.number().catch(1),
});

export const Route = createFileRoute("/bible-read")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "شاشة القراءة — الكتاب المقدس | Alpha" },
      {
        name: "description",
        content:
          "The Alpha reading screen: calm verse typography, chapter navigation, reading progress, font size, night mode, highlighting, notes, favourites, sharing and audio.",
      },
      { property: "og:title", content: "شاشة القراءة — الكتاب المقدس | Alpha" },
      { property: "og:description", content: "A calm, typography-first Bible reading experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibleRead,
});

function BibleRead() {
  const { t, dir, isArabic } = useLang();
  const { book: bookId, ch } = Route.useSearch();
  const [night, setNight] = useState(false);
  const [scale, setScale] = useState(1);
  const [active, setActive] = useState<number | null>(null);

  const all = [...oldTestament, ...newTestament];
  const book = all.find((b) => b.id === bookId) ?? all[0]!;
  const name = isArabic ? book.ar : book.en;
  const pct = Math.round((ch / book.chapters) * 100);

  const shell = night ? "bg-inkblue" : "scriptorium";
  const body = night ? "text-vellum" : "text-inkblue";
  const soft = night ? "text-vellum/55" : "text-quiet";
  const surface = night
    ? "border border-illum/20 bg-vellum/[0.06]"
    : "vellum-card";

  return (
    <Screen className={shell}>
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-40 ${
          isArabic ? "font-arabic" : "font-sans"
        } ${body}`}
      >
        {/* ── Reading header ── */}
        <header
          className={`safe-top safe-sticky-top sticky z-30 px-4 pb-2.5 backdrop-blur-xl ${
            night ? "bg-inkblue/85" : "bg-vellum/85"
          }`}
        >
          <div className="flex items-center gap-3">
            <Link
              to="/bible-chapters"
              search={{ book: book.id }}
              aria-label={t("app.back")}
              className={`press grid size-10 place-items-center rounded-2xl ${surface}`}
            >
              <ArrowIcon className="size-4 ltr:rotate-180" />
            </Link>
            <div className="min-w-0 flex-1 text-center">
              <p className="truncate font-display text-[16.5px] font-semibold">
                {name} {ch}
              </p>
              <p className={`font-manrope text-[10px] ${soft}`}>
                {t("bib.chapter")} {ch} {t("bib.of")} {book.chapters}
              </p>
            </div>
            <button
              type="button"
              aria-label={t("bib.tool.favorites")}
              className={`press grid size-10 place-items-center rounded-2xl text-copper ${surface}`}
            >
              <StarIcon className="size-[17px]" />
            </button>
          </div>

          <div className={`mt-2.5 h-[3px] overflow-hidden rounded-full ${night ? "bg-vellum/15" : "bg-inkblue/10"}`}>
            <span
              className="block h-full rounded-full bg-gradient-to-r from-copper to-illum"
              style={{ width: `${pct}%` }}
            />
          </div>
        </header>

        <main className="px-5 pt-4">
          {/* Chapter opener */}
          <div className="text-center">
            <span className={`font-manrope text-[9.5px] font-semibold tracking-[0.2em] uppercase ${soft}`}>
              {t("bib.chapter")} {ch}
            </span>
            <div className="gold-hairline mx-auto mt-2.5 h-px w-24 opacity-60" />
          </div>

          {/* Verses */}
          <div className="mt-5 space-y-3.5" style={{ fontSize: `${15.5 * scale}px` }}>
            {samplePassage.map((verse, i) => {
              const on = active === verse.n;
              return (
                <button
                  key={verse.n}
                  type="button"
                  onClick={() => setActive(on ? null : verse.n)}
                  className={`verse-rise block w-full rounded-[18px] px-3 py-2 text-start leading-[2] transition-colors ${
                    on
                      ? night
                        ? "bg-illum/12 ring-1 ring-illum/35"
                        : "bg-illum/20 ring-1 ring-copper/25"
                      : ""
                  }`}
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  <span className="font-manrope align-super text-[0.62em] font-bold text-copper">
                    {verse.n}
                  </span>{" "}
                  <span className={i === 0 ? "" : undefined}>
                    {i === 0 && !isArabic ? (
                      <>
                        <span className="drop-cap">{verse.en.slice(0, 1)}</span>
                        {verse.en.slice(1)}
                      </>
                    ) : isArabic ? (
                      verse.ar
                    ) : (
                      verse.en
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Verse action sheet (appears when a verse is selected) */}
          {active !== null ? (
            <div className={`mt-4 flex items-center justify-around rounded-[22px] px-2 py-3 ${surface}`}>
              {[
                ["bib.act.highlight", <HighlightIcon key="h" className="size-[18px]" />],
                ["bib.act.note", <NoteIcon key="n" className="size-[18px]" />],
                ["bib.act.favorite", <StarIcon key="s" className="size-[18px]" />],
                ["bib.act.share", <ShareGlyph key="sh" className="size-[18px]" />],
              ].map(([key, icon]) => (
                <button
                  key={key as string}
                  type="button"
                  className="press flex flex-col items-center gap-1.5 px-2 text-copper"
                >
                  {icon as React.ReactNode}
                  <span className={`text-[10px] font-semibold ${body}`}>{t(key as string)}</span>
                </button>
              ))}
            </div>
          ) : null}

          {/* Chapter navigation */}
          <div className="mt-6 flex items-center gap-3">
            <Link
              to="/bible-read"
              search={{ book: book.id, ch: Math.max(1, ch - 1) }}
              className={`press flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-[12.5px] font-semibold ${surface}`}
            >
              <ArrowIcon className="size-3.5 ltr:rotate-180" />
              {t("bib.prev")}
            </Link>
            <Link
              to="/bible-read"
              search={{ book: book.id, ch: Math.min(book.chapters, ch + 1) }}
              className="press gold-cta flex flex-1 items-center justify-center gap-2 rounded-2xl py-3 text-[12.5px] font-semibold text-inkblue"
            >
              {t("bib.next")}
              <ArrowIcon className="size-3.5 rtl:rotate-180" />
            </Link>
          </div>

          <p className={`mt-6 text-center font-manrope text-[11px] ${soft}`}>{t("bib.read.footer")}</p>
        </main>

        {/* ── Floating reader toolbar ── */}
        <div className="fixed inset-x-0 z-40 mx-auto max-w-[430px] px-5" style={{ bottom: "calc(var(--bottom-nav-h) + max(var(--safe-bottom-min), var(--safe-bottom)) + 6px)" }}>
          <div
            className={`flex items-center justify-between gap-1 rounded-[26px] px-3 py-2 backdrop-blur-xl ${
              night ? "border border-illum/25 bg-inkblue/85" : "vellum-card"
            }`}
          >
            <button
              type="button"
              onClick={() => setNight((v) => !v)}
              aria-label={t("bib.reader.night")}
              className={`press grid size-10 place-items-center rounded-2xl ${
                night ? "bg-illum text-inkblue" : "text-inkblue"
              }`}
            >
              <NightIcon className="size-[18px]" />
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label={t("bib.reader.smaller")}
                onClick={() => setScale((s) => Math.max(0.85, +(s - 0.1).toFixed(2)))}
                className="press grid size-9 place-items-center rounded-2xl font-display text-[13px] font-semibold"
              >
                A-
              </button>
              <TypeIcon className="size-[17px] text-copper" />
              <button
                type="button"
                aria-label={t("bib.reader.bigger")}
                onClick={() => setScale((s) => Math.min(1.4, +(s + 0.1).toFixed(2)))}
                className="press grid size-9 place-items-center rounded-2xl font-display text-[15px] font-semibold"
              >
                A+
              </button>
            </div>

            <button
              type="button"
              aria-label={t("bib.audio")}
              className="press grid size-10 place-items-center rounded-2xl bg-inkblue text-illum"
            >
              <AudioIcon className="size-[18px]" />
            </button>
          </div>
        </div>
      </div>
    </Screen>
  );
}
