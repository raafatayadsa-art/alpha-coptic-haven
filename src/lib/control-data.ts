/**
 * Alpha Control — presentation-only content for the "Obsidian Command"
 * prototype. Bilingual strings live here so the screen stays purely visual.
 * No logic, no fetching, no persistence, no backend.
 */

export type Bi = { ar: string; en: string };
export type Lang = "ar" | "en";

export const pick = (v: Bi, lang: Lang) => (lang === "ar" ? v.ar : v.en);

export type Health = "ok" | "warn" | "down";

export const L = {
  appName: { ar: "ألفا كنترول", en: "Alpha Control" },
  tagline: { ar: "مركز قيادة ألفا", en: "Alpha command center" },
  greeting: { ar: "مساء الخير، الأب المسؤول", en: "Good evening, administrator" },
  liveNow: { ar: "مباشر الآن", en: "Live now" },
  search: { ar: "بحث في كل الوحدات", en: "Search every module" },
  modules: { ar: "الوحدات", en: "Modules" },
  allModules: { ar: "كل الوحدات", en: "All modules" },
  quickActions: { ar: "إجراءات سريعة", en: "Quick actions" },
  viewAll: { ar: "الكل", en: "All" },
  open: { ar: "فتح", en: "Open" },
  manage: { ar: "إدارة", en: "Manage" },
  review: { ar: "مراجعة", en: "Review" },
  approve: { ar: "اعتماد", en: "Approve" },
  reject: { ar: "رفض", en: "Reject" },
  export: { ar: "تصدير", en: "Export" },
  last24h: { ar: "آخر ٢٤ ساعة", en: "Last 24h" },
  last7d: { ar: "آخر ٧ أيام", en: "Last 7 days" },
  last30d: { ar: "آخر ٣٠ يومًا", en: "Last 30 days" },
  uptime: { ar: "جهوزية النظام", en: "System uptime" },
  soon: { ar: "قادم قريبًا", en: "Coming soon" },
  launchControl: { ar: "لوحة الإطلاق", en: "Launch Control" },
  launchNote: {
    ar: "وحدة مستقلة تُضاف لاحقًا داخل ألفا كنترول",
    en: "A standalone module, added to Alpha Control later",
  },
  pending: { ar: "في الانتظار", en: "Pending" },
  status: { ar: "الحالة", en: "Status" },
  ok: { ar: "سليم", en: "Operational" },
  warn: { ar: "تحت المراقبة", en: "Degraded" },
  down: { ar: "متوقف", en: "Down" },
};

/* ── Module map ──────────────────────────────────────────── */

export type ModuleKey =
  | "overview"
  | "health"
  | "users"
  | "churches"
  | "content"
  | "community"
  | "analytics"
  | "activity"
  | "media"
  | "approvals"
  | "alerts"
  | "reports"
  | "admin"
  | "settings"
  | "system"
  | "launch";

export const modules: {
  key: ModuleKey;
  name: Bi;
  caption: Bi;
  badge?: string;
  tone: "gold" | "cyan" | "jade" | "amber" | "crimson";
}[] = [
  { key: "overview", name: { ar: "اللوحة", en: "Overview" }, caption: { ar: "نظرة شاملة على ألفا", en: "The whole of Alpha at a glance" }, tone: "gold" },
  { key: "health", name: { ar: "صحة المنصة", en: "Platform health" }, caption: { ar: "الخدمات والأداء والجهوزية", en: "Services, performance, uptime" }, badge: "1", tone: "jade" },
  { key: "users", name: { ar: "المستخدمون", en: "Users" }, caption: { ar: "الحسابات والأدوار والصلاحيات", en: "Accounts, roles, permissions" }, tone: "cyan" },
  { key: "churches", name: { ar: "الكنائس", en: "Churches" }, caption: { ar: "الإيبارشيات والكنائس والتوثيق", en: "Dioceses, churches, verification" }, badge: "4", tone: "gold" },
  { key: "content", name: { ar: "المحتوى", en: "Content" }, caption: { ar: "الأقسام الروحية والمكتبات", en: "Spiritual sections and libraries" }, tone: "cyan" },
  { key: "community", name: { ar: "المجتمع", en: "Community" }, caption: { ar: "القنوات والرسائل والبلاغات", en: "Channels, messages, reports" }, badge: "7", tone: "amber" },
  { key: "analytics", name: { ar: "الإحصائيات", en: "Analytics" }, caption: { ar: "النمو والتفاعل والاحتفاظ", en: "Growth, engagement, retention" }, tone: "cyan" },
  { key: "activity", name: { ar: "النشاط والخريطة", en: "Activity & map" }, caption: { ar: "الحضور الحيّ حول العالم", en: "Live presence worldwide" }, tone: "jade" },
  { key: "media", name: { ar: "الوسائط", en: "Media" }, caption: { ar: "إدارة الملفات والمساحة", en: "Files and storage management" }, tone: "gold" },
  { key: "approvals", name: { ar: "المراجعات والاعتمادات", en: "Reviews & approvals" }, caption: { ar: "طلبات في انتظار القرار", en: "Requests awaiting a decision" }, badge: "12", tone: "amber" },
  { key: "alerts", name: { ar: "التنبيهات", en: "Alerts" }, caption: { ar: "إشعارات النظام والبثّ", en: "System notices and broadcasts" }, badge: "3", tone: "crimson" },
  { key: "reports", name: { ar: "التقارير", en: "Reports" }, caption: { ar: "تقارير جاهزة وتصدير", en: "Prepared reports and export" }, tone: "cyan" },
  { key: "admin", name: { ar: "الأدوات الإدارية", en: "Admin tools" }, caption: { ar: "أدوات الفريق والتدقيق", en: "Team tooling and audit" }, tone: "gold" },
  { key: "settings", name: { ar: "الإعدادات", en: "Settings" }, caption: { ar: "إعدادات المنصة العامة", en: "Global platform settings" }, tone: "cyan" },
  { key: "system", name: { ar: "النظام والطوارئ", en: "System & emergency" }, caption: { ar: "أدوات حسّاسة للطوارئ", en: "Sensitive emergency tooling" }, badge: "!", tone: "crimson" },
  { key: "launch", name: { ar: "الإطلاق", en: "Launch" }, caption: { ar: "الإصدارات والطرح والطوارئ", en: "Releases, rollout, emergency" }, badge: "NEW", tone: "gold" },
];

