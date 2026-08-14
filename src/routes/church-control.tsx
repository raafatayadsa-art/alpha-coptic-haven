import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import churchCover from "@/assets/church-cover.jpg";
import churchCrest from "@/assets/church-crest.png";
import priest1 from "@/assets/priest-1.jpg";
import postYouth from "@/assets/post-youth.jpg";
import postCandles from "@/assets/post-candles.jpg";
import contentBook from "@/assets/content-book.jpg";
import contentAudio from "@/assets/content-audio.jpg";
import contentVideo from "@/assets/content-video.jpg";

import {
  BellIcon,
  ChatIcon,
  ChevronRight,
  CopticCross,
  HeartIcon,
  LocationIcon,
  MembersIcon,
  PhoneIcon,
  VerifiedIcon,
} from "@/components/church/icons";
import {
  AudioIcon,
  CheckIcon,
  ClockIcon,
  GalleryIcon,
  GlobeIcon,
  HomeIcon,
  InfoIcon,
  LibraryIcon,
  MailIcon,
  PersonIcon,
  PlusIcon,
  PostIcon,
  RetryIcon,
  VideoIcon,
} from "@/components/church/media-icons";
import {
  ContentCard,
  ContentRow,
  VisibilityChip,
  type ContentItem,
} from "@/components/church/ContentCard";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/church-control")({
  head: () => ({
    meta: [
      { title: "تحكم الكنيسة | Alpha Coptic" },
      {
        name: "description",
        content:
          "شاشة تحكم الكنيسة في ألفا: بيانات الكنيسة، الكاهن المسؤول، المنشورات، المكتبة، الصوتيات والفيديوهات في مكان واحد.",
      },
      { property: "og:title", content: "تحكم الكنيسة | Alpha Coptic" },
      {
        property: "og:description",
        content: "تحكم كامل في الكنيسة: منشورات، مكتبة، صوتيات وفيديوهات بهوية ألفا.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChurchProfile,
});

/* ── Presentation-only sample content. No data layer, no logic. ─────────── */

const church = {
  verified: true,
  responsible: { photo: priest1 },
  locationVerified: true,
};

const stats = [
  { icon: <MembersIcon className="size-[18px]" />, value: "cc.stat.membersValue", label: "cc.stat.members" },
  { icon: <PostIcon className="size-[18px]" />, value: "cc.stat.postsValue", label: "cc.stat.posts" },
  { icon: <LibraryIcon className="size-[18px]" />, value: "cc.stat.booksValue", label: "cc.stat.books" },
  { icon: <AudioIcon className="size-[18px]" />, value: "cc.stat.audioValue", label: "cc.stat.audio" },
];

const tabs = [
  { key: "cc.tab.home", icon: <HomeIcon className="size-4" /> },
  { key: "cc.tab.posts", icon: <PostIcon className="size-4" /> },
  { key: "cc.tab.library", icon: <LibraryIcon className="size-4" /> },
  { key: "cc.tab.audio", icon: <AudioIcon className="size-4" /> },
  { key: "cc.tab.video", icon: <VideoIcon className="size-4" /> },
  { key: "cc.tab.photos", icon: <GalleryIcon className="size-4" /> },
  { key: "cc.tab.about", icon: <InfoIcon className="size-4" /> },
];

const posts = [
  {
    id: "post.1",
    cover: postCandles,
    visibility: "public" as const,
  },
  {
    id: "post.2",
    cover: postYouth,
    visibility: "members" as const,
  },
];

type LibraryEntry = Omit<ContentItem, "title" | "publisher" | "kind" | "meta"> & {
  titleKey: string;
  publisherKey: string;
  kindKey: string;
  metaKey?: string;
};

const library: LibraryEntry[] = [
  {
    id: "lib.1",
    cover: contentBook,
    titleKey: "lib.1.title",
    publisherKey: "pub.church",
    kindKey: "kind.book",
    metaKey: "lib.1.meta",
    metaIcon: "pages",
    likes: "412",
    liked: true,
    downloadable: true,
    visibility: "public",
  },
  {
    id: "lib.2",
    cover: contentVideo,
    titleKey: "lib.2.title",
    publisherKey: "pub.church",
    kindKey: "kind.video",
    metaKey: "lib.2.meta",
    likes: "231",
    downloadable: false,
    visibility: "public",
  },
  {
    id: "lib.3",
    cover: contentAudio,
    titleKey: "lib.3.title",
    publisherKey: "pub.choir",
    kindKey: "kind.audio",
    metaKey: "lib.3.meta",
    likes: "908",
    downloadable: true,
    visibility: "public",
  },
];

const audio: LibraryEntry[] = [
  {
    id: "aud.1",
    cover: contentAudio,
    titleKey: "aud.1.title",
    publisherKey: "pub.choirMary",
    kindKey: "kind.hymn",
    metaKey: "aud.1.meta",
    likes: "320",
    liked: true,
    downloadable: true,
    visibility: "public",
  },
  {
    id: "aud.2",
    cover: contentVideo,
    titleKey: "aud.2.title",
    publisherKey: "pub.priest",
    kindKey: "kind.sermon",
    metaKey: "aud.2.meta",
    likes: "145",
    downloadable: false,
    visibility: "public",
  },
  {
    id: "aud.3",
    cover: contentBook,
    titleKey: "aud.3.title",
    publisherKey: "pub.church",
    kindKey: "kind.meditation",
    metaKey: "aud.3.meta",
    likes: "88",
    downloadable: true,
    visibility: "members",
  },
];

const about = [
  { icon: <CopticCross className="size-[17px]" />, label: "cc.about.diocese", value: "cc.about.dioceseValue" },
  { icon: <LocationIcon className="size-[17px]" />, label: "cc.about.city", value: "cc.about.cityValue" },
  { icon: <GlobeIcon className="size-[17px]" />, label: "cc.about.country", value: "cc.about.countryValue" },
  { icon: <PersonIcon className="size-[17px]" />, label: "cc.about.priest", value: "cc.about.priestValue" },
  { icon: <PhoneIcon className="size-[17px]" />, label: "cc.about.phone", value: "cc.about.phoneValue" },
  { icon: <MailIcon className="size-[17px]" />, label: "cc.about.email", value: "info@stmary-church.org" },
  { icon: <ClockIcon className="size-[17px]" />, label: "cc.about.founded", value: "cc.about.foundedValue" },
];

/* ── Screen ─────────────────────────────────────────────────────────────── */

function ChurchProfile() {
  const { t, dir, isArabic } = useLang();

  const toItem = (entry: LibraryEntry): ContentItem => ({
    ...entry,
    title: t(entry.titleKey),
    publisher: t(entry.publisherKey),
    kind: t(entry.kindKey),
    ...(entry.metaKey ? { meta: t(entry.metaKey) } : {}),
  });

  return (
    <div
      dir={dir}
      className={`${isArabic ? "font-arabic " : ""}mx-auto min-h-screen max-w-[520px] bg-ivory text-ink`}
    >
      <TopBar />

      <main className="px-4 pb-10">
        <HeroCard />
        <ResponsibleRow />
        <QuickActions />
        <Stats />
        <ContentTabs />

        {/* Posts */}
        <Section
          title={t("cc.section.posts")}
          caption={t("cc.section.posts.caption")}
          action={t("app.viewAll")}
        >
          <div className="space-y-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </Section>

        {/* Library */}
        <Section
          title={t("cc.section.library")}
          caption={t("cc.section.library.caption")}
          action={t("cc.section.library.action")}
        >
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
            {library.map((entry) => (
              <div key={entry.id} className="snap-start">
                <ContentCard item={toItem(entry)} />
              </div>
            ))}
          </div>
        </Section>

        {/* Audio */}
        <Section
          title={t("cc.section.audio")}
          caption={t("cc.section.audio.caption")}
          action={t("cc.section.audio.action")}
        >
          <div className="space-y-2.5">
            {audio.map((entry) => (
              <ContentRow key={entry.id} item={toItem(entry)} />
            ))}
          </div>
        </Section>

        {/* Videos — elegant empty state */}
        <Section title={t("cc.section.video")} caption={t("cc.section.video.caption")}>
          <EmptyState />
        </Section>

        {/* Photos — loading state */}
        <Section title={t("cc.section.photos")} caption={t("cc.section.photos.caption")}>
          <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-hidden px-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="glass-card w-[176px] shrink-0 rounded-[26px] p-2.5">
                <div className="skeleton h-[118px] w-full rounded-[20px]" />
                <div className="skeleton mt-3 h-3 w-4/5 rounded-full" />
                <div className="skeleton mt-2 h-2.5 w-2/5 rounded-full" />
              </div>
            ))}
          </div>
        </Section>

        {/* About */}
        <Section title={t("cc.section.about")} caption={t("cc.section.about.caption")}>
          <div className="glass-card overflow-hidden rounded-[28px]">
            {about.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center gap-3 px-4 py-3.5 ${i > 0 ? "border-t border-ink/6" : ""}`}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-[14px] bg-parchment text-ink/60">
                  {row.icon}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10.5px] text-ink/40">{t(row.label)}</span>
                  <span className="mt-0.5 block truncate text-[13px] font-semibold">{t(row.value)}</span>
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Footer />
      </main>
    </div>
  );
}

function TopBar() {
  const { t } = useLang();

  return (
    <header className="safe-top safe-sticky-top sticky z-40 bg-ivory/80 px-4 pb-3 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/"
          aria-label={t("app.back")}
          className="press grid size-10 shrink-0 place-items-center rounded-[16px] border border-ink/8 bg-card/70 text-ink/65 shadow-[var(--shadow-soft)]"
        >
          <ChevronRight className="size-[19px] rotate-180 rtl:rotate-0" />
        </Link>

        <div className="text-center">
          <h1 className="text-[16px] font-bold leading-none tracking-tight">{t("cc.title")}</h1>
          <p className="mt-1 text-[10px] text-ink/40">{t("cc.caption")}</p>
        </div>

        <div className="flex items-center gap-2">
          <IconButton label={t("app.notifications")}>
            <span className="relative">
              <BellIcon className="size-[19px]" />
              <span className="absolute -end-0.5 -top-0.5 size-[7px] rounded-full bg-gold ring-2 ring-ivory" />
            </span>
          </IconButton>
        </div>
      </div>
    </header>
  );
}

function IconButton({ label, children }: { label: string; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="press grid size-10 shrink-0 place-items-center rounded-[16px] border border-ink/8 bg-card/70 text-ink/65 shadow-[var(--shadow-soft)]"
    >
      {children}
    </button>
  );
}

function HeroCard() {
  const { t } = useLang();

  return (
    <section className="animate-[var(--animate-float-up)] glass-card overflow-hidden rounded-[32px] p-0">
      <div className="relative">
        <img
          src={churchCover}
          alt={t("cc.church.name")}
          width={1024}
          height={640}
          className="h-[214px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />

        {church.verified && (
          <span className="absolute end-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ivory/90 px-3 py-1.5 text-[10.5px] font-semibold text-ink shadow-[var(--shadow-soft)] backdrop-blur-md">
            <VerifiedIcon className="size-3.5 text-gold" />
            {t("cc.verified")}
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4">
          <span className="grid size-[62px] shrink-0 place-items-center rounded-[22px] border border-white/60 bg-ivory/92 shadow-[var(--shadow-lift)] backdrop-blur-xl">
            <img src={churchCrest} alt="" loading="lazy" width={512} height={512} className="size-11" />
          </span>
          <div className="min-w-0 flex-1 pb-1">
            <h2 className="truncate text-[19px] font-bold leading-tight text-ivory drop-shadow-sm">
              {t("cc.church.name")}
            </h2>
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-[11.5px] text-ivory/80">
              <LocationIcon className="size-3.5" />
              {t("cc.church.city")} · {t("cc.church.governorate")}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <span className="text-[11px] text-ink/45">
          <span className="text-[13.5px] font-bold text-ink">{t("cc.followersValue")}</span>{" "}
          {t("cc.followers")}
        </span>
        <button
          type="button"
          className="press inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[12.5px] font-semibold text-ivory shadow-[var(--shadow-soft)]"
        >
          <PlusIcon className="size-4" />
          {t("cc.follow")}
        </button>
      </div>
    </section>
  );
}

function ResponsibleRow() {
  const { t } = useLang();

  return (
    <section className="glass-card mt-3 flex items-center gap-3 rounded-[26px] p-3">
      <img
        src={church.responsible.photo}
        alt={t("cc.responsible.name")}
        loading="lazy"
        width={128}
        height={128}
        className="size-12 rounded-[18px] object-cover"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[10.5px] text-ink/40">{t("cc.responsible.role")}</span>
        <span className="mt-0.5 block truncate text-[13.5px] font-semibold">
          {t("cc.responsible.name")}
        </span>
      </span>
      <span className="grid size-9 place-items-center rounded-[14px] bg-parchment text-gold">
        <CheckIcon className="size-4" />
      </span>
    </section>
  );
}

function QuickActions() {
  const { t } = useLang();

  const actions = [
    { key: "cc.action.call", icon: <PhoneIcon className="size-[18px]" />, disabled: false },
    { key: "cc.action.message", icon: <ChatIcon className="size-[18px]" />, disabled: false },
    {
      key: "cc.action.location",
      icon: <LocationIcon className="size-[18px]" />,
      disabled: !church.locationVerified,
    },
  ];

  return (
    <section className="mt-3 grid grid-cols-3 gap-2.5">
      {actions.map((action) => (
        <button
          key={action.key}
          type="button"
          disabled={action.disabled}
          className="press glass-card flex flex-col items-center gap-1.5 rounded-[22px] py-3 text-[11.5px] font-semibold disabled:opacity-40"
        >
          <span className="grid size-9 place-items-center rounded-[14px] bg-parchment text-ink/70">
            {action.icon}
          </span>
          {t(action.key)}
        </button>
      ))}
    </section>
  );
}

function Stats() {
  const { t } = useLang();

  return (
    <section className="mt-3 grid grid-cols-4 gap-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass-card flex flex-col items-center gap-1 rounded-[20px] px-1 py-3"
        >
          <span className="text-gold">{stat.icon}</span>
          <span className="text-[14px] font-bold leading-none">{t(stat.value)}</span>
          <span className="text-[9.5px] text-ink/45">{t(stat.label)}</span>
        </div>
      ))}
    </section>
  );
}

function ContentTabs() {
  const { t } = useLang();

  return (
    <nav
      aria-label={t("cc.tabs.label")}
      className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1"
    >
      {tabs.map((tab, i) => (
        <button
          key={tab.key}
          type="button"
          className={`press inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold transition-colors duration-500 ${
            i === 0
              ? "bg-ink text-ivory shadow-[var(--shadow-soft)]"
              : "border border-ink/8 bg-card/70 text-ink/55"
          }`}
        >
          {tab.icon}
          {t(tab.key)}
        </button>
      ))}
    </nav>
  );
}

function Section({
  title,
  caption,
  action,
  children,
}: {
  title: string;
  caption?: string;
  action?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-7">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h2 className="text-[15.5px] font-bold leading-tight tracking-tight">{title}</h2>
          {caption && <p className="mt-1 text-[10.5px] text-ink/40">{caption}</p>}
        </div>
        {action && (
          <button
            type="button"
            className="press inline-flex items-center gap-0.5 text-[11.5px] font-semibold text-ink/50"
          >
            {action}
            <ChevronRight className="size-3.5 rtl:rotate-180" />
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function PostCard({ post }: { post: (typeof posts)[number] }) {
  const { t } = useLang();

  return (
    <article className="press glass-card overflow-hidden rounded-[28px]">
      <div className="flex items-center gap-2.5 px-4 pt-3.5">
        <img src={churchCrest} alt="" loading="lazy" width={512} height={512} className="size-7" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[11.5px] font-semibold">{t("cc.church.name")}</span>
          <span className="mt-0.5 block text-[9.5px] text-ink/40">
            {t(`${post.id}.category`)} · {t(`${post.id}.date`)}
          </span>
        </span>
        <VisibilityChip value={post.visibility} />
      </div>

      <h3 className="mt-2.5 px-4 text-[14px] font-bold leading-snug">{t(`${post.id}.title`)}</h3>
      <p className="mt-1.5 px-4 text-[11.5px] leading-relaxed text-ink/50">{t(`${post.id}.excerpt`)}</p>

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
          <HeartIcon className="size-4" />
          {t(`${post.id}.likes`)} {t("app.likes")}
        </span>
        <span className="inline-flex items-center gap-0.5 text-[11.5px] font-semibold text-ink/50">
          {t("app.details")}
          <ChevronRight className="size-3.5 rtl:rotate-180" />
        </span>
      </div>
    </article>
  );
}

function EmptyState() {
  const { t } = useLang();

  return (
    <div className="glass-card flex flex-col items-center gap-2 rounded-[28px] px-6 py-9 text-center">
      <span className="grid size-12 place-items-center rounded-[20px] bg-parchment text-gold">
        <VideoIcon className="size-5" />
      </span>
      <p className="mt-1 text-[13px] font-semibold">{t("cc.empty.title")}</p>
      <p className="text-[11px] leading-relaxed text-ink/45">{t("cc.empty.body")}</p>
      <button
        type="button"
        className="press mt-2 inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-[11.5px] font-semibold text-ink/60"
      >
        <RetryIcon className="size-3.5" />
        {t("cc.empty.retry")}
      </button>
    </div>
  );
}

function Footer() {
  const { t } = useLang();

  return (
    <footer className="mt-10 flex flex-col items-center gap-2 pb-2 text-center">
      <CopticCross className="size-5 text-gold/70" />
      <p className="text-[11px] text-ink/40">{t("cc.footer.meta")}</p>
      <p className="text-[10px] text-ink/25">{t("cc.footer.quote")}</p>
    </footer>
  );
}
