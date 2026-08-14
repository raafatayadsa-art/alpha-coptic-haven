import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  AcChip,
  AcIconButton,
  AcSectionTitle,
  AcSheet,
  ChannelAvatar,
  LiveTag,
  MemberAvatar,
  VoiceBars,
} from "@/components/connect/ConnectShell";
import {
  BellGlyph,
  ChannelGlyph,
  ChatGlyph,
  CheckGlyph,
  ChevronGlyph,
  GearGlyph,
  MicGlyph,
  PlusGlyph,
  SearchGlyph,
  UsersGlyph,
} from "@/components/connect/connect-icons";
import { SloganBand } from "@/components/layout/SloganBand";
import { Screen } from "@/components/layout/Screen";
import {
  L,
  audiences,
  channelIcons,
  channels,
  notifications,
  participants,
  pick,
  type Audience,
  type ChannelIconKey,
} from "@/lib/connect-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "ألفا كونكت — قنوات ورسائل وصوت الكنيسة | Alpha" },
      {
        name: "description",
        content:
          "Alpha Connect: church voice channels, push-to-talk broadcasts, messages and members — one calm, premium space for your community.",
      },
      { property: "og:title", content: "ألفا كونكت — قنوات ورسائل وصوت الكنيسة | Alpha" },
      {
        property: "og:description",
        content: "Voice channels, push-to-talk and messages for your Coptic Orthodox community inside Alpha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConnectHome,
});

