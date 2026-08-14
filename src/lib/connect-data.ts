/**
 * Alpha Connect — presentation-only content for the Signal Aurora prototype.
 * Bilingual strings live here so the screens stay purely visual.
 * No logic, no fetching, no persistence, no backend.
 */

import type { ShieldSlug } from "@/lib/shields";

export type Bi = { ar: string; en: string };
export type Lang = "ar" | "en";

export const pick = (v: Bi, lang: Lang) => (lang === "ar" ? v.ar : v.en);

/* ── Shared labels ───────────────────────────────────────── */

export const L = {
  appName: { ar: "ألفا كونكت", en: "Alpha Connect" },
  tagline: { ar: "صوت الكنيسة… حيث تكون", en: "Your church voice, wherever you are" },
  heroTitle: { ar: "اتصال حيّ بمجتمعك", en: "Live with your community" },
  search: { ar: "بحث", en: "Search" },
  searchPlaceholder: { ar: "ابحث في القنوات والرسائل والأعضاء", en: "Search channels, messages, members" },
  notifications: { ar: "الإشعارات", en: "Notifications" },
  settings: { ar: "الإعدادات", en: "Settings" },
  favorites: { ar: "القنوات المفضّلة", en: "Favorite channels" },
  allChannels: { ar: "كل القنوات", en: "All channels" },
  voiceChannels: { ar: "القنوات الصوتية", en: "Voice channels" },
  messages: { ar: "الرسائل", en: "Messages" },
  groups: { ar: "المجموعات", en: "Groups" },
  members: { ar: "المشاركون", en: "Participants" },
  newChannel: { ar: "قناة جديدة", en: "New channel" },
  createJoin: { ar: "إنشاء والانضمام", en: "Create and join" },
  invite: { ar: "دعوة أعضاء", en: "Invite members" },
  channelQr: { ar: "كود القناة", en: "Channel QR" },
  recordings: { ar: "التسجيلات الصوتية", en: "Voice recordings" },
  pttHold: { ar: "اضغط مع الاستمرار للتحدث", en: "Press and hold to talk" },
  pttHint: { ar: "بثّ لاسلكي داخل القناة", en: "Wireless broadcast in channel" },
  pttLive: { ar: "أنت تتحدث الآن", en: "You are broadcasting" },
  online: { ar: "متصل", en: "online" },
  live: { ar: "على الهواء", en: "Live" },
  emptyChannels: { ar: "لا توجد قنوات بعد", en: "No channels yet" },
  emptyChannelsHint: {
    ar: "أنشئ أول قناة لكنيستك وابدأ التواصل الصوتي في ثوانٍ.",
    en: "Create your church's first channel and start talking in seconds.",
  },
  emptyMessages: { ar: "صندوقك هادئ", en: "Your inbox is quiet" },
  emptyMessagesHint: {
    ar: "ابدأ محادثة مع خادم أو صديق من قنوات كنيستك.",
    en: "Start a conversation with a servant or a friend from your channels.",
  },
  saveChanges: { ar: "حفظ التغييرات", en: "Save changes" },
  back: { ar: "رجوع", en: "Back" },
};

/* ── Channels ────────────────────────────────────────────── */

export type ChannelIconKey =
  | "church"
  | "family"
  | "book"
  | "group"
  | "shield"
  | "youth"
  | "choir"
  | "service";

export const channelIcons: { key: ChannelIconKey; label: Bi }[] = [
  { key: "church", label: { ar: "كنيسة", en: "Church" } },
  { key: "family", label: { ar: "عائلة", en: "Family" } },
  { key: "book", label: { ar: "كتاب", en: "Book" } },
  { key: "group", label: { ar: "مجموعة", en: "Group" } },
  { key: "shield", label: { ar: "درع", en: "Shield" } },
  { key: "youth", label: { ar: "شباب", en: "Youth" } },
  { key: "choir", label: { ar: "كورال", en: "Choir" } },
  { key: "service", label: { ar: "خدمة", en: "Service" } },
];

export type Channel = {
  id: string;
  name: Bi;
  topic: Bi;
  icon: ChannelIconKey;
  members: number;
  onlineNow: number;
  favorite: boolean;
  live: boolean;
  speaking?: Bi;
  hue: string;
};