/* ── Overview KPIs ───────────────────────────────────────── */

export const kpis: { label: Bi; value: string; delta: string; up: boolean; spark: number[] }[] = [
  { label: { ar: "المستخدمون النشطون", en: "Active users" }, value: "48,712", delta: "+6.4%", up: true, spark: [22, 30, 26, 38, 42, 48, 46, 58, 64, 61, 72, 78] },
  { label: { ar: "الكنائس الموصولة", en: "Connected churches" }, value: "1,284", delta: "+18", up: true, spark: [40, 42, 44, 43, 48, 52, 55, 54, 58, 62, 66, 70] },
  { label: { ar: "جلسات القراءة", en: "Reading sessions" }, value: "312K", delta: "+11.2%", up: true, spark: [30, 44, 38, 52, 48, 62, 58, 70, 66, 74, 80, 86] },
  { label: { ar: "بلاغات مفتوحة", en: "Open reports" }, value: "23", delta: "-9", up: false, spark: [70, 66, 62, 58, 52, 48, 44, 40, 36, 32, 28, 24] },
];

export const heroStats: { label: Bi; value: string }[] = [
  { label: { ar: "متصل الآن", en: "Online now" }, value: "3,482" },
  { label: { ar: "جهوزية", en: "Uptime" }, value: "99.98%" },
  { label: { ar: "زمن الاستجابة", en: "Latency" }, value: "142ms" },
];

export const quickActions: { label: Bi; glyph: string }[] = [
  { label: { ar: "بثّ تنبيه", en: "Broadcast alert" }, glyph: "bell" },
  { label: { ar: "اعتماد كنيسة", en: "Verify church" }, glyph: "church" },
  { label: { ar: "نشر محتوى", en: "Publish content" }, glyph: "content" },
  { label: { ar: "دعوة مشرف", en: "Invite admin" }, glyph: "users" },
  { label: { ar: "تقرير فوري", en: "Instant report" }, glyph: "reports" },
  { label: { ar: "وضع الصيانة", en: "Maintenance mode" }, glyph: "system" },
];

/* ── Health ──────────────────────────────────────────────── */

export const services: { name: Bi; note: Bi; health: Health; value: string }[] = [
  { name: { ar: "واجهة التطبيق", en: "App gateway" }, note: { ar: "كل المناطق", en: "All regions" }, health: "ok", value: "126ms" },
  { name: { ar: "قاعدة البيانات", en: "Database" }, note: { ar: "قراءة/كتابة", en: "Read / write" }, health: "ok", value: "38ms" },
  { name: { ar: "الوسائط والتخزين", en: "Media & storage" }, note: { ar: "تحميلات كبيرة", en: "Large uploads" }, health: "warn", value: "412ms" },
  { name: { ar: "الإشعارات", en: "Notifications" }, note: { ar: "قائمة الإرسال", en: "Delivery queue" }, health: "ok", value: "1.2s" },
  { name: { ar: "القنوات الصوتية", en: "Voice channels" }, note: { ar: "غرف مباشرة", en: "Live rooms" }, health: "ok", value: "64ms" },
  { name: { ar: "البحث", en: "Search index" }, note: { ar: "فهرسة المحتوى", en: "Content indexing" }, health: "ok", value: "88ms" },
];

export const perfBars: { label: Bi; pct: number }[] = [
  { label: { ar: "المعالج", en: "CPU" }, pct: 42 },
  { label: { ar: "الذاكرة", en: "Memory" }, pct: 61 },
  { label: { ar: "التخزين", en: "Storage" }, pct: 74 },
  { label: { ar: "الشبكة", en: "Network" }, pct: 33 },
];

/* ── Users ───────────────────────────────────────────────── */

export const userSegments: { label: Bi; value: string; pct: number }[] = [
  { label: { ar: "أعضاء", en: "Members" }, value: "44,120", pct: 78 },
  { label: { ar: "خدّام", en: "Servants" }, value: "3,908", pct: 12 },
  { label: { ar: "كهنة", en: "Priests" }, value: "612", pct: 6 },
  { label: { ar: "مشرفون", en: "Admins" }, value: "72", pct: 4 },
];

export const recentUsers: { name: Bi; role: Bi; state: Bi; health: Health }[] = [
  { name: { ar: "مينا صبحي", en: "Mina Sobhy" }, role: { ar: "خادم", en: "Servant" }, state: { ar: "جديد", en: "New" }, health: "ok" },
  { name: { ar: "أبونا يوسف", en: "Fr. Youssef" }, role: { ar: "كاهن", en: "Priest" }, state: { ar: "بانتظار التوثيق", en: "Awaiting verification" }, health: "warn" },
  { name: { ar: "مريم عادل", en: "Mariam Adel" }, role: { ar: "عضو", en: "Member" }, state: { ar: "نشِط", en: "Active" }, health: "ok" },
  { name: { ar: "حساب مُبلّغ عنه", en: "Reported account" }, role: { ar: "عضو", en: "Member" }, state: { ar: "موقوف", en: "Suspended" }, health: "down" },
];

/* ── Churches ────────────────────────────────────────────── */

export const churchRows: { name: Bi; place: Bi; members: string; state: Bi; health: Health }[] = [
  { name: { ar: "كنيسة السيدة العذراء", en: "St. Mary Church" }, place: { ar: "شبرا — القاهرة", en: "Shubra — Cairo" }, members: "8,420", state: { ar: "موثّقة", en: "Verified" }, health: "ok" },
  { name: { ar: "كنيسة الأنبا أنطونيوس", en: "St. Antony Church" }, place: { ar: "الإسكندرية", en: "Alexandria" }, members: "5,140", state: { ar: "موثّقة", en: "Verified" }, health: "ok" },
  { name: { ar: "كنيسة مار مرقس", en: "St. Mark Church" }, place: { ar: "نيوجيرسي — أمريكا", en: "New Jersey — USA" }, members: "2,308", state: { ar: "بانتظار الاعتماد", en: "Pending approval" }, health: "warn" },
  { name: { ar: "كنيسة الشهيد مارجرجس", en: "St. George Church" }, place: { ar: "المنيا", en: "Minya" }, members: "3,977", state: { ar: "بيانات ناقصة", en: "Incomplete data" }, health: "warn" },
];

