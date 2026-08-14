import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
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
  LayersIcon,
  NightIcon,
  NoteIcon,
  PeopleIcon,
  ShareGlyph,
  SpacingIcon,
  SparkIcon,
  SpeedIcon,
  TypeIcon,
} from "@/components/bible/bible-icons";
import { Screen } from "@/components/layout/Screen";
import { useChromeVisibility } from "@/hooks/use-chrome-visibility";
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
          "The Alpha reading screen: a pinned progress header, separated verse cards, silky auto-scroll, swipe between chapters and a compact single-row reader bar.",
      },
      { property: "og:title", content: "شاشة القراءة — الكتاب المقدس | Alpha" },
      { property: "og:description", content: "A calm, typography-first Bible reading experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibleRead,
});

/** px per second — smooth rAF based auto-scroll. */
const SPEEDS = [
  { key: "bib.speed.slow", pps: 10 },
  { key: "bib.speed.mid", pps: 20 },
  { key: "bib.speed.fast", pps: 38 },
];

const SPACINGS = [
  { key: "bib.space.calm", lh: 2.35 },
  { key: "bib.space.mid", lh: 2 },
  { key: "bib.space.tight", lh: 1.7 },
];

const SCALES = [0.9, 1, 1.14, 1.3];

/** Highlighter inks — tokens declared in src/styles.css. */
const HL_COLORS = [
  { id: "gold", v: "var(--hl-gold)" },
  { id: "lemon", v: "var(--hl-lemon)" },
  { id: "mint", v: "var(--hl-mint)" },
  { id: "sky", v: "var(--hl-sky)" },
  { id: "rose", v: "var(--hl-rose)" },
  { id: "violet", v: "var(--hl-violet)" },
] as const;

const hlInk = (id?: string) => HL_COLORS.find((c) => c.id === id)?.v;

const TOOL_ITEMS: Array<{
  key: string;
  icon: React.ReactNode;
  tint: string;
  to?: "/my-church" | "/bible-notes" | "/bible-saved" | "/bible-journey";
}> = [
  {
    key: "bib.act.community",
    icon: <PeopleIcon className="size-[15px]" />,
    tint: "var(--hl-mint)",
    to: "/my-church",
  },
  { key: "bib.act.share", icon: <ShareGlyph className="size-[15px]" />, tint: "var(--hl-gold)" },
  {
    key: "bib.act.meditate",
    icon: <SparkIcon className="size-[15px]" />,
    tint: "var(--hl-sky)",
    to: "/bible-journey",
  },
  {
    key: "bib.act.note",
    icon: <NoteIcon className="size-[15px]" />,
    tint: "var(--hl-lemon)",
    to: "/bible-notes",
  },
  {
    key: "bib.act.save",
    icon: <BookmarkIcon className="size-[15px]" />,
    tint: "var(--hl-violet)",
    to: "/bible-saved",
  },
];

