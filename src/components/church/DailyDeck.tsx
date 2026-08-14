import { Link } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";

import { ChevronRight } from "@/components/church/icons";
import { EngageBar } from "@/components/church/EngageBar";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type DailyCard = {
  eyebrow: string;
  title: string;
  line: string;
  meta: string;
  action: string;
  /** optional destination for the card's action pill */
  to?: string;
  image: string;
  icon: ReactNode;
  tone: "lavender" | "card";
  likes: number;
  comments: number;
};


/**
 * Presentation-only stacked deck: one card on top, the rest tucked behind it.
 * Drag / swipe left or right to change the card.
 */
export function DailyDeck({ cards }: { cards: DailyCard[] }) {
  const { t, dir } = useLang();
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [snapping, setSnapping] = useState<0 | 1 | -1>(0);
  const [duration, setDuration] = useState(260);
  const start = useRef<number | null>(null);
  const startY = useRef(0);
  const axis = useRef<"none" | "x" | "y">("none");
  const last = useRef({ x: 0, t: 0 });
  const velocity = useRef(0);
  const lock = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const go = (step: number) => {
    setIndex((i) => (i + step + cards.length) % cards.length);
  };

  /** rubber-band the drag so the card feels weighted near the edges */
  const resist = (x: number) => {
    const max = 200;
    const s = Math.sign(x);
    const a = Math.abs(x);
    return s * max * (1 - Math.exp(-a / max));
  };

  /** fling the card away, then swap — duration follows the release speed */
  const commit = (step: 1 | -1, v: number) => {
    if (lock.current) return;
    lock.current = true;
    const ms = Math.round(Math.min(300, Math.max(150, 260 - Math.abs(v) * 90)));
    setDuration(ms);
    setSnapping(step);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      go(step);
      setSnapping(0);
      setDrag(0);
      setDuration(260);
      lock.current = false;
    }, ms);
  };

  const onDown = (e: React.PointerEvent) => {
    if (lock.current) return;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    start.current = e.clientX;
    startY.current = e.clientY;
    axis.current = "none";
    velocity.current = 0;
    last.current = { x: e.clientX, t: performance.now() };
  };

  const onMove = (e: React.PointerEvent) => {
    if (start.current === null) return;
    const dx = e.clientX - start.current;
    const dy = e.clientY - startY.current;

    /* decide the gesture axis once, so vertical scrolling stays untouched */
    if (axis.current === "none") {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
    }
    if (axis.current === "y") return;

    const now = performance.now();
    const dt = now - last.current.t;
    if (dt > 0) {
      /* smoothed instantaneous velocity in px/ms */
      const v = (e.clientX - last.current.x) / dt;
      velocity.current = velocity.current * 0.7 + v * 0.3;
      last.current = { x: e.clientX, t: now };
    }
    setDrag(resist(dx));
  };

  const onUp = () => {
    if (start.current === null) return;
    const d = drag;
    const v = velocity.current;
    start.current = null;
    if (axis.current !== "x") {
      setDrag(0);
      return;
    }
    axis.current = "none";

    /* fast flick OR far enough drag — projected offset covers both */
    const projected = d + v * 110;
    if (Math.abs(projected) > 78 || Math.abs(v) > 0.55) {
      commit(projected < 0 ? 1 : -1, v);
    } else {
      setDuration(300);
      setDrag(0);
    }
  };

  const card = cards[index]!;
  const behind = [1, 2].map((o) => cards[(index + o) % cards.length]!);
  const rtl = dir === "rtl";
  const peekSide = rtl ? -1 : 1;

  const activeX = snapping !== 0 ? snapping * -460 : drag;
  const settled = drag === 0 || snapping !== 0;


  return (
    <div className="select-none">
      <div className="relative">
        {/* cards tucked behind the active one, peeking out on the side */}
        {behind.map((b, i) => {
          const depth = i + 1;
          const progress = Math.min(Math.abs(drag) / 190, 1);
          const lift = depth === 1 ? progress : 0;
          return (
          <div
            key={`${b.eyebrow}-behind`}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 overflow-hidden rounded-[30px] shadow-[var(--shadow-soft)] ring-1 ring-ink/5",
              b.tone === "lavender" ? "bg-lavender/60" : "bg-parchment",
            )}
            style={{
              transform: `translate3d(${peekSide * (depth * 12 - lift * 12)}px, ${depth * 10 - lift * 10}px, 0) scale(${1 - depth * 0.035 + lift * 0.035})`,
              opacity: 1 - depth * 0.2 + lift * 0.2,
              zIndex: 10 - i,
              transition: settled
                ? `transform ${duration}ms cubic-bezier(0.22,0.61,0.36,1), opacity ${duration}ms ease-out`
                : "none",
            }}
          >
            <img
              src={b.image}
              alt=""
              width={1024}
              height={1280}
              loading="lazy"
              className="size-full object-cover opacity-25"
            />
          </div>
          );
        })}

        {/* active card */}
        <article
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="relative z-20 touch-pan-y overflow-hidden rounded-[30px] shadow-lift ring-1 ring-ink/5 will-change-transform"
          style={{
            transform: `translate3d(${activeX}px, 0, 0) rotate(${activeX / 48}deg)`,
            opacity: snapping !== 0 ? 0 : 1,
            transition: settled
              ? `transform ${duration}ms cubic-bezier(0.22,0.61,0.36,1), opacity ${duration}ms ease-out`
              : "none",
          }}

        >

          <div className="relative h-[300px] w-full">
            <img
              key={card.image}
              src={card.image}
              alt={t(card.title)}
              width={1024}
              height={1280}
              className="animate-fade-in size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/92 via-ink/45 to-ink/5" />

            {/* text lives inside the image */}
            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-xl bg-ivory/15 text-gold ring-1 ring-ivory/20 backdrop-blur-md">
                  {card.icon}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory/70">
                  {t(card.eyebrow)}
                </span>
              </div>

              <h3
                className={cn(
                  "mt-2.5 text-pretty text-ivory",
                  card.tone === "lavender"
                    ? "font-display text-[17px] italic leading-[1.5]"
                    : "font-display text-[18px] font-semibold leading-snug tracking-tight",
                )}
              >
                {t(card.title)}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-[11.5px] leading-relaxed text-ivory/60">
                {t(card.line)}
              </p>

              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ivory/55">
                  {t(card.meta)}
                </span>
                <button
                  type="button"
                  className="press flex items-center gap-1 rounded-full bg-ivory/12 px-3 py-1.5 text-[11px] font-semibold text-gold ring-1 ring-ivory/15 backdrop-blur-md"
                >
                  {t(card.action)}
                  <ChevronRight className="size-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-ink px-4 pb-3 pt-1">
            <EngageBar
              key={card.eyebrow}
              likes={card.likes}
              comments={card.comments}
              tone="dark"
              seed={[
                { author: t("engage.c1.a"), text: t("engage.c1.t"), when: t("engage.c1.w") },
                { author: t("engage.c2.a"), text: t("engage.c2.t"), when: t("engage.c2.w") },
              ]}
            />
          </div>
        </article>
      </div>

      {/* deck position */}
      <div className="mt-7 flex items-center justify-center gap-1.5">
        {cards.map((c, i) => (
          <button
            key={c.eyebrow}
            type="button"
            aria-label={t(c.eyebrow)}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index ? "w-6 bg-gold" : "w-1.5 bg-ink/15",
            )}
          />
        ))}
        <span className="sr-only">{rtl ? "" : ""}</span>
      </div>
    </div>
  );
}
