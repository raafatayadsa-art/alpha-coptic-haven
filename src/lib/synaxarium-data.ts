/**
 * Synaxarium (سنكسار) — presentation-only content for the Alpha prototype.
 * Bilingual strings live here so the screens stay purely visual.
 * No logic, no fetching, no persistence.
 */

import synaxMartyr from "@/assets/synax-martyr.jpg";
import synaxSaint from "@/assets/synax-saint.jpg";
import synaxVirgin from "@/assets/synax-virgin.jpg";

export type Bi = { ar: string; en: string };
export type Lang = "ar" | "en";

export const pick = (v: Bi, lang: Lang) => (lang === "ar" ? v.ar : v.en);

/* ── Categories ─────────────────────────────────────────── */

export type CategoryKey = "all" | "martyrs" | "monks" | "patriarchs" | "virgins" | "feasts";

export const categories: { key: CategoryKey; label: Bi }[] = [
  { key: "all", label: { ar: "الكل", en: "All" } },
  { key: "martyrs", label: { ar: "شهداء", en: "Martyrs" } },
  { key: "monks", label: { ar: "رهبان ونساك", en: "Monastics" } },
  { key: "patriarchs", label: { ar: "بطاركة وأساقفة", en: "Patriarchs" } },
  { key: "virgins", label: { ar: "قديسات", en: "Holy women" } },
  { key: "feasts", label: { ar: "تذكارات وأعياد", en: "Commemorations" } },
];

export const categoryHue: Record<Exclude<CategoryKey, "all">, { hue: string; hue2: string }> = {
  martyrs: { hue: "oklch(0.512 0.148 26)", hue2: "oklch(0.824 0.092 42)" },
  monks: { hue: "oklch(0.420 0.074 158)", hue2: "oklch(0.836 0.074 150)" },
  patriarchs: { hue: "oklch(0.470 0.098 292)", hue2: "oklch(0.828 0.076 296)" },
  virgins: { hue: "oklch(0.500 0.098 258)", hue2: "oklch(0.830 0.074 254)" },
  feasts: { hue: "oklch(0.560 0.116 78)", hue2: "oklch(0.882 0.086 88)" },
};

export const categoryLabel: Record<Exclude<CategoryKey, "all">, Bi> = {
  martyrs: { ar: "شهيد", en: "Martyr" },
  monks: { ar: "راهب", en: "Monastic" },
  patriarchs: { ar: "بطريرك", en: "Patriarch" },
  virgins: { ar: "قديسة", en: "Holy woman" },
  feasts: { ar: "تذكار", en: "Commemoration" },
};

/* ── Coptic date ────────────────────────────────────────── */

export const copticToday = {
  day: { ar: "8", en: "8" },
  month: { ar: "مسرى", en: "Mesra" },
  year: { ar: "1742 ش", en: "1742 A.M." },
  gregorian: { ar: "14 أغسطس", en: "August 14" },
  season: { ar: "زمن الصيف · بعد العنصرة", en: "Summer · after Pentecost" },
};

export const copticMonths: Bi[] = [
  { ar: "توت", en: "Tout" },
  { ar: "بابه", en: "Baba" },
  { ar: "هاتور", en: "Hator" },
  { ar: "كيهك", en: "Kiahk" },
  { ar: "طوبه", en: "Toba" },
  { ar: "أمشير", en: "Amshir" },
  { ar: "برمهات", en: "Baramhat" },
  { ar: "برموده", en: "Baramouda" },
  { ar: "بشنس", en: "Bashans" },
  { ar: "بؤونه", en: "Paona" },
  { ar: "أبيب", en: "Epip" },
  { ar: "مسرى", en: "Mesra" },
  { ar: "النسي", en: "Nasie" },
];

