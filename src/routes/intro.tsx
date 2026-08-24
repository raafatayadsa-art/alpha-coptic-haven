import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent, type ReactNode } from "react";

import intro1 from "@/assets/intro/intro-1-home.jpg";
import intro2 from "@/assets/intro/intro-2-bible.jpg";
import intro3 from "@/assets/intro/intro-3-spiritual.jpg";
import intro4 from "@/assets/intro/intro-4-community.jpg";
import intro5 from "@/assets/intro/intro-5-connect.jpg";
import intro6 from "@/assets/intro/intro-6-journey.jpg";
import { Screen } from "@/components/layout/Screen";
import { useLang } from "@/lib/i18n";

/**
 * Alpha — Intro / Onboarding (visual design prototype only).
 *
 * One cinematic language across all six scenes:
 *  - full-bleed edge-to-edge photograph with a slow ken-burns drift
 *  - gilded veil bloom + deep scrim so text always reads
 *  - blurred staggered entrance for every text block and accent module
 *  - gilded segment progress rail at the very bottom
 */

const T = {
  skip: { ar: "تخطّي", en: "Skip" },
  next: { ar: "التالي", en: "Next" },
  start: { ar: "ابدأ رحلتك", en: "Begin your journey" },
  back: { ar: "السابق", en: "Back" },
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

/* ── shared cinematic scene shell ───────────────────────────── */

type SceneProps = {
  ar: boolean;
  index: number;
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`intro-lift ${className}`} style={{ animationDelay: `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

function Kicker({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.85_0.09_86/0.5)] bg-[oklch(0.98_0.02_86/0.12)] px-3.5 py-1.5 font-manrope text-[9.5px] font-semibold tracking-[0.26em] text-[oklch(0.93_0.06_86)] uppercase backdrop-blur-md">
      <span aria-hidden="true" className="font-display text-[12px] tracking-normal">
        ⲁ
      </span>
      {children}
    </span>
  );
}

/**
 * Full-bleed cinematic stage shared by every scene:
 * image → ken-burns, gilded bloom, deep bottom scrim, then content.
 */
function Stage({
  image,
  alt,
  eager,
  kicker,
  title,
  body,
  children,
  footer,
}: {
  image: string;
  alt: string;
  eager?: boolean;
  kicker: string;
  title: string;
  body: string;
  children?: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[oklch(0.16_0.02_290)]">
      <img
        src={image}
        alt={alt}
        width={1024}
        height={1280}
        loading={eager ? "eager" : "lazy"}
        className="intro-kenburns absolute inset-0 h-full w-full object-cover"
      />

      {/* cinematic scrims — top breath, deep bottom bed for the copy */}
      <div className="intro-veil absolute inset-0 bg-gradient-to-b from-[oklch(0.16_0.02_290/0.55)] via-[oklch(0.16_0.02_290/0.1)] to-[oklch(0.13_0.02_290/0.92)]" />
      <div className="intro-veil absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[oklch(0.12_0.02_290/0.96)] via-[oklch(0.13_0.02_290/0.7)] to-transparent" />
      {/* gilded bloom */}
      <span
        aria-hidden="true"
        className="intro-glow-pulse pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[oklch(0.82_0.11_86/0.28)] blur-3xl"
      />

      {/* content — sits on the deep bed, never cramped */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col px-6 pb-[124px]">
        {children ? <div className="mb-5">{children}</div> : null}

        <Reveal delay={60}>{<Kicker>{kicker}</Kicker>}</Reveal>

        <Reveal delay={170}>
          <h2 className="mt-4 max-w-[330px] font-display text-[31px] leading-[1.22] font-semibold tracking-tight text-white">
            {title}
          </h2>
        </Reveal>

        <Reveal delay={280}>
          <p className="mt-3 max-w-[330px] font-manrope text-[13px] leading-[1.9] text-white/70">{body}</p>
        </Reveal>

        {footer ? <Reveal delay={390}>{footer}</Reveal> : null}

        <Reveal delay={480}>
          <span aria-hidden="true" className="mt-5 block h-px w-20 bg-[oklch(0.85_0.09_86/0.55)]" />
        </Reveal>
      </div>
    </div>
  );
}

/* small glass modules, each with its own staggered entrance */

function GlassChips({ items, delay = 0 }: { items: string[]; delay?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {items.map((n, i) => (
        <li
          key={n}
          className="intro-lift flex items-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-3 py-2 font-manrope text-[11px] font-semibold text-white/88 backdrop-blur-md"
          style={{ animationDelay: `${delay + i * 90}ms` } as CSSProperties}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.85_0.1_86)]" />
          {n}
        </li>
      ))}
    </ul>
  );
}

/* ── scene 1 · cathedral light ──────────────────────────────── */

function SceneLight({ ar }: SceneProps) {
  return (
    <Stage
      eager
      image={intro1}
      alt="نور الفجر يعبر نافذة الكنيسة وحمامة بيضاء"
      kicker={ar ? "ألفا · ⲁ ⲱ" : "ALPHA · ⲁ ⲱ"}
      title={ar ? "ألفا — البيت الرقمي المسيحي" : "Alpha — your Christian digital home"}
      body={
        ar
          ? "كل ما يخصّ حياتك المسيحية في مكان واحد هادئ وجميل: كلمة الله، صلواتك، كنيستك، ومجتمعك."
          : "Everything in your Christian life gathered in one calm, beautiful place: the Word, your prayers, your church, your people."
      }
    >
      <Reveal>
        <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full border border-[oklch(0.85_0.09_86/0.55)] bg-[oklch(0.16_0.02_290/0.45)] shadow-[0_22px_60px_-20px_oklch(0.82_0.11_86/0.55)] backdrop-blur-xl">
          <span className="absolute inset-2 rounded-full border border-[oklch(0.9_0.08_86/0.45)]" />
          <span className="font-display text-[36px] leading-none text-[oklch(0.92_0.09_86)]">ⲁ</span>
        </div>
      </Reveal>
    </Stage>
  );
}

/* ── scene 2 · the Word ─────────────────────────────────────── */

function SceneBible({ ar }: SceneProps) {
  return (
    <Stage
      image={intro2}
      alt="مخطوط مزخرَف بماء الذهب على رقّ"
      kicker={ar ? "كلمة الله" : "The Word"}
      title={ar ? "الكتاب المقدس بين يديك" : "Scripture in your hands"}
      body={
        ar
          ? "اقرأ، تأمّل، ظلّل، وابحث في كل الأسفار — واحفظ الآيات التي لمست قلبك لتعود إليها."
          : "Read, reflect, highlight and search every book — and keep the verses that moved you."
      }
      footer={
        <div className="mt-5">
          <GlassChips
            delay={430}
            items={
              ar
                ? ["قراءة يومية", "تأمّل وتظليل", "بحث ذكي", "حفظ الآيات"]
                : ["Daily reading", "Highlight & reflect", "Smart search", "Save verses"]
            }
          />
        </div>
      }
    >
      <Reveal>
        <figure className="relative overflow-hidden rounded-[24px] border border-[oklch(0.85_0.09_86/0.35)] bg-white/6 px-5 py-4 backdrop-blur-md">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-white/35 to-transparent blur-md"
            style={{ animation: "intro-sweep 3.2s cubic-bezier(0.19,1,0.22,1) 0.6s both" } as CSSProperties}
          />
          <blockquote className="relative font-display text-[16px] leading-relaxed text-white/95">
            {ar ? "«سِراجٌ لِرِجْلي كلامُك»" : "“Your word is a lamp to my feet”"}
          </blockquote>
          <figcaption className="relative mt-1.5 font-manrope text-[9.5px] tracking-[0.22em] text-[oklch(0.88_0.09_86)] uppercase">
            {ar ? "مزمور 119 : 105" : "Psalm 119:105"}
          </figcaption>
        </figure>
      </Reveal>
    </Stage>
  );
}

/* ── scene 3 · spiritual rhythm ─────────────────────────────── */

function SceneSpiritual({ ar }: SceneProps) {
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
    <Stage
      image={intro3}
      alt="شموع مضاءة أمام حجاب الأيقونات الذهبي"
      kicker={ar ? "الحياة الروحية" : "Spiritual life"}
      title={ar ? "صلواتك وطقسك في نظام واحد" : "Your prayers, one rhythm"}
      body={
        ar
          ? "الأجبية والقطمارس والسنكسار والخولاجي — بترتيب الكنيسة، بقراءة مريحة، وبتمرير تلقائي هادئ."
          : "Agpeya, Katameros, Synaxarium and Khoulagy — in the Church's order, with calm guided reading."
      }
      footer={
        <div className="mt-5 grid grid-cols-4 gap-2.5">
          {arches.map((a, i) => (
            <div
              key={a.t}
              className="intro-lift rounded-t-[34px] rounded-b-2xl border border-[oklch(0.85_0.09_86/0.32)] bg-white/8 px-1.5 pt-4 pb-3 text-center backdrop-blur-md"
              style={{ animationDelay: `${420 + i * 90}ms` } as CSSProperties}
            >
              <span className="font-display text-[19px] text-[oklch(0.89_0.09_86)]">{a.g}</span>
              <p className="mt-2 font-manrope text-[10px] leading-tight font-semibold text-white">{a.t}</p>
              <p className="mt-0.5 font-manrope text-[8px] leading-tight text-white/55">{a.s}</p>
            </div>
          ))}
        </div>
      }
    />
  );
}

/* ── scene 4 · church & community ───────────────────────────── */

function SceneCommunity({ ar }: SceneProps) {
  const stats = ar
    ? [
        { n: "480+", l: "عضو" },
        { n: "12", l: "خدمة" },
        { n: "6", l: "مناسبة" },
      ]
    : [
        { n: "480+", l: "members" },
        { n: "12", l: "services" },
        { n: "6", l: "events" },
      ];
  return (
    <Stage
      image={intro4}
      alt="أسرة وأعضاء الكنيسة في فِناء الكنيسة وقت الغروب"
      kicker={ar ? "الكنيسة والمجتمع" : "Church & community"}
      title={ar ? "كنيستك معاك في جيبك" : "Your church, always with you"}
      body={
        ar
          ? "أخبار الكنيسة، مواعيد القداسات، الخدمات والمناسبات، وتفاعل حقيقي مع أسرتك الكنسية."
          : "Church news, liturgy times, services and events — with real, warm interaction."
      }
      footer={
        <div className="intro-lift mt-5 flex items-center justify-between rounded-[24px] border border-white/14 bg-white/8 px-4 py-3 backdrop-blur-md" style={{ animationDelay: "430ms" } as CSSProperties}>
          <div className="flex -space-x-2 space-x-reverse">
            {["م", "ب", "ي", "+9"].map((c) => (
              <span
                key={c}
                className="grid h-8 w-8 place-items-center rounded-full border-2 border-white/70 bg-[oklch(0.55_0.06_296)] font-manrope text-[10px] font-bold text-white"
              >
                {c}
              </span>
            ))}
          </div>
          <div className="flex gap-3.5">
            {stats.map((s) => (
              <div key={s.l} className="text-center">
                <p className="font-display text-[16px] font-semibold text-[oklch(0.9_0.09_86)]">{s.n}</p>
                <p className="font-manrope text-[8.5px] tracking-wide text-white/60">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}

/* ── scene 5 · Alpha Connect ────────────────────────────────── */

function SceneConnect({ ar }: SceneProps) {
  const bubbles = ar
    ? ["قناة الخدام · 4 متصلين", "رسالة مشفَّرة · تُحذف تلقائيًا", "اضغط للتحدث"]
    : ["Servants channel · 4 live", "Encrypted · auto-delete", "Push to talk"];
  return (
    <Stage
      image={intro5}
      alt="أمواج صوتية ذهبية وفيروزية على خلفية ليلية"
      kicker={ar ? "ألفا كونكت" : "Alpha Connect"}
      title={ar ? "تواصل صوتي ورسائل بأمان" : "Voice and messages, kept safe"}
      body={
        ar
          ? "قنوات صوتية، اضغط للتحدث، مجموعات ورسائل مشفَّرة بالحذف التلقائي — بدون فيديو، وبخصوصية كاملة."
          : "Voice channels, push-to-talk, groups and encrypted messages with auto-delete — voice only, fully private."
      }
    >
      <div className="space-y-4">
        <Reveal>
          <div className="relative grid place-items-center">
            <span className="absolute h-36 w-36 animate-[engage-halo_2.8s_ease-out_infinite] rounded-full border border-[oklch(0.82_0.13_180/0.35)]" />
            <span className="absolute h-26 w-26 rounded-full border border-[oklch(0.82_0.13_180/0.5)]" />
            <div className="relative grid h-20 w-20 place-items-center rounded-full border border-[oklch(0.85_0.09_86/0.6)] bg-[oklch(0.82_0.13_180/0.16)] shadow-[0_0_60px_-8px_oklch(0.82_0.13_180/0.6)] backdrop-blur-md">
              <span className="font-display text-[13px] font-semibold tracking-wide text-white">
                {ar ? "اضغط" : "TALK"}
              </span>
            </div>
          </div>
        </Reveal>

        <div className="space-y-2">
          {bubbles.map((b, i) => (
            <div
              key={b}
              className={`intro-lift w-fit rounded-2xl border border-white/16 bg-white/10 px-4 py-2 font-manrope text-[11px] text-white/90 backdrop-blur-md ${
                i === 1 ? "ms-auto" : i === 2 ? "mx-auto" : ""
              }`}
              style={{ animationDelay: `${140 + i * 100}ms` } as CSSProperties}
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

/* ── scene 6 · the journey ──────────────────────────────────── */

function SceneJourney({ ar, onStart }: SceneProps & { onStart: () => void }) {
  const steps = ar
    ? ["صلاة الصباح", "قراءة اليوم", "قديس اليوم", "خدمة ومحبة"]
    : ["Morning prayer", "Today's reading", "Saint of the day", "Serve in love"];
  return (
    <Stage
      image={intro6}
      alt="طريق يصعد إلى كنيسة صغيرة عند شروق الشمس"
      kicker={ar ? "رحلتك مع ألفا" : "Your journey"}
      title={ar ? "رفيقك في كل يوم" : "A companion for every day"}
      body={
        ar
          ? "خطوة صغيرة كل يوم — صلاة، آية، وقديس يشجّعك. ألفا يسير معك في رحلتك المسيحية."
          : "One small step each day — a prayer, a verse, a saint. Alpha walks with you."
      }
      footer={
        <button
          type="button"
          onClick={onStart}
          className="press intro-lift relative mt-5 w-full overflow-hidden rounded-2xl border border-[oklch(0.85_0.09_86/0.6)] bg-linear-to-b from-[oklch(0.88_0.1_86/0.35)] to-[oklch(0.78_0.1_84/0.2)] py-3.5 font-manrope text-[13.5px] font-semibold text-white shadow-[0_0_34px_-6px_oklch(0.84_0.12_86/0.8)] backdrop-blur-md"
          style={{ animationDelay: "430ms" } as CSSProperties}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-white/45 to-transparent"
            style={{ animation: "intro-sweep 3s ease-in-out infinite" } as CSSProperties}
          />
          <span className="relative">{ar ? T.start.ar : T.start.en}</span>
        </button>
      }
    >
      <ol className="ms-2 space-y-3 border-s border-dashed border-[oklch(0.85_0.09_86/0.5)] ps-5">
        {steps.map((s, i) => (
          <li
            key={s}
            className="intro-lift relative font-manrope text-[11.5px] font-semibold text-white/88"
            style={{ animationDelay: `${100 + i * 100}ms` } as CSSProperties}
          >
            <span className="absolute -start-[26px] top-1 grid h-3 w-3 place-items-center rounded-full border border-[oklch(0.88_0.09_86)] bg-[oklch(0.16_0.02_290)]">
              <span className="h-1 w-1 rounded-full bg-[oklch(0.9_0.09_86)]" />
            </span>
            {s}
          </li>
        ))}
      </ol>
    </Stage>
  );
}

/* ── shell · swipe + gilded segment progress ────────────────── */

function IntroScreen() {
  const { lang } = useLang();
  const ar = lang === "ar";
  const navigate = useNavigate();
  const [i, setI] = useState(0);
  const start = useRef<number | null>(null);
  const total = 6;

  const goTo = (n: number) => {
    const next = Math.max(0, Math.min(total - 1, n));
    if (next !== i) setI(next);
  };
  const finish = () => navigate({ to: "/signup" });

  /* RTL: swiping right (positive dx) moves forward. */
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
    <SceneLight key="s1" ar={ar} index={0} />,
    <SceneBible key="s2" ar={ar} index={1} />,
    <SceneSpiritual key="s3" ar={ar} index={2} />,
    <SceneCommunity key="s4" ar={ar} index={3} />,
    <SceneConnect key="s5" ar={ar} index={4} />,
    <SceneJourney key="s6" ar={ar} index={5} onStart={finish} />,
  ];

  return (
    <Screen withBottomNav={false} className="bg-[oklch(0.13_0.02_290)]">
      {/* full-height, edge-to-edge cinematic stage */}
      <div
        className="relative mx-auto h-screen min-h-screen w-full max-w-[430px] touch-pan-y overflow-hidden select-none"
        onPointerDown={onDown}
        onPointerUp={onUp}
      >
        <div key={i} className="absolute inset-0">
          {scenes[i]}
        </div>

        {/* top chrome — Alpha mark + skip */}
        <div className="safe-top absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-3">
          <span className="font-display text-[15px] leading-none text-[oklch(0.92_0.09_86)]" aria-hidden="true">
            ⲁ
          </span>
          <Link to="/signup" className="font-manrope text-[11px] font-semibold tracking-wide text-white/70">
            {ar ? T.skip.ar : T.skip.en}
          </Link>
        </div>

        {/* bottom chrome — controls + gilded segment rail */}
        <div className="safe-bottom absolute inset-x-0 bottom-0 z-20 px-5 pb-3">
          {i < total - 1 && (
            <div className="mb-3 flex items-center gap-3">
              <button
                type="button"
                onClick={() => goTo(i + 1)}
                className="press relative flex items-center gap-2 overflow-hidden rounded-full border border-[oklch(0.85_0.09_86/0.7)] bg-linear-to-b from-[oklch(0.88_0.1_86/0.35)] to-[oklch(0.78_0.1_84/0.2)] px-6 py-2.5 font-manrope text-[12.5px] font-semibold text-white shadow-[0_0_30px_-6px_oklch(0.84_0.12_86/0.85)] backdrop-blur-md"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-linear-to-r from-transparent via-white/50 to-transparent"
                  style={{ animation: "intro-sweep 3s ease-in-out infinite" } as CSSProperties}
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
                className="ms-auto font-manrope text-[12px] font-semibold text-white/65 transition-opacity disabled:opacity-0"
              >
                {ar ? T.back.ar : T.back.en}
              </button>
            </div>
          )}

          {/* segment rail: each scene owns a gilded capsule that fills */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: total }).map((_, n) => (
              <button
                key={n}
                type="button"
                aria-label={`${ar ? "مشهد" : "Scene"} ${n + 1}`}
                aria-current={n === i}
                onClick={() => goTo(n)}
                className={`relative h-[3px] overflow-hidden rounded-full bg-white/16 transition-all duration-500 ${
                  n === i ? "flex-[2.2]" : "flex-1"
                }`}
              >
                {n <= i ? (
                  <span
                    className={`absolute inset-0 rounded-full bg-linear-to-r from-[oklch(0.8_0.1_84)] via-[oklch(0.94_0.1_88)] to-[oklch(0.8_0.1_84)] ${
                      n === i ? "intro-seg-fill" : ""
                    } ${n === i ? "shadow-[0_0_14px_1px_oklch(0.88_0.12_86/0.9)]" : "opacity-70"}`}
                    style={{ transformOrigin: ar ? "right center" : "left center" } as CSSProperties}
                  />
                ) : null}
              </button>
            ))}
          </div>

          <p className="mt-2 text-center font-manrope text-[8px] font-semibold tracking-[0.24em] text-white/35 uppercase">
            <span aria-hidden="true" className="font-display">
              ⲁ
            </span>{" "}
            {ar ? "— البيت القبطي الأرثوذكسي الرقمي —" : "— The Coptic Orthodox Digital Home —"}{" "}
            <span aria-hidden="true" className="font-display">
              ⲱ
            </span>
          </p>
        </div>
      </div>
    </Screen>
  );
}
