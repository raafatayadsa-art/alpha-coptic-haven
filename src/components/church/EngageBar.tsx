import { useCallback, useRef, useState } from "react";

import { ChatIcon, HeartIcon } from "@/components/church/icons";
import { BookmarkIcon, ShareIcon } from "@/components/church/media-icons";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

type Action = "like" | "comment" | "share" | "save";

type Comment = { id: string; author: string; text: string; when: string };

type EngageBarProps = {
  likes: number;
  comments: number;
  tone?: Tone;
  compact?: boolean;
  className?: string;
  /** Presentation-only seed comments shown when the panel opens. */
  seed?: { author: string; text: string; when: string }[];
};

/** Presentation-only feed interactions: like · comment · share · save (Alpha pill style). */
export function EngageBar({
  likes,
  comments,
  tone = "light",
  compact = false,
  className,
  seed = [],
}: EngageBarProps) {
  const { t, isArabic, lang } = useLang();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [thread, setThread] = useState<Comment[]>(() =>
    seed.map((c, i) => ({ id: `seed-${i}`, ...c })),
  );
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

  const dark = tone === "dark";
  const hair = dark ? "border-ivory/12" : "border-ink/6";
  const pill = dark
    ? "bg-ivory/10 text-ivory/75 ring-1 ring-ivory/15 hover:bg-ivory/15"
    : "bg-parchment/80 text-ink/60 ring-1 ring-ink/5 hover:bg-parchment";
  const pillActive = dark
    ? "bg-gold/25 text-gold ring-1 ring-gold/35"
    : "bg-gold/12 text-gold ring-1 ring-gold/25";
  const size = compact ? "size-[13px]" : "size-[15px]";
  const text = compact ? "text-[10.5px]" : "text-[11.5px]";
  const pad = compact ? "h-7 gap-1.5 px-2.5" : "h-8 gap-1.5 px-3";
  const base = cn(
    "press inline-flex shrink-0 items-center rounded-full font-medium transition-colors duration-300",
    pad,
    text,
  );

  const submit = () => {
    const value = draft.trim();
    if (!value) return;
    setThread((list) => [
      ...list,
      { id: `c-${Date.now()}`, author: t("engage.you"), text: value, when: t("engage.now") },
    ]);
    setDraft("");
  };

  return (
    <div className={cn(isArabic && "font-arabic", className)}>
      <div className={cn("flex items-center justify-between gap-2 border-t pt-2.5", hair)}>
        <div className={cn("flex items-center", compact ? "gap-1.5" : "gap-2")}>
          <button
            type="button"
            onClick={() => {
              setLiked((v) => !v);
              pulse("like");
            }}
            aria-pressed={liked}
            aria-label={t("engage.like")}
            className={cn(base, liked ? pillActive : pill)}
          >
            <span className="relative inline-grid place-items-center">
              <HeartIcon className={cn(size, burst === "like" && "engage-pop")} />
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
            onClick={() => {
              setOpen((v) => !v);
              pulse("comment");
            }}
            aria-expanded={open}
            aria-label={t("engage.comment")}
            className={cn(base, open ? pillActive : pill)}
          >
            <ChatIcon className={cn(size, burst === "comment" && "engage-pop")} />
            <span className="tabular-nums">
              {fmt(comments + thread.filter((c) => c.id.startsWith("c-")).length)}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              setShared(true);
              pulse("share");
              setTimeout(() => setShared(false), 1400);
            }}
            aria-label={t("engage.share")}
            className={cn(base, shared ? pillActive : pill)}
          >
            <ShareIcon className={cn(size, burst === "share" && "engage-nudge", "rtl:-scale-x-100")} />
            {!compact && (
              <span key={shared ? "on" : "off"} className="engage-count">
                {shared ? t("engage.shared") : t("engage.share")}
              </span>
            )}
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
          className={cn(base, saved ? pillActive : pill)}
        >
          <BookmarkIcon className={cn(size, burst === "save" && "engage-tuck")} />
          {!compact && (
            <span key={saved ? "on" : "off"} className="engage-count">
              {saved ? t("engage.saved") : t("engage.save")}
            </span>
          )}
        </button>
      </div>

      {open && (
        <div
          className={cn(
            "animate-float-up mt-3 rounded-[20px] p-3",
            dark ? "bg-ivory/8 ring-1 ring-ivory/12" : "bg-parchment/70 ring-1 ring-ink/5",
          )}
        >
          <p
            className={cn(
              "px-0.5 text-[10px] font-semibold uppercase tracking-[0.16em]",
              dark ? "text-ivory/45" : "text-ink/40",
            )}
          >
            {t("engage.comments")}
          </p>

          {thread.length === 0 ? (
            <p className={cn("mt-2 px-0.5 text-[11.5px]", dark ? "text-ivory/50" : "text-ink/45")}>
              {t("engage.empty")}
            </p>
          ) : (
            <ul className="mt-2.5 space-y-2.5">
              {thread.map((c) => (
                <li key={c.id} className="flex items-start gap-2.5">
                  <span
                    className={cn(
                      "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full text-[10px] font-semibold",
                      dark ? "bg-ivory/12 text-ivory/70" : "bg-ivory text-ink/55 ring-1 ring-ink/5",
                    )}
                  >
                    {c.author.slice(0, 1)}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11.5px] font-semibold leading-tight">
                      {c.author}
                      <span className={cn("ms-2 font-normal", dark ? "text-ivory/40" : "text-ink/35")}>
                        {c.when}
                      </span>
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 text-[11.5px] leading-relaxed",
                        dark ? "text-ivory/70" : "text-ink/60",
                      )}
                    >
                      {c.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="mt-3 flex items-center gap-2"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={t("engage.placeholder")}
              aria-label={t("engage.placeholder")}
              className={cn(
                "min-w-0 flex-1 rounded-full px-3.5 py-2 text-[11.5px] outline-none transition-shadow duration-300 focus:ring-2 focus:ring-gold/30",
                dark
                  ? "bg-ivory/10 text-ivory placeholder:text-ivory/40"
                  : "bg-ivory text-ink ring-1 ring-ink/6 placeholder:text-ink/35",
              )}
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              className="press shrink-0 rounded-full bg-gold px-3.5 py-2 text-[11.5px] font-semibold text-ink disabled:opacity-40"
            >
              {t("engage.send")}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
