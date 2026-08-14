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
  const start = useRef<number | null>(null);

  const go = (step: number) => {
    setIndex((i) => (i + step + cards.length) % cards.length);
  };

  const onDown = (e: React.PointerEvent) => {
    start.current = e.clientX;
  };
  const onMove = (e: React.PointerEvent) => {
    if (start.current === null) return;
    setDrag(e.clientX - start.current);
  };
  const onUp = () => {
    if (start.current === null) return;
    const d = drag;
    start.current = null;
    setDrag(0);
    if (Math.abs(d) > 56) go(d < 0 ? 1 : -1);
  };

  const card = cards[index]!;
  const behind = [1, 2].map((o) => cards[(index + o) % cards.length]!);
  const rtl = dir === "rtl";

  return (
    <div className="select-none">
      <div className="relative">
        {/* cards tucked behind the active one */}
        {behind.map((b, i) => (
          <div
            key={`${b.eyebrow}-behind`}
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-0 overflow-hidden rounded-[30px] shadow-[var(--shadow-soft)] transition-all duration-300",
              b.tone === "lavender" ? "bg-lavender/50" : "bg-card",
              "ring-1 ring-ink/5",
            )}
            style={{
              transform: `translateY(${(i + 1) * 14}px) scale(${1 - (i + 1) * 0.05})`,
              opacity: 1 - (i + 1) * 0.25,
              zIndex: 10 - i,
            }}
          >
            <img
              src={b.image}
              alt=""
              width={1024}
              height={1280}
              loading="lazy"
              className="size-full object-cover opacity-40"
            />
          </div>
        ))}

        {/* active card */}
        <article
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className={cn(
            "relative z-20 touch-pan-y overflow-hidden rounded-[30px] shadow-lift ring-1 ring-ink/5",
            drag === 0 && "transition-transform duration-300",
          )}
          style={{
            transform: `translateX(${drag}px) rotate(${drag / 40}deg)`,
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