/** Ten-day strip around today inside the current Coptic month. */
export const dayStrip: { day: Bi; weekday: Bi; count: number; today?: boolean }[] = [
  { day: { ar: "4", en: "4" }, weekday: { ar: "أحد", en: "Sun" }, count: 6 },
  { day: { ar: "5", en: "5" }, weekday: { ar: "إثنين", en: "Mon" }, count: 4 },
  { day: { ar: "6", en: "6" }, weekday: { ar: "ثلاثاء", en: "Tue" }, count: 7 },
  { day: { ar: "7", en: "7" }, weekday: { ar: "أربعاء", en: "Wed" }, count: 5 },
  { day: { ar: "8", en: "8" }, weekday: { ar: "خميس", en: "Thu" }, count: 9, today: true },
  { day: { ar: "9", en: "9" }, weekday: { ar: "جمعة", en: "Fri" }, count: 3 },
  { day: { ar: "10", en: "10" }, weekday: { ar: "سبت", en: "Sat" }, count: 6 },
  { day: { ar: "11", en: "11" }, weekday: { ar: "أحد", en: "Sun" }, count: 4 },
  { day: { ar: "12", en: "12" }, weekday: { ar: "إثنين", en: "Mon" }, count: 8 },
  { day: { ar: "13", en: "13" }, weekday: { ar: "ثلاثاء", en: "Tue" }, count: 5 },
];

/* ── Saints ─────────────────────────────────────────────── */

export type Saint = {
  id: string;
  name: Bi;
  title: Bi;
  category: Exclude<CategoryKey, "all">;
  copticDate: Bi;
  era: Bi;
  place: Bi;
  minutes: number;
  image?: string;
  monogram: string;
  excerpt: Bi;
  quote?: Bi;
};

export const saintOfDay: Saint & { life: Bi[]; virtues: Bi[]; milestones: { label: Bi; value: Bi }[] } = {
  id: "eleazar",
  name: { ar: "القدّيس أليعازر وسالومي وأولادهما", en: "St. Eleazar, Salome and their sons" },
  title: { ar: "الشهداء التسعة", en: "The nine martyrs" },
  category: "martyrs",
  copticDate: { ar: "8 مسرى", en: "8 Mesra" },
  era: { ar: "القرن الثاني ق.م.", en: "2nd century B.C." },
  place: { ar: "أنطاكية", en: "Antioch" },
  minutes: 4,
  image: synaxMartyr,
  monogram: "ⲁ",
  excerpt: {
    ar: "في مثل هذا اليوم استشهد أليعازر الشيخ وزوجته سالومي وأولادهما السبعة، فنالوا جميعًا إكليل الشهادة.",
    en: "On this day Eleazar the elder, his wife Salome and their seven sons were martyred, and all received the crown.",
  },
  quote: {
    ar: "«صلاتهم المقدّسة تكون معنا، آمين.»",
    en: "“May their holy prayers be with us. Amen.”",
  },
  life: [
    {
      ar: "كان أليعازر أحد معلّمي الشريعة، وكان أبوه واحدًا من السبعين شيخًا الذين ترجموا التوراة. أدّب أولاده بعلوم الشريعة وربّاهم في مخافة الله.",
      en: "Eleazar was a teacher of the Law; his father was one of the seventy elders who translated the Torah. He raised his sons in the Scriptures and in the fear of God.",
    },
    {
      ar: "ولمّا أراد الملك أن يحوّلهم عن عبادة الله، ثبتوا في الإيمان ولم يخافوا سطوته، فعُذّبوا بالضرب والحرق والصلب واحدًا بعد الآخر.",
      en: "When the king sought to turn them from the worship of God they stood firm, unafraid of his power, and were tortured one after another.",
    },
    {
      ar: "وكانت سالومي البارّة تشجّعهم حتى تنيّحوا جميعًا، ثم ألقت هي نفسها في النار، فنال الجميع إكليل الشهادة.",
      en: "Salome encouraged them until they all reposed, then gave herself to the fire, and all received the crown of martyrdom.",
    },
  ],
  virtues: [
    { ar: "الثبات في الإيمان", en: "Steadfast faith" },
    { ar: "تربية الأولاد", en: "Godly upbringing" },
    { ar: "الشجاعة حتى الموت", en: "Courage unto death" },
  ],
  milestones: [
    { label: { ar: "الميلاد", en: "Birth" }, value: { ar: "أنطاكية", en: "Antioch" } },
    { label: { ar: "الخدمة", en: "Service" }, value: { ar: "معلّم للشريعة", en: "Teacher of the Law" } },
    { label: { ar: "الشهادة", en: "Martyrdom" }, value: { ar: "8 مسرى", en: "8 Mesra" } },
  ],
};

