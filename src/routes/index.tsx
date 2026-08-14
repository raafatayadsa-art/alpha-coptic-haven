import { useState } from "react";
import type { ReactNode } from "react";
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

export const Route = createFileRoute("/")({
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
  { name: "Fr. Bishoy Samuel", rank: "Parish Priest", photo: priest1 },
  { name: "Fr. Mena Isaac", rank: "Archpriest", photo: priest2 },
  { name: "Fr. Kyrillos Marcos", rank: "Associate Priest", photo: priest3 },
];

const quickLinks = [
  { icon: <MembersIcon className="size-5" />, title: "Members", subtitle: "Our congregation", tone: "parchment" as const },
  { icon: <FamiliesIcon className="size-5" />, title: "Families", subtitle: "Households", tone: "lavender" as const },
  { icon: <ServicesIcon className="size-5" />, title: "Services", subtitle: "Meetings & classes", tone: "parchment" as const },
  { icon: <GroupsIcon className="size-5" />, title: "Groups", subtitle: "Servants & teams", tone: "lavender" as const },
  { icon: <EventsIcon className="size-5" />, title: "Events", subtitle: "Feasts & trips", tone: "gold" as const },
  { icon: <HelpIcon className="size-5" />, title: "Request Help", subtitle: "In confidence", tone: "gold" as const },
  { icon: <LocationIcon className="size-5" />, title: "Location", subtitle: "Shoubra, Cairo", tone: "parchment" as const },
  { icon: <MoreIcon className="size-5" />, title: "More", subtitle: "Everything else", tone: "lavender" as const },
];

const quickTile: Record<"gold" | "lavender" | "parchment", string> = {
  gold: "bg-gold/12 text-gold ring-1 ring-gold/20",
  lavender: "bg-lavender/40 text-ink/70 ring-1 ring-lavender",
  parchment: "bg-parchment text-ink/60 ring-1 ring-ink/5",
};

const churchPosts = [
  {
    cover: postCandles,
    category: "قداسات",
    date: "الجمعة ٧ أغسطس",
    title: "مواعيد قداسات الأسبوع وصلوات نصف الليل",
    excerpt: "القداس الإلهي يوم الأحد الساعة السادسة صباحًا، ويتقدمه رفع بخور عشية السبت.",
    likes: "١٨٤",
    visibility: "public" as const,
  },
  {
    cover: postYouth,
    category: "اجتماعات",
    date: "الأربعاء ٥ أغسطس",
    title: "اجتماع الخدام — التحضير لخدمة العام الجديد",
    excerpt: "لقاء الخدام في قاعة الكنيسة بعد صلاة العشية، ويشمل مراجعة خطة الخدمة.",
    likes: "٦٢",
    visibility: "members" as const,
  },
];





const calendar = [
  {
    when: "Today · 7:00 AM",
    title: "Divine Liturgy",
    where: "Main Altar · Fr. Bishoy Samuel",
    now: true,
  },
  {
    when: "Tomorrow · 6:30 PM",
    title: "Youth Spiritual Meeting",
    where: "St. Mark's Hall, 3rd Floor",
    now: false,
  },
  {
    when: "Friday · 9:00 AM",
    title: "Sunday School Trip",
    where: "Wadi El Rayan Monastery",
    now: false,
  },
  {
    when: "Sep 11 · All day",
    title: "Feast of El-Nayrouz",
    where: "Coptic New Year celebration",
    now: false,
  },
];

function ChurchHome() {
  const [following, setFollowing] = useState(false);
  const [lang, setLang] = useState<"ar" | "en">("ar");

  return (
    <div className="mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden bg-ivory pb-16 text-ink selection:bg-gold/20">
      {/* 1 — Premium Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-ink/5 bg-ivory/75 px-5 py-3.5 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-gold/10 ring-1 ring-gold/25">
            <CopticCross className="size-4 text-gold" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[17px] font-semibold tracking-tight">
              St. Mary &amp; St. Mark
            </span>
            <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ink/40">
              Alpha Coptic
            </span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Notifications"
            className="press relative grid size-10 place-items-center rounded-full bg-parchment ring-1 ring-ink/5"
          >
            <BellIcon className="size-[18px] text-ink/60" />
            <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-gold ring-2 ring-parchment" />
          </button>
          {/* Visible only for the priest */}
          {isPriest && (
            <Link
              to="/church-control"
              className="press grid size-10 place-items-center rounded-full bg-ink text-ivory shadow-soft"
              aria-label="تحكم الكنيسة"
              title="تحكم الكنيسة"
            >
              <ShieldIcon className="size-[18px]" />
            </Link>
          )}

        </div>
      </header>

      <main>
        {/* 2 — Premium Hero */}
        <section className="relative px-4 pt-3">
          <div className="relative h-[420px] overflow-hidden rounded-[34px] ring-1 ring-ink/10">
            <img
              src={churchCover}
              alt="Sunlight falling on the altar during the Divine Liturgy"
              width={800}
              height={1200}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-ivory/20 px-3 py-1.5 backdrop-blur-md">
              <span className="size-1.5 animate-pulse rounded-full bg-gold" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ivory">
                Liturgy in progress
              </span>
            </div>
          </div>

          {/* Floating identity card */}
          <div className="glass-card animate-float-up relative -mt-28 mx-1.5 rounded-[32px] p-6">
            <div className="flex items-start gap-3">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-parchment ring-1 ring-gold/25">
                <CopticCross className="size-7 text-gold" />
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                    Shoubra · Cairo Governorate
                  </span>
                  <VerifiedIcon className="size-4 text-gold" />
                </div>
                <h1 className="mt-1.5 font-display text-[27px] font-semibold italic leading-[1.12] tracking-tight text-balance">
                  St. Mary &amp; St. Mark Coptic Orthodox Church
                </h1>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-y border-ink/8 py-4">
              <div className="flex flex-col">
                <span className="text-[11px] text-ink/45">Members</span>
                <span className="font-display text-xl font-semibold">1,248</span>
              </div>
              <div className="h-9 w-px bg-ink/8" />
              <div className="flex flex-col">
                <span className="text-[11px] text-ink/45">Families</span>
                <span className="font-display text-xl font-semibold">372</span>
              </div>
              <div className="h-9 w-px bg-ink/8" />
              <div className="flex flex-col text-right">
                <span className="text-[11px] text-ink/45">Next Liturgy</span>
                <span className="font-display text-xl font-semibold text-gold">Sun 7:00</span>
              </div>
            </div>

            <p className="mt-4 text-[12.5px] leading-relaxed text-ink/55">
              A home for 372 families in Shoubra since 1948. You belong here.
            </p>

            <button
              type="button"
              onClick={() => setFollowing((v) => !v)}
              aria-pressed={following}
              className={`press mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-full text-[13px] font-semibold transition-colors ${
                following
                  ? "border border-gold/30 bg-gold/10 text-gold"
                  : "bg-ink text-ivory shadow-soft"
              }`}
            >
              <HeartIcon className="size-4" />
              {following ? "تمت المتابعة" : "متابعة الكنيسة"}
            </button>
          </div>

        </section>



        {/* 4 — Church Priests */}
        <section className="mt-12">
          <div className="flex items-end justify-between px-5">
            <div>
              <h2 className="font-display text-[26px] font-semibold tracking-tight">The Fathers</h2>
              <p className="mt-0.5 text-[12px] text-ink/45">Shepherds of our parish</p>
            </div>
            <button type="button" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
              View all
            </button>
          </div>

          <div className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
            {priests.map((p) => (
              <article
                key={p.name}
                className="press w-[228px] flex-none snap-center rounded-[30px] border border-ink/5 bg-parchment p-4 shadow-soft"
              >
                <div className="overflow-hidden rounded-[22px]">
                  <img
                    src={p.photo}
                    alt={`Portrait of ${p.name}`}
                    width={600}
                    height={800}
                    loading="lazy"
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
                <h3 className="mt-4 font-display text-[20px] font-semibold leading-tight">{p.name}</h3>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-gold">
                  {p.rank}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={`Call ${p.name}`}
                    className="press grid size-10 place-items-center rounded-full border border-ink/5 bg-ivory text-ink/60"
                  >
                    <PhoneIcon className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Message ${p.name}`}
                    className="press grid size-10 place-items-center rounded-full border border-ink/5 bg-ivory text-ink/60"
                  >
                    <ChatIcon className="size-4" />
                  </button>
                  <button
                    type="button"
                    className="press flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-ink text-[11px] font-semibold text-ivory"
                  >
                    <CalendarPlusIcon className="size-4" />
                    Appointment
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
              <h2 className="font-display text-[26px] font-semibold tracking-tight">Church Life</h2>
              <p className="mt-0.5 text-[12px] text-ink/45">Everything within reach</p>
            </div>
            <button type="button" className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">
              View all
            </button>
          </div>

          <div className="glass-card mt-6 grid grid-cols-4 gap-y-6 rounded-[30px] px-3 py-6">
            {quickLinks.map((l) => (
              <button
                key={l.title}
                type="button"
                className="press flex flex-col items-center gap-2 px-1 text-center"
              >
                <span
                  className={`grid size-12 place-items-center rounded-[20px] ${quickTile[l.tone]}`}
                  aria-hidden="true"
                >
                  {l.icon}
                </span>
                <span className="text-[10.5px] font-semibold leading-tight tracking-tight text-ink/75">
                  {l.title}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 5b — Church Posts */}
        <section dir="rtl" className="font-arabic mt-12 px-4">
          <div className="mb-4 flex items-end justify-between px-1">
            <div>
              <h2 className="text-[16px] font-bold tracking-tight">منشورات الكنيسة</h2>
              <p className="mt-1 text-[10.5px] text-ink/40">آخر الأخبار والإعلانات</p>
            </div>
            <button
              type="button"
              className="press inline-flex items-center gap-0.5 text-[11.5px] font-semibold text-ink/50"
            >
              عرض الكل
              <ChevronRight className="size-3.5 rotate-180" />
            </button>
          </div>

          <div className="space-y-3">
            {churchPosts.map((post) => (
              <article key={post.title} className="press glass-card overflow-hidden rounded-[28px]">
                <div className="flex items-center gap-2.5 px-4 pt-3.5">
                  <img src={churchCrest} alt="" loading="lazy" width={512} height={512} className="size-7" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[11.5px] font-semibold">
                      كنيسة السيدة العذراء مريم والقديس مارمرقس
                    </span>
                    <span className="mt-0.5 block text-[9.5px] text-ink/40">
                      {post.category} · {post.date}
                    </span>
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[9.5px] font-semibold ${
                      post.visibility === "public"
                        ? "bg-gold/12 text-gold ring-1 ring-gold/20"
                        : "bg-lavender/40 text-ink/60 ring-1 ring-lavender"
                    }`}
                  >
                    {post.visibility === "public" ? "عام" : "أعضاء الكنيسة"}
                  </span>
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
                    <HeartIcon className="size-4 text-gold" />
                    {post.likes} إعجاب
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[11.5px] font-semibold text-ink/50">
                    التفاصيل
                    <ChevronRight className="size-3.5 rotate-180" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>


        {/* 6 — Upcoming Events */}
        <section className="mt-14 px-5">
          <h2 className="font-display text-[26px] font-semibold tracking-tight">Church Calendar</h2>
          <p className="mt-0.5 text-[12px] text-ink/45">Gatherings ahead</p>

          <div className="relative mt-7 space-y-7">
            <span className="absolute bottom-2 left-[5px] top-2 w-px bg-ink/8" />
            {calendar.map((e) => (
              <div key={e.title} className="relative pl-9">
                <span
                  className={`absolute left-0 top-1.5 size-[11px] rounded-full ring-4 ring-ivory ${
                    e.now ? "bg-gold" : "bg-ink/15"
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${
                    e.now ? "text-gold" : "text-ink/40"
                  }`}
                >
                  {e.when}
                </span>
                <div
                  className={`mt-2 rounded-[24px] border border-ink/5 p-4 ${
                    e.now ? "bg-parchment shadow-soft" : "bg-white/70"
                  }`}
                >
                  <h3 className="font-display text-[19px] font-semibold leading-tight">{e.title}</h3>
                  <p className="mt-1 text-[12px] text-ink/50">{e.where}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7 — Latest Church Posts */}
        <section className="mt-14">
          <div className="px-5">
            <h2 className="font-display text-[26px] font-semibold tracking-tight">Announcements</h2>
            <p className="mt-0.5 text-[12px] text-ink/45">Moments from our community</p>
          </div>

          <div className="mt-6 space-y-6 px-4">
            <FeedPost
              author="Church Media"
              time="2 hours ago"
              image={postYouth}
              alt="Coptic youth gathered in front of the monastery gate"
              body="Highlights from the Resurrection Feast celebrations — thank you to every servant who made this week possible."
              likes="142"
              comment={{ name: "Mariam A.", text: "The chorus was heavenly — God bless you all." }}
            />
            <FeedPost
              author="Fr. Bishoy Samuel"
              time="Yesterday"
              image={postCandles}
              alt="Candles glowing in a quiet church prayer corner"
              body="The prayer corner stays open all week. Come light a candle and be still for a while."
              likes="86"
              comment={{ name: "Peter G.", text: "Passed by after work — such peace." }}
            />
          </div>
        </section>

        {/* 8 — Footer */}
        <footer className="mt-20 border-t border-ink/8 px-8 py-14 text-center">
          <span className="mx-auto grid size-11 place-items-center rounded-full bg-gold/10 ring-1 ring-gold/25">
            <CopticCross className="size-5 text-gold" />
          </span>
          <p className="mt-6 font-display text-[21px] italic text-ink/45">“My Church, my home.”</p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-ink/30">
            Alpha Coptic · Shoubra, Cairo
          </p>
        </footer>
      </main>
    </div>
  );
}

function FeedPost({
  author,
  time,
  image,
  alt,
  body,
  likes,
  comment,
}: {
  author: string;
  time: string;
  image: string;
  alt: string;
  body: string;
  likes: string;
  comment: { name: string; text: string };
}) {
  return (
    <article className="rounded-[32px] border border-ink/5 bg-white/80 p-4 shadow-soft">
      <div className="flex items-center gap-3 px-1 pb-4">
        <span className="grid size-9 place-items-center rounded-full bg-parchment ring-1 ring-gold/20">
          <CopticCross className="size-4 text-gold" />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[13px] font-semibold">{author}</span>
          <span className="text-[10.5px] text-ink/40">{time}</span>
        </span>
      </div>

      <div className="overflow-hidden rounded-[24px]">
        <img
          src={image}
          alt={alt}
          width={1000}
          height={750}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
      </div>

      <div className="px-1.5 pt-4">
        <p className="text-[13.5px] leading-relaxed text-ink/70 text-pretty">{body}</p>

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
            Comment
          </button>
          <button type="button" className="ml-auto flex items-center gap-1 text-[11px] font-semibold text-gold">
            Read
            <ChevronRight className="size-3.5" />
          </button>
        </div>

        <div className="mt-4 rounded-[20px] bg-lavender/25 p-3.5">
          <p className="text-[12px] leading-relaxed text-ink/65">
            <span className="font-semibold text-ink/80">{comment.name}</span> {comment.text}
          </p>
        </div>
      </div>
    </article>
  );
}