export const channels: Channel[] = [
  {
    id: "st-mark",
    name: { ar: "كنيسة الشهيد مارمرقس", en: "St. Mark the Evangelist" },
    topic: { ar: "قناة الكنيسة العامة", en: "General church channel" },
    icon: "church",
    members: 248,
    onlineNow: 34,
    favorite: true,
    live: true,
    speaking: { ar: "أبونا يوساب", en: "Fr. Yousab" },
    hue: "oklch(0.800 0.152 158)",
  },
  {
    id: "servants",
    name: { ar: "اجتماع الخدّام", en: "Servants meeting" },
    topic: { ar: "تنسيق الخدمة الأسبوعية", en: "Weekly service coordination" },
    icon: "service",
    members: 62,
    onlineNow: 11,
    favorite: true,
    live: true,
    speaking: { ar: "مينا عادل", en: "Mina Adel" },
    hue: "oklch(0.788 0.118 198)",
  },
  {
    id: "youth",
    name: { ar: "اجتماع الشباب", en: "Youth meeting" },
    topic: { ar: "روحيات وأنشطة الشباب", en: "Youth spiritual life & activities" },
    icon: "youth",
    members: 176,
    onlineNow: 21,
    favorite: true,
    live: false,
    hue: "oklch(0.780 0.120 262)",
  },
  {
    id: "choir",
    name: { ar: "كورال الألحان", en: "Hymns choir" },
    topic: { ar: "تدريب الألحان القبطية", en: "Coptic hymns rehearsal" },
    icon: "choir",
    members: 54,
    onlineNow: 6,
    favorite: false,
    live: false,
    hue: "oklch(0.862 0.090 88)",
  },
  {
    id: "family",
    name: { ar: "عائلة القديس أنطونيوس", en: "St. Antony family" },
    topic: { ar: "عائلة روحية صغيرة", en: "Small spiritual family" },
    icon: "family",
    members: 18,
    onlineNow: 4,
    favorite: false,
    live: true,
    speaking: { ar: "مريم سامي", en: "Mariam Samy" },
    hue: "oklch(0.792 0.128 32)",
  },
  {
    id: "bible-study",
    name: { ar: "دراسة الكتاب المقدس", en: "Bible study" },
    topic: { ar: "سفر المزامير — أسبوعيًا", en: "Psalms — weekly" },
    icon: "book",
    members: 132,
    onlineNow: 9,
    favorite: false,
    live: false,
    hue: "oklch(0.796 0.104 176)",
  },
  {
    id: "deacons",
    name: { ar: "الشمامسة", en: "Deacons" },
    topic: { ar: "ترتيب القداسات والخدمة", en: "Liturgy & service rota" },
    icon: "shield",
    members: 41,
    onlineNow: 3,
    favorite: false,
    live: false,
    hue: "oklch(0.770 0.108 300)",
  },
];

/* ── Participants ────────────────────────────────────────── */

export type Presence = "speaking" | "listening" | "muted" | "away";

export type Member = {
  id: string;
  name: Bi;
  role: Bi;
  shield: ShieldSlug;
  presence: Presence;
  initial: string;
  tone: string;
};

export const presenceLabel: Record<Presence, Bi> = {
  speaking: { ar: "يتحدث الآن", en: "Speaking" },
  listening: { ar: "يستمع", en: "Listening" },
  muted: { ar: "الميكروفون مكتوم", en: "Muted" },
  away: { ar: "غير متفرغ", en: "Away" },
};

export const participants: Member[] = [
  {
    id: "m1",
    name: { ar: "أبونا يوساب المقاري", en: "Fr. Yousab El-Makary" },
    role: { ar: "كاهن الكنيسة", en: "Church priest" },
    shield: "priest",
    presence: "speaking",
    initial: "ي",
    tone: "oklch(0.800 0.152 158)",
  },
  {
    id: "m2",
    name: { ar: "مينا عادل", en: "Mina Adel" },
    role: { ar: "أمين الخدمة", en: "Service lead" },
    shield: "servant",
    presence: "listening",
    initial: "م",
    tone: "oklch(0.788 0.118 198)",
  },
  {
    id: "m3",
    name: { ar: "مريم سامي", en: "Mariam Samy" },
    role: { ar: "خادمة براعم", en: "Kids servant" },
    shield: "servant",
    presence: "listening",
    initial: "م",
    tone: "oklch(0.792 0.128 32)",
  },
  {
    id: "m4",
    name: { ar: "بيشوي رمزي", en: "Bishoy Ramzy" },
    role: { ar: "عضو", en: "Member" },
    shield: "member",
    presence: "muted",
    initial: "ب",
    tone: "oklch(0.780 0.120 262)",
  },
  {
    id: "m5",
    name: { ar: "كيرلس نبيل", en: "Kyrillos Nabil" },
    role: { ar: "شماس", en: "Deacon" },
    shield: "control-panel",
    presence: "away",
    initial: "ك",
    tone: "oklch(0.862 0.090 88)",
  },
  {
    id: "m6",
    name: { ar: "فيبي جورج", en: "Phoebe George" },
    role: { ar: "عضو", en: "Member" },
    shield: "member",
    presence: "listening",
    initial: "ف",
    tone: "oklch(0.796 0.104 176)",
  },
];

