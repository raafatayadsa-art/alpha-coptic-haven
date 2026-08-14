import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";

import {
  AlphaOmegaMark,
  ArrowIcon,
  AutoScrollIcon,
  BookmarkIcon,
  CopticCross,
  HighlightIcon,
  HistoryIcon,
  NightIcon,
  NoteIcon,
  PlayGlyph,
  ShareGlyph,
  SpacingIcon,
  SpeedIcon,
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
          "The Alpha reading screen: a pinned progress header, separated verse cards, auto-scroll with three speeds, line spacing, font size, night mode and a quiet Coptic character.",
      },
      { property: "og:title", content: "شاشة القراءة — الكتاب المقدس | Alpha" },
      { property: "og:description", content: "A calm, typography-first Bible reading experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibleRead,
});

const SPEEDS = [
  { key: "bib.speed.slow", px: 14 },
  { key: "bib.speed.mid", px: 28 },
  { key: "bib.speed.fast", px: 52 },
];

const SPACINGS = [
  { key: "bib.space.calm", lh: 2.35 },
  { key: "bib.space.mid", lh: 2 },
  { key: "bib.space.tight", lh: 1.7 },
];

function ToolTabs({
  items,
  value,
  onChange,
  icon,
  night,
  label,
}: {
  items: Array<{ key: string }>;
  value: number;
  onChange: (i: number) => void;
  icon: React.ReactNode;
  night: boolean;
  label: string;
}) {
  const { t } = useLang();
  return (
    <div
      aria-label={label}
      className={`flex w-full items-center gap-1 rounded-full px-1.5 py-1 ${
        night ? "bg-vellum/10" : "bg-inkblue/[0.06]"
      }`}
    >
      <span className="grid size-6 place-items-center text-copper">{icon}</span>
      {items.map((item, i) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onChange(i)}
          className={`press flex-1 rounded-full px-2 py-1 text-[10.5px] font-semibold transition-colors ${
            i === value
              ? "gold-cta text-inkblue"
              : night
                ? "text-vellum/60"
                : "text-quiet"
          }`}
        >
          {t(item.key)}
        </button>
      ))}
    </div>
  );
}

