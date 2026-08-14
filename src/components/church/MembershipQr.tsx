import { cn } from "@/lib/utils";

/** Deterministic decorative QR-style matrix (visual design only). */
function matrix(seed: string, size = 21) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const cells: boolean[] = [];
  for (let i = 0; i < size * size; i++) {
    h = (h * 1664525 + 1013904223) >>> 0;
    cells.push(((h >>> 16) & 7) > 3);
  }
  // clear the three finder-pattern corners
  const clear = (ox: number, oy: number) => {
    for (let y = 0; y < 8; y++)
      for (let x = 0; x < 8; x++) {
        const cx = ox + x;
        const cy = oy + y;
        if (cx < size && cy < size) cells[cy * size + cx] = false;
      }
  };
  clear(0, 0);
  clear(size - 8, 0);
  clear(0, size - 8);
  return { cells, size };
}

export function MembershipQr({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const { cells, size } = matrix(value);

  return (
    <span
      role="img"
      aria-label={label}
      dir="ltr"
      className={cn(
        "relative grid aspect-square w-full place-items-center rounded-[18px] bg-ivory p-2.5 ring-1 ring-ink/8",
        className,
      )}
    >
      <span
        className="grid size-full gap-[1.5px]"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
        aria-hidden="true"
      >
        {cells.map((on, i) => (
          <span
            key={i}
            className={cn("rounded-[1px]", on ? "bg-ink/85" : "bg-transparent")}
          />
        ))}
      </span>

      {/* finder patterns */}
      {[
        "left-2.5 top-2.5",
        "right-2.5 top-2.5",
        "left-2.5 bottom-2.5",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden="true"
          className={cn(
            "absolute grid size-[26%] place-items-center rounded-[7px] bg-ink/85 p-[18%]",
            pos,
          )}
        >
          <span className="grid size-full place-items-center rounded-[3px] bg-ivory p-[26%]">
            <span className="size-full rounded-[1.5px] bg-ink/85" />
          </span>
        </span>
      ))}
    </span>
  );
}
