import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import churchCover from "@/assets/church-cover.jpg";
import churchCrest from "@/assets/church-crest.png";
import profileAvatar from "@/assets/profile-avatar.jpg";
import priest1 from "@/assets/priest-1.jpg";
import priest2 from "@/assets/priest-2.jpg";
import priest3 from "@/assets/priest-3.jpg";

import {
  BellIcon,
  BibleIcon,
  ChevronRight,
  CopticCross,
  FamiliesIcon,
  GroupsIcon,
  HeartIcon,
  HelpIcon,
  MembersIcon,
  MoreIcon,
  ShieldIcon,
  VerifiedIcon,
} from "@/components/church/icons";
import { LanguageToggle } from "@/components/church/LanguageToggle";
import { Shield } from "@/components/church/Shield";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "صفحتي — Alpha Coptic" },
      {
        name: "description",
        content:
          "Your personal Alpha Coptic page: your church, family, friends, picks, community and spiritual journey in one calm place.",
      },
      { property: "og:title", content: "صفحتي — Alpha Coptic" },
      {
        property: "og:description",
        content: "Your spiritual life and the people around you, gathered beautifully.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MyPage,
});

/* Presentation-only sample content. */
const family = [
  { key: "me.family.1", photo: priest1 },
  { key: "me.family.2", photo: priest2 },
  { key: "me.family.3", photo: priest3 },
  { key: "me.family.4", photo: priest1 },
];

const friends = [priest2, priest3, priest1, priest2, priest3, priest1];

const picks = [
  { key: "me.picks.1", icon: <BibleIcon className="size-5" />, tone: "lavender" as const },
  { key: "me.picks.2", icon: <HeartIcon className="size-5" />, tone: "gold" as const },
  { key: "me.picks.3", icon: <MembersIcon className="size-5" />, tone: "parchment" as const },
  { key: "me.picks.4", icon: <MoreIcon className="size-5" />, tone: "lavender" as const },
];

const pickTone: Record<"gold" | "lavender" | "parchment", string> = {
  gold: "bg-gold/12 text-gold ring-1 ring-gold/20",
  lavender: "bg-lavender/40 text-ink/70 ring-1 ring-lavender",
  parchment: "bg-parchment text-ink/60 ring-1 ring-ink/5",
};

const community = [
  { key: "me.community.1", slug: "community" as const },
  { key: "me.community.2", slug: "audio" as const },
  { key: "me.community.3", slug: "events" as const },
];

const journey = [
  { key: "me.journey.reading", value: "me.journey.readingValue", pct: 62 },
  { key: "me.journey.prayer", value: "me.journey.prayerValue", pct: 45 },
  { key: "me.journey.service", value: "me.journey.serviceValue", pct: 80 },
];

const myShields = ["servant", "bible", "my-prayer", "meditations"] as const;

/** Presentation-only permission flag for the control center entry. */
const canControl = true;

const requests = [
  { key: "me.requests.1", photo: priest2, slug: "servant" as const },
  { key: "me.requests.2", photo: priest3, slug: "member" as const },
  { key: "me.requests.3", photo: priest1, slug: "community" as const },
];

const personal: { key: string; icon: ReactNode; gated?: boolean }[] = [
  { key: "me.personal.account", icon: <MembersIcon className="size-[18px]" /> },
  { key: "me.personal.prayers", icon: <HeartIcon className="size-[18px]" /> },
  { key: "me.personal.notifications", icon: <BellIcon className="size-[18px]" /> },
  { key: "me.personal.privacy", icon: <ShieldIcon className="size-[18px]" /> },
  { key: "me.personal.language", icon: <GroupsIcon className="size-[18px]" /> },
  { key: "me.personal.help", icon: <HelpIcon className="size-[18px]" /> },
  { key: "me.personal.control", icon: <ServicesIcon className="size-[18px]" />, gated: true },
];


