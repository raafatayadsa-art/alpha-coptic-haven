import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import churchCover from "@/assets/church-cover.jpg";
import lifeEvents from "@/assets/life/life-events.jpg";
import lifeFamilies from "@/assets/life/life-families.jpg";
import lifeGroups from "@/assets/life/life-groups.jpg";
import lifeHelp from "@/assets/life/life-help.jpg";
import lifeMembers from "@/assets/life/life-members.jpg";
import lifeServices from "@/assets/life/life-services.jpg";
import postCandles from "@/assets/post-candles.jpg";
import postYouth from "@/assets/post-youth.jpg";
import priest1 from "@/assets/priest-1.jpg";
import priest2 from "@/assets/priest-2.jpg";
import priest3 from "@/assets/priest-3.jpg";
import profileAvatar from "@/assets/profile-avatar.jpg";

import { EngageBar } from "@/components/church/EngageBar";
import { VisibilityChip, type Visibility } from "@/components/church/ContentCard";
import {
  BellIcon,
  ChevronRight,
  CopticCross,
  EventsIcon,
  GroupsIcon,
  HeartIcon,
  LocationIcon,
  MembersIcon,
} from "@/components/church/icons";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "مجتمعي — Alpha Coptic" },
      {
        name: "description",
        content:
          "مجتمعي في ألفا القبطية: مشاركات الكنيسة، طلبات الصلاة، المجموعات والاكتشاف، ولحظات المجتمع في مكان واحد هادئ.",
      },
      { property: "og:title", content: "مجتمعي — Alpha Coptic" },
      {
        property: "og:description",
        content: "A calm community space: shared moments, prayer requests, groups and gatherings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommunityScreen,
});

/* Presentation-only sample content — visual prototype, no data layer. */
const moments = [
  { key: "cm.moment.1", image: churchCover, fresh: true },
  { key: "cm.moment.2", image: postYouth, fresh: true },
  { key: "cm.moment.3", image: lifeServices, fresh: true },
  { key: "cm.moment.4", image: lifeFamilies, fresh: false },
  { key: "cm.moment.5", image: postCandles, fresh: false },
];

const filters = [
  "cm.filter.all",
  "cm.filter.groups",
  "cm.filter.prayers",
  "cm.filter.blessings",
  "cm.filter.events",
] as const;

const composerKinds = [
  "cm.composer.kind.share",
  "cm.composer.kind.prayer",
  "cm.composer.kind.thanks",
  "cm.composer.kind.question",
] as const;

const privacies: Visibility[] = ["public", "members", "private"];

const posts = [
  {
    id: "cm.post.1",
    avatar: priest2,
    image: postYouth,
    role: "cm.role.servant",
    visibility: "public" as Visibility,
    likes: 142,
    comments: 18,
  },
  {
    id: "cm.post.2",
    avatar: priest3,
    image: postCandles,
    role: "cm.role.member",
    visibility: "members" as Visibility,
    likes: 86,
    comments: 9,
  },
];

const groups = [
  { id: "cm.group.1", image: postYouth, count: 184 },
  { id: "cm.group.2", image: lifeHelp, count: 96 },
  { id: "cm.group.3", image: lifeFamilies, count: 212 },
  { id: "cm.group.4", image: lifeGroups, count: 74 },
];

const discover = [
  { id: "cm.discover.1", icon: <LocationIcon className="size-[17px]" /> },
  { id: "cm.discover.2", icon: <GroupsIcon className="size-[17px]" /> },
  { id: "cm.discover.3", icon: <MembersIcon className="size-[17px]" /> },
];

const circleAvatars = [priest1, priest2, priest3, profileAvatar, lifeMembers];

/* Small shared bits ------------------------------------------------ */

function SectionHead({ title, caption }: { title: string; caption?: string }) {
  const { t } = useLang();
  return (
    <div className="flex items-end justify-between px-5">
      <div className="min-w-0">
        <h2 className="font-display text-[26px] font-semibold tracking-tight">{t(title)}</h2>
        {caption && <p className="mt-0.5 text-[12px] text-ink/45">{t(caption)}</p>}
      </div>
      <button
        type="button"
        className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-gold"
      >
        {t("app.viewAll")}
      </button>
    </div>
  );
}

/** Coptic hairline divider between feed clusters. */
function CopticRule() {
  return (
    <div className="flex items-center gap-3 px-10 py-1" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/25" />
      <CopticCross className="size-3.5 text-gold/45" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/25" />
    </div>
  );
}

