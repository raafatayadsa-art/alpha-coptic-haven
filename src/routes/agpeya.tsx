import { Link, createFileRoute } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

import agpeyaNightHero from "@/assets/agpeya-night-hero.jpg";
import { PrayerHourCard, type PrayerSpan, type PrayerTone } from "@/components/church/PrayerHourCard";
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
import { agpeyaHours } from "@/lib/agpeya-data";
import { useLang } from "@/lib/i18n";
import { SloganBand } from "@/components/layout/SloganBand";

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

/* Presentation-only content — same hours and groups as the original flow. */
type Prayer = { key: string; time: string; icon: ReactNode; tone?: PrayerTone; span?: PrayerSpan };

/** Each section owns a hue pair, so the groups read as separate colour families. */
type Hue = { hue: string; hue2: string };

const hueStyle = ({ hue, hue2 }: Hue) =>
  ({ "--hue": hue, "--hue-2": hue2 }) as CSSProperties;

const HUE_NOW: Hue = { hue: "oklch(0.665 0.108 62)", hue2: "oklch(0.855 0.092 82)" };
const HUE_DAY: Hue = { hue: "oklch(0.660 0.108 205)", hue2: "oklch(0.840 0.090 190)" };
const HUE_NIGHT: Hue = { hue: "oklch(0.520 0.126 278)", hue2: "oklch(0.790 0.086 288)" };
const HUE_EXTRA: Hue = { hue: "oklch(0.620 0.100 163)", hue2: "oklch(0.830 0.088 155)" };

const HOUR_IDS = new Set(agpeyaHours.map((h) => h.id));

const dayPrayers: Prayer[] = [
  { key: "ag.p.prime", time: "ag.p.prime.t", icon: <SunIcon className="size-5" />, span: "wide" },
  { key: "ag.p.terce", time: "ag.p.terce.t", icon: <SunIcon className="size-5" /> },
  { key: "ag.p.sext", time: "ag.p.sext.t", icon: <SunIcon className="size-5" /> },
  { key: "ag.p.none", time: "ag.p.none.t", icon: <SunsetIcon className="size-5" /> },
  { key: "ag.p.vespers", time: "ag.p.vespers.t", icon: <SunsetIcon className="size-5" /> },
  { key: "ag.p.compline", time: "ag.p.compline.t", icon: <MoonIcon className="size-5" />, span: "wide" },
];

const nightPrayers: Prayer[] = [
  { key: "ag.p.veil", time: "ag.p.veil.t", icon: <MoonStarIcon className="size-5" />, tone: "featured", span: "tall" },
  { key: "ag.p.mid1", time: "ag.p.mid1.t", icon: <MoonIcon className="size-5" /> },
  { key: "ag.p.mid2", time: "ag.p.mid2.t", icon: <MoonIcon className="size-5" /> },
  { key: "ag.p.mid3", time: "ag.p.mid3.t", icon: <MoonIcon className="size-5" />, span: "wide" },
];

const extraPrayers: Prayer[] = [
  { key: "ag.p.misc", time: "ag.p.misc.t", icon: <BookOpenIcon className="size-5" /> },
  { key: "ag.p.david", time: "ag.p.david.t", icon: <NoteIcon className="size-5" /> },
  { key: "ag.p.thanks", time: "ag.p.thanks.t", icon: <SparkleIcon className="size-5" /> },
  { key: "ag.p.creed", time: "ag.p.creed.t", icon: <CreedShieldIcon className="size-5" /> },
];

