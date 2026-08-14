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
  name: "كنيسة السيدة العذراء مريم",
  verified: true,
  city: "شبرا الخيمة",
  governorate: "محافظة القليوبية",
  followers: "12.4 ألف",
  responsible: {
    name: "القمص بيشوي صموئيل",
    role: "الكاهن المسؤول",
    photo: priest1,
  },
  locationVerified: true,
};

const stats = [
  { icon: <MembersIcon className="size-[18px]" />, value: "٤٨٢", label: "أعضاء" },
  { icon: <PostIcon className="size-[18px]" />, value: "١٣٦", label: "منشورات" },
  { icon: <LibraryIcon className="size-[18px]" />, value: "٢٤", label: "كتب" },
  { icon: <AudioIcon className="size-[18px]" />, value: "٥٧", label: "صوتيات" },
];

const tabs = [
  { label: "الرئيسية", icon: <HomeIcon className="size-4" /> },
  { label: "المنشورات", icon: <PostIcon className="size-4" /> },
  { label: "المكتبة", icon: <LibraryIcon className="size-4" /> },
  { label: "الصوتيات", icon: <AudioIcon className="size-4" /> },
  { label: "الفيديوهات", icon: <VideoIcon className="size-4" /> },
  { label: "الصور", icon: <GalleryIcon className="size-4" /> },
  { label: "حول الكنيسة", icon: <InfoIcon className="size-4" /> },
];

const posts = [
  {
    cover: postCandles,
    category: "قداسات",
    date: "الجمعة ٧ أغسطس",
    title: "مواعيد قداسات الأسبوع وصلوات نصف الليل",
    excerpt: "القداس الإلهي يوم الأحد الساعة السادسة صباحًا، ويتقدمه رفع بخور عشية السبت.",
    likes: 184,
    visibility: "public" as const,
  },
  {
    cover: postYouth,
    category: "اجتماعات",
    date: "الأربعاء ٥ أغسطس",
    title: "اجتماع الخدام — التحضير لخدمة العام الجديد",
    excerpt: "لقاء الخدام في قاعة الكنيسة بعد صلاة العشية، ويشمل مراجعة خطة الخدمة.",
    likes: 62,
    visibility: "members" as const,
  },
];

const library: ContentItem[] = [
  {
    cover: contentBook,
    title: "الأجبية — صلوات السواعي",
    publisher: "كنيسة السيدة العذراء مريم",
    kind: "كتاب",
    meta: "٣٢٠ صفحة",
    metaIcon: "pages",
    likes: 412,
    liked: true,
    downloadable: true,
    visibility: "public",
  },
  {
    cover: contentVideo,
    title: "شرح القداس الغريغوري",
    publisher: "كنيسة السيدة العذراء مريم",
    kind: "فيديو",
    meta: "٤٢:١٠",
    likes: 231,
    downloadable: false,
    visibility: "public",
  },
  {
    cover: contentAudio,
    title: "ألحان شهر كيهك",
    publisher: "كورال الكنيسة",
    kind: "صوتي",
    meta: "١:١٢:٣٠",
    likes: 908,
    downloadable: true,
    visibility: "public",
  },
];

const audio: ContentItem[] = [
  {
    cover: contentAudio,
    title: "مديحة العذراء مريم",
    publisher: "كورال كنيسة السيدة العذراء",
    kind: "لحن",
    meta: "٦:٤٢",
    likes: 320,
    liked: true,
    downloadable: true,
    visibility: "public",
  },
  {
    cover: contentVideo,
    title: "عظة الأحد — الرجاء في الضيقة",
    publisher: "القمص بيشوي صموئيل",
    kind: "عظة",
    meta: "٣٤:٠٥",
    likes: 145,
    downloadable: false,
    visibility: "public",
  },
  {
    cover: contentBook,
    title: "تأمل في المزمور الخمسين",
    publisher: "كنيسة السيدة العذراء مريم",
    kind: "تأمل",
    meta: "١١:٢٠",
    likes: 88,
    downloadable: true,
    visibility: "members",
  },
];

const about = [
  { icon: <CopticCross className="size-[17px]" />, label: "الإيبارشية", value: "إيبارشية شبرا الخيمة" },
  { icon: <LocationIcon className="size-[17px]" />, label: "المدينة", value: "شبرا الخيمة — القليوبية" },
  { icon: <GlobeIcon className="size-[17px]" />, label: "الدولة", value: "جمهورية مصر العربية" },
  { icon: <PersonIcon className="size-[17px]" />, label: "الكاهن المسؤول", value: "القمص بيشوي صموئيل" },
  { icon: <PhoneIcon className="size-[17px]" />, label: "الهاتف الرسمي", value: "+٢٠ ١٠ ١٢٣٤ ٥٦٧٨" },
  { icon: <MailIcon className="size-[17px]" />, label: "البريد الرسمي", value: "info@stmary-church.org" },
  { icon: <ClockIcon className="size-[17px]" />, label: "تاريخ التأسيس", value: "١٩٦٨ م" },
];

