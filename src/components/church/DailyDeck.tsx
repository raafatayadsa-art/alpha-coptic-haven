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
  const start = useRef<number | null>(null);
  const startTime = useRef(0);
  const lock = useRef(false);

  const go = (step: number) => {
    setIndex((i) => (i + step + cards.length) % cards.length);
  };

  /** rubber-band the drag so the card feels weighted near the edges */
  const resist = (x: number) => {
    const max = 190;
    const s = Math.sign(x);
    const a = Math.abs(x);
    return s * max * (1 - Math.exp(-a / max));
  };

  const commit = (step: 1 | -1) => {
    if (lock.current) return;
    lock.current = true;
    setSnapping(step);
    window.setTimeout(() => {
      go(step);
      setSnapping(0);
      setDrag(0);
      lock.current = false;
    }, 230);
  };

  const onDown = (e: React.PointerEvent) => {
    if (lock.current) return;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    start.current = e.clientX;
    startTime.current = performance.now();
  };
  const onMove = (e: React.PointerEvent) => {
    if (start.current === null) return;
    setDrag(resist(e.clientX - start.current));
  };
  const onUp = () => {
    if (start.current === null) return;
    const d = drag;
    const dt = Math.max(performance.now() - startTime.current, 1);
    const velocity = Math.abs(d) / dt; // px per ms
    start.current = null;
    if (Math.abs(d) > 64 || velocity > 0.45) {
      commit(d < 0 ? 1 : -1);
    } else {
      setDrag(0);
    }
  };

  const card = cards[index]!;
  const behind = [1, 2].map((o) => cards[(index + o) % cards.length]!);
  const rtl = dir === "rtl";
  const peekSide = rtl ? -1 : 1;

  const activeX = snapping !== 0 ? snapping * -420 : drag;
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
              settled && "transition-all duration-[260ms] ease-out",
            )}
            style={{
              transform: `translate3d(${peekSide * (depth * 12 - lift * 12)}px, ${depth * 10 - lift * 10}px, 0) scale(${1 - depth * 0.035 + lift * 0.035})`,
              opacity: 1 - depth * 0.2 + lift * 0.2,
              zIndex: 10 - i,
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
          className={cn(
            "relative z-20 touch-pan-y overflow-hidden rounded-[30px] shadow-lift ring-1 ring-ink/5 will-change-transform",
            settled &&
              "transition-[transform,opacity] duration-[260ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]",
          )}
          style={{
            transform: `translate3d(${activeX}px, 0, 0) rotate(${activeX / 44}deg)`,
            opacity: snapping !== 0 ? 0 : 1,
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
