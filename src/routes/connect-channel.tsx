import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { MembershipQr } from "@/components/church/MembershipQr";
import {
  AcChip,
  AcIconButton,
  AcSectionTitle,
  AcSheet,
  ChannelAvatar,
  LiveTag,
  MemberAvatar,
  VoiceBars,
  Waveform,
} from "@/components/connect/ConnectShell";
import {
  BackGlyph,
  CheckGlyph,
  GearGlyph,
  HeadsetGlyph,
  MicGlyph,
  PauseGlyph,
  PlayGlyph,
  QrGlyph,
  ShareGlyph,
  TrashGlyph,
  UsersGlyph,
} from "@/components/connect/connect-icons";
import { ConnectNav } from "@/components/connect/ConnectNav";
import { Screen } from "@/components/layout/Screen";
import { SloganBand } from "@/components/layout/SloganBand";
import {
  L,
  channels,
  participants,
  pick,
  presenceLabel,
  recordings,
  settingGroups,
} from "@/lib/connect-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/connect-channel")({
  head: () => ({
    meta: [
      { title: "قناة صوتية — اضغط للتحدث | ألفا كونكت" },
      {
        name: "description",
        content:
          "A live Alpha Connect voice channel: push-to-talk broadcasting, participants with their shields, saved voice recordings, channel QR and invitations.",
      },
      { property: "og:title", content: "قناة صوتية — اضغط للتحدث | ألفا كونكت" },
      {
        property: "og:description",
        content: "Push-to-talk, participants and voice recordings inside an Alpha Connect channel.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConnectChannel,
});

const channel = channels[0]!;

function ConnectChannel() {
  const { lang, dir, isArabic } = useLang();
  const [talking, setTalking] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [playing, setPlaying] = useState<string | null>("r1");

  return (
    <Screen className="ac-page">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-1 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[320px] overflow-hidden">
          <span className="ac-halo absolute -top-28 start-1/2 size-[380px] -translate-x-1/2 opacity-70 blur-2xl" />
          <span className="absolute inset-0 bg-gradient-to-b from-transparent via-acnight/35 to-acnight" />
        </div>

        <header className="safe-top relative px-4 pt-2">
          <div className="flex items-center gap-2">
            <Link to="/connect" aria-label={pick(L.back, lang)}>
              <span className="press grid size-10 place-items-center rounded-full border border-aqua/20 bg-acdeep/55 text-acivory/85 backdrop-blur-xl">
                <BackGlyph className="size-[18px] rtl:-scale-x-100" />
              </span>
            </Link>
            <AcIconButton label={pick(L.channelQr, lang)} onClick={() => setQrOpen(true)}>
              <QrGlyph className="size-[18px]" />
            </AcIconButton>
            <div className="ms-auto flex items-center gap-2">
              <AcIconButton label={pick(L.members, lang)} onClick={() => setPeopleOpen(true)}>
                <UsersGlyph className="size-[18px]" />
              </AcIconButton>
              <AcIconButton label={pick(L.settings, lang)} onClick={() => setSettingsOpen(true)}>
                <GearGlyph className="size-[18px]" />
              </AcIconButton>
            </div>
          </div>

          {/* channel identity */}
          <div className="mt-5 flex items-start gap-3">
            <ChannelAvatar icon={channel.icon} hue={channel.hue} size={58} live={channel.live} />
            <div className="min-w-0 flex-1">
              <h1 className="truncate font-display text-[25px] leading-tight text-acivory">
                {pick(channel.name, lang)}
              </h1>
              <p className="mt-0.5 truncate text-[12px] text-acquiet">{pick(channel.topic, lang)}</p>
              <div className="mt-2 flex items-center gap-2">
                <LiveTag label={pick(L.live, lang)} />
                <span className="font-manrope text-[10px] font-semibold text-aqua/80">
                  {channel.onlineNow} {pick(L.online, lang)}
                </span>
              </div>
            </div>
          </div>

          {/* speaking now */}
          <div className="ac-glass mt-4 flex items-center gap-3 rounded-[22px] p-3">
            <MemberAvatar member={participants[0]!} size={42} />
            <div className="min-w-0 flex-1">
              <p className="font-manrope text-[9px] font-bold tracking-[0.2em] text-signal uppercase">
                {pick(presenceLabel.speaking, lang)}
              </p>
              <p className="mt-0.5 truncate text-[13px] text-acivory">{pick(participants[0]!.name, lang)}</p>
            </div>
            <VoiceBars bars={5} />
          </div>
        </header>

        <main className="relative mt-6 space-y-7 px-4">
          {/* ── Push to talk orb ─────────────────────────── */}
          <section className="flex flex-col items-center">
            <button
              type="button"
              aria-pressed={talking}
              onPointerDown={() => setTalking(true)}
              onPointerUp={() => setTalking(false)}
              onPointerLeave={() => setTalking(false)}
              className="relative grid size-[212px] place-items-center rounded-full select-none"
            >
              <span
                aria-hidden="true"
                className={`absolute inset-0 rounded-full border ${
                  talking ? "border-signal/70" : "border-aqua/25"
                }`}
              />
              <span aria-hidden="true" className="ac-sonar absolute inset-2 rounded-full border border-signal/45" />
              <span aria-hidden="true" className="ac-sonar-late absolute inset-2 rounded-full border border-aqua/35" />
              <span
                className={`grid size-[152px] place-items-center rounded-full text-center ${
                  talking ? "ac-cta text-acnight" : "ac-breathe ac-glass text-acivory"
                }`}
              >
                <span className="flex flex-col items-center gap-2">
                  <MicGlyph className="size-9" />
                  {talking ? <VoiceBars bars={6} tone="var(--ac-night)" /> : null}
                </span>
              </span>
            </button>
            <p className="mt-4 font-display text-[19px] text-acivory">
              {talking ? pick(L.pttLive, lang) : pick(L.pttHold, lang)}
            </p>
            <p className="mt-1 font-manrope text-[10px] tracking-[0.16em] text-acquiet uppercase">
              {pick(L.pttHint, lang)}
            </p>

            <div className="mt-4 flex items-center gap-2">
              <AcChip on={!talking} tone="var(--ac-aqua)">
                <HeadsetGlyph className="size-[14px]" />
                {isArabic ? "استماع" : "Listening"}
              </AcChip>
              <AcChip>{isArabic ? "كتم الميكروفون" : "Mute mic"}</AcChip>
              <AcChip>{isArabic ? "مغادرة" : "Leave"}</AcChip>
            </div>
          </section>

          {/* ── Participants ─────────────────────────────── */}
          <section>
            <AcSectionTitle
              eyebrow={pick(L.appName, lang)}
              title={pick(L.members, lang)}
              action={
                <button
                  type="button"
                  onClick={() => setPeopleOpen(true)}
                  className="press font-manrope text-[11px] font-semibold text-aqua/85"
                >
                  {isArabic ? "الكل" : "See all"}
                </button>
              }
            />
            <ul className="mt-3 space-y-2.5">
              {participants.slice(0, 4).map((m) => (
                <li
                  key={m.id}
                  className="ac-card flex items-center gap-3 rounded-[20px] p-3"
                  style={{ ["--hue" as string]: m.tone }}
                >
                  <MemberAvatar member={m} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium text-acivory">{pick(m.name, lang)}</p>
                    <p className="mt-0.5 truncate text-[11px] text-acquiet">{pick(m.role, lang)}</p>
                  </div>
                  <span className="flex items-center gap-2">
                    {m.presence === "speaking" ? <VoiceBars bars={3} /> : null}
                    <span className="font-manrope text-[9.5px] tracking-[0.12em] text-acquiet uppercase">
                      {pick(presenceLabel[m.presence], lang)}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Recordings ───────────────────────────────── */}
          <section>
            <AcSectionTitle eyebrow={pick(L.appName, lang)} title={pick(L.recordings, lang)} />
            <ul className="mt-3 space-y-2.5">
              {recordings.map((r) => {
                const on = playing === r.id;
                return (
                  <li key={r.id} className="ac-card rounded-[22px] p-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={pick(r.title, lang)}
                        onClick={() => setPlaying(on ? null : r.id)}
                        className={`press grid size-11 shrink-0 place-items-center rounded-full ${
                          on ? "ac-cta text-acnight" : "border border-aqua/25 text-aqua"
                        }`}
                      >
                        {on ? <PauseGlyph className="size-[17px]" /> : <PlayGlyph className="size-[17px]" />}
                      </button>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-acivory">{pick(r.title, lang)}</p>
                        <p className="mt-0.5 truncate font-manrope text-[10px] text-acquiet">
                          {pick(r.author, lang)} · {pick(r.when, lang)} · {r.length}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label={isArabic ? "حذف" : "Delete"}
                        className="press grid size-9 place-items-center rounded-full border border-aqua/15 text-acquiet"
                      >
                        <TrashGlyph className="size-[15px]" />
                      </button>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2">
                      <Waveform wave={r.wave} progress={on ? 0.42 : 0} tone={on ? "var(--ac-signal)" : "var(--ac-aqua)"} />
                      <span className="font-manrope text-[10px] tabular-nums text-acquiet">{r.length}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* ── Channel actions ──────────────────────────── */}
          <section className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setSettingsOpen(true)}
              className="press ac-card flex items-center gap-2.5 rounded-[20px] p-3.5 text-start"
            >
              <span className="grid size-9 place-items-center rounded-full border border-aqua/25 text-aqua">
                <GearGlyph className="size-[16px]" />
              </span>
              <span className="text-[12.5px] text-acivory/90">{isArabic ? "إعدادات القناة" : "Channel settings"}</span>
            </button>
            <button
              type="button"
              onClick={() => setQrOpen(true)}
              className="press ac-card flex items-center gap-2.5 rounded-[20px] p-3.5 text-start"
            >
              <span className="grid size-9 place-items-center rounded-full border border-aqua/25 text-aqua">
                <ShareGlyph className="size-[16px]" />
              </span>
              <span className="text-[12.5px] text-acivory/90">{pick(L.invite, lang)}</span>
            </button>
          </section>

          <SloganBand className="text-acivory" />
        </main>

        {/* ── QR / invite sheet ──────────────────────────── */}
        <AcSheet
          open={qrOpen}
          onClose={() => setQrOpen(false)}
          dir={dir}
          eyebrow={pick(L.appName, lang)}
          title={pick(L.channelQr, lang)}
          footer={
            <button
              type="button"
              onClick={() => setQrOpen(false)}
              className="press ac-cta w-full rounded-full py-3.5 font-manrope text-[13px] font-bold text-acnight"
            >
              {pick(L.invite, lang)}
            </button>
          }
        >
          <div className="flex flex-col items-center">
            <div className="w-[62%]">
              <MembershipQr value={`alpha-connect-${channel.id}`} label={pick(L.channelQr, lang)} />
            </div>
            <p className="mt-3 font-display text-[17px] text-acivory">{pick(channel.name, lang)}</p>
            <p className="mt-1 text-center text-[11.5px] text-acquiet">
              {isArabic
                ? "امسح الكود للانضمام للقناة الصوتية فورًا."
                : "Scan to join this voice channel instantly."}
            </p>
            <div className="mt-4 flex w-full items-center gap-2">
              <span className="min-w-0 flex-1 truncate rounded-full border border-aqua/20 bg-acdeep/50 px-4 py-2.5 font-manrope text-[11px] text-acquiet" dir="ltr">
                alpha.connect/{channel.id}
              </span>
              <span className="press grid size-10 shrink-0 place-items-center rounded-full border border-aqua/25 text-aqua">
                <CheckGlyph className="size-[16px]" />
              </span>
            </div>
          </div>
        </AcSheet>

        {/* ── Participants sheet ─────────────────────────── */}
        <AcSheet
          open={peopleOpen}
          onClose={() => setPeopleOpen(false)}
          dir={dir}
          eyebrow={`${channel.members} ${pick(L.members, lang)}`}
          title={pick(L.members, lang)}
        >
          <ul className="space-y-2.5">
            {participants.map((m) => (
              <li
                key={m.id}
                className="ac-card flex items-center gap-3 rounded-[20px] p-3"
                style={{ ["--hue" as string]: m.tone }}
              >
                <MemberAvatar member={m} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium text-acivory">{pick(m.name, lang)}</p>
                  <p className="mt-0.5 truncate text-[11px] text-acquiet">
                    {pick(m.role, lang)} · {pick(presenceLabel[m.presence], lang)}
                  </p>
                </div>
                <AcChip>{isArabic ? "الملف" : "Profile"}</AcChip>
              </li>
            ))}
          </ul>
        </AcSheet>

        {/* ── Channel settings sheet ─────────────────────── */}
        <AcSheet
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          dir={dir}
          eyebrow={pick(channel.name, lang)}
          title={isArabic ? "إعدادات القناة" : "Channel settings"}
          footer={
            <button
              type="button"
              onClick={() => setSettingsOpen(false)}
              className="press ac-cta w-full rounded-full py-3.5 font-manrope text-[13px] font-bold text-acnight"
            >
              {pick(L.saveChanges, lang)}
            </button>
          }
        >
          <ul className="space-y-2">
            {settingGroups[1]!.rows.concat(settingGroups[4]!.rows).map((row) => (
              <li key={row.id} className="flex items-center gap-3 rounded-2xl border border-aqua/15 bg-acdeep/40 p-3">
                <span className="min-w-0 flex-1 text-[12.5px] text-acivory/90">{pick(row.label, lang)}</span>
                {row.kind === "switch" ? (
                  <span
                    className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                      row.on ? "bg-signal/80" : "bg-acivory/15"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 size-5 rounded-full bg-acnight transition-all ${
                        row.on ? "start-[22px]" : "start-0.5"
                      }`}
                    />
                  </span>
                ) : (
                  <span className="font-manrope text-[11px] text-aqua/85">
                    {row.value ? pick(row.value, lang) : "—"}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </AcSheet>
      </div>
      <ConnectNav active="channels" />
    </Screen>
  );
}