/* ── Content ─────────────────────────────────────────────── */

export const contentSections: { label: Bi; items: string; pct: number }[] = [
  { label: { ar: "الكتاب المقدس", en: "Bible" }, items: "1,189", pct: 96 },
  { label: { ar: "الأجبية", en: "Agpeya" }, items: "24", pct: 100 },
  { label: { ar: "القطمارس", en: "Katameros" }, items: "365", pct: 88 },
  { label: { ar: "الخولاجي", en: "Khoulagy" }, items: "42", pct: 74 },
  { label: { ar: "السنكسار", en: "Synaxarium" }, items: "1,120", pct: 91 },
  { label: { ar: "الآباء", en: "Fathers" }, items: "608", pct: 62 },
  { label: { ar: "ألفا كيدز", en: "Alpha Kids" }, items: "214", pct: 58 },
];

/* ── Community ───────────────────────────────────────────── */

export const communityStats: { label: Bi; value: string }[] = [
  { label: { ar: "قنوات", en: "Channels" }, value: "742" },
  { label: { ar: "غرف صوتية مباشرة", en: "Live voice rooms" }, value: "18" },
  { label: { ar: "رسائل اليوم", en: "Messages today" }, value: "96,430" },
  { label: { ar: "بلاغات محتوى", en: "Content reports" }, value: "23" },
];

export const moderationQueue: { text: Bi; kind: Bi; health: Health }[] = [
  { text: { ar: "منشور مُبلّغ عنه في قناة الشباب", en: "Reported post in Youth channel" }, kind: { ar: "بلاغ", en: "Report" }, health: "warn" },
  { text: { ar: "رسالة تحتوي لغة غير لائقة", en: "Message flagged for language" }, kind: { ar: "تصفية آلية", en: "Auto filter" }, health: "down" },
  { text: { ar: "طلب إنشاء قناة إيبارشية", en: "Diocese channel request" }, kind: { ar: "طلب", en: "Request" }, health: "ok" },
];

/* ── Analytics ───────────────────────────────────────────── */

export const growthSeries = [18, 26, 24, 34, 40, 38, 52, 58, 55, 68, 74, 82, 79, 92];

export const retention: { label: Bi; pct: number }[] = [
  { label: { ar: "اليوم ١", en: "Day 1" }, pct: 82 },
  { label: { ar: "اليوم ٧", en: "Day 7" }, pct: 61 },
  { label: { ar: "اليوم ٣٠", en: "Day 30" }, pct: 44 },
  { label: { ar: "اليوم ٩٠", en: "Day 90" }, pct: 31 },
];

export const donut: { label: Bi; pct: number; tone: "gold" | "cyan" | "jade" | "amber" }[] = [
  { label: { ar: "قراءة", en: "Reading" }, pct: 38, tone: "gold" },
  { label: { ar: "صلاة", en: "Prayer" }, pct: 26, tone: "cyan" },
  { label: { ar: "مجتمع", en: "Community" }, pct: 22, tone: "jade" },
  { label: { ar: "أطفال", en: "Kids" }, pct: 14, tone: "amber" },
];

/* ── Activity & map ──────────────────────────────────────── */

export const mapPoints: { x: number; y: number; label: Bi; value: string }[] = [
  { x: 50, y: 56, label: { ar: "القاهرة", en: "Cairo" }, value: "1,940" },
  { x: 42, y: 34, label: { ar: "الإسكندرية", en: "Alexandria" }, value: "612" },
  { x: 18, y: 46, label: { ar: "نيوجيرسي", en: "New Jersey" }, value: "384" },
  { x: 74, y: 40, label: { ar: "دبي", en: "Dubai" }, value: "212" },
  { x: 84, y: 74, label: { ar: "سيدني", en: "Sydney" }, value: "148" },
  { x: 32, y: 18, label: { ar: "لندن", en: "London" }, value: "186" },
];

export const activityFeed: { text: Bi; time: Bi; tone: "gold" | "cyan" | "jade" | "crimson" }[] = [
  { text: { ar: "تم اعتماد كنيسة مار مرقس — نيوجيرسي", en: "St. Mark New Jersey approved" }, time: { ar: "قبل ٤ دقائق", en: "4 min ago" }, tone: "jade" },
  { text: { ar: "نشر فصل جديد في مكتبة الآباء", en: "New chapter published in Fathers" }, time: { ar: "قبل ١٢ دقيقة", en: "12 min ago" }, tone: "gold" },
  { text: { ar: "ارتفاع زمن استجابة الوسائط", en: "Media latency spike detected" }, time: { ar: "قبل ٢٦ دقيقة", en: "26 min ago" }, tone: "crimson" },
  { text: { ar: "٤٨ عضوًا جديدًا في قناة الشباب", en: "48 new members in Youth channel" }, time: { ar: "قبل ساعة", en: "1 hour ago" }, tone: "cyan" },
];

/* ── Media ───────────────────────────────────────────────── */

export const mediaBuckets: { label: Bi; size: Bi; pct: number }[] = [
  { label: { ar: "صور", en: "Images" }, size: { ar: "312 غيغا", en: "312 GB" }, pct: 62 },
  { label: { ar: "صوتيات", en: "Audio" }, size: { ar: "184 غيغا", en: "184 GB" }, pct: 37 },
  { label: { ar: "فيديو", en: "Video" }, size: { ar: "906 غيغا", en: "906 GB" }, pct: 88 },
  { label: { ar: "مستندات", en: "Documents" }, size: { ar: "48 غيغا", en: "48 GB" }, pct: 18 },
];

/* ── Approvals ───────────────────────────────────────────── */

