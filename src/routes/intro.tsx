import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import churchGate from "@/assets/intro/church-gate.png.asset.json";
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

/**
 * The twelve worlds of Alpha, laid on two concentric rings so no two labels can
 * ever collide: six on the inner ring at 60° steps, six on the outer ring offset
 * by half a step (30°). Every label is written once, in full.
 */
const WORLDS = [
  { slug: "bible", ar: "الكتاب المقدس", en: "Bible", a: -90, ring: 0 },
  { slug: "katameros", ar: "القطمارس", en: "Katameros", a: -30, ring: 0 },
  { slug: "khoulagy", ar: "الخولاجي", en: "Khoulagy", a: 30, ring: 0 },
  { slug: "church", ar: "كنيستي", en: "My Church", a: 90, ring: 0 },
  { slug: "books", ar: "قسم الآباء", en: "The Fathers", a: 150, ring: 0 },
  { slug: "community", ar: "مجتمعي", en: "Community", a: 210, ring: 0 },

  { slug: "agpeya", ar: "الأجبية", en: "Agpeya", a: -60, ring: 1 },
  { slug: "synaxarium", ar: "السنكسار", en: "Synaxarium", a: 0, ring: 1 },
  { slug: "library", ar: "المكتبة", en: "Library", a: 60, ring: 1 },
  { slug: "kids", ar: "ألفا كيدز", en: "Alpha Kids", a: 120, ring: 1 },
  { slug: "audio", ar: "الترانيم", en: "Hymns", a: 180, ring: 1 },
  { slug: "messages-audio", ar: "ألفا كونكت", en: "Alpha Connect", a: 240, ring: 1 },
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
          <span className="sr-only" aria-live="polite">{`${active + 1} / 6`}</span>
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


      {/* ── scene 1 — the walk toward the church ───────────── */}
      <Section tall>
        <Stage glyphs="ⲁⲱ">
          {/* the lit church at the top of the stairs — a slow camera push in */}
          <img
            src={churchGate.url}
            alt="كنيسة قبطية أرثوذكسية مضاءة عند الغروب في نهاية درج حجري"
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              transform:
                "scale(calc(1.14 + var(--p) * 0.22)) translate3d(0, calc(var(--p) * -34px), 0)",
              filter: "saturate(1.03) brightness(calc(0.9 + var(--p) * 0.16))",
              willChange: "transform",
            }}
          />
          {/* candle-warm haze rising from the pavement */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[56%] bg-[linear-gradient(to_top,oklch(0.2_0.05_58/0.92),transparent)]"
            style={{ opacity: "calc(0.95 - var(--p) * 0.25)" }}
          />

          {/* Coptic letterforms living inside the sky, at three depths */}
          <SkyGlyph char="Ⲭ" x="14%" y="18%" size={54} drift={-28} depth={0.25} fade={0.62} />
          <SkyGlyph char="Ⲣ" x="78%" y="12%" size={40} drift={-18} depth={0.18} fade={0.5} />
          <SkyGlyph char="Ⲡ" x="30%" y="34%" size={30} drift={-12} depth={0.12} fade={0.4} />
          <SkyGlyph char="Ⲥ" x="88%" y="38%" size={26} drift={-10} depth={0.1} fade={0.34} />
          <SkyGlyph char="Ⲱ" x="60%" y="24%" size={72} drift={-44} depth={0.4} fade={0.8} />


          {/* the sunburst behind the dome, breathing as we approach */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[16%] h-64 w-64 -translate-x-1/2 rounded-full bg-[oklch(0.93_0.13_82)/40] blur-3xl"
            style={{
              opacity: "calc(0.2 + var(--p) * 0.55)",
              transform: "translateX(-50%) scale(calc(0.7 + var(--p) * 0.7))",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(0.14_0.03_60/0.5),transparent_40%,oklch(0.12_0.02_285/0.88))]"
          />


          {/* Alpha identity arrives almost immediately, in a safe band */}
          <div className="safe-bottom pointer-events-none absolute inset-x-0 bottom-[9%] flex flex-col items-center px-8">
            <div
              className="relative grid place-items-center"
              style={{
                opacity: "calc(0.25 + var(--p) * 9)",
                transform: "translateY(calc((1 - var(--a)) * 18px)) scale(calc(0.86 + var(--a) * 0.14))",
              }}
            >
              <span
                aria-hidden="true"
                className="absolute h-24 w-24 rounded-full bg-[oklch(0.9_0.13_84)/40] blur-2xl"
                style={{ opacity: "calc(0.2 + var(--p) * 8)" }}
              />
              <span className="relative font-display text-[64px] leading-none text-[oklch(0.96_0.06_88)] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                ⲁ
              </span>
            </div>

            <div
              style={{
                opacity: "calc(0.1 + var(--p) * 8)",
                transform: "translateY(calc((1 - var(--a)) * 16px))",
                filter: "blur(calc((1 - var(--a)) * 3px))",
              }}
            >
              <h1 className="mt-4 text-center font-arabic text-[31px] font-semibold leading-snug text-white">
                {ar ? "ألفا" : "Alpha"}
              </h1>
              <p className="mt-2 max-w-[20rem] text-center font-arabic text-[15px] leading-relaxed text-white/80">
                {ar ? "اقترب… البيت مفتوح" : "Come closer — the home is open"}
              </p>
            </div>
          </div>

          <div
            className="absolute inset-x-0 bottom-[3%] flex flex-col items-center gap-2"
            style={{ opacity: "calc(1 - var(--p) * 5)" }}
          >
            <span className="font-manrope text-[9.5px] font-semibold tracking-[0.28em] uppercase text-white/60">
              {COPY.scroll[ar ? "ar" : "en"]}
            </span>
            <span aria-hidden="true" className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </Stage>
      </Section>


      {/* ── scene 2 — the Word ─────────────────────────────── */}
      <Section>
        <Stage glyphs="ⲭⲣ">
          <Plate src={intro2} alt="الكتاب المقدس مفتوح على مكتب خشبي" depth={1.2} />
          <Veil tone="oklch(0.14_0.02_280)" strength={0.9} />
          <Center>
            {/* light falling on the open page — the image tells the section */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[8%] mx-auto h-[46%] w-[70%] bg-[radial-gradient(ellipse_at_top,oklch(0.94_0.09_88/0.45),transparent_72%)] blur-2xl"
              style={{
                opacity: "calc(0.25 + var(--a) * 0.6)",
                transform: "scaleY(calc(0.7 + var(--p) * 0.6))",
              }}
            />
            <EdgeMark slug="bible" />


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
        <Stage glyphs="ⲑⲥ">
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
                  className="absolute"
                  style={
                    {
                      "--tx": `${s.x}px`,
                      "--ty": `${s.y}px`,
                      transform:
                        "translate(calc(var(--tx) * (0.35 + var(--p) * 0.65)), calc(var(--ty) * (0.35 + var(--p) * 0.65)))" +
                        ` scale(calc(0.72 + var(--p) * 0.28)) rotate(calc((1 - var(--p)) * ${s.r}deg))`,
                      opacity: `calc(var(--p) * 2.4 - ${i * 0.22})`,
                      filter: "blur(calc((1 - var(--p)) * 5px))",
                    } as CSSProperties
                  }
                >
                  <span className="block rounded-full border border-[oklch(0.86_0.12_86)/35] bg-white/8 px-3 py-1.5 font-arabic text-[10.5px] font-semibold text-[oklch(0.95_0.05_88)] shadow-[0_10px_30px_-14px_oklch(0.86_0.12_86/0.6)] backdrop-blur-md">
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
        <Stage glyphs="ⲡⲛ">
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
            <EdgeMark slug="church" />


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
        <Stage glyphs="ⲱⲁ">
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
                className="grid h-20 w-20 place-items-center rounded-full border border-[oklch(0.86_0.13_190)/45] bg-white/8 backdrop-blur-xl"
                style={{
                  transform: "scale(calc(0.7 + var(--a) * 0.34))",
                  filter: "blur(calc((1 - var(--a)) * 6px))",
                  boxShadow: "0 24px 60px -26px oklch(0.86 0.13 190 / 0.8)",
                }}
              >
                <span aria-hidden="true" className="font-display text-[30px] leading-none text-[oklch(0.95_0.06_190)]">
                  ⲁ
                </span>
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
        <Stage glyphs="ⲭⲱ">
          <Plate src={intro6} alt="قبة كنيسة قبطية مزخرفة بالذهب" depth={0.7} />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,oklch(0.3_0.05_290/0.28),oklch(0.09_0.02_285/0.88))]"
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
                        `translate(calc(${ux.toFixed(3)} * (250px - var(--p) * 88px)),` +
                        ` calc(${uy.toFixed(3)} * (250px - var(--p) * 88px)))` +
                        " scale(calc(0.5 + var(--p) * 0.42))",
                      opacity: `calc(var(--p) * 2.6 - ${0.15 + i * 0.05})`,
                      filter: "blur(calc((1 - var(--p)) * 4px))",
                    }}
                  >
                    <span className="block rounded-full border border-[oklch(0.86_0.12_86)/30] bg-white/8 px-2.5 py-1 font-arabic text-[9.5px] font-semibold whitespace-nowrap text-[oklch(0.95_0.05_88)] shadow-[0_8px_24px_-12px_oklch(0.86_0.12_86/0.7)] backdrop-blur-md">
                      {ar ? w.ar : w.en}
                    </span>

                  </span>
                );
              })}

              {/* Alpha core — the logo mark, lit like a gilded medallion */}
              <div
                className="relative grid h-36 w-36 place-items-center overflow-hidden rounded-full border border-[oklch(0.86_0.12_86)/55] bg-[oklch(0.975_0.015_86)]"
                style={{
                  transform: "scale(calc(0.72 + var(--p) * 0.34))",
                  boxShadow:
                    "0 30px 80px -30px oklch(0.86 0.12 86 / 0.75), inset 0 0 0 1px oklch(1 0 0 / 0.6)",
                }}
              >
                <img
                  src={alphaLogo.url}
                  alt="شعار ألفا"
                  className="h-[76%] w-[76%] object-contain"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_24%,oklch(1_0_0/0.28),transparent_66%)]"
                />
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

              {/* the slogan is lit, not faded in: warm gold bloom + gilded rules */}
              <div
                className="relative mt-8 flex flex-col items-center"
                style={{ opacity: "calc((var(--p) - 0.66) * 3.2)" }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -inset-x-10 top-1/2 h-14 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.88_0.12_86/0.35),transparent_72%)] blur-xl"
                  style={{ opacity: "calc((var(--p) - 0.7) * 3.6)" }}
                />
                <p
                  className="relative flex w-max flex-nowrap items-center gap-2 whitespace-nowrap font-manrope text-[7.5px] font-semibold tracking-[0.18em] uppercase"
                  dir="ltr"
                  style={{
                    color: "oklch(0.94 0.07 88)",
                    textShadow:
                      "0 0 14px oklch(0.88 0.12 86 / 0.45), 0 0 44px oklch(0.86 0.12 86 / 0.28), 0 1px 0 oklch(0.35 0.05 60 / 0.6)",
                  }}
                >
                  <span aria-hidden="true" className="font-display text-[16px] leading-none tracking-normal">
                    Ⲁ
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px bg-gradient-to-r from-transparent to-[oklch(0.9_0.11_87)]"
                    style={{ width: "calc(10px + (var(--p) - 0.66) * 46px)" }}
                  />
                  <span className="shrink-0">The Coptic Orthodox Digital Home</span>
                  <span
                    aria-hidden="true"
                    className="h-px bg-gradient-to-l from-transparent to-[oklch(0.9_0.11_87)]"
                    style={{ width: "calc(10px + (var(--p) - 0.66) * 46px)" }}
                  />
                  <span aria-hidden="true" className="font-display text-[16px] leading-none tracking-normal">
                    Ⲱ
                  </span>
                </p>
                {/* soft light reflection under the line */}
                <span
                  aria-hidden="true"
                  className="mt-1.5 block h-3 w-40 scale-y-[-1] bg-[linear-gradient(to_bottom,oklch(0.9_0.11_87/0.2),transparent)] blur-[2px]"
                  style={{ opacity: "calc((var(--p) - 0.76) * 3)" }}
                />
              </div>


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

