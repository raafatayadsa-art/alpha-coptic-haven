import { useEffect, useRef, useState, type CSSProperties } from "react";

import {
  KdBook,
  KdCross,
  KdHeart,
  KdPlay,
  KdSparkle,
  KdStar,
  KdTrophy,
} from "@/components/kids/kids-icons";
import { filmBeats, pick, type Film, type Lang } from "@/lib/kids-data";

/**
 * «مشغل أفلام الكتاب المقدس» — cinematic visual player.
 * Presentation only: the progress bar is a timed visual simulation,
 * followed by story beats (verse, lesson, quiz, badge).
 */

export function FilmPlayer({
  film,
  lang,
  isArabic,
  onClose,
}: {
  film: Film;
  lang: Lang;
  isArabic: boolean;
  onClose: () => void;
}) {
  const beat = filmBeats.find((b) => b.filmId === film.id) ?? filmBeats[0]!;
  const [playing, setPlaying] = useState(false);
  const [pct, setPct] = useState(0);
  const [ended, setEnded] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setPct((p) => {
        if (p >= 100) return 100;
        return p + 2.5;
      });
    }, 130);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing]);

  useEffect(() => {
    if (pct >= 100) {
      setPlaying(false);
      setEnded(true);
    }
  }, [pct]);

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
            className={`h-[248px] w-full object-cover transition-all duration-700 ${
              playing ? "scale-105 brightness-[0.72]" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kdink/85 via-kdink/20 to-kdink/25" />

          {/* big play button */}
          {!ended && (
            <button
              type="button"
              onClick={() => setPlaying((v) => !v)}
              aria-label={playing ? (isArabic ? "إيقاف" : "Pause") : pick(film.title, lang)}
              className="press absolute top-1/2 left-1/2 grid size-[86px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-kdpaper/92 text-kdcoral shadow-[0_20px_40px_-14px_rgba(0,0,0,0.55)]"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: `0 0 0 10px color-mix(in oklab, ${film.hue} 30%, transparent)`,
                }}
              />
              {playing ? (
                <span className="relative flex gap-1.5">
                  <span className="h-7 w-2 rounded-full bg-kdcoral" />
                  <span className="h-7 w-2 rounded-full bg-kdcoral" />
                </span>
              ) : (
                <KdPlay className="relative size-9 ps-1" />
              )}
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

            <div className="flex items-center gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setPct(0);
                  setEnded(false);
                  setAnswer(null);
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
              ? "اضغط الزر الكبير لتشغيل الفيلم — وبعد الفيلم فيه آية وسؤال ودرع."
              : "Tap the big button to play — after the film there's a verse, a question and a badge."}
          </p>
        )}
      </div>
    </div>
  );
}
