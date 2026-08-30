import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import intro1 from "@/assets/intro/copt-1-identity.jpg";
import intro2 from "@/assets/intro/copt-2-word.jpg";
import intro3 from "@/assets/intro/copt-3-prayer.jpg";
import intro4 from "@/assets/intro/copt-4-church.jpg";
import intro5 from "@/assets/intro/copt-5-connect.jpg";
import intro6 from "@/assets/intro/copt-6-world.jpg";
import { Shield } from "@/components/church/Shield";
import { useLang } from "@/lib/i18n";
import { disposeAmbient, fadeAmbient, startAmbient } from "@/lib/ambient-audio";

/**
 * Alpha — Intro as an interactive cinematic scroll experience.
 *
 * Nothing animates on a timer: every scene is a sticky full-screen stage whose
 * local progress `--p` (0 → 1) is written straight from the scroll position on
 * each animation frame. Scroll down advances the composition, stopping freezes
 * it, scrolling up plays it backwards. All motion is expressed as `calc()` on
 * that single variable, so it stays GPU-cheap on phones.
 *
 * Derived per-scene variables:
 *   --p  raw local progress            0 → 1
 *   --a  eased entrance                0 → 1 over the first 45 %
 *   --c  bell (peaks mid-scene)        0 → 1 → 0
 *   --d  eased finish                  0 → 1 over the last 35 %
 */

