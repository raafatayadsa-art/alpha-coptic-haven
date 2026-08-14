import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { ArrowLeftIcon } from "./icons";

/* Presentation-only navigation helper: real routes navigate, everything else
   announces itself instead of faking functionality. */
export function useOpen() {
  return (label: string) => {
    toast(label, { description: "هذه التجربة ستُفتح من هنا داخل ألفا." });
  };
}

export function SectionHead({
  eyebrow,
  title,
  action,
  onAction,
}: {
  eyebrow?: string;
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-end justify-between gap-4 px-5">
      <div className="min-w-0">
        {eyebrow ? (
          <span className="font-arabic block text-[10px] font-semibold tracking-[0.14em] text-gold">
            {eyebrow}
          </span>
        ) : null}
        <h2 className="font-arabic mt-1.5 text-[19px] font-bold leading-tight tracking-tight">{title}</h2>
      </div>
      {action ? (
        <button
          type="button"
          onClick={onAction}
          className="font-arabic press flex shrink-0 items-center gap-1 text-[11px] font-semibold text-ink/45"
        >
          {action}
          <ArrowLeftIcon className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}

/** Horizontal snap rail — Alpha's signature scroll pattern. */
export function Rail({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      dir="rtl"
      className={`no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 ${className}`}
    >
      {children}
    </div>
  );
}

export function Tappable({
  to,
  onClick,
  className,
  children,
  label,
}: {
  to?: "/church" | "/church-home";
  onClick?: () => void;
  className?: string;
  children: ReactNode;
  label?: string;
}) {
  if (to) {
    return (
      <Link to={to} aria-label={label} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" aria-label={label} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
