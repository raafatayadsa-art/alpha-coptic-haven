import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties, type ReactNode } from "react";

import { CopticCross } from "@/components/church/icons";
import { KatamerosShell } from "@/components/katameros/KatamerosShell";
import { ReadingCard } from "@/components/katameros/ReadingCard";
import {
  ArrowGlyph,
  CenserIcon,
  ChaliceIcon,
  EpistleIcon,
  FeastStarIcon,
  GospelIcon,
  HeadphonesIcon,
  LampIcon,
  PraxisIcon,
  PsalmIcon,
  ShareGlyph,
} from "@/components/katameros/katameros-icons";
import { useLang } from "@/lib/i18n";
import {
  groupCaption,
  groupHue,
  groupLabel,
  orderedGroups,
  readingsOf,
  type ReadingGroupKey,
} from "@/lib/katameros-data";

export const Route = createFileRoute("/katameros-day")({
  head: () => ({
    meta: [
      { title: "قراءات اليوم — القطمارس | Alpha" },
      {
        name: "description",
        content:
          "All of the day's Katameros readings in Alpha: vespers, matins, the Divine Liturgy readings and the Synaxarium, grouped by liturgical moment.",
      },
      { property: "og:title", content: "قراءات اليوم — القطمارس | Alpha" },
      { property: "og:description", content: "Vespers, matins, liturgy and Synaxarium of the day." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: KatamerosDay,
});

const groupIcon: Record<ReadingGroupKey, ReactNode> = {
  vespers: <LampIcon className="size-[18px]" />,
  matins: <CenserIcon className="size-[18px]" />,
  liturgy: <ChaliceIcon className="size-[18px]" />,
  synaxarium: <FeastStarIcon className="size-[18px]" />,
};

const readingIcon: Record<string, ReactNode> = {
  "vsp-psalm": <PsalmIcon className="size-[18px]" />,
  "vsp-gospel": <GospelIcon className="size-[18px]" />,
  "mat-psalm": <PsalmIcon className="size-[18px]" />,
  "mat-gospel": <GospelIcon className="size-[18px]" />,
  "lit-pauline": <EpistleIcon className="size-[18px]" />,
  "lit-catholic": <EpistleIcon className="size-[18px]" />,
  "lit-praxis": <PraxisIcon className="size-[18px]" />,
  "lit-psalm": <PsalmIcon className="size-[18px]" />,
  "lit-gospel": <GospelIcon className="size-[18px]" />,
  "syn-day": <FeastStarIcon className="size-[18px]" />,
};

function KatamerosDay() {
  const { t, lang } = useLang();
  const [active, setActive] = useState<ReadingGroupKey>("liturgy");
  const hue = groupHue[active];
  const list = readingsOf(active);

  return (
    <KatamerosShell
      title={t("km.day.title")}
      subtitle={t("km.day.sub")}
      action={
        <button
          type="button"
          aria-label={t("km.tools.share")}
          className="press grid size-10 place-items-center rounded-full border border-goldleaf/25 bg-nightwine/50 text-cream/80"
        >
          <ShareGlyph className="size-[17px]" />
        </button>
      }
    >
      {/* ── Day identity ── */}
      <section
        className="km-glass relative isolate overflow-hidden rounded-[28px] p-5"
        style={{ "--hue": hue.hue, "--hue-2": hue.hue2 } as CSSProperties}
      >
        <span
          aria-hidden="true"
          className="km-halo candle-breathe pointer-events-none absolute -end-10 -top-14 -z-10 size-52 rounded-full"
        />
        <div className="flex items-center justify-between gap-3">
          <div>
            <span className="font-manrope text-[10px] font-bold tracking-[0.18em] text-brass uppercase">
              {t("km.today")}
            </span>
            <h2 className="mt-1.5 font-display text-[27px] leading-none font-semibold text-cream">
              {t("km.today.coptic")}
            </h2>
            <p className="mt-1.5 font-manrope text-[11px] text-cream/45">{t("km.today.greg")}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label={t("km.prev")}
              className="press grid size-9 place-items-center rounded-full border border-goldleaf/25 bg-nightwine/45 text-cream/70"
            >
              <ArrowGlyph className="size-4 ltr:rotate-180" />
            </button>
            <button
              type="button"
              aria-label={t("km.next")}
              className="press grid size-9 place-items-center rounded-full border border-goldleaf/25 bg-nightwine/45 text-cream/70"
            >
              <ArrowGlyph className="size-4 rtl:rotate-180" />
            </button>
          </div>
        </div>

        <div className="mt-3.5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-goldleaf/30 bg-goldleaf/10 px-3 py-1 font-manrope text-[10.5px] font-semibold text-goldleaf">
            <FeastStarIcon className="size-3.5" />
            {t("km.today.feast")}
          </span>
          <span className="rounded-full border border-cream/12 bg-nightwine/40 px-3 py-1 font-manrope text-[10.5px] text-cream/55">
            {t("km.today.season")}
          </span>
        </div>
      </section>

      {/* ── Moment switcher ── */}
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
        {orderedGroups.map((group) => {
          const isActive = group === active;
          const gh = groupHue[group];

          return (
            <button
              key={group}
              type="button"
              onClick={() => setActive(group)}
              style={{ "--hue": gh.hue, "--hue-2": gh.hue2 } as CSSProperties}
              className={`press flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 font-manrope text-[12px] font-semibold ${
                isActive
                  ? "hue-text hue-ring bg-nightwine/70"
                  : "border-cream/10 bg-wine/35 text-cream/50"
              }`}
            >
              {groupIcon[group]}
              {groupLabel[group][lang]}
            </button>
          );
        })}
      </div>

      {/* ── Selected moment's readings ── */}
      <section
        className="km-band rounded-[30px] p-3.5 pt-4"
        style={{ "--hue": hue.hue, "--hue-2": hue.hue2 } as CSSProperties}
      >
        <div className="mb-3.5 flex items-center gap-3 px-1.5">
          <span className="hue-bg size-1.5 rounded-full" />
          <span className="min-w-0 flex-1">
            <span className="hue-text block font-display text-[16.5px] font-semibold">
              {groupLabel[active][lang]}
            </span>
            <span className="mt-0.5 block truncate font-manrope text-[10px] text-cream/40">
              {groupCaption[active][lang]}
            </span>
          </span>
          <span className="font-manrope text-[11px] tabular-nums text-cream/25">{list.length}</span>
        </div>

        <div className="space-y-2.5">
          {list.map((reading, i) => (
            <ReadingCard
              key={reading.id}
              kind={reading.kind[lang]}
              reference={reading.ref[lang]}
              excerpt={reading.excerpt[lang]}
              minutes={reading.minutes}
              icon={readingIcon[reading.id]}
              hue={hue}
              index={i + 1}
            />
          ))}
        </div>
      </section>

      {/* ── Whole-day actions ── */}
      <section className="grid grid-cols-2 gap-2.5">
        <Link
          to="/katameros-read"
          className="press km-cta flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-display text-[14px] font-semibold text-nightwine"
        >
          {t("km.day.readAll")}
          <ArrowGlyph className="size-4 rtl:rotate-180" />
        </Link>
        <button
          type="button"
          className="press flex items-center justify-center gap-2 rounded-2xl border border-goldleaf/25 bg-wine/45 px-4 py-3 font-display text-[14px] font-semibold text-cream"
        >
          <HeadphonesIcon className="size-4" />
          {t("km.day.listen")}
        </button>
      </section>

      <footer className="flex flex-col items-center gap-2 pt-2 text-center">
        <CopticCross className="size-5 text-brass/70" />
        <p className="font-manrope text-[11.5px] text-cream/35">{t("km.footer")}</p>
      </footer>
    </KatamerosShell>
  );
}