export const approvals: { title: Bi; from: Bi; kind: Bi }[] = [
  { title: { ar: "طلب توثيق كنيسة", en: "Church verification request" }, from: { ar: "كنيسة مار مرقس", en: "St. Mark Church" }, kind: { ar: "كنائس", en: "Churches" } },
  { title: { ar: "كتاب جديد للمكتبة", en: "New library book" }, from: { ar: "مكتبة الآباء", en: "Fathers library" }, kind: { ar: "محتوى", en: "Content" } },
  { title: { ar: "ترقية خادم إلى مشرف", en: "Servant to admin upgrade" }, from: { ar: "مينا صبحي", en: "Mina Sobhy" }, kind: { ar: "مستخدمون", en: "Users" } },
  { title: { ar: "فيلم أطفال جديد", en: "New kids film" }, from: { ar: "ألفا كيدز", en: "Alpha Kids" }, kind: { ar: "وسائط", en: "Media" } },
];

/* ── Alerts ──────────────────────────────────────────────── */

export const alerts: { title: Bi; body: Bi; health: Health; time: Bi }[] = [
  { title: { ar: "بطء في تحميل الوسائط", en: "Media upload slowdown" }, body: { ar: "منطقة أوروبا — تحت المتابعة", en: "Europe region — monitoring" }, health: "warn", time: { ar: "٢٦ دقيقة", en: "26m" } },
  { title: { ar: "محاولات دخول مشبوهة", en: "Suspicious sign-in attempts" }, body: { ar: "تم حجب ١٢ محاولة تلقائيًا", en: "12 attempts blocked automatically" }, health: "down", time: { ar: "ساعة", en: "1h" } },
  { title: { ar: "نسخة احتياطية مكتملة", en: "Backup completed" }, body: { ar: "كل الخدمات — بنجاح", en: "All services — successful" }, health: "ok", time: { ar: "٣ ساعات", en: "3h" } },
];

/* ── Reports ─────────────────────────────────────────────── */

export const reports: { title: Bi; note: Bi }[] = [
  { title: { ar: "تقرير النمو الشهري", en: "Monthly growth report" }, note: { ar: "PDF · ١٤ صفحة", en: "PDF · 14 pages" } },
  { title: { ar: "تقرير المحتوى والنشر", en: "Content & publishing report" }, note: { ar: "PDF · ٩ صفحات", en: "PDF · 9 pages" } },
  { title: { ar: "تقرير المجتمع والبلاغات", en: "Community & moderation report" }, note: { ar: "CSV · ٢٤٠ سجل", en: "CSV · 240 rows" } },
  { title: { ar: "تقرير الكنائس والإيبارشيات", en: "Churches & dioceses report" }, note: { ar: "PDF · ٢٢ صفحة", en: "PDF · 22 pages" } },
];

/* ── Admin tools ─────────────────────────────────────────── */

export const adminTools: { label: Bi; note: Bi; glyph: string }[] = [
  { label: { ar: "الأدوار والصلاحيات", en: "Roles & permissions" }, note: { ar: "٧ أدوار", en: "7 roles" }, glyph: "shield" },
  { label: { ar: "سجل التدقيق", en: "Audit log" }, note: { ar: "٤٨٢ حدث", en: "482 events" }, glyph: "list" },
  { label: { ar: "فريق الإدارة", en: "Admin team" }, note: { ar: "١٢ عضوًا", en: "12 members" }, glyph: "users" },
  { label: { ar: "الدعوات", en: "Invitations" }, note: { ar: "٣ معلّقة", en: "3 pending" }, glyph: "mail" },
  { label: { ar: "قوالب الإشعارات", en: "Notification templates" }, note: { ar: "١٨ قالبًا", en: "18 templates" }, glyph: "bell" },
  { label: { ar: "أعلام الميزات", en: "Feature flags" }, note: { ar: "٩ مفاتيح", en: "9 switches" }, glyph: "toggle" },
];

/* ── Settings ────────────────────────────────────────────── */

export const settingsRows: { label: Bi; value: Bi; on?: boolean }[] = [
  { label: { ar: "اللغة الافتراضية", en: "Default language" }, value: { ar: "العربية", en: "Arabic" } },
  { label: { ar: "التقويم الطقسي", en: "Liturgical calendar" }, value: { ar: "قبطي", en: "Coptic" } },
  { label: { ar: "التسجيل العام", en: "Public sign-up" }, value: { ar: "مفتوح", en: "Open" }, on: true },
  { label: { ar: "مراجعة المحتوى قبل النشر", en: "Review before publish" }, value: { ar: "مُفعّل", en: "Enabled" }, on: true },
  { label: { ar: "حدّ حجم الوسائط", en: "Media size limit" }, value: { ar: "٢٥٦ ميغا", en: "256 MB" } },
  { label: { ar: "الإشعارات الليلية", en: "Night notifications" }, value: { ar: "موقوفة", en: "Muted" }, on: false },
];

/* ── System & emergency ──────────────────────────────────── */

export const systemTools: { label: Bi; note: Bi; danger?: boolean }[] = [
  { label: { ar: "إفراغ الذاكرة المؤقتة", en: "Purge cache" }, note: { ar: "آمن — يُنفَّذ فورًا", en: "Safe — instant" } },
  { label: { ar: "إعادة فهرسة البحث", en: "Rebuild search index" }, note: { ar: "يستغرق ~٨ دقائق", en: "Takes ~8 minutes" } },
  { label: { ar: "نسخة احتياطية فورية", en: "Immediate backup" }, note: { ar: "كل الخدمات", en: "All services" } },
  { label: { ar: "وضع الصيانة", en: "Maintenance mode" }, note: { ar: "يُخفي التطبيق عن المستخدمين", en: "Hides the app from users" }, danger: true },
  { label: { ar: "إيقاف البثّ الصوتي", en: "Stop all voice rooms" }, note: { ar: "إجراء طارئ", en: "Emergency action" }, danger: true },
  { label: { ar: "قفل عام للنظام", en: "Global system lock" }, note: { ar: "يتطلّب تأكيدًا مزدوجًا", en: "Requires double confirmation" }, danger: true },
];

/* ── Launch Control ──────────────────────────────────────── */

