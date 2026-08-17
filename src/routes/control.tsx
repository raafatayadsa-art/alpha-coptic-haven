import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Screen } from "@/components/layout/Screen";
import { SloganBand } from "@/components/layout/SloganBand";
import {
  AreaChart,
  Bars,
  Donut,
  GhostButton,
  Meter,
  Panel,
  PanelHead,
  Row,
  SectionTitle,
  Sparkline,
  StatusDot,
  Tag,
  toneBg,
  toneText,
  type Tone,
} from "@/components/control/ControlShell";
import { LaunchModule } from "@/components/control/LaunchModule";
import {
  BellGlyph,
  CheckGlyph,
  ChevronGlyph,
  GridGlyph,
  PowerGlyph,
  RocketGlyph,
  SearchGlyph,
  XGlyph,
  glyphByKey,
} from "@/components/control/control-icons";
import { useLang } from "@/lib/i18n";
import {
  L,
  activityFeed,
  adminTools,
  alerts,
  approvals,
  churchRows,
  communityStats,
  contentSections,
  donut,
  growthSeries,
  heroStats,
  kpis,
  mapPoints,
  mediaBuckets,
  moderationQueue,
  modules,
  perfBars,
  pick,
  quickActions,
  reports,
  retention,
  services,
  settingsRows,
  systemTools,
  userSegments,
  recentUsers,
  type ModuleKey,
} from "@/lib/control-data";

