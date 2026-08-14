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
  NightIcon,
  NoteIcon,
  ShareGlyph,
  SpacingIcon,
  SpeedIcon,
  StarIcon,
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
  const [chrome, setChrome] = useState(true);
  const [currentVerse, setCurrentVerse] = useState(samplePassage[0]!.n);
  const verseRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const all = [...oldTestament, ...newTestament];
  const book = all.find((b) => b.id === bookId) ?? all[0]!;
  const isNT = newTestament.some((b) => b.id === book.id);
  const name = isArabic ? book.ar : book.en;
  const total = samplePassage.length;
  const pct = Math.round((currentVerse / total) * 100);
  const scale = SCALES[scaleIdx]!;

  /* ── Chrome auto-hide after 5s of stillness (bar + bottom nav) ── */
  const hideTimer = useRef<number | null>(null);
  const wake = useCallback(() => {
    setChrome(true);
    if (hideTimer.current) window.clearTimeout(hideTimer.current);
    hideTimer.current = window.setTimeout(() => {
      setChrome(false);
      setMenu(null);
    }, 5000);
  }, []);

  useEffect(() => {
    wake();
    const events: Array<keyof WindowEventMap> = ["scroll", "pointerdown", "touchstart", "keydown"];
    events.forEach((e) => window.addEventListener(e, wake, { passive: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, wake));
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, [wake]);

  useEffect(() => {
    document.body.classList.toggle("reader-chrome-off", !chrome);
    return () => document.body.classList.remove("reader-chrome-off");
  }, [chrome]);

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
        {/* Coptic Α Ω watermark behind the reading column */}
        <AlphaOmegaMark
          className={`pointer-events-none absolute inset-x-0 top-56 z-0 mx-auto w-[46%] text-copper illum-breathe ${
            night ? "opacity-[0.06]" : "opacity-[0.035]"
          }`}
        />


        {/* ── Pinned reading header with progress ── */}
        <header
          className={`safe-top safe-sticky-top sticky top-0 z-30 px-3.5 pb-3 ${
            night ? "bg-inkblue/85" : "bg-vellum/85"
          } backdrop-blur-xl`}
        >
          <div className={`relative overflow-hidden rounded-[26px] px-3 pt-3 pb-3 ${surface}`}>
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
              return (
                <div key={verse.n}>
                <button
                  type="button"
                  data-verse={verse.n}
                  ref={(el) => {
                    verseRefs.current[i] = el;
                  }}
                  onClick={() => setActive(on ? null : verse.n)}
                  className={`verse-rise relative block w-full overflow-hidden rounded-[22px] px-4 py-3.5 text-start transition-all duration-500 ${
                    on
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

                {/* Action menu — pinned directly under the tapped verse */}
                {on ? (
                  <div
                    className={`mt-2 rounded-[22px] px-2.5 py-3 text-[13px] verse-rise ${surface}`}
                  >
                    <div className="flex items-center justify-around">
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
                          <span className={`text-[10px] font-semibold ${body}`}>
                            {t(key as string)}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div
                      className={`mt-2.5 flex items-center gap-1.5 border-t pt-2.5 ${
                        night ? "border-illum/15" : "border-shade/70"
                      }`}
                    >
                      {["bib.act.community", "bib.act.copy", "bib.act.image"].map((key) => (
                        <button
                          key={key}
                          type="button"
                          className={`press flex-1 rounded-full px-2 py-1.5 text-[10.5px] font-semibold whitespace-nowrap ${chip}`}
                        >
                          {t(key)}
                        </button>
                      ))}
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
              aria-label={t("bib.reader.play")}
              className="press grid size-10 shrink-0 place-items-center rounded-full bg-inkblue text-illum"
            >
              <PlayGlyph className="size-[17px]" />
            </button>

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
      </div>
    </Screen>
  );
}
