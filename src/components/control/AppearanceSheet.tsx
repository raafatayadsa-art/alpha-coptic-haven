/**
 * Alpha Control — appearance settings with a "preview changes" window.
 * Presentation only: local UI state, nothing persisted.
 */
import { useState } from "react";

import { AL, accentPresets, geoCountries, scaleSteps, type Bi } from "@/lib/control-data";

type P = (v: Bi) => string;

export type Appearance = { accent: string; scale: number };
export const defaultAppearance: Appearance = { accent: "gold", scale: 100 };

export const accentToken = (key: string) =>
  accentPresets.find((a) => a.key === key)?.token ?? "var(--ct-gold)";

export function AppearanceSheet({
  p,
  value,
  onApply,
  onClose,
}: {
  p: P;
  value: Appearance;
  onApply: (v: Appearance) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Appearance>(value);
  const dirty = draft.accent !== value.accent || draft.scale !== value.scale;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label={p(AL.discard)}
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
      />
      <div className="ctl-rise safe-bottom relative mx-auto max-h-[92svh] w-full max-w-[430px] overflow-y-auto rounded-t-[28px] border-t border-ctl-mist/12 bg-ctl-slate/95 px-4 pt-3 pb-5 backdrop-blur-xl">
        <span aria-hidden="true" className="mx-auto mb-3 block h-1 w-10 rounded-full bg-ctl-mist/20" />
        <h2 className="px-1 text-[14.5px] font-bold tracking-tight">{p(AL.title)}</h2>
        <p className="mt-1 px-1 text-[10px] leading-snug text-ctl-mist/45">{p(AL.caption)}</p>

        {/* Accent */}
        <p className="mt-4 px-1 text-[9.5px] tracking-[0.2em] text-ctl-gold/70 uppercase">
          {p(AL.accent)}
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {accentPresets.map((a) => {
            const on = a.key === draft.accent;
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => setDraft({ ...draft, accent: a.key })}
                className={`press inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10.5px] font-semibold transition-colors duration-300 ${
                  on
                    ? "bg-ctl-mist/12 text-ctl-mist ring-1 ring-ctl-mist/25"
                    : "border border-ctl-mist/10 bg-ctl-mist/4 text-ctl-mist/55"
                }`}
              >
                <span className={`size-2.5 rounded-full ${a.swatch}`} />
                {p(a.name)}
              </button>
            );
          })}
        </div>

        {/* Scale */}
        <p className="mt-4 px-1 text-[9.5px] tracking-[0.2em] text-ctl-gold/70 uppercase">
          {p(AL.scale)}
        </p>
        <div className="mt-2 flex gap-1.5">
          {scaleSteps.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setDraft({ ...draft, scale: s })}
              className={`press flex-1 rounded-[12px] py-2 font-manrope text-[10.5px] font-bold transition-colors duration-300 ${
                s === draft.scale
                  ? "bg-ctl-gold/15 text-ctl-gold ring-1 ring-ctl-gold/35"
                  : "border border-ctl-mist/10 bg-ctl-mist/4 text-ctl-mist/50"
              }`}
            >
              {s}%
            </button>
          ))}
        </div>

        {/* Preview window */}
        <p className="mt-5 px-1 text-[9.5px] tracking-[0.2em] text-ctl-gold/70 uppercase">
          {p(AL.previewTitle)}
        </p>
        <div className="mt-2 rounded-[22px] border border-ctl-mist/12 bg-ctl-obsidian/70 p-3">
          <div
            className="ctl-page overflow-hidden rounded-[16px] p-3"
            style={{
              ["--ct-gold" as string]: accentToken(draft.accent),
              zoom: draft.scale / 100,
            }}
          >
            <div className="flex items-center gap-2">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ctl-gold/15 text-ctl-gold ctl-halo">
                <span className="size-1.5 rounded-full bg-current" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11.5px] font-semibold">
                  {p({ ar: "ألفا كنترول", en: "Alpha Control" })}
                </span>
                <span className="block truncate text-[9px] text-ctl-mist/45">
                  {p({ ar: "معاينة مباشرة", en: "Live preview" })}
                </span>
              </span>
              <span className="rounded-full bg-ctl-gold/12 px-2 py-0.5 text-[9px] font-bold text-ctl-gold">
                {draft.scale}%
              </span>
            </div>
            <ul className="mt-2.5 space-y-2">
              {geoCountries.slice(0, 2).map((c) => (
                <li key={c.code} className="flex items-center gap-2">
                  <span aria-hidden="true" className="text-[14px]">
                    {c.flag}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span className="min-w-0 flex-1 truncate text-[11.5px] font-semibold">
                        {p(c.name)}
                      </span>
                      <span className="font-manrope text-[11px] font-bold text-ctl-gold">
                        {c.members}
                      </span>
                    </span>
                    <span className="mt-1 block h-[5px] overflow-hidden rounded-full bg-ctl-mist/10">
                      <span
                        className="block h-full rounded-full bg-ctl-gold"
                        style={{ width: `${c.share}%`, opacity: 0.9 }}
                      />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-2.5 px-0.5 text-[9.5px] leading-snug text-ctl-mist/40">
            {p(AL.previewNote)}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onApply(draft)}
            disabled={!dirty}
            className={`press ctl-gold-btn flex-1 rounded-full px-4 py-2.5 text-[11.5px] font-bold ${
              dirty ? "" : "opacity-40"
            }`}
          >
            {p(AL.applyAll)}
          </button>
          <button
            type="button"
            onClick={() => setDraft(defaultAppearance)}
            className="press shrink-0 rounded-full border border-ctl-mist/12 bg-ctl-mist/5 px-4 py-2.5 text-[11.5px] font-semibold text-ctl-mist/65"
          >
            {p(AL.resetDefaults)}
          </button>
        </div>
      </div>
    </div>
  );
}
