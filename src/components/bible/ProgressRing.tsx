/** Presentation-only progress ring for the Bible reading progress. */
export function ProgressRing({
  value,
  size = 84,
  label,
  caption,
}: {
  value: number;
  size?: number;
  label: string;
  caption?: string;
}) {
  const r = (size - 9) / 2;
  const c = 2 * Math.PI * r;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="color-mix(in oklab, var(--sc-ink) 12%, transparent)"
          strokeWidth={5}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#ringGold)"
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * Math.min(100, Math.max(0, value))) / 100}
        />
        <defs>
          <linearGradient id="ringGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--sc-copper)" />
            <stop offset="100%" stopColor="var(--sc-gold)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center leading-none">
        <span className="font-display text-[19px] font-semibold tabular-nums text-inkblue">
          {label}
        </span>
        {caption ? (
          <span className="mt-0.5 block text-[8.5px] font-medium tracking-[0.12em] text-quiet uppercase">
            {caption}
          </span>
        ) : null}
      </div>
    </div>
  );
}
