import type { CSSProperties, ReactNode } from "react";

import {
  BookGlyph,
  ChoirGlyph,
  ChurchGlyph,
  FamilyGlyph,
  GroupGlyph,
  ServiceGlyph,
  ShieldLockGlyph,
  WaveGlyph,
  YouthGlyph,
} from "@/components/connect/connect-icons";
import { Shield } from "@/components/church/Shield";
import type { ChannelIconKey, Member, Presence } from "@/lib/connect-data";
import { cn } from "@/lib/utils";

/* ── Section title: gilded eyebrow + hairline ─────────────── */

export function AcSectionTitle({
  eyebrow,
  title,
  action,
  className,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-3 px-1", className)}>
      <div className="min-w-0">
        {eyebrow ? (
          <p className="font-manrope text-[9px] font-bold tracking-[0.22em] text-aqua/70 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-1 font-display text-[19px] leading-tight text-acivory">{title}</h2>
        <span aria-hidden="true" className="ac-hairline mt-1.5 block h-px w-16 opacity-70" />
      </div>
      {action}
    </div>
  );
}

/* ── Channel avatar ──────────────────────────────────────── */

const channelGlyph: Record<ChannelIconKey, (p: { className?: string }) => ReactNode> = {
  church: ChurchGlyph,
  family: FamilyGlyph,
  book: BookGlyph,
  group: GroupGlyph,
  shield: ShieldLockGlyph,
  youth: YouthGlyph,
  choir: ChoirGlyph,
  service: ServiceGlyph,
};

export function ChannelAvatar({
  icon,
  hue,
  size = 46,
  live = false,
}: {
  icon: ChannelIconKey;
  hue: string;
  size?: number;
  live?: boolean;
}) {
  const Glyph = channelGlyph[icon];
  return (
    <span
      className="relative grid shrink-0 place-items-center rounded-[16px] border"
      style={
        {
          width: size,
          height: size,
          borderColor: `color-mix(in oklab, ${hue} 34%, transparent)`,
          background: `linear-gradient(160deg, color-mix(in oklab, ${hue} 22%, transparent), transparent 78%)`,
          color: hue,
        } as CSSProperties
      }
    >
      <Glyph className="size-[21px]" />
      {live ? (
        <span
          aria-hidden="true"
          className="absolute -end-1 -top-1 size-2.5 rounded-full ring-2 ring-acnight"
          style={{ background: "var(--ac-signal)" }}
        />
      ) : null}
    </span>
  );
}

/* ── Live voice level bars ───────────────────────────────── */

export function VoiceBars({
  active = true,
  className,
  bars = 5,
  tone,
}: {
  active?: boolean;
  className?: string;
  bars?: number;
  tone?: string;
}) {
  return (
    <span className={cn("inline-flex h-3.5 items-end gap-[2px]", className)} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn("w-[2px] rounded-full", active && "ac-bar")}
          style={{
            height: `${52 + ((i * 37) % 48)}%`,
            background: tone ?? "var(--ac-signal)",
            animationDelay: `${i * 0.11}s`,
            opacity: active ? 1 : 0.35,
          }}
        />
      ))}
    </span>
  );
}

/* ── Presence dot ────────────────────────────────────────── */

const presenceTone: Record<Presence, string> = {
  speaking: "var(--ac-signal)",
  listening: "var(--ac-aqua)",
  muted: "var(--ac-quiet)",
  away: "var(--ac-gold)",
};

export function PresenceDot({ presence, className }: { presence: Presence; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("size-2.5 rounded-full ring-2 ring-acnight", className)}
      style={{ background: presenceTone[presence], opacity: presence === "muted" ? 0.6 : 1 }}
    />
  );
}

/* ── Member avatar with shield badge ─────────────────────── */

