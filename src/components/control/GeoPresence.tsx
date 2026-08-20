/**
 * Alpha Control — "Presence by country" panel (replaces the tiny radar labels).
 * Presentation only: no logic, no data fetching.
 */
import { Panel, PanelHead, GhostButton } from "@/components/control/ControlShell";
import { AL, geoCountries, type Bi } from "@/lib/control-data";

type P = (v: Bi) => string;

export function GeoPresence({
  p,
  labelScale = 100,
  onOpenAppearance,
}: {
  p: P;
  labelScale?: number;
  onOpenAppearance?: () => void;
}) {
  const s = labelScale / 100;
  return (
    <Panel crest className="overflow-hidden">
      <PanelHead
        title={p(AL.geoTitle)}
        caption={p(AL.geoCaption)}
        action={
          onOpenAppearance ? (
            <span onClick={onOpenAppearance} role="presentation">
              <GhostButton>{p(AL.openAppearance)}</GhostButton>
            </span>
          ) : undefined
        }
      />

      {/* Dotted world plate with legible pins */}
      <div className="relative mx-4 mt-3 h-[188px] overflow-hidden rounded-[20px] border border-ctl-mist/10 bg-ctl-obsidian/60">
        <span aria-hidden="true" className="ctl-grid absolute inset-0 opacity-45" />
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 60% at 52% 55%, color-mix(in oklab, var(--ct-gold) 12%, transparent), transparent 72%)",
          }}
        />
        {geoCountries.map((c, i) => (
          <span
            key={c.code}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
          >
            <span className="relative grid place-items-center">
              <span
                className="ctl-blip absolute rounded-full bg-ctl-gold/25"
                style={{ width: 22 * s, height: 22 * s, animationDelay: `${i * 300}ms` }}
              />
              <span
                className="rounded-full bg-ctl-gold ctl-halo text-ctl-gold"
                style={{ width: 7 * s, height: 7 * s }}
              />
            </span>
            <span
              className="pointer-events-none mt-1.5 flex -translate-x-1/2 items-center gap-1 rounded-full border border-ctl-mist/12 bg-ctl-obsidian/75 px-2 py-0.5 whitespace-nowrap backdrop-blur-md"
              style={{ fontSize: `${11.5 * s}px` }}
            >
              <span aria-hidden="true">{c.flag}</span>
              <span className="font-semibold text-ctl-mist/85">{p(c.name)}</span>
              <span className="font-manrope font-bold text-ctl-gold">{c.members}</span>
            </span>
          </span>
        ))}
      </div>

      {/* Country ledger — large names, member counts, share bars */}
      <ul className="mt-3 px-4 pb-4">
        {geoCountries.map((c) => (
          <li
            key={c.code}
            className="flex items-center gap-3 border-t border-ctl-mist/7 py-3 first:border-t-0"
          >
            <span
              aria-hidden="true"
              className="grid shrink-0 place-items-center rounded-[13px] border border-ctl-mist/10 bg-ctl-mist/6"
              style={{ width: 38 * s, height: 38 * s, fontSize: `${17 * s}px` }}
            >
              {c.flag}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-baseline gap-2">
                <span
                  className="min-w-0 flex-1 truncate font-semibold tracking-tight"
                  style={{ fontSize: `${13.5 * s}px` }}
                >
                  {p(c.name)}
                </span>
                <span
                  className="shrink-0 font-manrope font-bold text-ctl-gold"
                  style={{ fontSize: `${13 * s}px` }}
                >
                  {c.members}
                </span>
              </span>
              <span className="mt-1 flex items-center gap-2">
                <span
                  className="min-w-0 flex-1 truncate text-ctl-mist/45"
                  style={{ fontSize: `${10.5 * s}px` }}
                >
                  {p(c.city)}
                </span>
                <span
                  className={`shrink-0 rounded-full px-1.5 py-0.5 font-bold ${
                    c.up ? "bg-ctl-jade/12 text-ctl-jade" : "bg-ctl-crimson/12 text-ctl-crimson"
                  }`}
                  style={{ fontSize: `${9.5 * s}px` }}
                >
                  {c.up ? "↗" : "↘"} {c.delta}
                </span>
              </span>
              <span className="mt-1.5 block h-[6px] w-full overflow-hidden rounded-full bg-ctl-mist/8">
                <span
                  className="block h-full rounded-full bg-ctl-gold"
                  style={{ width: `${c.share}%`, opacity: 0.9, boxShadow: "0 0 12px -2px currentColor" }}
                />
              </span>
            </span>
            <span
              className="shrink-0 font-manrope font-bold text-ctl-mist/55"
              style={{ fontSize: `${11.5 * s}px` }}
            >
              {c.share}%
            </span>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-2 divide-x divide-ctl-mist/7 border-t border-ctl-mist/7 bg-ctl-obsidian/25 rtl:divide-x-reverse">
        <div className="px-3 py-3 text-center">
          <p className="font-manrope text-[15px] font-bold">48,300</p>
          <p className="mt-0.5 text-[9.5px] tracking-[0.1em] text-ctl-mist/40 uppercase">
            {p(AL.totalMembers)}
          </p>
        </div>
        <div className="px-3 py-3 text-center">
          <p className="font-manrope text-[15px] font-bold">{geoCountries.length}</p>
          <p className="mt-0.5 text-[9.5px] tracking-[0.1em] text-ctl-mist/40 uppercase">
            {p(AL.countries)}
          </p>
        </div>
      </div>
    </Panel>
  );
}
