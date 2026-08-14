import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import churchCover from "@/assets/church-cover.jpg";
import churchCrest from "@/assets/church-crest.png";
import oliveBranch from "@/assets/olive-branch.png";
import saintOfDay from "@/assets/saint-of-day.jpg";

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
const hub: { key: string; icon: ReactNode; tone: "gold" | "lavender" | "parchment" }[] = [
  { key: "hm.hub.bible", icon: <BibleIcon className="size-[22px]" />, tone: "gold" },
  { key: "hm.hub.agpeya", icon: <AgpeyaIcon className="size-[22px]" />, tone: "lavender" },
  { key: "hm.hub.katameros", icon: <KatamerosIcon className="size-[22px]" />, tone: "parchment" },
  { key: "hm.hub.synaxarium", icon: <SynaxariumIcon className="size-[22px]" />, tone: "parchment" },
  { key: "hm.hub.khoulagy", icon: <KhoulagyIcon className="size-[22px]" />, tone: "lavender" },
  { key: "hm.hub.fathers", icon: <MembersIcon className="size-[22px]" />, tone: "gold" },
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
        {/* 1 — Verse of the day: editorial, full width, no card grid */}
        <section className="relative overflow-hidden rounded-[34px] bg-parchment px-6 py-8 ring-1 ring-gold/15">
          <img
            src={oliveBranch}
            alt=""
            width={220}
            height={220}
            className="pointer-events-none absolute -end-8 -top-8 size-40 opacity-25"
          />
          <Eyebrow>{t("hm.verse.eyebrow")}</Eyebrow>
          <p className="mt-4 font-display text-[24px] font-medium leading-[1.55] tracking-tight text-ink">
            {t("hm.verse.text")}
          </p>
          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="text-[12px] font-medium text-gold">{t("hm.verse.ref")}</span>
            <button
              type="button"
              className="press flex items-center gap-1.5 rounded-full bg-ivory/80 px-3 py-1.5 text-[11px] font-medium text-ink/60 ring-1 ring-ink/5"
            >
              <HeartIcon className="size-[13px]" />
              {t("hm.verse.save")}
            </button>
          </div>
        </section>

        {/* 2 — Saint of the day: image-led horizontal row */}
        <section>
          <SectionHead title={t("hm.saint.eyebrow")} />
          <div className="flex items-stretch gap-4 rounded-[30px] bg-card px-4 py-4 shadow-[var(--shadow-soft)] ring-1 ring-ink/5">
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

        {/* 5 — Spiritual Hub */}
        <section>
          <div className="mb-3 px-1">
            <Eyebrow>{t("hm.hub.eyebrow")}</Eyebrow>
            <h2 className="mt-1 font-display text-[19px] font-semibold tracking-tight">
              {t("hm.hub.title")}
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {hub.map((item) => (
              <button
                key={item.key}
                type="button"
                className="press flex flex-col items-center gap-2.5 rounded-[24px] bg-card px-2 py-4 text-center ring-1 ring-ink/5"
              >
                <span className={`grid size-11 place-items-center rounded-2xl ${hubTone[item.tone]}`}>
                  {item.icon}
                </span>
                <span className="text-[11px] font-medium leading-tight text-ink/70">
                  {t(item.key)}
                </span>
              </button>
            ))}
          </div>
          {/* Library gets a wider tile — hierarchy, not sameness */}
          <button
            type="button"
            className="press mt-2.5 flex w-full items-center justify-between gap-3 rounded-[24px] bg-parchment px-5 py-4 ring-1 ring-ink/5"
          >
            <span className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-ivory text-gold ring-1 ring-gold/20">
                <LibraryIcon className="size-[22px]" />
              </span>
              <span className="font-display text-[16px] font-semibold tracking-tight">
                {t("hm.hub.library")}
              </span>
            </span>
            <ChevronRight className="size-4 text-ink/30 rtl:rotate-180" />
          </button>
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
