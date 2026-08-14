import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

import { AcSheet, MemberAvatar, Waveform } from "@/components/connect/ConnectShell";
import { ConnectNav } from "@/components/connect/ConnectNav";
import {
  BackGlyph,
  ChatGlyph,
  CheckGlyph,
  ClockGlyph,
  DotsGlyph,
  EmojiGlyph,
  FingerprintGlyph,
  LockGlyph,
  MicGlyph,
  MuteGlyph,
  PhoneGlyph,
  PlayGlyph,
  SendGlyph,
  ShieldLockGlyph,
  TrashGlyph,
} from "@/components/connect/connect-icons";
import { Screen } from "@/components/layout/Screen";
import {
  CL,
  L,
  chatMessages,
  chatSettingsRows,
  disappearOptions,
  friends,
  pick,
  securityInfo,
  type ChatSettingRow,
} from "@/lib/connect-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/connect-chat")({
  validateSearch: (search: Record<string, unknown>) => ({
    who: typeof search["who"] === "string" ? (search["who"] as string) : "f1",
  }),
  head: () => ({
    meta: [
      { title: "المحادثة — رسائل مشفّرة وحذف تلقائي | ألفا كونكت" },
      {
        name: "description",
        content:
          "محادثة ألفا كونكت المشفّرة: رسائل نصية وصوتية، مؤقّت اختفاء، إعدادات المحادثة ومركز الثقة والأمان.",
      },
      { property: "og:title", content: "المحادثة — رسائل مشفّرة وحذف تلقائي | ألفا كونكت" },
      {
        property: "og:description",
        content: "رسائل مشفّرة مع حذف تلقائي وإعدادات خصوصية لكل محادثة داخل ألفا كونكت.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConnectChat,
});

const rowIcon: Record<ChatSettingRow["icon"], (p: { className?: string }) => ReactNode> = {
  clock: ClockGlyph,
  mute: MuteGlyph,
  fingerprint: FingerprintGlyph,
  trash: TrashGlyph,
  shield: ShieldLockGlyph,
};

function ConnectChat() {
  const { lang, dir, isArabic } = useLang();
  const { who } = Route.useSearch();
  const friend = friends.find((f) => f.id === who) ?? friends[0]!;

  const [settingsOpen, setSettingsOpen] = useState(false);
  const [timerOpen, setTimerOpen] = useState(false);
  const [trustOpen, setTrustOpen] = useState(false);
  const [timer, setTimer] = useState("24h");
  const [draftTimer, setDraftTimer] = useState("24h");
  const [draft, setDraft] = useState("");
  const [cleared, setCleared] = useState(false);

  const timerLabel = pick(
    disappearOptions.find((o) => o.key === timer)?.label ?? disappearOptions[0]!.label,
    lang,
  );
  const list = cleared ? [] : chatMessages;

  return (
    <Screen className="ac-page">
      <div
        dir={dir}
        className={`relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col overflow-x-hidden ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        {/* Pinned header */}
        <header className="safe-sticky-top ac-glass sticky top-0 z-40 safe-top rounded-b-[26px] px-3 pt-2 pb-3">
          <div className="flex items-center gap-2">
            <Link to="/connect-messages" aria-label={pick(L.back, lang)}>
              <span className="press grid size-10 place-items-center rounded-full border border-aqua/20 bg-acdeep/55 text-acivory/85">
                <BackGlyph className="size-[18px] rtl:-scale-x-100" />
              </span>
            </Link>

            <MemberAvatar member={friend} size={40} />

            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[16px] text-acivory">{pick(friend.name, lang)}</p>
              <p className="mt-0.5 flex items-center gap-1 truncate font-manrope text-[10px] text-signal">
                <LockGlyph className="size-[11px]" />
                {pick(CL.encrypted, lang)}
              </p>
            </div>

            <Link
              to="/connect-call"
              search={{ who: friend.id }}
              aria-label={pick(CL.call, lang)}
              className="press grid size-10 place-items-center rounded-full border border-signal/35 bg-signal/12 text-signal"
            >
              <PhoneGlyph className="size-[17px]" />
            </Link>
            <button
              type="button"
              aria-label={pick(CL.chatSettings, lang)}
              onClick={() => setSettingsOpen(true)}
              className="press grid size-10 place-items-center rounded-full border border-aqua/20 bg-acdeep/55 text-acivory/85"
            >
              <DotsGlyph className="size-[17px]" />
            </button>
          </div>

          <p className="mt-2 rounded-full border border-acgold/25 bg-acgold/10 px-3 py-1 text-center font-manrope text-[10px] text-acgold">
            {pick(CL.churchOnly, lang)}
          </p>
        </header>

        {/* Thread */}
        <main className="relative flex-1 px-4 pt-4">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 grid place-items-center font-display text-[190px] leading-none text-acivory/[0.035]"
          >
            ⲁ
          </span>

          <p className="relative mx-auto inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-3 py-1.5 text-center font-manrope text-[10.5px] text-signal">
            <LockGlyph className="size-[12px] shrink-0" />
            {pick(CL.encryptedBanner, lang)}
          </p>

          <div className="relative mt-4 flex items-center gap-3">
            <span className="h-px flex-1 bg-acivory/10" />
            <span className="rounded-full border border-aqua/20 bg-acdeep/55 px-3 py-1 font-manrope text-[10px] text-acquiet">
              {pick(CL.today, lang)}
            </span>
            <span className="h-px flex-1 bg-acivory/10" />
          </div>

          {list.length === 0 ? (
            <div className="relative mt-16 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-full border border-aqua/25 text-aqua">
                <ChatGlyph className="size-[20px]" />
              </span>
              <p className="mt-3 font-display text-[18px] text-acivory">{pick(CL.emptyChat, lang)}</p>
              <p className="mt-1.5 text-[12px] text-acquiet">{pick(CL.emptyChatHint, lang)}</p>
            </div>
          ) : (
            <ul className="relative mt-4 space-y-2.5 pb-4">
              {list.map((m) => (
                <li key={m.id} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-[20px] border px-3.5 py-2.5 ${
                      m.mine
                        ? "border-signal/35 bg-signal/14 rounded-ee-[8px]"
                        : "border-aqua/18 bg-acdeep/70 rounded-es-[8px]"
                    }`}
                  >
                    {m.voice ? (
                      <div className="flex items-center gap-2.5">
                        <span className="press grid size-9 shrink-0 place-items-center rounded-full border border-signal/40 bg-signal/15 text-signal">
                          <PlayGlyph className="size-[14px]" />
                        </span>
                        <Waveform wave={m.voice.wave} progress={0.32} tone="var(--ac-signal)" className="w-[120px]" />
                        <span className="font-manrope text-[10px] text-acquiet">{m.voice.length}</span>
                      </div>
                    ) : (
                      <p className="text-[13px] leading-relaxed text-acivory">{pick(m.text!, lang)}</p>
                    )}

                    <div className="mt-1.5 flex items-center justify-end gap-1.5">
                      {m.temporary && timer !== "off" ? (
                        <span className="inline-flex items-center gap-1 font-manrope text-[9.5px] text-acgold">
                          <ClockGlyph className="size-[10px]" />
                          {pick(CL.expiresIn, lang)} {timerLabel}
                        </span>
                      ) : null}
                      <span className="font-manrope text-[9.5px] text-acquiet">{pick(m.when, lang)}</span>
                      {m.mine ? (
                        <CheckGlyph className={`size-[11px] ${m.read ? "text-signal" : "text-acquiet"}`} />
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </main>

        {/* Composer */}
        <div className="sticky bottom-0 z-30 px-3 pb-[86px]">
          <div className="ac-glass flex items-center gap-2 rounded-[24px] px-2.5 py-2">
            <button
              type="button"
              aria-label={isArabic ? "الرموز" : "Emoji"}
              className="press grid size-9 shrink-0 place-items-center rounded-full border border-aqua/18 text-acquiet"
            >
              <EmojiGlyph className="size-[17px]" />
            </button>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={pick(CL.typeMessage, lang)}
              className="min-w-0 flex-1 bg-transparent text-[13px] text-acivory outline-none placeholder:text-acquiet/60"
            />
            <button
              type="button"
              aria-label={pick(CL.disappearTitle, lang)}
              onClick={() => {
                setDraftTimer(timer);
                setTimerOpen(true);
              }}
              className={`press grid size-9 shrink-0 place-items-center rounded-full border ${
                timer === "off"
                  ? "border-aqua/18 text-acquiet"
                  : "border-acgold/45 bg-acgold/12 text-acgold"
              }`}
            >
              <ClockGlyph className="size-[16px]" />
            </button>
            <button
              type="button"
              aria-label={isArabic ? "رسالة صوتية" : "Voice message"}
              className="press grid size-9 shrink-0 place-items-center rounded-full border border-aqua/18 text-acivory/85"
            >
              <MicGlyph className="size-[16px]" />
            </button>
            <button
              type="button"
              aria-label={isArabic ? "إرسال" : "Send"}
              onClick={() => setDraft("")}
              className="press ac-cta grid size-10 shrink-0 place-items-center rounded-full text-acnight"
            >
              <SendGlyph className="size-[17px] rtl:-scale-x-100" />
            </button>
          </div>
        </div>

        {/* Chat settings sheet */}
        <AcSheet
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          dir={dir}
          eyebrow={pick(CL.chatSettingsHint, lang)}
          title={pick(CL.chatSettings, lang)}
        >
          <ul className="space-y-2.5">
            {chatSettingsRows.map((row) => {
              const Icon = rowIcon[row.icon];
              return (
                <li key={row.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (row.id === "expire") {
                        setDraftTimer(timer);
                        setTimerOpen(true);
                      } else if (row.id === "security") {
                        setTrustOpen(true);
                      } else if (row.id === "clear") {
                        setCleared(true);
                        setSettingsOpen(false);
                      }
                    }}
                    className={`press flex w-full items-center gap-3 rounded-[20px] border p-3 text-start ${
                      row.danger
                        ? "border-red-400/35 bg-red-400/10 text-red-300"
                        : "border-aqua/15 bg-acdeep/50 text-acivory"
                    }`}
                  >
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full border ${
                        row.danger ? "border-red-400/40 text-red-300" : "border-acgold/35 text-acgold"
                      }`}
                    >
                      <Icon className="size-[16px]" />
                    </span>
                    <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                      {pick(row.label, lang)}
                    </span>
                    {row.id === "expire" ? (
                      <span className="shrink-0 font-manrope text-[11px] text-acgold">{timerLabel}</span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </AcSheet>

        {/* Disappearing timer picker */}
        <AcSheet
          open={timerOpen}
          onClose={() => setTimerOpen(false)}
          dir={dir}
          eyebrow={pick(CL.chatSettings, lang)}
          title={pick(CL.disappearTitle, lang)}
          footer={
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setTimerOpen(false)}
                className="press flex-1 rounded-full border border-aqua/20 py-3 font-manrope text-[12.5px] font-bold text-acquiet"
              >
                {pick(CL.cancel, lang)}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTimer(draftTimer);
                  setTimerOpen(false);
                }}
                className="press ac-cta flex-1 rounded-full py-3 font-manrope text-[12.5px] font-bold text-acnight"
              >
                {pick(CL.done, lang)}
              </button>
            </div>
          }
        >
          <ul className="space-y-2">
            {disappearOptions.map((o) => {
              const on = draftTimer === o.key;
              return (
                <li key={o.key}>
                  <button
                    type="button"
                    onClick={() => setDraftTimer(o.key)}
                    className={`press flex w-full items-center gap-3 rounded-2xl border p-3 text-start transition-colors ${
                      on ? "border-signal/50 bg-signal/12" : "border-aqua/15 bg-acdeep/40"
                    }`}
                  >
                    <span
                      className={`grid size-7 shrink-0 place-items-center rounded-full border ${
                        on ? "border-signal/60 text-signal" : "border-aqua/25 text-acquiet"
                      }`}
                    >
                      {on ? <CheckGlyph className="size-[13px]" /> : null}
                    </span>
                    <span className="text-[13px] text-acivory">{pick(o.label, lang)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </AcSheet>

        {/* Trust & safety center */}
        <AcSheet
          open={trustOpen}
          onClose={() => setTrustOpen(false)}
          dir={dir}
          eyebrow={pick(CL.trustCenterHint, lang)}
          title={pick(CL.trustCenter, lang)}
        >
          <div className="space-y-5">
            <section>
              <p className="flex items-center gap-1.5 font-manrope text-[11px] font-bold tracking-[0.1em] text-signal uppercase">
                <ShieldLockGlyph className="size-[14px]" />
                {pick(CL.protection, lang)}
              </p>
              <ul className="ac-glass mt-2 divide-y divide-acivory/8 rounded-[22px] px-3.5">
                {securityInfo.protection.map((r) => (
                  <li key={r.label.en} className="flex items-center justify-between gap-3 py-3">
                    <span className="text-[12px] text-acquiet">{pick(r.label, lang)}</span>
                    <span className="text-end text-[12.5px] font-semibold text-acivory">
                      {pick(r.value, lang)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <p className="flex items-center gap-1.5 font-manrope text-[11px] font-bold tracking-[0.1em] text-signal uppercase">
                <ShieldLockGlyph className="size-[14px]" />
                {pick(CL.privacy, lang)}
              </p>
              <ul className="ac-glass mt-2 space-y-2.5 rounded-[22px] p-3.5">
                {securityInfo.privacy.map((p) => (
                  <li key={p.en} className="flex items-start gap-2 text-[12px] text-acquiet">
                    <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 rounded-full bg-signal" />
                    {pick(p, lang)}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </AcSheet>
      </div>

      <ConnectNav active="messages" />
    </Screen>
  );
}