export const Route = createFileRoute("/control")({
  head: () => ({
    meta: [
      { title: "ألفا كنترول — مركز قيادة ألفا | Alpha Control" },
      {
        name: "description",
        content:
          "Alpha Control: platform health, users, churches, content, community, analytics, activity map, approvals, alerts, reports and emergency tooling in one command center.",
      },
      { property: "og:title", content: "ألفا كنترول — مركز قيادة ألفا | Alpha Control" },
      {
        property: "og:description",
        content: "The Alpha command center: telemetry, moderation, approvals and system tooling in one premium surface.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AlphaControl,
});

function AlphaControl() {
  const { lang, dir, isArabic } = useLang();
  const [active, setActive] = useState<ModuleKey>("overview");
  const [launcher, setLauncher] = useState(false);
  const p = (v: { ar: string; en: string }) => pick(v, lang);
  const current = modules.find((m) => m.key === active)!;

  return (
    <Screen className="ctl-page">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-1 ${isArabic ? "font-arabic" : "font-sans"}`}
      >
        {/* ── Command bar ───────────────────────────────── */}
        <header className="safe-top safe-sticky-top sticky z-40 bg-ctl-obsidian/85 px-4 pt-2 pb-2.5 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="relative grid size-10 shrink-0 place-items-center rounded-[15px] border border-ctl-gold/30 bg-ctl-gold/10 text-ctl-gold">
              <PowerGlyph className="size-[19px]" />
              <span aria-hidden="true" className="absolute inset-0 rounded-[15px] ring-1 ring-ctl-gold/15" />
            </span>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-[15px] font-bold tracking-tight">{p(L.appName)}</h1>
              <p className="mt-0.5 flex items-center gap-1.5 truncate text-[9.5px] text-ctl-mist/45">
                <span className="size-1.5 rounded-full bg-ctl-jade" />
                {p(L.liveNow)} · {p(L.tagline)}
              </p>
            </div>
            <IconBtn label={p(L.search)}>
              <SearchGlyph className="size-[18px]" />
            </IconBtn>
            <button
              type="button"
              onClick={() => setLauncher(true)}
              aria-label={p(L.allModules)}
              className="press grid size-10 shrink-0 place-items-center rounded-[15px] border border-ctl-mist/12 bg-ctl-mist/5 text-ctl-mist/70"
            >
              <GridGlyph className="size-[18px]" />
            </button>
          </div>

          {/* Module rail */}
          <nav
            aria-label={p(L.modules)}
            className="no-scrollbar -mx-4 mt-2.5 flex gap-1.5 overflow-x-auto px-4"
          >
            {modules.map((m) => {
              const on = m.key === active;
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setActive(m.key)}
                  className={`press inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold transition-colors duration-400 ${
                    on
                      ? "bg-ctl-gold/15 text-ctl-gold ring-1 ring-ctl-gold/35"
                      : "border border-ctl-mist/10 bg-ctl-mist/4 text-ctl-mist/55"
                  }`}
                >
                  {p(m.name)}
                  {m.badge && (
                    <span
                      className={`grid min-w-[16px] place-items-center rounded-full px-1 text-[8.5px] ${
                        on ? "bg-ctl-gold/25" : "bg-ctl-mist/10"
                      }`}
                    >
                      {m.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </header>

        <main key={active} className="ctl-rise px-4">
          {active !== "overview" && (
            <SectionTitle title={p(current.name)} caption={p(current.caption)} />
          )}

          {active === "overview" && <Overview p={p} onOpen={setActive} />}
          {active === "health" && <HealthModule p={p} />}
          {active === "users" && <UsersModule p={p} />}
          {active === "churches" && <ChurchesModule p={p} />}
          {active === "content" && <ContentModule p={p} />}
          {active === "community" && <CommunityModule p={p} />}
          {active === "analytics" && <AnalyticsModule p={p} />}
          {active === "activity" && <ActivityModule p={p} />}
          {active === "media" && <MediaModule p={p} />}
          {active === "approvals" && <ApprovalsModule p={p} />}
          {active === "alerts" && <AlertsModule p={p} />}
          {active === "reports" && <ReportsModule p={p} />}
          {active === "admin" && <AdminModule p={p} />}
          {active === "settings" && <SettingsModule p={p} />}
          {active === "system" && <SystemModule p={p} />}

          <LaunchTeaser p={p} />
          <SloganBand />
        </main>

        {launcher && (
          <Launcher
            p={p}
            onClose={() => setLauncher(false)}
            onPick={(k) => {
              setActive(k);
              setLauncher(false);
            }}
          />
        )}
      </div>
    </Screen>
  );
}

type P = (v: { ar: string; en: string }) => string;

const TONES: Tone[] = ["gold", "cyan", "jade", "amber", "crimson"];
const toneAt = (i: number): Tone => TONES[i % TONES.length] as Tone;
const mod = (key: ModuleKey) => modules.find((m) => m.key === key)!;
const GLYPHS: Record<ModuleKey, string> = {
  overview: "gauge",
  health: "pulse",
  users: "users",
  churches: "church",
  content: "content",
  community: "community",
  analytics: "chart",
  activity: "map",
  media: "media",
  approvals: "check",
  alerts: "bell",
  reports: "reports",
  admin: "shield",
  settings: "settings",
  system: "system",
  launch: "rocket",
};

function IconBtn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="press grid size-10 shrink-0 place-items-center rounded-[15px] border border-ctl-mist/12 bg-ctl-mist/5 text-ctl-mist/70"
    >
      {children}
    </button>
  );
}

/* ── Overview ─────────────────────────────────────────────── */

function Overview({ p, onOpen }: { p: P; onOpen: (k: ModuleKey) => void }) {
  return (
    <>
      {/* Command panel */}
      <Panel crest className="mt-3 overflow-hidden">
        <div className="flex items-center gap-4 px-4 pt-4">
          <UptimeRing pct={99.98} />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] tracking-[0.18em] text-ctl-gold/70 uppercase">{p(L.uptime)}</p>
            <h2 className="mt-1 truncate text-[17px] font-bold tracking-tight">{p(L.greeting)}</h2>
            <p className="mt-1 text-[10.5px] leading-relaxed text-ctl-mist/45">{p(L.tagline)}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 divide-x divide-ctl-mist/8 border-t border-ctl-mist/8 rtl:divide-x-reverse">
          {heroStats.map((s) => (
            <div key={s.label.en} className="px-3 py-3 text-center">
              <p className="font-manrope text-[15px] font-bold">{s.value}</p>
              <p className="mt-0.5 text-[9.5px] text-ctl-mist/40">{p(s.label)}</p>
            </div>
          ))}
        </div>
      </Panel>

      {/* KPI grid */}
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {kpis.map((k, i) => (
          <Panel key={k.label.en} className="p-3.5">
            <p className="truncate text-[10px] text-ctl-mist/45">{p(k.label)}</p>
            <p className="mt-1 font-manrope text-[19px] font-bold leading-none">{k.value}</p>
            <p className={`mt-1 text-[10px] font-semibold ${k.up ? "text-ctl-jade" : "text-ctl-crimson"}`}>
              {k.delta}
            </p>
            <div className="mt-1.5">
              <Sparkline data={k.spark} tone={toneAt(i)} />
            </div>
          </Panel>
        ))}
      </div>

      {/* Quick actions */}
      <SectionTitle title={p(L.quickActions)} />
      <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4">
        {quickActions.map((a) => {
          const G = glyphByKey[a.glyph] ?? BellGlyph;
          return (
            <button
              key={a.label.en}
              type="button"
              className="press ctl-card flex w-[104px] shrink-0 flex-col items-center gap-2 px-2 py-3.5 text-center"
            >
              <span className="grid size-9 place-items-center rounded-[13px] bg-ctl-gold/12 text-ctl-gold">
                <G className="size-[18px]" />
              </span>
              <span className="text-[10.5px] font-semibold leading-tight text-ctl-mist/75">{p(a.label)}</span>
            </button>
          );
        })}
      </div>

      {/* Live alerts strip */}
      <SectionTitle title={p(mod("alerts").name)} caption={p(mod("alerts").caption)} />
      <Panel className="overflow-hidden">
        {alerts.map((a) => (
          <Row
            key={a.title.en}
            health={a.health}
            title={p(a.title)}
            note={p(a.body)}
            value={p(a.time)}
          />
        ))}
      </Panel>

      {/* Activity */}
      <SectionTitle title={p(mod("activity").name)} caption={p(mod("activity").caption)} />
      <Panel className="overflow-hidden pb-1">
        <WorldRadar p={p} />
        <ul className="px-4 pt-1 pb-3">
          {activityFeed.map((f) => (
            <li key={f.text.en} className="flex items-start gap-2.5 py-2">
              <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${toneBg[f.tone]}`} />
              <span className="min-w-0 flex-1">
                <span className="block text-[11.5px] leading-snug">{p(f.text)}</span>
                <span className="mt-0.5 block text-[9.5px] text-ctl-mist/35">{p(f.time)}</span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>

      {/* Module map */}
      <SectionTitle title={p(L.allModules)} caption={p(L.modules)} />
      <div className="grid grid-cols-2 gap-2.5">
        {modules
          .filter((m) => m.key !== "overview")
          .map((m) => {
            const G = glyphByKey[GLYPHS[m.key]] ?? BellGlyph;
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => onOpen(m.key)}
                className="press ctl-card flex flex-col items-start gap-2 p-3.5 text-start"
              >
                <span className="flex w-full items-start justify-between gap-2">
                  <span className={`grid size-9 place-items-center rounded-[13px] bg-ctl-mist/6 ${toneText[m.tone]}`}>
                    <G className="size-[18px]" />
                  </span>
                  {m.badge && <Tag tone={m.tone}>{m.badge}</Tag>}
                </span>
                <span className="text-[12.5px] font-semibold leading-tight">{p(m.name)}</span>
                <span className="text-[9.5px] leading-snug text-ctl-mist/40">{p(m.caption)}</span>
              </button>
            );
          })}
      </div>
    </>
  );
}

function UptimeRing({ pct }: { pct: number }) {
  const r = 30;
  const c = 2 * Math.PI * r;
  const len = (pct / 100) * c;
  return (
    <span className="relative grid size-[78px] shrink-0 place-items-center">
      <svg viewBox="0 0 76 76" aria-hidden="true" className="size-[78px] -rotate-90">
        <circle cx="38" cy="38" r={r} fill="none" strokeWidth="5" className="stroke-ctl-mist/10" />
        <circle
          cx="38"
          cy="38"
          r={r}
          fill="none"
          strokeWidth="5"
          strokeLinecap="round"
          stroke="currentColor"
          className="text-ctl-gold"
          strokeDasharray={`${len} ${c - len}`}
        />
      </svg>
      <span className="absolute font-manrope text-[12.5px] font-bold text-ctl-gold">{pct}%</span>
    </span>
  );
}

function WorldRadar({ p }: { p: P }) {
  return (
    <div className="relative mx-4 mt-1 h-[176px] overflow-hidden rounded-[18px] border border-ctl-mist/8 bg-ctl-obsidian/60">
      <span aria-hidden="true" className="ctl-grid absolute inset-0 opacity-60" />
      <span
        aria-hidden="true"
        className="absolute start-1/2 top-1/2 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ctl-cyan/12"
      />
      <span
        aria-hidden="true"
        className="absolute start-1/2 top-1/2 size-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ctl-cyan/12"
      />
      <span
        aria-hidden="true"
        className="ctl-sweep absolute start-1/2 top-1/2 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, color-mix(in oklab, var(--ct-cyan) 22%, transparent), transparent 28%)",
        }}
      />
      {mapPoints.map((pt, i) => (
        <span
          key={pt.label.en}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
        >
          <span className="relative grid place-items-center">
            <span
              className="ctl-blip absolute size-4 rounded-full bg-ctl-gold/25"
              style={{ animationDelay: `${i * 320}ms` }}
            />
            <span className="size-1.5 rounded-full bg-ctl-gold" />
          </span>
          <span className="pointer-events-none mt-1 block -translate-x-1/2 whitespace-nowrap text-[8px] text-ctl-mist/45">
            {p(pt.label)} · {pt.value}
          </span>
        </span>
      ))}
    </div>
  );
}

