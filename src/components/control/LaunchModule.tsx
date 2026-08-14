/**
 * Alpha Control — Launch module ("Obsidian Command").
 * Presentation-only prototype: local UI state, no backend, no persistence.
 */
import { useState, type ReactNode } from "react";

import {
  GhostButton,
  Panel,
  PanelHead,
  Row,
  StatusDot,
  Tag,
  toneBg,
  toneText,
  type Tone,
} from "@/components/control/ControlShell";
import {
  CheckGlyph,
  ChevronGlyph,
  PowerGlyph,
  RocketGlyph,
  ShieldGlyph,
  ToggleGlyph,
  XGlyph,
} from "@/components/control/control-icons";
import {
  LL,
  deployLog,
  emergencyKills,
  featureFlags,
  governanceRows,
  moduleReleases,
  prodHealth,
  release,
  releaseChecklist,
  rolloutAudiences,
  stageLabel,
  stageNote,
  trafficSteps,
  type Bi,
  type ReleaseStage,
} from "@/lib/control-data";

type P = (v: Bi) => string;

const stageTone: Record<ReleaseStage, Tone> = {
  production: "jade",
  gradual: "cyan",
  beta: "amber",
  internal: "gold",
  hidden: "crimson",
};

export function LaunchModule({ p }: { p: P }) {
  const [confirm, setConfirm] = useState<string | null>(null);
  const ask = (label: string) => setConfirm(label);

  return (
    <>
      <LaunchHero p={p} ask={ask} />

      <Numbered n="02" title={p(LL.s02)} caption={p(LL.s02c)} p={p} />
      <ModuleReleases p={p} ask={ask} />

      <Numbered n="03" title={p(LL.s03)} caption={p(LL.s03c)} p={p} />
      <Rollout p={p} ask={ask} />

      <Numbered n="04" title={p(LL.s04)} caption={p(LL.s04c)} p={p} />
      <PilotMode p={p} ask={ask} />

      <Numbered n="05" title={p(LL.s05)} caption={p(LL.s05c)} p={p} />
      <FeatureFlags p={p} />

      <Numbered n="06" title={p(LL.s06)} caption={p(LL.s06c)} p={p} />
      <Emergency p={p} ask={ask} />

      <Numbered n="07" title={p(LL.s07)} caption={p(LL.readyCount)} p={p} />
      <Checklist p={p} />

      <Numbered n="08" title={p(LL.s08)} caption={p(LL.s08c)} p={p} />
      <ProdHealth p={p} />

      <Numbered n="09" title={p(LL.s09)} caption={p(LL.s09c)} p={p} />
      <DeployLog p={p} ask={ask} />

      <Numbered n="10" title={p(LL.s10)} caption={p(LL.s10c)} p={p} />
      <Governance p={p} />

      {confirm && <ConfirmSheet p={p} label={confirm} onClose={() => setConfirm(null)} />}
    </>
  );
}

/* ── Section header with a numbered rubric ─────────────────── */

function Numbered({
  n,
  title,
  caption,
  p,
}: {
  n: string;
  title: string;
  caption?: string;
  p: P;
}) {
  return (
    <div className="mt-7 mb-3 px-1">
      <span className="font-manrope text-[9.5px] tracking-[0.28em] text-ctl-gold/60">
        {p(LL.section)} {n}
      </span>
      <h2 className="mt-1 text-[15px] font-bold tracking-tight">{title}</h2>
      {caption && <p className="mt-0.5 text-[10px] leading-snug text-ctl-mist/40">{caption}</p>}
    </div>
  );
}

function ActionPill({
  children,
  onClick,
  tone,
}: {
  children: ReactNode;
  onClick: () => void;
  tone?: "gold" | "crimson";
}) {
  const skin =
    tone === "gold"
      ? "border-ctl-gold/35 bg-ctl-gold/12 text-ctl-gold"
      : tone === "crimson"
        ? "border-ctl-crimson/35 bg-ctl-crimson/10 text-ctl-crimson"
        : "border-ctl-mist/12 bg-ctl-mist/5 text-ctl-mist/70";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`press inline-flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-[10.5px] font-semibold ${skin}`}
    >
      {children}
    </button>
  );
}

/* ── 01 · Launch status ────────────────────────────────────── */

