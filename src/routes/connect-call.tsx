import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { MemberAvatar, VoiceBars } from "@/components/connect/ConnectShell";
import {
  BackGlyph,
  ChatGlyph,
  LockGlyph,
  MuteGlyph,
  PhoneEndGlyph,
  SpeakerGlyph,
} from "@/components/connect/connect-icons";
import { Screen } from "@/components/layout/Screen";
import { CL, L, friends, pick } from "@/lib/connect-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/connect-call")({
  validateSearch: (search: Record<string, unknown>) => ({
    who: typeof search["who"] === "string" ? (search["who"] as string) : "f1",
  }),
  head: () => ({
    meta: [
      { title: "مكالمة صوتية مشفّرة | ألفا كونكت" },
      {
        name: "description",
        content: "مكالمة صوتية مشفّرة داخل ألفا كونكت — صوت فقط بدون فيديو، مع كتم ومكبر صوت وإنهاء المكالمة.",
      },
      { property: "og:title", content: "مكالمة صوتية مشفّرة | ألفا كونكت" },
      {
        property: "og:description",
        content: "اتصال صوتي مشفّر بين أعضاء الكنيسة داخل ألفا كونكت، بدون فيديو.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConnectCall,
});

function ConnectCall() {
  const { lang, dir, isArabic } = useLang();
  const { who } = Route.useSearch();
  const navigate = useNavigate();
  const friend = friends.find((f) => f.id === who) ?? friends[0]!;

  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(true);

  return (
    <Screen className="ac-page" withBottomNav={false}>
      <div
        dir={dir}
        className={`relative mx-auto flex min-h-screen w-full max-w-[430px] flex-col overflow-hidden ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[420px]">
          <span className="ac-halo absolute -top-28 start-1/2 size-[420px] -translate-x-1/2 opacity-60 blur-3xl" />
        </div>

        <header className="safe-top relative flex items-center gap-2 px-4 pt-2">
          <Link to="/connect-friends" aria-label={pick(L.back, lang)}>
            <span className="press grid size-10 place-items-center rounded-full border border-aqua/20 bg-acdeep/55 text-acivory/85">
              <BackGlyph className="size-[18px] rtl:-scale-x-100" />
            </span>
          </Link>
          <span className="ms-auto inline-flex items-center gap-1.5 rounded-full border border-signal/35 bg-signal/12 px-3 py-1.5 font-manrope text-[10px] font-bold text-signal">
            <LockGlyph className="size-[12px]" />
            {pick(CL.voiceOnly, lang)}
          </span>
        </header>

        <main className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
          <span className="relative inline-grid place-items-center">
            <span
              aria-hidden="true"
              className="ac-sonar absolute inset-0 -m-6 rounded-full border"
              style={{ borderColor: "color-mix(in oklab, var(--ac-signal) 55%, transparent)" }}
            />
            <MemberAvatar member={friend} size={132} showShield={false} />
          </span>

          <h1 className="mt-8 font-display text-[26px] text-acivory">{pick(friend.name, lang)}</h1>
          <p className="mt-1 text-[12.5px] text-acquiet">{pick(friend.role, lang)}</p>

          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-signal/30 bg-signal/10 px-4 py-2 font-manrope text-[11.5px] font-bold text-signal">
            <VoiceBars bars={4} />
            {pick(CL.inCall, lang)} · ٠٢:١٤
          </p>

          <p className="mt-3 font-manrope text-[10.5px] tracking-[0.16em] text-acquiet uppercase">
            {pick(CL.calling, lang)}
          </p>
        </main>

        <div className="safe-bottom relative px-6 pb-6">
          <div className="ac-glass flex items-center justify-between gap-3 rounded-[28px] px-5 py-4">
            <button
              type="button"
              onClick={() => setMuted((v) => !v)}
              className={`press flex flex-col items-center gap-1.5 rounded-2xl px-3 py-2 ${
                muted ? "text-acgold" : "text-acquiet"
              }`}
            >
              <MuteGlyph className="size-[20px]" />
              <span className="font-manrope text-[10px] font-semibold">{pick(CL.mute, lang)}</span>
            </button>

            <button
              type="button"
              onClick={() => setSpeaker((v) => !v)}
              className={`press flex flex-col items-center gap-1.5 rounded-2xl px-3 py-2 ${
                speaker ? "text-signal" : "text-acquiet"
              }`}
            >
              <SpeakerGlyph className="size-[20px]" />
              <span className="font-manrope text-[10px] font-semibold">{pick(CL.speaker, lang)}</span>
            </button>

            <Link
              to="/connect-chat"
              search={{ who: friend.id }}
              className="press flex flex-col items-center gap-1.5 rounded-2xl px-3 py-2 text-acquiet"
            >
              <ChatGlyph className="size-[20px]" />
              <span className="font-manrope text-[10px] font-semibold">{pick(CL.message, lang)}</span>
            </Link>

            <button
              type="button"
              onClick={() => navigate({ to: "/connect-friends" })}
              aria-label={pick(CL.endCall, lang)}
              className="press grid size-14 place-items-center rounded-full border border-red-400/45 bg-red-400/18 text-red-300"
            >
              <PhoneEndGlyph className="size-[22px]" />
            </button>
          </div>
        </div>
      </div>
    </Screen>
  );
}