export const todaySaints: Saint[] = [
  {
    id: "abba-bishoy",
    name: { ar: "الأنبا بيشوي", en: "St. Abba Bishoy" },
    title: { ar: "حبيب مخلّصنا الصالح", en: "The beloved of our Good Saviour" },
    category: "monks",
    copticDate: { ar: "8 مسرى", en: "8 Mesra" },
    era: { ar: "القرن الرابع", en: "4th century" },
    place: { ar: "وادي النطرون", en: "Scetis" },
    minutes: 3,
    image: synaxSaint,
    monogram: "ⲃ",
    excerpt: {
      ar: "نسك في جبل شيهيت أربعين سنة، وحمل المسيح على كتفيه في هيئة غريب.",
      en: "He ascetically laboured in Scetis forty years, and carried Christ on his shoulders in the form of a stranger.",
    },
  },
  {
    id: "st-marina",
    name: { ar: "القدّيسة مارينا", en: "St. Marina" },
    title: { ar: "الشهيدة الناسكة", en: "The ascetic martyr" },
    category: "virgins",
    copticDate: { ar: "8 مسرى", en: "8 Mesra" },
    era: { ar: "القرن الثالث", en: "3rd century" },
    place: { ar: "أنطاكية", en: "Antioch" },
    minutes: 3,
    image: synaxVirgin,
    monogram: "ⲙ",
    excerpt: {
      ar: "احتملت العذابات من أجل اسم المسيح، وصارت مثالًا للطهارة والاحتمال.",
      en: "She endured torments for the name of Christ and became a model of purity and patience.",
    },
  },
  {
    id: "anba-yoannis",
    name: { ar: "البابا يوأنس", en: "Pope Yoannis" },
    title: { ar: "الأب البطريرك", en: "The patriarch" },
    category: "patriarchs",
    copticDate: { ar: "8 مسرى", en: "8 Mesra" },
    era: { ar: "القرن الثاني عشر", en: "12th century" },
    place: { ar: "الإسكندرية", en: "Alexandria" },
    minutes: 2,
    monogram: "ⲓ",
    excerpt: {
      ar: "رعى شعبه بالتعليم والصلاة، وثبّت الكنيسة في زمن ضيق.",
      en: "He shepherded his people with teaching and prayer, strengthening the Church in a time of distress.",
    },
  },
  {
    id: "consecration-church",
    name: { ar: "تذكار تكريس كنيسة القدّيسة دميانة", en: "Consecration of St. Demiana’s church" },
    title: { ar: "تذكار كنسي", en: "Church commemoration" },
    category: "feasts",
    copticDate: { ar: "8 مسرى", en: "8 Mesra" },
    era: { ar: "القرن الرابع", en: "4th century" },
    place: { ar: "برية الزعفران", en: "Zaafarana" },
    minutes: 2,
    monogram: "ⲇ",
    excerpt: {
      ar: "تذكار تكريس الكنيسة التي بُنيت على اسمها مع الأربعين عذراء.",
      en: "The commemoration of the church built in her name with the forty virgins.",
    },
  },
];

/* ── Monthly feasts & seasons ───────────────────────────── */

export const monthFeasts: { day: Bi; name: Bi; kind: Bi }[] = [
  { day: { ar: "16 مسرى", en: "16 Mesra" }, name: { ar: "صوم العذراء", en: "Fast of the Virgin" }, kind: { ar: "صوم", en: "Fast" } },
  { day: { ar: "22 مسرى", en: "22 Mesra" }, name: { ar: "نياحة العذراء مريم", en: "Departure of St. Mary" }, kind: { ar: "عيد سيدي", en: "Major feast" } },
  { day: { ar: "26 مسرى", en: "26 Mesra" }, name: { ar: "تذكار الشهيد أبانوب", en: "St. Abanoub the martyr" }, kind: { ar: "تذكار", en: "Commemoration" } },
];

/* ── Discovery collections ──────────────────────────────── */