/* ── Recordings ──────────────────────────────────────────── */

export type Recording = {
  id: string;
  title: Bi;
  author: Bi;
  when: Bi;
  length: string;
  shield: ShieldSlug;
  /** decorative waveform heights, 0–1 */
  wave: number[];
};

const w = (seed: number) =>
  Array.from({ length: 34 }, (_, i) => 0.28 + 0.72 * Math.abs(Math.sin(seed + i * 0.7)));

export const recordings: Recording[] = [
  {
    id: "r1",
    title: { ar: "كلمة أبونا قبل القداس", en: "Father's word before liturgy" },
    author: { ar: "أبونا يوساب", en: "Fr. Yousab" },
    when: { ar: "منذ ٢٠ دقيقة", en: "20 min ago" },
    length: "1:48",
    shield: "priest",
    wave: w(1),
  },
  {
    id: "r2",
    title: { ar: "تذكير بموعد الاجتماع", en: "Meeting time reminder" },
    author: { ar: "مينا عادل", en: "Mina Adel" },
    when: { ar: "اليوم ٦:١٠ م", en: "Today 6:10 PM" },
    length: "0:36",
    shield: "servant",
    wave: w(2.4),
  },
  {
    id: "r3",
    title: { ar: "لحن «تين أوشت»", en: "Hymn: Tenoosht" },
    author: { ar: "كورال الألحان", en: "Hymns choir" },
    when: { ar: "أمس", en: "Yesterday" },
    length: "3:12",
    shield: "audio",
    wave: w(3.9),
  },
];

/* ── Messages ────────────────────────────────────────────── */

export type Thread = {
  id: string;
  name: Bi;
  preview: Bi;
  when: Bi;
  unread: number;
  shield: ShieldSlug;
  presence: Presence;
  initial: string;
  tone: string;
  voice?: boolean;
  group?: boolean;
};

export const threads: Thread[] = [
  {
    id: "t1",
    name: { ar: "أبونا يوساب المقاري", en: "Fr. Yousab El-Makary" },
    preview: { ar: "ربنا يبارك خدمتك يا ابني 🙏", en: "God bless your service 🙏" },
    when: { ar: "٧:٤٢ م", en: "7:42 PM" },
    unread: 2,
    shield: "priest",
    presence: "listening",
    initial: "ي",
    tone: "oklch(0.800 0.152 158)",
  },
  {
    id: "t2",
    name: { ar: "خدّام الأحد", en: "Sunday servants" },
    preview: { ar: "رسالة صوتية · ٠:٤٨", en: "Voice message · 0:48" },
    when: { ar: "٦:١٥ م", en: "6:15 PM" },
    unread: 5,
    shield: "servant",
    presence: "speaking",
    initial: "خ",
    tone: "oklch(0.788 0.118 198)",
    voice: true,
    group: true,
  },
  {
    id: "t3",
    name: { ar: "مريم سامي", en: "Mariam Samy" },
    preview: { ar: "أرسلت لك ترتيب فصل البراعم", en: "Sent you the kids class plan" },
    when: { ar: "أمس", en: "Yesterday" },
    unread: 0,
    shield: "servant",
    presence: "away",
    initial: "م",
    tone: "oklch(0.792 0.128 32)",
  },
  {
    id: "t4",
    name: { ar: "عائلة القديس أنطونيوس", en: "St. Antony family" },
    preview: { ar: "الاجتماع الجمعة بعد صلاة العشية", en: "Friday meeting after vespers" },
    when: { ar: "الأحد", en: "Sunday" },
    unread: 0,
    shield: "community",
    presence: "listening",
    initial: "أ",
    tone: "oklch(0.780 0.120 262)",
    group: true,
  },
  {
    id: "t5",
    name: { ar: "كيرلس نبيل", en: "Kyrillos Nabil" },
    preview: { ar: "تمام، أشوفك في التسبحة", en: "Sure, see you at praises" },
    when: { ar: "الجمعة", en: "Friday" },
    unread: 0,
    shield: "member",
    presence: "muted",
    initial: "ك",
    tone: "oklch(0.862 0.090 88)",
  },
];

