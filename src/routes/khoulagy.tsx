import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import { CopticCross } from "@/components/church/icons";
import { KhoulagyShell } from "@/components/khoulagy/KhoulagyShell";
import {
  BookmarkIcon,
  CenserIcon,
  ChaliceIcon,
  NoteIcon,
  SearchIcon,
} from "@/components/khoulagy/khoulagy-icons";
import { collections, khGroupCaption, khGroupLabel, khHue, rites } from "@/lib/khoulagy-data";
import { useLang } from "@/lib/i18n";
import hero from "@/assets/khoulagy-hero.jpg";
import altar from "@/assets/khoulagy-altar.jpg";

export const Route = createFileRoute("/khoulagy")({
  component: KhoulagyScreen,
  head: () => ({
    meta: [
      { title: "الخولاجي · Khoulagy Liturgy Book — Alpha Coptic" },
      {
        name: "description",
        content:
          "The Coptic Khoulagy in Alpha: the liturgies of St. Basil, St. Gregory and St. Cyril with litanies, doxologies and midnight praise in a calm bilingual reader.",
      },
      { property: "og:title", content: "الخولاجي · Khoulagy Liturgy Book — Alpha Coptic" },
      {
        property: "og:description",
        content:
          "Pray the Divine Liturgy with Alpha: sequential parts, Arabic, Coptic and English side by side, and one unified reading toolbar.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const hueVars = (g: keyof typeof khHue) =>
  ({ "--hue": khHue[g].hue, "--hue-2": khHue[g].hue2 }) as CSSProperties;

function KhoulagyScreen() {
  const { t, lang, isArabic } = useLang();
  const pick = (b: { ar: string; en: string }) => (isArabic ? b.ar : b.en);

  return (
    <KhoulagyShell
      title={t("kh.title")}
      subtitle={t("kh.subtitle")}
      backTo="/"
      action={
        <button
          type="button"
          aria-label={t("kh.search")}
          className="press grid size-10 place-items-center rounded-full border border-khgold/25 bg-sanctnight/50 text-khivory/80"
        >
          <SearchIcon className="size-[17px]" />
        </button>
      }
    >
      {/* ── Continue where the prayer stopped ─────────────── */}
      <section
        className="kh-card verse-rise relative overflow-hidden rounded-[30px]"
        style={hueVars("liturgy")}
      >
        <img
          src={hero}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sanctnight via-sanctnight/70 to-transparent" />
        <div className="relative p-5 pt-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-khgold/25 bg-sanctnight/50 px-2.5 py-1 font-manrope text-[10px] font-bold tracking-[0.14em] text-khgold uppercase">
            <CopticCross className="size-3" />
            {t("kh.continue")}
          </span>
          <h2 className="mt-3 font-display text-[25px] leading-tight font-semibold text-khivory">
            {pick(rites[0]!.name)}
          </h2>
          <p className="mt-1 font-manrope text-[11.5px] text-khivory/55">
            {t("kh.part")} ٣ · {pick({ ar: "صلاة الشكر", en: "Prayer of thanksgiving" })}
          </p>

          <div className="mt-4 flex items-center gap-2.5">
            <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-khivory/12">
              <span
                className="kh-cta absolute inset-y-0 rounded-full"
                style={{ width: "38%", [isArabic ? "right" : "left"]: 0 }}
              />
            </span>
            <span className="font-manrope text-[10.5px] font-semibold text-khgold tabular-nums">
              ٣٨٪
            </span>
          </div>

          <Link
            to="/khoulagy-read"
            search={{ rite: "basil" }}
            className="press kh-cta mt-4 flex h-12 items-center justify-center gap-2 rounded-full font-sora text-[13.5px] font-bold text-sanctnight"
          >
            <ChaliceIcon className="size-[18px]" />
            {t("kh.resume")}
          </Link>
        </div>
      </section>

      {/* ── The three liturgies ───────────────────────────── */}
      <section>
        <Head title={t("kh.rites")} caption={pick(khGroupCaption.liturgy)} />
        <div className="space-y-3">
          {rites.map((r) => (
            <Link
              key={r.id}
              to="/khoulagy-liturgy"
              search={{ rite: r.id }}
              style={hueVars("liturgy")}
              className="press kh-card flex items-center gap-3.5 rounded-[24px] p-3.5"
            >
              <span className="kh-arch grid size-[54px] shrink-0 place-items-center border border-khgold/25 bg-sanctnight/45">
                <span className="font-display text-[15px] text-khgold">{r.coptic.slice(0, 1)}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-[16.5px] font-semibold text-khivory">
                  {pick(r.name)}
                </span>
                <span className="mt-0.5 block truncate font-manrope text-[11px] text-khivory/45">
                  {pick(r.caption)}
                </span>
                <span className="mt-1.5 flex items-center gap-2 font-manrope text-[10px] text-khbrass">
                  {r.sections} {t("kh.parts")} · {r.minutes} {t("kh.min")}
                </span>
              </span>
              <span className="font-display text-[11px] tracking-widest text-khivory/25">ⲁⲱ</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Hymn collections ──────────────────────────────── */}
      <section>
        <Head title={t("kh.collections")} caption={t("kh.collections.sub")} />
        <div className="grid grid-cols-2 gap-3">
          {collections.map((c) => (
            <Link
              key={c.id}
              to="/khoulagy-read"
              search={{ rite: "basil" }}
              style={hueVars(c.group)}
              className="press kh-card rounded-[22px] p-3.5"
            >
              <span className="grid size-9 place-items-center rounded-full border border-khgold/20 bg-sanctnight/40 text-khgold">
                <CenserIcon className="size-[17px]" />
              </span>
              <span className="mt-2.5 block font-display text-[14.5px] font-semibold text-khivory">
                {pick(khGroupLabel[c.group])}
              </span>
              <span className="mt-0.5 block font-manrope text-[10.5px] text-khivory/45">
                {pick(c.count)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Quiet altar plate + saved ─────────────────────── */}
      <section className="kh-card overflow-hidden rounded-[28px]" style={hueVars("khetam")}>
        <img
          src={altar}
          alt={pick({
            ar: "مذبح قبطي بإضاءة هادئة وشموع وكتاب الخولاجي",
            en: "A Coptic altar in quiet light with candles and the Khoulagy book",
          })}
          loading="lazy"
          className="h-40 w-full object-cover opacity-85"
        />
        <div className="space-y-2 p-4">
          <p className="font-display text-[15px] text-khivory">{t("kh.saved")}</p>
          <div className="flex gap-2">
            <Pill icon={<BookmarkIcon className="size-[15px]" />} label={t("kh.saved.marks")} />
            <Pill icon={<NoteIcon className="size-[15px]" />} label={t("kh.saved.hymns")} />
          </div>
        </div>
      </section>
    </KhoulagyShell>
  );
}

function Head({ title, caption }: { title: string; caption: string }) {
  return (
    <div className="mb-3 px-1">
      <h2 className="font-display text-[18.5px] font-semibold text-khivory">{title}</h2>
      <p className="mt-0.5 font-manrope text-[11px] text-khivory/40">{caption}</p>
    </div>
  );
}

function Pill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="press flex flex-1 items-center justify-center gap-1.5 rounded-full border border-khgold/22 bg-sanctnight/45 py-2 font-manrope text-[11px] font-semibold text-khivory/75">
      <span className="text-khgold">{icon}</span>
      {label}
    </span>
  );
}