export const LL = {
  launch: { ar: "الإطلاق", en: "Launch" },
  launchCaption: { ar: "الإصدارات والطرح والطوارئ", en: "Releases, rollout, emergency" },
  s01: { ar: "حالة الإطلاق", en: "Launch status" },
  s02: { ar: "مركز إصدار الوحدات", en: "Module release center" },
  s02c: { ar: "نشر وتراجع وتقييد كل وحدة في ألفا.", en: "Ship, roll back and gate every Alpha module." },
  s03: { ar: "الطرح التدريجي", en: "Gradual rollout" },
  s03c: { ar: "الجمهور المستهدف ونسبة الحركة للوحدة المحددة.", en: "Target audience and traffic share for the selected module." },
  s04: { ar: "الوضع التجريبي", en: "Pilot mode" },
  s04c: { ar: "تجربة كنيسة أو مجموعة مستخدمين ببيانات مولّدة.", en: "Trial a church or user group with generated data." },
  s05: { ar: "مفاتيح الميزات", en: "Feature flags" },
  s05c: { ar: "تفعيل وتقييد كل ميزة على حدة مع تبعياتها.", en: "Enable or gate each feature with its dependencies." },
  s06: { ar: "مركز الطوارئ", en: "Emergency center" },
  s06c: { ar: "كل إجراء يتطلب تأكيدًا ويُسجَّل.", en: "Every action requires confirmation and is logged." },
  s07: { ar: "قائمة مراجعة الإصدار", en: "Release checklist" },
  s08: { ar: "صحة الإنتاج", en: "Production health" },
  s08c: { ar: "قياسات حية عبر منظومة ألفا.", en: "Live measurements across Alpha." },
  s09: { ar: "سجل النشر", en: "Deploy log" },
  s09c: { ar: "كل ترقية وتراجع وإصلاح — موقّع ومؤرّخ.", en: "Every promote, rollback and hotfix — signed and dated." },
  s10: { ar: "الأمان والحوكمة", en: "Security & governance" },
  s10c: { ar: "وصول للمالك فقط، صلاحيات مقيّدة، وسجل تدقيق كامل.", en: "Owner-only access, scoped permissions, full audit trail." },
  section: { ar: "القسم", en: "Section" },
  headline: { ar: "ألفا v1.9.0 جاهز للإطلاق التدريجي.", en: "Alpha v1.9.0 is ready for gradual launch." },
  subline: {
    ar: "الإصدار 2041 يعمل لدى 25% من الأعضاء الموثقين. وحدتان في مرحلة بيتا. أدوات الطوارئ مفعّلة.",
    en: "Build 2041 is live for 25% of verified members. Two modules in beta. Emergency tooling armed.",
  },
  deploy: { ar: "نشر إلى الإنتاج", en: "Deploy to production" },
  promote: { ar: "ترقية", en: "Promote" },
  rollback: { ar: "تراجع", en: "Rollback" },
  publish: { ar: "نشر", en: "Ship" },
  disable: { ar: "تعطيل", en: "Disable" },
  enable: { ar: "تفعيل", en: "Enable" },
  currentVersion: { ar: "الإصدار الحالي", en: "Current version" },
  semver: { ar: "ترقيم دلالي", en: "Semantic version" },
  buildNo: { ar: "رقم البناء", en: "Build number" },
  signed: { ar: "موقّع · موثّق", en: "Signed · verified" },
  production: { ar: "الإنتاج", en: "Production" },
  live: { ar: "مباشر", en: "Live" },
  regions: { ar: "أمريكا · أوروبا · الشرق الأوسط", en: "Americas · Europe · Middle East" },
  staging: { ar: "التطوير", en: "Staging" },
  testsPass: { ar: "الاختبارات ناجحة", en: "All tests pass" },
  ok2: { ar: "سليم", en: "Healthy" },
  env: { ar: "البيئة", en: "Environment" },
  rolloutPct: { ar: "الطرح 25%", en: "Rollout 25%" },
  launchProgress: { ar: "تقدّم الإطلاق", en: "Launch progress" },
  readyCount: { ar: "8/12 جاهز", en: "8/12 ready" },
  modulesCount: { ar: "8 وحدات", en: "8 modules" },
  selectedModule: { ar: "الوحدة المحددة", en: "Selected module" },
  releaseTo: { ar: "الإصدار إلى", en: "Release to" },
  trafficShare: { ar: "نسبة الحركة", en: "Traffic share" },
  applyRollout: { ar: "تطبيق الطرح", en: "Apply rollout" },
  previewSlice: { ar: "معاينة الشريحة", en: "Preview slice" },
  off: { ar: "متوقف", en: "Off" },
  on: { ar: "مُفعّل", en: "On" },
  pilotEnv: { ar: "البيئة التجريبية", en: "Pilot environment" },
  isolated: { ar: "بيانات معزولة · لا تؤثر على الإنتاج", en: "Isolated data · production untouched" },
  targetChurch: { ar: "الكنيسة المستهدفة", en: "Target church" },
  userCount: { ar: "عدد المستخدمين", en: "User count" },
  endDate: { ar: "تاريخ الانتهاء", en: "End date" },
  seedData: { ar: "توليد بيانات تجريبية", en: "Generate sample data" },
  reset: { ar: "إعادة تعيين", en: "Reset" },
  dependsOn: { ar: "تعتمد على", en: "Depends on" },
  rollout: { ar: "الطرح", en: "Rollout" },
  armed: { ar: "جاهز", en: "Armed" },
  standby: { ar: "استعداد", en: "Standby" },
  oneTapRollback: { ar: "تراجع بضغطة واحدة", en: "One-tap rollback" },
  oneTapNote: {
    ar: "إرجاع ألفا إلى آخر إصدار إنتاج مستقر (v1.8.4 · 2033).",
    en: "Return Alpha to the last stable production release (v1.8.4 · 2033).",
  },
  runRollback: { ar: "تنفيذ التراجع", en: "Run rollback" },
  ready: { ar: "جاهز", en: "Ready" },
  waiting: { ar: "قيد الانتظار", en: "Pending" },
  oneWarn: { ar: "تحذير واحد · حالة حرجة واحدة", en: "One warning · one critical" },
  fullLog: { ar: "عرض السجل الكامل", en: "View full log" },
  by: { ar: "بواسطة", en: "by" },
  currentTag: { ar: "الحالي", en: "Current" },
  confirmTitle: { ar: "تأكيد الإجراء", en: "Confirm action" },
  confirmBody: {
    ar: "هذا إجراء حسّاس داخل ألفا كنترول. سيُسجَّل باسمك في سجل التدقيق.",
    en: "This is a sensitive Alpha Control action. It will be recorded in the audit log under your name.",
  },
  confirm: { ar: "تأكيد", en: "Confirm" },
  cancel: { ar: "إلغاء", en: "Cancel" },
  everyActionConfirm: { ar: "كل إجراء يتطلب تأكيدًا", en: "Every action needs confirmation" },
  everyActionNote: {
    ar: "العمليات الحسّاسة تتطلب تأكيدًا موقّعًا من المالك.",
    en: "Sensitive operations require a signed owner confirmation.",
  },
};