export type InboxFilter = "all" | "unread" | "voice" | "groups";

export const inboxFilters: { key: InboxFilter; label: Bi }[] = [
  { key: "all", label: { ar: "الكل", en: "All" } },
  { key: "unread", label: { ar: "غير المقروء", en: "Unread" } },
  { key: "voice", label: { ar: "صوتي", en: "Voice" } },
  { key: "groups", label: { ar: "مجموعات", en: "Groups" } },
];

/* ── Notifications ───────────────────────────────────────── */

export const notifications: { id: string; text: Bi; when: Bi }[] = [
  {
    id: "n1",
    text: { ar: "أبونا يوساب بدأ بثًا في قناة الكنيسة", en: "Fr. Yousab started a broadcast in the church channel" },
    when: { ar: "الآن", en: "Now" },
  },
  {
    id: "n2",
    text: { ar: "٣ أعضاء جدد انضموا لاجتماع الشباب", en: "3 new members joined the youth meeting" },
    when: { ar: "منذ ساعة", en: "1h ago" },
  },
  {
    id: "n3",
    text: { ar: "تسجيل صوتي جديد في كورال الألحان", en: "New voice recording in the hymns choir" },
    when: { ar: "أمس", en: "Yesterday" },
  },
];

/* ── Notification audience (new-channel sheet) ───────────── */

export type Audience = "everyone" | "servants" | "priest";

export const audiences: { key: Audience; label: Bi; hint: Bi }[] = [
  {
    key: "everyone",
    label: { ar: "كل الأعضاء", en: "Everyone" },
    hint: { ar: "يصل الإشعار لكل من ينضم للقناة", en: "Notify every channel member" },
  },
  {
    key: "servants",
    label: { ar: "الخدّام فقط", en: "Servants only" },
    hint: { ar: "الإشعارات للخدّام والمسؤولين", en: "Only servants and admins" },
  },
  {
    key: "priest",
    label: { ar: "الكاهن فقط", en: "Priest only" },
    hint: { ar: "إشعار خاص للكاهن", en: "A private notice to the priest" },
  },
];

/* ── Connection quality ──────────────────────────────────── */

export const connectionStats: { key: string; label: Bi; value: Bi; level: number }[] = [
  { key: "signal", label: { ar: "قوة الإشارة", en: "Signal" }, value: { ar: "ممتازة", en: "Excellent" }, level: 0.92 },
  { key: "loss", label: { ar: "فقدان الحزم", en: "Packet loss" }, value: { ar: "٠.٤٪", en: "0.4%" }, level: 0.18 },
  { key: "ping", label: { ar: "زمن الاستجابة", en: "Ping" }, value: { ar: "٢٨ ms", en: "28 ms" }, level: 0.3 },
];

/* ── Settings groups ─────────────────────────────────────── */

export type SettingKind = "switch" | "value" | "link" | "slider";

export type SettingRow = {
  id: string;
  label: Bi;
  hint?: Bi;
  kind: SettingKind;
  on?: boolean;
  value?: Bi;
};

export type SettingGroup = {
  id: string;
  title: Bi;
  icon:
    | "appearance"
    | "ptt"
    | "audio"
    | "privacy"
    | "temporary"
    | "groups"
    | "security"
    | "storage"
    | "about";
  rows: SettingRow[];
};