/* ── Modules ──────────────────────────────────────────────── */

function HealthModule({ p }: { p: P }) {
  return (
    <>
      <Panel crest className="overflow-hidden">
        <PanelHead title={p({ ar: "الخدمات", en: "Services" })} caption={p(L.last24h)} action={<GhostButton>{p(L.export)}</GhostButton>} />
        {services.map((s) => (
          <Row key={s.name.en} health={s.health} title={p(s.name)} note={p(s.note)} value={s.value} />
        ))}
      </Panel>
      <Panel className="mt-2.5 overflow-hidden">
        <PanelHead title={p({ ar: "أداء البنية", en: "Infrastructure load" })} />
        <Bars data={perfBars.map((b) => ({ label: p(b.label), pct: b.pct }))} tone="cyan" />
      </Panel>
    </>
  );
}

function UsersModule({ p }: { p: P }) {
  return (
    <>
      <Panel crest className="p-4">
        <div className="space-y-3">
          {userSegments.map((s, i) => (
            <Meter
              key={s.label.en}
              label={p(s.label)}
              value={s.value}
              pct={s.pct}
              tone={toneAt(i)}
            />
          ))}
        </div>
      </Panel>
      <Panel className="mt-2.5 overflow-hidden">
        <PanelHead title={p({ ar: "أحدث الحسابات", en: "Latest accounts" })} action={<GhostButton>{p(L.manage)}</GhostButton>} />
        {recentUsers.map((u) => (
          <Row key={u.name.en} health={u.health} title={p(u.name)} note={p(u.role)} value={p(u.state)} />
        ))}
      </Panel>
    </>
  );
}

