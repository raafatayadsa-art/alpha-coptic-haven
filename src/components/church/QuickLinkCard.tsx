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
    <div className="press glass-card group flex items-start gap-2.5 rounded-[26px] p-3.5">
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-2xl ${toneClasses[tone]}`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1 pt-0.5">
        <span className="block text-[13px] font-semibold leading-tight tracking-tight">{title}</span>
        <span className="mt-1 block text-[10.5px] leading-snug text-ink/45">{subtitle}</span>
      </span>
      <ChevronRight className="mt-2 size-3.5 shrink-0 text-ink/25 transition-transform duration-500 group-hover:translate-x-0.5" />
    </div>

  );
}