export const Route = createFileRoute("/intro")({
  head: () => ({
    meta: [
      { title: "ألفا — رحلة تعريفية | البيت القبطي الأرثوذكسي الرقمي" },
      {
        name: "description",
        content:
          "رحلة سينمائية بالتمرير تعرّفك على ألفا: كلمة الله، الأجبية والقطمارس والسنكسار والخولاجي، كنيستك ومجتمعك، وألفا كونكت.",
      },
      { property: "og:title", content: "ألفا — رحلة تعريفية" },
      {
        property: "og:description",
        content: "تجربة تمرير سينمائية تجمع عوالم ألفا: الكتاب المقدس، الصلاة، الكنيسة، والتواصل.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IntroExperience,
});

/* ── copy ───────────────────────────────────────────────────── */

const COPY = {
  skip: { ar: "تخطّي", en: "Skip" },
  start: { ar: "ابدأ رحلتك", en: "Begin your journey" },
  scroll: { ar: "مرّر بإصبعك", en: "Scroll to begin" },
  sound: { ar: "الصوت", en: "Sound" },
} as const;

const SPIRITUAL = [
  { slug: "agpeya", ar: "الأجبية", en: "Agpeya", x: -96, y: -120, r: -10 },
  { slug: "katameros", ar: "القطمارس", en: "Katameros", x: 92, y: -70, r: 9 },
  { slug: "synaxarium", ar: "السنكسار", en: "Synaxarium", x: -78, y: 96, r: -7 },
  { slug: "khoulagy", ar: "الخولاجي", en: "Khoulagy", x: 98, y: 132, r: 11 },
] as const;

const WORLDS = [
  { slug: "bible", a: -90 },
  { slug: "agpeya", a: -54 },
  { slug: "katameros", a: -18 },
  { slug: "synaxarium", a: 18 },
  { slug: "khoulagy", a: 54 },
  { slug: "church", a: 90 },
  { slug: "library", a: 126 },
  { slug: "books", a: 162 },
  { slug: "kids", a: 198 },
  { slug: "audio", a: 234 },
  { slug: "community", a: 270 },
  { slug: "messages-audio", a: 306 },
] as const;

/* ── scroll engine ──────────────────────────────────────────── */

const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const ease = (v: number) => 1 - Math.pow(1 - v, 3);

function IntroExperience() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const navigate = useNavigate();

  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [sound, setSound] = useState(false);
  const armed = useRef(false);

  /* scroll → CSS variables, smoothed (single rAF, no React re-render per frame)
   *
   * The raw scroll position is the target; a critically damped lerp follows it,
   * so every move is silky and very slow to settle — scroll down advances,
   * stopping freezes, scrolling up reverses along the same curve. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const stages = Array.from(root.querySelectorAll<HTMLElement>("[data-stage]"));
    let raf = 0;
    let current = -1;
    let smooth = window.scrollY;

    const paint = () => {
      const vh = window.innerHeight;
      const target = window.scrollY;
      smooth += (target - smooth) * 0.085;
      if (Math.abs(target - smooth) < 0.25) smooth = target;
      const shift = smooth - target; // px offset of the eased playhead
      let best = 0;
      let bestArea = 0;

      stages.forEach((stage, i) => {
        const section = stage.parentElement!;
        const rect = section.getBoundingClientRect();
        const span = Math.max(1, rect.height - vh);
        const p = clamp((-rect.top + shift) / span);

        const visible = rect.bottom > -vh * 0.2 && rect.top < vh * 1.2;
        stage.style.visibility = visible ? "visible" : "hidden";
        if (!visible) return;

        stage.style.setProperty("--p", p.toFixed(4));
        stage.style.setProperty("--a", ease(clamp(p / 0.5)).toFixed(4));
        stage.style.setProperty("--d", ease(clamp((p - 0.58) / 0.38)).toFixed(4));
        stage.style.setProperty("--c", (1 - Math.abs(p - 0.5) * 2).toFixed(4));

        const area = Math.min(rect.bottom, vh) - Math.max(rect.top, 0);
        if (area > bestArea) {
          bestArea = area;
          best = i;
        }
      });

      const total = document.documentElement.scrollHeight - vh;
      const vp = clamp(smooth / Math.max(1, total));
      if (railRef.current) {
        railRef.current.style.setProperty("--vp", vp.toFixed(4));
      }
      if (best !== current) {
        current = best;
        setActive(best);
      }

      raf = smooth === target ? 0 : window.requestAnimationFrame(paint);
    };

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(paint);
      if (!armed.current) {
        armed.current = true;
        startAmbient();
        setSound(true);
      }
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => () => disposeAmbient(), []);

  const toggleSound = useCallback(() => {
    setSound((on) => {
      if (on) {
        fadeAmbient(0);
      } else {
        armed.current = true;
        startAmbient();
      }
      return !on;
    });
  }, []);

  return (
    <div
      ref={rootRef}
      dir={ar ? "rtl" : "ltr"}
      className="relative w-full bg-[oklch(0.155_0.02_285)] text-[oklch(0.97_0.01_85)]"
    >
      {/* ── fixed chrome ───────────────────────────────────── */}
      <div className="safe-top pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex w-full max-w-[430px] items-center justify-between px-5 pt-3">
          <Link
            to="/signup"
            className="press pointer-events-auto rounded-full border border-white/20 bg-black/25 px-4 py-2 font-manrope text-[11.5px] font-semibold tracking-wide text-white/85 backdrop-blur-xl"
          >
            {COPY.skip[ar ? "ar" : "en"]}
          </Link>

          <button
            type="button"
            onClick={toggleSound}
            aria-label={COPY.sound[ar ? "ar" : "en"]}
            aria-pressed={sound}
            className="press pointer-events-auto grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/25 text-white/85 backdrop-blur-xl"
          >
            <SoundIcon on={sound} />
          </button>
        </div>
      </div>

      {/* vertical progress indicator — gold stages that light up with the scroll */}
      <div
        ref={railRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-1/2 z-50 -translate-y-1/2 ltr:right-3 rtl:left-3"
        style={{ ["--vp" as string]: 0 }}
      >
        <div className="relative flex flex-col items-center gap-3">
          {/* track */}
          <span className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-white/12" />
          {/* filled portion */}
          <span
            className="absolute inset-y-1 left-1/2 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-[oklch(0.88_0.12_86)] via-[oklch(0.86_0.12_86)] to-[oklch(0.86_0.12_86)]/30"
            style={{ transform: "translateX(-50%) scaleY(var(--vp))" }}
          />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="relative grid h-3 w-3 place-items-center">
              <span
                className="absolute h-3 w-3 rounded-full bg-[oklch(0.86_0.12_86)]/25 blur-[3px]"
                style={{ opacity: `calc((var(--vp) * 6 - ${i}) * 1.4)` }}
              />
              <span
                className="absolute h-[5px] w-[5px] rounded-full bg-white/25"
                style={{ opacity: `calc(1 - (var(--vp) * 6 - ${i}) * 2)` }}
              />
              <span
                className="absolute rounded-full bg-[oklch(0.9_0.11_87)] shadow-[0_0_10px_oklch(0.86_0.12_86/0.7)]"
                style={{
                  opacity: `calc((var(--vp) * 6 - ${i}) * 2)`,
                  height: "6px",
                  width: "6px",
                  transform: `scale(calc(0.6 + min(1, max(0, var(--vp) * 6 - ${i})) * 0.6))`,
                }}
              />
            </span>
          ))}
        </div>
      </div>


      {/* ── scene 1 — Alpha identity ───────────────────────── */}
      <Section>
        <Stage>
          <Plate src={intro1} alt="نور الفجر داخل كنيسة قبطية" />
          <Veil />
          {/* light shaft bloom */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 h-[70%] w-[62%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,oklch(0.93_0.1_88/0.5),transparent_70%)] blur-2xl"
            style={{
              opacity: "calc(0.35 + var(--a) * 0.65)",
              transform: "translateX(-50%) scaleY(calc(0.7 + var(--p) * 0.7))",
            }}
          />
          <Center>
            <div
              className="relative grid place-items-center"
              style={{
                transform: "scale(calc(1.5 - var(--a) * 0.62)) translateY(calc(var(--p) * -26px))",
                filter: "blur(calc((1 - var(--a)) * 8px))",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute h-32 w-32 rounded-full bg-[oklch(0.86_0.12_86)/35] blur-2xl"
                style={{ opacity: "calc(0.2 + var(--a) * 0.8)" }}
              />
              <span className="relative font-display text-[104px] leading-none text-[oklch(0.94_0.06_88)] drop-shadow-[0_18px_46px_rgba(0,0,0,0.55)]">
                ⲁ
              </span>
            </div>

            <Line delay={0.28} className="mt-8">
              <h1 className="text-center font-arabic text-[27px] font-semibold leading-snug text-white">
                {ar ? "ألفا" : "Alpha"}
              </h1>
            </Line>
            <Line delay={0.42}>
              <p className="mt-2 max-w-[19rem] text-center font-arabic text-[13.5px] leading-relaxed text-white/75">
                {ar ? "بيتك المسيحي الرقمي… من أول الطريق" : "Your Christian digital home"}
              </p>
            </Line>
          </Center>

          <div
            className="absolute inset-x-0 bottom-[16%] flex flex-col items-center gap-2"
            style={{ opacity: "calc(1 - var(--p) * 3)" }}
          >
            <span className="font-manrope text-[9.5px] font-semibold tracking-[0.28em] uppercase text-white/55">
              {COPY.scroll[ar ? "ar" : "en"]}
            </span>
            <span aria-hidden="true" className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </Stage>
      </Section>

      {/* ── scene 2 — the Word ─────────────────────────────── */}
      <Section>
        <Stage>
          <Plate src={intro2} alt="الكتاب المقدس مفتوح على مكتب خشبي" depth={1.2} />
          <Veil tone="oklch(0.14_0.02_280)" strength={0.9} />
          <Center>
            <div
              style={{
                transform: "translateY(calc((1 - var(--a)) * 46px)) scale(calc(0.86 + var(--a) * 0.14))",
                opacity: "var(--a)",
              }}
            >
              <Shield slug="bible" size="lg" halo />
            </div>

            <Line delay={0.3} className="mt-7">
              <h2 className="text-center font-arabic text-[24px] font-semibold leading-snug text-white">
                {ar ? "كلمة الله معك كل يوم" : "The Word, every day"}
              </h2>
            </Line>

            {/* verse ribbon revealed by the scroll itself */}
            <div
              className="mt-6 w-[19rem] overflow-hidden rounded-[24px] border border-white/14 bg-white/8 px-5 py-4 backdrop-blur-xl"
              style={{
                opacity: "calc(var(--p) * 1.9 - 0.35)",
                transform: "translateY(calc((1 - var(--p)) * 34px))",
              }}
            >
              <p className="text-center font-arabic text-[14px] leading-loose text-[oklch(0.95_0.04_86)]">
                {ar ? "«سِرَاجٌ لِرِجْلِي كَلامُكَ، وَنُورٌ لِسَبِيلِي»" : "“Your word is a lamp to my feet”"}
              </p>
              <span
                aria-hidden="true"
                className="mx-auto mt-3 block h-px bg-[oklch(0.86_0.12_86)]"
                style={{ width: "calc(var(--p) * 100%)" }}
              />
            </div>
            <Line delay={0.62}>
              <p className="mt-4 text-center font-arabic text-[12.5px] text-white/65">
                {ar ? "قراءة، تظليل، وملاحظات… ورحلة تكمّلها كل مساء" : "Read, highlight, and keep your journey"}
              </p>
            </Line>
          </Center>
        </Stage>
      </Section>

      {/* ── scene 3 — prayer & spiritual life ──────────────── */}
      <Section>
        <Stage>
          <Plate src={intro3} alt="شموع وصلاة في هدوء الكنيسة" depth={0.9} />
          <Veil tone="oklch(0.13_0.03_265)" strength={0.72} />
          <Center>
            <Line delay={0.1}>
              <h2 className="text-center font-arabic text-[23px] font-semibold leading-snug text-white">
                {ar ? "صلاتك لها بيت" : "A home for your prayer"}
              </h2>
            </Line>

            <div className="relative mt-10 grid h-[280px] w-[280px] place-items-center">
              <span
                aria-hidden="true"
                className="absolute h-40 w-40 rounded-full border border-[oklch(0.86_0.12_86)/35]"
                style={{
                  transform: "scale(calc(0.5 + var(--p) * 0.9)) rotate(calc(var(--p) * 40deg))",
                  opacity: "calc(0.25 + var(--c) * 0.5)",
                }}
              />
              <span
                className="absolute font-display text-[46px] text-[oklch(0.9_0.08_88)]"
                style={{ opacity: "calc(0.4 + var(--c) * 0.6)", transform: "scale(calc(0.9 + var(--p) * 0.2))" }}
                aria-hidden="true"
              >
                ✚
              </span>

              {SPIRITUAL.map((s, i) => (
                <div
                  key={s.slug}
                  className="absolute flex flex-col items-center gap-1.5"
                  style={
                    {
                      "--tx": `${s.x}px`,
                      "--ty": `${s.y}px`,
                      transform:
                        "translate(calc(var(--tx) * (0.35 + var(--p) * 0.65)), calc(var(--ty) * (0.35 + var(--p) * 0.65)))" +
                        ` scale(calc(0.6 + var(--p) * 0.4)) rotate(calc((1 - var(--p)) * ${s.r}deg))`,
                      opacity: `calc(var(--p) * 2.4 - ${i * 0.22})`,
                      filter: "blur(calc((1 - var(--p)) * 5px))",
                    } as CSSProperties
                  }
                >
                  <Shield slug={s.slug} size="md" />
                  <span className="font-arabic text-[10.5px] font-semibold text-white/80">
                    {ar ? s.ar : s.en}
                  </span>
                </div>
              ))}
            </div>

            <p
              className="mt-8 max-w-[18rem] text-center font-arabic text-[12.5px] leading-relaxed text-white/70"
              style={{ opacity: "var(--d)", transform: "translateY(calc((1 - var(--d)) * 18px))" }}
            >
              {ar
                ? "الأجبية والقطمارس والسنكسار والخولاجي… يومك الروحي مرتّب"
                : "Agpeya, Katameros, Synaxarium and Khoulagy"}
            </p>
          </Center>
        </Stage>
      </Section>

      {/* ── scene 4 — church & community ───────────────────── */}
      <Section>
        <Stage>
          <Plate src={intro4} alt="مجتمع كنيسة قبطية أرثوذكسية في مصر" depth={1.35} />
          <Veil tone="oklch(0.14_0.02_290)" strength={0.86} />

          {/* Coptic arch that opens with the scroll */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[14%] mx-auto h-[58%] w-[74%] rounded-t-full border border-[oklch(0.86_0.12_86)/35]"
            style={{
              transform: "scale(calc(0.82 + var(--p) * 0.26))",
              opacity: "calc(0.15 + var(--a) * 0.5)",
            }}
          />

          <Center>
            <div
              className="flex items-end gap-3"
              style={{
                transform: "translateY(calc((1 - var(--a)) * 40px))",
                opacity: "var(--a)",
              }}
            >
              <Shield slug="priest" size="md" />
              <Shield slug="church" size="lg" halo />
              <Shield slug="community" size="md" />
            </div>

            <Line delay={0.3} className="mt-7">
              <h2 className="text-center font-arabic text-[23px] font-semibold leading-snug text-white">
                {ar ? "كنيستك معاك في جيبك" : "Your church, with you"}
              </h2>
            </Line>

            <div
              className="mt-5 flex flex-wrap items-center justify-center gap-2"
              style={{ opacity: "calc(var(--p) * 2 - 0.5)" }}
            >
              {(ar
                ? ["القداسات", "الاجتماعات", "الخدمات", "المناسبات"]
                : ["Liturgies", "Meetings", "Services", "Events"]
              ).map((t, i) => (
                <span
                  key={t}
                  className="rounded-full border border-white/16 bg-white/8 px-3.5 py-1.5 font-arabic text-[11.5px] text-white/85 backdrop-blur-md"
                  style={{ transform: `translateY(calc((1 - var(--p)) * ${16 + i * 8}px))` }}
                >
                  {t}
                </span>
              ))}
            </div>

            <p
              className="mt-6 max-w-[18rem] text-center font-arabic text-[12.5px] leading-relaxed text-white/70"
              style={{ opacity: "var(--d)" }}
            >
              {ar ? "أسرار كنيستك، أخبارها، وخدماتها… في مكان واحد" : "One calm place for your parish life"}
            </p>
          </Center>
        </Stage>
      </Section>

      {/* ── scene 5 — Alpha Connect ────────────────────────── */}
      <Section>
        <Stage>
          <Plate src={intro5} alt="تواصل ومحادثات داخل مجتمع ألفا" depth={1.1} />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,oklch(0.32_0.09_195/0.55),oklch(0.11_0.03_230/0.94))]"
          />
          <Center>
            <div className="relative grid h-[220px] w-[220px] place-items-center">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  aria-hidden="true"
                  className="absolute rounded-full border border-[oklch(0.86_0.13_190)/45]"
                  style={{
                    width: `${96 + i * 46}px`,
                    height: `${96 + i * 46}px`,
                    transform: `scale(calc(0.55 + var(--p) * ${0.6 + i * 0.22}))`,
                    opacity: `calc((0.55 - ${i * 0.14}) * (0.3 + var(--c) * 0.7))`,
                  }}
                />
              ))}
              <div
                style={{
                  transform: "scale(calc(0.7 + var(--a) * 0.34))",
                  filter: "blur(calc((1 - var(--a)) * 6px))",
                }}
              >
                <Shield slug="messages-audio" size="lg" halo />
              </div>
            </div>

            {/* live voice waveform driven by scroll */}
            <div className="mt-6 flex h-10 items-end gap-1.5" aria-hidden="true">
              {[6, 14, 22, 30, 18, 26, 10, 20, 32, 12].map((h, i) => (
                <span
                  key={i}
                  className="w-1 rounded-full bg-[oklch(0.88_0.13_190)]"
                  style={{
                    height: `${h}px`,
                    transform: `scaleY(calc(0.2 + var(--p) * ${0.9 + (i % 3) * 0.5}))`,
                    opacity: "calc(0.35 + var(--p) * 0.65)",
                  }}
                />
              ))}
            </div>

            <Line delay={0.34} className="mt-6">
              <h2 className="text-center font-arabic text-[23px] font-semibold leading-snug text-white">
                {ar ? "صوت واحد… ومجتمع قريب" : "One voice, one community"}
              </h2>
            </Line>
            <p
              className="mt-3 max-w-[18rem] text-center font-arabic text-[12.5px] leading-relaxed text-white/72"
              style={{ opacity: "var(--d)" }}
            >
              {ar ? "قنوات، رسائل، وغرف صوتية للخدمة والاجتماع" : "Channels, messages and voice rooms"}
            </p>
          </Center>
        </Stage>
      </Section>

      {/* ── scene 6 — the whole world of Alpha ─────────────── */}
      <Section tall>
        <Stage>
          <Plate src={intro6} alt="أفق الفجر ورحلة ألفا" depth={0.7} dim />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.28_0.05_290/0.5),oklch(0.09_0.02_285/0.96))]"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(0.86_0.12_86)/30] blur-3xl"
            style={{ opacity: "calc(0.1 + var(--p) * 0.7)" }}
          />

          <Center className="pointer-events-auto">
            <div className="relative grid h-[330px] w-[330px] place-items-center">
              {WORLDS.map((w, i) => {
                const rad = (w.a * Math.PI) / 180;
                const ux = Math.cos(rad);
                const uy = Math.sin(rad);
                return (
                  <span
                    key={`${w.slug}-${i}`}
                    className="absolute"
                    style={{
                      transform:
                        `translate(calc(${ux.toFixed(3)} * (250px - var(--p) * 168px)),` +
                        ` calc(${uy.toFixed(3)} * (250px - var(--p) * 168px)))` +
                        " scale(calc(0.5 + var(--p) * 0.42))",
                      opacity: `calc(var(--p) * 2.6 - ${0.15 + i * 0.05})`,
                      filter: "blur(calc((1 - var(--p)) * 4px))",
                    }}
                  >
                    <Shield slug={w.slug} size="sm" />
                  </span>
                );
              })}

              {/* Alpha core */}
              <div
                className="relative grid h-28 w-28 place-items-center rounded-full border border-[oklch(0.86_0.12_86)/50] bg-white/8 backdrop-blur-xl"
                style={{
                  transform: "scale(calc(0.72 + var(--p) * 0.34))",
                  boxShadow: "0 30px 80px -30px oklch(0.86 0.12 86 / 0.7)",
                }}
              >
                <span className="font-display text-[46px] leading-none text-[oklch(0.95_0.06_88)]">ⲁ</span>
              </div>
            </div>

            <div
              className="mt-8 flex flex-col items-center"
              style={{ opacity: "var(--d)", transform: "translateY(calc((1 - var(--d)) * 26px))" }}
            >
              <h2 className="text-center font-arabic text-[24px] font-semibold leading-snug text-white">
                {ar ? "عالم ألفا كامل… في يدك" : "The whole world of Alpha"}
              </h2>
              <p className="mt-2 max-w-[19rem] text-center font-arabic text-[12.5px] leading-relaxed text-white/70">
                {ar
                  ? "المكتبة المسيحية، قسم الآباء، ألفا كيدز، والصوتيات والترانيم"
                  : "Library, the Fathers, Alpha Kids, audio and hymns"}
              </p>

              <p
                className="mt-7 flex items-center gap-2 font-manrope text-[8.5px] font-semibold tracking-[0.22em] uppercase text-white/60"
                dir="ltr"
              >
                <span aria-hidden="true" className="font-display text-[14px] tracking-normal">
                  Ⲁ
                </span>
                <span aria-hidden="true" className="h-px w-8 bg-white/30" />
                <span>The Coptic Orthodox Digital Home</span>
                <span aria-hidden="true" className="h-px w-8 bg-white/30" />
                <span aria-hidden="true" className="font-display text-[14px] tracking-normal">
                  Ⲱ
                </span>
              </p>

              <button
                type="button"
                onClick={() => void navigate({ to: "/signup" })}
                className="press mt-8 rounded-2xl border border-[oklch(0.86_0.12_86)/60] bg-[oklch(0.86_0.12_86)] px-9 py-3.5 font-arabic text-[14.5px] font-semibold text-[oklch(0.2_0.03_285)] shadow-[0_22px_50px_-22px_oklch(0.86_0.12_86/0.8)]"
              >
                {COPY.start[ar ? "ar" : "en"]}
              </button>
            </div>
          </Center>
        </Stage>
      </Section>

    </div>
  );
}

