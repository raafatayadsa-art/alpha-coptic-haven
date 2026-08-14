import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import churchCover from "@/assets/church-cover.jpg";
import churchCrest from "@/assets/church-crest.png";
import contentAudio from "@/assets/content-audio.jpg";
import contentBook from "@/assets/content-book.jpg";
import oliveBranch from "@/assets/olive-branch.png";
import postCandles from "@/assets/post-candles.jpg";
import postYouth from "@/assets/post-youth.jpg";
import saintOfDay from "@/assets/saint-of-day.jpg";
import { EngageBar } from "@/components/church/EngageBar";


import {
  AgpeyaIcon,
  BellIcon,
  BibleIcon,
  ChevronRight,
  CopticCross,
  GroupsIcon,
  HeartIcon,
  KatamerosIcon,
  KhoulagyIcon,
  MembersIcon,
  SynaxariumIcon,
  VerifiedIcon,
} from "@/components/church/icons";
import { LibraryIcon, PlayIcon } from "@/components/church/media-icons";
import { LanguageToggle } from "@/components/church/LanguageToggle";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alpha Home — مساحتك الروحية اليومية" },
      {
        name: "description",
        content:
          "Alpha Home: verse and saint of the day, the prayer of the hour, your reading journey and the Spiritual Hub — Bible, Agpeya, Katameros, Synaxarium and more.",
      },
      { property: "og:title", content: "Alpha Home — مساحتك الروحية اليومية" },
      {
        property: "og:description",
        content: "A calm daily spiritual space: verse, saint, prayer, reading journey and community.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AlphaHome,
});

/* Presentation-only sample content — visual prototype, no data layer. */
const hub: { key: string; sub: string; icon: ReactNode; tone: "gold" | "lavender" | "parchment" }[] = [
  { key: "hm.hub.bible", sub: "hm.hub.sub.bible", icon: <BibleIcon className="size-6" />, tone: "gold" },
  { key: "hm.hub.agpeya", sub: "hm.hub.sub.agpeya", icon: <AgpeyaIcon className="size-6" />, tone: "lavender" },
  { key: "hm.hub.katameros", sub: "hm.hub.sub.katameros", icon: <KatamerosIcon className="size-6" />, tone: "parchment" },
  { key: "hm.hub.synaxarium", sub: "hm.hub.sub.synaxarium", icon: <SynaxariumIcon className="size-6" />, tone: "parchment" },
  { key: "hm.hub.khoulagy", sub: "hm.hub.sub.khoulagy", icon: <KhoulagyIcon className="size-6" />, tone: "lavender" },
  { key: "hm.hub.fathers", sub: "hm.hub.sub.fathers", icon: <MembersIcon className="size-6" />, tone: "gold" },
  { key: "hm.hub.library", sub: "hm.hub.sub.library", icon: <LibraryIcon className="size-6" />, tone: "gold" },
];


const hubTone: Record<"gold" | "lavender" | "parchment", string> = {
  gold: "bg-gold/12 text-gold ring-1 ring-gold/20",
  lavender: "bg-lavender/40 text-ink/70 ring-1 ring-lavender",
  parchment: "bg-parchment text-ink/55 ring-1 ring-ink/5",
};

const groups = [
  { key: "hm.community.g1", count: "٨٦" },
  { key: "hm.community.g2", count: "٤٢" },
  { key: "hm.community.g3", count: "٦٧" },
];

const events = [
  { key: "hm.events.e1", when: "hm.events.e1t", soon: true },
  { key: "hm.events.e2", when: "hm.events.e2t", soon: false },
  { key: "hm.events.e3", when: "hm.events.e3t", soon: false },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/35">
      {children}
    </span>
  );
}

function SectionHead({ title, action }: { title: string; action?: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3 px-1">
      <h2 className="font-display text-[19px] font-semibold tracking-tight">{title}</h2>
      {action ? (
        <button type="button" className="press text-[11px] font-medium text-gold">
          {action}
        </button>
      ) : null}
    </div>
  );
}

