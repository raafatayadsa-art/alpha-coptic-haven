import { Link } from "@tanstack/react-router";

import { MemberAvatar, VoiceBars } from "@/components/connect/ConnectShell";
import { MicGlyph, PhoneGlyph, ChatGlyph } from "@/components/connect/connect-icons";
import { channels, friends, pick, threads, L } from "@/lib/connect-data";
import { useLang } from "@/lib/i18n";

/**
 * "A glimpse of Alpha Connect" — compact two-line dark strip living inside the
 * ivory Home screen. Presentation only: the whole strip opens /connect, the
 * trailing round button answers the incoming call or opens the latest chat.
 */
export function ConnectGlimpse() {
  const { lang, isArabic } = useLang();

  const live = channels.find((c) => c.live);
  const caller = friends[0]!;
  const latest = threads[0]!;
  const unread = threads.reduce((sum, t) => sum + t.unread, 0);
  const incoming = Boolean(live);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className={`ac-page relative overflow-hidden rounded-[22px] px-3 py-2.5 shadow-[0_16px_34px_-20px_color-mix(in_oklab,var(--ac-night)_60%,transparent)] ring-1 ring-aqua/20 ${
        isArabic ? "font-arabic" : "font-sans"
      }`}
    >
      <Link
        to="/connect"
        aria-label={pick(L.appName, lang)}
        className="absolute inset-0 z-0 rounded-[22px]"
      />

      <div className="pointer-events-none relative z-10 space-y-1.5">
        {/* line 1 — identity + live */}
        <div className="flex items-center gap-2">
          <span className="relative grid size-7 shrink-0 place-items-center rounded-full ac-cta text-acnight">
            <MicGlyph className="size-[13px]" />
            {live ? (
              <span
                aria-hidden="true"
                className="ac-sonar absolute inset-0 rounded-full border border-signal/70"
              />
            ) : null}
          </span>
          <span className="ac-gilt min-w-0 flex-1 truncate font-display text-[13px] leading-none">
            Alpha Connect
          </span>
          {live ? (
            <>
              <span className="flex items-center gap-1 rounded-full border border-signal/35 bg-signal/12 px-1.5 py-0.5">
                <span className="size-1 rounded-full bg-signal" />
                <span className="font-manrope text-[8px] font-bold text-signal uppercase">
                  {pick(L.live, lang)}
                </span>
              </span>
              <VoiceBars bars={3} className="h-2.5" />
            </>
          ) : null}
        </div>

        {/* line 2 — one activity row */}
        <div className="flex items-center gap-2">
          {incoming ? (
            <MemberAvatar member={caller} size={26} />
          ) : (
            <span
              className="grid size-[26px] shrink-0 place-items-center rounded-full border text-[10px] text-acivory"
              style={{
                borderColor: latest.tone,
                background: `color-mix(in oklab, ${latest.tone} 16%, transparent)`,
              }}
            >
              {latest.initial}
            </span>
          )}
          <span className="min-w-0 flex-1 truncate text-[11px] text-acivory/90">
            {incoming ? pick(caller.name, lang) : pick(latest.name, lang)}
            <span className="mx-1 text-acquiet">·</span>
            <span className={incoming ? "text-signal" : "text-acquiet"}>
              {incoming
                ? isArabic
                  ? "اتصال صوتي وارد"
                  : "Incoming call"
                : pick(latest.preview, lang)}
            </span>
          </span>
          {unread ? (
            <span className="grid size-[18px] shrink-0 place-items-center rounded-full bg-acgold font-manrope text-[9px] font-bold text-acnight">
              {unread}
            </span>
          ) : null}
          {incoming ? (
            <Link
              to="/connect-call"
              search={{ who: caller.id }}
              aria-label={isArabic ? "الرد على الاتصال" : "Answer call"}
              className="pointer-events-auto press grid size-8 shrink-0 place-items-center rounded-full ac-cta text-acnight"
            >
              <PhoneGlyph className="size-[14px]" />
            </Link>
          ) : (
            <Link
              to="/connect-chat"
              search={{ who: `f${latest.id.slice(1)}` }}
              aria-label={pick(L.messages, lang)}
              className="pointer-events-auto press grid size-8 shrink-0 place-items-center rounded-full border border-aqua/25 bg-acdeep/55 text-acivory/85"
            >
              <ChatGlyph className="size-[14px]" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