export function MemberAvatar({
  member,
  size = 44,
  showShield = true,
}: {
  member: Member;
  size?: number;
  showShield?: boolean;
}) {
  return (
    <span className="relative inline-grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <span
        className="grid size-full place-items-center rounded-full border font-display text-[16px]"
        style={{
          borderColor: `color-mix(in oklab, ${member.tone} 40%, transparent)`,
          background: `linear-gradient(160deg, color-mix(in oklab, ${member.tone} 24%, transparent), transparent 80%)`,
          color: member.tone,
        }}
      >
        {member.initial}
      </span>
      {member.presence === "speaking" ? (
        <span
          aria-hidden="true"
          className="ac-sonar pointer-events-none absolute inset-0 rounded-full border"
          style={{ borderColor: "color-mix(in oklab, var(--ac-signal) 70%, transparent)" }}
        />
      ) : null}
      {showShield ? (
        <span className="absolute -bottom-1.5 -end-1.5 grid size-4 place-items-center rounded-full bg-acnight/85 ring-1 ring-aqua/25">
          <Shield slug={member.shield} size="xs" className="scale-[0.5]" />
        </span>
      ) : null}
      <PresenceDot presence={member.presence} className="absolute -top-0.5 -start-0.5" />
    </span>
  );
}

/* ── Bottom sheet (presentation only) ────────────────────── */

export function AcSheet({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
  dir,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: ReactNode;
  footer?: ReactNode;
  dir?: "rtl" | "ltr";
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center" dir={dir}>
      <button
        type="button"
        aria-label="close"
        onClick={onClose}
        className="absolute inset-0 bg-acnight/70 backdrop-blur-[3px]"
      />
      <div className="animate-float-up ac-glass safe-bottom relative w-full max-w-[430px] rounded-t-[30px] px-4 pt-3 pb-5">
        <span aria-hidden="true" className="mx-auto mb-3 block h-1 w-11 rounded-full bg-acivory/25" />
        <div className="flex items-start justify-between gap-3">
          <div>
            {eyebrow ? (
              <p className="font-manrope text-[9px] font-bold tracking-[0.22em] text-aqua/70 uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h3 className="mt-1 font-display text-[20px] text-acivory">{title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="press grid size-9 place-items-center rounded-full border border-aqua/20 text-acquiet"
          >
            <span aria-hidden="true" className="text-[15px] leading-none">
              ✕
            </span>
          </button>
        </div>
        <div className="mt-4 max-h-[64vh] overflow-y-auto pe-0.5">{children}</div>
        {footer ? <div className="mt-4">{footer}</div> : null}
      </div>
    </div>
  );
}

/* ── Small chip ──────────────────────────────────────────── */

export function AcChip({
  children,
  on = false,
  tone,
  className,
  ...rest
}: {
  children: ReactNode;
  on?: boolean;
  tone?: string;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        "press inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 font-manrope text-[11px] font-semibold transition-colors duration-300",
        on
          ? "border-transparent text-acnight"
          : "border-aqua/20 bg-acdeep/50 text-acquiet hover:text-acivory",
        className,
      )}
      style={on ? { background: tone ?? "var(--ac-aqua)" } : undefined}
    >
      {children}
    </button>
  );
}

/* ── Decorative waveform strip ───────────────────────────── */

export function Waveform({
  wave,
  progress = 0,
  tone = "var(--ac-aqua)",
  className,
}: {
  wave: number[];
  progress?: number;
  tone?: string;
  className?: string;
}) {
  return (
    <span className={cn("flex h-8 flex-1 items-center gap-[2.5px]", className)} aria-hidden="true">
      {wave.map((h, i) => {
        const played = i / wave.length <= progress;
        return (
          <span
            key={i}
            className="w-[2.5px] rounded-full"
            style={{
              height: `${Math.round(h * 100)}%`,
              background: played ? tone : "color-mix(in oklab, var(--ac-quiet) 40%, transparent)",
            }}
          />
        );
      })}
    </span>
  );
}

export function AcIconButton({
  label,
  children,
  className,
  ...rest
}: {
  label: string;
  children: ReactNode;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">) {
  return (
    <button
      type="button"
      aria-label={label}
      {...rest}
      className={cn(
        "press grid size-10 place-items-center rounded-full border border-aqua/20 bg-acdeep/55 text-acivory/85 backdrop-blur-xl transition-colors hover:border-aqua/45",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function LiveTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/35 bg-signal/12 px-2 py-[3px] font-manrope text-[9.5px] font-bold tracking-[0.14em] text-signal uppercase">
      <VoiceBars bars={3} className="h-2.5" />
      {label}
    </span>
  );
}

export function AcMeter({ level, tone = "var(--ac-aqua)" }: { level: number; tone?: string }) {
  return (
    <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-acivory/10" aria-hidden="true">
      <span
        className="block h-full rounded-full"
        style={{ width: `${Math.round(level * 100)}%`, background: tone }}
      />
    </span>
  );
}

export { WaveGlyph };