function ConnectHome() {
  const { lang, dir, isArabic } = useLang();
  const [newOpen, setNewOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [icon, setIcon] = useState<ChannelIconKey>("church");
  const [audience, setAudience] = useState<Audience>("everyone");
  const [tab, setTab] = useState<"channels" | "favorites">("channels");

  const favorites = channels.filter((c) => c.favorite);
  const list = tab === "favorites" ? favorites : channels;
  const liveCount = channels.filter((c) => c.live).length;

  return (
    <Screen className="ac-page">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-1 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        {/* ── Aurora hero ───────────────────────────────── */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[280px] overflow-hidden">
          <span className="ac-halo absolute -top-24 start-1/2 size-[360px] -translate-x-1/2 opacity-60 blur-2xl" />
          <span className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-acnight/40 to-acnight" />
        </div>

        <header className="safe-top relative px-4 pt-2">
          <div className="flex items-center gap-2">
            <AcIconButton label={pick(L.search, lang)}>
              <SearchGlyph className="size-[18px]" />
            </AcIconButton>
            <AcIconButton label={pick(L.notifications, lang)} onClick={() => setBellOpen(true)} className="relative">
              <BellGlyph className="size-[18px]" />
              <span
                aria-hidden="true"
                className="absolute -end-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-signal font-manrope text-[8.5px] font-bold text-acnight"
              >
                {notifications.length}
              </span>
            </AcIconButton>
            <Link to="/connect-settings" aria-label={pick(L.settings, lang)} className="ms-auto">
              <span className="press grid size-10 place-items-center rounded-full border border-aqua/20 bg-acdeep/55 text-acivory/85 backdrop-blur-xl">
                <GearGlyph className="size-[18px]" />
              </span>
            </Link>
          </div>

          <div className="mt-5">
            <p className="font-manrope text-[9.5px] font-bold tracking-[0.24em] text-aqua/75 uppercase">
              {pick(L.appName, lang)}
            </p>
            <h1 className="ac-gilt mt-1.5 font-display text-[33px] leading-[1.1]">
              {pick(L.heroTitle, lang)}
            </h1>
            <p className="mt-1.5 max-w-[290px] text-[12.5px] leading-relaxed text-acquiet">
              {pick(L.tagline, lang)}
            </p>
          </div>

          {/* live strip */}
          <div className="ac-glass mt-4 flex items-center gap-3 rounded-[22px] p-3">
            <span className="relative grid size-11 shrink-0 place-items-center rounded-full ac-cta text-acnight">
              <MicGlyph className="size-[19px]" />
              <span aria-hidden="true" className="ac-sonar absolute inset-0 rounded-full border border-signal/70" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-manrope text-[9px] font-bold tracking-[0.2em] text-signal uppercase">
                {pick(L.live, lang)} · {liveCount}
              </p>
              <p className="mt-0.5 truncate text-[13px] text-acivory">
                {pick(channels[0].speaking ?? channels[0].name, lang)} — {pick(channels[0].name, lang)}
              </p>
            </div>
            <VoiceBars bars={4} />
          </div>

          {/* quick rails */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            {(
              [
                { to: "/connect-messages" as const, icon: <ChatGlyph className="size-[17px]" />, label: L.messages },
                { to: "/connect-channel" as const, icon: <ChannelGlyph className="size-[17px]" />, label: L.voiceChannels },
                { to: "/connect-settings" as const, icon: <UsersGlyph className="size-[17px]" />, label: L.members },
              ]
            ).map((q) => (
              <Link
                key={q.to + pick(q.label, "en")}
                to={q.to}
                className="press ac-card flex flex-col items-start gap-2 rounded-[20px] p-3"
              >
                <span className="grid size-8 place-items-center rounded-full border border-aqua/25 text-aqua">
                  {q.icon}
                </span>
                <span className="text-[11.5px] font-medium text-acivory/85">{pick(q.label, lang)}</span>
              </Link>
            ))}
          </div>
        </header>

        <main className="relative mt-7 space-y-7 px-4">
          {/* ── Channels ─────────────────────────────────── */}
          <section>
            <AcSectionTitle
              eyebrow={pick(L.appName, lang)}
              title={tab === "favorites" ? pick(L.favorites, lang) : pick(L.allChannels, lang)}
              action={
                <button
                  type="button"
                  onClick={() => setNewOpen(true)}
                  className="press ac-cta inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-manrope text-[11px] font-bold text-acnight"
                >
                  <PlusGlyph className="size-[14px]" />
                  {pick(L.newChannel, lang)}
                </button>
              }
            />

            <div className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
              <AcChip on={tab === "channels"} onClick={() => setTab("channels")}>
                {pick(L.allChannels, lang)} · {channels.length}
              </AcChip>
              <AcChip on={tab === "favorites"} tone="var(--ac-gold)" onClick={() => setTab("favorites")}>
                ★ {pick(L.favorites, lang)} · {favorites.length}
              </AcChip>
            </div>

            <ul className="mt-3 space-y-2.5">
              {list.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/connect-channel"
                    className="press ac-card flex items-center gap-3 rounded-[22px] p-3"
                    style={{ ["--hue" as string]: c.hue }}
                  >
                    <ChannelAvatar icon={c.icon} hue={c.hue} live={c.live} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate font-display text-[16.5px] text-acivory">{pick(c.name, lang)}</span>
                        {c.favorite ? <span className="text-[11px] text-acgold">★</span> : null}
                      </span>
                      <span className="mt-0.5 block truncate text-[11.5px] text-acquiet">{pick(c.topic, lang)}</span>
                      <span className="mt-1.5 flex items-center gap-2">
                        <span className="font-manrope text-[10px] font-semibold text-aqua/80">
                          {c.onlineNow} {pick(L.online, lang)}
                        </span>
                        <span aria-hidden="true" className="size-1 rounded-full bg-acquiet/40" />
                        <span className="font-manrope text-[10px] text-acquiet">
                          {c.members} {pick(L.members, lang)}
                        </span>
                      </span>
                    </span>
                    <span className="flex flex-col items-end gap-2">
                      {c.live ? <LiveTag label={pick(L.live, lang)} /> : null}
                      <ChevronGlyph className="size-[15px] text-acquiet/70 rtl:-scale-x-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Members on air ───────────────────────────── */}
          <section>
            <AcSectionTitle eyebrow={pick(L.live, lang)} title={pick(L.members, lang)} />
            <div className="no-scrollbar -mx-1 mt-3 flex gap-3 overflow-x-auto px-1 pb-1">
              {participants.map((m) => (
                <div
                  key={m.id}
                  className="ac-card flex w-[112px] shrink-0 flex-col items-center gap-2 rounded-[22px] p-3 text-center"
                  style={{ ["--hue" as string]: m.tone }}
                >
                  <MemberAvatar member={m} size={48} />
                  <p className="mt-0.5 line-clamp-2 text-[11.5px] leading-snug text-acivory/90">
                    {pick(m.name, lang)}
                  </p>
                  <p className="font-manrope text-[9.5px] tracking-[0.1em] text-acquiet uppercase">
                    {pick(m.role, lang)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Empty state showcase ─────────────────────── */}
          <section className="ac-glass rounded-[26px] p-5 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full border border-aqua/25 text-aqua">
              <ChannelGlyph className="size-[20px]" />
            </span>
            <p className="mt-3 font-display text-[18px] text-acivory">{pick(L.emptyChannels, lang)}</p>
            <p className="mx-auto mt-1.5 max-w-[260px] text-[12px] leading-relaxed text-acquiet">
              {pick(L.emptyChannelsHint, lang)}
            </p>
            <button
              type="button"
              onClick={() => setNewOpen(true)}
              className="press ac-cta mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 font-manrope text-[12px] font-bold text-acnight"
            >
              <PlusGlyph className="size-[15px]" />
              {pick(L.newChannel, lang)}
            </button>
          </section>

          <SloganBand className="text-acivory" />
        </main>

        {/* ── Notifications sheet ────────────────────────── */}
        <AcSheet
          open={bellOpen}
          onClose={() => setBellOpen(false)}
          dir={dir}
          eyebrow={pick(L.appName, lang)}
          title={pick(L.notifications, lang)}
        >
          <ul className="space-y-2.5">
            {notifications.map((n) => (
              <li key={n.id} className="ac-card flex items-start gap-3 rounded-[20px] p-3">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-aqua/25 text-aqua">
                  <BellGlyph className="size-[15px]" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[12.5px] leading-relaxed text-acivory/90">{pick(n.text, lang)}</span>
                  <span className="mt-1 block font-manrope text-[10px] text-acquiet">{pick(n.when, lang)}</span>
                </span>
              </li>
            ))}
          </ul>
        </AcSheet>

        {/* ── New channel sheet ──────────────────────────── */}
        <AcSheet
          open={newOpen}
          onClose={() => setNewOpen(false)}
          dir={dir}
          eyebrow={pick(L.appName, lang)}
          title={pick(L.newChannel, lang)}
          footer={
            <button
              type="button"
              onClick={() => setNewOpen(false)}
              className="press ac-cta w-full rounded-full py-3.5 font-manrope text-[13px] font-bold text-acnight"
            >
              {pick(L.createJoin, lang)}
            </button>
          }
        >
          <div className="space-y-4">
            <label className="block">
              <span className="font-manrope text-[9.5px] font-bold tracking-[0.18em] text-aqua/75 uppercase">
                {isArabic ? "اسم القناة" : "Channel name"}
              </span>
              <input
                placeholder={isArabic ? "مثال: اجتماع الشباب" : "e.g. Youth meeting"}
                className="mt-1.5 w-full rounded-2xl border border-aqua/20 bg-acdeep/50 px-4 py-3 text-[13px] text-acivory outline-none placeholder:text-acquiet/60 focus:border-aqua/50"
              />
            </label>
            <label className="block">
              <span className="font-manrope text-[9.5px] font-bold tracking-[0.18em] text-aqua/75 uppercase">
                {isArabic ? "الموضوع" : "Topic"}
              </span>
              <input
                placeholder={isArabic ? "وصف قصير للقناة" : "A short channel description"}
                className="mt-1.5 w-full rounded-2xl border border-aqua/20 bg-acdeep/50 px-4 py-3 text-[13px] text-acivory outline-none placeholder:text-acquiet/60 focus:border-aqua/50"
              />
            </label>

            <div>
              <span className="font-manrope text-[9.5px] font-bold tracking-[0.18em] text-aqua/75 uppercase">
                {isArabic ? "من يتلقى الإشعارات" : "Who gets notified"}
              </span>
              <div className="mt-2 space-y-2">
                {audiences.map((a) => (
                  <button
                    key={a.key}
                    type="button"
                    onClick={() => setAudience(a.key)}
                    className={`press flex w-full items-center gap-3 rounded-2xl border p-3 text-start transition-colors ${
                      audience === a.key
                        ? "border-signal/50 bg-signal/10"
                        : "border-aqua/15 bg-acdeep/40"
                    }`}
                  >
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full border ${
                        audience === a.key ? "border-signal/60 text-signal" : "border-aqua/25 text-acquiet"
                      }`}
                    >
                      {audience === a.key ? <CheckGlyph className="size-[13px]" /> : null}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[12.5px] font-medium text-acivory">{pick(a.label, lang)}</span>
                      <span className="mt-0.5 block text-[11px] text-acquiet">{pick(a.hint, lang)}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-manrope text-[9.5px] font-bold tracking-[0.18em] text-aqua/75 uppercase">
                {isArabic ? "أيقونة القناة" : "Channel icon"}
              </span>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {channelIcons.map((ic) => (
                  <button
                    key={ic.key}
                    type="button"
                    onClick={() => setIcon(ic.key)}
                    className={`press flex flex-col items-center gap-1.5 rounded-2xl border p-2.5 transition-colors ${
                      icon === ic.key ? "border-aqua/60 bg-aqua/12" : "border-aqua/15 bg-acdeep/40"
                    }`}
                  >
                    <ChannelAvatar
                      icon={ic.key}
                      hue={icon === ic.key ? "var(--ac-signal)" : "var(--ac-aqua)"}
                      size={34}
                    />
                    <span className="text-[10px] text-acquiet">{pick(ic.label, lang)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AcSheet>
      </div>
    </Screen>
  );
}
