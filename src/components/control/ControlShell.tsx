/**
 * Alpha Control — shared instrument-panel primitives for the
 * "Obsidian Command" prototype. Presentation only: no logic, no data.
 */
import type { ReactNode } from "react";

import type { Health } from "@/lib/control-data";

export type Tone = "gold" | "cyan" | "jade" | "amber" | "crimson";

export const toneText: Record<Tone, string> = {
  gold: "text-ctl-gold",
  cyan: "text-ctl-cyan",
  jade: "text-ctl-jade",
  amber: "text-ctl-amber",
  crimson: "text-ctl-crimson",
};
export const toneBg: Record<Tone, string> = {
  gold: "bg-ctl-gold",
  cyan: "bg-ctl-cyan",
  jade: "bg-ctl-jade",
  amber: "bg-ctl-amber",
  crimson: "bg-ctl-crimson",
};
const healthTone: Record<Health, Tone> = { ok: "jade", warn: "amber", down: "crimson" };

/* ── Surfaces ───────────────────────────────────────────── */

export function Panel({
  children,
  className,
  crest = false,
}: {
  children: ReactNode;
  className?: string;
  crest?: boolean;
}) {
  return (
    <section className={`ctl-card ${crest ? "ctl-crest" : ""} ${className ?? ""}`}>{children}</section>
  );
}