/** A Coptic letter living inside the sky: parallax by depth, dissolving in light. */
function SkyGlyph({
  char,
  x,
  y,
  size,
  drift,
  depth,
  fade,
}: {
  char: string;
  x: string;
  y: string;
  size: number;
  drift: number;
  depth: number;
  fade: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute font-display leading-none text-[oklch(0.95_0.1_88)] select-none"
      style={{
        left: x,
        top: y,
        fontSize: `${size}px`,
        opacity: `calc(${fade} * (0.25 + var(--a) * 0.75) * max(0, 1 - var(--p) * 0.85))`,
        transform: `translate3d(calc(var(--p) * ${(drift * depth * 2).toFixed(1)}px), calc(var(--p) * ${drift.toFixed(1)}px), 0) scale(calc(1 + var(--p) * ${(depth * 0.5).toFixed(2)}))`,
        filter: `blur(calc(${(1 - depth).toFixed(2)} * 1.6px))`,
        textShadow: "0 0 18px oklch(0.9 0.12 86 / 0.55)",
        willChange: "transform",
      }}
    >
      {char}
    </span>
  );
}

/** A dove gliding across the sky, entirely driven by the scroll playhead. */
function Dove({
  x,
  y,
  size,
  speed,
  rise,
  start,
  opacity,
  blur,
}: {
  x: number;
  y: number;
  size: number;
  speed: number;
  rise: number;
  start: number;
  opacity: number;
  blur: number;
}) {
  return (
    <img
      src={dove}
      alt=""
      aria-hidden="true"
      width={816}
      height={816}
      loading="lazy"
      className="pointer-events-none absolute select-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        opacity: `calc(${opacity} * min(1, max(0, (var(--p) - ${start}) * 6)))`,
        transform: `translate3d(calc(max(0, var(--p) - ${start}) * ${speed}px), calc(max(0, var(--p) - ${start}) * ${rise}px), 0) rotate(calc(max(0, var(--p) - ${start}) * -5deg))`,
        filter: `blur(${blur}px) drop-shadow(0 0 12px oklch(0.92 0.09 88 / 0.45))`,
        willChange: "transform",
      }}
    />
  );
}

/** A single small shield resting at the edge of the frame, never over the art. */
function EdgeMark({ slug }: { slug: Parameters<typeof Shield>[0]["slug"] }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[8%] opacity-70 ltr:right-6 rtl:left-6"
      style={{
        opacity: "calc(var(--a) * 0.55)",
        transform: "translateY(calc((1 - var(--a)) * 14px))",
      }}
    >
      <Shield slug={slug} size="xs" />
    </span>
  );
}

function Section({ children, tall = false }: { children: ReactNode; tall?: boolean }) {
  return <section className={tall ? "relative h-[460vh]" : "relative h-[360vh]"}>{children}</section>;
}


function Stage({ children, glyphs = "ⲭⲣ" }: { children: ReactNode; glyphs?: string }) {
  const [g1, g2] = [glyphs[0] ?? "ⲭ", glyphs[1] ?? "ⲣ"];
  return (
    <div
      data-stage
      className="sticky top-0 h-screen w-full overflow-hidden [will-change:transform]"
      style={{ ["--p" as string]: 0, ["--a" as string]: 0, ["--c" as string]: 0, ["--d" as string]: 0 }}
    >
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
      {children}
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
        opacity: `calc((var(--p) - ${delay}) * 2.6)`,
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
