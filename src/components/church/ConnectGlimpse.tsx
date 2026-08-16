import { Link } from "@tanstack/react-router";

import { MemberAvatar, VoiceBars } from "@/components/connect/ConnectShell";
import { ChatGlyph, MicGlyph, PhoneGlyph } from "@/components/connect/connect-icons";
import { channels, friends, pick, threads, L } from "@/lib/connect-data";
import { useLang } from "@/lib/i18n";

/**
 * "A glimpse of Alpha Connect" — a dark Signal-Aurora card living inside the
 * ivory Home screen. Presentation only: tapping the card opens /connect, while
 * the incoming call and message rows deep-link into their own screens.
 */
export function ConnectGlimpse() {
  const { lang, isArabic } = useLang();

  const live = channels.find((c) => c.live) ?? channels[0]!;
  const caller = friends[0]!;
  const inbox = threads.slice(0, 2);
  const unread = threads.reduce((sum, t) => sum + t.unread, 0);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className={`ac-page relative overflow-hidden rounded-[30px] p-4 shadow-[0_28px_60px_-28px_color-mix(in_oklab,var(--ac-night)_60%,transparent)] ring-1 ring-aqua/20 ${
        isArabic ? "font-arabic" : "font-sans"
      }`}
    >
      <span
        aria-hidden="true"
        className="ac-halo pointer-events-none absolute -top-20 start-1/2 size-[280px] -translate-x-1/2 opacity-45 blur-2xl"
      />

      {/* whole-card tap target → Alpha Connect */}
      <Link
        to="/connect"
        aria-label={pick(L.appName, lang)}
        className="absolute inset-0 z-0 rounded-[30px]"
      />

      <div className="pointer-events-none relative z-10 space-y-3">
        {/* head */}
        <div className="flex items-start gap-2.5">
          <span className="relative grid size-11 shrink-0 place-items-center rounded-full ac-cta text-acnight">
            <MicGlyph className="size-[18px]" />
            <span aria-hidden="true" className="ac-sonar absolute inset-0 rounded-full border border-signal/70" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-manrope text-[9px] font-bold tracking-[0.22em] text-aqua/75 uppercase">
              {pick(L.appName, lang)}
            </p>
            <h3 className="ac-gilt mt-0.5 font-display text-[19px] leading-tight">
              {isArabic ? "كنيستك على الهواء" : "Your church, on air"}
            </h3>
          </div>
          <span className="mt-1 flex items-center gap-2 rounded-full border border-signal/35 bg-signal/12 px-2.5 py-1">
            <span className="size-1.5 rounded-full bg-signal" />
            <span className="font-manrope text-[9.5px] font-bold text-signal uppercase">
              {pick(L.live, lang)}
            </span>
          </span>
        </div>

        {/* live channel strip */}
        <div className="ac-glass flex items-center gap-2.5 rounded-[20px] p-2.5">
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12.5px] text-acivory">{pick(live.name, lang)}</span>
            <span className="mt-0.5 block truncate font-manrope text-[10px] text-acquiet">
              {live.onlineNow} {pick(L.online, lang)}
            </span>
          </span>
          <VoiceBars bars={4} />
        </div>

        {/* incoming call */}
        <div className="pointer-events-auto ac-card flex items-center gap-2.5 rounded-[20px] p-2.5">
          <MemberAvatar member={caller} size={38} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[12.5px] text-acivory">{pick(caller.name, lang)}</span>
            <span className="mt-0.5 block font-manrope text-[10px] text-signal">
              {isArabic ? "اتصال صوتي وارد…" : "Incoming voice call…"}
            </span>
          </span>
          <Link
            to="/connect-call"
            aria-label={isArabic ? "الرد على الاتصال" : "Answer call"}
            className="press grid size-9 place-items-center rounded-full ac-cta text-acnight"
          >
            <PhoneGlyph className="size-[16px]" />
          </Link>
        </div>

        {/* inbox peek */}
        <ul className="pointer-events-auto space-y-2">
          {inbox.map((t) => (
            <li key={t.id}>
              <Link
                to="/connect-chat"
                className="press ac-card flex items-center gap-2.5 rounded-[20px] p-2.5"
                style={{ ["--hue" as string]: t.tone }}
              >
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-full border text-[12px] text-acivory"
                  style={{ borderColor: t.tone, background: `color-mix(in oklab, ${t.tone} 16%, transparent)` }}
                >
                  {t.initial}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12px] text-acivory">{pick(t.name, lang)}</span>
                  <span className="mt-0.5 block truncate text-[10.5px] text-acquiet">{pick(t.preview, lang)}</span>
                </span>
                {t.unread ? (
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-signal font-manrope text-[9.5px] font-bold text-acnight">
                    {t.unread}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>

        {/* footer actions */}
        <div className="pointer-events-auto flex items-center gap-2 pt-0.5">
          <Link
            to="/connect"
            className="press ac-cta inline-flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 font-manrope text-[11.5px] font-bold text-acnight"
          >
            {isArabic ? "افتح Alpha Connect" : "Open Alpha Connect"}
          </Link>
          <Link
            to="/connect-messages"
            aria-label={pick(L.messages, lang)}
            className="press relative grid size-10 place-items-center rounded-full border border-aqua/25 bg-acdeep/55 text-acivory/85"
          >
            <ChatGlyph className="size-[17px]" />
            {unread ? (
              <span className="absolute -end-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-acgold font-manrope text-[8.5px] font-bold text-acnight">
                {unread}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </section>
  );
}