export const release = {
  version: "1.9.0",
  build: "2041",
  progress: 67,
  rollout: 25,
};

export type ReleaseStage = "production" | "gradual" | "beta" | "internal" | "hidden";

export const stageLabel: Record<ReleaseStage, Bi> = {
  production: { ar: "إنتاج", en: "Production" },
  gradual: { ar: "طرح تدريجي", en: "Gradual rollout" },
  beta: { ar: "بيتا", en: "Beta" },
  internal: { ar: "داخلي", en: "Internal" },
  hidden: { ar: "مخفي", en: "Hidden" },
};

export const stageNote: Record<ReleaseStage, Bi> = {
  production: { ar: "مباشر لكل جمهور الإنتاج.", en: "Live for the whole production audience." },
  gradual: { ar: "يتم طرحه تدريجيًا لمجموعات محددة.", en: "Rolling out gradually to selected groups." },
  beta: { ar: "متاح لمختبري بيتا المشتركين.", en: "Available to enrolled beta testers." },
  internal: { ar: "للفريق الداخلي فقط.", en: "Internal team only." },
  hidden: { ar: "مخفي عن جميع المستخدمين.", en: "Hidden from all users." },
};

export const moduleReleases: { name: Bi; stage: ReleaseStage }[] = [
  { name: { ar: "المصادقة", en: "Authentication" }, stage: "production" },
  { name: { ar: "المجتمع", en: "Community" }, stage: "gradual" },
  { name: { ar: "الكنيسة", en: "Church" }, stage: "beta" },
  { name: { ar: "التواصل", en: "Connect" }, stage: "internal" },
  { name: { ar: "الأجبية", en: "Agpeya" }, stage: "gradual" },
  { name: { ar: "الإشعارات", en: "Notifications" }, stage: "production" },
  { name: { ar: "مكتبة الوسائط", en: "Media library" }, stage: "hidden" },
  { name: { ar: "حائط الصلاة", en: "Prayer wall" }, stage: "beta" },
];

export const rolloutAudiences: Bi[] = [
  { ar: "الفريق الداخلي", en: "Internal team" },
  { ar: "المشرفون", en: "Admins" },
  { ar: "الكنائس", en: "Churches" },
  { ar: "الأعضاء الموثقون", en: "Verified members" },
  { ar: "نسبة عشوائية", en: "Random percentage" },
  { ar: "الجميع", en: "Everyone" },
];

export const trafficSteps = [0, 5, 10, 25, 50, 75, 100];

export const featureFlags: { name: Bi; dep: string; pct: number }[] = [
  { name: { ar: "ملخصات الذكاء الاصطناعي", en: "AI summaries" }, dep: "ai_gateway", pct: 100 },
  { name: { ar: "سلاسل الصلاة", en: "Prayer streaks" }, dep: "agpeya", pct: 50 },
  { name: { ar: "الملاحظات الصوتية", en: "Voice notes" }, dep: "media", pct: 0 },
  { name: { ar: "مجموعات العائلة", en: "Family groups" }, dep: "community", pct: 25 },
  { name: { ar: "الأحداث المباشرة", en: "Live events" }, dep: "realtime", pct: 10 },
  { name: { ar: "الأجبية دون اتصال", en: "Offline Agpeya" }, dep: "storage", pct: 100 },
  { name: { ar: "شارة التوثيق", en: "Verified badge" }, dep: "auth", pct: 0 },
  { name: { ar: "حجز الاعتراف", en: "Confession booking" }, dep: "church", pct: 5 },
];

export const emergencyKills: Bi[] = [
  { ar: "وضع الصيانة", en: "Maintenance mode" },
  { ar: "إيقاف التسجيل", en: "Halt sign-ups" },
  { ar: "إيقاف المجتمع", en: "Halt community" },
  { ar: "إيقاف الكنيسة", en: "Halt church" },
  { ar: "إيقاف التواصل", en: "Halt connect" },
  { ar: "إيقاف الإشعارات", en: "Halt notifications" },
];

export const releaseChecklist: { label: Bi; done: boolean }[] = [
  { label: { ar: "الاختبارات الآلية", en: "Automated tests" }, done: true },
  { label: { ar: "مراجعة الأمان", en: "Security review" }, done: true },
  { label: { ar: "ترجمة الواجهات", en: "UI translations" }, done: true },
  { label: { ar: "الوصولية", en: "Accessibility" }, done: true },
  { label: { ar: "الأداء", en: "Performance" }, done: true },
  { label: { ar: "وضع عدم الاتصال", en: "Offline mode" }, done: false },
  { label: { ar: "التخزين", en: "Storage" }, done: true },
  { label: { ar: "نسخ احتياطي واستعادة", en: "Backup & restore" }, done: true },
  { label: { ar: "سياسات الوصول", en: "Access policies" }, done: true },
  { label: { ar: "مراجعة المحتوى", en: "Content review" }, done: false },
  { label: { ar: "خطة التراجع", en: "Rollback plan" }, done: false },
  { label: { ar: "إشعار المستخدمين", en: "User announcement" }, done: false },
];