function CommunityScreen() {
  const { t, dir, isArabic } = useLang();
  const arabic = isArabic ? "font-arabic" : "";

  const [composerOpen, setComposerOpen] = useState(false);
  const [kind, setKind] = useState<string>(composerKinds[0]);
  const [scope, setScope] = useState<"public" | "group">("public");
  const [privacy, setPrivacy] = useState<Visibility>("public");
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState<string>(filters[0]);
  const [praying, setPraying] = useState(false);
  const [going, setGoing] = useState(false);
  const [joined, setJoined] = useState<string[]>(["cm.group.1"]);
  const [inCircle, setInCircle] = useState(false);

  const pill = (on: boolean) =>
    `press h-8 shrink-0 rounded-full px-3.5 text-[11.5px] font-medium transition-colors duration-300 ${
      on ? "bg-gold/12 text-gold ring-1 ring-gold/60" : "bg-parchment/80 text-ink/60 ring-1 ring-ink/5"
    }`;

  return (
    <div
      dir={dir}
      className={`${arabic} mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden safe-nav-gap bg-ivory text-ink selection:bg-gold/20`}
    >
      {/* 1 — Header */}
      <header className="safe-top safe-sticky-top sticky z-50 flex items-center justify-between border-b border-ink/5 bg-ivory/75 px-5 pb-3.5 backdrop-blur-xl">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gold/10 ring-1 ring-gold/25">
            <GroupsIcon className="size-[18px] text-gold" />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-[17px] font-semibold tracking-tight">
              {t("cm.title")}
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ink/40">
              {t("cm.sub")}
            </span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label={t("cm.search")}
            className="press grid size-10 place-items-center rounded-full bg-parchment ring-1 ring-ink/5"
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-[18px] text-ink/60">
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
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

      <main>
        {/* 2 — Opening section: community pulse */}
        <section className="px-4 pt-4">
          <div className="glass-card animate-float-up relative overflow-hidden rounded-[30px] p-5 shadow-lift">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -end-12 -top-14 size-44 rounded-full bg-gradient-to-br from-lavender/35 via-gold/12 to-transparent blur-2xl"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-[26px] border border-gold/15"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 start-4 font-display text-[110px] leading-none text-ink/[0.035]"
            >
              Ⲁ
            </span>

            <div className="relative flex items-center gap-3">
              <img
                src={profileAvatar}
                alt=""
                width={96}
                height={96}
                className="size-11 shrink-0 rounded-full object-cover ring-2 ring-gold/30"
              />
              <div className="min-w-0">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-gold">
                  {t("cm.pulse.eyebrow")}
                </p>
                <h1 className="mt-1 truncate font-display text-[20px] font-semibold leading-tight tracking-tight">
                  {t("hm.greet.morning")} {t("hm.user.name")}
                </h1>
              </div>
            </div>

            <div className="relative mt-4 rounded-[22px] bg-lavender/25 p-3.5 ring-1 ring-ink/5">
              <div className="flex items-center gap-2">
                <span className="size-1.5 animate-pulse rounded-full bg-gold" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/45">
                  {t("cm.circle.eyebrow")}
                </span>
              </div>
              <p className="mt-1.5 font-display text-[16px] font-semibold leading-snug">
                {t("cm.pulse.status")}
              </p>
              <p className="mt-1 text-[11px] text-ink/50">{t("cm.pulse.statusMeta")}</p>
            </div>

            <div className="relative mt-4 flex items-center justify-between border-y border-ink/8 py-3">
              {[
                ["cm.pulse.members", "1,248"],
                ["cm.pulse.groups", "4"],
                ["cm.pulse.prayers", "38"],
              ].map(([label, value], i) => (
                <div key={label} className="flex flex-1 flex-col items-center gap-0.5">
                  <span className="font-display text-[18px] font-semibold leading-none">{value}</span>
                  <span className="text-[10px] text-ink/45">{t(label)}</span>
                  {i < 2 && (
                    <span aria-hidden="true" className="absolute" />
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setComposerOpen(true)}
              className="press relative mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gold text-[13px] font-semibold text-ink shadow-soft"
            >
              <CopticCross className="size-4" />
              {t("cm.pulse.share")}
            </button>
          </div>
        </section>

        {/* 3 — Moments rail */}
        <section className="mt-9">
          <div className="px-5">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              {t("cm.moments")}
            </h2>
          </div>
          <div className="no-scrollbar mt-3.5 flex gap-3.5 overflow-x-auto px-5 pb-1">
            <button type="button" className="press flex w-[64px] shrink-0 flex-col items-center gap-1.5">
              <span className="grid size-[62px] place-items-center rounded-full border border-dashed border-gold/40 bg-parchment text-gold">
                <span className="font-display text-[24px] leading-none">+</span>
              </span>
              <span className="w-full truncate text-center text-[9.5px] text-ink/50">
                {t("cm.moments.add")}
              </span>
            </button>
            {moments.map((m) => (
              <button
                key={m.key}
                type="button"
                className="press flex w-[64px] shrink-0 flex-col items-center gap-1.5"
              >
                <span
                  className={`grid size-[62px] place-items-center rounded-full p-[2px] ${
                    m.fresh
                      ? "bg-gradient-to-tr from-gold via-gold/50 to-lavender"
                      : "bg-ink/10"
                  }`}
                >
                  <img
                    src={m.image}
                    alt={t(m.key)}
                    width={124}
                    height={124}
                    loading="lazy"
                    className="size-full rounded-full object-cover ring-2 ring-ivory"
                  />
                </span>
                <span className="w-full truncate text-center text-[9.5px] text-ink/50">
                  {t(m.key)}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 4 — Mini composer */}
        <section className="mt-7 px-4">
          <div className="glass-card flex items-center gap-3 rounded-[24px] p-2.5">
            <img
              src={profileAvatar}
              alt=""
              width={96}
              height={96}
              className="size-9 shrink-0 rounded-full object-cover ring-1 ring-ink/8"
            />
            <button
              type="button"
              onClick={() => setComposerOpen(true)}
              className="min-w-0 flex-1 text-start text-[12px] text-ink/40"
            >
              {t("cm.composer.hint")}
            </button>
            <div className="flex shrink-0 items-center gap-1.5">
              {[
                { key: "cm.composer.photo", icon: <EventsIcon className="size-[15px]" /> },
                { key: "cm.composer.prayer", icon: <CopticCross className="size-[15px]" /> },
                { key: "cm.composer.blessing", icon: <HeartIcon className="size-[15px]" /> },
              ].map((a) => (
                <button
                  key={a.key}
                  type="button"
                  aria-label={t(a.key)}
                  onClick={() => setComposerOpen(true)}
                  className="press grid size-8 place-items-center rounded-full bg-parchment text-gold ring-1 ring-gold/20"
                >
                  {a.icon}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 5 — Filter rail */}
        <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto px-5 pb-1">
          {filters.map((f) => (
            <button key={f} type="button" onClick={() => setFilter(f)} className={pill(filter === f)}>
              {t(f)}
            </button>
          ))}
        </div>

        {/* 6 — Feed */}
        <section className="mt-7">
          <SectionHead title="cm.feed" caption="cm.feed.caption" />

          <div className="mt-5 space-y-4 px-4">
            {/* Share card */}
            {posts.slice(0, 1).map((p) => (
              <article key={p.id} className="glass-card rounded-[26px] p-3.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src={p.avatar}
                    alt=""
                    width={96}
                    height={96}
                    loading="lazy"
                    className="size-9 shrink-0 rounded-full object-cover ring-1 ring-ink/8"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-semibold leading-tight">
                      {t(`${p.id}.author`)}
                    </p>
                    <p className="mt-0.5 text-[10px] text-ink/45">
                      {t(p.role)} · {t(`${p.id}.when`)}
                    </p>
                  </div>
                  <VisibilityChip value={p.visibility} />
                </div>

                <p className="mt-3 line-clamp-3 text-[12.5px] leading-relaxed text-ink/70">
                  {t(`${p.id}.text`)}
                </p>

                <div className="mt-3 overflow-hidden rounded-[20px]">
                  <img
                    src={p.image}
                    alt={t(`${p.id}.text`)}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>

                <EngageBar
                  className="mt-3"
                  likes={p.likes}
                  comments={p.comments}
                  seed={[{ author: t("cm.post.1.author"), text: t(`${p.id}.comment`), when: t(`${p.id}.when`) }]}
                />
              </article>
            ))}

            {/* Prayer request card */}
            <article className="relative overflow-hidden rounded-[26px] bg-lavender/35 p-5 text-center ring-1 ring-ink/6 shadow-soft">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 -top-10 h-24 rounded-full bg-gold/20 blur-2xl"
              />
              <span className="relative mx-auto grid size-11 place-items-center rounded-full bg-ivory/80 ring-1 ring-gold/30">
                <CopticCross className="size-5 text-gold" />
              </span>
              <p className="relative mt-3 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-gold">
                {t("cm.prayer.eyebrow")}
              </p>
              <p className="relative mt-2.5 font-display text-[18px] font-medium leading-relaxed text-ink/85">
                {t("cm.prayer.text")}
              </p>
              <p className="relative mt-2 text-[11px] text-ink/50">
                {t("cm.prayer.author")} · {t("cm.prayer.count")}
              </p>
              <button
                type="button"
                onClick={() => setPraying((v) => !v)}
                aria-pressed={praying}
                className={`press relative mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-full px-6 text-[12.5px] font-semibold transition-colors duration-300 ${
                  praying
                    ? "bg-gold/15 text-gold ring-1 ring-gold/60"
                    : "bg-ink text-ivory shadow-soft"
                }`}
              >
                <HeartIcon className={`size-4 ${praying ? "engage-beat" : ""}`} />
                {praying ? t("cm.prayer.prayed") : t("cm.prayer.pray")}
              </button>
            </article>

            <CopticRule />

            {/* Testimony card */}
            <article className="relative overflow-hidden rounded-[26px] bg-parchment p-5 ring-1 ring-ink/6 shadow-soft">
              <span
                aria-hidden="true"
                className="absolute inset-y-5 start-0 w-[3px] rounded-full bg-gradient-to-b from-gold to-gold/20"
              />
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-gold">
                {t("cm.blessing.eyebrow")}
              </p>
              <p className="mt-2.5 font-display text-[19px] font-medium leading-relaxed text-ink/85">
                {t("cm.blessing.text")}
              </p>
              <p className="mt-3 text-[11px] text-ink/50">{t("cm.blessing.author")}</p>
            </article>

            {/* Second share card */}
            {posts.slice(1).map((p) => (
              <article key={p.id} className="glass-card rounded-[26px] p-3.5">
                <div className="flex items-center gap-2.5">
                  <img
                    src={p.avatar}
                    alt=""
                    width={96}
                    height={96}
                    loading="lazy"
                    className="size-9 shrink-0 rounded-full object-cover ring-1 ring-ink/8"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-semibold leading-tight">
                      {t(`${p.id}.author`)}
                    </p>
                    <p className="mt-0.5 text-[10px] text-ink/45">
                      {t(p.role)} · {t(`${p.id}.when`)}
                    </p>
                  </div>
                  <VisibilityChip value={p.visibility} />
                </div>

                <p className="mt-3 line-clamp-3 text-[12.5px] leading-relaxed text-ink/70">
                  {t(`${p.id}.text`)}
                </p>

                <div className="mt-3 overflow-hidden rounded-[20px]">
                  <img
                    src={p.image}
                    alt={t(`${p.id}.text`)}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>

                <EngageBar
                  className="mt-3"
                  likes={p.likes}
                  comments={p.comments}
                  seed={[{ author: t("cm.post.2.author"), text: t(`${p.id}.comment`), when: t(`${p.id}.when`) }]}
                />
              </article>
            ))}

            {/* Gathering card */}
            <article className="glass-card flex items-center gap-3 rounded-[24px] p-3">
              <span className="grid size-14 shrink-0 place-items-center rounded-[18px] bg-gold/12 ring-1 ring-gold/25">
                <span className="font-display text-[19px] font-semibold leading-none text-gold">18</span>
                <span className="mt-0.5 text-[9px] text-ink/50">{t("cm.event.day")}</span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-gold">
                  {t("cm.event.eyebrow")}
                </p>
                <h3 className="mt-1 truncate font-display text-[15.5px] font-semibold leading-tight">
                  {t("cm.event.title")}
                </h3>
                <p className="mt-0.5 truncate text-[11px] text-ink/45">{t("cm.event.place")}</p>
              </div>
              <button
                type="button"
                onClick={() => setGoing((v) => !v)}
                aria-pressed={going}
                className={`press h-9 shrink-0 rounded-full px-3.5 text-[11.5px] font-semibold transition-colors duration-300 ${
                  going ? "bg-gold/15 text-gold ring-1 ring-gold/60" : "bg-ink text-ivory"
                }`}
              >
                {going ? t("cm.event.confirmed") : t("cm.event.going")}
              </button>
            </article>
          </div>
        </section>

        {/* 7 — Groups & discovery */}
        <section className="mt-11">
          <SectionHead title="cm.groups" caption="cm.groups.caption" />

          <div className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-5 pb-2">
            {groups.map((g) => {
              const on = joined.includes(g.id);
              return (
                <article
                  key={g.id}
                  className="press glass-card w-[176px] shrink-0 snap-center overflow-hidden rounded-[26px] p-2.5 text-start"
                >
                  <div className="relative overflow-hidden rounded-[20px]">
                    <img
                      src={g.image}
                      alt={t(g.id)}
                      width={352}
                      height={264}
                      loading="lazy"
                      className="h-[104px] w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                    <span className="absolute bottom-2 start-2 grid size-7 place-items-center rounded-full bg-ivory/85 backdrop-blur-md">
                      <CopticCross className="size-3.5 text-gold" />
                    </span>
                    <span className="absolute end-2 top-2 rounded-full bg-ivory/85 px-2 py-0.5 text-[9.5px] font-medium text-ink/70 backdrop-blur-md">
                      {t(`${g.id}.kind`)}
                    </span>
                  </div>

                  <h3 className="mt-2.5 truncate px-0.5 font-display text-[15px] font-semibold leading-tight">
                    {t(g.id)}
                  </h3>
                  <p className="mt-1 px-0.5 text-[10.5px] text-ink/45">
                    {g.count.toLocaleString("en-US")} {t("cm.group.members")}
                  </p>

                  <div className="mt-2.5 flex items-center gap-1.5 px-0.5">
                    <button
                      type="button"
                      onClick={() =>
                        setJoined((list) =>
                          list.includes(g.id) ? list.filter((x) => x !== g.id) : [...list, g.id],
                        )
                      }
                      aria-pressed={on}
                      className={`press h-8 flex-1 rounded-full text-[11px] font-semibold transition-colors duration-300 ${
                        on ? "bg-gold/15 text-gold ring-1 ring-gold/50" : "bg-gold text-ink"
                      }`}
                    >
                      {on ? t("cm.group.joined") : t("cm.group.join")}
                    </button>
                    <Link
                      to="/connect"
                      className="press grid size-8 shrink-0 place-items-center rounded-full bg-parchment text-ink/45 ring-1 ring-ink/5"
                      aria-label={t("cm.group.chat")}
                      title={t("cm.group.chat")}
                    >
                      <ChevronRight className="size-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-5 space-y-2.5 px-4">
            <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
              {t("cm.discover")}
            </p>
            {discover.map((d) => (
              <button
                key={d.id}
                type="button"
                className="press glass-card flex w-full items-center gap-3 rounded-[22px] p-3 text-start"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-[16px] bg-gold/10 text-gold ring-1 ring-gold/20">
                  {d.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold leading-tight">
                    {t(d.id)}
                  </span>
                  <span className="mt-0.5 block truncate text-[10.5px] text-ink/45">
                    {t(`${d.id}.sub`)}
                  </span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-ink/25 rtl:rotate-180" />
              </button>
            ))}
          </div>
        </section>

        {/* 8 — Prayer circle */}
        <section className="mt-11 px-4">
          <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-b from-lavender/45 to-ivory p-5 ring-1 ring-ink/6 shadow-soft">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full bg-gold/15 blur-2xl"
            />
            <div className="relative flex items-center gap-2">
              <span className="size-1.5 animate-pulse rounded-full bg-gold" />
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-gold">
                {t("cm.circle.eyebrow")}
              </p>
            </div>

            <div className="relative mt-4 flex items-center gap-3">
              <div className="flex items-center">
                {circleAvatars.map((a, i) => (
                  <img
                    key={i}
                    src={a}
                    alt=""
                    width={96}
                    height={96}
                    loading="lazy"
                    className="size-9 rounded-full object-cover ring-2 ring-ivory"
                    style={{ marginInlineStart: i === 0 ? 0 : -12 }}
                  />
                ))}
                <span className="ms-[-12px] grid size-9 place-items-center rounded-full bg-ink text-[10px] font-semibold text-ivory ring-2 ring-ivory">
                  +29
                </span>
              </div>
            </div>

            <p className="relative mt-3.5 font-display text-[17px] font-semibold leading-snug">
              {t("cm.circle.count")}
            </p>
            <p className="relative mt-1 text-[11px] text-ink/50">{t("cm.circle.timer")}</p>

            <button
              type="button"
              onClick={() => setInCircle((v) => !v)}
              aria-pressed={inCircle}
              className={`press relative mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full text-[13px] font-semibold transition-colors duration-300 ${
                inCircle
                  ? "bg-gold/15 text-gold ring-1 ring-gold/60"
                  : "bg-ink text-ivory shadow-soft"
              }`}
            >
              <CopticCross className="size-4" />
              {inCircle ? t("cm.circle.joined") : t("cm.circle.join")}
            </button>
          </div>
        </section>

        {/* 9 — Profile touchpoint */}
        <section className="mt-7 px-4">
          <Link
            to="/profile"
            className="press glass-card flex items-center gap-3 rounded-[22px] p-3"
          >
            <img
              src={profileAvatar}
              alt=""
              width={96}
              height={96}
              className="size-10 shrink-0 rounded-full object-cover ring-1 ring-gold/25"
            />
            <span className="min-w-0 flex-1 text-[11px] text-ink/55">
              {t("cm.me.posts")} 12 · {t("cm.me.prayers")} 38 · {t("cm.me.groups")} 4
            </span>
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
              {t("cm.me.open")}
            </span>
            <ChevronRight className="size-4 shrink-0 text-ink/25 rtl:rotate-180" />
          </Link>
        </section>

        {/* 10 — Soft footer */}
        <footer className="mt-12 flex flex-col items-center gap-3 px-8 pb-10">
          <CopticCross className="size-5 text-gold/60" />
          <p className="text-center text-[11px] tracking-[0.14em] text-ink/35">
            Ⲁ ———— {t("cm.footer")} ———— Ⲱ
          </p>
        </footer>
      </main>

      {/* Composer sheet */}
      {composerOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <button
            type="button"
            aria-label={t("cm.composer.close")}
            onClick={() => setComposerOpen(false)}
            className="absolute inset-0 bg-ink/35 backdrop-blur-[2px]"
          />
          <div className="animate-float-up relative mx-auto w-full max-w-[430px] rounded-t-[30px] bg-ivory p-5 pb-8 shadow-lift">
            <div className="mx-auto h-1 w-10 rounded-full bg-ink/12" />

            <div className="mt-4 flex items-center justify-between">
              <h2 className="font-display text-[19px] font-semibold tracking-tight">
                {t("cm.composer.title")}
              </h2>
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                className="press grid size-9 place-items-center rounded-full bg-parchment text-ink/50 ring-1 ring-ink/5"
                aria-label={t("cm.composer.close")}
              >
                <span className="text-[15px] leading-none">×</span>
              </button>
            </div>

            <div className="mt-4 flex items-start gap-3">
              <img
                src={profileAvatar}
                alt=""
                width={96}
                height={96}
                className="size-9 shrink-0 rounded-full object-cover ring-1 ring-ink/8"
              />
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={4}
                placeholder={t("cm.composer.hint")}
                aria-label={t("cm.composer.hint")}
                className={`${arabic} min-w-0 flex-1 resize-none rounded-[20px] bg-parchment/70 p-3.5 font-display text-[16px] leading-relaxed text-ink outline-none ring-1 ring-ink/5 transition-shadow duration-300 placeholder:font-sans placeholder:text-[13px] placeholder:text-ink/35 focus:ring-2 focus:ring-gold/35`}
              />
            </div>

            <p className="mt-4 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
              {t("cm.composer.kind")}
            </p>
            <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-1">
              {composerKinds.map((k) => (
                <button key={k} type="button" onClick={() => setKind(k)} className={pill(kind === k)}>
                  {t(k)}
                </button>
              ))}
            </div>

            <p className="mt-4 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
              {t("cm.composer.where")}
            </p>
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setScope("public")}
                className={pill(scope === "public")}
              >
                {t("cm.composer.where.public")}
              </button>
              <button
                type="button"
                onClick={() => setScope("group")}
                className={pill(scope === "group")}
              >
                {t("cm.composer.where.group")}
              </button>
            </div>

            <p className="mt-4 px-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink/40">
              {t("cm.composer.privacy")}
            </p>
            <div className="mt-2 flex gap-2">
              {privacies.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPrivacy(p)}
                  className={`press rounded-full p-0.5 transition-shadow duration-300 ${
                    privacy === p ? "ring-1 ring-gold/60" : "ring-1 ring-transparent"
                  }`}
                >
                  <VisibilityChip value={p} />
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={!draft.trim()}
              onClick={() => {
                setDraft("");
                setComposerOpen(false);
              }}
              className="press mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold text-[13.5px] font-semibold text-ink disabled:opacity-40"
            >
              <CopticCross className="size-4" />
              {t("cm.composer.publish")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