function ChurchesModule({ p }: { p: P }) {
  return (
    <Panel crest className="overflow-hidden">
      <PanelHead
        title={p({ ar: "سجل الكنائس", en: "Church registry" })}
        caption={p({ ar: "١٢٨٤ كنيسة · ٤٢ إيبارشية", en: "1,284 churches · 42 dioceses" })}
        action={<GhostButton>{p(L.manage)}</GhostButton>}
      />
      {churchRows.map((c) => (
        <Row key={c.name.en} health={c.health} title={p(c.name)} note={`${p(c.place)} · ${c.members}`} value={p(c.state)} />
      ))}
    </Panel>
  );
}

function ContentModule({ p }: { p: P }) {
  return (
    <Panel crest className="p-4">
      <div className="space-y-3">
        {contentSections.map((s, i) => (
          <Meter
            key={s.label.en}
            label={p(s.label)}
            value={s.items}
            pct={s.pct}
            tone={toneAt(i)}
          />
        ))}
      </div>
    </Panel>
  );
}

function CommunityModule({ p }: { p: P }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2.5">
        {communityStats.map((s) => (
          <Panel key={s.label.en} className="p-3.5">
            <p className="text-[10px] text-ctl-mist/45">{p(s.label)}</p>
            <p className="mt-1 font-manrope text-[18px] font-bold">{s.value}</p>
          </Panel>
        ))}
      </div>
      <Panel className="mt-2.5 overflow-hidden">
        <PanelHead title={p({ ar: "طابور الإشراف", en: "Moderation queue" })} action={<GhostButton>{p(L.review)}</GhostButton>} />
        {moderationQueue.map((m) => (
          <Row key={m.text.en} health={m.health} title={p(m.text)} note={p(m.kind)} />
        ))}
      </Panel>
    </>
  );
}

function AnalyticsModule({ p }: { p: P }) {
  return (
    <>
      <Panel crest className="overflow-hidden pb-2">
        <PanelHead title={p({ ar: "منحنى النمو", en: "Growth curve" })} caption={p(L.last30d)} />
        <div className="px-3">
          <AreaChart data={growthSeries} tone="cyan" />
        </div>
      </Panel>
      <Panel className="mt-2.5 overflow-hidden">
        <PanelHead title={p({ ar: "توزيع التفاعل", en: "Engagement split" })} />
        <Donut slices={donut.map((d) => ({ label: p(d.label), pct: d.pct, tone: d.tone as Tone }))} />
      </Panel>
      <Panel className="mt-2.5 overflow-hidden">
        <PanelHead title={p({ ar: "الاحتفاظ بالمستخدمين", en: "Retention" })} />
        <Bars data={retention.map((r) => ({ label: p(r.label), pct: r.pct }))} tone="gold" />
      </Panel>
    </>
  );
}