export const prodHealth: { name: Bi; note: Bi; value: string; health: Health }[] = [
  { name: { ar: "نواة ألفا", en: "Alpha core" }, note: { ar: "كل المناطق", en: "All regions" }, value: "99.98%", health: "ok" },
  { name: { ar: "التخزين", en: "Storage" }, note: { ar: "12 مخزنًا", en: "12 buckets" }, value: "42.1 GB", health: "ok" },
  { name: { ar: "الدوال الطرفية", en: "Edge functions" }, note: { ar: "نقطتان بطيئتان", en: "2 slow endpoints" }, value: "p95 480ms", health: "warn" },
  { name: { ar: "الزمن الحقيقي", en: "Realtime" }, note: { ar: "مستقر", en: "Stable" }, value: "1.2k conn", health: "ok" },
  { name: { ar: "المخازن", en: "Policies" }, note: { ar: "السياسات سليمة", en: "All policies valid" }, value: "12/12", health: "ok" },
  { name: { ar: "الأداء", en: "Performance" }, note: { ar: "المتوسط العالمي", en: "Global average" }, value: "LCP 1.4s", health: "ok" },
  { name: { ar: "قاعدة البيانات", en: "Database" }, note: { ar: "ارتفاع مفاجئ", en: "Sudden spike" }, value: "84% CPU", health: "down" },
];

export const deployLog: {
  version: string;
  build: string;
  note: Bi;
  date: string;
  time: string;
  actor: Bi;
  current?: boolean;
}[] = [
  {
    version: "1.9.0",
    build: "2041",
    note: { ar: "طرح تدريجي للأعضاء الموثقين", en: "Gradual rollout to verified members" },
    date: "2026-07-03",
    time: "09:42",
    actor: { ar: "مينا بشارة", en: "Mina Beshara" },
    current: true,
  },
  {
    version: "1.8.4",
    build: "2033",
    note: { ar: "إصلاح عاجل — إعادة محاولات الإشعارات", en: "Hotfix — notification retries" },
    date: "2026-06-28",
    time: "14:11",
    actor: { ar: "مينا بشارة", en: "Mina Beshara" },
  },
  {
    version: "1.8.3",
    build: "2029",
    note: { ar: "تحديث محتوى الأجبية", en: "Agpeya content update" },
    date: "2026-06-22",
    time: "18:03",
    actor: { ar: "الأتمتة", en: "Automation" },
  },
  {
    version: "1.8.0",
    build: "2010",
    note: { ar: "بيتا وحدة الكنيسة", en: "Church module beta" },
    date: "2026-06-10",
    time: "11:20",
    actor: { ar: "مينا بشارة", en: "Mina Beshara" },
  },
];

export const governanceRows: { label: Bi; value: Bi; note: Bi }[] = [
  {
    label: { ar: "المالك فقط", en: "Owner only" },
    value: { ar: "مستخدم واحد", en: "1 user" },
    note: { ar: "mina@alphachurch.app", en: "mina@alphachurch.app" },
  },
  {
    label: { ar: "محمي بالصلاحيات", en: "Permission guarded" },
    value: { ar: "12 صلاحية", en: "12 scopes" },
    note: { ar: "أقل امتياز · مراجعة أسبوعية", en: "Least privilege · weekly review" },
  },
  {
    label: { ar: "سجل التدقيق", en: "Audit log" },
    value: { ar: "كل إجراء", en: "Every action" },
    note: { ar: "غير قابل للتعديل · حفظ سنتين", en: "Immutable · 2-year retention" },
  },
];

/* ── Geo presence (map redesign) ─────────────────────────── */

export const geoCountries: {
  code: string;
  flag: string;
  name: Bi;
  city: Bi;
  members: string;
  share: number;
  x: number;
  y: number;
  up: boolean;
  delta: string;
}[] = [
  { code: "EG", flag: "🇪🇬", name: { ar: "مصر", en: "Egypt" }, city: { ar: "القاهرة · الإسكندرية", en: "Cairo · Alexandria" }, members: "29,410", share: 61, x: 55, y: 58, up: true, delta: "+4.2%" },
  { code: "US", flag: "🇺🇸", name: { ar: "الولايات المتحدة", en: "United States" }, city: { ar: "نيوجيرسي · لوس أنجلوس", en: "New Jersey · Los Angeles" }, members: "7,180", share: 15, x: 20, y: 44, up: true, delta: "+2.8%" },
  { code: "AE", flag: "🇦🇪", name: { ar: "الإمارات", en: "United Arab Emirates" }, city: { ar: "دبي · أبوظبي", en: "Dubai · Abu Dhabi" }, members: "3,940", share: 8, x: 72, y: 52, up: true, delta: "+6.1%" },
  { code: "GB", flag: "🇬🇧", name: { ar: "بريطانيا", en: "United Kingdom" }, city: { ar: "لندن · مانشستر", en: "London · Manchester" }, members: "3,120", share: 7, x: 40, y: 24, up: false, delta: "-0.6%" },
  { code: "AU", flag: "🇦🇺", name: { ar: "أستراليا", en: "Australia" }, city: { ar: "سيدني · ملبورن", en: "Sydney · Melbourne" }, members: "2,640", share: 5, x: 86, y: 80, up: true, delta: "+1.9%" },
  { code: "CA", flag: "🇨🇦", name: { ar: "كندا", en: "Canada" }, city: { ar: "تورونتو · مونتريال", en: "Toronto · Montreal" }, members: "2,010", share: 4, x: 24, y: 22, up: true, delta: "+3.4%" },
];

/* ── Appearance (colors + scale) ─────────────────────────── */

export const AL = {
  title: { ar: "إعدادات المظهر", en: "Appearance settings" },
  caption: { ar: "اللون واللمعان ونسبة الحجم — معاينة قبل التطبيق", en: "Accent, glow and size scale — preview before applying" },
  accent: { ar: "لون التمييز", en: "Accent color" },
  scale: { ar: "نسبة الحجم", en: "Size scale" },
  density: { ar: "كثافة اللوحة", en: "Panel density" },
  labels: { ar: "حجم أسماء البلاد", en: "Country label size" },
  previewTitle: { ar: "معاينة التغييرات", en: "Preview changes" },
  previewNote: {
    ar: "التغييرات تظهر هنا فقط. اضغط «تطبيق» لسريانها على كامل ألفا كنترول.",
    en: "Changes stay in this window. Press Apply to push them across Alpha Control.",
  },
  applyAll: { ar: "تطبيق على كامل الشاشة", en: "Apply to whole screen" },
  applied: { ar: "تم التطبيق على كامل ألفا كنترول", en: "Applied across Alpha Control" },
  discard: { ar: "تجاهل", en: "Discard" },
  resetDefaults: { ar: "استعادة الافتراضي", en: "Reset defaults" },
  openAppearance: { ar: "المظهر", en: "Appearance" },
  geoTitle: { ar: "الحضور حسب البلد", en: "Presence by country" },
  geoCaption: { ar: "أعداد المنتمين ونسبة كل بلد", en: "Members and share per country" },
  members: { ar: "منتمٍ", en: "members" },
  totalMembers: { ar: "إجمالي المنتمين", en: "Total members" },
  countries: { ar: "بلدًا", en: "countries" },
};

