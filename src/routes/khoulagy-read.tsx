import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { PartsRail } from "@/components/church/PartsRail";
import { ArrowIcon } from "@/components/khoulagy/khoulagy-icons";
import { Screen } from "@/components/layout/Screen";
import {
  ReaderBar,
  READER_SIZES,
  READER_SPACING,
  READER_SPEEDS,
} from "@/components/reader/ReaderBar";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { useReaderChrome } from "@/hooks/use-reader-chrome";
import { khHue, parts, rites, roleLabel } from "@/lib/khoulagy-data";
import { useLang } from "@/lib/i18n";

type RiteId = "basil" | "gregory" | "cyril";

export const Route = createFileRoute("/khoulagy-read")({
  validateSearch: (s: Record<string, unknown>): { rite: RiteId } => ({
    rite: (["basil", "gregory", "cyril"] as const).includes(s["rite"] as RiteId)
      ? (s["rite"] as RiteId)
      : "basil",
  }),
  component: KhoulagyReader,
  head: () => ({
    meta: [
      { title: "قراءة الخولاجي · Khoulagy reader — Alpha Coptic" },
      {
        name: "description",
        content:
          "A calm sequential Khoulagy reader: Arabic, Coptic and English responses by role, a pinned parts rail and Alpha's unified reading toolbar.",
      },
      { property: "og:title", content: "قراءة الخولاجي · Khoulagy reader — Alpha Coptic" },
      {
        property: "og:description",
        content:
          "Pray the Divine Liturgy without leaving the page — parts open one after another as you scroll.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

type ViewMode = "all" | "arcop" | "encop" | "aren" | "ar" | "cop" | "en";

const VIEW_MODES: { id: ViewMode; key: string; cols: ("ar" | "cop" | "en")[] }[] = [
  { id: "all", key: "kh.view.all", cols: ["ar", "cop", "en"] },
  { id: "arcop", key: "kh.view.arcop", cols: ["ar", "cop"] },
  { id: "encop", key: "kh.view.encop", cols: ["cop", "en"] },
  { id: "aren", key: "kh.view.aren", cols: ["ar", "en"] },
  { id: "ar", key: "kh.view.ar", cols: ["ar"] },
  { id: "cop", key: "kh.view.cop", cols: ["cop"] },
  { id: "en", key: "kh.view.en", cols: ["en"] },
];

const COL_LABEL: Record<"ar" | "cop" | "en", string> = {
  ar: "عربي",
  cop: "ⲁⲃ",
  en: "EN",
};

function KhoulagyReader() {
  const { rite } = Route.useSearch();
  const { t, dir, isArabic } = useLang();
  const pick = (b: { ar: string; en: string }) => (isArabic ? b.ar : b.en);
  const current = rites.find((r) => r.id === rite) ?? rites[0]!;

  const [openIndex, setOpenIndex] = useState(0);
  const [auto, setAuto] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [size, setSize] = useState(1);
  const [spacing, setSpacing] = useState(1);
  const [mode, setMode] = useState<ViewMode>("all");
  const [viewOpen, setViewOpen] = useState(false);

  const cols = VIEW_MODES.find((m) => m.id === mode)!.cols;
  const coptic = cols.includes("cop");

  const { visible, wake } = useReaderChrome(5000);
  useAutoScroll(auto, READER_SPEEDS[speed]!.pps, () => setAuto(false));


  /* Any touch on the page stops the auto-scroll, as in the Bible reader. */
  useEffect(() => {
    if (!auto) return;
    const stop = () => setAuto(false);
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("pointerdown", stop, { passive: true });
    return () => {
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("pointerdown", stop);
    };
  }, [auto]);

  const refs = useRef<(HTMLElement | null)[]>([]);
  const jump = useCallback((i: number) => {
    setOpenIndex(i);
    requestAnimationFrame(() =>
      refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }, []);

  const textCls = READER_SIZES[size]!.cls;
  const leadCls = READER_SPACING[spacing]!.cls;

  return (
    <Screen className="kh-page">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] pb-4 ${isArabic ? "font-arabic" : "font-sans"}`}
      >
        <PartsRail
          items={parts.map((p) => ({ id: p.id, label: pick(p.title), hue: khHue[p.group] }))}
          activeIndex={openIndex}
          visible
          theme="sanctuary"
          onJump={jump}
          onWake={wake}
        />

        <main className="mt-[132px] space-y-3.5 px-4">
          <div className="flex items-center gap-2.5 px-1">
            <Link
              to="/khoulagy-liturgy"
              search={{ rite }}
              aria-label={t("app.back")}
              className="press grid size-9 place-items-center rounded-full border border-khgold/25 bg-sanctnight/50 text-khivory/80"
            >
              <ArrowIcon className="size-4 rtl:rotate-180" />
            </Link>
            <div className="min-w-0">
              <p className="font-manrope text-[10px] font-bold tracking-[0.16em] text-khbrass uppercase">
                {current.coptic}
              </p>
              <h1 className="truncate font-display text-[17px] font-semibold text-khivory">
                {pick(current.name)}
              </h1>
            </div>
          </div>

          {parts.map((p, i) => {
            const open = i === openIndex;
            return (
              <section
                key={p.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                style={
                  ({ "--hue": khHue[p.group].hue, "--hue-2": khHue[p.group].hue2 }) as CSSProperties
                }
                className="kh-card scroll-mt-[140px] overflow-hidden rounded-[26px]"
              >
                <button
                  type="button"
                  onClick={() => {
                    wake();
                    setOpenIndex(open ? -1 : i);
                  }}
                  className="press flex w-full items-center gap-3 p-4 text-start"
                >
                  <span className="kh-arch grid size-10 shrink-0 place-items-center border border-khgold/25 bg-sanctnight/45 font-manrope text-[11px] font-bold text-khgold">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[15.5px] font-semibold text-khivory">
                      {pick(p.title)}
                    </span>
                    <span className="mt-0.5 block truncate font-manrope text-[10.5px] text-khivory/45">
                      {pick(p.hint)} · {p.minutes} {t("kh.min")}
                    </span>
                  </span>
                  <span
                    className={`text-khgold/70 transition-transform duration-300 ${
                      open ? "-rotate-90" : "rotate-0 rtl:rotate-180"
                    }`}
                  >
                    <ArrowIcon className="size-4" />
                  </span>
                </button>

                {open ? (
                  <div className="verse-rise space-y-3.5 px-4 pb-5">
                    <div className="kh-hairline h-px opacity-70" />
                    {p.lines.map((line, li) => (
                      <article key={li} className="space-y-1.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-khgold/20 bg-sanctnight/45 px-2.5 py-0.5 font-manrope text-[9.5px] font-bold tracking-[0.12em] text-khbrass uppercase">
                          {pick(roleLabel[line.role])}
                        </span>
                        <p
                          className={`font-arabic text-khivory/90 ${textCls} ${leadCls}`}
                          dir="rtl"
                        >
                          {line.ar}
                        </p>
                        {coptic && line.cop ? (
                          <p className="font-display text-[13.5px] tracking-wide text-khgold/85" dir="ltr">
                            {line.cop}
                          </p>
                        ) : null}
                        <p className="font-manrope text-[12px] leading-relaxed text-khivory/45" dir="ltr">
                          {line.en}
                        </p>
                      </article>
                    ))}

                    {i < parts.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => jump(i + 1)}
                        className="press mt-1 flex w-full items-center justify-center gap-2 rounded-full border border-khgold/25 bg-sanctnight/45 py-2.5 font-manrope text-[11.5px] font-semibold text-khgold"
                      >
                        {t("kh.next")} · {pick(parts[i + 1]!.title)}
                      </button>
                    ) : (
                      <p className="copt-band pt-1 text-center">ⲁ ⲱ ⲁ̀ⲙⲏⲛ ⲁ ⲱ</p>
                    )}
                  </div>
                ) : null}
              </section>
            );
          })}

          <p className="pb-2 text-center font-manrope text-[10.5px] text-khivory/35">
            {t("kh.reader.hint")}
          </p>
        </main>
      </div>

      <ReaderBar
        visible={visible}
        auto={auto}
        onAuto={() => setAuto((a) => !a)}
        speed={speed}
        onSpeed={setSpeed}
        size={size}
        onSize={() => setSize((s) => (s + 1) % READER_SIZES.length)}
        spacing={spacing}
        onSpacing={setSpacing}
        coptic={coptic}
        onCoptic={() => setMode((m) => (m === "all" ? "ar" : "all"))}
      />
    </Screen>
  );
}
