import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { AcChip, AcSectionTitle, MemberAvatar } from "@/components/connect/ConnectShell";
import { ConnectNav } from "@/components/connect/ConnectNav";
import {
  BackGlyph,
  ChatGlyph,
  PhoneGlyph,
  SearchGlyph,
  UsersGlyph,
} from "@/components/connect/connect-icons";
import { Screen } from "@/components/layout/Screen";
import { SloganBand } from "@/components/layout/SloganBand";
import { CL, L, friendFilters, friends, pick, presenceLabel } from "@/lib/connect-data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/connect-friends")({
  head: () => ({
    meta: [
      { title: "الأصدقاء — اتصال ورسائل | ألفا كونكت" },
      {
        name: "description",
        content:
          "قائمة أصدقائك في ألفا كونكت: اختر صديقًا لبدء اتصال صوتي مشفّر أو إرسال رسالة، مع الدروع وحالة الحضور.",
      },
      { property: "og:title", content: "الأصدقاء — اتصال ورسائل | ألفا كونكت" },
      {
        property: "og:description",
        content: "اختر صديقًا للاتصال الصوتي أو المراسلة داخل ألفا كونكت.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConnectFriends,
});

function ConnectFriends() {
  const { lang, dir, isArabic } = useLang();
  const [filter, setFilter] = useState<(typeof friendFilters)[number]["key"]>("all");
  const [query, setQuery] = useState("");

  const list = friends
    .filter((f) => (filter === "all" ? true : filter === "online" ? f.online : f.group === filter))
    .filter((f) =>
      query.trim() === ""
        ? true
        : pick(f.name, lang).toLowerCase().includes(query.trim().toLowerCase()),
    );

  const onlineCount = friends.filter((f) => f.online).length;

  return (
    <Screen className="ac-page">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-1 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[230px] overflow-hidden">
          <span className="ac-halo absolute -top-24 start-1/2 size-[330px] -translate-x-1/2 opacity-50 blur-2xl" />
          <span className="absolute inset-0 bg-gradient-to-b from-transparent via-acnight/35 to-acnight" />
        </div>

        <header className="safe-top relative px-4 pt-2">
          <div className="flex items-center gap-2">
            <Link to="/connect" aria-label={pick(L.back, lang)}>
              <span className="press grid size-10 place-items-center rounded-full border border-aqua/20 bg-acdeep/55 text-acivory/85 backdrop-blur-xl">
                <BackGlyph className="size-[18px] rtl:-scale-x-100" />
              </span>
            </Link>
            <span className="ms-auto inline-flex items-center gap-1.5 rounded-full border border-signal/35 bg-signal/12 px-3 py-1.5 font-manrope text-[10px] font-bold tracking-[0.12em] text-signal uppercase">
              <span className="size-1.5 rounded-full bg-signal" />
              {onlineCount} {pick(L.online, lang)}
            </span>
          </div>

          <div className="mt-5">
            <p className="font-manrope text-[9.5px] font-bold tracking-[0.24em] text-aqua/75 uppercase">
              {pick(L.appName, lang)}
            </p>
            <h1 className="ac-gilt mt-1.5 font-display text-[30px] leading-tight">
              {pick(CL.friendsTitle, lang)}
            </h1>
            <p className="mt-1 text-[12px] text-acquiet">{pick(CL.friendsHint, lang)}</p>
          </div>

          <label className="ac-glass mt-4 flex items-center gap-2.5 rounded-full px-4 py-3">
            <SearchGlyph className="size-[16px] shrink-0 text-acquiet" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isArabic ? "ابحث في أصدقائك" : "Search your friends"}
              className="min-w-0 flex-1 bg-transparent text-[12.5px] text-acivory outline-none placeholder:text-acquiet/60"
            />
          </label>

          <div className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
            {friendFilters.map((f) => (
              <AcChip key={f.key} on={filter === f.key} onClick={() => setFilter(f.key)}>
                {pick(f.label, lang)}
              </AcChip>
            ))}
          </div>
        </header>

        <main className="relative mt-6 space-y-7 px-4">
          <section>
            <AcSectionTitle eyebrow={pick(L.appName, lang)} title={pick(CL.friendsTab, lang)} />

            {list.length === 0 ? (
              <div className="ac-glass mt-3 rounded-[26px] p-6 text-center">
                <span className="mx-auto grid size-12 place-items-center rounded-full border border-aqua/25 text-aqua">
                  <UsersGlyph className="size-[20px]" />
                </span>
                <p className="mt-3 font-display text-[18px] text-acivory">
                  {isArabic ? "لا يوجد أصدقاء هنا" : "No friends here"}
                </p>
                <p className="mx-auto mt-1.5 max-w-[250px] text-[12px] leading-relaxed text-acquiet">
                  {isArabic
                    ? "جرّب تصفية أخرى أو ابحث باسم مختلف."
                    : "Try another filter or search a different name."}
                </p>
              </div>
            ) : (
              <ul className="mt-3 space-y-2.5">
                {list.map((f) => (
                  <li
                    key={f.id}
                    className="ac-card rounded-[22px] p-3"
                    style={{ ["--hue" as string]: f.tone }}
                  >
                    <div className="flex items-center gap-3">
                      <MemberAvatar member={f} size={46} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-display text-[16px] text-acivory">
                          {pick(f.name, lang)}
                        </p>
                        <p className="mt-0.5 truncate text-[11.5px] text-acquiet">
                          {pick(f.role, lang)} · {pick(presenceLabel[f.presence], lang)}
                        </p>
                        <p className="mt-0.5 truncate font-manrope text-[10px] text-acquiet/75">
                          {pick(f.lastSeen, lang)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <Link
                        to="/connect-call"
                        search={{ who: f.id }}
                        className="press inline-flex items-center justify-center gap-1.5 rounded-full border border-signal/40 bg-signal/12 py-2.5 font-manrope text-[11.5px] font-bold text-signal"
                      >
                        <PhoneGlyph className="size-[15px]" />
                        {pick(CL.call, lang)}
                      </Link>
                      <Link
                        to="/connect-chat"
                        search={{ who: f.id }}
                        className="press inline-flex items-center justify-center gap-1.5 rounded-full border border-aqua/30 bg-acdeep/55 py-2.5 font-manrope text-[11.5px] font-bold text-acivory"
                      >
                        <ChatGlyph className="size-[15px]" />
                        {pick(CL.message, lang)}
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <SloganBand className="text-acivory" />
        </main>
      </div>

      <ConnectNav active="friends" />
    </Screen>
  );
}
