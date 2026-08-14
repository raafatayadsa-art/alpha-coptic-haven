import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";

import synaxHero from "@/assets/synax-hero.jpg";
import { CopticCross } from "@/components/church/icons";
import { Screen } from "@/components/layout/Screen";
import { SaintCard } from "@/components/synaxarium/SaintCard";
import { SynaxSectionTitle } from "@/components/synaxarium/SynaxShell";
import {
  BookmarkGlyph,
  CalendarGlyph,
  CenserGlyph,
  ChevronGlyph,
  CrownIcon,
  HaloIcon,
  HeartGlyph,
  MonkIcon,
  PalmIcon,
  ScrollIcon,
  SearchGlyph,
  ShareGlyph,
} from "@/components/synaxarium/synax-icons";
import { useLang } from "@/lib/i18n";
import {
  L,
  categories,
  categoryHue,
  categoryLabel,
  collections,
  copticToday,
  dayStrip,
  monthFeasts,
  pick,
  saintOfDay,
  todaySaints,
  type CategoryKey,
} from "@/lib/synaxarium-data";

export const Route = createFileRoute("/synaxarium")({
  head: () => ({
    meta: [
      { title: "السنكسار — سير القديسين وتذكارات اليوم | Alpha" },
      {
        name: "description",
        content:
          "The Alpha Synaxarium: today's saint, the day's commemorations, Coptic month feasts and collections of saints' lives — spiritual, calm and premium.",
      },
      { property: "og:title", content: "السنكسار — سير القديسين وتذكارات اليوم | Alpha" },
      {
        property: "og:description",
        content: "Discover the saint of the day and every commemoration of the Coptic calendar inside Alpha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SynaxariumHome,
});

const catIcon: Record<Exclude<CategoryKey, "all">, React.ReactNode> = {
  martyrs: <PalmIcon className="size-[15px]" />,
  monks: <MonkIcon className="size-[15px]" />,
  patriarchs: <CrownIcon className="size-[15px]" />,
  virgins: <HaloIcon className="size-[15px]" />,
  feasts: <CenserGlyph className="size-[15px]" />,
};

function SynaxariumHome() {
  const { lang, dir, isArabic } = useLang();
  const [cat, setCat] = useState<CategoryKey>("all");
  const [dayIndex, setDayIndex] = useState(4);

  const list = cat === "all" ? todaySaints : todaySaints.filter((s) => s.category === cat);
  const hue = categoryHue[saintOfDay.category];

  return (
    <Screen className="sx-page">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-10 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        {/* ── Hero: iconostasis ─────────────────────────── */}
        <div className="absolute inset-x-0 top-0 h-[300px] overflow-hidden rounded-b-[40px]">
          <img
            src={synaxHero}
            alt={pick(L.heroAlt, lang)}
            width={1200}
            height={900}
            className="size-full scale-105 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-synaxnight/58 via-synaxnight/80 to-synaxnight" />
        </div>

        <header className="safe-top relative px-4 pt-2">
          <div className="flex items-center gap-2">
            <Link
              to="/synaxarium-search"
              aria-label={pick(L.search, lang)}
              className="press grid size-10 place-items-center rounded-full border border-icongold/25 bg-synaxdeep/55 text-ivory/85 backdrop-blur-xl"
            >
              <SearchGlyph className="size-[18px]" />
            </Link>
            <Link
              to="/synaxarium-months"
              aria-label={pick(L.browseMonths, lang)}
              className="press grid size-10 place-items-center rounded-full border border-icongold/25 bg-synaxdeep/55 text-ivory/85 backdrop-blur-xl"
            >
              <CalendarGlyph className="size-[18px]" />
            </Link>
            <div className="ms-auto text-end">
              <p className="font-manrope text-[9.5px] font-bold tracking-[0.2em] text-icongold uppercase">
                {pick(copticToday.year, lang)}
              </p>
              <p className="font-display text-[12.5px] text-ivory/70">{pick(copticToday.gregorian, lang)}</p>
            </div>
          </div>

          {/* Gilded title block */}
          <div className="relative mt-6 text-center">
            <CopticCross className="mx-auto size-6 text-icongold/80" />
            <h1 className="sx-gilt mt-2 font-display text-[34px] leading-none font-bold">{pick(L.title, lang)}</h1>
            <p className="mt-2 text-[12.5px] text-ivory/60">{pick(L.tagline, lang)}</p>

            <div className="mt-4 flex items-center justify-center gap-2.5">
              <span className="sx-hairline h-px w-12 opacity-60" />
              <span className="rounded-full border border-icongold/25 bg-synaxdeep/55 px-3 py-1 font-manrope text-[10.5px] font-semibold text-iconleaf backdrop-blur-xl">
                {pick(copticToday.day, lang)} {pick(copticToday.month, lang)} · {pick(L.todayCount, lang)}
              </span>
              <span className="sx-hairline h-px w-12 opacity-60" />
            </div>
            <p className="mt-2 font-manrope text-[10px] tracking-wide text-ivory/40">
              {pick(copticToday.season, lang)}
            </p>
          </div>
        </header>

        <main className="relative px-4">
          {/* ── Saint of the day: gilded icon panel ─────── */}
          <section className="mt-7">
            <div
              className="sx-card relative overflow-hidden rounded-[32px] p-3.5"
              style={{ "--hue": hue.hue, "--hue-2": hue.hue2 } as CSSProperties}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-2 end-3 font-display text-[52px] leading-none text-iconleaf/[0.08] select-none"
              >
                ⲁ
              </span>

              <div className="flex items-start justify-between gap-3">
                <span className="flex items-center gap-1.5 rounded-full border border-icongold/30 bg-synaxnight/60 px-2.5 py-1 font-manrope text-[10px] font-bold text-iconleaf">
                  <span className="size-1.5 animate-pulse rounded-full bg-saffron" />
                  {pick(L.saintOfDay, lang)}
                </span>
                <span className="font-manrope text-[10px] font-semibold text-icongold">
                  {pick(saintOfDay.copticDate, lang)}
                </span>
              </div>

              {/* Arched icon with halo */}
              <div className="relative mt-3.5 flex justify-center">
                <div className="sx-halo absolute -top-4 size-[190px] opacity-55 blur-[2px]" />
                <div className="sx-arch relative w-[168px] overflow-hidden border border-icongold/35 shadow-[0_26px_50px_-24px_rgba(0,0,0,0.9)]">
                  <img
                    src={saintOfDay.image}
                    alt={pick(saintOfDay.name, lang)}
                    loading="lazy"
                    width={912}
                    height={1104}
                    className="h-[208px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-synaxnight/80 via-transparent to-transparent" />
                </div>
              </div>

              <div className="relative mt-4 text-center">
                <h2 className="font-display text-[19px] leading-snug font-bold text-ivory">
                  {pick(saintOfDay.name, lang)}
                </h2>
                <p className="mt-1 font-manrope text-[11px] font-semibold tracking-wide text-icongold">
                  {pick(saintOfDay.title, lang)}
                </p>
                <p className="mx-auto mt-2.5 max-w-[300px] text-[12.5px] leading-relaxed text-ivory/62">
                  {pick(saintOfDay.excerpt, lang)}
                </p>
              </div>

              <div className="sx-hairline mt-4 h-px opacity-45" />

              <div className="mt-3.5 flex items-center gap-2">
                <Link
                  to="/synaxarium-saint"
                  className="press sx-cta grid h-11 flex-1 place-items-center rounded-2xl font-display text-[13.5px] font-bold text-synaxnight"
                >
                  {pick(L.readLife, lang)} · {saintOfDay.minutes} {pick(L.minutes, lang)}
                </Link>
                <button
                  type="button"
                  onClick={() => setLiked((v) => !v)}
                  aria-pressed={liked}
                  aria-label={pick(liked ? L.liked : L.like, lang)}
                  className={`press flex h-11 items-center gap-1.5 rounded-2xl border px-3.5 font-manrope text-[11.5px] font-bold transition-colors ${
                    liked
                      ? "border-icongold/55 bg-icongold/18 text-icongold"
                      : "border-icongold/25 bg-synaxnight/55 text-ivory/80"
                  }`}
                >
                  <HeartGlyph className="size-[18px]" filled={liked} />
                  {saintOfDay.likes ?? 0 + (liked ? 1 : 0)}
                </button>
                <button
                  type="button"
                  aria-label={pick(L.publish, lang)}
                  className="press grid size-11 place-items-center rounded-2xl border border-icongold/25 bg-synaxnight/55 text-ivory/80"
                >
                  <ShareGlyph className="size-[18px]" />
                </button>
              </div>
            </div>
          </section>

          {/* ── Coptic day strip ────────────────────────── */}
          <SynaxSectionTitle title={pick(L.days, lang)} caption={pick(copticToday.month, lang)} />
          <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2.5">
              {dayStrip.map((d, i) => {
                const active = i === dayIndex;
                return (
                  <button
                    key={d.day.en}
                    type="button"
                    onClick={() => setDayIndex(i)}
                    className={`press relative grid w-[60px] shrink-0 place-items-center rounded-[20px] border py-2.5 transition-colors ${
                      active
                        ? "border-icongold/55 bg-gradient-to-b from-icongold/22 to-transparent"
                        : "border-icongold/12 bg-synaxdeep/40"
                    }`}
                  >
                    <span className="font-manrope text-[9.5px] tracking-wide text-ivory/45">
                      {pick(d.weekday, lang)}
                    </span>
                    <span
                      className={`font-display text-[19px] leading-tight font-bold ${
                        active ? "text-iconleaf" : "text-ivory/80"
                      }`}
                    >
                      {pick(d.day, lang)}
                    </span>
                    <span className="mt-0.5 flex items-center gap-[3px]">
                      {Array.from({ length: Math.min(3, Math.ceil(d.count / 3)) }).map((_, k) => (
                        <span
                          key={k}
                          className={`size-[3px] rounded-full ${active ? "bg-saffron" : "bg-icongold/40"}`}
                        />
                      ))}
                    </span>
                    {d.today ? (
                      <span className="absolute inset-x-4 -bottom-px h-px bg-saffron/70" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Today's commemorations + filters ────────── */}
          <SynaxSectionTitle title={pick(L.todayCommemorations, lang)} caption={pick(L.todayCount, lang)} />
          <div className="-mx-4 mb-3 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-2">
              {categories.map((c) => {
                const active = c.key === cat;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setCat(c.key)}
                    className={`press flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-[7px] font-manrope text-[11px] font-semibold transition-colors ${
                      active
                        ? "border-icongold/50 bg-icongold/18 text-iconleaf"
                        : "border-icongold/14 bg-synaxdeep/40 text-ivory/55"
                    }`}
                  >
                    {c.key !== "all" ? catIcon[c.key] : <ScrollIcon className="size-[15px]" />}
                    {pick(c.label, lang)}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            {list.map((s) => (
              <SaintCard key={s.id} saint={s} />
            ))}
            {list.length === 0 ? (
              <p className="rounded-[24px] border border-icongold/14 bg-synaxdeep/40 px-4 py-6 text-center text-[12px] text-ivory/45">
                {lang === "ar" ? "لا تذكارات في هذا التصنيف اليوم." : "No commemorations in this category today."}
              </p>
            ) : null}
          </div>

          <Link
            to="/synaxarium-day"
            className="press mt-3 flex items-center justify-center gap-1.5 rounded-2xl border border-icongold/20 bg-synaxdeep/40 py-3 font-manrope text-[11.5px] font-semibold text-iconleaf"
          >
            {pick(L.dayTitle, lang)} · {pick(copticToday.day, lang)} {pick(copticToday.month, lang)}
            <ChevronGlyph className="size-3.5 rtl:rotate-180" />
          </Link>

          {/* ── Month feasts timeline ───────────────────── */}
          <SynaxSectionTitle title={pick(L.monthFeasts, lang)} caption={pick(copticToday.month, lang)} />
          <div className="relative ps-6">
            <span className="absolute inset-y-2 start-[9px] w-px bg-gradient-to-b from-icongold/50 via-icongold/20 to-transparent" />
            <div className="space-y-2.5">
              {monthFeasts.map((f) => (
                <div key={f.day.en} className="relative">
                  <span className="absolute -start-[21px] top-4 grid size-[13px] place-items-center rounded-full border border-icongold/60 bg-synaxnight">
                    <span className="size-[5px] rounded-full bg-saffron" />
                  </span>
                  <div className="sx-glass rounded-[22px] px-3.5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-manrope text-[10px] font-bold tracking-wide text-icongold">
                        {pick(f.day, lang)}
                      </span>
                      <span className="rounded-full border border-iconleaf/22 px-2 py-[2px] font-manrope text-[9px] text-iconleaf/85">
                        {pick(f.kind, lang)}
                      </span>
                    </div>
                    <p className="mt-1 font-display text-[14px] font-semibold text-ivory">{pick(f.name, lang)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Collections ─────────────────────────────── */}
          <SynaxSectionTitle title={pick(L.collectionsTitle, lang)} caption={pick(L.viewAll, lang)} />
          <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-3">
              {collections.map((c) => {
                const h = categoryHue[c.category];
                return (
                  <Link
                    key={c.id}
                    to="/synaxarium-day"
                    className="press sx-card relative w-[152px] shrink-0 overflow-hidden rounded-[26px] p-3.5"
                    style={{ "--hue": h.hue, "--hue-2": h.hue2 } as CSSProperties}
                  >
                    <div className="sx-halo absolute -top-8 -end-8 size-24 opacity-40" />
                    <span className="relative font-display text-[30px] leading-none text-iconleaf/85">
                      {c.monogram}
                    </span>
                    <p className="relative mt-3 font-display text-[13.5px] leading-snug font-semibold text-ivory">
                      {pick(c.title, lang)}
                    </p>
                    <p className="relative mt-0.5 text-[10.5px] text-ivory/45">{pick(c.caption, lang)}</p>
                    <p className="relative mt-2.5 font-manrope text-[10px] font-bold text-icongold">
                      {c.count} {pick(L.commemorations, lang)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* ── Soft footer ─────────────────────────────── */}
          <footer className="mt-9 text-center">
            <div className="sx-hairline mx-auto h-px w-24 opacity-50" />
            <CopticCross className="mx-auto mt-4 size-5 text-icongold/70" />
            <p className="mx-auto mt-3 max-w-[280px] font-display text-[12.5px] leading-relaxed text-ivory/45">
              {pick(L.footer, lang)}
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 text-ivory/35">
              <button type="button" aria-label={pick(L.share, lang)} className="press">
                <ShareGlyph className="size-[16px]" />
              </button>
              <span className="size-1 rounded-full bg-ivory/20" />
              <span className="font-manrope text-[9.5px] tracking-[0.2em] uppercase">
                {pick(categoryLabel.feasts, lang)} · {pick(copticToday.year, lang)}
              </span>
            </div>
          </footer>
        </main>
      </div>
    </Screen>
  );
}