function LaunchHero({ p, ask }: { p: P; ask: (l: string) => void }) {
  return (
    <>
      <Numbered n="01" title={p(LL.s01)} p={p} />
      <Panel crest className="overflow-hidden p-0">
        <div className="px-4 pt-4 pb-3.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ctl-gold/30 bg-ctl-gold/10 px-2.5 py-1 text-[9.5px] font-semibold text-ctl-gold">
            <RocketGlyph className="size-3.5" />
            {p(LL.s01)}
          </span>
          <h3 className="mt-3 text-[19px] font-bold leading-snug tracking-tight">{p(LL.headline)}</h3>
          <p className="mt-2 text-[11px] leading-relaxed text-ctl-mist/45">{p(LL.subline)}</p>

          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <ActionPill tone="gold" onClick={() => ask(p(LL.deploy))}>
              <RocketGlyph className="size-3.5" />
              {p(LL.deploy)}
            </ActionPill>
            <ActionPill onClick={() => ask(p(LL.promote))}>{p(LL.promote)}</ActionPill>
            <ActionPill tone="crimson" onClick={() => ask(p(LL.rollback))}>
              {p(LL.rollback)}
            </ActionPill>
          </div>
        </div>

        <div className="grid grid-cols-2 border-t border-ctl-mist/7">
          <MetaCell label={p(LL.currentVersion)} value={release.version} note={p(LL.semver)} />
          <MetaCell
            label={p(LL.buildNo)}
            value={release.build}
            note={p(LL.signed)}
            border
          />
          <MetaCell
            label={p(LL.production)}
            value={p(LL.live)}
            note={p(LL.regions)}
            tone="jade"
            top
          />
          <MetaCell
            label={p(LL.staging)}
            value={p(LL.ok2)}
            note={p(LL.testsPass)}
            tone="cyan"
            border
            top
          />
        </div>

        <div className="border-t border-ctl-mist/7 px-4 py-3.5">
          <div className="flex items-end justify-between gap-2">
            <span className="text-[10px] text-ctl-mist/45">{p(LL.launchProgress)}</span>
            <span className="font-manrope text-[15px] font-bold text-ctl-gold">
              {release.progress}%
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ctl-mist/8">
            <span
              className="block h-full rounded-full bg-ctl-gold"
              style={{ width: `${release.progress}%`, opacity: 0.85 }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[9.5px] text-ctl-mist/40">
            <span>{p(LL.readyCount)}</span>
            <span>{p(LL.rolloutPct)}</span>
          </div>
        </div>
      </Panel>
    </>
  );
}

function MetaCell({
  label,
  value,
  note,
  tone = "gold",
  border,
  top,
}: {
  label: string;
  value: string;
  note: string;
  tone?: Tone;
  border?: boolean;
  top?: boolean;
}) {
  return (
    <div
      className={`px-4 py-3 ${border ? "border-s border-ctl-mist/7" : ""} ${top ? "border-t border-ctl-mist/7" : ""}`}
    >
      <span className="block text-[9.5px] text-ctl-mist/40">{label}</span>
      <span className={`mt-1 block font-manrope text-[15px] font-bold ${toneText[tone]}`}>
        {value}
      </span>
      <span className="mt-0.5 block truncate text-[9.5px] text-ctl-mist/35">{note}</span>
    </div>
  );
}

/* ── 02 · Module release center ────────────────────────────── */

function ModuleReleases({ p, ask }: { p: P; ask: (l: string) => void }) {
  const [off, setOff] = useState<Record<string, boolean>>({ "media library": true });

  return (
    <Panel className="p-0">
      <PanelHead
        title={p(LL.s02)}
        caption={p(LL.modulesCount)}
        action={<GhostButton>{p(LL.s02)}</GhostButton>}
      />
      <div>
        {moduleReleases.map((m) => {
          const id = m.name.en.toLowerCase();
          const disabled = !!off[id];
          return (
            <div key={id} className="border-t border-ctl-mist/7 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className={`size-2 shrink-0 rounded-full ${toneBg[stageTone[m.stage]]}`} />
                <span className="min-w-0 flex-1 truncate text-[12.5px] font-semibold">
                  {p(m.name)}
                </span>
                <Tag tone={disabled ? "crimson" : stageTone[m.stage]}>
                  {disabled ? p(stageLabel.hidden) : p(stageLabel[m.stage])}
                </Tag>
              </div>
              <p className="mt-1 text-[10px] text-ctl-mist/40">
                {disabled ? p(stageNote.hidden) : p(stageNote[m.stage])}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <ActionPill onClick={() => setOff((s) => ({ ...s, [id]: !disabled }))}>
                  <ToggleGlyph className="size-3.5" />
                  {disabled ? p(LL.enable) : p(LL.disable)}
                </ActionPill>
                <ActionPill tone="gold" onClick={() => ask(`${p(LL.publish)} — ${p(m.name)}`)}>
                  {p(LL.publish)}
                </ActionPill>
                <ActionPill tone="crimson" onClick={() => ask(`${p(LL.rollback)} — ${p(m.name)}`)}>
                  {p(LL.rollback)}
                </ActionPill>
              </div>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

/* ── 03 · Gradual rollout ──────────────────────────────────── */

function Rollout({ p, ask }: { p: P; ask: (l: string) => void }) {
  const [mod, setMod] = useState(1);
  const [aud, setAud] = useState(3);
  const [pct, setPct] = useState(3);

  return (
    <Panel className="p-0">
      <PanelHead title={p(LL.selectedModule)} caption={p(moduleReleases[mod]!.name)} />
      <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-4 pb-3">
        {moduleReleases.map((m, i) => (
          <button
            key={m.name.en}
            type="button"
            onClick={() => setMod(i)}
            className={`press shrink-0 rounded-full px-3 py-1.5 text-[10.5px] font-semibold ${
              i === mod
                ? "bg-ctl-gold/15 text-ctl-gold ring-1 ring-ctl-gold/35"
                : "border border-ctl-mist/10 bg-ctl-mist/4 text-ctl-mist/55"
            }`}
          >
            {p(m.name)}
          </button>
        ))}
      </div>

      <div className="border-t border-ctl-mist/7 px-4 py-3.5">
        <span className="block text-[9.5px] text-ctl-mist/40">{p(LL.releaseTo)}</span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {rolloutAudiences.map((a, i) => (
            <button
              key={a.en}
              type="button"
              onClick={() => setAud(i)}
              className={`press rounded-full px-3 py-1.5 text-[10.5px] font-semibold ${
                i === aud
                  ? "bg-ctl-cyan/15 text-ctl-cyan ring-1 ring-ctl-cyan/35"
                  : "border border-ctl-mist/10 bg-ctl-mist/4 text-ctl-mist/55"
              }`}
            >
              {p(a)}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-ctl-mist/7 px-4 py-3.5">
        <div className="flex items-end justify-between gap-2">
          <span className="text-[9.5px] text-ctl-mist/40">{p(LL.trafficShare)}</span>
          <span className="font-manrope text-[17px] font-bold text-ctl-gold">
            {trafficSteps[pct]}%
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ctl-mist/8">
          <span
            className="block h-full rounded-full bg-ctl-gold"
            style={{ width: `${trafficSteps[pct]}%`, opacity: 0.85 }}
          />
        </div>
        <div className="mt-2.5 flex gap-1.5">
          {trafficSteps.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => setPct(i)}
              className={`press flex-1 rounded-[10px] py-1.5 text-[9.5px] font-semibold ${
                i === pct
                  ? "bg-ctl-gold/15 text-ctl-gold ring-1 ring-ctl-gold/30"
                  : "border border-ctl-mist/10 bg-ctl-mist/4 text-ctl-mist/50"
              }`}
            >
              {s}%
            </button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <ActionPill tone="gold" onClick={() => ask(p(LL.applyRollout))}>
            {p(LL.applyRollout)}
          </ActionPill>
          <ActionPill onClick={() => ask(p(LL.previewSlice))}>{p(LL.previewSlice)}</ActionPill>
        </div>
      </div>
    </Panel>
  );
}

/* ── 04 · Pilot mode ───────────────────────────────────────── */

function PilotMode({ p, ask }: { p: P; ask: (l: string) => void }) {
  const [on, setOn] = useState(false);

  return (
    <Panel className="p-0">
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span className="min-w-0 flex-1">
          <span className="block text-[12.5px] font-semibold">{p(LL.pilotEnv)}</span>
          <span className="mt-0.5 block text-[10px] text-ctl-mist/40">{p(LL.isolated)}</span>
        </span>
        <button
          type="button"
          onClick={() => setOn(!on)}
          aria-pressed={on}
          className={`press relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
            on ? "bg-ctl-jade/60" : "bg-ctl-mist/12"
          }`}
        >
          <span
            className={`absolute top-0.5 size-5 rounded-full bg-ctl-mist transition-all duration-300 ${
              on ? "start-[22px]" : "start-0.5"
            }`}
          />
        </button>
        <Tag tone={on ? "jade" : "crimson"}>{on ? p(LL.on) : p(LL.off)}</Tag>
      </div>

      <Row title={p(LL.targetChurch)} value="St. Mary — Shubra" />
      <Row title={p(LL.userCount)} value="250" />
      <Row title={p(LL.endDate)} value="2026-09-30" />

      <div className="flex gap-2 border-t border-ctl-mist/7 px-4 py-3">
        <ActionPill tone="gold" onClick={() => ask(p(LL.seedData))}>
          {p(LL.seedData)}
        </ActionPill>
        <ActionPill onClick={() => ask(p(LL.reset))}>{p(LL.reset)}</ActionPill>
      </div>
    </Panel>
  );
}

/* ── 05 · Feature flags ────────────────────────────────────── */

function FeatureFlags({ p }: { p: P }) {
  const [state, setState] = useState(() => featureFlags.map((f) => f.pct));

  return (
    <Panel className="p-0">
      {featureFlags.map((f, i) => {
        const pct = state[i]!;
        return (
          <div key={f.dep + f.name.en} className="border-t border-ctl-mist/7 px-4 py-3 first:border-t-0">
            <div className="flex items-center gap-2">
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12.5px] font-semibold">{p(f.name)}</span>
                <span className="mt-0.5 block text-[9.5px] text-ctl-mist/40">
                  {p(LL.dependsOn)} <span className="font-manrope text-ctl-cyan/70">{f.dep}</span>
                </span>
              </span>
              <Tag tone={pct === 0 ? "crimson" : pct === 100 ? "jade" : "amber"}>
                {p(LL.rollout)} {pct}%
              </Tag>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-ctl-mist/8">
              <span
                className="block h-full rounded-full bg-ctl-cyan transition-all duration-500"
                style={{ width: `${pct}%`, opacity: 0.8 }}
              />
            </div>
            <div className="mt-2 flex gap-1.5">
              {trafficSteps.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setState((prev) => prev.map((v, j) => (j === i ? s : v)))}
                  className={`press flex-1 rounded-[9px] py-1 text-[9px] font-semibold ${
                    s === pct
                      ? "bg-ctl-cyan/15 text-ctl-cyan ring-1 ring-ctl-cyan/30"
                      : "border border-ctl-mist/10 bg-ctl-mist/4 text-ctl-mist/45"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </Panel>
  );
}

/* ── 06 · Emergency center ─────────────────────────────────── */

function Emergency({ p, ask }: { p: P; ask: (l: string) => void }) {
  return (
    <>
      <Panel className="border-ctl-crimson/20 p-0">
        <PanelHead
          title={p(LL.s06)}
          caption={p(LL.s06c)}
          action={<Tag tone="crimson">{p(LL.armed)}</Tag>}
        />
        <div className="grid grid-cols-2 gap-2 px-4 pb-3.5">
          {emergencyKills.map((k) => (
            <button
              key={k.en}
              type="button"
              onClick={() => ask(p(k))}
              className="press flex flex-col items-start gap-1.5 rounded-[16px] border border-ctl-crimson/20 bg-ctl-crimson/6 px-3 py-2.5 text-start"
            >
              <PowerGlyph className="size-4 text-ctl-crimson" />
              <span className="text-[11px] font-semibold leading-tight">{p(k)}</span>
              <span className="text-[9px] text-ctl-mist/40">{p(LL.standby)}</span>
            </button>
          ))}
        </div>
      </Panel>

      <Panel className="mt-2.5 border-ctl-crimson/25 p-4">
        <div className="flex items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-[13px] bg-ctl-crimson/12 text-ctl-crimson">
            <ChevronGlyph className="size-4 rotate-180 rtl:rotate-0" />
          </span>
          <span className="min-w-0 flex-1 text-[12.5px] font-semibold">{p(LL.oneTapRollback)}</span>
        </div>
        <p className="mt-2 text-[10px] leading-relaxed text-ctl-mist/45">{p(LL.oneTapNote)}</p>
        <div className="mt-3">
          <ActionPill tone="crimson" onClick={() => ask(p(LL.runRollback))}>
            {p(LL.runRollback)}
          </ActionPill>
        </div>
      </Panel>
    </>
  );
}

/* ── 07 · Release checklist ────────────────────────────────── */

function Checklist({ p }: { p: P }) {
  return (
    <Panel className="p-0">
      {releaseChecklist.map((c) => (
        <div
          key={c.label.en}
          className="flex items-center gap-3 border-t border-ctl-mist/7 px-4 py-2.5 first:border-t-0"
        >
          <span
            className={`grid size-6 shrink-0 place-items-center rounded-[9px] ${
              c.done ? "bg-ctl-jade/15 text-ctl-jade" : "bg-ctl-amber/12 text-ctl-amber"
            }`}
          >
            {c.done ? <CheckGlyph className="size-3.5" /> : <XGlyph className="size-3" />}
          </span>
          <span className="min-w-0 flex-1 truncate text-[12px] font-semibold">{p(c.label)}</span>
          <Tag tone={c.done ? "jade" : "amber"}>{c.done ? p(LL.ready) : p(LL.waiting)}</Tag>
        </div>
      ))}
    </Panel>
  );
}

/* ── 08 · Production health ────────────────────────────────── */

function ProdHealth({ p }: { p: P }) {
  return (
    <Panel className="p-0">
      <PanelHead title={p(LL.s08)} caption={p(LL.oneWarn)} />
      {prodHealth.map((h) => (
        <Row
          key={h.name.en}
          title={p(h.name)}
          note={p(h.note)}
          value={h.value}
          health={h.health}
          trailing={<StatusDot health={h.health} />}
        />
      ))}
    </Panel>
  );
}

/* ── 09 · Deploy log ───────────────────────────────────────── */

function DeployLog({ p, ask }: { p: P; ask: (l: string) => void }) {
  return (
    <Panel className="p-0">
      <PanelHead title={p(LL.s09)} caption={p(LL.fullLog)} action={<GhostButton>{p(LL.fullLog)}</GhostButton>} />
      {deployLog.map((d) => (
        <div key={d.build} className="border-t border-ctl-mist/7 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="font-manrope text-[12.5px] font-bold text-ctl-gold">v{d.version}</span>
            <span className="font-manrope text-[10px] text-ctl-mist/40">· {d.build}</span>
            {d.current && <Tag tone="jade">{p(LL.currentTag)}</Tag>}
            <span className="flex-1" />
            {!d.current && (
              <ActionPill tone="crimson" onClick={() => ask(`${p(LL.rollback)} — v${d.version}`)}>
                {p(LL.rollback)}
              </ActionPill>
            )}
          </div>
          <p className="mt-1.5 text-[11px] text-ctl-mist/55">{p(d.note)}</p>
          <p className="mt-1 font-manrope text-[9.5px] text-ctl-mist/35">
            {d.date} · {d.time} · {p(LL.by)} {p(d.actor)}
          </p>
        </div>
      ))}
    </Panel>
  );
}

/* ── 10 · Security & governance ────────────────────────────── */

function Governance({ p }: { p: P }) {
  return (
    <>
      <Panel className="p-0">
        {governanceRows.map((g) => (
          <div
            key={g.label.en}
            className="flex items-center gap-3 border-t border-ctl-mist/7 px-4 py-3 first:border-t-0"
          >
            <span className="grid size-9 shrink-0 place-items-center rounded-[13px] bg-ctl-gold/10 text-ctl-gold">
              <ShieldGlyph className="size-[17px]" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] font-semibold">{p(g.label)}</span>
              <span className="mt-0.5 block truncate text-[9.5px] text-ctl-mist/40">{p(g.note)}</span>
            </span>
            <span className="shrink-0 font-manrope text-[10.5px] text-ctl-mist/55">{p(g.value)}</span>
          </div>
        ))}
      </Panel>

      <Panel className="mt-2.5 flex items-center gap-3 p-4">
        <span className="min-w-0 flex-1">
          <span className="block text-[12.5px] font-semibold">{p(LL.everyActionConfirm)}</span>
          <span className="mt-0.5 block text-[10px] leading-snug text-ctl-mist/40">
            {p(LL.everyActionNote)}
          </span>
        </span>
        <Tag tone="jade">{p(LL.on)}</Tag>
      </Panel>
    </>
  );
}

/* ── Confirmation sheet ────────────────────────────────────── */

function ConfirmSheet({ p, label, onClose }: { p: P; label: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label={p(LL.cancel)}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="ctl-rise safe-bottom relative mx-auto w-full max-w-[430px] rounded-t-[28px] border-t border-ctl-gold/20 bg-ctl-slate/95 px-4 pt-3 pb-5 backdrop-blur-xl">
        <span aria-hidden="true" className="mx-auto mb-3 block h-1 w-10 rounded-full bg-ctl-mist/20" />
        <h2 className="text-[14px] font-bold">{p(LL.confirmTitle)}</h2>
        <p className="mt-1.5 text-[11px] leading-relaxed text-ctl-mist/50">{p(LL.confirmBody)}</p>
        <p className="mt-3 rounded-[14px] border border-ctl-gold/20 bg-ctl-gold/8 px-3 py-2.5 text-[11.5px] font-semibold text-ctl-gold">
          {label}
        </p>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="press flex-1 rounded-full bg-ctl-gold/15 py-2.5 text-[12px] font-semibold text-ctl-gold ring-1 ring-ctl-gold/35"
          >
            {p(LL.confirm)}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="press flex-1 rounded-full border border-ctl-mist/12 bg-ctl-mist/5 py-2.5 text-[12px] font-semibold text-ctl-mist/60"
          >
            {p(LL.cancel)}
          </button>
        </div>
      </div>
    </div>
  );
}
