import { shieldSizes, shields, type ShieldSize, type ShieldSlug } from "@/lib/shields";
import { cn } from "@/lib/utils";

type ShieldProps = {
  slug: ShieldSlug;
  size?: ShieldSize;
  /** Decorative by default; pass a label when the shield carries meaning alone. */
  label?: string;
  className?: string;
  /** Soft gold halo behind the shield, for hero placements. */
  halo?: boolean;
};

export function Shield({ slug, size = "md", label, className, halo = false }: ShieldProps) {
  const meta = shields[slug];
  const px = shieldSizes[size];

  return (
    <span
      className={cn("relative inline-grid shrink-0 place-items-center", className)}
      style={{ width: px, height: px }}
    >
      {halo ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-gold/25 blur-xl"
        />
      ) : null}
      <img
        src={meta.url}
        alt={label ?? ""}
        aria-hidden={label ? undefined : true}
        width={px}
        height={px}
        loading="lazy"
        decoding="async"
        className="relative size-full object-contain drop-shadow-[0_6px_14px_rgba(24,20,14,0.22)]"
      />
    </span>
  );
}