/* ── Screen ─────────────────────────────────────────────────────────────── */

function ChurchProfile() {
  return (
    <div dir="rtl" className="font-arabic mx-auto min-h-screen max-w-[520px] bg-ivory text-ink">
      <TopBar />

      <main className="px-4 pb-10">
        <HeroCard />
        <ResponsibleRow />
        <QuickActions />
        <Stats />
        <ContentTabs />

        {/* المنشورات */}
        <Section title="منشورات الكنيسة" caption="آخر الأخبار والإعلانات" action="عرض الكل">
          <div className="space-y-3">
            {posts.map((post) => (
              <PostCard key={post.title} post={post} />
            ))}
          </div>
        </Section>

        {/* المكتبة */}
        <Section title="مكتبة الكنيسة" caption="كتب وفيديوهات وصوتيات" action="المكتبة">
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1">
            {library.map((item) => (
              <div key={item.title} className="snap-start">
                <ContentCard item={item} />
              </div>
            ))}
          </div>
        </Section>

        {/* الصوتيات */}
        <Section title="الصوتيات" caption="ألحان وعظات وتأملات" action="الكل">
          <div className="space-y-2.5">
            {audio.map((item) => (
              <ContentRow key={item.title} item={item} />
            ))}
          </div>
        </Section>

        {/* الفيديوهات — حالة فارغة أنيقة */}
        <Section title="الفيديوهات" caption="بث ولقاءات مسجلة">
          <EmptyState />
        </Section>

        {/* الصور — حالة تحميل */}
        <Section title="ألبومات الصور" caption="جارٍ التحميل">
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

        {/* حول الكنيسة */}
        <Section title="حول الكنيسة" caption="بيانات الكنيسة الرسمية">
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
                  <span className="block text-[10.5px] text-ink/40">{row.label}</span>
                  <span className="mt-0.5 block truncate text-[13px] font-semibold">{row.value}</span>
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
  return (
    <header className="sticky top-0 z-40 bg-ivory/80 px-4 pb-3 pt-[max(14px,env(safe-area-inset-top))] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3">
        <Link
          to="/"
          aria-label="رجوع"
          className="press grid size-10 shrink-0 place-items-center rounded-[16px] border border-ink/8 bg-card/70 text-ink/65 shadow-[var(--shadow-soft)]"
        >
          <ChevronRight className="size-[19px] rotate-180 rtl:rotate-0" />
        </Link>

        <div className="text-center">
          <h1 className="text-[16px] font-bold leading-none tracking-tight">تحكم الكنيسة</h1>
          <p className="mt-1 text-[10px] text-ink/40">إدارة كنيستك</p>
        </div>

        <IconButton label="التنبيهات">
          <span className="relative">
            <BellIcon className="size-[19px]" />
            <span className="absolute -right-0.5 -top-0.5 size-[7px] rounded-full bg-gold ring-2 ring-ivory" />
          </span>
        </IconButton>
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
  return (
    <section className="animate-[var(--animate-float-up)] glass-card overflow-hidden rounded-[32px] p-0">
      <div className="relative">
        <img
          src={churchCover}
          alt={church.name}
          width={1024}
          height={640}
          className="h-[214px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />

        {church.verified && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ivory/90 px-3 py-1.5 text-[10.5px] font-semibold text-ink shadow-[var(--shadow-soft)] backdrop-blur-md">
            <VerifiedIcon className="size-3.5 text-gold" />
            جهة موثقة
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4">
          <span className="grid size-[62px] shrink-0 place-items-center rounded-[22px] border border-white/60 bg-ivory/92 shadow-[var(--shadow-lift)] backdrop-blur-xl">
            <img src={churchCrest} alt="" loading="lazy" width={512} height={512} className="size-11" />
          </span>
          <div className="min-w-0 flex-1 pb-1">
            <h2 className="truncate text-[19px] font-bold leading-tight text-ivory drop-shadow-sm">
              {church.name}
            </h2>
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-[11.5px] text-ivory/80">
              <LocationIcon className="size-3.5" />
              {church.city} · {church.governorate}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <span className="text-[11px] text-ink/45">
          <span className="text-[13.5px] font-bold text-ink">{church.followers}</span> متابع
        </span>
        <button
          type="button"
          className="press inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[12.5px] font-semibold text-ivory shadow-[var(--shadow-soft)]"
        >
          <PlusIcon className="size-4" />
          متابعة
        </button>
      </div>
    </section>
  );
}

function ResponsibleRow() {
  if (!church.responsible) return null;

  return (
    <section className="glass-card mt-3 flex items-center gap-3 rounded-[26px] p-3">
      <img
        src={church.responsible.photo}
        alt={church.responsible.name}
        loading="lazy"
        width={128}
        height={128}
        className="size-12 rounded-[18px] object-cover"
      />
      <span className="min-w-0 flex-1">
        <span className="block text-[10.5px] text-ink/40">{church.responsible.role}</span>
        <span className="mt-0.5 block truncate text-[13.5px] font-semibold">{church.responsible.name}</span>
      </span>
      <span className="grid size-9 place-items-center rounded-[14px] bg-parchment text-gold">
        <CheckIcon className="size-4" />
      </span>
    </section>
  );
}

function QuickActions() {
  const actions = [
    { label: "اتصال", icon: <PhoneIcon className="size-[18px]" />, disabled: false },
    { label: "رسالة", icon: <ChatIcon className="size-[18px]" />, disabled: false },
    {
      label: "موقع",
      icon: <LocationIcon className="size-[18px]" />,
      disabled: !church.locationVerified,
    },
  ];

  return (
    <section className="mt-3 grid grid-cols-3 gap-2.5">
      {actions.map((action) => (
        <button
          key={action.label}
          type="button"
          disabled={action.disabled}
          className="press glass-card flex flex-col items-center gap-1.5 rounded-[22px] py-3 text-[11.5px] font-semibold disabled:opacity-40"
        >
          <span className="grid size-9 place-items-center rounded-[14px] bg-parchment text-ink/70">
            {action.icon}
          </span>
          {action.label}
        </button>
      ))}
    </section>
  );
}

function Stats() {
  return (
    <section className="mt-3 grid grid-cols-4 gap-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="glass-card flex flex-col items-center gap-1 rounded-[20px] px-1 py-3"
        >
          <span className="text-gold">{stat.icon}</span>
          <span className="text-[14px] font-bold leading-none">{stat.value}</span>
          <span className="text-[9.5px] text-ink/45">{stat.label}</span>
        </div>
      ))}
    </section>
  );
}

