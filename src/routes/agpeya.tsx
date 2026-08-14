import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import agpeyaHero from "@/assets/agpeya-hero.jpg";
import agpeyaSunrise from "@/assets/agpeya-sunrise.jpg";
import { LanguageToggle } from "@/components/church/LanguageToggle";
import { PrayerHourCard, type PrayerTone } from "@/components/church/PrayerHourCard";
import { ChevronRight, CopticCross } from "@/components/church/icons";
import { BookmarkIcon, ClockIcon, PlayIcon } from "@/components/church/media-icons";
import {
  BookOpenIcon,
  CreedShieldIcon,
  MoonIcon,
  MoonStarIcon,
  NoteIcon,
  SparkleIcon,
  SunIcon,
  SunsetIcon,
} from "@/components/church/prayer-icons";
import { Screen } from "@/components/layout/Screen";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/agpeya")({
  head: () => ({
    meta: [
      { title: "الأجبية — صلوات السواعي اليومية | Alpha" },
      {
        name: "description",
        content:
          "The Agpeya in Alpha: day hours, night watches and additional prayers — Morning, Third, Sixth, Ninth, Vespers, Compline, the Veil and the midnight watches.",
      },
      { property: "og:title", content: "الأجبية — صلوات السواعي اليومية | Alpha" },
      {
        property: "og:description",
        content: "A calm, premium Agpeya screen: day prayers, night watches and additional prayers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgpeyaScreen,
});

/* Presentation-only content — mirrors the original Agpeya flow exactly. */
type Prayer = { key: string; time: string; icon: ReactNode; tone?: PrayerTone };

const dayPrayers: Prayer[] = [
  { key: "ag.p.prime", time: "ag.p.prime.t", icon: <SunIcon className="size-6" /> },
  { key: "ag.p.terce", time: "ag.p.terce.t", icon: <SunIcon className="size-6" /> },
  { key: "ag.p.sext", time: "ag.p.sext.t", icon: <SunIcon className="size-6" /> },
  { key: "ag.p.none", time: "ag.p.none.t", icon: <SunsetIcon className="size-6" /> },
  { key: "ag.p.vespers", time: "ag.p.vespers.t", icon: <SunsetIcon className="size-6" /> },
  { key: "ag.p.compline", time: "ag.p.compline.t", icon: <MoonIcon className="size-6" />, tone: "night" },
];

const nightPrayers: Prayer[] = [
  { key: "ag.p.veil", time: "ag.p.veil.t", icon: <MoonStarIcon className="size-6" />, tone: "featured" },
  { key: "ag.p.mid1", time: "ag.p.mid1.t", icon: <MoonIcon className="size-6" />, tone: "night" },
  { key: "ag.p.mid2", time: "ag.p.mid2.t", icon: <MoonIcon className="size-6" />, tone: "night" },
  { key: "ag.p.mid3", time: "ag.p.mid3.t", icon: <MoonIcon className="size-6" />, tone: "night" },
];

const extraPrayers: Prayer[] = [
  { key: "ag.p.misc", time: "ag.p.misc.t", icon: <BookOpenIcon className="size-6" />, tone: "extra" },
  { key: "ag.p.david", time: "ag.p.david.t", icon: <NoteIcon className="size-6" />, tone: "extra" },
  { key: "ag.p.thanks", time: "ag.p.thanks.t", icon: <SparkleIcon className="size-6" />, tone: "extra" },
  { key: "ag.p.creed", time: "ag.p.creed.t", icon: <CreedShieldIcon className="size-6" />, tone: "extra" },
];

function PrayerRow({ title, prayers }: { title: string; prayers: Prayer[] }) {
  const { t } = useLang();

  return (
    <section className="-mx-4">
      <div className="mb-3 flex items-center justify-between gap-3 px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="h-4 w-px shrink-0 bg-gold/60" />
          <h2 className="truncate font-display text-[19px] font-semibold tracking-tight">{title}</h2>
        </div>
        <span className="shrink-0 text-[10.5px] font-medium text-ink/35">{t("ag.hint")}</span>
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3">
        {prayers.map((prayer) => (
          <PrayerHourCard
            key={prayer.key}
            name={t(prayer.key)}
            time={t(prayer.time)}
            icon={prayer.icon}
            tone={prayer.tone ?? "day"}
          />
        ))}
      </div>
    </section>
  );
}

function AgpeyaScreen() {
  const { t, dir, isArabic } = useLang();
  const arabic = isArabic ? "font-arabic" : "";

  return (
    <Screen>
      <div
        dir={dir}
        className={`${arabic} mx-auto w-full max-w-[430px] overflow-x-hidden bg-ivory pb-8 text-ink selection:bg-gold/20`}
      >
        {/* 1 — Hero: warm candle-lit identity of the Agpeya */}
        <header className="relative">
          <img
            src={agpeyaHero}
            alt={t("ag.heroAlt")}
            width={1200}
            height={800}
            className="h-[260px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/70 via-ivory/25 to-ivory" />

          <div className="safe-top absolute inset-x-0 top-0 flex items-start justify-between gap-3 px-5">
            <button
              type="button"
              aria-label={t("ag.saved")}
              className="press relative grid size-11 place-items-center rounded-full bg-ivory/90 text-ink/60 shadow-[var(--shadow-soft)] ring-1 ring-ink/5 backdrop-blur-md"
            >
              <BookmarkIcon className="size-[18px]" />
              <span className="absolute -top-1 -end-1 grid size-5 place-items-center rounded-full bg-gold text-[10px] font-bold text-ink ring-2 ring-ivory">
                1
              </span>
            </button>

            <div className="mt-1 min-w-0 text-center">
              <h1 className="truncate font-display text-[30px] font-semibold leading-none tracking-tight">
                {t("ag.title")}
              </h1>
              <p className="mt-1.5 text-[12px] font-medium text-ink/45">{t("ag.subtitle")}</p>
            </div>

            <LanguageToggle />
          </div>
        </header>

        <main className="-mt-14 space-y-8 px-4">
          {/* 2 — Current prayer card */}
          <section className="glass-card relative overflow-hidden rounded-[30px]">
            <div className="flex items-stretch">
              <div className="min-w-0 flex-1 p-5">
                <h2 className="font-display text-[24px] font-semibold leading-tight tracking-tight">
                  {t("ag.current.name")}
                </h2>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink/50">{t("ag.current.line")}</p>
                <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-ink/45">
                  <ClockIcon className="size-3.5 shrink-0 text-gold" />
                  <span className="truncate">{t("ag.current.meta")}</span>
                </p>
                <button
                  type="button"
                  className="press mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold/75 px-4 py-2.5 text-[12.5px] font-semibold text-ink shadow-[0_10px_24px_-12px_rgba(0,0,0,0.45)]"
                >
                  <PlayIcon className="size-[14px]" />
                  {t("ag.current.cta")}
                  <ChevronRight className="size-3.5 rtl:rotate-180" />
                </button>
              </div>

              <div className="relative w-[132px] shrink-0 overflow-hidden">
                <img
                  src={agpeyaSunrise}
                  alt={t("ag.current.alt")}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-ivory/60 rtl:bg-gradient-to-r" />
                <span className="absolute inset-x-2 top-2 flex items-center justify-center gap-1.5 rounded-full bg-ink/70 px-2 py-1 text-[9.5px] font-semibold text-ivory backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-gold" />
                  {t("ag.current")}
                </span>
              </div>
            </div>
          </section>

          {/* 3, 4, 5 — the original prayer groups */}
          <PrayerRow title={t("ag.day")} prayers={dayPrayers} />
          <PrayerRow title={t("ag.night")} prayers={nightPrayers} />
          <PrayerRow title={t("ag.extra")} prayers={extraPrayers} />

          {/* Soft footer */}
          <footer className="flex flex-col items-center gap-2 pt-2 text-center">
            <CopticCross className="size-5 text-gold/70" />
            <p className="font-display text-[14px] text-ink/45">{t("ag.footer")}</p>
          </footer>
        </main>
      </div>
    </Screen>
  );
}