function BibleRead() {
  const { t, dir, isArabic } = useLang();
  const { book: bookId, ch } = Route.useSearch();
  const [night, setNight] = useState(false);
  const [scale, setScale] = useState(1);
  const [active, setActive] = useState<number | null>(null);
  const [speed, setSpeed] = useState(1);
  const [spacing, setSpacing] = useState(1);
  const [auto, setAuto] = useState(false);
  const [currentVerse, setCurrentVerse] = useState(samplePassage[0]!.n);
  const verseRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const all = [...oldTestament, ...newTestament];
  const book = all.find((b) => b.id === bookId) ?? all[0]!;
  const isNT = newTestament.some((b) => b.id === book.id);
  const name = isArabic ? book.ar : book.en;
  const total = samplePassage.length;
  const pct = Math.round((currentVerse / total) * 100);

  /* Track which verse is in view — presentation only. */
  useEffect(() => {
    const nodes = verseRefs.current.filter(Boolean) as HTMLButtonElement[];
    if (!nodes.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) {
          const n = Number((visible.target as HTMLElement).dataset["verse"]);
          if (n) setCurrentVerse(n);
        }
      },
      { rootMargin: "-32% 0px -52% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* Auto-scroll the page upward at the selected speed. */
  useEffect(() => {
    if (!auto) return;
    const px = SPEEDS[speed]!.px;
    const id = window.setInterval(() => {
      window.scrollBy({ top: px / 10, behavior: "auto" });
    }, 100);
    return () => window.clearInterval(id);
  }, [auto, speed]);

  const shell = night ? "bg-inkblue" : "scriptorium";
  const body = night ? "text-vellum" : "text-inkblue";
  const soft = night ? "text-vellum/55" : "text-quiet";
  const surface = night ? "border border-illum/20 bg-vellum/[0.06]" : "vellum-card";
  const lh = SPACINGS[spacing]!.lh;

  return (
    <Screen className={shell}>
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-48 ${
          isArabic ? "font-arabic" : "font-sans"
        } ${body}`}
      >
        {/* Coptic Α Ω watermark behind the reading column */}
        <AlphaOmegaMark
          className={`pointer-events-none absolute inset-x-0 top-48 mx-auto w-[78%] text-copper illum-breathe ${
            night ? "opacity-[0.07]" : "opacity-[0.045]"
          }`}
        />

        {/* ── Pinned reading header with progress ── */}
        <header
          className={`safe-top safe-sticky-top sticky z-30 px-3.5 pb-3 ${
            night ? "bg-inkblue/80" : "bg-vellum/80"
          } backdrop-blur-xl`}
        >
          <div className={`relative overflow-hidden rounded-[26px] px-3 pt-3 pb-3 ${surface}`}>
            <div className="copt-frieze absolute inset-x-6 top-0 opacity-50" />

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={t("bib.tool.history")}
                className={`press grid size-10 shrink-0 place-items-center rounded-full ${
                  night ? "bg-vellum/10 text-vellum" : "bg-white/80 text-inkblue"
                }`}
              >
                <HistoryIcon className="size-[18px]" />
              </button>
              <button
                type="button"
                aria-label={t("bib.tool.favorites")}
                className={`press grid size-10 shrink-0 place-items-center rounded-full ${
                  night ? "bg-vellum/10 text-vellum" : "bg-white/80 text-inkblue"
                }`}
              >
                <BookmarkIcon className="size-[17px]" />
              </button>

              <div className="min-w-0 flex-1 text-center">
                <p className="font-manrope text-[10.5px] font-bold tracking-[0.08em] text-copper">
                  {isNT ? t("bib.nt") : t("bib.ot")}
                </p>
                <p className="truncate font-display text-[19px] font-bold text-rubric">
                  {name} {ch}
                </p>
              </div>

              <Link
                to="/bible-read"
                search={{ book: book.id, ch: Math.min(book.chapters, ch + 1) }}
                aria-label={t("bib.next")}
                className={`press grid size-11 shrink-0 place-items-center rounded-full ${
                  night ? "bg-vellum/10 text-vellum" : "bg-white/85 text-inkblue"
                }`}
              >
                <ArrowIcon className="size-[18px] rtl:rotate-180" />
              </Link>
            </div>

            {/* Verse counter + progress */}
            <div
              className={`mt-2.5 rounded-[20px] px-3.5 py-2.5 ${
                night ? "bg-vellum/[0.07]" : "bg-white/80"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-manrope text-[11.5px] font-semibold ${soft}`}>
                  {t("bib.verse")} {currentVerse} {t("bib.of")} {total}
                </span>
                <span className="font-manrope text-[12px] font-bold text-sapphire tabular-nums">
                  {pct}% {t("bib.complete")}
                </span>
              </div>
              <div
                className={`mt-2 h-[6px] overflow-hidden rounded-full ${
                  night ? "bg-vellum/15" : "bg-inkblue/10"
                }`}
              >
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-copper to-illum transition-[width] duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 pt-4">
          {/* Chapter opener with Coptic cross */}
          <div className="text-center">
            <CopticCross className="mx-auto size-5 text-copper opacity-70" />
            <span className={`mt-1.5 block font-manrope text-[9.5px] font-semibold tracking-[0.2em] uppercase ${soft}`}>
              {t("bib.chapter")} {ch}
            </span>
            <div className="gold-hairline mx-auto mt-2.5 h-px w-24 opacity-60" />
          </div>

          {/* Verses — each one its own card */}
          <div className="relative mt-5 space-y-3" style={{ fontSize: `${15.5 * scale}px` }}>
            {samplePassage.map((verse, i) => {
              const on = active === verse.n;
              const reading = currentVerse === verse.n;
              return (
                <button
                  key={verse.n}
                  type="button"
                  data-verse={verse.n}
                  ref={(el) => {
                    verseRefs.current[i] = el;
                  }}
                  onClick={() => setActive(on ? null : verse.n)}
                  className={`verse-rise relative block w-full overflow-hidden rounded-[22px] px-4 py-3.5 text-start transition-colors ${
                    on
                      ? night
                        ? "border border-illum/35 bg-illum/12"
                        : "border border-copper/30 bg-illum/20"
                      : night
                        ? "border border-vellum/10 bg-vellum/[0.05]"
                        : "border border-shade/60 bg-white/70"
                  }`}
                  style={{ animationDelay: `${i * 45}ms`, lineHeight: lh }}
                >
                  {/* reading rail */}
                  <span
                    className={`absolute inset-y-3 w-[3px] rounded-full transition-opacity ${
                      reading || on ? "opacity-100" : "opacity-0"
                    } bg-gradient-to-b from-copper to-illum`}
                    style={{ insetInlineStart: 0 }}
                  />
                  <span className="font-manrope align-super text-[0.62em] font-bold text-copper">
                    {verse.n}
                  </span>{" "}
                  <span>
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

          {/* Verse action sheet */}
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

          {/* Chapter end frieze */}
          <div className="mt-7 flex items-center gap-3">
            <div className="copt-frieze flex-1 opacity-55" />
            <CopticCross className="size-4 text-copper opacity-80" />
            <div className="copt-frieze flex-1 opacity-55" />
          </div>
          <p className={`mt-2 text-center font-manrope text-[10px] tracking-[0.16em] uppercase ${soft}`}>
            {t("bib.chapterEnd")}
          </p>

          {/* Chapter navigation */}
          <div className="mt-5 flex items-center gap-3">
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
        <div
          className="fixed inset-x-0 z-40 mx-auto max-w-[430px] px-3.5"
          style={{
            bottom:
              "calc(var(--bottom-nav-h) + max(var(--safe-bottom-min), var(--safe-bottom)) + 6px)",
          }}
        >
          <div
            className={`rounded-[26px] px-2.5 py-2 backdrop-blur-xl ${
              night ? "border border-illum/25 bg-inkblue/85" : "vellum-card"
            }`}
          >
            <div className="flex items-center justify-between gap-1">
              <button
                type="button"
                onClick={() => setNight((v) => !v)}
                aria-label={t("bib.reader.night")}
                className={`press grid size-9 place-items-center rounded-full ${
                  night ? "bg-illum text-inkblue" : "bg-inkblue/[0.06] text-inkblue"
                }`}
              >
                <NightIcon className="size-[17px]" />
              </button>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label={t("bib.reader.smaller")}
                  onClick={() => setScale((s) => Math.max(0.85, +(s - 0.1).toFixed(2)))}
                  className="press grid size-9 place-items-center rounded-full font-display text-[13px] font-semibold"
                >
                  A-
                </button>
                <TypeIcon className="size-[16px] text-copper" />
                <button
                  type="button"
                  aria-label={t("bib.reader.bigger")}
                  onClick={() => setScale((s) => Math.min(1.4, +(s + 0.1).toFixed(2)))}
                  className="press grid size-9 place-items-center rounded-full font-display text-[15px] font-semibold"
                >
                  A+
                </button>
              </div>

              <button
                type="button"
                onClick={() => setAuto((v) => !v)}
                aria-label={t("bib.reader.autoscroll")}
                className={`press grid size-9 place-items-center rounded-full ${
                  auto ? "gold-cta text-inkblue" : night ? "bg-vellum/10 text-vellum" : "bg-inkblue/[0.06] text-inkblue"
                }`}
              >
                <AutoScrollIcon className="size-[17px]" />
              </button>

              <button
                type="button"
                aria-label={t("bib.reader.play")}
                className="press grid size-11 place-items-center rounded-full bg-inkblue text-illum"
              >
                <PlayGlyph className="size-[18px]" />
              </button>
            </div>

            <div className="mt-2 space-y-1.5">
              <ToolTabs
                label={t("bib.reader.speed")}
                items={SPEEDS}
                value={speed}
                onChange={setSpeed}
                night={night}
                icon={<SpeedIcon className="size-4" />}
              />
              <ToolTabs
                label={t("bib.reader.spacing")}
                items={SPACINGS}
                value={spacing}
                onChange={setSpacing}
                night={night}
                icon={<SpacingIcon className="size-4" />}
              />
            </div>
          </div>
        </div>
      </div>
    </Screen>
  );
}
