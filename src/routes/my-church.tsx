import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import churchCover from "@/assets/church-cover.jpg";
import churchCrest from "@/assets/church-crest.png";
import priest1 from "@/assets/priest-1.jpg";
import priest2 from "@/assets/priest-2.jpg";
import priest3 from "@/assets/priest-3.jpg";
import postYouth from "@/assets/post-youth.jpg";
import postCandles from "@/assets/post-candles.jpg";

import {
  BellIcon,
  CalendarPlusIcon,
  ChatIcon,
  ChevronRight,
  CopticCross,
  EventsIcon,
  FamiliesIcon,
  GroupsIcon,
  HeartIcon,
  HelpIcon,
  LocationIcon,
  MembersIcon,
  MoreIcon,
  PhoneIcon,
  ServicesIcon,
  ShieldIcon,
  VerifiedIcon,
} from "@/components/church/icons";
import { useLang } from "@/lib/i18n";
import { SloganBand } from "@/components/layout/SloganBand";

export const Route = createFileRoute("/my-church")({
  head: () => ({
    meta: [
      { title: "كنيستي — Alpha Coptic" },
      {
        name: "description",
        content:
          "The church home screen of Alpha Coptic: liturgy times, the fathers, church life, gatherings and announcements in one calm place.",
      },
      { property: "og:title", content: "كنيستي — Alpha Coptic" },
      {
        property: "og:description",
        content: "Your church, gathered in one calm and beautiful place.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChurchHome,
});

/* Presentation-only sample content for the design system. */
const isPriest = true;

const priests = [
  { id: "priest.1", photo: priest1 },
  { id: "priest.2", photo: priest2 },
  { id: "priest.3", photo: priest3 },
];

const quickLinks = [
  { key: "link.members", caption: "link.members.caption", icon: <MembersIcon className="size-4" />, image: lifeMembers },
  { key: "link.families", caption: "link.families.caption", icon: <FamiliesIcon className="size-4" />, image: lifeFamilies },
  { key: "link.services", caption: "link.services.caption", icon: <ServicesIcon className="size-4" />, image: lifeServices },
  { key: "link.groups", caption: "link.groups.caption", icon: <GroupsIcon className="size-4" />, image: lifeGroups },
  { key: "link.events", caption: "link.events.caption", icon: <EventsIcon className="size-4" />, image: lifeEvents },
  { key: "link.help", caption: "link.help.caption", icon: <HelpIcon className="size-4" />, image: lifeHelp },
];


const churchPosts = [
  { id: "post.1", cover: postCandles, visibility: "public" as const },
  { id: "post.2", cover: postYouth, visibility: "members" as const },
];

const calendar = [
  { id: "event.1", now: true },
  { id: "event.2", now: false },
  { id: "event.3", now: false },
  { id: "event.4", now: false },
];

const feed = [
  { id: "feed.1", image: postYouth, likes: "142" },
  { id: "feed.2", image: postCandles, likes: "86" },
];

function ChurchHome() {
  const [following, setFollowing] = useState(false);
  const { t, dir, isArabic } = useLang();
  const arabic = isArabic ? "font-arabic" : "";

  return (
    <div
      dir={dir}
      className={`${arabic} mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden safe-nav-gap bg-ivory text-ink selection:bg-gold/20`}
    >
      {/* 1 — Premium Header */}
      <header className="safe-top safe-sticky-top sticky z-50 flex items-center justify-between border-b border-ink/5 bg-ivory/75 px-5 pb-3.5 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-gold/10 ring-1 ring-gold/25">
            <CopticCross className="size-4 text-gold" />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-[16px] font-semibold tracking-tight">
              {t("app.churchShort")}
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ink/40">
              {t("app.brand")}
            </span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {/* Language toggle — Arabic / English */}
          <button
            type="button"
            aria-label={t("app.notifications")}
            className="press relative grid size-10 place-items-center rounded-full bg-parchment ring-1 ring-ink/5"
          >
            <BellIcon className="size-[18px] text-ink/60" />
            <span className="absolute end-2.5 top-2.5 size-1.5 rounded-full bg-gold ring-2 ring-parchment" />
          </button>
          {/* Visible only for the priest */}
          {isPriest && (
            <Link
              to="/church-control"
              className="press grid size-10 place-items-center rounded-full bg-ink text-ivory shadow-soft"
              aria-label={t("app.churchControl")}
              title={t("app.churchControl")}
            >
              <ShieldIcon className="size-[18px]" />
            </Link>
          )}
        </div>
      </header>

      <main>
        {/* 2 — Premium Hero */}
        <section className="relative px-4 pt-3">
          <div className="relative h-[236px] overflow-hidden rounded-[30px] ring-1 ring-ink/10">
            <img
              src={churchCover}
              alt={t("home.cover.alt")}
              width={800}
              height={1200}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute start-5 top-5 flex items-center gap-2 rounded-full bg-ivory/20 px-3 py-1.5 backdrop-blur-md">
              <span className="size-1.5 animate-pulse rounded-full bg-gold" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory">
                {t("home.liturgyNow")}
              </span>
            </div>
          </div>

          {/* Floating identity card */}
          <div className="glass-card animate-float-up relative -mt-16 mx-1.5 rounded-[30px] p-4">
            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-[18px] bg-parchment ring-1 ring-gold/25">
                <CopticCross className="size-6 text-gold" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-gold">
                    {t("home.location")}
                  </span>
                  <VerifiedIcon className="size-3.5 text-gold" />
                </div>
                <h1
                  className={`mt-1 truncate font-display text-[18px] font-semibold leading-tight tracking-tight ${
                    isArabic ? "" : "italic"
                  }`}
                >
                  {t("app.churchShort")}
                </h1>
              </div>
            </div>

            <div className="mt-3.5 flex items-center justify-between border-y border-ink/8 py-3">
              <div className="flex flex-col">
                <span className="text-[10px] text-ink/45">{t("home.stat.members")}</span>
                <span className="font-display text-[17px] font-semibold">{t("home.stat.membersValue")}</span>
              </div>
              <div className="h-8 w-px bg-ink/8" />
              <div className="flex flex-col">
                <span className="text-[10px] text-ink/45">{t("home.stat.families")}</span>
                <span className="font-display text-[17px] font-semibold">{t("home.stat.familiesValue")}</span>
              </div>
              <div className="h-8 w-px bg-ink/8" />
              <div className="flex flex-col text-end">
                <span className="text-[10px] text-ink/45">{t("home.stat.nextLiturgy")}</span>
                <span className="font-display text-[17px] font-semibold text-gold">
                  {t("home.stat.nextLiturgyValue")}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setFollowing((v) => !v)}
              aria-pressed={following}
              className={`press mt-3.5 flex h-11 w-full items-center justify-center gap-2 rounded-full text-[13px] font-semibold transition-colors ${
                following
                  ? "border border-gold/30 bg-gold/10 text-gold"
                  : "bg-ink text-ivory shadow-soft"
              }`}
            >
              <HeartIcon className="size-4" />
              {following ? t("home.following") : t("home.follow")}
            </button>
          </div>
        </section>


        {/* 4 — Church Priests */}
        <section className="mt-12">
          <div className="flex items-end justify-between px-5">
            <div>
              <h2 className="font-display text-[26px] font-semibold tracking-tight">
                {t("home.fathers")}
              </h2>
              <p className="mt-0.5 text-[12px] text-ink/45">{t("home.fathers.caption")}</p>
            </div>
            <button type="button" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
              {t("app.viewAll")}
            </button>
          </div>

          <div className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
            {priests.map((p) => (
              <article
                key={p.id}
                className="press w-[228px] flex-none snap-center rounded-[30px] border border-ink/5 bg-parchment p-4 shadow-soft"
              >
                <div className="overflow-hidden rounded-[22px]">
                  <img
                    src={p.photo}
                    alt={t(`${p.id}.name`)}
                    width={600}
                    height={800}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 font-display text-[20px] font-semibold leading-tight">
                  {t(`${p.id}.name`)}
                </h3>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                  {t(`${p.id}.rank`)}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`${t("home.call")} — ${t(`${p.id}.name`)}`}
                    className="press grid size-10 place-items-center rounded-full border border-ink/5 bg-ivory text-ink/60"
                  >
                    <PhoneIcon className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`${t("home.message")} — ${t(`${p.id}.name`)}`}
                    className="press grid size-10 place-items-center rounded-full border border-ink/5 bg-ivory text-ink/60"
                  >
                    <ChatIcon className="size-4" />
                  </button>
                  <button
                    type="button"
                    className="press flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-ink text-[11px] font-semibold text-ivory"
                  >
                    <CalendarPlusIcon className="size-4" />
                    {t("home.appointment")}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 5 — Church Life */}
        <section className="mt-12 px-5">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-[26px] font-semibold tracking-tight">
                {t("home.churchLife")}
              </h2>
              <p className="mt-0.5 text-[12px] text-ink/45">{t("home.churchLife.caption")}</p>
            </div>
            <button type="button" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
              {t("app.viewAll")}
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3.5">
            {quickLinks.map((l, i) => (
              <button
                key={l.key}
                type="button"
                className={`press group relative overflow-hidden rounded-[28px] ring-1 ring-ink/8 text-start shadow-soft ${
                  i === 0 ? "col-span-2" : ""
                }`}
              >
                <img
                  src={l.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  width={800}
                  height={600}
                  className={`w-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05] ${
                    i === 0 ? "h-[150px]" : "h-[118px]"
                  }`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/78 via-ink/25 to-transparent" />
                {/* Coptic watermark */}
                <CopticCross className="absolute end-3.5 top-3.5 size-5 text-ivory/45" />
                <span className="absolute inset-x-4 bottom-3.5">
                  <span className="flex items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-[14px] bg-ivory/18 text-ivory ring-1 ring-ivory/25 backdrop-blur-md">
                      {l.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12.5px] font-semibold leading-tight text-ivory">
                        {t(l.key)}
                      </span>
                      <span className="mt-0.5 block text-[9.5px] font-medium uppercase tracking-[0.16em] text-gold/85">
                        {t(l.caption)}
                      </span>
                    </span>
                    <ChevronRight className="size-4 shrink-0 text-ivory/60 rtl:rotate-180" />
                  </span>
                </span>
              </button>
            ))}
          </div>

        </section>

        {/* 5b — Church Posts */}
        <section className="mt-12 px-4">
          <div className="mb-4 flex items-end justify-between px-1">
            <div>
              <h2 className="text-[16px] font-bold tracking-tight">{t("home.posts")}</h2>
              <p className="mt-1 text-[10.5px] text-ink/40">{t("home.posts.caption")}</p>
            </div>
            <button
              type="button"
              className="press inline-flex items-center gap-0.5 text-[11.5px] font-semibold text-ink/50"
            >
              {t("app.viewAll")}
              <ChevronRight className="size-3.5 rtl:rotate-180" />
            </button>
          </div>

          <div className="space-y-3">
            {churchPosts.map((post) => (
              <article key={post.id} className="press glass-card overflow-hidden rounded-[28px]">
                <div className="flex items-center gap-2.5 px-4 pt-3.5">
                  <img src={churchCrest} alt="" loading="lazy" width={512} height={512} className="size-7" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11.5px] font-semibold">{t("app.church")}</span>
                    <span className="mt-0.5 block text-[9.5px] text-ink/40">
                      {t(`${post.id}.category`)} · {t(`${post.id}.date`)}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[9.5px] font-semibold ${
                      post.visibility === "public"
                        ? "bg-gold/12 text-gold ring-1 ring-gold/20"
                        : "bg-lavender/40 text-ink/60 ring-1 ring-lavender"
                    }`}
                  >
                    {post.visibility === "public" ? t("app.public") : t("app.members")}
                  </span>
                </div>

                <h3 className="mt-2.5 px-4 text-[14px] font-bold leading-snug">{t(`${post.id}.title`)}</h3>
                <p className="mt-1.5 px-4 text-[11.5px] leading-relaxed text-ink/50">
                  {t(`${post.id}.excerpt`)}
                </p>

                <img
                  src={post.cover}
                  alt={t(`${post.id}.title`)}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="mt-3 h-[152px] w-full object-cover"
                />

                <div className="flex items-center justify-between px-4 py-3">
                  <span className="inline-flex items-center gap-1.5 text-[11.5px] text-ink/50">
                    <HeartIcon className="size-4 text-gold" />
                    {t(`${post.id}.likes`)} {t("app.likes")}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[11.5px] font-semibold text-ink/50">
                    {t("app.details")}
                    <ChevronRight className="size-3.5 rtl:rotate-180" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 6 — Upcoming Events */}
        <section className="mt-14 px-5">
          <h2 className="font-display text-[26px] font-semibold tracking-tight">{t("home.calendar")}</h2>
          <p className="mt-0.5 text-[12px] text-ink/45">{t("home.calendar.caption")}</p>

          <div className="relative mt-7 space-y-7">
            <span className="absolute bottom-2 start-[5px] top-2 w-px bg-ink/8" />
            {calendar.map((e) => (
              <div key={e.id} className="relative ps-9">
                <span
                  className={`absolute start-0 top-1.5 size-[11px] rounded-full ring-4 ring-ivory ${
                    e.now ? "bg-gold" : "bg-ink/15"
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                    e.now ? "text-gold" : "text-ink/40"
                  }`}
                >
                  {t(`${e.id}.when`)}
                </span>
                <div
                  className={`mt-2 rounded-[24px] border border-ink/5 p-4 ${
                    e.now ? "bg-parchment shadow-soft" : "bg-white/70"
                  }`}
                >
                  <h3 className="font-display text-[19px] font-semibold leading-tight">
                    {t(`${e.id}.title`)}
                  </h3>
                  <p className="mt-1 text-[12px] text-ink/50">{t(`${e.id}.where`)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7 — Latest Church Posts */}
        <section className="mt-14">
          <div className="px-5">
            <h2 className="font-display text-[26px] font-semibold tracking-tight">
              {t("home.announcements")}
            </h2>
            <p className="mt-0.5 text-[12px] text-ink/45">{t("home.announcements.caption")}</p>
          </div>

          <div className="mt-6 space-y-6 px-4">
            {feed.map((item) => (
              <FeedPost key={item.id} id={item.id} image={item.image} likes={item.likes} />
            ))}
          </div>
        </section>

        {/* 8 — Footer */}
        <footer className="mt-20 border-t border-ink/8 px-8 py-14 text-center">
          <span className="mx-auto grid size-11 place-items-center rounded-full bg-gold/10 ring-1 ring-gold/25">
            <CopticCross className="size-5 text-gold" />
          </span>
          <p className={`mt-6 font-display text-[21px] text-ink/45 ${isArabic ? "" : "italic"}`}>
            {t("home.footer.quote")}
          </p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-ink/30">
            {t("home.footer.meta")}
          </p>
        </footer>
      </main>
      <SloganBand />
    </div>
  );
}

function FeedPost({ id, image, likes }: { id: string; image: string; likes: string }) {
  const { t } = useLang();

  return (
    <article className="rounded-[32px] border border-ink/5 bg-white/80 p-4 shadow-soft">
      <div className="flex items-center gap-3 px-1 pb-4">
        <span className="grid size-9 place-items-center rounded-full bg-parchment ring-1 ring-gold/20">
          <CopticCross className="size-4 text-gold" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[13px] font-semibold">{t(`${id}.author`)}</span>
          <span className="text-[10.5px] text-ink/40">{t(`${id}.time`)}</span>
        </span>
      </div>

      <div className="overflow-hidden rounded-[24px]">
        <img
          src={image}
          alt={t(`${id}.alt`)}
          width={1000}
          height={750}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      <div className="px-1.5 pt-4">
        <p className="text-pretty text-[13.5px] leading-relaxed text-ink/70">{t(`${id}.body`)}</p>

        <div className="mt-4 flex items-center gap-4">
          <button
            type="button"
            className="press flex items-center gap-1.5 rounded-full bg-parchment px-3 py-1.5 text-[11px] font-semibold text-ink/60"
          >
            <HeartIcon className="size-4 text-gold" />
            {likes}
          </button>
          <button
            type="button"
            className="press flex items-center gap-1.5 rounded-full bg-parchment px-3 py-1.5 text-[11px] font-semibold text-ink/60"
          >
            <ChatIcon className="size-4" />
            {t("feed.comment")}
          </button>
          <button type="button" className="ms-auto flex items-center gap-1 text-[11px] font-semibold text-gold">
            {t("feed.read")}
            <ChevronRight className="size-3.5 rtl:rotate-180" />
          </button>
        </div>

        <div className="mt-4 rounded-[20px] bg-lavender/25 p-3.5">
          <p className="text-[12px] leading-relaxed text-ink/65">
            <span className="font-semibold text-ink/80">{t(`${id}.commentName`)}</span>{" "}
            {t(`${id}.commentText`)}
          </p>
        </div>
      </div>
    </article>
  );
}
