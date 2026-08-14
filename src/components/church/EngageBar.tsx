import { useState } from "react";

import { ChatIcon, HeartIcon } from "@/components/church/icons";
import { BookmarkIcon, ShareIcon } from "@/components/church/media-icons";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

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

  const fmt = (n: number) =>
    new Intl.NumberFormat(lang === "ar" ? "ar-EG" : "en-US").format(n);

  const muted = tone === "dark" ? "text-ivory/60" : "text-ink/50";
  const hair = tone === "dark" ? "border-ivory/12" : "border-ink/6";
  const size = compact ? "size-[13px]" : "size-[15px]";
  const text = compact ? "text-[10.5px]" : "text-[11.5px]";

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
          onClick={() => setLiked((v) => !v)}
          aria-pressed={liked}
          aria-label={t("engage.like")}
          className={cn(
            "press inline-flex items-center gap-1.5 font-medium",
            text,
            liked ? "text-gold" : muted,
          )}
        >
          <HeartIcon className={size} />
          {fmt(likes + (liked ? 1 : 0))}
        </button>
        <button
          type="button"
          aria-label={t("engage.comment")}
          className={cn("press inline-flex items-center gap-1.5 font-medium", text, muted)}
        >
          <ChatIcon className={size} />
          {fmt(comments)}
        </button>
        <button
          type="button"
          aria-label={t("engage.share")}
          className={cn("press inline-flex items-center gap-1.5 font-medium", text, muted)}
        >
          <ShareIcon className={size} />
          {!compact && t("engage.share")}
        </button>
      </div>

      <button
        type="button"
        onClick={() => setSaved((v) => !v)}
        aria-pressed={saved}
        aria-label={t("engage.save")}
        className={cn("press inline-flex items-center gap-1.5 font-medium", text, saved ? "text-gold" : muted)}
      >
        <BookmarkIcon className={size} />
        {!compact && (saved ? t("engage.saved") : t("engage.save"))}
      </button>
    </div>
  );
}