/* ── stage primitives ───────────────────────────────────────── */

function Section({ children, tall = false }: { children: ReactNode; tall?: boolean }) {
  return <section className={tall ? "relative h-[320vh]" : "relative h-[260vh]"}>{children}</section>;
}

function Stage({ children, glyphs = "ⲭⲣ" }: { children: ReactNode; glyphs?: string }) {
  const [g1, g2] = [glyphs[0] ?? "ⲭ", glyphs[1] ?? "ⲣ"];
  return (
    <div
      data-stage
      className="sticky top-0 h-screen w-full overflow-hidden [will-change:transform]"
      style={{ ["--p" as string]: 0, ["--a" as string]: 0, ["--c" as string]: 0, ["--d" as string]: 0 }}
    >
      {children}
      {/* faint Coptic letterforms drifting as light, never as readable copy */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-[-6%] font-display text-[210px] leading-none text-[oklch(0.9_0.08_88)]/[0.05] select-none"
        style={{
          transform: "translateY(calc(var(--p) * 90px)) rotate(calc(var(--p) * -4deg))",
          opacity: "calc(0.35 + var(--c) * 0.65)",
        }}
      >
        {g1}
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-8%] right-[-4%] font-display text-[180px] leading-none text-[oklch(0.9_0.08_88)]/[0.04] select-none"
        style={{
          transform: "translateY(calc(var(--p) * -70px)) rotate(calc(var(--p) * 5deg))",
          opacity: "calc(0.3 + var(--c) * 0.6)",
        }}
      >
        {g2}
      </span>
    </div>
  );
}


