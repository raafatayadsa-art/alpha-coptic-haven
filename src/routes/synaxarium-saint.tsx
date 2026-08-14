import { createFileRoute } from "@tanstack/react-router";
import { useState, type CSSProperties } from "react";

import { CopticCross } from "@/components/church/icons";
import { SynaxSectionTitle, SynaxShell } from "@/components/synaxarium/SynaxShell";
import {
  BookmarkGlyph,
  CalendarGlyph,
  HeartGlyph,
  PalmIcon,
  ScrollIcon,
  ShareGlyph,
} from "@/components/synaxarium/synax-icons";
import { useLang } from "@/lib/i18n";
import { L, categoryHue, categoryLabel, pick, saintOfDay } from "@/lib/synaxarium-data";
import { SloganBand } from "@/components/layout/SloganBand";

export const Route = createFileRoute("/synaxarium-saint")({
  head: () => ({
    meta: [
      { title: "سيرة قدّيس — السنكسار | Alpha" },
      {
        name: "description",
        content: "A saint's life from the Coptic Synaxarium: icon, commemoration, milestones, virtues and the full account.",
      },
      { property: "og:title", content: "سيرة قدّيس — السنكسار | Alpha" },
      { property: "og:description", content: "Read a saint's life from the Coptic Synaxarium in Alpha." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SaintLife,
});

function SaintLife() {
  const { lang } = useLang();
  const s = saintOfDay;
  const hue = categoryHue[s.category];
  const [liked, setLiked] = useState(false);


  const meta = [
    { icon: <ScrollIcon className="size-[17px]" />, label: L.kind, value: categoryLabel[s.category] },
    { icon: <CalendarGlyph className="size-[17px]" />, label: L.feast, value: s.copticDate },
    { icon: <PalmIcon className="size-[17px]" />, label: L.era, value: s.era },
    { icon: <CopticCross className="size-[17px]" />, label: L.place, value: s.place },
  ];

  return (
    <SynaxShell
      backTo="/synaxarium-day"
      eyebrow={pick(L.title, lang)}
      title={pick(L.life, lang)}
      subtitle={pick(s.copticDate, lang)}
      action={
        <button
          type="button"
          aria-label={pick(L.save, lang)}
          className="press grid size-10 place-items-center rounded-full border border-icongold/25 bg-synaxnight/50 text-ivory/80"
        >
          <BookmarkGlyph className="size-[17px]" />
        </button>
      }
    >
      {/* ── Icon panel ───────────────────────────────── */}
      <section
        className="sx-card relative mt-1 overflow-hidden rounded-[32px] p-3.5"
        style={{ "--hue": hue.hue, "--hue-2": hue.hue2 } as CSSProperties}
      >
        <span aria-hidden="true" className="pointer-events-none absolute top-2 start-3 font-display text-[46px] leading-none text-iconleaf/[0.08]">
          ⲁ
        </span>
        <span aria-hidden="true" className="pointer-events-none absolute top-2 end-3 font-display text-[46px] leading-none text-iconleaf/[0.08]">
          ⲱ
        </span>

        <div className="relative flex justify-center pt-3">
          <div className="sx-halo absolute -top-3 size-[210px] opacity-55" />
          <div className="sx-arch relative w-[192px] overflow-hidden border border-icongold/35 shadow-[0_28px_54px_-24px_rgba(0,0,0,0.9)]">
            <img
              src={s.image}
              alt={pick(s.name, lang)}
              loading="lazy"
              width={912}
              height={1104}
              className="h-[240px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-synaxnight/78 via-transparent to-transparent" />
          </div>
        </div>

        <div className="relative mt-4 text-center">
          <h2 className="font-display text-[20px] leading-snug font-bold text-ivory">{pick(s.name, lang)}</h2>
          <p className="mt-1 font-manrope text-[11px] font-semibold tracking-wide text-icongold">
            {pick(s.title, lang)}
          </p>
          <div className="mt-3 flex items-center justify-center gap-2.5">
            <span className="sx-hairline h-px w-10 opacity-60" />
            <span className="font-manrope text-[10.5px] text-ivory/50">
              {s.minutes} {pick(L.minutes, lang)}
            </span>
            <span className="sx-hairline h-px w-10 opacity-60" />
          </div>
        </div>

        <div className="relative mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
            className={`press flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl font-display text-[13px] font-bold transition-colors ${
              liked
                ? "sx-cta text-synaxnight"
                : "border border-icongold/35 bg-synaxnight/55 text-ivory/85"
            }`}
          >
            <HeartGlyph className="size-[18px]" filled={liked} />
            {pick(liked ? L.liked : L.like, lang)}
            <span className="font-manrope text-[11.5px] opacity-70">{214 + (liked ? 1 : 0)}</span>
          </button>
          <button
            type="button"
            aria-label={pick(L.publish, lang)}
            className="press grid size-11 place-items-center rounded-2xl border border-icongold/25 bg-synaxnight/55 text-ivory/80"
          >
            <ShareGlyph className="size-[18px]" />
          </button>
        </div>
      </section>

      {/* ── Meta grid ────────────────────────────────── */}
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {meta.map((m) => (
          <div key={m.label.en} className="sx-glass rounded-[22px] px-3.5 py-3">
            <div className="flex items-center gap-2 text-icongold">
              {m.icon}
              <span className="font-manrope text-[9.5px] font-bold tracking-[0.14em] uppercase">
                {pick(m.label, lang)}
              </span>
            </div>
            <p className="mt-1.5 font-display text-[13.5px] font-semibold text-ivory">{pick(m.value, lang)}</p>
          </div>
        ))}
      </div>

      {/* ── Quote ────────────────────────────────────── */}
      {s.quote ? (
        <div className="sx-glass relative mt-3 overflow-hidden rounded-[24px] px-5 py-5 text-center">
          <span aria-hidden="true" className="absolute top-2 start-3 font-display text-[34px] leading-none text-icongold/25">
            “
          </span>
          <p className="font-display text-[14px] leading-relaxed text-iconleaf/90">{pick(s.quote, lang)}</p>
          <span aria-hidden="true" className="absolute bottom-1 end-3 font-display text-[34px] leading-none text-icongold/25">
            ”
          </span>
        </div>
      ) : null}

      {/* ── The life ─────────────────────────────────── */}
      <SynaxSectionTitle title={pick(L.life, lang)} caption={pick(s.copticDate, lang)} />
      <article className="sx-card rounded-[26px] px-4 py-5" style={{ "--hue": hue.hue, "--hue-2": hue.hue2 } as CSSProperties}>
        {s.life.map((p, i) => (
          <p key={i} className={`text-[14px] leading-[2] text-ivory/78 ${i === 0 ? "" : "mt-3.5"}`}>
            {i === 0 && lang === "en" ? (
              <span className="float-start me-2 font-display text-[38px] leading-[0.9] text-icongold">
                {pick(p, lang).slice(0, 1)}
              </span>
            ) : null}
            {i === 0 && lang === "en" ? pick(p, lang).slice(1) : pick(p, lang)}
          </p>
        ))}
      </article>

      {/* ── Milestones ───────────────────────────────── */}
      <SynaxSectionTitle title={pick(L.milestones, lang)} />
      <div className="relative ps-6">
        <span className="absolute inset-y-2 start-[9px] w-px bg-gradient-to-b from-icongold/50 via-icongold/20 to-transparent" />
        <div className="space-y-2.5">
          {s.milestones.map((m) => (
            <div key={m.label.en} className="relative">
              <span className="absolute -start-[21px] top-4 grid size-[13px] place-items-center rounded-full border border-icongold/60 bg-synaxnight">
                <span className="size-[5px] rounded-full bg-saffron" />
              </span>
              <div className="sx-glass rounded-[22px] px-3.5 py-3">
                <p className="font-manrope text-[9.5px] font-bold tracking-[0.14em] text-icongold uppercase">
                  {pick(m.label, lang)}
                </p>
                <p className="mt-1 font-display text-[13.5px] font-semibold text-ivory">{pick(m.value, lang)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Virtues ──────────────────────────────────── */}
      <SynaxSectionTitle title={pick(L.virtues, lang)} />
      <div className="flex flex-wrap gap-2">
        {s.virtues.map((v) => (
          <span
            key={v.en}
            className="rounded-full border border-icongold/25 bg-synaxdeep/45 px-3 py-[7px] font-manrope text-[11px] font-semibold text-iconleaf/85"
          >
            {pick(v, lang)}
          </span>
        ))}
      </div>

      <footer className="mt-9 text-center">
        <div className="sx-hairline mx-auto h-px w-20 opacity-50" />
        <CopticCross className="mx-auto mt-4 size-5 text-icongold/70" />
        <p className="mx-auto mt-3 max-w-[260px] font-display text-[12.5px] leading-relaxed text-ivory/45">
          {pick(L.footer, lang)}
        </p>
      </footer>
      <SloganBand />
    </SynaxShell>
  );
}
