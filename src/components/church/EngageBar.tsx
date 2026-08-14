import { useCallback, useRef, useState } from "react";

import { ChatIcon, HeartIcon } from "@/components/church/icons";
import { BookmarkIcon, ShareIcon } from "@/components/church/media-icons";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

type Action = "like" | "comment" | "share" | "save";

type EngageBarProps = {
  likes: number;
  comments: number;
  tone?: Tone;
  compact?: boolean;
  className?: string;
};

/** Presentation-only feed interactions: like · comment · share · save. */
export function EngageBar({
  likes,
  comments,
  tone = "light",
  compact = false,
  className,
}: EngageBarProps) {
  const { t, isArabic, lang } = useLang();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [burst, setBurst] = useState<Action | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Retrigger the CSS animation by remounting the animated class briefly. */
  const pulse = useCallback((action: Action) => {
    if (timer.current) clearTimeout(timer.current);
    setBurst(null);
    requestAnimationFrame(() => setBurst(action));
    timer.current = setTimeout(() => setBurst(null), 620);
  }, []);

  const fmt = (n: number) =>
    new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US").format(n);

  const muted = tone === "dark" ? "text-ivory/60" : "text-ink/50";
  const hair = tone === "dark" ? "border-ivory/12" : "border-ink/6";
  const size = compact ? "size-[13px]" : "size-[15px]";
  const text = compact ? "text-[10.5px]" : "text-[11.5px]";
  const icon = "transition-colors duration-300";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-2 border-t pt-2.5",
        hair,
        isArabic && "font-arabic",
        className,
      )}
    >
      <div className={cn("flex items-center", compact ? "gap-3.5" : "gap-4")}>
        <button
          type="button"
          onClick={() => {
            setLiked((v) => !v);
            pulse("like");
          }}
          aria-pressed={liked}
          aria-label={t("engage.like")}
          className={cn(
            "press inline-flex items-center gap-1.5 font-medium",
            text,
            liked ? "text-gold" : muted,
          )}
        >
          <span className="relative inline-grid place-items-center">
            <HeartIcon className={cn(size, icon, burst === "like" && "engage-pop")} />
            {burst === "like" && liked && (
              <span
                aria-hidden="true"
                className="engage-halo pointer-events-none absolute size-6 rounded-full bg-gold/35"
              />
            )}
          </span>
          <span key={liked ? "on" : "off"} className={cn("tabular-nums", liked && "engage-count")}>
            {fmt(likes + (liked ? 1 : 0))}
          </span>
        </button>
        <button
          type="button"
          onClick={() => pulse("comment")}
          aria-label={t("engage.comment")}
          className={cn("press inline-flex items-center gap-1.5 font-medium", text, muted)}
        >
          <ChatIcon className={cn(size, icon, burst === "comment" && "engage-pop")} />
          {fmt(comments)}
        </button>
        <button
          type="button"
          onClick={() => pulse("share")}
          aria-label={t("engage.share")}
          className={cn("press inline-flex items-center gap-1.5 font-medium", text, muted)}
        >
          <ShareIcon
            className={cn(size, icon, burst === "share" && "engage-nudge", "rtl:-scale-x-100")}
          />
          {!compact && t("engage.share")}
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          setSaved((v) => !v);
          pulse("save");
        }}
        aria-pressed={saved}
        aria-label={t("engage.save")}
        className={cn(
          "press inline-flex items-center gap-1.5 font-medium",
          text,
          saved ? "text-gold" : muted,
        )}
      >
        <BookmarkIcon className={cn(size, icon, burst === "save" && "engage-tuck")} />
        {!compact && (
          <span key={saved ? "on" : "off"} className="engage-count">
            {saved ? t("engage.saved") : t("engage.save")}
          </span>
        )}
      </button>
    </div>
  );
}