function Popover({
  open,
  items,
  value,
  onPick,
  night,
  label,
}: {
  open: boolean;
  items: Array<{ key: string }>;
  value: number;
  onPick: (i: number) => void;
  night: boolean;
  label: string;
}) {
  const { t } = useLang();
  if (!open) return null;
  return (
    <div
      aria-label={label}
      className={`absolute bottom-[calc(100%+8px)] z-10 flex flex-col gap-1 rounded-[20px] p-1.5 shadow-xl ${
        night ? "border border-illum/25 bg-inkblue/95" : "vellum-card"
      }`}
      style={{ insetInlineStart: 0, minWidth: 116 }}
    >
      {items.map((item, i) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onPick(i)}
          className={`press rounded-full px-3 py-1.5 text-[11.5px] font-semibold transition-colors ${
            i === value ? "gold-cta text-inkblue" : night ? "text-vellum/70" : "text-quiet"
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
  const navigate = useNavigate();

  const [night, setNight] = useState(false);
  const [scaleIdx, setScaleIdx] = useState(1);
  const [active, setActive] = useState<number | null>(null);
  const [speed, setSpeed] = useState(1);
  const [spacing, setSpacing] = useState(1);
  const [auto, setAuto] = useState(false);
  const [menu, setMenu] = useState<null | "speed" | "spacing">(null);
  const [toast, setToast] = useState<string | null>(null);
  const [currentVerse, setCurrentVerse] = useState(samplePassage[0]!.n);
  const verseRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [sheet, setSheet] = useState<null | "colors" | "tools">(null);
  const [popDown, setPopDown] = useState(false);
  const [popMax, setPopMax] = useState(260);
  const [shareVn, setShareVn] = useState<number | null>(null);
  const [highlights, setHighlights] = useState<Record<number, string>>({});

  const paint = (n: number, id: string | null) => {
    setHighlights((prev) => {
      const next = { ...prev };
      if (!id || prev[n] === id) delete next[n];
      else next[n] = id;
      return next;
    });
  };

  const all = [...oldTestament, ...newTestament];
  const book = all.find((b) => b.id === bookId) ?? all[0]!;
  const isNT = newTestament.some((b) => b.id === book.id);
  const name = isArabic ? book.ar : book.en;
  const total = samplePassage.length;
  const pct = Math.round((currentVerse / total) * 100);
  const scale = SCALES[scaleIdx]!;

  /* Facebook-style chrome: hides on scroll up, returns on scroll down. */
  const chrome = useChromeVisibility();

  useEffect(() => {
    if (!chrome) setMenu(null);
  }, [chrome]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 1600);
    return () => window.clearTimeout(id);
  }, [toast]);

  const verseText = (n: number) => {
    const v = samplePassage.find((x) => x.n === n);
    const text = v ? (isArabic ? v.ar : v.en) : "";
    return `${text} — ${name} ${ch}:${n}`;
  };

  const copyVerse = (n: number) => {
    void navigator.clipboard?.writeText(verseText(n));
    setToast(t("bib.act.copy"));
  };

  const shareVerse = (n: number) => {
    const text = verseText(n);
    if (typeof navigator !== "undefined" && navigator.share) {
      void navigator.share({ text }).catch(() => undefined);
    } else {
      void navigator.clipboard?.writeText(text);
    }
    setToast(t("bib.act.share"));
  };



  /* ── Track which verse is in view — presentation only ── */
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
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  /* ── Silky auto-scroll: sub-pixel accumulation on every frame ── */
  useEffect(() => {
    if (!auto) return;
    const pps = SPEEDS[speed]!.pps;
    let raf = 0;
    let last = performance.now();
    let acc = window.scrollY;
    const step = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      acc += (pps * dt) / 1000;
      window.scrollTo({ top: acc, behavior: "auto" });
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 2) {
        setAuto(false);
        return;
      }
      raf = window.requestAnimationFrame(step);
    };
    raf = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(raf);
  }, [auto, speed]);

  /* ── Swipe left / right to move between chapters ── */
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const go = (delta: number) => {
    const next = Math.min(book.chapters, Math.max(1, ch + delta));
    if (next !== ch) void navigate({ to: "/bible-read", search: { book: book.id, ch: next } });
  };

  const shell = night ? "bg-inkblue" : "scriptorium";
  const body = night ? "text-vellum" : "text-inkblue";
  const soft = night ? "text-vellum/55" : "text-quiet";
  const surface = night ? "border border-illum/20 bg-vellum/[0.06]" : "vellum-card";
  const lh = SPACINGS[spacing]!.lh;
  const chip = night ? "bg-vellum/10 text-vellum" : "bg-inkblue/[0.06] text-inkblue";

  return (
    <Screen className={shell}>
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] pb-40 ${
          isArabic ? "font-arabic" : "font-sans"
        } ${body}`}
        onPointerDown={(e) => {
          swipe.current = { x: e.clientX, y: e.clientY };
          /* Any touch on the reading surface stops the auto-scroll. */
          if (!(e.target as HTMLElement).closest("[data-reader-bar]")) setAuto(false);
        }}

        onPointerUp={(e) => {
          const s = swipe.current;
          swipe.current = null;
          if (!s) return;
          const dx = e.clientX - s.x;
          const dy = e.clientY - s.y;
          if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
          const forward = isArabic ? dx > 0 : dx < 0;
          go(forward ? 1 : -1);
        }}
      >
        {/* Small lowercase Coptic ⲁ ⲱ watermark, faint gold, behind the column */}
        <AlphaOmegaMark
          className={`pointer-events-none absolute inset-x-0 top-56 z-0 mx-auto w-[26%] text-illum illum-breathe ${
            night ? "opacity-[0.14]" : "opacity-[0.10]"
          }`}
        />


        {/* ── Pinned reading header with progress ── */}
        <header
          className={`safe-top safe-sticky-top sticky top-0 z-30 px-3.5 pb-3 ${
            night ? "bg-inkblue/85" : "bg-vellum/85"
          } backdrop-blur-xl`}
        >
          <div className={`relative overflow-hidden rounded-[28px] px-3 pt-3.5 pb-3 ${surface}`}>
            <div className="copt-frieze absolute inset-x-6 top-0 opacity-50" />

            <div className="flex items-center gap-2">
              <Link
                to="/bible-history"
                aria-label={t("bib.tool.history")}
                className={`press grid size-10 shrink-0 place-items-center rounded-full ${
                  night ? "bg-vellum/10 text-vellum" : "bg-white/80 text-inkblue"
                }`}
              >
                <HistoryIcon className="size-[18px]" />
              </Link>
              <Link
                to="/bible-saved"
                aria-label={t("bib.tool.favorites")}
                className={`press grid size-10 shrink-0 place-items-center rounded-full ${
                  night ? "bg-vellum/10 text-vellum" : "bg-white/80 text-inkblue"
                }`}
              >
                <BookmarkIcon className="size-[17px]" />
              </Link>


              <div className="min-w-0 flex-1 text-center">
                <p className="font-manrope text-[9px] font-bold tracking-[0.28em] text-copper/85 uppercase">
                  {isNT ? t("bib.nt") : t("bib.ot")}
                </p>
                <div className="mt-0.5 flex items-baseline justify-center gap-1.5">
                  <span className="truncate font-display text-[23px] leading-none font-bold text-rubric">
                    {name}
                  </span>
                  <span className="font-display text-[19px] leading-none font-bold text-illum">
                    {ch}
                  </span>
                </div>
                <div className="gold-hairline mx-auto mt-1.5 h-px w-16 opacity-70" />
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

            {/* Verse counter + premium progress */}
            <div
              className={`mt-3 flex items-center gap-3 rounded-full px-3.5 py-2 ${
                night
                  ? "border border-illum/20 bg-vellum/[0.07]"
                  : "border border-illum/25 bg-white/85"
              }`}
            >
              <span className="font-display text-[17px] leading-none font-bold text-sapphire tabular-nums">
                {pct}
                <span className="font-manrope text-[9.5px] font-bold">%</span>
              </span>

              <div className="relative min-w-0 flex-1">
                <div
                  className={`h-[3px] overflow-hidden rounded-full ${
                    night ? "bg-vellum/15" : "bg-inkblue/[0.09]"
                  }`}
                >
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-copper to-illum transition-[width] duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span
                  className="illum-breathe absolute top-1/2 size-[7px] -translate-y-1/2 rounded-full bg-illum shadow-[0_0_0_3px_color-mix(in_oklab,var(--sc-gold)_28%,transparent)] transition-[inset-inline-start] duration-700"
                  style={{ insetInlineStart: `calc(${pct}% - 3.5px)` }}
                />
              </div>

              <span
                className={`font-manrope text-[10.5px] font-semibold whitespace-nowrap ${soft}`}
              >
                {currentVerse} / {total}
              </span>
            </div>
          </div>
        </header>


        <main className="relative z-10 px-4 pt-4">
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
              const ink = hlInk(highlights[verse.n]);
              return (
                <div key={verse.n}>
                <button
                  type="button"
                  data-verse={verse.n}
                  ref={(el) => {
                    verseRefs.current[i] = el;
                  }}
                  onClick={() => {
                    setSheet(null);
                    setActive(on ? null : verse.n);
                  }}
                  className={`verse-rise relative block w-full overflow-hidden rounded-[22px] px-4 py-3.5 text-start transition-all duration-500 ${
                    ink
                      ? ""
                      : on
                        ? night
                          ? "border border-illum/40 bg-illum/12"
                          : "border border-copper/35 bg-illum/20"
                        : reading
                          ? night
                            ? "border border-illum/30 bg-vellum/[0.08] verse-focus"
                            : "border border-illum/45 bg-white/85 verse-focus"
                          : night
                            ? "border border-vellum/10 bg-vellum/[0.05]"
                            : "border border-shade/60 bg-white/70"
                  }`}
                  style={{
                    animationDelay: `${i * 45}ms`,
                    lineHeight: lh,
                    ...(ink
                      ? {
                          background: `color-mix(in oklab, ${ink} ${night ? "28%" : "42%"}, transparent)`,
                          border: `1px solid color-mix(in oklab, ${ink} 70%, transparent)`,
                        }
                      : {}),
                  }}
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

                {/* Action menu — pinned directly under the tapped verse */}
                {on ? (
                  <div
                    className={`verse-rise relative mt-2 rounded-[20px] px-2 py-2 ${surface}`}
                  >
                    {/* Highlight inks — vertical column, anchored to the highlight button */}
                    {sheet === "colors" ? (
                      <div
                        aria-label={t("bib.act.colors")}
                        className={`verse-rise absolute z-50 grid w-[86px] grid-cols-2 place-items-center gap-1.5 ${
                          night ? "alpha-pop-night" : "alpha-pop"
                        } ${popDown ? "top-[calc(100%+6px)]" : "bottom-[calc(100%+6px)]"}`}
                        style={{ insetInlineStart: 6 }}
                      >
                        {HL_COLORS.map((c) => {
                          const picked = highlights[verse.n] === c.id;
                          return (
                            <button
                              key={c.id}
                              type="button"
                              aria-label={c.id}
                              onClick={() => paint(verse.n, c.id)}
                              className={`press grid size-7 shrink-0 place-items-center rounded-full transition-transform ${
                                picked ? "scale-105" : ""
                              }`}
                              style={{
                                background: `color-mix(in oklab, ${c.v} 80%, transparent)`,
                                boxShadow: picked
                                  ? `0 0 0 2px color-mix(in oklab, var(--sc-gold) 85%, transparent)`
                                  : `0 0 0 1px color-mix(in oklab, ${c.v} 55%, transparent)`,
                              }}
                            >
                              {picked ? (
                                <span className="block size-1.5 rounded-full bg-inkblue/70" />
                              ) : null}
                            </button>
                          );
                        })}
                        <span
                          className={`col-span-2 h-px w-full ${night ? "bg-vellum/15" : "bg-shade/70"}`}
                          aria-hidden="true"
                        />
                        <button
                          type="button"
                          onClick={() => paint(verse.n, null)}
                          className={`press col-span-2 w-full rounded-full py-1 text-[9.5px] font-bold ${chip}`}
                        >
                          {t("bib.act.clear")}
                        </button>
                      </div>
                    ) : null}

                    {/* Tools list — same unified popover surface */}
                    {sheet === "tools" ? (
                      <div
                        className={`verse-rise absolute z-50 flex w-[172px] flex-col gap-1 overflow-y-auto ${
                          night ? "alpha-pop-night" : "alpha-pop"
                        } ${popDown ? "top-[calc(100%+6px)]" : "bottom-[calc(100%+6px)]"}`}
                        style={{ insetInlineStart: 56, maxHeight: popMax }}
                      >
                        {TOOL_ITEMS.map((item) => {
                          const inner = (
                            <>
                              <span
                                className="grid size-7 shrink-0 place-items-center rounded-full"
                                style={{
                                  background: `color-mix(in oklab, ${item.tint} 20%, transparent)`,
                                  boxShadow: `inset 0 0 0 1px color-mix(in oklab, ${item.tint} 45%, transparent)`,
                                  color: `color-mix(in oklab, ${item.tint} 74%, black)`,
                                }}
                              >
                                {item.icon}
                              </span>
                              <span className="min-w-0 flex-1 truncate text-[11.5px] font-bold">
                                {t(item.key)}
                              </span>
                            </>
                          );
                          const cls = `press flex h-8 shrink-0 items-center gap-2 rounded-full px-1.5 text-start ${
                            night
                              ? "bg-vellum/[0.06] text-vellum"
                              : "bg-white/70 text-inkblue"
                          }`;
                          return item.to ? (
                            <Link key={item.key} to={item.to} className={cls}>
                              {inner}
                            </Link>
                          ) : (
                            <button
                              key={item.key}
                              type="button"
                              onClick={() => {
                                setSheet(null);
                                setShareVn(verse.n);
                              }}
                              className={cls}
                            >
                              {inner}
                            </button>
                          );
                        })}
                      </div>
                    ) : null}

                    {/* Three primary actions — highlight sits on the leading (right in RTL) edge */}
                    <div className="flex items-stretch gap-2">
                      {(
                        [
                          [
                            "bib.act.highlight",
                            <HighlightIcon key="hl" className="size-[19px]" />,
                            "colors",
                          ],
                          ["bib.act.tools", <LayersIcon key="tl" className="size-[19px]" />, "tools"],
                          [
                            "bib.act.share",
                            <ShareGlyph key="sh" className="size-[19px]" />,
                            "share",
                          ],
                        ] as const
                      ).map(([key, icon, kind]) => {
                        const activeBtn = sheet === kind;
                        return (
                          <button
                            key={key}
                            type="button"
                            onClick={(e) => {
                              if (kind === "share") {
                                setSheet(null);
                                setShareVn(verse.n);
                                return;
                              }
                              /* Open upward only when the popover truly fits
                                 between the pinned header and this row;
                                 otherwise flip down and cap the height. */
                              const r = e.currentTarget.getBoundingClientRect();
                              const need = kind === "colors" ? 130 : 200;
                              const spaceUp = r.top - 138;
                              const spaceDown = window.innerHeight - r.bottom - 104;
                              const down = spaceUp < need;
                              setPopDown(down);
                              setPopMax(Math.max(140, Math.min(280, down ? spaceDown : spaceUp)));
                              setSheet((s) => (s === kind ? null : kind));
                            }}
                            className={`press flex h-[60px] flex-1 flex-col items-center justify-center gap-1 rounded-[18px] transition-colors ${
                              activeBtn
                                ? night
                                  ? "border border-illum/35 bg-illum/12"
                                  : "border border-copper/30 bg-illum/18"
                                : night
                                  ? "border border-vellum/10 bg-vellum/[0.05]"
                                  : "border border-shade/60 bg-white/75"
                            }`}
                          >
                            <span
                              className={`grid size-8 place-items-center rounded-full ${
                                night ? "bg-vellum/10 text-illum" : "bg-white text-copper"
                              }`}
                            >
                              {icon}
                            </span>
                            <span className={`text-[10.5px] font-bold ${body}`}>{t(key)}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}


                </div>
              );
            })}
          </div>


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

        {/* ── Compact single-row reader bar ── */}
        <div
          data-reader-bar=""

          className={`fixed inset-x-0 z-40 mx-auto max-w-[430px] px-3.5 transition-all duration-500 ${
            chrome ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
          }`}
          style={{
            bottom:
              "calc(var(--bottom-nav-h) + max(var(--safe-bottom-min), var(--safe-bottom)) + 6px)",
          }}
        >
          <div
            className={`flex items-center justify-between gap-1 rounded-full px-2 py-1.5 backdrop-blur-xl ${
              night ? "border border-illum/25 bg-inkblue/85" : "vellum-card"
            }`}
          >
            <button

              type="button"
              onClick={() => setAuto((v) => !v)}
              aria-label={t("bib.reader.autoscroll")}
              className={`press grid size-9 place-items-center rounded-full ${
                auto ? "gold-cta text-inkblue" : chip
              }`}
            >
              <AutoScrollIcon className="size-[17px]" />
            </button>

            {/* single T button cycles the font size */}
            <button
              type="button"
              onClick={() => setScaleIdx((i) => (i + 1) % SCALES.length)}
              aria-label={t("bib.reader.bigger")}
              className={`press grid size-9 place-items-center rounded-full ${chip}`}
            >
              <TypeIcon
                className="text-copper transition-all duration-300"
                style={{ width: 12 + scaleIdx * 2.4, height: 12 + scaleIdx * 2.4 }}
              />
            </button>

            {/* speed */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenu((m) => (m === "speed" ? null : "speed"))}
                aria-label={t("bib.reader.speed")}
                className={`press flex h-9 items-center gap-1 rounded-full px-2.5 ${
                  menu === "speed" ? "gold-cta text-inkblue" : chip
                }`}
              >
                <SpeedIcon className="size-4" />
                <span className="text-[10.5px] font-semibold whitespace-nowrap">
                  {t(SPEEDS[speed]!.key)}
                </span>
              </button>
              <Popover
                open={menu === "speed"}
                items={SPEEDS}
                value={speed}
                night={night}
                label={t("bib.reader.speed")}
                onPick={(i) => {
                  setSpeed(i);
                  setMenu(null);
                }}
              />
            </div>

            {/* spacing */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenu((m) => (m === "spacing" ? null : "spacing"))}
                aria-label={t("bib.reader.spacing")}
                className={`press flex h-9 items-center gap-1 rounded-full px-2.5 ${
                  menu === "spacing" ? "gold-cta text-inkblue" : chip
                }`}
              >
                <SpacingIcon className="size-4" />
                <span className="text-[10.5px] font-semibold whitespace-nowrap">
                  {t(SPACINGS[spacing]!.key)}
                </span>
              </button>
              <Popover
                open={menu === "spacing"}
                items={SPACINGS}
                value={spacing}
                night={night}
                label={t("bib.reader.spacing")}
                onPick={(i) => {
                  setSpacing(i);
                  setMenu(null);
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => setNight((v) => !v)}
              aria-label={t("bib.reader.night")}
              className={`press grid size-9 shrink-0 place-items-center rounded-full ${
                night ? "bg-illum text-inkblue" : chip
              }`}
            >
              <NightIcon className="size-[17px]" />
            </button>
          </div>
        </div>

        {/* Tiny glowing Coptic letter-band, pinned faintly at the foot of the page */}
        <span
          aria-hidden="true"
          className="copt-band pointer-events-none fixed inset-x-0 bottom-1 z-0 select-none text-center"
        >
          ⲁ ⲱ ⲭ ⲥ ⲡⲛⲟⲩϯ ⲁ ⲱ
        </span>

        {/* ── Share sheet: "spread the blessing" ── */}
        {shareVn ? (
          <div className="fixed inset-0 z-[60] flex items-end justify-center">
            <button
              type="button"
              aria-label={t("bib.share.close")}
              onClick={() => setShareVn(null)}
              className="absolute inset-0 bg-inkblue/60 backdrop-blur-[3px]"
            />
            <div
              dir={dir}
              className={`verse-rise safe-bottom relative mx-auto w-full max-w-[430px] px-4 pt-2.5 pb-4 ${
                night ? "alpha-pop-night" : "alpha-pop"
              }`}
              style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
            >
              <span
                className={`mx-auto block h-1 w-9 rounded-full ${night ? "bg-vellum/25" : "bg-inkblue/15"}`}
              />

              <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <CopticCross className="size-3.5 shrink-0 text-copper" />
                  <span className={`truncate font-display text-[14.5px] font-bold ${body}`}>
                    {t("bib.share.title")}
                  </span>
                </div>
                <button
                  type="button"
                  aria-label={t("bib.share.close")}
                  onClick={() => setShareVn(null)}
                  className={`press grid size-8 shrink-0 place-items-center rounded-full text-[12px] ${chip}`}
                >
                  ✕
                </button>
              </div>

              {/* Verse plate — gold hairline framing, Alpha identity */}
              <div
                className={`mt-3 rounded-[16px] px-3.5 py-3 ${
                  night ? "border border-illum/20 bg-vellum/[0.05]" : "border border-shade/60 bg-white/70"
                }`}
              >
                <div className="gold-hairline h-px w-full opacity-70" />
                <p className="mt-2 font-manrope text-[10.5px] font-bold tracking-[0.1em] text-copper">
                  {name} {ch}:{shareVn}
                </p>
                <p className={`mt-1.5 text-[12.5px] leading-[1.9] ${soft}`}>
                  {(() => {
                    const v = samplePassage.find((x) => x.n === shareVn);
                    return v ? (isArabic ? v.ar : v.en) : "";
                  })()}
                </p>
                <div className="gold-hairline mt-2 h-px w-full opacity-45" />
              </div>

              {/* Primary: community */}
              <Link
                to="/my-church"
                className={`press mt-3 flex h-11 items-center justify-center gap-2 rounded-full text-[12.5px] font-bold ${
                  night
                    ? "border border-illum/35 bg-illum/12 text-illum"
                    : "border border-copper/30 bg-illum/18 text-inkblue"
                }`}
              >
                <PeopleIcon className="size-[15px]" />
                {t("bib.share.community")}
              </Link>

              {/* Secondary circular action row — one consistent shape */}
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                {(
                  [
                    [
                      "bib.share.system",
                      <ShareGlyph key="s" className="size-[16px]" />,
                      () => shareVerse(shareVn),
                    ],
                    [
                      "bib.share.copy",
                      <NoteIcon key="c" className="size-[16px]" />,
                      () => copyVerse(shareVn),
                    ],
                    [
                      "bib.share.image",
                      <SparkIcon key="i" className="size-[16px]" />,
                      () => setToast(t("bib.share.image")),
                    ],
                  ] as const
                ).map(([key, icon, run]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      run();
                      setShareVn(null);
                    }}
                    className={`press flex h-[60px] flex-col items-center justify-center gap-1 rounded-[16px] ${
                      night
                        ? "border border-vellum/10 bg-vellum/[0.05]"
                        : "border border-shade/60 bg-white/75"
                    }`}
                  >
                    <span
                      className={`grid size-8 place-items-center rounded-full ${
                        night ? "bg-vellum/10 text-illum" : "bg-white text-copper"
                      }`}
                    >
                      {icon}
                    </span>
                    <span className={`text-[10px] font-bold ${soft}`}>{t(key)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Action confirmation */}
        {toast ? (
          <div className="pointer-events-none fixed inset-x-0 top-1/2 z-[70] flex justify-center">
            <span className="verse-rise rounded-full bg-inkblue/90 px-4 py-2 font-manrope text-[11.5px] font-semibold text-illum shadow-xl">
              {toast}
            </span>
          </div>
        ) : null}
      </div>

    </Screen>
  );
}

