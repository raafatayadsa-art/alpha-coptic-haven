import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import {
  ChannelGlyph,
  ChatGlyph,
  GearGlyph,
  UsersGlyph,
} from "@/components/connect/connect-icons";
import { Shield } from "@/components/church/Shield";
import { CL, L, pick } from "@/lib/connect-data";
import { useLang } from "@/lib/i18n";

export type ConnectTab = "alpha" | "channels" | "friends" | "messages" | "settings";

type Item = {
  key: ConnectTab;
  to: "/connect" | "/connect-friends" | "/connect-messages" | "/connect-settings";
  label: string;
  icon: ReactNode;
};

/**
 * Alpha Connect bottom bar — replaces the global Alpha nav inside /connect*
 * screens only. RTL order: Alpha · Channels · Friends · Messages · Settings.
 * Presentation only.
 */
export function ConnectNav({ active }: { active: ConnectTab }) {
  const { lang, dir, isArabic } = useLang();

  const items: Item[] = [
    {
      key: "channels",
      to: "/connect",
      label: pick(CL.channels, lang),
      icon: <ChannelGlyph className="size-[19px]" />,
    },
    {
      key: "friends",
      to: "/connect-friends",
      label: pick(CL.friendsTab, lang),
      icon: <UsersGlyph className="size-[19px]" />,
    },
    {
      key: "messages",
      to: "/connect-messages",
      label: pick(L.messages, lang),
      icon: <ChatGlyph className="size-[19px]" />,
    },
    {
      key: "settings",
      to: "/connect-settings",
      label: pick(L.settings, lang),
      icon: <GearGlyph className="size-[19px]" />,
    },
  ];

  const label = `${isArabic ? "font-arabic " : ""}text-[9.5px] font-semibold leading-none`;

  return (
    <nav
      dir={dir}
      aria-label={pick(L.appName, lang)}
      className="safe-bottom fixed inset-x-0 bottom-2 z-50 mx-auto max-w-[430px] px-3"
    >
      <div className="ac-glass flex items-stretch gap-1 rounded-[26px] px-2 py-1.5">
        <Link
          to="/connect"
          aria-label={pick(L.appName, lang)}
          className={`press flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[20px] py-1.5 transition-colors ${
            active === "alpha" ? "text-acgold" : "text-acquiet"
          }`}
        >
          <Shield slug="messages-audio" size="xs" className="scale-[0.62]" />
          <span className={`${label} -mt-1`}>Alpha</span>
        </Link>

        {items.map((item) => {
          const on = item.key === active;
          return (
            <Link
              key={item.key}
              to={item.to}
              className={`press relative flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[20px] py-1.5 transition-colors duration-300 ${
                on ? "text-signal" : "text-acquiet hover:text-acivory"
              }`}
            >
              {on ? (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[20px] border border-signal/35 bg-signal/12 shadow-[0_0_22px_color-mix(in_oklab,var(--ac-signal)_26%,transparent)]"
                />
              ) : null}
              <span className="relative">{item.icon}</span>
              <span className={`${label} relative whitespace-nowrap`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