function BentoSection({
  title,
  prayers,
  hue,
  offset = 0,
  id,
}: {
  title: string;
  prayers: Prayer[];
  hue: Hue;
  offset?: number;
  id?: string;
}) {
  const { t } = useLang();

  return (
    <section
      id={id}
      className="ocean-band scroll-mt-[150px] rounded-[32px] p-3.5 pt-4"
      style={hueStyle(hue)}
    >
      <div className="mb-3.5 flex items-center gap-3 px-1.5">
        <span className="hue-bg size-1.5 rounded-full" />
        <h2 className="hue-text font-sora text-[15.5px] font-semibold tracking-tight">{title}</h2>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-foam/12 to-transparent" />
        <span className="font-manrope text-[11px] font-medium tabular-nums text-foam/30">
          {prayers.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {prayers.map((prayer, i) => (
          <PrayerHourCard
            key={prayer.key}
            name={t(prayer.key)}
            time={t(prayer.time)}
            icon={prayer.icon}
            tone={prayer.tone ?? "plain"}
            span={prayer.span ?? "cell"}
            index={offset + i + 1}
            hourId={HOUR_IDS.has(prayer.key.replace("ag.p.", "")) ? prayer.key.replace("ag.p.", "") : undefined}
          />
        ))}
      </div>
    </section>
  );
}


function AgpeyaScreen() {
  const { t, dir, isArabic } = useLang();


  return (
    <Screen className="bg-abyss">
      <div
        dir={dir}
        className={`theme-ocean relative mx-auto w-full max-w-[430px] overflow-x-hidden bg-abyss pb-1 ${
          isArabic ? "font-arabic" : "font-manrope"
        }`}
      >
        {/* ── Hero: compact nocturne cover, title sits high ── */}
        <header className="relative">
          <img
            src={agpeyaNightHero}
            alt={t("ag.heroAlt")}
            width={1200}
            height={912}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-abyss/45 via-abyss/60 to-abyss" />
          <div className="ocean-halo tide-drift absolute -top-16 start-1/2 size-56 -translate-x-1/2 rounded-full" />

          <div className="safe-top relative flex items-center justify-between gap-3 px-5 pb-1">
            <button
              type="button"
              aria-label={t("ag.saved")}
              className="press relative grid size-11 place-items-center rounded-2xl border border-mint/20 bg-deep/60 text-foam/70 backdrop-blur-md"
            >
              <BookmarkIcon className="size-[18px]" />
              <span className="absolute -top-1.5 -end-1.5 grid size-5 place-items-center rounded-full bg-mint font-sora text-[10px] font-bold text-abyss">
                1
              </span>
            </button>
          </div>

          <div className="relative px-5 pt-4 pb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-deep/50 px-3 py-1 font-manrope text-[10px] font-semibold tracking-[0.16em] text-mint uppercase backdrop-blur-md">
              <CopticCross className="size-3" />
              Alpha
            </span>
            <h1 className="mt-2.5 font-sora text-[36px] font-bold leading-none tracking-tight text-foam">
              {t("ag.title")}
            </h1>
            <p className="mt-2 font-manrope text-[12.5px] text-foam/50">{t("ag.subtitle")}</p>
          </div>
        </header>

        <main className="space-y-5 px-4">
          {/* ── Current prayer: warm amber hero tile ── */}
          <section
            id="ag-now"
            className="ocean-glass relative isolate scroll-mt-[150px] overflow-hidden rounded-[30px] p-5"
            style={hueStyle(HUE_NOW)}
          >
            <span
              aria-hidden="true"
              className="ocean-halo tide-drift pointer-events-none absolute -end-12 -top-16 -z-10 size-56 rounded-full"
            />
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="hue-bg absolute inset-0 animate-ping rounded-full opacity-60" />
                <span className="hue-bg relative size-2 rounded-full" />
              </span>
              <span className="hue-text font-manrope text-[10.5px] font-semibold tracking-[0.16em] uppercase">
                {t("ag.current")}
              </span>
            </div>

            <h2 className="mt-3 font-sora text-[27px] font-bold leading-tight tracking-tight text-foam">
              {t("ag.current.name")}
            </h2>
            <p className="mt-2 font-manrope text-[12.5px] leading-relaxed text-foam/55">
              {t("ag.current.line")}
            </p>

            <div className="mt-4 flex items-center gap-1.5 rounded-2xl border bg-abyss/45 px-3 py-2 hue-ring">
              <ClockIcon className="hue-text size-3.5 shrink-0" />
              <span className="truncate font-manrope text-[11px] text-foam/60">{t("ag.current.meta")}</span>
            </div>

            <Link
              to="/agpeya-read"
              search={{ hour: "prime" }}
              className="press hue-cta mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-sora text-[13px] font-semibold text-abyss"
            >
              <PlayIcon className="size-[15px]" />
              {t("ag.current.cta")}
              <ChevronRight className="size-3.5 rtl:rotate-180" />
            </Link>
          </section>

          {/* ── The original three groups, each in its own colour band ── */}
          <BentoSection id="ag-day" title={t("ag.day")} prayers={dayPrayers} hue={HUE_DAY} />
          <BentoSection
            id="ag-night"
            title={t("ag.night")}
            prayers={nightPrayers}
            hue={HUE_NIGHT}
            offset={dayPrayers.length}
          />
          <BentoSection
            id="ag-extra"
            title={t("ag.extra")}
            prayers={extraPrayers}
            hue={HUE_EXTRA}
            offset={dayPrayers.length + nightPrayers.length}
          />

          <footer className="flex flex-col items-center gap-2.5 pt-3 text-center">
            <CopticCross className="size-5 text-teal/70" />
            <p className="font-manrope text-[12.5px] text-foam/40">{t("ag.footer")}</p>
          </footer>
        </main>
      </div>
      <SloganBand />
    </Screen>
  );
}
