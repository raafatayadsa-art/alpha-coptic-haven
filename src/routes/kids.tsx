import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";

import kidsHero from "@/assets/kids/kids-hero.jpg";
import {
  KdArrow,
  KdBook,
  KdBrush,
  KdChevron,
  KdCross,
  KdDove,
  KdGame,
  KdHeart,
  KdMusic,
  KdPlay,
  KdSearch,
  KdSparkle,
  KdStar,
  KdTrophy,
} from "@/components/kids/kids-icons";
import { Screen } from "@/components/layout/Screen";
import { SloganBand } from "@/components/layout/SloganBand";
import { useLang } from "@/lib/i18n";
import {
  L,
  ageHue,
  ages,
  films,
  hymns,
  kidSaints,
  missions,
  pick,
  playTiles,
  storyOfDay,
  verseOfDay,
  type AgeKey,
  type PlayKey,
} from "@/lib/kids-data";

export const Route = createFileRoute("/kids")({
  head: () => ({
    meta: [
      { title: "ألفا كيدز — عالم مسيحي للأطفال | Alpha" },
      {
        name: "description",
        content:
          "Alpha Kids: today's story, animated Bible films, saints' stories, a verse for children, songs, games, colouring and weekly challenges — for kids of every Christian family.",
      },
      { property: "og:title", content: "ألفا كيدز — عالم مسيحي للأطفال | Alpha" },
      {
        property: "og:description",
        content: "A warm, safe Christian world for children inside Alpha — stories, films, songs and games.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: KidsHome,
});

const playIcon: Record<PlayKey, (c: string) => React.ReactNode> = {
  learn: (c) => <KdBook className={c} />,
  games: (c) => <KdGame className={c} />,
  color: (c) => <KdBrush className={c} />,
  quiz: (c) => <KdSparkle className={c} />,
};

function KidsHome() {
  const { lang, dir, isArabic } = useLang();
  const [age, setAge] = useState<AgeKey>("kids");
  const [liked, setLiked] = useState(false);
  const [done, setDone] = useState<string[]>(missions.filter((m) => m.done).map((m) => m.id));

  return (
    <Screen className="kd-page">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-1 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        {/* ── Header ───────────────────────────────────────── */}
        <header className="safe-top safe-sticky-top sticky top-0 z-30 px-4 pb-3 backdrop-blur-xl">
          <div className="kd-glass relative overflow-hidden rounded-[28px] px-3.5 pt-3 pb-3.5">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-6 -end-3 kd-blob size-24 bg-kdhoney/25"
            />
            <div className="relative flex items-center gap-3">
              <Link
                to="/"
                aria-label={isArabic ? "رجوع" : "Back"}
                className="press grid size-10 shrink-0 place-items-center rounded-full border border-kdhoney/35 bg-kdpaper/80 text-kdink/75"
              >
                <KdArrow className="size-[18px] rtl:rotate-180" />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="font-manrope text-[9.5px] font-bold tracking-[0.18em] text-kdcoral uppercase">
                  {pick(L.eyebrow, lang)}
                </p>
                <h1 className="truncate font-display text-[22px] font-semibold text-kdink">
                  {pick(L.title, lang)}
                </h1>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border border-kdhoney/40 bg-kdhoney/25 px-2.5 py-1 font-manrope text-[11px] font-bold text-kdink/75">
                <KdStar className="size-3.5 text-kdhoney" />
                {isArabic ? "١٢" : "12"}
              </span>
            </div>
          </div>
        </header>

        <main className="space-y-1 px-4">
          {/* ── Hero: the storybook world ─────────────────── */}
          <section className="relative overflow-hidden rounded-[34px] border border-kdhoney/35 shadow-[0_28px_60px_-32px_color-mix(in_oklab,var(--kd-ink)_45%,transparent)]">
            <img
              src={kidsHero}
              alt={pick(L.heroTitle, lang)}
              width={1280}
              height={880}
              className="h-[300px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kdink/78 via-kdink/18 to-transparent" />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-kdpaper/85 px-2.5 py-1 font-manrope text-[10px] font-bold text-kdink/70 backdrop-blur-md">
                <KdDove className="size-3.5 text-kdsky" />
                {pick(L.safe, lang)}
              </span>
              <span className="grid size-8 place-items-center rounded-full bg-kdpaper/85 text-kdcoral backdrop-blur-md">
                <KdCross className="size-4" />
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-4">
              <h2 className="font-display text-[27px] leading-tight font-semibold text-kdpaper">
                {pick(L.heroTitle, lang)}
              </h2>
              <p className="mt-1.5 text-[12px] leading-relaxed text-kdpaper/80">
                {pick(L.heroLine, lang)}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  className="kd-pop press inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-manrope text-[12px] font-extrabold text-kdink"
                >
                  <KdPlay className="size-4" />
                  {pick(L.heroCta, lang)}
                </button>
                <span className="inline-flex items-center gap-3 rounded-full bg-kdink/35 px-3 py-2 font-manrope text-[10px] font-semibold text-kdpaper/85 backdrop-blur-md">
                  <span>٦٠ {pick(L.storiesCount, lang)}</span>
                  <span className="size-1 rounded-full bg-kdpaper/40" />
                  <span>٢٤ {pick(L.filmsCount, lang)}</span>
                </span>
              </div>
            </div>
          </section>

          {/* ── Search + ages ─────────────────────────────── */}
          <section className="pt-4">
            <div className="kd-glass flex items-center gap-2 rounded-[22px] px-3.5 py-3">
              <KdSearch className="size-[17px] shrink-0 text-kdcoral" />
              <span className="truncate text-[12px] text-kdink/40">
                {pick(L.searchPlaceholder, lang)}
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {ages.map((a) => {
                const on = age === a;
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAge(a)}
                    style={{ "--hue": ageHue[a] } as CSSProperties}
                    className={`press rounded-[22px] px-2 py-2.5 text-center transition-all ${
                      on
                        ? "kd-card scale-[1.02]"
                        : "border border-kdink/8 bg-kdpaper/55"
                    }`}
                  >
                    <span
                      className="mx-auto grid size-8 place-items-center rounded-full"
                      style={{
                        background: `color-mix(in oklab, ${ageHue[a]} ${on ? "50%" : "26%"}, transparent)`,
                      }}
                    >
                      <KdSparkle className="size-4 text-kdink/70" />
                    </span>
                    <p className="mt-1.5 font-display text-[12.5px] font-semibold text-kdink">
                      {pick(L.ages[a], lang)}
                    </p>
                    <p className="font-manrope text-[9.5px] text-kdink/45">
                      {pick(L.ageYears[a], lang)}
                    </p>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Story of the day ──────────────────────────── */}
          <SectionTitle title={pick(L.storyOfDay, lang)} caption={pick(L.seeAll, lang)} />
          <article
            className="kd-card overflow-hidden rounded-[30px] p-2.5"
            style={{ "--hue": "var(--kd-honey)" } as CSSProperties}
          >
            <div className="relative overflow-hidden rounded-[24px]">
              <img
                src={storyOfDay.image}
                alt={pick(storyOfDay.title, lang)}
                loading="lazy"
                width={1280}
                height={960}
                className="h-[176px] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-kdink/72 via-transparent to-transparent" />
              <span className="absolute top-2.5 start-2.5 rounded-full bg-kdpaper/88 px-2.5 py-1 font-manrope text-[9.5px] font-extrabold text-kdcoral backdrop-blur-md">
                {pick(storyOfDay.badge, lang)}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-3.5">
                <h3 className="font-display text-[19px] font-semibold text-kdpaper">
                  {pick(storyOfDay.title, lang)}
                </h3>
                <p className="mt-1 line-clamp-2 text-[11.5px] leading-relaxed text-kdpaper/80">
                  {pick(storyOfDay.line, lang)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-1 pt-2.5 pb-0.5">
              <button
                type="button"
                className="kd-pop press inline-flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 font-manrope text-[11.5px] font-extrabold text-kdink"
              >
                <KdPlay className="size-3.5" />
                {pick(L.listen, lang)}
              </button>
              <button
                type="button"
                className="press inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-kdink/12 bg-kdpaper/75 py-2.5 font-manrope text-[11.5px] font-bold text-kdink/70"
              >
                <KdBook className="size-3.5" />
                {pick(L.read, lang)}
              </button>
              <button
                type="button"
                onClick={() => setLiked((v) => !v)}
                aria-label={isArabic ? "إعجاب" : "Like"}
                className={`press grid size-10 shrink-0 place-items-center rounded-full border ${
                  liked
                    ? "border-kdcoral/45 bg-kdcoral/25 text-kdcoral"
                    : "border-kdink/12 bg-kdpaper/75 text-kdink/45"
                }`}
              >
                <KdHeart className="size-4" filled={liked} />
              </button>
            </div>
          </article>

          {/* ── Bible films — the cinema strip ────────────── */}
          <section className="pt-6">
            <div className="flex items-end justify-between px-1">
              <div>
                <p className="font-manrope text-[9.5px] font-bold tracking-[0.2em] text-kdcoral uppercase">
                  ⲁ · {pick(L.filmsCount, lang)} · ⲱ
                </p>
                <h2 className="mt-0.5 font-display text-[19px] font-semibold text-kdink">
                  {pick(L.filmsTitle, lang)}
                </h2>
                <p className="mt-0.5 text-[11.5px] text-kdink/45">{pick(L.filmsLine, lang)}</p>
              </div>
              <KdChevron className="mb-1 size-4 text-kdink/25 rtl:rotate-180" />
            </div>

            <div className="-mx-4 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {films.map((f) => (
                <article
                  key={f.id}
                  className="press relative w-[212px] shrink-0 snap-start overflow-hidden rounded-[28px] border border-kdhoney/30 shadow-[0_22px_46px_-26px_color-mix(in_oklab,var(--kd-ink)_50%,transparent)]"
                >
                  <img
                    src={f.image}
                    alt={pick(f.title, lang)}
                    loading="lazy"
                    width={960}
                    height={1280}
                    className="h-[286px] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-kdink/85 via-kdink/15 to-transparent" />

                  {f.flag && (
                    <span
                      className="absolute top-2.5 start-2.5 rounded-full px-2.5 py-1 font-manrope text-[9.5px] font-extrabold text-kdink backdrop-blur-md"
                      style={{ background: `color-mix(in oklab, ${f.hue} 82%, white)` }}
                    >
                      {pick(f.flag === "new" ? L.new : L.soon, lang)}
                    </span>
                  )}

                  <span className="absolute top-2.5 end-2.5 rounded-full bg-kdink/45 px-2 py-1 font-manrope text-[9.5px] font-bold text-kdpaper backdrop-blur-md">
                    {pick(f.minutes, lang)} {pick(L.minutes, lang)}
                  </span>

                  <span className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-kdpaper/90 text-kdcoral shadow-[0_14px_28px_-12px_rgba(0,0,0,0.45)]">
                    <KdPlay className="size-6 ps-0.5" />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-3.5 text-start">
                    <h3 className="font-display text-[16px] leading-snug font-semibold text-kdpaper">
                      {pick(f.title, lang)}
                    </h3>
                    <p className="mt-0.5 line-clamp-2 text-[10.5px] leading-relaxed text-kdpaper/72">
                      {pick(f.line, lang)}
                    </p>
                    <span
                      className="mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-manrope text-[10.5px] font-extrabold text-kdink"
                      style={{ background: `color-mix(in oklab, ${f.hue} 88%, white)` }}
                    >
                      <KdPlay className="size-3" />
                      {pick(L.watch, lang)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ── Verse of the day ──────────────────────────── */}
          <section
            className="kd-card relative mt-5 overflow-hidden rounded-[30px] px-4 py-5 text-center"
            style={{ "--hue": "var(--kd-sky)" } as CSSProperties}
          >
            <span aria-hidden="true" className="kd-blob absolute -start-6 -top-8 size-28 bg-kdmint/30" />
            <span aria-hidden="true" className="kd-blob absolute -end-8 -bottom-10 size-32 bg-kdhoney/25" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-kdpaper/80 px-3 py-1 font-manrope text-[9.5px] font-extrabold tracking-[0.14em] text-kdsky uppercase">
                <KdStar className="size-3" />
                {pick(L.verseTitle, lang)}
              </span>
              <p className="mt-3 font-display text-[19px] leading-[1.75] font-semibold text-kdink">
                {pick(verseOfDay.text, lang)}
              </p>
              <p className="mt-2 font-manrope text-[10.5px] font-bold text-kdink/45">
                {pick(verseOfDay.ref, lang)}
              </p>
              <span className="kd-dash mx-auto mt-3.5 block h-px w-28" />
              <button
                type="button"
                className="press mt-3.5 inline-flex items-center gap-1.5 rounded-full border border-kdsky/45 bg-kdsky/22 px-4 py-2 font-manrope text-[11.5px] font-extrabold text-kdink/80"
              >
                <KdSparkle className="size-3.5 text-kdsky" />
                {pick(L.verseCta, lang)}
              </button>
            </div>
          </section>

          {/* ── Saints for kids ──────────────────────────── */}
          <SectionTitle title={pick(L.saintsTitle, lang)} caption={pick(L.saintsLine, lang)} />
          <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {kidSaints.map((s) => (
              <article
                key={s.id}
                className="press w-[132px] shrink-0 rounded-[26px] border border-kdink/8 bg-kdpaper/70 p-2.5 text-center"
              >
                <div
                  className="kd-arch relative mx-auto h-[124px] w-full overflow-hidden border"
                  style={{ borderColor: `color-mix(in oklab, ${s.hue} 45%, transparent)` }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 50% 34%, color-mix(in oklab, ${s.hue} 45%, transparent) 0%, transparent 62%)`,
                    }}
                  />
                  <img
                    src={s.image}
                    alt={pick(s.name, lang)}
                    loading="lazy"
                    width={960}
                    height={960}
                    className="relative size-full object-cover"
                  />
                </div>
                <h3 className="mt-2 line-clamp-1 font-display text-[12.5px] font-semibold text-kdink">
                  {pick(s.name, lang)}
                </h3>
                <p className="mt-0.5 line-clamp-2 font-manrope text-[9.5px] leading-snug text-kdink/45">
                  {pick(s.line, lang)}
                </p>
              </article>
            ))}
          </div>

          {/* ── Play & learn ─────────────────────────────── */}
          <SectionTitle title={pick(L.playTitle, lang)} />
          <div className="grid grid-cols-2 gap-3">
            {playTiles.map((p, i) => (
              <button
                key={p.key}
                type="button"
                style={{ "--hue": p.hue } as CSSProperties}
                className={`kd-card press relative overflow-hidden rounded-[26px] p-3.5 text-start ${
                  i % 3 === 0 ? "row-span-1" : ""
                }`}
              >
                <span
                  aria-hidden="true"
                  className="kd-blob absolute -end-5 -top-6 size-20"
                  style={{ background: `color-mix(in oklab, ${p.hue} 34%, transparent)` }}
                />
                <span
                  className="relative grid size-10 place-items-center rounded-2xl text-kdink/75"
                  style={{ background: `color-mix(in oklab, ${p.hue} 42%, transparent)` }}
                >
                  {playIcon[p.key]("size-5")}
                </span>
                <h3 className="relative mt-2.5 font-display text-[14px] font-semibold text-kdink">
                  {pick(p.title, lang)}
                </h3>
                <p className="relative mt-0.5 font-manrope text-[10px] text-kdink/45">
                  {pick(p.line, lang)}
                </p>
              </button>
            ))}
          </div>

          {/* ── Songs ────────────────────────────────────── */}
          <SectionTitle title={pick(L.hymnsTitle, lang)} caption={pick(L.seeAll, lang)} />
          <div className="space-y-2.5">
            {hymns.map((h) => (
              <article
                key={h.id}
                className="press flex items-center gap-3 rounded-[24px] border border-kdink/8 bg-kdpaper/70 p-2.5"
              >
                <span
                  className="grid size-12 shrink-0 place-items-center rounded-[18px] text-kdink/75"
                  style={{ background: `color-mix(in oklab, ${h.hue} 40%, transparent)` }}
                >
                  <KdMusic className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-display text-[13.5px] font-semibold text-kdink">
                    {pick(h.title, lang)}
                  </h3>
                  <p className="mt-0.5 font-manrope text-[10px] text-kdink/45">
                    {pick(h.line, lang)} · {pick(h.minutes, lang)}
                  </p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-kdhoney/40 bg-kdhoney/25 text-kdink/70">
                  <KdPlay className="size-3.5 ps-0.5" />
                </span>
              </article>
            ))}
          </div>

          {/* ── Weekly challenge ─────────────────────────── */}
          <SectionTitle title={pick(L.challengeTitle, lang)} caption={pick(L.progress, lang)} />
          <section
            className="kd-card relative overflow-hidden rounded-[30px] p-4"
            style={{ "--hue": "var(--kd-mint)" } as CSSProperties}
          >
            <span aria-hidden="true" className="kd-blob absolute -end-8 -top-10 size-32 bg-kdmint/30" />
            <div className="relative flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-kdhoney/35 text-kdink/75">
                <KdTrophy className="size-6" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[15px] font-semibold text-kdink">
                  {pick(L.challengeTitle, lang)}
                </h3>
                <p className="mt-0.5 font-manrope text-[10.5px] text-kdink/50">
                  {pick(L.challengeLine, lang)}
                </p>
              </div>
              <div className="flex shrink-0 gap-0.5">
                {[0, 1, 2].map((i) => (
                  <KdStar
                    key={i}
                    className={`size-4 ${i < done.length ? "text-kdhoney" : "text-kdink/15"}`}
                  />
                ))}
              </div>
            </div>

            <ul className="relative mt-3 space-y-2">
              {missions.map((m) => {
                const on = done.includes(m.id);
                return (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setDone((d) => (on ? d.filter((x) => x !== m.id) : [...d, m.id]))
                      }
                      className="press flex w-full items-center gap-2.5 rounded-[18px] border border-kdink/8 bg-kdpaper/75 px-3 py-2.5 text-start"
                    >
                      <span
                        className={`grid size-6 shrink-0 place-items-center rounded-full border ${
                          on
                            ? "border-kdmint/50 bg-kdmint/45 text-kdink/75"
                            : "border-kdink/15 bg-kdpaper text-transparent"
                        }`}
                      >
                        <KdStar className="size-3" />
                      </span>
                      <span
                        className={`font-manrope text-[11.5px] font-semibold ${
                          on ? "text-kdink/45 line-through" : "text-kdink/80"
                        }`}
                      >
                        {pick(m.text, lang)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <p className="mt-5 flex items-center justify-center gap-1.5 font-manrope text-[10px] font-semibold text-kdink/40">
            <KdDove className="size-3.5 text-kdsky" />
            {pick(L.safe, lang)}
          </p>
        </main>

        <SloganBand className="text-kdink" />
      </div>
    </Screen>
  );
}

function SectionTitle({ title, caption }: { title: string; caption?: string }) {
  return (
    <div className="flex items-end justify-between px-1 pt-6 pb-3">
      <h2 className="font-display text-[18px] font-semibold text-kdink">{title}</h2>
      {caption ? (
        <span className="font-manrope text-[10px] font-semibold text-kdink/40">{caption}</span>
      ) : null}
    </div>
  );
}