export function PanelHead({
  title,
  caption,
  action,
}: {
  title: string;
  caption?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-ctl-mist/6 px-4 pt-4 pb-3">
      <div className="min-w-0">
        <h3 className="truncate text-[13.5px] font-semibold tracking-tight">{title}</h3>
        {caption && <p className="mt-0.5 truncate text-[10px] text-ctl-mist/40">{caption}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function SectionTitle({ title, caption }: { title: string; caption?: string }) {
  return (
    <div className="mt-7 mb-3 flex items-center gap-2.5 px-0.5">
      <span aria-hidden="true" className="ctl-tile size-7 shrink-0 text-ctl-gold">
        <span className="size-1.5 rounded-full bg-current" />
      </span>
      <h2 className="min-w-0 shrink-0 truncate text-[15.5px] font-bold tracking-tight">{title}</h2>
      <span aria-hidden="true" className="h-px min-w-3 flex-1 bg-gradient-to-r from-ctl-gold/35 to-transparent rtl:bg-gradient-to-l" />
      {caption && <p className="shrink-0 truncate text-[9.5px] text-ctl-mist/40">{caption}</p>}
    </div>
  );
}

export function GhostButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="press inline-flex items-center gap-1 rounded-full border border-ctl-gold/25 bg-ctl-gold/8 px-3 py-1.5 text-[10.5px] font-semibold text-ctl-gold/85 transition-colors duration-300 hover:bg-ctl-gold/14"
    >
      {children}
    </button>
  );
}

export function StatusDot({ health }: { health: Health }) {
  const tone = healthTone[health];
  return (
    <span className={`relative grid size-2.5 shrink-0 place-items-center ${toneText[tone]}`}>
      <span className={`absolute size-2.5 rounded-full opacity-30 ${toneBg[tone]} ctl-blip`} />
      <span className={`ctl-halo size-1.5 rounded-full ${toneBg[tone]}`} />
    </span>
  );
}

export function Tag({ children, tone = "gold" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-current/12 px-2 py-0.5 text-[9.5px] font-semibold ring-1 ring-current/22 ${toneText[tone]}`}
    >
      <span className="text-current">{children}</span>
    </span>
  );
}

/* ── Charts ─────────────────────────────────────────────── */

export function Sparkline({ data, tone = "gold" }: { data: number[]; tone?: Tone }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${28 - ((v - min) / span) * 24 - 2}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 28" preserveAspectRatio="none" aria-hidden="true" className="h-8 w-full">
      <polyline
        points={pts}
        fill="none"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`ctl-line ${toneText[tone]}`}
        stroke="currentColor"
      />
    </svg>
  );
}

export function AreaChart({ data, tone = "cyan" }: { data: number[]; tone?: Tone }) {
  const max = Math.max(...data) || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${64 - (v / max) * 56}`);
  return (
    <svg viewBox="0 0 100 64" preserveAspectRatio="none" aria-hidden="true" className="h-24 w-full">
      <defs>
        <linearGradient id="ctl-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.32" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className={toneText[tone]}>
        <polygon points={`0,64 ${pts.join(" ")} 100,64`} fill="url(#ctl-area)" />
        <polyline
          points={pts.join(" ")}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="ctl-line"
        />
      </g>
    </svg>
  );
}

export function Bars({ data, tone = "gold" }: { data: { label: string; pct: number }[]; tone?: Tone }) {
  return (
    <div className="flex h-32 items-end gap-2 px-4 pt-3 pb-3">
      {data.map((d, i) => (
        <div key={d.label} className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5">
          <span className="font-manrope text-[9.5px] font-bold text-ctl-mist/55">{d.pct}%</span>
          <span className="flex w-full flex-1 items-end overflow-hidden rounded-[8px] bg-ctl-mist/5">
            <span
              className={`ctl-bar w-full rounded-[8px] ${toneBg[tone]}`}
              style={{
                height: `${Math.max(6, d.pct)}%`,
                opacity: 0.9,
                animationDelay: `${i * 70}ms`,
                maskImage: "linear-gradient(to top, black, color-mix(in oklab, black 55%, transparent))",
              }}
            />
          </span>
          <span className="w-full truncate text-center text-[9.5px] text-ctl-mist/40">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Meter({ label, value, pct, tone = "gold" }: { label: string; value?: string; pct: number; tone?: Tone }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="truncate text-[11.5px] font-medium text-ctl-mist/75">{label}</span>
        <span className={`shrink-0 font-manrope text-[10.5px] font-bold ${toneText[tone]}`}>{value ?? `${pct}%`}</span>
      </div>
      <span className="mt-2 block h-[7px] w-full overflow-hidden rounded-full bg-ctl-mist/7 ring-1 ring-inset ring-ctl-mist/5">
        <span
          className={`block h-full rounded-full ${toneBg[tone]}`}
          style={{
            width: `${pct}%`,
            opacity: 0.92,
            boxShadow: "0 0 12px -2px currentColor",
          }}
        />
      </span>
    </div>
  );
}

export function Donut({ slices }: { slices: { label: string; pct: number; tone: Tone }[] }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="flex items-center gap-4 px-4 pb-4">
      <svg viewBox="0 0 90 90" aria-hidden="true" className="size-[104px] shrink-0 -rotate-90">
        <circle cx="45" cy="45" r={r} fill="none" strokeWidth="11" className="stroke-ctl-mist/8" />
        {slices.map((s) => {
          const len = (s.pct / 100) * c;
          const el = (
            <circle
              key={s.label}
              cx="45"
              cy="45"
              r={r}
              fill="none"
              strokeWidth="11"
              strokeLinecap="butt"
              stroke="currentColor"
              className={toneText[s.tone]}
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <ul className="min-w-0 flex-1 space-y-1.5">
        {slices.map((s) => (
          <li key={s.label} className="flex items-center gap-2 text-[11.5px]">
            <span className={`size-2 shrink-0 rounded-full ${toneBg[s.tone]}`} />
            <span className="min-w-0 flex-1 truncate text-ctl-mist/70">{s.label}</span>
            <span className="shrink-0 font-semibold text-ctl-mist/50">{s.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Rows ───────────────────────────────────────────────── */

export function Row({
  title,
  note,
  value,
  health,
  trailing,
}: {
  title: string;
  note?: string;
  value?: string;
  health?: Health;
  trailing?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 border-t border-ctl-mist/7 px-4 py-3 first:border-t-0">
      {health && <StatusDot health={health} />}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12.5px] font-semibold">{title}</span>
        {note && <span className="mt-0.5 block truncate text-[10px] text-ctl-mist/40">{note}</span>}
      </span>
      {value && <span className="shrink-0 font-manrope text-[11px] text-ctl-mist/55">{value}</span>}
      {trailing}
    </div>
  );
}
