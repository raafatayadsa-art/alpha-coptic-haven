import type { ReactNode } from "react";
import { ChevronRight } from "./icons";

type Tone = "gold" | "lavender" | "parchment";

const toneClasses: Record<Tone, string> = {
  gold: "bg-gold/12 text-gold ring-1 ring-gold/20",
  lavender: "bg-lavender/40 text-ink/70 ring-1 ring-lavender",
  parchment: "bg-parchment text-ink/60 ring-1 ring-ink/5",
};

export function QuickLinkCard({
  icon,
  title,
  subtitle,
  tone = "parchment",
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  tone?: Tone;
}) {
  return (
    <div className="press glass-card group flex items-start gap-3 rounded-[26px] p-4">
      <span
        className={`grid size-11 place-items-center rounded-2xl ${toneClasses[tone]}`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1 pt-0.5">
        <span className="block truncate text-[13px] font-semibold tracking-tight">{title}</span>
        <span className="mt-0.5 block truncate text-[11px] text-ink/45">{subtitle}</span>
      </span>
      <ChevronRight className="mt-2 size-4 text-ink/25 transition-transform duration-500 group-hover:translate-x-0.5" />
    </div>
  );
}
