import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  AcChip,
  AcIconButton,
  AcSectionTitle,
  AcSheet,
  MemberAvatar,
  VoiceBars,
} from "@/components/connect/ConnectShell";
import {
  BackGlyph,
  ChatGlyph,
  MicGlyph,
  PlusGlyph,
  SearchGlyph,
} from "@/components/connect/connect-icons";
import { Screen } from "@/components/layout/Screen";
import { SloganBand } from "@/components/layout/SloganBand";
import {
  L,
  inboxFilters,
  participants,
  pick,
  presenceLabel,
  threads,
  type InboxFilter,
} from "@/lib/connect-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/connect-messages")({
  head: () => ({
    meta: [
      { title: "الرسائل — محادثات ورسائل صوتية | ألفا كونكت" },
      {
        name: "description",
        content:
          "The Alpha Connect inbox: direct and group conversations, voice messages, member shields and temporary messages — calm and premium.",
      },
      { property: "og:title", content: "الرسائل — محادثات ورسائل صوتية | ألفا كونكت" },
      {
        property: "og:description",
        content: "Direct chats, groups and voice messages for your church community inside Alpha Connect.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConnectMessages;
});

function ConnectMessages() {
  const { lang, dir, isArabic } = useLang();
  const [filter, setFilter] = useState<InboxFilter>("all");
  const [newOpen, setNewOpen] = useState(false);

  const list = threads.filter((t) =>
    filter === "all"
      ? true
      : filter === "unread"
        ? t.unread > 0
        : filter === "voice"
          ? t.voice
          : t.group,
  );
  const unread = threads.reduce((n, t) => n + t.unread, 0);

  return (
    <Screen className="ac-page">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-1 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[240px] overflow-hidden">
          <span className="ac-halo absolute -top-24 start-1/2 size-[340px] -translate-x-1/2 opacity-50 blur-2xl" />
          <span className="absolute inset-0 bg-gradient-to-b from-transparent via-acnight/35 to-acnight" />
        </div>

        <header className="safe-top relative px-4 pt-2">
          <div className="flex items-center gap-2">
            <Link to="/connect" aria-label={pick(L.back, lang)}>
              <span className="press grid size-10 place-items-center rounded-full border border-aqua/20 bg-acdeep/55 text-acivory/85 backdrop-blur-xl">
                <BackGlyph className="size-[18px] rtl:-scale-x-100" />
              </span>
            </Link>
            <AcIconButton label={pick(L.search, lang)}>
              <SearchGlyph className="size-[18px]" />
            </AcIconButton>
            <button
              type="button"
              onClick={() => setNewOpen(true)}
              className="press ac-cta ms-auto inline-flex items-center gap-1.5 rounded-full px-3.5 py-2.5 font-manrope text-[11.5px] font-bold text-acnight"
            >
              <PlusGlyph className="size-[14px]" />
              {isArabic ? "محادثة جديدة" : "New chat"}
            </button>
          </div>

          <div className="mt-5">
            <p className="font-manrope text-[9.5px] font-bold tracking-[0.24em] text-aqua/75 uppercase">
              {pick(L.appName, lang)}
            </p>
            <h1 className="ac-gilt mt-1.5 font-display text-[30px] leading-tight">{pick(L.messages, lang)}</h1>
            <p className="mt-1 text-[12px] text-acquiet">
              {unread} {isArabic ? "رسالة غير مقروءة" : "unread messages"}
            </p>
          </div>

          <label className="ac-glass mt-4 flex items-center gap-2.5 rounded-full px-4 py-3">
            <SearchGlyph className="size-[16px] shrink-0 text-acquiet" />
            <input
              placeholder={pick(L.searchPlaceholder, lang)}
              className="min-w-0 flex-1 bg-transparent text-[12.5px] text-acivory outline-none placeholder:text-acquiet/60"
            />
          </label>

          <div className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
            {inboxFilters.map((f) => (
              <AcChip key={f.key} on={filter === f.key} onClick={() => setFilter(f.key)}>
                {pick(f.label, lang)}
              </AcChip>
            ))}
          </div>
        </header>

        <main className="relative mt-6 space-y-7 px-4">
          <section>
            <AcSectionTitle eyebrow={pick(L.appName, lang)} title={pick(L.messages, lang)} />

            {list.length === 0 ? (
              <div className="ac-glass mt-3 rounded-[26px] p-6 text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-full border border-aqua/25 text-aqua">
                  <ChatGlyph className="size-[20px]" />
                </span>
                <p className="mt-3 font-display text-[18px] text-acivory">{pick(L.emptyMessages, lang)}</p>
                <p className="mx-auto mt-1.5 max-w-[250px] text-[12px] leading-relaxed text-acquiet">
                  {pick(L.emptyMessagesHint, lang)}
                </p>
              </div>
            ) : (
              <ul className="mt-3 space-y-2.5">
                {list.map((t) => (
                  <li
                    key={t.id}
                    className="ac-card flex items-center gap-3 rounded-[22px] p-3"
                    style={{ ["--hue" as string]: t.tone }}
                  >
                    <MemberAvatar
                      member={{
                        id: t.id,
                        name: t.name,
                        role: t.preview,
                        shield: t.shield,
                        presence: t.presence,
                        initial: t.initial,
                        tone: t.tone,
                      }}
                      size={46}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate font-display text-[16px] text-acivory">{pick(t.name, lang)}</p>
                        {t.group ? (
                          <span className="shrink-0 rounded-full border border-aqua/25 px-1.5 py-[1px] font-manrope text-[8.5px] tracking-[0.1em] text-aqua/80 uppercase">
                            {isArabic ? "مجموعة" : "group"}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-0.5 flex items-center gap-1.5 truncate text-[11.5px] text-acquiet">
                        {t.voice ? <MicGlyph className="size-[12px] shrink-0 text-signal" /> : null}
                        <span className="truncate">{pick(t.preview, lang)}</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-manrope text-[10px] text-acquiet">{pick(t.when, lang)}</span>
                      {t.unread > 0 ? (
                        <span className="grid min-w-5 place-items-center rounded-full bg-signal px-1.5 py-[1px] font-manrope text-[10px] font-bold text-acnight">
                          {t.unread}
                        </span>
                      ) : t.presence === "speaking" ? (
                        <VoiceBars bars={3} />
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section>
            <AcSectionTitle eyebrow={pick(L.live, lang)} title={isArabic ? "أرسل صوتك" : "Send your voice"} />
            <div className="ac-glass mt-3 flex items-center gap-3 rounded-[24px] p-3.5">
              <span className="ac-cta grid size-12 shrink-0 place-items-center rounded-full text-acnight">
                <MicGlyph className="size-[20px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] text-acivory">{pick(L.pttHold, lang)}</p>
                <p className="mt-0.5 font-manrope text-[10px] tracking-[0.14em] text-acquiet uppercase">
                  {pick(L.pttHint, lang)}
                </p>
              </div>
              <VoiceBars bars={4} active={false} />
            </div>
          </section>

          <SloganBand className="text-acivory" />
        </main>

        <AcSheet
          open={newOpen}
          onClose={() => setNewOpen(false)}
          dir={dir}
          eyebrow={pick(L.appName, lang)}
          title={isArabic ? "محادثة جديدة" : "New conversation"}
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
                <AcChip on tone="var(--ac-aqua)">
                  {isArabic ? "مراسلة" : "Message"}
                </AcChip>
              </li>
            ))}
          </ul>
        </AcSheet>
      </div>
    </Screen>
  );
}
