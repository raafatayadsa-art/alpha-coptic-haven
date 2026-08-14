import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from "react";

import intro1 from "@/assets/intro/intro-1-home.jpg";
import intro2 from "@/assets/intro/intro-2-bible.jpg";
import intro3 from "@/assets/intro/intro-3-spiritual.jpg";
import intro4 from "@/assets/intro/intro-4-community.jpg";
import intro5 from "@/assets/intro/intro-5-connect.jpg";
import intro6 from "@/assets/intro/intro-6-journey.jpg";
import { Screen } from "@/components/layout/Screen";
import { useLang } from "@/lib/i18n";

/**
 * Alpha — Intro / Onboarding (design prototype only).
 *
 * Six scenes, each with its own composition and visual concept:
 *  1. Cathedral light      — full-bleed light + Alpha monogram seal
 *  2. Manuscript stack     — tilted card stack + margin notes
 *  3. Icon screen arches   — dark candle sanctuary + arched tiles
 *  4. Overlapping card     — congregation photo + ivory floating panel
 *  5. Sonar orb            — aurora night + push-to-talk orb & bubbles
 *  6. Milestone path       — sunrise road + vertical journey timeline
 */

const T = {
  skip: { ar: "تخطّي", en: "Skip" },
  next: { ar: "التالي", en: "Next" },
  start: { ar: "ابدأ رحلتك", en: "Begin your journey" },
  back: { ar: "السابق", en: "Back" },
  of: { ar: "من", en: "of" },
} as const;

