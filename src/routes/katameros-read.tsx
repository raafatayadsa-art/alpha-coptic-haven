import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { CopticCross } from "@/components/church/icons";
import { KatamerosShell } from "@/components/katameros/KatamerosShell";
import {
  ArrowGlyph,
  BookmarkGlyph,
  HeadphonesIcon,
  ShareGlyph,
  TextSizeGlyph,
} from "@/components/katameros/katameros-icons";
import { PartsRail } from "@/components/church/PartsRail";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { useReaderChrome } from "@/hooks/use-reader-chrome";
import { groupHue, groupLabel, readings } from "@/lib/katameros-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/katameros-read")({
  head: () => ({
    meta: [
      { title: "قراءة القطمارس — كل أجزاء اليوم | Alpha" },
      {
        name: "description",
        content:
          "The Alpha Katameros reading view: every part of the day stacked in one column, opening in sequence as you read, with silky auto-scroll and a single-row reader bar.",
      },
      { property: "og:title", content: "قراءة القطمارس — كل أجزاء اليوم | Alpha" },
      {
        property: "og:description",
        content: "All of the day's lectionary parts in one continuous, self-advancing reading column.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: KatamerosRead,
});

/* Presentation-only body lines per part; the first line is the part's excerpt. */
const continuation = [
  {
    ar: "وَاحْذَرُوا مِنَ النَّاسِ، لِأَنَّهُمْ سَيُسَلِّمُونَكُمْ إِلَى مَجَالِسَ.",
    en: "But beware of men, for they will deliver you up to councils.",
  },
  {
    ar: "وَتُقَدَّمُونَ أَمَامَ وُلَاةٍ وَمُلُوكٍ مِنْ أَجْلِي شَهَادَةً لَهُمْ وَلِلْأُمَمِ.",
    en: "You will be brought before governors and kings for My sake, as a testimony to them.",
  },
  {
    ar: "لِأَنْ لَسْتُمْ أَنْتُمُ الْمُتَكَلِّمِينَ بَلْ رُوحُ أَبِيكُمُ الَّذِي يَتَكَلَّمُ فِيكُمْ.",
    en: "For it is not you who speak, but the Spirit of your Father who speaks in you.",
  },
  {
    ar: "وَلَكِنَّ الَّذِي يَصْبِرُ إِلَى الْمُنْتَهَى فَهَذَا يَخْلُصُ.",
    en: "But he who endures to the end will be saved.",
  },
];

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

function KatamerosRead() {
  const { t, lang, isArabic } = useLang();
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

  /* ── Sequential advance: whichever part is open, once its body has scrolled
        past the reading line the next part opens and this one collapses.
        Scroll-driven, so it behaves identically for auto-scroll and dragging. ── */
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const el = partRefs.current[open];
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const line = window.innerHeight * 0.55;
      if (rect.bottom < line && open < readings.length - 1) {
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
  }, [open]);

  /* Keep the newly opened part anchored just under the header. */
  useEffect(() => {
    const target = jumpTo.current;
    jumpTo.current = null;
    if (target === null) return;
    const el = partRefs.current[target];
    if (!el) return;
    const y = window.scrollY + el.getBoundingClientRect().top - 150;
    window.scrollTo({ top: Math.max(0, y), behavior: auto ? "auto" : "smooth" });
  }, [open, auto]);

  return (
    <KatamerosShell
      backTo="/katameros-day"
      pinHeader={false}
      title={t("km.read.stackTitle")}
      subtitle={t("km.read.stackSub")}
      action={
        <button
          type="button"
          aria-label={t("km.tools.save")}
          onClick={() => setSaved((v) => !v)}
          className={`press grid size-10 place-items-center rounded-full border ${
            saved
              ? "border-goldleaf/50 bg-goldleaf/15 text-goldleaf"
              : "border-goldleaf/25 bg-nightwine/50 text-cream/75"
          }`}
        >
          <BookmarkGlyph className="size-[17px]" />
        </button>
      }
    >
      <PartsRail
        items={readings.map((r) => ({
          id: r.id,
          label: isArabic ? r.kind.ar : r.kind.en,
          hue: groupHue[r.group],
        }))}
        activeIndex={open}
        visible={visible}
        theme="manuscript"
        onJump={(idx) => {
          jumpTo.current = idx;
          setOpen(idx);
        }}
        onWake={wake}
      />

      {/* ── All parts, stacked; one open at a time ── */}
      <section
        className="space-y-3"
        onPointerDown={(e) => {
          /* Any touch on the reading column stops the auto-scroll. */
          if (!(e.target as HTMLElement).closest("[data-reader-bar]")) setAuto(false);
        }}
      >
        {readings.map((r, idx) => {
          const active = idx === open;
          const done = idx < open;
          const hue = groupHue[r.group];
          const lines = [r.excerpt, ...continuation];

          return (
            <article
              key={r.id}
              ref={(el) => {
                partRefs.current[idx] = el;
              }}
              className={`km-card relative overflow-hidden rounded-[26px] transition-all duration-500 ${
                active ? "" : "opacity-70"
              }`}
              style={{
                ["--hue" as string]: hue.hue,
                ["--hue-2" as string]: hue.hue2,
              }}
            >
              <button
                type="button"
                onClick={() => {
                  wake();
                  jumpTo.current = idx;
                  setOpen(idx);
                }}
                className="press flex w-full items-center gap-3 px-4 py-3.5 text-start"
              >
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-full border font-manrope text-[11px] font-bold tabular-nums"
                  style={{
                    borderColor: "color-mix(in oklab, var(--hue-2) 40%, transparent)",
                    background: "color-mix(in oklab, var(--hue) 22%, transparent)",
                    color: "color-mix(in oklab, var(--hue-2) 92%, white)",
                  }}
                >
                  {done ? "✓" : idx + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-manrope text-[9.5px] font-bold tracking-[0.16em] uppercase hue-text opacity-80">
                    {isArabic ? groupLabel[r.group].ar : groupLabel[r.group].en}
                  </span>
                  <span className="mt-0.5 block truncate font-display text-[17px] font-semibold text-cream">
                    {isArabic ? r.kind.ar : r.kind.en}
                  </span>
                  <span className="mt-0.5 block font-manrope text-[10.5px] text-cream/45">
                    {isArabic ? r.ref.ar : r.ref.en}
                  </span>
                </span>
                <span
                  className="shrink-0 rounded-full border px-2.5 py-1 font-manrope text-[9.5px] font-semibold"
                  style={{
                    borderColor: "color-mix(in oklab, var(--hue-2) 28%, transparent)",
                    color: "color-mix(in oklab, var(--hue-2) 90%, white)",
                  }}
                >
                  {active ? t("km.read.reading") : done ? t("km.read.done") : t("km.read.waiting")}
                </span>
              </button>

              {/* Body — revealed only while this part is the one being read */}
              <div
                className={`grid transition-all duration-700 ${
                  active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-5">
                    <div className="km-hairline mb-3.5 h-px w-full opacity-45" />
                    <div className="space-y-2.5">
                      {lines.map((line, li) => (
                        <div
                          key={li}
                          className="rounded-[18px] border border-cream/8 bg-nightwine/35 px-4 py-3"
                        >
                          <div className="mb-1.5 flex items-center gap-2">
                            <span className="grid size-6 place-items-center rounded-full border border-goldleaf/25 bg-goldleaf/10 font-manrope text-[10px] font-bold tabular-nums text-goldleaf">
                              {li + 1}
                            </span>
                            <span className="km-hairline h-px flex-1 opacity-25" />
                          </div>
                          <p className={`font-display font-medium text-cream/90 ${size.cls}`}>
                            {lang === "ar" ? line.ar : line.en}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-2 opacity-60">
                      <CopticCross className="size-4 text-brass" />
                      <span className="font-manrope text-[10px] text-cream/40">
                        {isArabic ? r.kind.ar : r.kind.en} · {r.minutes}′
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* ── Reader tools, one row ── */}
      <section
        data-reader-bar
        className={`fixed inset-x-0 bottom-24 z-40 mx-auto flex w-full max-w-[430px] items-center gap-2 px-4 transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <div className="km-glass flex flex-1 items-center gap-2 rounded-full px-3 py-2.5 backdrop-blur-xl">
        <button
          type="button"
          aria-label={t("km.tools.font")}
          onClick={() => setSizeIndex((v) => (v + 1) % sizes.length)}
          className="press grid size-9 shrink-0 place-items-center rounded-full border border-goldleaf/25 bg-nightwine/45 text-goldleaf"
        >
          <TextSizeGlyph className="size-[17px]" />
        </button>

        <button
          type="button"
          aria-label={t("bib.reader.autoscroll")}
          onClick={() => setAuto((v) => !v)}
          className={`press grid size-9 shrink-0 place-items-center rounded-full ${
            auto
              ? "km-cta text-nightwine"
              : "border border-goldleaf/25 bg-nightwine/45 text-cream/75"
          }`}
        >
          <ArrowGlyph className="size-4 -rotate-90" />
        </button>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setSpeedMenu((v) => !v)}
            className="press flex items-center gap-1.5 rounded-full border border-goldleaf/25 bg-nightwine/45 px-3 py-1.5 font-manrope text-[11px] font-semibold text-cream/80"
          >
            {t(SPEEDS[speed]!.key)}
          </button>
          {speedMenu ? (
            <div className="km-glass verse-rise absolute bottom-12 start-0 z-30 w-32 overflow-hidden rounded-[18px] p-1.5">
              {SPEEDS.map((s, i) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    setSpeed(i);
                    setSpeedMenu(false);
                  }}
                  className={`block w-full rounded-[13px] px-3 py-2 text-start font-manrope text-[11.5px] font-semibold ${
                    i === speed ? "bg-goldleaf/15 text-goldleaf" : "text-cream/70"
                  }`}
                >
                  {t(s.key)}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <button
          type="button"
          aria-label={t("km.tools.listen")}
          className="press grid size-9 shrink-0 place-items-center rounded-full border border-goldleaf/25 bg-nightwine/45 text-cream/75"
        >
          <HeadphonesIcon className="size-4" />
        </button>
        <button
          type="button"
          aria-label={t("km.tools.share")}
          className="press grid size-9 shrink-0 place-items-center rounded-full border border-goldleaf/25 bg-nightwine/45 text-cream/75"
        >
          <ShareGlyph className="size-[16px]" />
        </button>
        </div>
      </section>

      <footer className="flex flex-col items-center gap-2 pt-1 text-center">
        <CopticCross className="size-5 text-brass/70" />
        <p className="font-manrope text-[11.5px] text-cream/35">{t("km.read.footer")}</p>
      </footer>

      <div aria-hidden="true" className="h-24" />
    </KatamerosShell>
  );
}