function ActivityModule({ p }: { p: P }) {
  return (
    <>
      <Panel crest className="overflow-hidden pb-3">
        <PanelHead title={p({ ar: "الحضور الحيّ", en: "Live presence" })} caption={p(L.liveNow)} />
        <WorldRadar p={p} />
      </Panel>
      <Panel className="mt-2.5 overflow-hidden">
        <PanelHead title={p({ ar: "سجل النشاط", en: "Activity log" })} />
        {activityFeed.map((f) => (
          <Row key={f.text.en} title={p(f.text)} note={p(f.time)} />
        ))}
      </Panel>
    </>
  );
}

function MediaModule({ p }: { p: P }) {
  return (
    <>
      <Panel crest className="p-4">
        <div className="space-y-3">
          {mediaBuckets.map((m, i) => (
            <Meter
              key={m.label.en}
              label={p(m.label)}
              value={p(m.size)}
              pct={m.pct}
              tone={toneAt(i)}
            />
          ))}
        </div>
      </Panel>
      <Panel className="mt-2.5 overflow-hidden">
        <PanelHead
          title={p({ ar: "مكتبة الوسائط", en: "Media library" })}
          caption={p({ ar: "١٤٥٠ غيغا مستخدمة من ٢ تيرا", en: "1,450 GB of 2 TB used" })}
          action={<GhostButton>{p(L.manage)}</GhostButton>}
        />
        <div className="grid grid-cols-3 gap-2 px-4 pb-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="ctl-grid aspect-square rounded-[14px] border border-ctl-mist/8 bg-ctl-mist/4"
            />
          ))}
        </div>
      </Panel>
    </>
  );
}

function ApprovalsModule({ p }: { p: P }) {
  return (
    <Panel crest className="overflow-hidden">
      <PanelHead title={p(L.pending)} caption={`12 · ${p(L.last7d)}`} />
      {approvals.map((a) => (
        <div key={a.title.en} className="border-t border-ctl-mist/7 px-4 py-3 first:border-t-0">
          <div className="flex items-center gap-2">
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] font-semibold">{p(a.title)}</span>
              <span className="mt-0.5 block truncate text-[10px] text-ctl-mist/40">
                {p(a.from)} · {p(a.kind)}
              </span>
            </span>
            <button
              type="button"
              aria-label={p(L.approve)}
              className="press grid size-8 place-items-center rounded-[12px] bg-ctl-jade/15 text-ctl-jade"
            >
              <CheckGlyph className="size-4" />
            </button>
            <button
              type="button"
              aria-label={p(L.reject)}
              className="press grid size-8 place-items-center rounded-[12px] bg-ctl-crimson/15 text-ctl-crimson"
            >
              <XGlyph className="size-4" />
            </button>
          </div>
        </div>
      ))}
    </Panel>
  );
}

function AlertsModule({ p }: { p: P }) {
  return (
    <Panel crest className="overflow-hidden">
      <PanelHead title={p(mod("alerts").name)} action={<GhostButton>{p(L.viewAll)}</GhostButton>} />
      {alerts.map((a) => (
        <Row key={a.title.en} health={a.health} title={p(a.title)} note={p(a.body)} value={p(a.time)} />
      ))}
    </Panel>
  );
}

function ReportsModule({ p }: { p: P }) {
  return (
    <Panel crest className="overflow-hidden">
      <PanelHead title={p(mod("reports").name)} caption={p(L.last30d)} />
      {reports.map((r) => (
        <Row
          key={r.title.en}
          title={p(r.title)}
          note={p(r.note)}
          trailing={
            <span className="press grid size-8 shrink-0 place-items-center rounded-[12px] bg-ctl-mist/6 text-ctl-mist/55">
              <ChevronGlyph className="size-4 rtl:rotate-180" />
            </span>
          }
        />
      ))}
    </Panel>
  );
}