export const Route = createFileRoute("/intro")({
  head: () => ({
    meta: [
      { title: "ألفا — البيت الرقمي المسيحي | مقدمة التطبيق" },
      {
        name: "description",
        content:
          "تعرّف على ألفا: الكتاب المقدس، الأجبية والقطمارس والسنكسار، مجتمع كنيستك، والتواصل الصوتي — في بيت رقمي واحد.",
      },
      { property: "og:title", content: "ألفا — البيت الرقمي المسيحي" },
      {
        property: "og:description",
        content: "ستة مشاهد تقدّم لك ألفا: كلمة الله، الحياة الروحية، الكنيسة والمجتمع، وألفا كونكت.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IntroScreen,
});

/* ── shared atoms ───────────────────────────────────────────── */

function Kicker({ children, tone = "gold" }: { children: string; tone?: "gold" | "ivory" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-manrope text-[10px] font-semibold tracking-[0.22em] uppercase backdrop-blur-md ${
        tone === "gold"
          ? "border-[oklch(0.735_0.096_84/0.45)] bg-[oklch(0.735_0.096_84/0.14)] text-[oklch(0.46_0.07_78)]"
          : "border-white/30 bg-white/12 text-white/85"
      }`}
    >
      <span aria-hidden="true" className="font-display text-[12px] tracking-normal">
        ⲁ
      </span>
      {children}
    </span>
  );
}

function SceneCopy({
  title,
  body,
  dark,
  delay = 0,
}: {
  title: string;
  body: string;
  dark?: boolean;
  delay?: number;
}) {
  return (
    <div className="animate-fade-in" style={{ animationDelay: `${delay}ms` } as CSSProperties}>
      <h2
        className={`font-display text-[30px] leading-[1.25] font-semibold tracking-tight ${
          dark ? "text-white" : "text-[oklch(0.245_0.026_293)]"
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-3 font-manrope text-[13.5px] leading-[1.85] ${
          dark ? "text-white/72" : "text-[oklch(0.42_0.02_293)]"
        }`}
      >
        {body}
      </p>
    </div>
  );
}

/* ── scene 1 · cathedral light ──────────────────────────────── */

function SceneLight({ ar }: { ar: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[oklch(0.988_0.008_85)]">
      <img
        src={intro1}
        alt="نور الفجر يعبر نافذة الكنيسة وحمامة بيضاء"
        width={1024}
        height={1280}
        className="absolute inset-0 h-full w-full scale-105 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.988_0.008_85)] via-[oklch(0.988_0.008_85/0.35)] to-transparent" />

      {/* Gold seal with the Alpha / Omega monogram */}
      <div className="absolute top-[16%] left-1/2 -translate-x-1/2">
        <div className="relative grid h-28 w-28 place-items-center rounded-full border border-[oklch(0.735_0.096_84/0.5)] bg-[oklch(0.245_0.026_293/0.55)] shadow-[0_18px_50px_-18px_oklch(0.245_0.026_293/0.6)] backdrop-blur-xl">
          <span className="absolute inset-2 rounded-full border border-[oklch(0.85_0.08_84/0.6)]" />
          <span className="font-display text-[38px] leading-none text-[oklch(0.9_0.09_84)]">ⲁ</span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 px-7 pb-4 text-center">
        <div className="mx-auto max-w-[320px]">
          <Kicker>{ar ? "ألفا · ⲁ ⲱ" : "ALPHA · ⲁ ⲱ"}</Kicker>
          <div className="mt-4">
            <SceneCopy
              delay={80}
              title={ar ? "ألفا — البيت الرقمي المسيحي" : "Alpha — your Christian digital home"}
              body={
                ar
                  ? "كل ما يخصّ حياتك المسيحية في مكان واحد هادئ وجميل: كلمة الله، صلواتك، كنيستك، ومجتمعك."
                  : "Everything in your Christian life gathered in one calm, beautiful place: the Word, your prayers, your church, your people."
              }
            />
          </div>
          <span aria-hidden="true" className="mx-auto mt-5 block h-px w-16 bg-[oklch(0.735_0.096_84/0.5)]" />
        </div>
      </div>
    </div>
  );
}

/* ── scene 2 · manuscript stack ─────────────────────────────── */

function SceneBible({ ar }: { ar: boolean }) {
  const notes = ar
    ? ["قراءة يومية", "تأمّل وتظليل", "بحث ذكي", "حفظ الآيات"]
    : ["Daily reading", "Highlight & reflect", "Smart search", "Save verses"];
  return (
    <div className="relative h-full w-full overflow-hidden bg-[oklch(0.958_0.016_82)]">
      <span
        aria-hidden="true"
        className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-[oklch(0.735_0.096_84/0.18)] blur-3xl"
      />
      <div className="relative flex h-full flex-col justify-between px-7 pt-14 pb-5">
        <div>
          <Kicker>{ar ? "كلمة الله" : "The Word"}</Kicker>
          <div className="mt-4 max-w-[300px]">
            <SceneCopy
              title={ar ? "الكتاب المقدس بين يديك" : "Scripture in your hands"}
              body={
                ar
                  ? "اقرأ، تأمّل، ظلّل، وابحث في كل الأسفار — واحفظ الآيات التي لمست قلبك لتعود إليها."
                  : "Read, reflect, highlight and search every book — and keep the verses that moved you."
              }
            />
          </div>
        </div>

        {/* tilted manuscript stack — silky "book opening" entrance */}
        <div className="relative mx-auto h-[46%] w-full max-w-[300px] [perspective:1200px]">
          <div
            className="intro-leaf absolute inset-x-6 top-4 h-full rotate-[-7deg] rounded-[26px] border border-white/70 bg-white/60 shadow-[0_20px_40px_-24px_oklch(0.245_0.026_293/0.35)]"
            style={{ animationDelay: "260ms" } as CSSProperties}
          />
          <div
            className="intro-leaf absolute inset-x-3 top-2 h-full rotate-[-3deg] rounded-[26px] border border-white/80 bg-white/80 shadow-[0_24px_44px_-24px_oklch(0.245_0.026_293/0.35)]"
            style={{ animationDelay: "160ms" } as CSSProperties}
          />
          <div className="intro-book absolute inset-0 overflow-hidden rounded-[26px] border border-[oklch(0.735_0.096_84/0.4)] shadow-[0_30px_60px_-26px_oklch(0.245_0.026_293/0.5)]">
            <img
              src={intro2}
              alt="مخطوط مزخرَف بماء الذهب على رقّ"
              width={1024}
              height={1280}
              loading="lazy"
              className="intro-zoom h-full w-full object-cover"
            />
            {/* gilded light sweeping across the open page */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-white/45 to-transparent blur-md"
              style={{ animation: "intro-sweep 2.6s cubic-bezier(0.19,1,0.22,1) 0.5s both" } as CSSProperties}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pt-10 pb-4">
              <p className="intro-rise font-display text-[15px] leading-relaxed text-white/95" style={{ animationDelay: "700ms" } as CSSProperties}>
                {ar ? "«سِراجٌ لِرِجْلي كلامُك»" : "“Your word is a lamp to my feet”"}
              </p>
              <p className="intro-rise mt-1 font-manrope text-[10px] tracking-[0.18em] text-[oklch(0.85_0.08_84)] uppercase" style={{ animationDelay: "840ms" } as CSSProperties}>
                {ar ? "مزمور ١١٩ : ١٠٥" : "Psalm 119:105"}
              </p>
            </div>
          </div>
        </div>


        {/* margin notes */}
        <ul className="mt-5 grid grid-cols-2 gap-2">
          {notes.map((n, i) => (
            <li
              key={n}
              className="animate-fade-in flex items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-3 py-2 font-manrope text-[11.5px] font-semibold text-[oklch(0.34_0.02_293)] backdrop-blur-sm"
              style={{ animationDelay: `${120 + i * 70}ms` } as CSSProperties}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.735_0.096_84)]" />
              {n}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── scene 3 · icon-screen arches ───────────────────────────── */

function SceneSpiritual({ ar }: { ar: boolean }) {
  const arches = ar
    ? [
        { g: "ⲁ", t: "الأجبية", s: "سبع صلوات" },
        { g: "❖", t: "القطمارس", s: "قراءات اليوم" },
        { g: "✦", t: "السنكسار", s: "سيرة القديسين" },
        { g: "☩", t: "الخولاجي", s: "القداس الإلهي" },
      ]
    : [
        { g: "ⲁ", t: "Agpeya", s: "Seven hours" },
        { g: "❖", t: "Katameros", s: "Daily readings" },
        { g: "✦", t: "Synaxarium", s: "Lives of saints" },
        { g: "☩", t: "Khoulagy", s: "Divine liturgy" },
      ];
  return (
    <div className="relative h-full w-full overflow-hidden bg-[oklch(0.19_0.02_60)]">
      <img
        src={intro3}
        alt="شموع مضاءة أمام حجاب الأيقونات الذهبي"
        width={1024}
        height={1280}
        loading="lazy"
        className="absolute inset-x-0 top-0 h-[58%] w-full object-cover"
      />
      <div className="absolute inset-x-0 top-0 h-[58%] bg-gradient-to-b from-black/45 via-transparent to-[oklch(0.19_0.02_60)]" />

      <div className="relative flex h-full flex-col justify-end px-6 pb-5">
        <div className="max-w-[300px]">
          <Kicker tone="ivory">{ar ? "الحياة الروحية" : "Spiritual life"}</Kicker>
          <div className="mt-3">
            <SceneCopy
              dark
              title={ar ? "صلواتك وطقسك في نظام واحد" : "Your prayers, one rhythm"}
              body={
                ar
                  ? "الأجبية والقطمارس والسنكسار والخولاجي — بترتيب الكنيسة، بقراءة مريحة، وبتمرير تلقائي هادئ."
                  : "Agpeya, Katameros, Synaxarium and Khoulagy — in the Church's order, with calm guided reading."
              }
            />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-2.5">
          {arches.map((a, i) => (
            <div
              key={a.t}
              className="animate-fade-in rounded-t-[36px] rounded-b-2xl border border-[oklch(0.735_0.096_84/0.35)] bg-white/8 px-1.5 pt-4 pb-3 text-center backdrop-blur-md"
              style={{ animationDelay: `${100 + i * 80}ms` } as CSSProperties}
            >
              <span className="font-display text-[20px] text-[oklch(0.85_0.08_84)]">{a.g}</span>
              <p className="mt-2 font-manrope text-[10.5px] leading-tight font-semibold text-white">{a.t}</p>
              <p className="mt-0.5 font-manrope text-[8.5px] leading-tight text-white/55">{a.s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── scene 4 · overlapping ivory panel ──────────────────────── */

function SceneCommunity({ ar }: { ar: boolean }) {
  const stats = ar
    ? [
        { n: "٤٨٠+", l: "عضو" },
        { n: "١٢", l: "خدمة" },
        { n: "٦", l: "مناسبة" },
      ]
    : [
        { n: "480+", l: "members" },
        { n: "12", l: "services" },
        { n: "6", l: "events" },
      ];
  return (
    <div className="relative h-full w-full overflow-hidden bg-[oklch(0.988_0.008_85)]">
      <img
        src={intro4}
        alt="أسرة وأعضاء الكنيسة في فِناء الكنيسة وقت الغروب"
        width={1024}
        height={1280}
        loading="lazy"
        className="absolute inset-x-0 top-0 h-[64%] w-full object-cover"
      />
      <div className="absolute inset-x-0 top-0 h-[64%] bg-gradient-to-b from-black/25 to-transparent" />

      <div className="absolute top-[104px] right-6">
        <Kicker tone="ivory">{ar ? "الكنيسة والمجتمع" : "Church & community"}</Kicker>
      </div>

      {/* floating ivory panel overlapping the photo */}
      <div className="absolute inset-x-5 bottom-6">
        <div className="glass-card animate-fade-in rounded-[28px] border border-white/70 bg-white/82 p-5 shadow-[0_28px_60px_-26px_oklch(0.245_0.026_293/0.45)] backdrop-blur-xl">
          <SceneCopy
            title={ar ? "كنيستك معاك في جيبك" : "Your church, always with you"}
            body={
              ar
                ? "أخبار الكنيسة، مواعيد القداسات، الخدمات والمناسبات، وتفاعل حقيقي مع أسرتك الكنسية."
                : "Church news, liturgy times, services and events — with real, warm interaction."
            }
          />

          <div className="mt-4 flex items-center justify-between">
            <div className="flex -space-x-2 space-x-reverse">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-[oklch(0.868_0.043_296)] font-manrope text-[10px] font-bold text-[oklch(0.32_0.04_293)]"
                >
                  {["م", "ب", "ي", "+٩"][i]}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {stats.map((s) => (
                <div key={s.l} className="text-center">
                  <p className="font-display text-[16px] font-semibold text-[oklch(0.46_0.07_78)]">{s.n}</p>
                  <p className="font-manrope text-[9px] tracking-wide text-[oklch(0.5_0.02_293)]">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── scene 5 · sonar orb ────────────────────────────────────── */

function SceneConnect({ ar }: { ar: boolean }) {
  const bubbles = ar
    ? ["قناة الخدام · ٤ متصلين", "رسالة مشفَّرة · تُحذف تلقائيًا", "اضغط للتحدث"]
    : ["Servants channel · 4 live", "Encrypted · auto-delete", "Push to talk"];
  return (
    <div className="relative h-full w-full overflow-hidden bg-[oklch(0.16_0.03_200)]">
      <img
        src={intro5}
        alt="أمواج صوتية ذهبية وفيروزية على خلفية ليلية"
        width={1024}
        height={1280}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.16_0.03_200)] via-transparent to-[oklch(0.16_0.03_200/0.6)]" />

      <div className="relative flex h-full flex-col px-7 pt-14 pb-5">
        <Kicker tone="ivory">{ar ? "ألفا كونكت" : "Alpha Connect"}</Kicker>

        {/* PTT orb with sonar rings */}
        <div className="relative mt-8 grid place-items-center">
          <span className="absolute h-44 w-44 animate-[engage-halo_2.8s_ease-out_infinite] rounded-full border border-[oklch(0.82_0.13_180/0.35)]" />
          <span className="absolute h-32 w-32 rounded-full border border-[oklch(0.82_0.13_180/0.5)]" />
          <div className="relative grid h-24 w-24 place-items-center rounded-full border border-[oklch(0.735_0.096_84/0.6)] bg-[oklch(0.82_0.13_180/0.16)] shadow-[0_0_60px_-8px_oklch(0.82_0.13_180/0.6)] backdrop-blur-md">
            <span className="font-display text-[13px] font-semibold tracking-wide text-white">
              {ar ? "اضغط" : "TALK"}
            </span>
          </div>
          {/* waveform */}
          <div className="mt-6 flex items-end gap-1.5">
            {[10, 20, 34, 22, 44, 26, 16, 30, 12].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-[oklch(0.85_0.12_180/0.8)]"
                style={{ height: h }}
              />
            ))}
          </div>
        </div>

        {/* asymmetric floating bubbles */}
        <div className="mt-7 space-y-2.5">
          {bubbles.map((b, i) => (
            <div
              key={b}
              className={`animate-fade-in w-fit rounded-2xl border border-white/18 bg-white/10 px-4 py-2 font-manrope text-[11.5px] text-white/90 backdrop-blur-md ${
                i === 1 ? "ms-auto" : i === 2 ? "mx-auto" : ""
              }`}
              style={{ animationDelay: `${120 + i * 90}ms` } as CSSProperties}
            >
              {b}
            </div>
          ))}
        </div>

        <div className="mt-auto max-w-[300px]">
          <SceneCopy
            dark
            title={ar ? "تواصل صوتي ورسائل بأمان" : "Voice and messages, kept safe"}
            body={
              ar
                ? "قنوات صوتية، اضغط للتحدث، مجموعات ورسائل مشفَّرة بالحذف التلقائي — بدون فيديو، وبخصوصية كاملة."
                : "Voice channels, push-to-talk, groups and encrypted messages with auto-delete — voice only, fully private."
            }
          />
        </div>
      </div>
    </div>
  );
}

/* ── scene 6 · milestone path ───────────────────────────────── */

function SceneJourney({ ar, onStart }: { ar: boolean; onStart: () => void }) {
  const steps = ar
    ? ["صلاة الصباح", "قراءة اليوم", "قديس اليوم", "خدمة ومحبة"]
    : ["Morning prayer", "Today's reading", "Saint of the day", "Serve in love"];
  return (
    <div className="relative h-full w-full overflow-hidden bg-[oklch(0.988_0.008_85)]">
      <img
        src={intro6}
        alt="طريق يصعد إلى كنيسة صغيرة عند شروق الشمس"
        width={1024}
        height={1280}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.988_0.008_85)] via-[oklch(0.988_0.008_85/0.55)] to-transparent" />

      <div className="relative flex h-full flex-col justify-end px-7 pb-4">
        {/* vertical milestone path */}
        <ol className="relative mb-6 ms-2 space-y-3.5 border-s border-dashed border-[oklch(0.735_0.096_84/0.6)] ps-5">
          {steps.map((s, i) => (
            <li
              key={s}
              className="animate-fade-in relative font-manrope text-[12px] font-semibold text-[oklch(0.3_0.02_293)]"
              style={{ animationDelay: `${80 + i * 90}ms` } as CSSProperties}
            >
              <span className="absolute -start-[26px] top-1 grid h-3 w-3 place-items-center rounded-full border border-[oklch(0.735_0.096_84)] bg-white">
                <span className="h-1 w-1 rounded-full bg-[oklch(0.735_0.096_84)]" />
              </span>
              {s}
            </li>
          ))}
        </ol>

        <Kicker>{ar ? "رحلتك مع ألفا" : "Your journey"}</Kicker>
        <div className="mt-3 max-w-[310px]">
          <SceneCopy
            title={ar ? "رفيقك في كل يوم" : "A companion for every day"}
            body={
              ar
                ? "خطوة صغيرة كل يوم — صلاة، آية، وقديس يشجّعك. ألفا يسير معك في رحلتك المسيحية."
                : "One small step each day — a prayer, a verse, a saint. Alpha walks with you."
            }
          />
        </div>

        <button
          type="button"
          onClick={onStart}
          className="press mt-5 w-full rounded-2xl border border-[oklch(0.735_0.096_84/0.55)] bg-[oklch(0.245_0.026_293)] py-3.5 font-manrope text-[13.5px] font-semibold text-[oklch(0.988_0.008_85)] shadow-[0_18px_40px_-18px_oklch(0.245_0.026_293/0.6)]"
        >
          {ar ? T.start.ar : T.start.en}
        </button>
      </div>
    </div>
  );
}

/* ── shell · swipe + progress ───────────────────────────────── */

function IntroScreen() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const start = useRef<number | null>(null);
  const total = 6;

  const goTo = (n: number) => {
    const next = Math.max(0, Math.min(total - 1, n));
    if (next === i) return;
    setDir(next > i ? 1 : -1);
    setI(next);
  };
  const finish = () => navigate({ to: "/signup" });

  /* RTL: swiping right (positive dx) should move forward. */
  const onDown = (e: RPointerEvent) => {
    start.current = e.clientX;
  };
  const onUp = (e: RPointerEvent) => {
    if (start.current === null) return;
    const dx = e.clientX - start.current;
    start.current = null;
    if (Math.abs(dx) < 48) return;
    const forward = ar ? dx > 0 : dx < 0;
    if (forward) {
      if (i === total - 1) finish();
      else goTo(i + 1);
    } else goTo(i - 1);
  };

  const scenes = [
    <SceneLight key="s1" ar={ar} />,
    <SceneBible key="s2" ar={ar} />,
    <SceneSpiritual key="s3" ar={ar} />,
    <SceneCommunity key="s4" ar={ar} />,
    <SceneConnect key="s5" ar={ar} />,
    <SceneJourney key="s6" ar={ar} onStart={finish} />,
  ];
  const darkChrome = i === 2 || i === 4;

  return (
    <Screen withBottomNav={false} className="bg-[oklch(0.988_0.008_85)]">
      <div className="relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col">
        {/* top chrome — counter + skip only */}
        <div className="safe-top absolute inset-x-0 top-0 z-20">
          <div className="flex items-center justify-between px-5 pt-3">
            <span
              className={`font-manrope text-[10px] tracking-[0.2em] ${
                darkChrome ? "text-white/55" : "text-[oklch(0.5_0.02_293)]"
              }`}
            >
              {`${i + 1} ${ar ? T.of.ar : T.of.en} ${total}`}
            </span>
            <Link
              to="/signup"
              className={`font-manrope text-[11.5px] font-semibold ${
                darkChrome ? "text-white/75" : "text-[oklch(0.46_0.07_78)]"
              }`}
            >
              {ar ? T.skip.ar : T.skip.en}
            </Link>
          </div>
        </div>

        {/* scene stage */}
        <div
          className="relative flex-1 touch-pan-y select-none"
          onPointerDown={onDown}
          onPointerUp={onUp}
        >
          <div
            key={i}
            className={`absolute inset-0 ${dir === 1 ? "animate-[fade-in_0.45s_ease-out]" : "animate-[scale-in_0.4s_ease-out]"}`}
          >
            {scenes[i]}
          </div>
        </div>

        {/* footer controls — Next sits on the right and glows */}
        {i < total - 1 && (
          <div className="relative z-20 flex items-center gap-3 px-6 pt-3 pb-2">
            <button
              type="button"
              onClick={() => goTo(i + 1)}
              className="press relative flex items-center gap-2 overflow-hidden rounded-full border border-[oklch(0.82_0.11_86/0.75)] bg-linear-to-b from-[oklch(0.86_0.1_86/0.4)] to-[oklch(0.735_0.096_84/0.22)] px-6 py-2.5 font-manrope text-[12.5px] font-semibold shadow-[0_0_28px_-4px_oklch(0.8_0.12_86/0.7)] backdrop-blur-md transition-shadow duration-500 hover:shadow-[0_0_38px_-2px_oklch(0.8_0.12_86/0.9)]"
              style={{ color: darkChrome ? "oklch(0.97 0.03 86)" : "oklch(0.38 0.06 78)" } as CSSProperties}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-white/55 to-transparent"
                style={{ animation: "intro-sweep 2.8s ease-in-out infinite" } as CSSProperties}
              />
              <span className="relative">{ar ? T.next.ar : T.next.en}</span>
              <span aria-hidden="true" className="relative text-[14px] leading-none">
                {ar ? "‹" : "›"}
              </span>
            </button>
            <button
              type="button"
              onClick={() => goTo(i - 1)}
              disabled={i === 0}
              className={`ms-auto font-manrope text-[12px] font-semibold transition-opacity disabled:opacity-0 ${
                darkChrome ? "text-white/70" : "text-[oklch(0.5_0.02_293)]"
              }`}
            >
              {ar ? T.back.ar : T.back.en}
            </button>
          </div>
        )}

        <p
          className={`relative z-20 pb-1 text-center font-manrope text-[8.5px] font-semibold tracking-[0.2em] uppercase ${
            darkChrome ? "text-white/35" : "text-[oklch(0.5_0.02_293/0.55)]"
          }`}
        >
          <span aria-hidden="true" className="font-display">
            ⲁ
          </span>{" "}
          {ar ? "— البيت القبطي الأرثوذكسي الرقمي —" : "— The Coptic Orthodox Digital Home —"}{" "}
          <span aria-hidden="true" className="font-display">
            ⲱ
          </span>
        </p>

        {/* glowing golden progress bar — pinned to the very bottom */}
        <div className="safe-bottom relative z-20 px-5 pb-3">
          <div
            className={`relative h-[5px] w-full overflow-hidden rounded-full ${
              darkChrome ? "bg-white/12" : "bg-[oklch(0.245_0.026_293/0.1)]"
            }`}
          >
            <div
              className="absolute inset-y-0 start-0 rounded-full bg-linear-to-r from-[oklch(0.78_0.1_84)] via-[oklch(0.9_0.11_88)] to-[oklch(0.78_0.1_84)] shadow-[0_0_18px_2px_oklch(0.85_0.12_86/0.8)] transition-[width] duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
              style={{
                width: `${((i + 1) / total) * 100}%`,
                animation: "intro-progress-glow 2.4s ease-in-out infinite",
              } as CSSProperties}
            />
          </div>
          <div className="mt-1.5 flex gap-1.5">
            {Array.from({ length: total }).map((_, n) => (
              <button
                key={n}
                type="button"
                aria-label={`${ar ? "مشهد" : "Scene"} ${n + 1}`}
                onClick={() => goTo(n)}
                className={`h-[2px] flex-1 rounded-full transition-colors duration-500 ${
                  n <= i
                    ? "bg-[oklch(0.8_0.1_85/0.85)]"
                    : darkChrome
                      ? "bg-white/18"
                      : "bg-[oklch(0.245_0.026_293/0.12)]"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </Screen>
  );
}
