import { useMemo, useState, type CSSProperties } from "react";

import { KdBrush, KdGame, KdSparkle, KdStar } from "@/components/kids/kids-icons";
import { colourPalette, colourSheets, memoryGlyphs, pick, type Lang } from "@/lib/kids-data";

/**
 * «تلوين وأنشطة» — Colour & Craft studio + light touch games.
 * Presentation-only: local component state, no backend.
 */

type Tab = "colour" | "game";

export function CreativeStudio({ lang, isArabic }: { lang: Lang; isArabic: boolean }) {
  const [tab, setTab] = useState<Tab>("colour");

  return (
    <section className="kd-glass overflow-hidden rounded-[30px] p-3">
      <div className="grid grid-cols-2 gap-2">
        {(
          [
            { key: "colour", label: { ar: "لوحة التلوين", en: "Colouring" }, hue: "var(--kd-coral)" },
            { key: "game", label: { ar: "لعبة لمس", en: "Touch game" }, hue: "var(--kd-sky)" },
          ] as const
        ).map((t) => {
          const on = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              style={{ "--hue": t.hue } as CSSProperties}
              className={`press inline-flex items-center justify-center gap-1.5 rounded-[20px] px-3 py-2.5 font-manrope text-[11.5px] font-extrabold transition-all ${
                on ? "kd-card text-kdink" : "border border-kdink/8 bg-kdpaper/55 text-kdink/50"
              }`}
            >
              {t.key === "colour" ? <KdBrush className="size-4" /> : <KdGame className="size-4" />}
              {pick(t.label, lang)}
            </button>
          );
        })}
      </div>

      <div className="mt-3">
        {tab === "colour" ? (
          <ColourBoard lang={lang} isArabic={isArabic} />
        ) : (
          <MemoryGame lang={lang} isArabic={isArabic} />
        )}
      </div>
    </section>
  );
}

/* ── Colouring board ──────────────────────────────── */
function ColourBoard({ lang, isArabic }: { lang: Lang; isArabic: boolean }) {
  const [sheet, setSheet] = useState(0);
  const [colour, setColour] = useState(colourPalette[0]!.value);
  const [fills, setFills] = useState<Record<string, string>>({});

  const active = colourSheets[sheet]!;
  const key = (id: string) => `${active.id}:${id}`;
  const painted = active.regions.filter((r) => fills[key(r.id)]).length;
  const complete = painted === active.regions.length;

  return (
    <div>
      {/* sheet picker */}
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {colourSheets.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSheet(i)}
            className={`press shrink-0 rounded-full px-3 py-1.5 font-manrope text-[10.5px] font-bold transition-all ${
              i === sheet
                ? "border border-kdhoney/45 bg-kdhoney/30 text-kdink"
                : "border border-kdink/10 bg-kdpaper/60 text-kdink/45"
            }`}
          >
            {pick(s.title, lang)}
          </button>
        ))}
      </div>

      {/* canvas */}
      <div className="relative mt-2.5 overflow-hidden rounded-[24px] border border-kdink/10 bg-kdpaper">
        <span
          aria-hidden="true"
          className="kd-blob pointer-events-none absolute -end-8 -top-10 size-28 bg-kdmint/25"
        />
        <svg viewBox="0 0 200 160" className="relative block h-[188px] w-full">
          {active.regions.map((r) => (
            <path
              key={r.id}
              d={r.d}
              role="button"
              tabIndex={0}
              aria-label={pick(r.label, lang)}
              onClick={() => setFills((f) => ({ ...f, [key(r.id)]: colour }))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ")
                  setFills((f) => ({ ...f, [key(r.id)]: colour }));
              }}
              fill={fills[key(r.id)] ?? "color-mix(in oklab, var(--kd-cream) 92%, white)"}
              stroke="color-mix(in oklab, var(--kd-ink) 42%, transparent)"
              strokeWidth="1.6"
              strokeLinejoin="round"
              className="cursor-pointer outline-none transition-[fill] duration-200"
            />
          ))}
        </svg>

        {complete && (
          <span className="animate-fade-in absolute bottom-2 start-2 inline-flex items-center gap-1.5 rounded-full bg-kdhoney/35 px-2.5 py-1 font-manrope text-[10px] font-extrabold text-kdink backdrop-blur-md">
            <KdStar className="size-3 text-kdhoney" />
            {isArabic ? "لوحة كاملة! +نجمة" : "All done! +1 star"}
          </span>
        )}
      </div>

      {/* palette */}
      <div className="mt-2.5 flex items-center gap-2">
        <div className="flex flex-1 flex-wrap gap-1.5">
          {colourPalette.map((c) => {
            const on = colour === c.value;
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => setColour(c.value)}
                aria-label={pick(c.name, lang)}
                aria-pressed={on}
                className={`press size-8 rounded-full border-2 transition-transform ${
                  on ? "scale-110 border-kdink/45" : "border-kdpaper"
                }`}
                style={{ background: c.value }}
              />
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setFills({})}
          className="press shrink-0 rounded-full border border-kdink/12 bg-kdpaper/75 px-3 py-2 font-manrope text-[10.5px] font-bold text-kdink/60"
        >
          {isArabic ? "امسح" : "Clear"}
        </button>
      </div>

      <p className="mt-2 px-1 font-manrope text-[10px] text-kdink/40">
        {isArabic
          ? "اختار لون واضغط على أي جزء في الرسمة."
          : "Pick a colour, then tap any part of the drawing."}
      </p>
    </div>
  );
}

