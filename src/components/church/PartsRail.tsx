import type { CSSProperties } from "react";

import { useLang } from "@/lib/i18n";

export type RailHue = { hue: string; hue2: string };
export type RailItem = { id: string; label: string; hue: RailHue };

type Theme = "ocean" | "manuscript";

const surface: Record<Theme, string> = {
  ocean: "ocean-glass",
  manuscript: "km-glass",
};

const idleTone: Record<Theme, string> = {
  ocean: "border-foam/10 bg-abyss/30 text-foam/45",
  manuscript: "border-cream/10 bg-wine/40 text-cream/45",
};

const doneTone: Record<Theme, string> = {
  ocean: "hue-ring hue-text bg-abyss/40",
  manuscript: "hue-ring hue-text bg-nightwine/55",
};

const activeTone: Record<Theme, string> = {
  ocean: "hue-cta border-transparent text-abyss",
  manuscript: "km-cta border-transparent text-nightwine",
};

const trackTone: Record<Theme, string> = {
  ocean: "bg-foam/10",
  manuscript: "bg-cream/10",
};

const fillTone: Record<Theme, string> = {
  ocean: "bg-gradient-to-l from-mint to-teal",
  manuscript: "km-cta",
};

const metaTone: Record<Theme, { strong: string; soft: string }> = {
  ocean: { strong: "text-mint", soft: "text-foam/40" },
  manuscript: { strong: "text-goldleaf", soft: "text-cream/40" },
};

const hueStyle = ({ hue, hue2 }: RailHue) =>
  ({ "--hue": hue, "--hue-2": hue2 }) as CSSProperties;

/**
 * Fixed rail pinned above every Alpha reading screen: chips for the parts of
 * the current reading, coloured by their own hue family, plus a progress track
 * that fills from the reading direction's start edge.
 * Presentation only — the parent owns which part is open.
 */
export function PartsRail({
  items,
  activeIndex,
  visible,
  theme = "ocean",
  onJump,
  onWake,
}: {
  items: RailItem[];
  activeIndex: number;
  visible: boolean;
  theme?: Theme;
  onJump: (index: number) => void;
  onWake?: () => void;
}) {
  const { isArabic } = useLang();
  const total = Math.max(1, items.length);
  const pct = Math.max(4, ((activeIndex + 1) / total) * 100);
  const meta = metaTone[theme];

  return (
    <div
      className={`fixed inset-x-0 top-0 z-40 mx-auto w-full max-w-[430px] px-3 pt-2 pb-2 transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
      }`}
    >
      <div className={`${surface[theme]} safe-top rounded-[22px] px-2.5 pt-2 pb-2.5 backdrop-blur-xl`}>
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto">
          {items.map((item, i) => {
            const isActive = i === activeIndex;
            const done = i < activeIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onWake?.();
                  onJump(i);
                }}
                style={hueStyle(item.hue)}
                className={`press shrink-0 rounded-full border px-3.5 py-1.5 font-sora text-[12px] font-semibold whitespace-nowrap transition-colors ${
                  isActive ? activeTone[theme] : done ? doneTone[theme] : idleTone[theme]
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-2 flex items-center gap-2.5 px-1">
          <span
            className={`font-manrope text-[10.5px] font-semibold tabular-nums ${meta.strong}`}
            aria-hidden="true"
          >
            {Math.round(((activeIndex + 1) / total) * 100)}%
          </span>
          <span className={`relative h-1 flex-1 overflow-hidden rounded-full ${trackTone[theme]}`}>
            <span
              className={`absolute inset-y-0 rounded-full transition-[width] duration-300 ${fillTone[theme]}`}
              style={{ width: `${pct}%`, [isArabic ? "right" : "left"]: 0 }}
            />
          </span>
          <span className={`font-manrope text-[10.5px] tabular-nums ${meta.soft}`}>
            {activeIndex + 1}/{total}
          </span>
        </div>
      </div>
    </div>
  );
}
