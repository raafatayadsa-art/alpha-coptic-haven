import { useState } from "react";

import {
  AutoScrollIcon,
  SettingsIcon,
  SpacingIcon,
  SpeedIcon,
  TypeIcon,
} from "@/components/khoulagy/khoulagy-icons";
import { useLang } from "@/lib/i18n";

/**
 * Alpha's unified reading toolbar — the same one-row idea as the Bible reader:
 * auto-scroll, scroll speed, text size, line spacing and reading settings,
 * pinned just above the bottom nav and fading out while the reader drags down.
 * Presentation only: the parent owns every value.
 */

export const READER_SPEEDS = [
  { key: "bib.speed.slow", pps: 10 },
  { key: "bib.speed.mid", pps: 20 },
  { key: "bib.speed.fast", pps: 38 },
];

export const READER_SIZES = [
  { key: "bib.size.s", cls: "text-[15.5px]" },
  { key: "bib.size.m", cls: "text-[17.5px]" },
  { key: "bib.size.l", cls: "text-[20px]" },
] as const;

export const READER_SPACING = [
  { key: "bib.space.tight", cls: "leading-[1.85]" },
  { key: "bib.space.mid", cls: "leading-[2.15]" },
  { key: "bib.space.airy", cls: "leading-[2.55]" },
] as const;

type Menu = "speed" | "spacing" | "settings" | null;

export function ReaderBar({
  visible,
  auto,
  onAuto,
  speed,
  onSpeed,
  size,
  onSize,
  spacing,
  onSpacing,
  coptic,
  onCoptic,
}: {
  visible: boolean;
  auto: boolean;
  onAuto: () => void;
  speed: number;
  onSpeed: (i: number) => void;
  size: number;
  onSize: () => void;
  spacing: number;
  onSpacing: (i: number) => void;
  coptic: boolean;
  onCoptic: () => void;
}) {
  const { t } = useLang();
  const [menu, setMenu] = useState<Menu>(null);

  const chip = "border border-khgold/22 bg-sanctnight/55 text-khivory/80";
  const on = "kh-cta text-sanctnight";

  return (
    <div
      data-reader-bar=""
      className={`fixed inset-x-0 z-40 mx-auto max-w-[430px] px-3.5 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      style={{
        bottom: "calc(var(--bottom-nav-h) + max(var(--safe-bottom-min), var(--safe-bottom)) + 6px)",
      }}
    >
      <div className="kh-glass flex items-center justify-between gap-1 rounded-full px-2 py-1.5">
        <button
          type="button"
          aria-label={t("bib.reader.autoscroll")}
          onClick={() => {
            setMenu(null);
            onAuto();
          }}
          className={`press grid size-9 place-items-center rounded-full ${auto ? on : chip}`}
        >
          <AutoScrollIcon className="size-[17px]" />
        </button>

        <button
          type="button"
          aria-label={t("bib.reader.bigger")}
          onClick={onSize}
          className={`press grid size-9 place-items-center rounded-full ${chip}`}
        >
          <TypeIcon
            className="text-khgold transition-all duration-300"
            style={{ width: 12 + size * 2.4, height: 12 + size * 2.4 }}
          />
        </button>

        <Control
          label={t("bib.reader.speed")}
          icon={<SpeedIcon className="size-4" />}
          value={t(READER_SPEEDS[speed]!.key)}
          openState={menu === "speed"}
          onToggle={() => setMenu((m) => (m === "speed" ? null : "speed"))}
          items={READER_SPEEDS.map((s) => t(s.key))}
          active={speed}
          onPick={(i) => {
            onSpeed(i);
            setMenu(null);
          }}
        />

        <Control
          label={t("bib.reader.spacing")}
          icon={<SpacingIcon className="size-4" />}
          openState={menu === "spacing"}
          onToggle={() => setMenu((m) => (m === "spacing" ? null : "spacing"))}
          items={READER_SPACING.map((s) => t(s.key))}
          active={spacing}
          onPick={(i) => {
            onSpacing(i);
            setMenu(null);
          }}
        />

        <div className="relative">
          <button
            type="button"
            aria-label={t("kh.reader.settings")}
            onClick={() => setMenu((m) => (m === "settings" ? null : "settings"))}
            className={`press grid size-9 place-items-center rounded-full ${
              menu === "settings" ? on : chip
            }`}
          >
            <SettingsIcon className="size-[17px]" />
          </button>
          {menu === "settings" ? (
            <div className="kh-glass verse-rise absolute end-0 bottom-12 z-30 w-44 overflow-hidden rounded-[20px] p-2">
              <p className="px-2 pb-1.5 font-manrope text-[9.5px] font-bold tracking-[0.14em] text-khbrass uppercase">
                {t("kh.reader.settings")}
              </p>
              <button
                type="button"
                onClick={onCoptic}
                className={`flex w-full items-center justify-between rounded-[14px] px-2.5 py-2 font-manrope text-[11.5px] font-semibold ${
                  coptic ? "bg-khgold/15 text-khgold" : "text-khivory/70"
                }`}
              >
                {t("kh.reader.coptic")}
                <span
                  className={`h-4 w-7 rounded-full transition-colors ${
                    coptic ? "bg-khgold/70" : "bg-khivory/20"
                  }`}
                >
                  <span
                    className={`block size-3 translate-y-0.5 rounded-full bg-sanctnight transition-transform ${
                      coptic ? "translate-x-[15px]" : "translate-x-[3px]"
                    }`}
                  />
                </span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Control({
  label,
  icon,
  value,
  openState,
  onToggle,
  items,
  active,
  onPick,
}: {
  label: string;
  icon: React.ReactNode;
  value?: string;
  openState: boolean;
  onToggle: () => void;
  items: string[];
  active: number;
  onPick: (i: number) => void;
}) {
  const chip = "border border-khgold/22 bg-sanctnight/55 text-khivory/80";

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={label}
        onClick={onToggle}
        className={`press flex h-9 items-center gap-1 rounded-full px-2.5 ${
          openState ? "kh-cta text-sanctnight" : chip
        }`}
      >
        {icon}
        {value ? (
          <span className="font-manrope text-[10.5px] font-semibold whitespace-nowrap">{value}</span>
        ) : null}
      </button>
      {openState ? (
        <div className="kh-glass verse-rise absolute bottom-12 start-0 z-30 w-32 overflow-hidden rounded-[18px] p-1.5">
          {items.map((item, i) => (
            <button
              key={item}
              type="button"
              onClick={() => onPick(i)}
              className={`block w-full rounded-[13px] px-3 py-2 text-start font-manrope text-[11.5px] font-semibold ${
                i === active ? "bg-khgold/15 text-khgold" : "text-khivory/70"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