export const settingGroups: SettingGroup[] = [
  {
    id: "appearance",
    title: { ar: "المظهر", en: "Appearance" },
    icon: "appearance",
    rows: [
      { id: "theme", label: { ar: "الوضع الليلي", en: "Night mode" }, kind: "switch", on: true },
      { id: "density", label: { ar: "كثافة القوائم", en: "List density" }, kind: "value", value: { ar: "مريحة", en: "Comfortable" } },
      { id: "font", label: { ar: "حجم النص", en: "Text size" }, kind: "slider" },
    ],
  },
  {
    id: "ptt",
    title: { ar: "الضغط للتحدث", en: "Push to talk" },
    icon: "ptt",
    rows: [
      { id: "hold", label: { ar: "تفعيل الضغط المطوّل", en: "Press and hold" }, kind: "switch", on: true },
      { id: "tone", label: { ar: "نغمة بداية البث", en: "Broadcast start tone" }, kind: "switch", on: true },
      { id: "vibrate", label: { ar: "اهتزاز عند التحدث", en: "Haptics while talking" }, kind: "switch", on: false },
      { id: "limit", label: { ar: "أقصى مدة للبث", en: "Max broadcast length" }, kind: "value", value: { ar: "٦٠ ثانية", en: "60 seconds" } },
    ],
  },
  {
    id: "audio",
    title: { ar: "الصوت والاتصال", en: "Audio & connection" },
    icon: "audio",
    rows: [
      { id: "noise", label: { ar: "تنقية الضجيج", en: "Noise suppression" }, kind: "switch", on: true },
      { id: "echo", label: { ar: "إلغاء الصدى", en: "Echo cancellation" }, kind: "switch", on: true },
      { id: "input", label: { ar: "مصدر الميكروفون", en: "Microphone source" }, kind: "value", value: { ar: "تلقائي", en: "Automatic" } },
      { id: "quality", label: { ar: "جودة الصوت", en: "Voice quality" }, kind: "value", value: { ar: "عالية", en: "High" } },
    ],
  },
  {
    id: "privacy",
    title: { ar: "الخصوصية", en: "Privacy" },
    icon: "privacy",
    rows: [
      { id: "who", label: { ar: "من يمكنه دعوتي", en: "Who can invite me" }, kind: "value", value: { ar: "أعضاء كنيستي", en: "My church" } },
      { id: "seen", label: { ar: "إظهار آخر ظهور", en: "Show last seen" }, kind: "switch", on: false },
      { id: "shield", label: { ar: "إظهار درعي للجميع", en: "Show my shield publicly" }, kind: "switch", on: true },
    ],
  },
  {
    id: "temporary",
    title: { ar: "الرسائل المؤقتة", en: "Temporary messages" },
    icon: "temporary",
    rows: [
      { id: "on", label: { ar: "حذف تلقائي للرسائل", en: "Auto-delete messages" }, kind: "switch", on: true },
      { id: "after", label: { ar: "بعد", en: "After" }, kind: "value", value: { ar: "٢٤ ساعة", en: "24 hours" } },
      { id: "voice", label: { ar: "يشمل الرسائل الصوتية", en: "Include voice messages" }, kind: "switch", on: false },
    ],
  },
  {
    id: "groups",
    title: { ar: "المجموعات", en: "Groups" },
    icon: "groups",
    rows: [
      { id: "add", label: { ar: "من يضيفني للمجموعات", en: "Who can add me to groups" }, kind: "value", value: { ar: "الخدّام", en: "Servants" } },
      { id: "mentions", label: { ar: "تنبيه عند الإشارة إليّ", en: "Alert on mentions" }, kind: "switch", on: true },
    ],
  },
  {
    id: "security",
    title: { ar: "الأمان", en: "Security" },
    icon: "security",
    rows: [
      { id: "lock", label: { ar: "قفل التطبيق", en: "App lock" }, kind: "switch", on: true },
      { id: "e2e", label: { ar: "تشفير المحادثات", en: "Encrypted conversations" }, kind: "switch", on: true },
      { id: "devices", label: { ar: "الأجهزة المرتبطة", en: "Linked devices" }, kind: "link", value: { ar: "جهازان", en: "2 devices" } },
    ],
  },
  {
    id: "storage",
    title: { ar: "التخزين", en: "Storage" },
    icon: "storage",
    rows: [
      { id: "media", label: { ar: "التسجيلات المحفوظة", en: "Saved recordings" }, kind: "link", value: { ar: "١٤٢ ميجا", en: "142 MB" } },
      { id: "cache", label: { ar: "تفريغ الذاكرة المؤقتة", en: "Clear cache" }, kind: "link" },
    ],
  },
  {
    id: "about",
    title: { ar: "عن ألفا كونكت", en: "About Alpha Connect" },
    icon: "about",
    rows: [
      { id: "ver", label: { ar: "الإصدار", en: "Version" }, kind: "value", value: { ar: "١.٠ · ألفا", en: "1.0 · Alpha" } },
      { id: "terms", label: { ar: "الشروط والخصوصية", en: "Terms & privacy" }, kind: "link" },
    ],
  },
];
