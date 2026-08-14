import { Link, createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

import {
  AcIconButton,
  AcMeter,
  AcSectionTitle,
  MemberAvatar,
  VoiceBars,
} from "@/components/connect/ConnectShell";
import {
  BackGlyph,
  ChevronGlyph,
  ClockGlyph,
  DatabaseGlyph,
  GearGlyph,
  GroupGlyph,
  HeadsetGlyph,
  InfoGlyph,
  LockGlyph,
  MicGlyph,
  PaletteGlyph,
  ShieldLockGlyph,
  SignalGlyph,
  TimerGlyph,
} from "@/components/connect/connect-icons";
import { Screen } from "@/components/layout/Screen";
import { SloganBand } from "@/components/layout/SloganBand";
import {
  L,
  connectionStats,
  participants,
  pick,
  settingGroups,
  type SettingGroup,
} from "@/lib/connect-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/connect-settings")({
  head: () => ({
    meta: [
      { title: "إعدادات ألفا كونكت — الصوت والخصوصية والأمان | Alpha" },
      {
        name: "description",
        content:
          "Alpha Connect settings: connection quality, push-to-talk, audio, privacy, temporary messages, groups, security, storage and about.",
      },
      { property: "og:title", content: "إعدادات ألفا كونكت — الصوت والخصوصية والأمان | Alpha" },
      {
        property: "og:description",
        content: "Tune voice, connection, privacy and security for Alpha Connect.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConnectSettings,
});

const groupIcon: Record<SettingGroup["icon"], ReactNode> = {
  appearance: <PaletteGlyph className="size-[17px]" />,
  ptt: <MicGlyph className="size-[17px]" />,
  audio: <HeadsetGlyph className="size-[17px]" />,
  privacy: <ShieldLockGlyph className="size-[17px]" />,
  temporary: <TimerGlyph className="size-[17px]" />,
  groups: <GroupGlyph className="size-[17px]" />,
  security: <LockGlyph className="size-[17px]" />,
  storage: <DatabaseGlyph className="size-[17px]" />,
  about: <InfoGlyph className="size-[17px]" />,
};

function Switch({ on = false }: { on?: boolean | undefined }) {
  const [v, setV] = useState(on);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={v}
      onClick={() => setV((x) => !x)}
      className={`press relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
        v ? "bg-signal/85" : "bg-acivory/15"
      }`}
    >
      <span
        className={`absolute top-0.5 size-5 rounded-full bg-acnight transition-all duration-300 ${
          v ? "start-[22px]" : "start-0.5"
        }`}
      />
    </button>
  );
}

function Slider() {
  const [v, setV] = useState(62);
  return (
    <input
      type="range"
      min={0}
      max={100}
      value={v}
      onChange={(e) => setV(Number(e.target.value))}
      aria-label="value"
      className="h-1.5 w-24 shrink-0 appearance-none rounded-full bg-acivory/15 accent-signal"
    />
  );
}

function ConnectSettings() {
  const { lang, dir, isArabic } = useLang();
  const [open, setOpen] = useState<string | null>("audio");

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
            <AcIconButton label={pick(L.settings, lang)} className="ms-auto">
              <GearGlyph className="size-[18px]" />
            </AcIconButton>
          </div>

          <div className="mt-5">
            <p className="font-manrope text-[9.5px] font-bold tracking-[0.24em] text-aqua/75 uppercase">
              {pick(L.appName, lang)}
            </p>
            <h1 className="ac-gilt mt-1.5 font-display text-[30px] leading-tight">{pick(L.settings, lang)}</h1>
          </div>

          {/* connection quality */}
          <div className="ac-glass mt-4 rounded-[24px] p-4">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-full border border-signal/35 text-signal">
                <SignalGlyph className="size-[17px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-manrope text-[9px] font-bold tracking-[0.2em] text-signal uppercase">
                  {isArabic ? "جودة الاتصال" : "Connection quality"}
                </p>
                <p className="mt-0.5 text-[13px] text-acivory">
                  {isArabic ? "الاتصال مستقر وواضح" : "Stable and clear"}
                </p>
              </div>
              <VoiceBars bars={4} />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {connectionStats.map((s) => (
                <div key={s.key}>
                  <p className="font-manrope text-[9px] tracking-[0.12em] text-acquiet uppercase">
                    {pick(s.label, lang)}
                  </p>
                  <p className="mt-1 font-display text-[16px] text-acivory">{pick(s.value, lang)}</p>
                  <AcMeter
                    level={s.level}
                    tone={s.key === "signal" ? "var(--ac-signal)" : "var(--ac-aqua)"}
                  />
                </div>
              ))}
            </div>
          </div>
        </header>

        <main className="relative mt-6 space-y-7 px-4">
          {/* account card */}
          <section>
            <AcSectionTitle eyebrow={pick(L.appName, lang)} title={isArabic ? "حسابي" : "My account"} />
            <div
              className="ac-card mt-3 flex items-center gap-3 rounded-[22px] p-3.5"
              style={{ ["--hue" as string]: participants[1]!.tone }}
            >
              <MemberAvatar member={participants[1]!} size={50} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-[17px] text-acivory">
                  {pick(participants[1]!.name, lang)}
                </p>
                <p className="mt-0.5 truncate text-[11.5px] text-acquiet">
                  {pick(participants[1]!.role, lang)}
                </p>
              </div>
              <ChevronGlyph className="size-[15px] text-acquiet/70 rtl:-scale-x-100" />
            </div>
          </section>

          {/* collapsible groups */}
          <section className="space-y-2.5">
            <AcSectionTitle eyebrow={pick(L.settings, lang)} title={isArabic ? "التفضيلات" : "Preferences"} />
            {settingGroups.map((g) => {
              const on = open === g.id;
              return (
                <div key={g.id} className="ac-card overflow-hidden rounded-[22px]">
                  <button
                    type="button"
                    onClick={() => setOpen(on ? null : g.id)}
                    aria-expanded={on}
                    className="press flex w-full items-center gap-3 p-3.5 text-start"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-aqua/25 text-aqua">
                      {groupIcon[g.icon]}
                    </span>
                    <span className="min-w-0 flex-1 font-display text-[16.5px] text-acivory">
                      {pick(g.title, lang)}
                    </span>
                    <ChevronGlyph
                      className={`size-[15px] text-acquiet/70 transition-transform duration-300 ${
                        on ? "rotate-90" : "rtl:-scale-x-100"
                      }`}
                    />
                  </button>

                  {on ? (
                    <ul className="animate-float-up space-y-1 border-t border-aqua/12 px-3.5 pt-2 pb-3">
                      {g.rows.map((row) => (
                        <li key={row.id} className="flex items-center gap-3 py-2.5">
                          <span className="min-w-0 flex-1">
                            <span className="block text-[12.5px] text-acivory/90">{pick(row.label, lang)}</span>
                            {row.hint ? (
                              <span className="mt-0.5 block text-[11px] text-acquiet">{pick(row.hint, lang)}</span>
                            ) : null}
                          </span>
                          {row.kind === "switch" ? (
                            <Switch on={row.on ?? false} />
                          ) : row.kind === "slider" ? (
                            <Slider />
                          ) : (
                            <span className="flex shrink-0 items-center gap-1.5 font-manrope text-[11px] text-aqua/85">
                              {row.value ? pick(row.value, lang) : null}
                              <ChevronGlyph className="size-[13px] text-acquiet/60 rtl:-scale-x-100" />
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </section>

          <section className="ac-glass flex items-center gap-3 rounded-[22px] p-3.5">
            <span className="grid size-9 place-items-center rounded-full border border-acgold/35 text-acgold">
              <ClockGlyph className="size-[17px]" />
            </span>
            <p className="min-w-0 flex-1 text-[11.5px] leading-relaxed text-acquiet">
              {isArabic
                ? "الرسائل المؤقتة مفعّلة: تُحذف المحادثات تلقائيًا بعد ٢٤ ساعة."
                : "Temporary messages are on: conversations self-delete after 24 hours."}
            </p>
          </section>

          <button
            type="button"
            className="press ac-cta w-full rounded-full py-3.5 font-manrope text-[13px] font-bold text-acnight"
          >
            {pick(L.saveChanges, lang)}
          </button>

          <SloganBand className="text-acivory" />
        </main>
      </div>
    </Screen>
  );
}
