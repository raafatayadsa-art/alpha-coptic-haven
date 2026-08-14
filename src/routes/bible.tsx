import { Link, createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

import bibleHero from "@/assets/bible-hero.jpg";
import {
  ArrowIcon,
  AudioIcon,
  CodexIcon,
  HighlightIcon,
  HistoryIcon,
  NoteIcon,
  PathIcon,
  ScrollIcon,
  SearchGlyph,
  StarIcon,
  StatsIcon,
} from "@/components/bible/bible-icons";
import { ProgressRing } from "@/components/bible/ProgressRing";
import { CopticCross } from "@/components/church/icons";
import { Screen } from "@/components/layout/Screen";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/bible")({
  head: () => ({
    meta: [
      { title: "الكتاب المقدس — العهد القديم والجديد | Alpha" },
      {
        name: "description",
        content:
          "The Alpha Bible: Old and New Testament, reading progress and journey, notes, favourites, highlighted verses, history and search — in one calm, premium screen.",
      },
      { property: "og:title", content: "الكتاب المقدس — العهد القديم والجديد | Alpha" },
      {
        property: "og:description",
        content: "Read, mark and follow your Bible journey inside Alpha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibleHome,
});

type ToolTo =
  | "/bible-notes"
  | "/bible-saved"
  | "/bible-history"
  | "/bible-highlights"
  | "/bible-journey"
  | "/bible-stats";

type Tool = { key: string; icon: ReactNode; to: ToolTo };

const tools: Tool[] = [
  { key: "bib.tool.notes", icon: <NoteIcon className="size-[19px]" />, to: "/bible-notes" },
  { key: "bib.tool.favorites", icon: <StarIcon className="size-[19px]" />, to: "/bible-saved" },
  { key: "bib.tool.history", icon: <HistoryIcon className="size-[19px]" />, to: "/bible-history" },
  { key: "bib.tool.highlights", icon: <HighlightIcon className="size-[19px]" />, to: "/bible-highlights" },
  { key: "bib.tool.journey", icon: <PathIcon className="size-[19px]" />, to: "/bible-journey" },
  { key: "bib.tool.stats", icon: <StatsIcon className="size-[19px]" />, to: "/bible-stats" },
];


function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <div className="mb-3 flex items-center gap-3 px-1">
      <span className="size-1.5 rounded-full bg-copper" />
      <h2 className="font-display text-[17px] font-semibold tracking-tight text-inkblue">{title}</h2>
      <span className="gold-hairline h-px flex-1 opacity-40" />
      {action ? (
        <span className="font-manrope text-[10.5px] font-semibold text-copper">{action}</span>
      ) : null}
    </div>
  );
}

function TestamentCard({
  to,
  eyebrow,
  title,
  meta,
  icon,
  tone,
}: {
  to: "/bible-books";
  eyebrow: string;
  title: string;
  meta: string;
  icon: ReactNode;
  tone: "old" | "new";
}) {
  const isOld = tone === "old";

  return (
    <Link
      to={to}
      search={{ t: tone }}
      className={`press relative isolate flex flex-col justify-between overflow-hidden rounded-[26px] p-4 ${
        isOld ? "ink-card text-vellum" : "vellum-card text-inkblue"
      }`}
      style={{ minHeight: 152 }}
    >
      <span
        aria-hidden="true"
        className={`illum-halo pointer-events-none absolute -end-8 -top-10 -z-10 size-36 rounded-full ${
          isOld ? "opacity-70" : "opacity-40"
        }`}
      />
      <span
        className={`grid size-10 place-items-center rounded-2xl ring-1 ${
          isOld ? "bg-vellum/10 text-illum ring-illum/30" : "bg-inkblue/[0.05] text-copper ring-illum/35"
        }`}
      >
        {icon}
      </span>
      <span className="mt-4 block">
        <span
          className={`block font-manrope text-[9.5px] font-semibold tracking-[0.18em] uppercase ${
            isOld ? "text-illum/80" : "text-copper/80"
          }`}
        >
          {eyebrow}
        </span>
        <span className="mt-1 block font-display text-[21px] leading-tight font-semibold">{title}</span>
        <span className={`mt-1 block font-manrope text-[11px] ${isOld ? "text-vellum/55" : "text-quiet"}`}>
          {meta}
        </span>
      </span>
    </Link>
  );
}

function BibleHome() {
  const { t, dir, isArabic } = useLang();

  return (
    <Screen className="scriptorium">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-10 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        {/* ── Hero: illuminated manuscript, title sits high ── */}
        <header className="relative">
          <div className="absolute inset-x-0 top-0 h-[330px] overflow-hidden rounded-b-[38px]">
            <img
              src={bibleHero}
              alt={t("bib.heroAlt")}
              width={1200}
              height={912}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-inkblue/70 via-inkblue/55 to-vellum" />
          </div>

          <div className="safe-top relative flex items-center justify-between gap-3 px-5 pb-2">
            <Link
              to="/bible-search"
              aria-label={t("bib.search")}
              className="press grid size-11 place-items-center rounded-2xl border border-illum/25 bg-inkblue/35 text-vellum/85 backdrop-blur-md"
            >
              <SearchGlyph className="size-[18px]" />
            </Link>
            <Link
              to="/bible-saved"
              aria-label={t("bib.sv.title")}
              className="press grid size-11 place-items-center rounded-2xl border border-illum/25 bg-inkblue/35 text-vellum/85 backdrop-blur-md"
            >
              <StarIcon className="size-[18px]" />
            </Link>
          </div>


          <div className="relative px-5 pt-6 pb-5 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-illum/30 bg-inkblue/30 px-3 py-1 font-manrope text-[10px] font-semibold tracking-[0.16em] text-illum uppercase backdrop-blur-md">
              <CopticCross className="size-3" />
              Alpha
            </span>
            <h1 className="mt-3 font-display text-[38px] leading-none font-semibold tracking-tight text-vellum">
              {t("bib.title")}
            </h1>
            <p className="mt-2 font-manrope text-[12.5px] text-vellum/70">{t("bib.subtitle")}</p>
          </div>
        </header>

        <main className="relative space-y-6 px-4 pt-1">
          {/* ── Continue reading ── */}
          <section className="ink-card relative isolate overflow-hidden rounded-[30px] p-5 text-vellum">
            <span
              aria-hidden="true"
              className="illum-halo pointer-events-none absolute -end-10 -top-14 -z-10 size-52 rounded-full opacity-70"
            />
            <div className="flex items-start gap-4">
              <div className="min-w-0 flex-1">
                <span className="font-manrope text-[9.5px] font-semibold tracking-[0.18em] text-illum/85 uppercase">
                  {t("bib.continue")}
                </span>
                <h2 className="mt-2 font-display text-[26px] leading-tight font-semibold">
                  {t("bib.continue.ref")}
                </h2>
                <p className="mt-1.5 line-clamp-2 font-manrope text-[12px] leading-relaxed text-vellum/60">
                  {t("bib.continue.line")}
                </p>
              </div>
              <div className="rounded-full bg-vellum/95 p-1.5">
                <ProgressRing value={38} size={78} label="38%" caption={t("bib.progress")} />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {([
                ["bib.stat.streak", "bib.stat.streakV"],
                ["bib.stat.chapters", "bib.stat.chaptersV"],
                ["bib.stat.minutes", "bib.stat.minutesV"],
              ] as const).map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-illum/18 bg-vellum/[0.06] px-2.5 py-2 text-center">
                  <span className="block font-display text-[16px] font-semibold text-illum">{t(value)}</span>
                  <span className="mt-0.5 block font-manrope text-[9px] tracking-[0.1em] text-vellum/50 uppercase">
                    {t(label)}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/bible-read"
              className="press gold-cta mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 font-display text-[14.5px] font-semibold text-inkblue"
            >
              {t("bib.continue.cta")}
              <ArrowIcon className="size-4 rtl:rotate-180" />
            </Link>
          </section>

          {/* ── Search field ── */}
          <Link
            to="/bible-search"
            className="press vellum-card flex items-center gap-2.5 rounded-[22px] px-4 py-3"
          >
            <SearchGlyph className="size-[17px] shrink-0 text-quiet" />
            <span className="font-manrope text-[12.5px] text-quiet">{t("bib.search.hint")}</span>
          </Link>


          {/* ── Testaments ── */}
          <section>
            <SectionTitle title={t("bib.testaments")} />
            <div className="grid grid-cols-2 gap-3">
              <TestamentCard
                to="/bible-books"
                tone="old"
                eyebrow={t("bib.ot.eyebrow")}
                title={t("bib.ot")}
                meta={t("bib.ot.meta")}
                icon={<ScrollIcon className="size-5" />}
              />
              <TestamentCard
                to="/bible-books"
                tone="new"
                eyebrow={t("bib.nt.eyebrow")}
                title={t("bib.nt")}
                meta={t("bib.nt.meta")}
                icon={<CodexIcon className="size-5" />}
              />
            </div>
          </section>

          {/* ── Reading journey ── */}
          <section>
            <SectionTitle title={t("bib.journey")} action={t("app.details")} />
            <div className="vellum-card rounded-[26px] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-[16px] font-semibold text-inkblue">
                    {t("bib.journey.plan")}
                  </p>
                  <p className="mt-1 font-manrope text-[11px] text-quiet">{t("bib.journey.meta")}</p>
                </div>
                <span className="rounded-full bg-copper/10 px-2.5 py-1 font-manrope text-[10px] font-semibold text-copper">
                  {t("bib.journey.day")}
                </span>
              </div>

              <div className="mt-3.5 flex items-center gap-1">
                {Array.from({ length: 14 }, (_, i) => (
                  <span
                    key={i}
                    className={`h-7 flex-1 rounded-[6px] ${
                      i < 8
                        ? "bg-gradient-to-b from-copper to-illum"
                        : i === 8
                          ? "bg-illum/45 ring-1 ring-copper/40"
                          : "bg-inkblue/[0.07]"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between font-manrope text-[10px] text-quiet">
                <span>{t("bib.journey.from")}</span>
                <span>{t("bib.journey.to")}</span>
              </div>
            </div>
          </section>

          {/* ── Quick tools ── */}
          <section>
            <SectionTitle title={t("bib.tools")} />
            <div className="grid grid-cols-3 gap-2.5">
              {tools.map((tool) => (
                <Link
                  key={tool.key}
                  to={tool.to}
                  className="press vellum-card flex flex-col items-center gap-2 rounded-[22px] px-2 py-3.5"
                >
                  <span className="grid size-10 place-items-center rounded-2xl bg-inkblue/[0.05] text-copper ring-1 ring-illum/30">
                    {tool.icon}
                  </span>
                  <span className="text-center text-[11px] leading-tight font-semibold text-inkblue">
                    {t(tool.key)}
                  </span>
                </Link>
              ))}

            </div>
          </section>

          {/* ── Listen ── */}
          <section className="vellum-card flex items-center gap-3.5 rounded-[26px] p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-inkblue text-illum">
              <AudioIcon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[15.5px] font-semibold text-inkblue">
                {t("bib.audio")}
              </span>
              <span className="mt-0.5 block font-manrope text-[11px] text-quiet">
                {t("bib.audio.meta")}
              </span>
            </span>
            <ArrowIcon className="size-4 text-quiet/50 rtl:rotate-180" />
          </section>

          <footer className="flex flex-col items-center gap-2.5 pt-2 text-center">
            <CopticCross className="size-5 text-copper/60" />
            <p className="font-manrope text-[12px] text-quiet">{t("bib.footer")}</p>
          </footer>
        </main>
      </div>
    </Screen>
  );
}