function ContentTabs() {
  return (
    <nav
      aria-label="أقسام الكنيسة"
      className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1"
    >
      {tabs.map((tab, i) => (
        <button
          key={tab.label}
          type="button"
          className={`press inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold transition-colors duration-500 ${
            i === 0
              ? "bg-ink text-ivory shadow-[var(--shadow-soft)]"
              : "border border-ink/8 bg-card/70 text-ink/55"
          }`}
        >
          {tab.icon}
          {tab.label}
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
  return (
    <article className="press glass-card overflow-hidden rounded-[28px]">
      <div className="flex items-center gap-2.5 px-4 pt-3.5">
        <img src={churchCrest} alt="" loading="lazy" width={512} height={512} className="size-7" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[11.5px] font-semibold">{church.name}</span>
          <span className="mt-0.5 block text-[9.5px] text-ink/40">
            {post.category} · {post.date}
          </span>
        </span>
        <VisibilityChip value={post.visibility} />
      </div>

      <h3 className="mt-2.5 px-4 text-[14px] font-bold leading-snug">{post.title}</h3>
      <p className="mt-1.5 px-4 text-[11.5px] leading-relaxed text-ink/50">{post.excerpt}</p>

      <img
        src={post.cover}
        alt={post.title}
        loading="lazy"
        width={1024}
        height={640}
        className="mt-3 h-[152px] w-full object-cover"
      />

      <div className="flex items-center justify-between px-4 py-3">
        <span className="inline-flex items-center gap-1.5 text-[11.5px] text-ink/50">
          <HeartIcon className="size-4" />
          {post.likes} إعجاب
        </span>
        <span className="inline-flex items-center gap-0.5 text-[11.5px] font-semibold text-ink/50">
          التفاصيل
          <ChevronRight className="size-3.5 rtl:rotate-180" />
        </span>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="glass-card flex flex-col items-center gap-2 rounded-[28px] px-6 py-9 text-center">
      <span className="grid size-12 place-items-center rounded-[20px] bg-parchment text-gold">
        <VideoIcon className="size-5" />
      </span>
      <p className="mt-1 text-[13px] font-semibold">لا توجد فيديوهات بعد</p>
      <p className="text-[11px] leading-relaxed text-ink/45">
        سيظهر هنا كل ما تنشره الكنيسة من لقاءات وقداسات مسجلة.
      </p>
      <button
        type="button"
        className="press mt-2 inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-4 py-2 text-[11.5px] font-semibold text-ink/60"
      >
        <RetryIcon className="size-3.5" />
        إعادة المحاولة
      </button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-10 flex flex-col items-center gap-2 pb-2 text-center">
      <CopticCross className="size-5 text-gold/70" />
      <p className="text-[11px] text-ink/40">تحكم الكنيسة · ألفا للكنيسة القبطية الأرثوذكسية</p>
      <p className="text-[10px] text-ink/25">«بيتي بيت الصلاة يُدعى»</p>
    </footer>
  );
}