/* ── Light touch game: find the pairs ─────────────── */
type Card = { i: number; glyph: (typeof memoryGlyphs)[number] };

function shuffle<T>(a: T[]) {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j]!, c[i]!];
  }
  return c;
}

function MemoryGame({ lang, isArabic }: { lang: Lang; isArabic: boolean }) {
  const [round, setRound] = useState(0);
  const deck = useMemo<Card[]>(
    () => shuffle([...memoryGlyphs, ...memoryGlyphs].map((glyph, i) => ({ i, glyph }))),
    [round],
  );
  const [open, setOpen] = useState<number[]>([]);
  const [found, setFound] = useState<string[]>([]);
  const [taps, setTaps] = useState(0);

  const flip = (card: Card) => {
    if (found.includes(card.glyph.id) || open.includes(card.i) || open.length === 2) return;
    const next = [...open, card.i];
    setOpen(next);
    setTaps((t) => t + 1);
    if (next.length === 2) {
      const [a, b] = next.map((i) => deck.find((d) => d.i === i)!);
      if (a!.glyph.id === b!.glyph.id) {
        setFound((f) => [...f, a!.glyph.id]);
        setOpen([]);
      } else {
        setTimeout(() => setOpen([]), 620);
      }
    }
  };

  const win = found.length === memoryGlyphs.length;

  return (
    <div>
      <div className="flex items-center justify-between px-1">
        <p className="font-manrope text-[10.5px] font-bold text-kdink/55">
          {isArabic ? "دوّر على الزوج المتشابه" : "Find the matching pairs"}
        </p>
        <span className="inline-flex items-center gap-1 rounded-full border border-kdink/10 bg-kdpaper/70 px-2.5 py-1 font-manrope text-[10px] font-bold text-kdink/50">
          {isArabic ? "لمسات" : "Taps"} · {taps}
        </span>
      </div>

      <div className="mt-2.5 grid grid-cols-3 gap-2">
        {deck.map((card) => {
          const shown = open.includes(card.i) || found.includes(card.glyph.id);
          const Glyph = card.glyph.icon;
          return (
            <button
              key={card.i}
              type="button"
              onClick={() => flip(card)}
              aria-label={pick(card.glyph.label, lang)}
              style={{ "--hue": card.glyph.hue } as CSSProperties}
              className={`press grid aspect-[4/3.4] place-items-center rounded-[20px] transition-all duration-200 ${
                shown ? "kd-card" : "border border-kdink/10 bg-kdpaper/60"
              }`}
            >
              {shown ? (
                <Glyph className="size-6 text-kdink/75" />
              ) : (
                <KdSparkle className="size-5 text-kdink/18" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-2.5 flex items-center gap-2">
        {win && (
          <span className="animate-fade-in inline-flex flex-1 items-center gap-1.5 rounded-full bg-kdmint/30 px-3 py-2 font-manrope text-[10.5px] font-extrabold text-kdink">
            <KdStar className="size-3.5 text-kdhoney" />
            {isArabic ? "برافو! لقيت كل الأزواج" : "Bravo! You found them all"}
          </span>
        )}
        <button
          type="button"
          onClick={() => {
            setRound((r) => r + 1);
            setOpen([]);
            setFound([]);
            setTaps(0);
          }}
          className={`press rounded-full border border-kdink/12 bg-kdpaper/75 px-3.5 py-2 font-manrope text-[10.5px] font-bold text-kdink/60 ${
            win ? "" : "flex-1"
          }`}
        >
          {isArabic ? "لعبة جديدة" : "New game"}
        </button>
      </div>
    </div>
  );
}