/** Full-bleed photographic plate with scroll-linked parallax, zoom and blur. */
function Plate({
  src,
  alt,
  depth = 1,
  dim = false,
}: {
  src: string;
  alt: string;
  depth?: number;
  dim?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={`absolute inset-0 h-full w-full object-cover ${dim ? "opacity-55" : "opacity-80"}`}
      style={{
        transform:
          `scale(calc(1.16 + var(--p) * ${(0.16 * depth).toFixed(3)}))` +
          ` translate3d(0, calc(var(--p) * ${(-46 * depth).toFixed(1)}px), 0)`,
        filter: "blur(calc(var(--p) * 3px)) saturate(1.05)",
        willChange: "transform",
      }}
    />
  );
}

function Veil({ tone = "oklch(0.13_0.02_285)", strength = 0.8 }: { tone?: string; strength?: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background: `linear-gradient(to bottom, ${tone.replaceAll("_", " ")} 0%, transparent 32%, ${tone.replaceAll("_", " ")} 88%)`,
        opacity: strength,
      }}
    />
  );
}

function Center({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="safe-top safe-bottom pointer-events-none absolute inset-0 flex items-center justify-center px-7">
      <div className={`flex w-full max-w-[430px] flex-col items-center ${className}`}>{children}</div>
    </div>
  );
}

/** Text block whose reveal is tied to the scroll, not to a timer. */
function Line({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        opacity: `calc((var(--p) - ${delay}) * 4.5)`,
        transform: `translateY(calc((1 - var(--a)) * 26px))`,
        filter: "blur(calc((1 - var(--a)) * 4px))",
      }}
    >
      {children}
    </div>
  );
}

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M4 9.5h3L11 6v12l-4-3.5H4z" />
      {on ? (
        <>
          <path d="M15 9.2a4 4 0 0 1 0 5.6" />
          <path d="M17.6 6.6a7.6 7.6 0 0 1 0 10.8" />
        </>
      ) : (
        <path d="M15.5 9.5l5 5m0-5l-5 5" />
      )}
    </svg>
  );
}