function AdminModule({ p }: { p: P }) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {adminTools.map((t) => {
        const G = glyphByKey[t.glyph] ?? BellGlyph;
        return (
          <button key={t.label.en} type="button" className="press ctl-card flex flex-col items-start gap-2 p-3.5 text-start">
            <span className="grid size-9 place-items-center rounded-[13px] bg-ctl-gold/12 text-ctl-gold">
              <G className="size-[18px]" />
            </span>
            <span className="text-[12.5px] font-semibold leading-tight">{p(t.label)}</span>
            <span className="text-[9.5px] text-ctl-mist/40">{p(t.note)}</span>
          </button>
        );
      })}
    </div>
  );
}

function SettingsModule({ p }: { p: P }) {
  return (
    <Panel crest className="overflow-hidden">
      <PanelHead title={p(mod("settings").name)} caption={p(mod("settings").caption)} />
      {settingsRows.map((s) => (
        <Row
          key={s.label.en}
          title={p(s.label)}
          note={p(s.value)}
          trailing={
            s.on === undefined ? (
              <ChevronGlyph className="size-4 shrink-0 text-ctl-mist/35 rtl:rotate-180" />
            ) : (
              <span
                className={`relative h-5 w-9 shrink-0 rounded-full ${s.on ? "bg-ctl-jade/70" : "bg-ctl-mist/12"}`}
              >
                <span
                  className={`absolute top-0.5 size-4 rounded-full bg-ctl-mist transition-all duration-500 ${
                    s.on ? "start-4.5" : "start-0.5"
                  }`}
                />
              </span>
            )
          }
        />
      ))}
    </Panel>
  );
}

function SystemModule({ p }: { p: P }) {
  return (
    <>
      <Panel crest className="p-4">
        <div className="flex items-center gap-3">
          <StatusDot health="warn" />
          <p className="text-[11.5px] leading-relaxed text-ctl-mist/60">
            {p({
              ar: "هذه الأدوات تؤثر على كل مستخدمي ألفا. استخدمها بحرص.",
              en: "These tools affect every Alpha user. Use with care.",
            })}
          </p>
        </div>
      </Panel>
      <div className="mt-2.5 space-y-2.5">
        {systemTools.map((t) => (
          <button
            key={t.label.en}
            type="button"
            className={`press ctl-card flex w-full items-center gap-3 p-3.5 text-start ${
              t.danger ? "ring-1 ring-ctl-crimson/25" : ""
            }`}
          >
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-[13px] ${
                t.danger ? "bg-ctl-crimson/15 text-ctl-crimson" : "bg-ctl-mist/6 text-ctl-cyan"
              }`}
            >
              <PowerGlyph className="size-[18px]" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[12.5px] font-semibold">{p(t.label)}</span>
              <span className="mt-0.5 block truncate text-[10px] text-ctl-mist/40">{p(t.note)}</span>
            </span>
            <ChevronGlyph className="size-4 shrink-0 text-ctl-mist/35 rtl:rotate-180" />
          </button>
        ))}
      </div>
    </>
  );
}

/* ── Launch Control teaser (module added later) ───────────── */

function LaunchTeaser({ p }: { p: P }) {
  return (
    <Panel className="mt-6 flex items-center gap-3 p-4 opacity-70">
      <span className="grid size-10 shrink-0 place-items-center rounded-[14px] border border-ctl-gold/25 bg-ctl-gold/8 text-ctl-gold">
        <RocketGlyph className="size-[19px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="truncate text-[12.5px] font-semibold">{p(L.launchControl)}</span>
          <Tag tone="gold">{p(L.soon)}</Tag>
        </span>
        <span className="mt-0.5 block truncate text-[10px] text-ctl-mist/40">{p(L.launchNote)}</span>
      </span>
    </Panel>
  );
}

/* ── Module launcher sheet ────────────────────────────────── */

function Launcher({
  p,
  onClose,
  onPick,
}: {
  p: P;
  onClose: () => void;
  onPick: (k: ModuleKey) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="ctl-rise safe-bottom relative mx-auto w-full max-w-[430px] rounded-t-[28px] border-t border-ctl-mist/12 bg-ctl-slate/95 px-4 pt-3 pb-5 backdrop-blur-xl">
        <span aria-hidden="true" className="mx-auto mb-3 block h-1 w-10 rounded-full bg-ctl-mist/20" />
        <h2 className="px-1 text-[13.5px] font-bold">{p(L.allModules)}</h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {modules.map((m) => (
            <button
              key={m.key}
              type="button"
              onClick={() => onPick(m.key)}
              className="press ctl-card flex flex-col items-center gap-1.5 px-2 py-3 text-center"
            >
              <span className={`size-2 rounded-full ${toneBg[m.tone]}`} />
              <span className="text-[10.5px] font-semibold leading-tight">{p(m.name)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
