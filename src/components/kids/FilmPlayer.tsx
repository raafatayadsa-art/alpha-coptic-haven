import { useEffect, useRef, useState, type CSSProperties } from "react";

import {
  KdBook,
  KdChevron,
  KdCross,
  KdHeart,
  KdMusic,
  KdPlay,
  KdSparkle,
  KdStar,
  KdTrophy,
} from "@/components/kids/kids-icons";
import {
  filmBeats,
  filmCaptions,
  films,
  pick,
  type Film,
  type Lang,
} from "@/lib/kids-data";

/**
 * «مشغل أفلام الكتاب المقدس» — cinematic visual player.
 * Presentation only: progress is a timed visual simulation.
 * Adds: full-screen auto-rotated stage while playing, gentle captions,
 * volume control, then story beats + a suggested next story.
 */

export function FilmPlayer({
  film,
  lang,
  isArabic,
  onClose,
  onSelectFilm,
}: {
  film: Film;
  lang: Lang;
  isArabic: boolean;
  onClose: () => void;
  onSelectFilm?: (f: Film) => void;
}) {
  const beat = filmBeats.find((b) => b.filmId === film.id) ?? filmBeats[0]!;
  const captions = filmCaptions[film.id] ?? [];
  const nextFilm = films[(films.findIndex((f) => f.id === film.id) + 1) % films.length]!;

  const [playing, setPlaying] = useState(false);
  const [pct, setPct] = useState(0);
  const [ended, setEnded] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [volume, setVolume] = useState(70);
  const [rotated, setRotated] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const immersive = playing && !ended;

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setPct((p) => (p >= 100 ? 100 : p + 2.5));
    }, 130);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing]);

  useEffect(() => {
    if (pct >= 100) {
      setPlaying(false);
      setEnded(true);
      setRotated(false);
    }
  }, [pct]);

  /* auto-rotate to landscape once the film starts on a portrait screen */
  useEffect(() => {
    if (!immersive) return;
    const portrait = window.innerHeight >= window.innerWidth;
    setRotated(portrait);
  }, [immersive]);

  const caption = captions.filter((c) => c.at <= pct).at(-1);
  const muted = volume === 0;

  const start = () => {
    setPlaying(true);
  };

  const VolumeControl = ({ tone }: { tone: "dark" | "light" }) => {
    const fg = tone === "dark" ? "text-kdpaper" : "text-kdink";
    const track = tone === "dark" ? "bg-kdpaper/25" : "bg-kdink/12";
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setVolume((v) => (v === 0 ? 70 : 0))}
          aria-label={isArabic ? "كتم الصوت" : "Mute"}
          className={`press grid size-8 shrink-0 place-items-center rounded-full ${
            tone === "dark" ? "bg-kdpaper/15" : "bg-kdink/6"
          } ${fg}`}
        >
          {muted ? <KdCross className="size-4" /> : <KdMusic className="size-4" />}
        </button>
        <span className={`relative h-1.5 flex-1 overflow-hidden rounded-full ${track}`}>
          <span
            className="absolute inset-y-0 start-0 rounded-full bg-kdhoney"
            style={{ width: `${volume}%` }}
          />
        </span>
        <button
          type="button"
          onClick={() => setVolume((v) => Math.max(0, v - 10))}
          aria-label={isArabic ? "خفض الصوت" : "Volume down"}
          className={`press grid size-8 shrink-0 place-items-center rounded-full font-manrope text-[15px] font-extrabold ${
            tone === "dark" ? "bg-kdpaper/15" : "bg-kdink/6"
          } ${fg}`}
        >
          −
        </button>
        <button
          type="button"
          onClick={() => setVolume((v) => Math.min(100, v + 10))}
          aria-label={isArabic ? "رفع الصوت" : "Volume up"}
          className={`press grid size-8 shrink-0 place-items-center rounded-full font-manrope text-[15px] font-extrabold ${
            tone === "dark" ? "bg-kdpaper/15" : "bg-kdink/6"
          } ${fg}`}
        >
          +
        </button>
        <span
          className={`font-manrope text-[9.5px] font-bold ${
            tone === "dark" ? "text-kdpaper/70" : "text-kdink/45"
          }`}
        >
          {volume}%
        </span>
      </div>
    );
  };

  /* ── Immersive full-screen stage ───────────────── */
  if (immersive) {
    const stage: CSSProperties = rotated
      ? {
          width: "100vh",
          height: "100vw",
          transform: "translate(-50%, -50%) rotate(90deg)",
        }
      : { width: "100vw", height: "100vh", transform: "translate(-50%, -50%)" };

    return (
      <div className="fixed inset-0 z-50 overflow-hidden bg-kdink" dir="ltr">
        <div className="absolute top-1/2 left-1/2 origin-center" style={stage}>
          <img
            src={film.image}
            alt={pick(film.title, lang)}
            className="absolute inset-0 size-full scale-105 object-cover brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kdink/90 via-kdink/25 to-kdink/70" />

          {/* top bar */}
          <div className="absolute inset-x-0 top-0 flex items-center gap-2 p-4" dir={isArabic ? "rtl" : "ltr"}>
            <button
              type="button"
              onClick={onClose}
              aria-label={isArabic ? "إغلاق" : "Close"}
              className="press grid size-9 place-items-center rounded-full bg-kdpaper/15 text-kdpaper"
            >
              <KdChevron className={`size-4 ${isArabic ? "" : "rotate-180"}`} />
            </button>
            <h3 className="font-display truncate text-[14px] font-semibold text-kdpaper">
              {pick(film.title, lang)}
            </h3>
            <div className="ms-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCaptions((v) => !v)}
                className={`press rounded-full px-2.5 py-1 font-manrope text-[9.5px] font-extrabold tracking-[0.1em] uppercase ${
                  showCaptions ? "bg-kdhoney text-kdink" : "bg-kdpaper/15 text-kdpaper/75"
                }`}
              >
                {isArabic ? "ترجمة" : "CC"}
              </button>
              <button
                type="button"
                onClick={() => setRotated((v) => !v)}
                aria-label={isArabic ? "تدوير الشاشة" : "Rotate"}
                className="press grid size-9 place-items-center rounded-full bg-kdpaper/15 text-kdpaper"
              >
                <KdSparkle className="size-4" />
              </button>
            </div>
          </div>

          {/* captions */}
          {showCaptions && caption && (
            <p
              key={caption.at}
              dir={isArabic ? "rtl" : "ltr"}
              className="animate-fade-in absolute inset-x-0 bottom-[104px] mx-auto max-w-[80%] rounded-2xl bg-kdink/55 px-3.5 py-2 text-center font-manrope text-[12.5px] leading-relaxed font-semibold text-kdpaper backdrop-blur-sm"
            >
              {pick(caption.text, lang)}
            </p>
          )}

          {/* bottom controls */}
          <div className="absolute inset-x-0 bottom-0 space-y-2.5 p-4" dir={isArabic ? "rtl" : "ltr"}>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPlaying(false)}
                aria-label={isArabic ? "إيقاف" : "Pause"}
                className="press grid size-10 shrink-0 place-items-center rounded-full bg-kdpaper/92 text-kdcoral"
              >
                <span className="flex gap-1">
                  <span className="h-4 w-1.5 rounded-full bg-kdcoral" />
                  <span className="h-4 w-1.5 rounded-full bg-kdcoral" />
                </span>
              </button>
              <span className="font-manrope text-[9.5px] font-bold text-kdpaper/75">
                {Math.round(pct)}%
              </span>
              <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-kdpaper/25">
                <span
                  className="absolute inset-y-0 start-0 rounded-full transition-[width] duration-150"
                  style={{
                    width: `${pct}%`,
                    background: `color-mix(in oklab, ${film.hue} 88%, white)`,
                  }}
                />
              </span>
              <span className="font-manrope text-[9.5px] font-bold text-kdpaper/75">
                {pick(film.minutes, lang)} {isArabic ? "د" : "min"}
              </span>
            </div>
            <VolumeControl tone="dark" />
          </div>
        </div>
      </div>
    );
  }

  /* ── Sheet (before play / after film) ──────────── */
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label={isArabic ? "إغلاق" : "Close"}
        onClick={onClose}
        className="absolute inset-0 bg-kdink/55 backdrop-blur-sm"
      />
      <div className="animate-fade-in relative max-h-[92vh] w-full max-w-[430px] overflow-y-auto rounded-t-[34px] border border-kdhoney/35 bg-kdcream px-4 pt-3 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <span className="mx-auto mb-3 block h-1.5 w-12 rounded-full bg-kdink/15" />

        {/* ── Stage ─────────────────────────────────── */}
        <div
          className="relative overflow-hidden rounded-[28px] border border-kdhoney/30 shadow-[0_26px_54px_-28px_color-mix(in_oklab,var(--kd-ink)_55%,transparent)]"
          style={{ "--hue": film.hue } as CSSProperties}
        >
          <img
            src={film.image}
            alt={pick(film.title, lang)}
            width={960}
            height={1280}
            className="h-[248px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kdink/85 via-kdink/20 to-kdink/25" />

          {!ended && (
            <button
              type="button"
              onClick={start}
              aria-label={pick(film.title, lang)}
              className="press absolute top-1/2 left-1/2 grid size-[86px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-kdpaper/92 text-kdcoral shadow-[0_20px_40px_-14px_rgba(0,0,0,0.55)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: `0 0 0 10px color-mix(in oklab, ${film.hue} 30%, transparent)`,
                }}
              />
              <KdPlay className="relative size-9 ps-1" />
            </button>
          )}

          <div className="absolute inset-x-0 bottom-0 p-3.5">
            <h3 className="font-display text-[19px] font-semibold text-kdpaper">
              {pick(film.title, lang)}
            </h3>
            <p className="mt-0.5 text-[11px] text-kdpaper/75">{pick(film.line, lang)}</p>

            <div className="mt-2.5 flex items-center gap-2">
              <span className="font-manrope text-[9.5px] font-bold text-kdpaper/75">
                {Math.round(pct)}%
              </span>
              <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-kdpaper/25">
                <span
                  className="absolute inset-y-0 start-0 rounded-full transition-[width] duration-150"
                  style={{
                    width: `${pct}%`,
                    background: `color-mix(in oklab, ${film.hue} 88%, white)`,
                  }}
                />
              </span>
              <span className="font-manrope text-[9.5px] font-bold text-kdpaper/75">
                {pick(film.minutes, lang)} {isArabic ? "د" : "min"}
              </span>
            </div>
          </div>
        </div>

        {/* sound + captions preferences */}
        <div className="mt-3 rounded-[22px] border border-kdink/8 bg-kdpaper/70 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-manrope text-[10px] font-extrabold tracking-[0.12em] text-kdink/45 uppercase">
              {isArabic ? "الصوت والترجمة" : "Sound & captions"}
            </span>
            <button
              type="button"
              onClick={() => setShowCaptions((v) => !v)}
              className={`press rounded-full px-2.5 py-1 font-manrope text-[9.5px] font-extrabold ${
                showCaptions ? "bg-kdhoney text-kdink" : "bg-kdink/8 text-kdink/45"
              }`}
            >
              {isArabic ? (showCaptions ? "الترجمة مفتوحة" : "الترجمة مغلقة") : showCaptions ? "CC on" : "CC off"}
            </button>
          </div>
          <VolumeControl tone="light" />
        </div>

        {/* ── After-film story beats ────────────────── */}
        {ended ? (
          <div className="animate-fade-in mt-4 space-y-3">
            <section
              className="kd-card relative overflow-hidden rounded-[26px] p-4 text-center"
              style={{ "--hue": "var(--kd-sky)" } as CSSProperties}
            >
              <span aria-hidden="true" className="kd-blob absolute -end-8 -top-10 size-28 bg-kdhoney/25" />
              <span className="relative inline-flex items-center gap-1.5 rounded-full bg-kdpaper/85 px-3 py-1 font-manrope text-[9.5px] font-extrabold tracking-[0.14em] text-kdsky uppercase">
                <KdCross className="size-3" />
                {isArabic ? "آية الفيلم" : "Film verse"}
              </span>
              <p className="relative mt-2.5 font-display text-[16.5px] leading-[1.75] font-semibold text-kdink">
                {pick(beat.verse, lang)}
              </p>
              <p className="relative mt-1.5 font-manrope text-[10px] font-bold text-kdink/45">
                {pick(beat.ref, lang)}
              </p>
            </section>

            <section className="flex items-start gap-3 rounded-[24px] border border-kdink/8 bg-kdpaper/70 p-3.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-kdmint/40 text-kdink/75">
                <KdBook className="size-5" />
              </span>
              <div>
                <h4 className="font-display text-[13.5px] font-semibold text-kdink">
                  {isArabic ? "الدرس بتاعنا" : "What we learned"}
                </h4>
                <p className="mt-0.5 font-manrope text-[11px] leading-relaxed text-kdink/55">
                  {pick(beat.lesson, lang)}
                </p>
              </div>
            </section>

            <section
              className="kd-card rounded-[26px] p-3.5"
              style={{ "--hue": "var(--kd-grape)" } as CSSProperties}
            >
              <p className="font-display text-[14px] font-semibold text-kdink">
                {pick(beat.question, lang)}
              </p>
              <div className="mt-2.5 space-y-2">
                {beat.options.map((o, i) => {
                  const chosen = answer === i;
                  const right = i === beat.answer;
                  const state =
                    answer === null
                      ? "border-kdink/10 bg-kdpaper/75 text-kdink/75"
                      : right
                        ? "border-kdmint/55 bg-kdmint/30 text-kdink"
                        : chosen
                          ? "border-kdcoral/45 bg-kdcoral/20 text-kdink/70"
                          : "border-kdink/8 bg-kdpaper/55 text-kdink/40";
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setAnswer(i)}
                      className={`press flex w-full items-center gap-2.5 rounded-[18px] border px-3 py-2.5 text-start font-manrope text-[11.5px] font-semibold ${state}`}
                    >
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-kdink/6">
                        {answer !== null && right ? (
                          <KdStar className="size-3 text-kdhoney" />
                        ) : (
                          <KdSparkle className="size-3 text-kdink/25" />
                        )}
                      </span>
                      {pick(o, lang)}
                    </button>
                  );
                })}
              </div>
            </section>

            {answer === beat.answer && (
              <section className="animate-fade-in flex items-center gap-3 rounded-[24px] border border-kdhoney/40 bg-kdhoney/25 p-3.5">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-kdpaper/85 text-kdink/75">
                  <KdTrophy className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="font-display text-[13.5px] font-semibold text-kdink">
                    {pick(beat.badge, lang)}
                  </h4>
                  <p className="font-manrope text-[10px] text-kdink/50">
                    {isArabic ? "اتضاف لنجومك" : "Added to your stars"}
                  </p>
                </div>
                <KdStar className="size-5 shrink-0 text-kdhoney" />
              </section>
            )}

            {/* suggested next story */}
            <section className="rounded-[26px] border border-kdsky/30 bg-kdsky/12 p-3">
              <p className="mb-2 px-0.5 font-manrope text-[10px] font-extrabold tracking-[0.12em] text-kdink/45 uppercase">
                {isArabic ? "القصة الجاية" : "Up next"}
              </p>
              <button
                type="button"
                onClick={() => onSelectFilm?.(nextFilm)}
                className="press flex w-full items-center gap-3 rounded-[22px] bg-kdpaper/80 p-2.5 text-start"
              >
                <img
                  src={nextFilm.image}
                  alt={pick(nextFilm.title, lang)}
                  width={160}
                  height={160}
                  className="size-14 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-display truncate text-[13.5px] font-semibold text-kdink">
                    {pick(nextFilm.title, lang)}
                  </h4>
                  <p className="truncate font-manrope text-[10.5px] text-kdink/50">
                    {pick(nextFilm.line, lang)}
                  </p>
                </div>
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-kdcoral/20 text-kdcoral">
                  <KdPlay className="size-4 ps-0.5" />
                </span>
              </button>
            </section>

            <div className="flex items-center gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setPct(0);
                  setEnded(false);
                  setAnswer(null);
                  setPlaying(true);
                }}
                className="kd-pop press inline-flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 font-manrope text-[11.5px] font-extrabold text-kdink"
              >
                <KdPlay className="size-3.5" />
                {isArabic ? "شاهد تاني" : "Watch again"}
              </button>
              <button
                type="button"
                onClick={() => setSaved((v) => !v)}
                aria-label={isArabic ? "حفظ" : "Save"}
                className={`press grid size-10 shrink-0 place-items-center rounded-full border ${
                  saved
                    ? "border-kdcoral/45 bg-kdcoral/25 text-kdcoral"
                    : "border-kdink/12 bg-kdpaper/75 text-kdink/45"
                }`}
              >
                <KdHeart className="size-4" filled={saved} />
              </button>
            </div>
          </div>
        ) : (
          <p className="mt-3.5 px-1 text-center font-manrope text-[10.5px] text-kdink/40">
            {isArabic
              ? "اضغط الزر الكبير — الفيلم يفتح ملء الشاشة بالعرض الأفقي مع ترجمة لطيفة، وبعده آية وسؤال ودرع وقصة جاية."
              : "Tap the big button — the film opens full screen in landscape with gentle captions, then a verse, a question, a badge and the next story."}
          </p>
        )}
      </div>
    </div>
  );
}