export const collections: { id: string; title: Bi; caption: Bi; count: number; monogram: string; category: Exclude<CategoryKey, "all"> }[] = [
  { id: "c-martyrs", title: { ar: "شهداء الكنيسة", en: "Martyrs of the Church" }, caption: { ar: "سير الشهداء عبر العصور", en: "Lives across the ages" }, count: 148, monogram: "ⲡ", category: "martyrs" },
  { id: "c-desert", title: { ar: "آباء البرية", en: "Desert fathers" }, caption: { ar: "نسّاك ورهبان", en: "Ascetics and monks" }, count: 96, monogram: "ⲟ", category: "monks" },
  { id: "c-popes", title: { ar: "بطاركة الكرازة", en: "Patriarchs of the See" }, caption: { ar: "من مارمرقس إلى اليوم", en: "From St. Mark onward" }, count: 118, monogram: "ⲥ", category: "patriarchs" },
  { id: "c-women", title: { ar: "قديسات وشهيدات", en: "Holy women" }, caption: { ar: "طهارة واحتمال", en: "Purity and patience" }, count: 62, monogram: "ⲱ", category: "virgins" },
];

/* ── Static UI strings for the Synaxarium screens ───────── */

export const L = {
  title: { ar: "السنكسار", en: "The Synaxarium" },
  tagline: { ar: "سير القديسين وتذكارات الكنيسة", en: "Lives of the saints & commemorations" },
  heroAlt: { ar: "أيقونات مذهّبة على حجاب الهيكل مع شموع", en: "Gilded icons on the iconostasis with candles" },
  search: { ar: "ابحث عن قدّيس أو تذكار", en: "Search a saint or commemoration" },
  saintOfDay: { ar: "قدّيس اليوم", en: "Saint of the day" },
  readLife: { ar: "اقرأ السيرة", en: "Read the life" },
  todayCommemorations: { ar: "تذكارات اليوم", en: "Today’s commemorations" },
  todayCount: { ar: "9 تذكارات", en: "9 commemorations" },
  days: { ar: "أيام الشهر القبطي", en: "Days of the Coptic month" },
  browseMonths: { ar: "تصفّح الشهور", en: "Browse the months" },
  monthFeasts: { ar: "أعياد وتذكارات الشهر", en: "Feasts of the month" },
  collectionsTitle: { ar: "مجموعات السير", en: "Collections" },
  viewAll: { ar: "الكل", en: "All" },
  minutes: { ar: "دقائق قراءة", en: "min read" },
  commemorations: { ar: "تذكار", en: "entries" },
  life: { ar: "السيرة", en: "The life" },
  virtues: { ar: "فضائله", en: "Virtues" },
  milestones: { ar: "محطات من حياته", en: "Milestones" },
  era: { ar: "العصر", en: "Era" },
  place: { ar: "مكان الخدمة", en: "Place" },
  kind: { ar: "النوع", en: "Kind" },
  feast: { ar: "التذكار", en: "Feast" },
  save: { ar: "حفظ", en: "Save" },
  share: { ar: "مشاركة", en: "Share" },
  listen: { ar: "استماع", en: "Listen" },
  like: { ar: "إعجاب", en: "Like" },
  liked: { ar: "أعجبني", en: "Liked" },
  publish: { ar: "نشر", en: "Share" },
  dayTitle: { ar: "تذكارات اليوم", en: "Day commemorations" },
  footer: { ar: "«اذكروا مرشديكم الذين كلّموكم بكلمة الله»", en: "“Remember those who spoke the word of God to you”" },
  searchTitle: { ar: "بحث السنكسار", en: "Search the Synaxarium" },
  searchHint: { ar: "اكتب اسم قدّيس، أو يومًا قبطيًا، أو تذكارًا", en: "Type a saint, a Coptic day, or a commemoration" },
  recent: { ar: "بحث حديث", en: "Recent" },
  suggested: { ar: "مقترح للاكتشاف", en: "Suggested" },
  monthsTitle: { ar: "الشهور القبطية", en: "Coptic months" },
  monthsHint: { ar: "اختر شهرًا لتصفّح تذكاراته", en: "Choose a month to browse its commemorations" },
} satisfies Record<string, Bi>;

export const recentSearches: Bi[] = [
  { ar: "الأنبا أنطونيوس", en: "St. Antony" },
  { ar: "مارمرقس الرسول", en: "St. Mark the Apostle" },
  { ar: "22 مسرى", en: "22 Mesra" },
  { ar: "الشهيد مارجرجس", en: "St. George" },
];
