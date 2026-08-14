import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { PartsRail } from "@/components/church/PartsRail";
import { ChevronRight, CopticCross } from "@/components/church/icons";
import { BookmarkIcon, ClockIcon } from "@/components/church/media-icons";
import { Screen } from "@/components/layout/Screen";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { useReaderChrome } from "@/hooks/use-reader-chrome";
import { findHour } from "@/lib/agpeya-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/agpeya-read")({
  validateSearch: (search: Record<string, unknown>) => ({
    hour: typeof search["hour"] === "string" ? (search["hour"] as string) : "prime",
  }),
  head: () => ({
    meta: [
      { title: "قراءة الأجبية — أجزاء الصلاة بالتتابع | Alpha" },
      {
        name: "description",
        content:
          "Pray an Agpeya hour in Alpha: every part of the hour in one column, opening in sequence, with a pinned parts rail and a silky auto-scroll reader bar.",
      },
      { property: "og:title", content: "قراءة الأجبية — أجزاء الصلاة بالتتابع | Alpha" },
      {
        property: "og:description",
        content: "All parts of the hour stacked in one self-advancing prayer column.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AgpeyaRead,
});

const sizes = [
  { id: "s", cls: "text-[15.5px] leading-[2.05]" },
  { id: "m", cls: "text-[17.5px] leading-[2.15]" },
  { id: "l", cls: "text-[20px] leading-[2.2]" },
] as const;

/** px per second — same silky presets as the Bible reader. */
const SPEEDS = [
  { key: "bib.speed.slow", pps: 10 },
  { key: "bib.speed.mid", pps: 20 },
  { key: "bib.speed.fast", pps: 38 },
];

function AgpeyaRead() {
  const { t, lang, dir, isArabic } = useLang();
  const { hour: hourId } = Route.useSearch();
  const hour = findHour(hourId);

  const [sizeIndex, setSizeIndex] = useState(1);
  const [saved, setSaved] = useState(false);
  const [open, setOpen] = useState(0);
  const [auto, setAuto] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [speedMenu, setSpeedMenu] = useState(false);
  const size = sizes[sizeIndex]!;

  const { visible, wake } = useReaderChrome();
  const partRefs = useRef<Array<HTMLElement | null>>([]);
  const jumpTo = useRef<number | null>(null);

  useAutoScroll(auto, SPEEDS[speed]!.pps, () => setAuto(false));

  /* Reset when a different hour is opened. */
  useEffect(() => {
    setOpen(0);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [hourId]);

  /* ── Sequential advance: once the open part has passed the reading line the
        next one opens and this one collapses — same for auto-scroll or drag. ── */
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const el = partRefs.current[open];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const line = window.innerHeight * 0.55;
      if (rect.bottom < line && open < hour.parts.length - 1) {
        jumpTo.current = open + 1;
        setOpen(open + 1);
      } else if (rect.top > window.innerHeight * 0.92 && open > 0) {
        setOpen(open - 1);
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [open, hour.parts.length]);

  /* Keep the newly opened part anchored just under the rail. */
  useEffect(() => {
    const target = jumpTo.current;
    jumpTo.current = null;
    if (target === null) return;
    const el = partRefs.current[target];
    if (!el) return;
    const y = window.scrollY + el.getBoundingClientRect().top - 150;
    window.scrollTo({ top: Math.max(0, y), behavior: auto ? "auto" : "smooth" });
  }, [open, auto]);

  const railItems = hour.parts.map((p) => ({
    id: p.id,
    label: lang === "ar" ? p.label.ar : p.label.en,
    hue: p.hue,
  }));

  return (
    <Screen className="bg-abyss">
      <div
        dir={dir}
        className={`theme-ocean relative mx-auto w-full max-w-[430px] overflow-x-hidden bg-abyss pb-28 ${
          isArabic ? "font-arabic" : "font-manrope"
        }`}
      >
        <PartsRail
          items={railItems}
          activeIndex={open}
          visible={visible}
          theme="ocean"
          onJump={(i) => {
            jumpTo.current = i;
            setOpen(i);
          }}
          onWake={wake}
        />

        {/* ── Hour identity ── */}
        <header className="safe-top px-4 pt-[92px]">
          <div className="mb-3 flex items-center justify-between gap-3">
            <Link
              to="/agpeya"
              aria-label={t("ag.title")}
              className="press grid size-10 place-items-center rounded-2xl border border-mint/20 bg-deep/60 text-foam/75"
            >
              <ChevronRight className="size-4 ltr:rotate-180" />
            </Link>
            <button
              type="button"
              aria-label={t("ag.saved")}
              onClick={() => setSaved((v) => !v)}
              className={`press grid size-10 place-items-center rounded-2xl border ${
                saved
                  ? "border-mint/50 bg-mint/15 text-mint"
                  : "border-mint/20 bg-deep/60 text-foam/70"
              }`}
            >
              <BookmarkIcon className="size-[17px]" />
            </button>
          </div>

          <section className="ocean-glass relative isolate overflow-hidden rounded-[28px] p-5">
            <span
              aria-hidden="true"
              className="ocean-halo tide-drift pointer-events-none absolute -end-12 -top-16 -z-10 size-56 rounded-full"
              style={{ "--hue": hour.parts[0]!.hue.hue, "--hue-2": hour.parts[0]!.hue.hue2 } as CSSProperties}
            />
            <span className="font-manrope text-[10px] font-bold tracking-[0.16em] text-mint uppercase">
              {t("ag.read.eyebrow")}
            </span>
            <h1 className="mt-2 font-sora text-[27px] font-bold leading-tight tracking-tight text-foam">
              {t(hour.nameKey)}
            </h1>
            <p className="mt-2 font-manrope text-[12.5px] leading-relaxed text-foam/55">
              {lang === "ar" ? hour.intro.ar : hour.intro.en}
            </p>
            <div className="mt-3.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/25 bg-abyss/45 px-3 py-1 font-manrope text-[10.5px] font-semibold tabular-nums text-mint">
                <ClockIcon className="size-3.5" />
                {t(hour.timeKey)}
              </span>
              <span className="rounded-full border border-foam/10 bg-abyss/35 px-3 py-1 font-manrope text-[10.5px] text-foam/50">
                {hour.parts.length} {t("ag.read.parts")}
              </span>
            </div>
          </section>
        </header>

        {/* ── Parts, stacked; one open at a time ── */}
        <main
          className="mt-4 space-y-3 px-4"
          onPointerDown={(e) => {
            if (!(e.target as HTMLElement).closest("[data-reader-bar]")) setAuto(false);
          }}
        >
          {hour.parts.map((part, idx) => {
            const active = idx === open;
            const done = idx < open;

            return (
              <article
                key={part.id}
                ref={(el) => {
                  partRefs.current[idx] = el;
                }}
                className={`ocean-tile relative overflow-hidden rounded-[26px] transition-all duration-500 ${
                  active ? "" : "opacity-70"
                }`}
                style={{ "--hue": part.hue.hue, "--hue-2": part.hue.hue2 } as CSSProperties}
              >
                <span
                  aria-hidden="true"
                  className="hue-bg pointer-events-none absolute inset-y-5 start-0 w-[3px] rounded-full opacity-60"
                />
                <button
                  type="button"
                  onClick={() => {
                    wake();
                    jumpTo.current = idx;
                    setOpen(idx);
                  }}
                  className="press flex w-full items-center gap-3 px-4 py-3.5 text-start"
                >
                  <span className="hue-text hue-ring grid size-9 shrink-0 place-items-center rounded-full border bg-abyss/45 font-manrope text-[11px] font-bold tabular-nums">
                    {done ? "✓" : idx + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-sora text-[16px] font-semibold text-foam">
                      {lang === "ar" ? part.label.ar : part.label.en}
                    </span>
                    {part.ref ? (
                      <span className="mt-0.5 block truncate font-manrope text-[10.5px] text-foam/45">
                        {lang === "ar" ? part.ref.ar : part.ref.en}
                      </span>
                    ) : null}
                  </span>
                  <span className="hue-text hue-ring shrink-0 rounded-full border bg-abyss/35 px-2.5 py-1 font-manrope text-[9.5px] font-semibold">
                    {active ? t("km.read.reading") : done ? t("km.read.done") : t("km.read.waiting")}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-700 ${
                    active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                  style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-5">
                      <div className="mb-3.5 h-px w-full bg-gradient-to-l from-transparent via-foam/12 to-transparent" />
                      <div className="space-y-2.5">
                        {part.lines.map((line, li) => (
                          <div
                            key={li}
                            className="rounded-[18px] border border-foam/8 bg-abyss/40 px-4 py-3"
                          >
                            <div className="mb-1.5 flex items-center gap-2">
                              <span className="hue-text hue-ring grid size-6 place-items-center rounded-full border bg-abyss/40 font-manrope text-[10px] font-bold tabular-nums">
                                {li + 1}
                              </span>
                              <span className="h-px flex-1 bg-foam/10" />
                            </div>
                            <p className={`font-arabic font-medium text-foam/90 ${size.cls}`}>
                              {lang === "ar" ? line.ar : line.en}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}

          <footer className="flex flex-col items-center gap-2 pt-2 text-center">
            <CopticCross className="size-5 text-teal/70" />
            <p className="font-manrope text-[12px] text-foam/40">{t("ag.footer")}</p>
          </footer>
        </main>

        {/* ── Reader tools, one row, pinned with the rail ── */}
        <section
          data-reader-bar
          className={`fixed inset-x-0 bottom-24 z-40 mx-auto w-full max-w-[430px] px-4 transition-all duration-300 ${
            visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
          }`}
        >
          <div className="ocean-glass flex items-center gap-2 rounded-full px-3 py-2.5 backdrop-blur-xl">
            <button
              type="button"
              aria-label={t("km.tools.font")}
              onClick={() => setSizeIndex((v) => (v + 1) % sizes.length)}
              className="press grid size-9 shrink-0 place-items-center rounded-full border border-mint/25 bg-abyss/50 font-sora text-[13px] font-bold text-mint"
            >
              A
            </button>

            <button
              type="button"
              aria-label={t("bib.reader.autoscroll")}
              onClick={() => setAuto((v) => !v)}
              className={`press grid size-9 shrink-0 place-items-center rounded-full ${
                auto
                  ? "bg-gradient-to-l from-mint to-teal text-abyss"
                  : "border border-mint/25 bg-abyss/50 text-foam/75"
              }`}
            >
              <ChevronRight className="size-4 rotate-90" />
            </button>

            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setSpeedMenu((v) => !v)}
                className="press rounded-full border border-mint/25 bg-abyss/50 px-3 py-1.5 font-manrope text-[11px] font-semibold text-foam/80"
              >
                {t(SPEEDS[speed]!.key)}
              </button>
              {speedMenu ? (
                <div className="ocean-glass absolute bottom-12 start-0 z-50 w-32 overflow-hidden rounded-[18px] p-1.5">
                  {SPEEDS.map((s, i) => (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => {
                        setSpeed(i);
                        setSpeedMenu(false);
                      }}
                      className={`block w-full rounded-[13px] px-3 py-2 text-start font-manrope text-[11.5px] font-semibold ${
                        i === speed ? "bg-mint/15 text-mint" : "text-foam/70"
                      }`}
                    >
                      {t(s.key)}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <span className="ms-auto font-manrope text-[10.5px] font-semibold tabular-nums text-foam/45">
              {open + 1}/{hour.parts.length}
            </span>
          </div>
        </section>
      </div>
    </Screen>
  );
}
