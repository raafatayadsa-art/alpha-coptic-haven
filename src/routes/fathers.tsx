import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type CSSProperties } from "react";

import fathersHero from "@/assets/fathers-hero.jpg";
import {
  FaArrow,
  FaBook,
  FaBookmark,
  FaChevron,
  FaCross,
  FaHeart,
  FaLamp,
  FaQuoteMark,
  FaScroll,
  FaSearch,
  FaShare,
} from "@/components/fathers/fathers-icons";
import { Screen } from "@/components/layout/Screen";
import { SloganBand } from "@/components/layout/SloganBand";
import { useLang } from "@/lib/i18n";
import {
  L,
  eraHue,
  eraLabel,
  eras,
  fatherOfDay,
  fathers,
  libraryItems,
  pick,
  sayings,
  shelfLabel,
  shelves,
  topics,
  type EraKey,
  type Father,
  type ShelfKey,
} from "@/lib/fathers-data";

export const Route = createFileRoute("/fathers")({
  head: () => ({
    meta: [
      { title: "قسم الآباء — مكتبة آبائية قبطية | Alpha" },
      {
        name: "description",
        content:
          "Alpha's patristic library: father of the day, sayings of the Desert Fathers, writings, homilies and commentaries — search by father or by spiritual topic.",
      },
      { property: "og:title", content: "قسم الآباء — مكتبة آبائية قبطية | Alpha" },
      {
        property: "og:description",
        content: "Discover the Coptic Fathers, their sayings and their writings inside Alpha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FathersHome,
});

function FathersHome() {
  const { lang, dir, isArabic } = useLang();
  const [era, setEra] = useState<EraKey>("all");
  const [shelf, setShelf] = useState<ShelfKey>("writings");
  const [mode, setMode] = useState<"father" | "topic">("father");
  const [liked, setLiked] = useState(false);
  const [openSaying, setOpenSaying] = useState<string | null>(null);

  const list = useMemo(
    () => (era === "all" ? fathers : fathers.filter((f) => f.era === era)),
    [era],
  );
  const items = libraryItems.filter((i) => i.shelf === shelf);
  const dayHue = eraHue[fatherOfDay.father.era];

  return (
    <Screen className="fa-page">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-1 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        {/* ── Header ───────────────────────────────────────── */}
        <header className="safe-top safe-sticky-top sticky top-0 z-30 px-4 pb-3 backdrop-blur-xl">
          <div className="fa-glass relative overflow-hidden rounded-[26px] px-4 pt-3.5 pb-4">
            <div className="fa-hairline absolute inset-x-6 top-0 h-px opacity-60" />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-5 -end-2 font-display text-[68px] leading-none text-facopper/[0.09] select-none"
            >
              ⲁ
            </span>
            <div className="flex items-center gap-3">
              <Link
                to="/"
                aria-label={isArabic ? "رجوع" : "Back"}
                className="press grid size-10 shrink-0 place-items-center rounded-full border border-facopper/25 bg-fanight/50 text-fapapyrus/85"
              >
                <FaArrow className="size-[18px] rtl:rotate-180" />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="font-manrope text-[10px] font-bold tracking-[0.16em] text-facopper uppercase">
                  {pick(L.eyebrow, lang)}
                </p>
                <h1 className="truncate font-display text-[21px] font-semibold text-fapapyrus">
                  {pick(L.title, lang)}
                </h1>
              </div>
              <FaCross className="size-4 shrink-0 text-fagold/70" />
            </div>
          </div>
        </header>

        <main className="space-y-1 px-4">
          {/* ── Hero ─────────────────────────────────────── */}
          <section className="relative overflow-hidden rounded-[30px] border border-facopper/25">
            <img
              src={fathersHero}
              alt={pick(L.heroTitle, lang)}
              width={1280}
              height={864}
              className="h-[248px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fanight via-fanight/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-manrope text-[9.5px] font-bold tracking-[0.22em] text-fagold/85 uppercase">
                ⲁ · {pick(L.eyebrow, lang)} · ⲱ
              </p>
              <h2 className="mt-1.5 fa-gilt font-display text-[25px] leading-tight font-semibold">
                {pick(L.heroTitle, lang)}
              </h2>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-fapapyrus/65">
                {pick(L.heroLine, lang)}
              </p>

              <div className="mt-3 grid grid-cols-3 overflow-hidden rounded-[18px] border border-facopper/20 bg-fanight/45 backdrop-blur-md">
                {[
                  { n: "٤٨", en: "48", l: L.fathers },
                  { n: "١٢٤٠", en: "1,240", l: L.sayings },
                  { n: "٨٦", en: "86", l: L.books },
                ].map((s, i) => (
                  <div
                    key={s.en}
                    className={`px-2 py-2 text-center ${i < 2 ? "border-e border-facopper/15" : ""}`}
                  >
                    <p className="font-display text-[16px] font-semibold text-fagold">
                      {isArabic ? s.n : s.en}
                    </p>
                    <p className="font-manrope text-[9px] text-fapapyrus/50">{pick(s.l, lang)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Search (by father / by topic) ────────────── */}
          <section className="pt-5">
            <div className="fa-glass rounded-[24px] p-2.5">
              <div className="flex items-center gap-2 rounded-[18px] border border-facopper/20 bg-fanight/45 px-3 py-2.5">
                <FaSearch className="size-[17px] shrink-0 text-facopper" />
                <span className="truncate text-[12px] text-fapapyrus/45">
                  {pick(L.searchPlaceholder, lang)}
                </span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(["father", "topic"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`press rounded-[15px] px-3 py-2 font-manrope text-[11px] font-semibold transition-colors ${
                      mode === m
                        ? "border border-fagold/40 bg-facopper/20 text-fagold"
                        : "border border-facopper/15 bg-fanight/35 text-fapapyrus/55"
                    }`}
                  >
                    {pick(m === "father" ? L.searchFather : L.searchTopic, lang)}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── Father of the day ────────────────────────── */}
          <SectionTitle title={pick(L.fatherOfDay, lang)} caption={pick(fatherOfDay.feast, lang)} />
          <article
            className="fa-card overflow-hidden rounded-[28px] p-3"
            style={{ "--hue": dayHue.hue, "--hue-2": dayHue.hue2 } as CSSProperties}
          >
            <div className="flex items-stretch gap-3.5">
              <div className="relative w-[104px] shrink-0">
                <div className="fa-arch relative h-full min-h-[140px] overflow-hidden border border-fagold/30 bg-fanight/70">
                  <img
                    src={fatherOfDay.father.image}
                    alt={pick(fatherOfDay.father.name, lang)}
                    loading="lazy"
                    width={912}
                    height={1104}
                    className="size-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fanight/70 via-transparent to-transparent" />
                </div>
                <span className="absolute -top-1 left-1/2 h-3 w-px -translate-x-1/2 bg-fagold/50" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col py-0.5">
                <span className="w-fit rounded-full border border-fagold/30 bg-facopper/15 px-2 py-[3px] font-manrope text-[9.5px] font-bold text-fagold">
                  {pick(eraLabel[fatherOfDay.father.era], lang)}
                </span>
                <h3 className="mt-1.5 font-display text-[16px] leading-snug font-semibold text-fapapyrus">
                  {pick(fatherOfDay.father.name, lang)}
                </h3>
                <p className="mt-0.5 font-manrope text-[10px] text-fagold/80">
                  {pick(fatherOfDay.father.epithet, lang)} · {pick(fatherOfDay.father.years, lang)}
                </p>
                <p className="mt-1.5 line-clamp-3 text-[11.5px] leading-relaxed text-fapapyrus/55">
                  {pick(fatherOfDay.father.excerpt, lang)}
                </p>
                <div className="mt-auto flex items-center gap-2 pt-2.5">
                  <button
                    type="button"
                    onClick={() => setLiked((v) => !v)}
                    className={`press inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-manrope text-[10.5px] font-semibold ${
                      liked
                        ? "border-fagold/45 bg-facopper/25 text-fagold"
                        : "border-facopper/20 bg-fanight/40 text-fapapyrus/70"
                    }`}
                  >
                    <FaHeart className="size-3.5" filled={liked} />
                    {pick(L.like, lang)}
                  </button>
                  <button
                    type="button"
                    className="press inline-flex items-center gap-1.5 rounded-full border border-facopper/20 bg-fanight/40 px-3 py-1.5 font-manrope text-[10.5px] font-semibold text-fapapyrus/70"
                  >
                    <FaShare className="size-3.5" />
                    {pick(L.share, lang)}
                  </button>
                </div>
              </div>
            </div>

            {/* his saying, on papyrus */}
            <div className="fa-quote relative mt-3 overflow-hidden rounded-[22px] px-4 py-3.5">
              <FaQuoteMark className="absolute -top-1 end-3 size-7 text-faclay/15" />
              <p className="relative font-display text-[15px] leading-[1.7] font-medium text-faumber">
                {pick(fatherOfDay.saying.text, lang)}
              </p>
              <p className="mt-2 font-manrope text-[10px] font-bold tracking-wide text-faclay/70">
                — {pick(fatherOfDay.saying.author, lang)}
              </p>
            </div>
          </article>

          {/* ── Explore the fathers ──────────────────────── */}
          <SectionTitle title={pick(L.explore, lang)} caption={`${list.length} ${pick(L.entries, lang)}`} />
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {eras.map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setEra(e)}
                className={`press shrink-0 rounded-full px-3.5 py-1.5 font-manrope text-[11px] font-semibold whitespace-nowrap transition-colors ${
                  era === e
                    ? "border border-fagold/40 bg-facopper/22 text-fagold"
                    : "border border-facopper/15 bg-faumber/40 text-fapapyrus/55"
                }`}
              >
                {pick(eraLabel[e], lang)}
              </button>
            ))}
          </div>

          <div className="-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {list.map((f) => (
              <FatherPanel key={f.id} father={f} />
            ))}
          </div>

          {/* ── Sayings of the fathers ───────────────────── */}
          <SectionTitle title={pick(L.sayingsTitle, lang)} caption={pick(L.viewAll, lang)} />
          <div className="space-y-2.5">
            {sayings.map((s) => {
              const open = openSaying === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setOpenSaying(open ? null : s.id)}
                  className="fa-card press block w-full rounded-[24px] p-3.5 text-start"
                  style={{ "--hue": s.hue, "--hue-2": "oklch(0.862 0.088 88)" } as CSSProperties}
                >
                  <div className="flex items-start gap-3">
                    <span className="fa-arch relative grid size-9 shrink-0 place-items-center border border-fagold/25 bg-fanight/60">
                      <span className="fa-halo absolute inset-0 opacity-35" />
                      <FaQuoteMark className="relative size-3.5 text-fagold" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[14.5px] leading-[1.75] font-medium text-fapapyrus/90">
                        {pick(s.text, lang)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="font-manrope text-[10px] font-semibold text-fagold">
                          {pick(s.author, lang)}
                        </span>
                        <span className="size-1 rounded-full bg-fapapyrus/20" />
                        <span className="font-manrope text-[10px] text-fapapyrus/45">
                          {pick(s.topic, lang)}
                        </span>
                        <FaChevron
                          className={`ms-auto size-3.5 text-fapapyrus/30 transition-transform rtl:rotate-180 ${
                            open ? "rotate-90 rtl:rotate-90" : ""
                          }`}
                        />
                      </div>

                      {open && (
                        <div className="mt-3 flex items-center gap-2 border-t border-facopper/15 pt-3">
                          {[
                            { icon: <FaHeart className="size-3.5" />, l: L.like },
                            { icon: <FaBookmark className="size-3.5" />, l: L.save },
                            { icon: <FaShare className="size-3.5" />, l: L.share },
                          ].map((a) => (
                            <span
                              key={a.l.en}
                              className="inline-flex items-center gap-1.5 rounded-full border border-facopper/20 bg-fanight/40 px-3 py-1.5 font-manrope text-[10px] font-semibold text-fapapyrus/70"
                            >
                              {a.icon}
                              {pick(a.l, lang)}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── Spiritual topics ─────────────────────────── */}
          <SectionTitle title={pick(L.topics, lang)} />
          <div className="grid grid-cols-2 gap-2.5">
            {topics.map((tp) => (
              <button
                key={tp.id}
                type="button"
                className="press fa-card relative overflow-hidden rounded-[22px] px-3.5 py-3 text-start"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-3 -end-1 font-display text-[52px] leading-none text-fagold/[0.10] select-none"
                >
                  {tp.glyph}
                </span>
                <p className="font-display text-[14px] font-semibold text-fapapyrus">
                  {pick(tp.label, lang)}
                </p>
                <p className="mt-1 font-manrope text-[9.5px] text-facopper">
                  {tp.count} {pick(L.entries, lang)}
                </p>
              </button>
            ))}
          </div>

          {/* ── The patristic library ────────────────────── */}
          <SectionTitle title={pick(L.library, lang)} />
          <div className="fa-glass rounded-[24px] p-2">
            <div className="flex gap-1.5">
              {shelves.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setShelf(s)}
                  className={`press flex-1 rounded-[16px] px-2 py-2 font-manrope text-[10px] font-semibold leading-tight transition-colors ${
                    shelf === s
                      ? "border border-fagold/40 bg-facopper/22 text-fagold"
                      : "border border-transparent text-fapapyrus/50"
                  }`}
                >
                  {pick(shelfLabel[s], lang)}
                </button>
              ))}
            </div>

            <div className="mt-2 space-y-2">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="press flex items-center gap-3 rounded-[18px] border border-facopper/15 bg-fanight/40 p-2.5"
                >
                  <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-[13px] border border-fagold/25 bg-faumber/70 text-fagold">
                    {shelf === "writings" ? (
                      <FaBook className="size-[18px]" />
                    ) : shelf === "homilies" ? (
                      <FaScroll className="size-[18px]" />
                    ) : (
                      <FaLamp className="size-[18px]" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-[13.5px] font-semibold text-fapapyrus">
                      {pick(it.title, lang)}
                    </p>
                    <p className="mt-0.5 truncate font-manrope text-[10px] text-fapapyrus/45">
                      {pick(it.author, lang)}
                    </p>
                    <div className="mt-1 flex items-center gap-2 font-manrope text-[9.5px] text-facopper/80">
                      <span>{pick(it.meta, lang)}</span>
                      <span className="size-1 rounded-full bg-fapapyrus/20" />
                      <span>
                        {it.minutes} {pick(L.minutes, lang)}
                      </span>
                    </div>
                  </div>
                  <FaChevron className="size-4 shrink-0 text-fapapyrus/25 rtl:rotate-180" />
                </div>
              ))}
            </div>
          </div>

          {/* ── Closing gesture ─────────────────────────── */}
          <div className="mt-7 text-center">
            <span className="fa-hairline mx-auto mb-3 block h-px w-24 opacity-50" />
            <p className="font-display text-[13px] tracking-[0.2em] text-fagold/60">
              ⲁ ⲱ ⲛⲓⲟϯ ⲉⲑⲟⲩⲁⲃ ⲁ ⲱ
            </p>
          </div>

          <SloganBand className="text-fapapyrus" />
        </main>
      </div>
    </Screen>
  );
}

function SectionTitle({ title, caption }: { title: string; caption?: string }) {
  return (
    <div className="mt-7 mb-3 flex items-center gap-3 px-1">
      <span className="size-1.5 rounded-full bg-fagold" />
      <h2 className="font-display text-[16px] font-semibold tracking-tight text-fapapyrus">{title}</h2>
      <span className="fa-hairline h-px flex-1 opacity-40" />
      {caption ? (
        <span className="shrink-0 font-manrope text-[10px] font-semibold text-facopper/85">{caption}</span>
      ) : null}
    </div>
  );
}

/** Arched icon panel — the gallery way of discovering a father. */
function FatherPanel({ father }: { father: Father }) {
  const { lang } = useLang();
  const hue = eraHue[father.era];

  return (
    <article
      className="press fa-card w-[158px] shrink-0 overflow-hidden rounded-[24px] p-2.5"
      style={{ "--hue": hue.hue, "--hue-2": hue.hue2 } as CSSProperties}
    >
      <div className="fa-arch relative h-[152px] overflow-hidden border border-fagold/25 bg-fanight/70">
        {father.image ? (
          <img
            src={father.image}
            alt={pick(father.name, lang)}
            loading="lazy"
            width={912}
            height={1104}
            className="size-full object-cover"
          />
        ) : (
          <div className="grid size-full place-items-center">
            <span className="fa-halo absolute inset-0 opacity-45" />
            <span className="relative font-display text-[42px] leading-none text-fagold/80">
              {father.monogram}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-fanight/80 via-transparent to-transparent" />
        <span className="absolute bottom-2 start-2 rounded-full bg-fanight/60 px-2 py-0.5 font-manrope text-[9px] font-semibold text-fagold backdrop-blur-md">
          {pick(eraLabel[father.era], lang)}
        </span>
      </div>

      <h3 className="mt-2.5 line-clamp-2 px-0.5 font-display text-[13px] leading-snug font-semibold text-fapapyrus">
        {pick(father.name, lang)}
      </h3>
      <p className="mt-1 px-0.5 font-manrope text-[9.5px] text-fapapyrus/45">
        {pick(father.years, lang)}
      </p>
      <div className="mt-2 flex items-center justify-between border-t border-facopper/15 px-0.5 pt-2 font-manrope text-[9.5px] text-facopper/85">
        <span>
          {father.works} {pick(L.books, lang)}
        </span>
        <span className="inline-flex items-center gap-1">
          {pick(L.readLife, lang)}
          <FaChevron className="size-3 rtl:rotate-180" />
        </span>
      </div>
    </article>
  );
}