export const accentPresets: { key: string; name: Bi; token: string; swatch: string }[] = [
  { key: "gold", name: { ar: "ذهبي", en: "Gold" }, token: "var(--ct-gold)", swatch: "bg-ctl-gold" },
  { key: "cyan", name: { ar: "سماوي", en: "Cyan" }, token: "var(--ct-cyan)", swatch: "bg-ctl-cyan" },
  { key: "jade", name: { ar: "زمردي", en: "Jade" }, token: "var(--ct-jade)", swatch: "bg-ctl-jade" },
  { key: "violet", name: { ar: "بنفسجي", en: "Violet" }, token: "var(--ct-violet)", swatch: "bg-ctl-violet" },
  { key: "amber", name: { ar: "عنبري", en: "Amber" }, token: "var(--ct-amber)", swatch: "bg-ctl-amber" },
  { key: "crimson", name: { ar: "قرمزي", en: "Crimson" }, token: "var(--ct-crimson)", swatch: "bg-ctl-crimson" },
];

export const scaleSteps = [90, 100, 110, 120, 130];

/* ── Pilot mode + trial app modules ──────────────────────── */

export const PL = {
  pilot: { ar: "الوضع التجريبي", en: "Pilot mode" },
  pilotCaption: { ar: "بيئة معزولة لكنيسة أو مجموعة", en: "Isolated environment for a church or group" },
  trial: { ar: "التطبيق التجريبي", en: "Trial app" },
  trialCaption: { ar: "نسخ الاختبار والمختبرون والدعوات", en: "Test builds, testers and invites" },
  env: { ar: "البيئة", en: "Environment" },
  status: { ar: "الحالة", en: "Status" },
  running: { ar: "يعمل", en: "Running" },
  stopped: { ar: "متوقف", en: "Stopped" },
  start: { ar: "تشغيل الوضع التجريبي", en: "Start pilot" },
  stop: { ar: "إيقاف الوضع التجريبي", en: "Stop pilot" },
  seed: { ar: "توليد بيانات تجريبية", en: "Generate sample data" },
  invite: { ar: "دعوة مختبرين", en: "Invite testers" },
  build: { ar: "نسخة الاختبار", en: "Test build" },
  channel: { ar: "قناة التوزيع", en: "Distribution channel" },
  testers: { ar: "المختبرون", en: "Testers" },
  feedback: { ar: "الملاحظات", en: "Feedback" },
  crashFree: { ar: "جلسات بلا أعطال", en: "Crash-free sessions" },
  sessions: { ar: "جلسات", en: "Sessions" },
  installs: { ar: "تثبيتات", en: "Installs" },
  expiry: { ar: "انتهاء النسخة", en: "Build expiry" },
  pushBuild: { ar: "دفع نسخة جديدة", en: "Push new build" },
  revoke: { ar: "سحب النسخة", en: "Revoke build" },
};

export const pilotGroups: { name: Bi; note: Bi; users: string; health: Health; on: boolean }[] = [
  { name: { ar: "كنيسة السيدة العذراء — شبرا", en: "St. Mary — Shubra" }, note: { ar: "٢٥٠ مستخدمًا · بيانات معزولة", en: "250 users · isolated data" }, users: "250", health: "ok", on: true },
  { name: { ar: "خدّام الشباب", en: "Youth servants" }, note: { ar: "٦٤ مستخدمًا · محتوى مولّد", en: "64 users · generated content" }, users: "64", health: "ok", on: true },
  { name: { ar: "فريق ألفا الداخلي", en: "Alpha internal team" }, note: { ar: "١٢ مستخدمًا · كل الميزات", en: "12 users · all features" }, users: "12", health: "ok", on: true },
  { name: { ar: "كنيسة مار مرقس — نيوجيرسي", en: "St. Mark — New Jersey" }, note: { ar: "بانتظار الموافقة", en: "Awaiting approval" }, users: "0", health: "warn", on: false },
];

export const pilotMetrics: { label: Bi; value: string; pct: number }[] = [
  { label: { ar: "التغطية التجريبية", en: "Pilot coverage" }, value: "326 / 48,712", pct: 12 },
  { label: { ar: "اكتمال البيانات المولّدة", en: "Seeded data completeness" }, value: "84%", pct: 84 },
  { label: { ar: "الملاحظات المعالجة", en: "Feedback resolved" }, value: "38 / 52", pct: 73 },
];

export const trialBuilds: { version: string; note: Bi; channel: Bi; state: Bi; health: Health }[] = [
  { version: "1.9.0 (2041)", note: { ar: "أحدث نسخة تجريبية", en: "Latest trial build" }, channel: { ar: "TestFlight · داخلي", en: "TestFlight · internal" }, state: { ar: "موزّعة", en: "Distributed" }, health: "ok" },
  { version: "1.9.0 (2039)", note: { ar: "إصلاح شاشة الأجبية", en: "Agpeya screen fix" }, channel: { ar: "أندرويد · بيتا", en: "Android · beta" }, state: { ar: "منتهية", en: "Expired" }, health: "warn" },
  { version: "1.8.9 (2036)", note: { ar: "نسخة مستقرة للمختبرين", en: "Stable tester build" }, channel: { ar: "ويب · معاينة", en: "Web · preview" }, state: { ar: "مؤرشفة", en: "Archived" }, health: "ok" },
];

export const trialStats: { label: Bi; value: string }[] = [
  { label: PL.testers, value: "326" },
  { label: PL.installs, value: "412" },
  { label: PL.crashFree, value: "99.4%" },
  { label: PL.feedback, value: "52" },
];