function SectionHead({
  title,
  note,
  action,
}: {
  title: string;
  note?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-3.5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
      <div className="min-w-0">
        <h2 className="truncate font-display text-[19px] font-semibold tracking-tight">{title}</h2>
        {note ? <p className="mt-1 truncate text-[11.5px] text-ink/45">{note}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function ViewAll({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="press flex items-center gap-1 text-[11.5px] font-semibold text-gold"
    >
      {label}
      <ChevronRight className="size-3.5 rtl:rotate-180" />
    </button>
  );
}

function MyPage() {
  const { t, dir, isArabic } = useLang();
  const arabic = isArabic ? "font-arabic" : "";

  return (
    <div
      dir={dir}
      className={cn(
        arabic,
        "mx-auto min-h-screen w-full max-w-[430px] overflow-x-hidden bg-ivory text-ink selection:bg-gold/20",
      )}
    >
      {/* Header */}
      <header className="safe-top safe-sticky-top sticky z-50 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-ink/5 bg-ivory/75 px-5 pb-3.5 backdrop-blur-xl">
        <div className="min-w-0">
          <h1 className="truncate font-display text-[17px] font-semibold tracking-tight">
            {t("me.title")}
          </h1>
          <p className="mt-0.5 truncate text-[10.5px] text-ink/40">{t("me.subtitle")}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            aria-label={t("me.settings")}
            className="press grid size-9 place-items-center rounded-full bg-parchment text-ink/55 ring-1 ring-ink/5"
          >
            <MoreIcon className="size-[18px]" />
          </button>
        </div>
      </header>

      <main className="px-5 pb-4">
        {/* 1 — Identity */}
        <section className="pt-5">
          <div className="glass-card relative overflow-hidden rounded-[32px] p-5">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-14 size-40 rounded-full bg-gold/12 blur-2xl"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-12 bottom-0 size-32 rounded-full bg-lavender/50 blur-2xl"
            />

            <div className="relative flex items-center gap-4">
              <span className="relative shrink-0">
                <span
                  aria-hidden="true"
                  className="absolute -inset-1.5 rounded-full bg-gold/25 blur-lg"
                />
                <img
                  src={profileAvatar}
                  alt={t("me.avatarAlt")}
                  width={768}
                  height={768}
                  className="relative size-[86px] rounded-full object-cover ring-2 ring-ivory shadow-[var(--shadow-soft)]"
                />
                <span className="absolute -bottom-0.5 -left-0.5 grid size-7 place-items-center rounded-full bg-ivory ring-1 ring-gold/25 rtl:-left-auto rtl:-right-0.5">
                  <Shield slug="servant" size="sm" className="size-5" />
                </span>
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex min-w-0 items-center gap-1.5">
                  <h2 className="truncate font-display text-[21px] font-semibold tracking-tight">
                    {t("me.name")}
                  </h2>
                  <VerifiedIcon className="size-4 shrink-0 text-gold" />
                </div>
                <p className="mt-1 truncate text-[11.5px] text-ink/45">{t("me.handle")}</p>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full bg-gold/12 px-2.5 py-1 text-[10.5px] font-semibold text-gold ring-1 ring-gold/20">
                    {t("me.role")}
                  </span>
                  <span className="rounded-full bg-parchment px-2.5 py-1 text-[10.5px] font-medium text-ink/50 ring-1 ring-ink/5">
                    {t("me.since")}
                  </span>
                </div>
              </div>
            </div>

            {/* counters */}
            <div className="relative mt-5 grid grid-cols-3 divide-x divide-ink/5 rounded-3xl bg-ivory/70 py-3.5 ring-1 ring-ink/5 rtl:divide-x-reverse">
              {[
                ["me.stat.friendsValue", "me.stat.friends"],
                ["me.stat.savedValue", "me.stat.saved"],
                ["me.stat.streakValue", "me.stat.streak"],
              ].map(([value, label]) => (
                <div key={label} className="px-2 text-center">
                  <p className="font-display text-[19px] font-semibold leading-none">{t(value!)}</p>
                  <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-ink/40">
                    {t(label!)}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative mt-4 flex items-center gap-2.5">
              <button
                type="button"
                className="press flex-1 rounded-full bg-ink px-4 py-3 text-[12.5px] font-semibold text-ivory shadow-lift"
              >
                {t("me.editProfile")}
              </button>
              <button
                type="button"
                className="press rounded-full bg-parchment px-4 py-3 text-[12.5px] font-semibold text-ink/65 ring-1 ring-ink/5"
              >
                {t("me.share")}
              </button>
            </div>
          </div>
        </section>

        {/* 2 — My Church */}
        <section className="pt-9">
          <SectionHead title={t("me.church.section")} />
          <Link
            to="/my-church"
            className="press block overflow-hidden rounded-[28px] shadow-lift ring-1 ring-ink/5"
          >
            <div className="relative h-[132px]">
              <img
                src={churchCover}
                alt={t("home.cover.alt")}
                width={1024}
                height={640}
                loading="lazy"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/5" />
              <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-4">
                <img
                  src={churchCrest}
                  alt=""
                  width={96}
                  height={96}
                  loading="lazy"
                  className="size-11 shrink-0 rounded-2xl bg-ivory/12 object-contain p-1.5 ring-1 ring-ivory/20 backdrop-blur-md"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-[15px] font-semibold text-ivory">
                    {t("app.churchShort")}
                  </p>
                  <p className="mt-1 truncate text-[10.5px] text-ivory/60">{t("me.church.role")}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-ivory/12 px-3 py-1.5 text-[11px] font-semibold text-gold ring-1 ring-ivory/15 backdrop-blur-md">
                  {t("me.church.open")}
                  <ChevronRight className="size-3.5 rtl:rotate-180" />
                </span>
              </div>
            </div>
          </Link>
        </section>

        {/* 3 — My Family */}
        <section className="pt-9">
          <SectionHead
            title={t("me.family.section")}
            note={t("me.family.note")}
            action={<ViewAll label={t("app.viewAll")} />}
          />
          <div className="rounded-[28px] bg-parchment p-2 ring-1 ring-ink/5">
            <ul className="divide-y divide-ink/5">
              {family.map((m) => (
                <li key={m.key}>
                  <button
                    type="button"
                    className="press flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-start"
                  >
                    <img
                      src={m.photo}
                      alt=""
                      width={200}
                      height={200}
                      loading="lazy"
                      className="size-11 shrink-0 rounded-full object-cover ring-1 ring-ivory"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-semibold">{t(m.key)}</span>
                      <span className="mt-0.5 block truncate text-[11px] text-ink/45">
                        {t(`${m.key}.rel`)}
                      </span>
                    </span>
                    <FamiliesIcon className="size-4 shrink-0 text-ink/25" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 4 — Friends */}
        <section className="pt-9">
          <SectionHead
            title={t("me.friends.section")}
            note={t("me.friends.note")}
            action={<ViewAll label={t("app.viewAll")} />}
          />
          <div className="glass-card rounded-[28px] p-4">
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {friends.map((photo, i) => (
                <button
                  key={i}
                  type="button"
                  className="press shrink-0"
                  aria-label={t("me.friends.section")}
                >
                  <img
                    src={photo}
                    alt=""
                    width={200}
                    height={200}
                    loading="lazy"
                    className="size-14 rounded-full object-cover ring-2 ring-ivory shadow-[var(--shadow-soft)]"
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              className="press mt-4 flex w-full items-center justify-between rounded-2xl bg-gold/10 px-4 py-3 ring-1 ring-gold/20"
            >
              <span className="text-[12.5px] font-semibold text-gold">
                {t("me.friends.requests")}
              </span>
              <span className="grid size-6 place-items-center rounded-full bg-gold/20 text-[11px] font-bold text-gold">
                ٣
              </span>
            </button>
          </div>
        </section>

        {/* 5 — My Picks */}
        <section className="pt-9">
          <SectionHead
            title={t("me.picks.section")}
            note={t("me.picks.note")}
            action={<ViewAll label={t("app.viewAll")} />}
          />
          <div className="grid grid-cols-2 gap-3">
            {picks.map((p) => (
              <button
                key={p.key}
                type="button"
                className="press rounded-3xl bg-ivory p-4 text-start shadow-[var(--shadow-soft)] ring-1 ring-ink/5"
              >
                <span
                  className={cn("grid size-10 place-items-center rounded-2xl", pickTone[p.tone])}
                >
                  {p.icon}
                </span>
                <span className="mt-3 block text-[13px] font-semibold leading-snug">
                  {t(p.key)}
                </span>
                <span className="mt-1 block text-[10.5px] text-ink/40">{t(`${p.key}.count`)}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 6 — My Community (distinct from My Picks) */}
        <section className="pt-9">
          <SectionHead
            title={t("me.community.section")}
            note={t("me.community.note")}
            action={<ViewAll label={t("app.viewAll")} />}
          />
          <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {community.map((c) => (
              <button
                key={c.key}
                type="button"
                className="press w-[168px] shrink-0 snap-start rounded-[26px] bg-parchment p-4 text-start ring-1 ring-ink/5"
              >
                <Shield slug={c.slug} size="md" halo />
                <span className="mt-3 block text-[13px] font-semibold leading-snug">
                  {t(c.key)}
                </span>
                <span className="mt-1 block text-[10.5px] text-ink/45">{t(`${c.key}.meta`)}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 7 — Spiritual Journey */}
        <section className="pt-9">
          <SectionHead
            title={t("me.journey.section")}
            note={t("me.journey.note")}
            action={<ViewAll label={t("me.journey.open")} />}
          />
          <div className="glass-card rounded-[30px] p-5">
            <ul className="space-y-4">
              {journey.map((j) => (
                <li key={j.key}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="truncate text-[12.5px] font-medium text-ink/70">
                      {t(j.key)}
                    </span>
                    <span className="shrink-0 font-display text-[13px] font-semibold text-gold">
                      {t(j.value)}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink/8">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-gold/70 to-gold"
                      style={{ width: `${j.pct}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-ink/5 pt-4">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink/40">
                {t("me.journey.shields")}
              </p>
              <div className="mt-3 flex items-center gap-3">
                {myShields.map((slug) => (
                  <Shield key={slug} slug={slug} size="sm" />
                ))}
                <span className="grid size-9 place-items-center rounded-full bg-parchment text-[11px] font-semibold text-ink/40 ring-1 ring-ink/5">
                  +٥
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 8 — Personal sections */}
        <section className="pt-9">
          <SectionHead title={t("me.personal.section")} />
          <div className="overflow-hidden rounded-[28px] bg-ivory shadow-[var(--shadow-soft)] ring-1 ring-ink/5">
            <ul className="divide-y divide-ink/5">
              {personal
                .filter((p) => !p.gated || canControl)
                .map((p) => (
                  <li key={p.key}>
                    <button
                      type="button"
                      className="press flex w-full items-center gap-3 px-4 py-3.5 text-start"
                    >
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-2xl ring-1",
                          p.gated
                            ? "bg-gold/12 text-gold ring-gold/20"
                            : "bg-parchment text-ink/55 ring-ink/5",
                        )}
                      >
                        {p.icon}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                        {t(p.key)}
                      </span>
                      <ChevronRight className="size-4 shrink-0 text-ink/25 rtl:rotate-180" />
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </section>


        {/* 9 — Soft footer */}
        <footer className="pb-4 pt-10 text-center">
          <CopticCross className="mx-auto size-5 text-gold/70" />
          <p className="mt-3 font-display text-[14px] italic text-ink/45">{t("me.footer")}</p>
          <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-ink/25">
            {t("app.brand")}
          </p>
        </footer>
      </main>
    </div>
  );
}
