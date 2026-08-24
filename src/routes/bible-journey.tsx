import { createFileRoute } from "@tanstack/react-router";

import { CheckGlyph, PathIcon } from "@/components/bible/bible-icons";
import { ProgressRing } from "@/components/bible/ProgressRing";
import { StatTile, ToolScreen } from "@/components/bible/ToolScreen";
import { useLang } from "@/lib/i18n";
import { SloganBand } from "@/components/layout/SloganBand";

export const Route = createFileRoute("/bible-journey")({
  head: () => ({
    meta: [
      { title: "رحلتي الروحية — الكتاب المقدس | Alpha" },
      {
        name: "description",
        content: "Follow your Bible reading plan in Alpha: weekly rhythm, milestones and progress at a glance.",
      },
      { property: "og:title", content: "رحلتي الروحية — الكتاب المقدس | Alpha" },
      { property: "og:description", content: "Your plan in God's word, week by week." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibleJourney,
});

const milestones = [
  { ar: "الأناجيل الأربعة", en: "The four Gospels", done: true },
  { ar: "المزامير", en: "The Psalms", done: true },
  { ar: "رسائل بولس", en: "Pauline epistles", done: false },
  { ar: "الأنبياء الكبار", en: "Major prophets", done: false },
];

function BibleJourney() {
  const { t, isArabic } = useLang();
  const days = isArabic
    ? ["أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const filled = [100, 80, 100, 60, 100, 35, 0];

  return (
    <ToolScreen title={t("bib.jr.title")} subtitle={t("bib.jr.sub")}>
      <section className="ink-card relative isolate overflow-hidden rounded-[30px] p-5 text-vellum">
        <span
          aria-hidden="true"
          className="illum-halo pointer-events-none absolute -end-10 -top-14 -z-10 size-52 rounded-full opacity-70"
        />
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-vellum/95 p-1.5">
            <ProgressRing value={38} size={82} label="38%" caption={t("bib.progress")} />
          </div>
          <div className="min-w-0 flex-1">
            <span className="font-manrope text-[9.5px] font-semibold tracking-[0.18em] text-illum/85 uppercase">
              {t("bib.jr.plan")}
            </span>
            <h2 className="mt-1.5 font-display text-[20px] leading-tight font-semibold">
              {t("bib.journey.plan")}
            </h2>
            <p className="mt-1 font-manrope text-[11.5px] text-vellum/60">{t("bib.journey.meta")}</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-2.5">
        <StatTile value={isArabic ? "12" : "12"} label={t("bib.stat.streak")} />
        <StatTile value={isArabic ? "468" : "468"} label={t("bib.chapters")} />
        <StatTile value={isArabic ? "2" : "2"} label={t("bib.jr.milestones")} />
      </div>

      <section className="vellum-card rounded-[26px] p-4">
        <h3 className="font-display text-[15px] font-semibold text-inkblue">{t("bib.jr.week")}</h3>
        <div className="mt-3.5 flex items-end gap-2">
          {filled.map((v, i) => (
            <div key={days[i]} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="h-24 w-full overflow-hidden rounded-[8px] bg-inkblue/[0.07]">
                <div
                  className="mt-auto h-full w-full origin-bottom rounded-[8px] bg-gradient-to-t from-copper to-illum transition-transform duration-700"
                  style={{ transform: `scaleY(${v / 100})` }}
                />
              </div>
              <span className="font-manrope text-[9px] text-quiet">{days[i]}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-2.5 flex items-center gap-3 px-1">
          <span className="size-1.5 rounded-full bg-copper" />
          <h2 className="font-display text-[15px] font-semibold text-inkblue">{t("bib.jr.milestones")}</h2>
          <span className="gold-hairline h-px flex-1 opacity-40" />
        </div>
        <div className="vellum-card divide-y divide-shade/60 overflow-hidden rounded-[24px]">
          {milestones.map((m) => (
            <div key={m.en} className="flex items-center gap-3 px-4 py-3.5">
              <span
                className={`grid size-9 shrink-0 place-items-center rounded-full ring-1 ${
                  m.done
                    ? "gold-cta text-inkblue ring-copper/40"
                    : "bg-inkblue/[0.05] text-copper ring-illum/30"
                }`}
              >
                {m.done ? <CheckGlyph className="size-4" /> : <PathIcon className="size-[15px]" />}
              </span>
              <span className="min-w-0 flex-1 font-display text-[14.5px] font-semibold text-inkblue">
                {isArabic ? m.ar : m.en}
              </span>
              <span className="font-manrope text-[10.5px] text-quiet">
                {m.done ? t("bib.state.done") : t("bib.state.new")}
              </span>
            </div>
          ))}
        </div>
      </section>
      <SloganBand />
    </ToolScreen>
  );
}