function AlphaHome() {
  const { t, dir, isArabic } = useLang();
  const arabic = isArabic ? "font-arabic" : "";

  return (
    <div
      dir={dir}
      className={`${arabic} mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden bg-ivory pb-10 text-ink selection:bg-gold/20`}
    >
      {/* Header — personal, not a dashboard bar */}
      <header className="safe-top safe-sticky-top sticky z-50 flex items-center justify-between gap-3 bg-ivory/80 px-5 pb-3.5 backdrop-blur-xl">
        <div className="flex min-w-0 items-center gap-2.5">
          <img
            src={churchCrest}
            alt=""
            width={40}
            height={40}
            className="size-9 shrink-0 object-contain"
          />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-[16px] font-semibold tracking-tight">
              {t("hm.greeting")}
            </span>
            <span className="mt-1 truncate text-[10px] font-medium tracking-[0.12em] text-ink/40">
              {t("hm.today")}
            </span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            aria-label={t("app.notifications")}
            className="press relative grid size-10 place-items-center rounded-full bg-parchment ring-1 ring-ink/5"
          >
            <BellIcon className="size-[18px] text-ink/60" />
            <span className="absolute end-2.5 top-2.5 size-1.5 rounded-full bg-gold ring-2 ring-parchment" />
          </button>
        </div>
      </header>

      <main className="space-y-9 px-4 pt-2">
        {/* 1 — Verse of the day: original lavender manuscript card */}
        <section className="animate-float-up relative overflow-hidden rounded-[32px] border border-lavender bg-lavender/30 p-7">
          <div className="absolute -end-10 -top-10 size-40 rounded-full bg-gold/15 blur-3xl" />
          <div className="relative">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              {t("hm.verse.eyebrow")}
            </span>
            <p className="mt-4 font-display text-[22px] italic leading-[1.45] text-pretty text-ink/85">
              {t("hm.verse.text")}
            </p>
            <div className="mt-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-2xl border border-white/70 bg-ivory/70">
                  <img
                    src={oliveBranch}
                    alt=""
                    width={512}
                    height={512}
                    loading="lazy"
                    className="size-8 object-contain"
                  />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55">
                  {t("hm.verse.ref")}
                </span>
              </div>
              <button
                type="button"
                className="press flex items-center gap-1.5 rounded-full bg-ivory/80 px-3 py-1.5 text-[11px] font-medium text-ink/60 ring-1 ring-ink/5"
              >
                <HeartIcon className="size-[13px]" />
                {t("hm.verse.save")}
              </button>
            </div>
            <EngageBar
              likes={565}
              comments={38}
              className="mt-5"
              seed={[
                { author: t("engage.c1.a"), text: t("engage.c1.t"), when: t("engage.c1.w") },
                { author: t("engage.c2.a"), text: t("engage.c2.t"), when: t("engage.c2.w") },
              ]}
            />
          </div>
        </section>


        {/* 2 — Saint of the day: image-led horizontal row */}
        <section>
          <SectionHead title={t("hm.saint.eyebrow")} />
          <div className="rounded-[30px] bg-card px-4 py-4 shadow-[var(--shadow-soft)] ring-1 ring-ink/5">
            <div className="flex items-stretch gap-4">
              <img
                src={saintOfDay}
                alt={t("hm.saint.name")}
                width={768}
                height={960}
                loading="lazy"
                className="size-[104px] shrink-0 rounded-[22px] object-cover ring-1 ring-gold/20"
              />
              <div className="flex min-w-0 flex-col justify-center">
                <h3 className="font-display text-[17px] font-semibold leading-snug tracking-tight">
                  {t("hm.saint.name")}
                </h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-ink/50">{t("hm.saint.line")}</p>
                <button
                  type="button"
                  className="press mt-3 flex w-fit items-center gap-1 text-[11.5px] font-semibold text-gold"
                >
                  {t("hm.saint.read")}
                  <ChevronRight className="size-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
            <EngageBar likes={214} comments={12} compact className="mt-3.5" />
          </div>
        </section>

        {/* 3 — Prayer of the day: quiet dark band for contrast */}
        <section className="overflow-hidden rounded-[30px] bg-ink px-6 py-6 text-ivory shadow-lift">
          <div className="flex items-center gap-2">
            <CopticCross className="size-4 text-gold" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory/45">
              {t("hm.prayer.eyebrow")}
            </span>
          </div>
          <h3 className="mt-3 font-display text-[21px] font-semibold tracking-tight">
            {t("hm.prayer.hour")}
          </h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-ivory/60">{t("hm.prayer.line")}</p>
          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              className="press flex items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-[12px] font-semibold text-ink"
            >
              <PlayIcon className="size-[14px]" />
              {t("hm.prayer.start")}
            </button>
            <span className="text-[11px] text-ivory/45">{t("hm.prayer.minutes")}</span>
          </div>
          <EngageBar likes={111} comments={9} tone="dark" compact className="mt-5" />
        </section>

        {/* 4 — Continue reading + reading journey */}
        <section className="space-y-3">
          <SectionHead title={t("hm.continue.eyebrow")} />
          <div className="rounded-[26px] bg-card px-5 py-4 shadow-[var(--shadow-soft)] ring-1 ring-ink/5">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-display text-[16px] font-semibold tracking-tight">
                  {t("hm.continue.title")}
                </h3>
                <p className="mt-1 text-[11px] text-ink/45">{t("hm.continue.progress")}</p>
              </div>
              <button
                type="button"
                className="press shrink-0 rounded-full bg-ink px-4 py-2 text-[11.5px] font-semibold text-ivory"
              >
                {t("hm.continue.resume")}
              </button>
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-parchment">
              <div className="h-full w-[62%] rounded-full bg-gold" />
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-[26px] bg-lavender/35 px-5 py-4 ring-1 ring-lavender">
            <div className="flex shrink-0 items-end gap-[3px]">
              {[7, 11, 9, 14, 12, 17, 20].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h * 1.5}px` }}
                  className="w-1.5 rounded-full bg-gold/70"
                />
              ))}
            </div>
            <div className="min-w-0">
              <Eyebrow>{t("hm.journey.eyebrow")}</Eyebrow>
              <p className="mt-1 font-display text-[16px] font-semibold tracking-tight">
                {t("hm.journey.streak")}
              </p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-ink/45">
                {t("hm.journey.line")}
              </p>
            </div>
          </div>
        </section>

        {/* 5 — Spiritual Hub: large card carousel (original design) */}
        <section className="-mx-4">
          <div className="flex items-end justify-between px-5">
            <div>
              <Eyebrow>{t("hm.hub.eyebrow")}</Eyebrow>
              <h2 className="mt-1 font-display text-[26px] font-semibold tracking-tight">
                {t("hm.hub.title")}
              </h2>
              <p className="mt-0.5 text-[12px] text-ink/45">{t("hm.hub.line")}</p>
            </div>
            <button type="button" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
              {t("app.viewAll")}
            </button>
          </div>

          <div className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-5 pb-4">
            {hub.map((item) => (
              <button
                key={item.key}
                type="button"
                className="press group w-[148px] flex-none snap-center rounded-[26px] border border-ink/5 bg-parchment p-4 text-start shadow-[var(--shadow-soft)]"
              >
                <span
                  className={`grid size-12 place-items-center rounded-2xl ${hubTone[item.tone]}`}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <h3 className="mt-4 font-display text-[19px] font-semibold leading-tight tracking-tight">
                  {t(item.key)}
                </h3>
                <p
                  className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.12em] text-ink/45"
                  dir="ltr"
                >
                  {t(item.sub)}
                </p>
                <span className="mt-4 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
                  {t("app.open")}
                  <ChevronRight className="size-3 transition-transform duration-500 group-hover:translate-x-0.5 rtl:rotate-180" />
                </span>
              </button>
            ))}
          </div>
        </section>


        {/* 6 — A glimpse of my church */}
        <section>
          <SectionHead title={t("hm.church.eyebrow")} />
          <div className="relative overflow-hidden rounded-[30px] ring-1 ring-ink/10">
            <img
              src={churchCover}
              alt={t("app.church")}
              width={800}
              height={520}
              loading="lazy"
              className="h-[190px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
              <span className="flex items-center gap-1.5 text-[10px] font-medium text-gold">
                <VerifiedIcon className="size-3.5" />
                {t("app.brand")}
              </span>
              <h3 className="mt-1.5 font-display text-[18px] font-semibold leading-snug tracking-tight">
                {t("app.churchShort")}
              </h3>
              <p className="mt-1 text-[11px] text-ivory/70">{t("hm.church.line")}</p>
              <Link
                to="/my-church"
                className="press mt-3 inline-flex items-center gap-1.5 rounded-full bg-ivory/95 px-4 py-2 text-[11.5px] font-semibold text-ink"
              >
                {t("hm.church.open")}
                <ChevronRight className="size-3.5 rtl:rotate-180" />
              </Link>
            </div>
          </div>
          <EngageBar likes={498} comments={31} compact className="mt-3 px-1" />
        </section>

        {/* 7 — A glimpse of Alpha Connect */}
        <section className="rounded-[30px] bg-card px-6 py-6 shadow-[var(--shadow-soft)] ring-1 ring-gold/15">
          <div className="flex items-center gap-2.5">
            <img src={churchCrest} alt="" width={36} height={36} className="size-8 object-contain" />
            <Eyebrow>{t("hm.connect.eyebrow")}</Eyebrow>
          </div>
          <p className="mt-3 font-display text-[17px] font-medium leading-relaxed tracking-tight text-ink/80">
            {t("hm.connect.line")}
          </p>
          <button
            type="button"
            className="press mt-4 flex items-center gap-1 text-[11.5px] font-semibold text-gold"
          >
            {t("hm.connect.cta")}
            <ChevronRight className="size-3.5 rtl:rotate-180" />
          </button>
          <EngageBar likes={176} comments={8} compact className="mt-4" />
        </section>

        {/* 8 — Community */}
        <section>
          <SectionHead title={t("hm.community.eyebrow")} action={t("app.viewAll")} />
          <p className="mb-3 px-1 text-[11.5px] text-ink/45">{t("hm.community.line")}</p>
          <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
            {groups.map((group) => (
              <div
                key={group.key}
                className="w-[152px] shrink-0 rounded-[24px] bg-parchment px-4 py-4 ring-1 ring-ink/5"
              >
                <span className="grid size-10 place-items-center rounded-2xl bg-ivory text-ink/55 ring-1 ring-ink/5">
                  <GroupsIcon className="size-5" />
                </span>
                <h3 className="mt-3 truncate font-display text-[15px] font-semibold tracking-tight">
                  {t(group.key)}
                </h3>
                <p className="mt-0.5 text-[11px] text-ink/45">
                  {group.count} {t("hm.community.members")}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 9 — Occasions & events, as a calm timeline */}
        <section>
          <SectionHead title={t("hm.events.eyebrow")} action={t("app.viewAll")} />
          <ol className="relative space-y-5 ps-5">
            <span className="absolute inset-y-1 start-[3px] w-px bg-gradient-to-b from-gold/50 via-ink/10 to-transparent" />
            {events.map((event) => (
              <li key={event.key} className="relative">
                <span
                  className={`absolute -start-5 top-1.5 size-[7px] rounded-full ${
                    event.soon ? "bg-gold ring-4 ring-gold/15" : "bg-ink/20"
                  }`}
                />
                <h3 className="font-display text-[16px] font-semibold tracking-tight">
                  {t(event.key)}
                </h3>
                <p className="mt-0.5 text-[11.5px] text-ink/45">{t(event.when)}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 9.5 — Alpha feed: mixed-size, explorable cards */}
        <section className="space-y-3.5">
          <div className="mb-1 px-1">
            <Eyebrow>{t("hm.feed.eyebrow")}</Eyebrow>
            <h2 className="mt-1 font-display text-[19px] font-semibold tracking-tight">
              {t("hm.feed.line")}
            </h2>
          </div>

          {/* Lead card — largest, image-led */}
          <article className="overflow-hidden rounded-[28px] bg-card shadow-[var(--shadow-soft)] ring-1 ring-ink/5">
            <div className="relative">
              <img
                src={postCandles}
                alt=""
                width={800}
                height={520}
                loading="lazy"
                className="h-[168px] w-full object-cover"
              />
              <span className="absolute start-3 top-3 rounded-full bg-ivory/85 px-2.5 py-1 text-[10px] font-medium text-ink/65 backdrop-blur-md">
                {t("hm.feed.p1.tag")}
              </span>
            </div>
            <div className="px-4 pb-3.5 pt-3.5">
              <h3 className="font-display text-[16.5px] font-semibold leading-snug tracking-tight">
                {t("hm.feed.p1.title")}
              </h3>
              <p className="mt-1.5 text-[12px] leading-relaxed text-ink/50">{t("hm.feed.p1.line")}</p>
              <EngageBar
                likes={342}
                comments={27}
                className="mt-3.5"
                seed={[{ author: t("engage.c2.a"), text: t("engage.c2.t"), when: t("engage.c2.w") }]}
              />
            </div>
          </article>

          {/* Medium row card */}
          <article className="flex items-center gap-3.5 rounded-[24px] bg-parchment px-3.5 py-3.5 ring-1 ring-ink/5">
            <img
              src={postYouth}
              alt=""
              width={240}
              height={240}
              loading="lazy"
              className="size-[72px] shrink-0 rounded-[18px] object-cover"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                {t("hm.feed.p2.tag")}
              </span>
              <h3 className="mt-1 truncate font-display text-[15px] font-semibold tracking-tight">
                {t("hm.feed.p2.title")}
              </h3>
              <EngageBar likes={128} comments={11} compact className="mt-2 border-ink/8" />
            </div>
          </article>

          {/* Two small cards — lighter weight content */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { tag: "hm.feed.p3.tag", title: "hm.feed.p3.title", img: contentAudio, likes: 76, comments: 4 },
              { tag: "hm.feed.p4.tag", title: "hm.feed.p4.title", img: contentBook, likes: 54, comments: 3 },
            ].map((card) => (
              <article
                key={card.title}
                className="overflow-hidden rounded-[22px] bg-card shadow-[var(--shadow-soft)] ring-1 ring-ink/5"
              >
                <img
                  src={card.img}
                  alt=""
                  width={400}
                  height={260}
                  loading="lazy"
                  className="h-[84px] w-full object-cover"
                />
                <div className="px-3 pb-2.5 pt-2.5">
                  <span className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                    {t(card.tag)}
                  </span>
                  <h3 className="mt-1 line-clamp-2 font-display text-[13px] font-semibold leading-snug tracking-tight">
                    {t(card.title)}
                  </h3>
                  <EngageBar likes={card.likes} comments={card.comments} compact className="mt-2.5" />
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            className="press mx-auto flex items-center gap-1 rounded-full bg-parchment px-4 py-2 text-[11.5px] font-semibold text-ink/60 ring-1 ring-ink/5"
          >
            {t("hm.feed.more")}
            <ChevronRight className="size-3.5 rtl:rotate-180" />
          </button>
        </section>

        {/* 10 — Soft footer */}
        <footer className="flex flex-col items-center gap-2 pb-2 pt-2 text-center">
          <CopticCross className="size-5 text-gold/60" />
          <p className="font-display text-[14px] italic text-ink/45">{t("hm.footer")}</p>
          <span className="text-[10px] uppercase tracking-[0.24em] text-ink/25">
            {t("app.brand")}
          </span>
        </footer>
      </main>
    </div>
  );
}
