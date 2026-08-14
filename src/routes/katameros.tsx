import { Link, createFileRoute } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

import katamerosHero from "@/assets/katameros-hero.jpg";
import { CopticCross } from "@/components/church/icons";
import { ReadingCard } from "@/components/katameros/ReadingCard";
import {
  ArrowGlyph,
  BookmarkGlyph,
  CalendarGlyph,
  CenserIcon,
  ChaliceIcon,
  EpistleIcon,
  FeastStarIcon,
  GospelIcon,
  HeadphonesIcon,
  LampIcon,
  PraxisIcon,
  PsalmIcon,
  SearchGlass,
} from "@/components/katameros/katameros-icons";
import { Screen } from "@/components/layout/Screen";
import { useLang } from "@/lib/i18n";
import { SloganBand } from "@/components/layout/SloganBand";
import {
  copticMonths,
  groupCaption,
  groupHue,
  groupLabel,
  majorFeasts,
  orderedGroups,
  readingsOf,
  seasons,
  weekStrip,
  type ReadingGroupKey,
} from "@/lib/katameros-data";

export const Route = createFileRoute("/katameros")({
  head: () => ({
    meta: [
      { title: "القطمارس — قراءات اليوم والتقويم القبطي | Alpha" },
      {
        name: "description",
        content:
          "The Alpha Katameros: today's vespers, matins and liturgy readings, the Synaxarium, the Coptic months, seasons and feasts — one calm, premium lectionary.",
      },
      { property: "og:title", content: "القطمارس — قراءات اليوم والتقويم القبطي | Alpha" },
      {
        property: "og:description",
        content: "Vespers, matins, liturgy readings and the Coptic calendar inside Alpha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KatamerosHome,
});

const groupIcon: Record<ReadingGroupKey, ReactNode> = {
  vespers: <LampIcon className="size-[19px]" />,
  matins: <CenserIcon className="size-[19px]" />,
  liturgy: <ChaliceIcon className="size-[19px]" />,
  synaxarium: <FeastStarIcon className="size-[19px]" />,
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

function SectionTitle({ title, action, to }: { title: string; action?: string; to?: "/katameros-calendar" }) {
  return (
    <div className="mb-3 flex items-center gap-3 px-1">
      <span className="size-1.5 rounded-full bg-brass" />
      <h2 className="font-display text-[16.5px] font-semibold tracking-tight text-cream">{title}</h2>
      <span className="km-hairline h-px flex-1 opacity-40" />
      {action ? (
        to ? (
          <Link to={to} className="font-manrope text-[10.5px] font-semibold text-brass">
            {action}
          </Link>
        ) : (
          <span className="font-manrope text-[10.5px] font-semibold text-brass">{action}</span>
        )
      ) : null}
    </div>
  );
}

function KatamerosHome() {
  const { t, lang, dir, isArabic } = useLang();

  return (
    <Screen className="km-page">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-8 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        {/* ── Hero: candle-lit lectionary ── */}
        <header className="relative">
          <div className="absolute inset-x-0 top-0 h-[320px] overflow-hidden rounded-b-[38px]">
            <img
              src={katamerosHero}
              alt={t("km.heroAlt")}
              width={1200}
              height={912}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-nightwine/55 via-nightwine/72 to-nightwine" />
          </div>

          <div className="safe-top relative flex items-center justify-between gap-3 px-5 pb-1">
            <Link
              to="/katameros-search"
              aria-label={t("km.search")}
              className="press grid size-11 place-items-center rounded-2xl border border-goldleaf/25 bg-nightwine/45 text-cream/85 backdrop-blur-md"
            >
              <SearchGlass className="size-[18px]" />
            </Link>
            <Link
              to="/katameros-saved"
              aria-label={t("km.saved")}
              className="press grid size-11 place-items-center rounded-2xl border border-goldleaf/25 bg-nightwine/45 text-cream/85 backdrop-blur-md"
            >
              <BookmarkGlyph className="size-[18px]" />
            </Link>
          </div>

          <div className="relative px-5 pt-5 pb-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-goldleaf/25 bg-nightwine/40 px-3 py-1 font-manrope text-[10px] font-semibold tracking-[0.16em] text-goldleaf uppercase backdrop-blur-md">
              <CopticCross className="size-3" />
              Alpha
            </span>
            <h1 className="mt-2.5 font-display text-[38px] leading-none font-semibold tracking-tight text-cream">
              {t("km.title")}
            </h1>
            <p className="mt-2 font-manrope text-[12.5px] text-cream/55">{t("km.subtitle")}</p>
          </div>
        </header>

        <main className="relative space-y-6 px-4">
          {/* ── Today: the day's identity + entry point ── */}
          <section
            className="km-glass relative isolate overflow-hidden rounded-[30px] p-5"
            style={{ "--hue": "oklch(0.560 0.130 30)", "--hue-2": "oklch(0.850 0.086 70)" } as CSSProperties}
          >
            <span
              aria-hidden="true"
              className="km-halo candle-breathe pointer-events-none absolute -end-12 -top-16 -z-10 size-56 rounded-full"
            />
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="font-manrope text-[10px] font-bold tracking-[0.18em] text-brass uppercase">
                  {t("km.today")}
                </span>
                <h2 className="mt-2 font-display text-[30px] leading-none font-semibold text-cream">
                  {t("km.today.coptic")}
                </h2>
                <p className="mt-1.5 font-manrope text-[11.5px] text-cream/50">{t("km.today.greg")}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1.5">
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

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-goldleaf/30 bg-goldleaf/10 px-3 py-1 font-manrope text-[10.5px] font-semibold text-goldleaf">
                <FeastStarIcon className="size-3.5" />
                {t("km.today.feast")}
              </span>
              <span className="rounded-full border border-cream/12 bg-nightwine/40 px-3 py-1 font-manrope text-[10.5px] text-cream/55">
                {t("km.today.season")}
              </span>
            </div>

            <Link
              to="/katameros-day"
              className="press km-cta mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-display text-[14.5px] font-semibold text-nightwine"
            >
              {t("km.today.cta")}
              <ArrowGlyph className="size-4 rtl:rotate-180" />
            </Link>
          </section>

          {/* ── Week strip: quick day jumping ── */}
          <section>
            <SectionTitle title={t("km.week")} action={t("km.cal.open")} to="/katameros-calendar" />
            <div className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1">
              {weekStrip.map((day) => (
                <Link
                  key={day.id}
                  to="/katameros-day"
                  className={`press relative flex w-[62px] shrink-0 snap-start flex-col items-center gap-1 rounded-[20px] border px-2 py-3 ${
                    day.today
                      ? "border-goldleaf/45 bg-goldleaf/12"
                      : "border-cream/10 bg-wine/40"
                  }`}
                >
                  <span
                    className={`font-manrope text-[10px] ${day.today ? "text-goldleaf" : "text-cream/45"}`}
                  >
                    {day.dow[lang]}
                  </span>
                  <span
                    className={`font-display text-[19px] leading-none font-semibold tabular-nums ${
                      day.today ? "text-cream" : "text-cream/75"
                    }`}
                  >
                    {day.greg}
                  </span>
                  <span className="font-manrope text-[8.5px] text-cream/35">{day.copt[lang]}</span>
                  {day.feast ? (
                    <span className="absolute end-2 top-2 size-1.5 rounded-full bg-brass" />
                  ) : null}
                </Link>
              ))}
            </div>
          </section>

          {/* ── The day's readings, one colour family per liturgical moment ── */}
          {orderedGroups.map((group) => {
            const hue = groupHue[group];
            const list = readingsOf(group);

            return (
              <section
                key={group}
                className="km-band rounded-[30px] p-3.5 pt-4"
                style={{ "--hue": hue.hue, "--hue-2": hue.hue2 } as CSSProperties}
              >
                <div className="mb-3.5 flex items-center gap-3 px-1.5">
                  <span className="hue-text grid size-9 place-items-center rounded-2xl border bg-nightwine/45 hue-ring">
                    {groupIcon[group]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="hue-text block font-display text-[16.5px] font-semibold tracking-tight">
                      {groupLabel[group][lang]}
                    </span>
                    <span className="mt-0.5 block truncate font-manrope text-[10px] text-cream/40">
                      {groupCaption[group][lang]}
                    </span>
                  </span>
                  <span className="font-manrope text-[11px] tabular-nums text-cream/25">
                    {list.length}
                  </span>
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
            );
          })}

          {/* ── Coptic months ── */}
          <section>
            <SectionTitle title={t("km.months")} action={t("km.cal.open")} to="/katameros-calendar" />
            <div className="grid grid-cols-3 gap-2.5">
              {copticMonths.map((month, i) => (
                <Link
                  key={month.id}
                  to="/katameros-calendar"
                  className="press relative overflow-hidden rounded-[20px] border border-cream/10 bg-wine/45 px-3 py-3"
                >
                  <span className="block font-display text-[15px] font-semibold text-cream">
                    {month.name[lang]}
                  </span>
                  <span className="mt-0.5 block truncate font-manrope text-[9px] text-brass/80">
                    {month.season ? month.season[lang] : t("km.months.annual")}
                  </span>
                  <span className="absolute end-2 top-1.5 font-display text-[13px] tabular-nums text-cream/12">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Seasons & fasts ── */}
          <section>
            <SectionTitle title={t("km.seasons")} />
            <div className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1">
              {seasons.map((season) => (
                <Link
                  key={season.id}
                  to="/katameros-calendar"
                  className="press km-card relative isolate flex w-[188px] shrink-0 snap-start flex-col overflow-hidden rounded-[24px] p-4"
                  style={{ "--hue": season.accent, "--hue-2": season.accent } as CSSProperties}
                >
                  <span
                    aria-hidden="true"
                    className="km-halo pointer-events-none absolute -end-8 -top-10 -z-10 size-28 rounded-full opacity-70"
                  />
                  <span className="hue-text grid size-9 place-items-center rounded-2xl border bg-nightwine/45 hue-ring">
                    <CalendarGlyph className="size-[18px]" />
                  </span>
                  <span className="mt-4 block font-display text-[17px] leading-tight font-semibold text-cream">
                    {season.name[lang]}
                  </span>
                  <span className="mt-1 block font-manrope text-[10.5px] text-cream/45">
                    {season.span[lang]}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Major feasts ── */}
          <section>
            <SectionTitle title={t("km.feasts")} />
            <div className="km-glass overflow-hidden rounded-[26px]">
              {majorFeasts.map((feast, i) => (
                <Link
                  key={feast.id}
                  to="/katameros-day"
                  className={`press flex items-center gap-3 px-4 py-3 ${
                    i > 0 ? "border-t border-cream/8" : ""
                  }`}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-2xl border border-goldleaf/25 bg-goldleaf/10 text-goldleaf">
                    <FeastStarIcon className="size-[17px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-display text-[15px] font-semibold text-cream">
                      {feast.name[lang]}
                    </span>
                    <span className="mt-0.5 block font-manrope text-[10.5px] text-cream/45">
                      {feast.date[lang]}
                    </span>
                  </span>
                  <ArrowGlyph className="size-4 shrink-0 text-cream/25 rtl:rotate-180" />
                </Link>
              ))}
            </div>
          </section>

          {/* ── Listen to the day's readings ── */}
          <section className="km-glass flex items-center gap-3.5 rounded-[26px] p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-goldleaf/15 text-goldleaf">
              <HeadphonesIcon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[15.5px] font-semibold text-cream">
                {t("km.listen")}
              </span>
              <span className="mt-0.5 block font-manrope text-[11px] text-cream/45">
                {t("km.listen.meta")}
              </span>
            </span>
            <ArrowGlyph className="size-4 text-cream/25 rtl:rotate-180" />
          </section>

          <footer className="flex flex-col items-center gap-2.5 pt-2 text-center">
            <CopticCross className="size-5 text-brass/70" />
            <p className="font-manrope text-[12px] text-cream/40">{t("km.footer")}</p>
            <p className="copt-band">ⲁ ⲱ ⲭ ⲥ ⲡⲛⲟⲩϯ ⲁ ⲱ</p>
          </footer>
        </main>
      </div>
      <SloganBand />
    </Screen>
  );
}
