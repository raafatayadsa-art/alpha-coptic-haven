import antonyIcon from "@/assets/fathers-icon-antony.jpg";
import athanasiusIcon from "@/assets/fathers-icon-athanasius.jpg";
import macariusIcon from "@/assets/fathers-icon-macarius.jpg";

/**
 * «قسم الآباء» — Desert Scriptorium.
 * Static bilingual prototype content only (no backend).
 */

export type Lang = "ar" | "en";
export type Bi = { ar: string; en: string };

export const pick = (v: Bi, lang: Lang) => (lang === "ar" ? v.ar : v.en);

export const L = {
  title: { ar: "قسم الآباء", en: "The Fathers" },
  eyebrow: { ar: "مكتبة آبائية", en: "Patristic Library" },
  heroTitle: { ar: "تراث الآباء بين يديك", en: "The heritage of the Fathers" },
  heroLine: {
    ar: "أقوال وكتابات وتعاليم آباء الكنيسة القبطية — مرتّبة لتقرأها بهدوء.",
    en: "Sayings, writings and teachings of the Coptic Fathers — arranged for quiet reading.",
  },
  fathers: { ar: "أبًا", en: "Fathers" },
  sayings: { ar: "قولًا", en: "Sayings" },
  books: { ar: "كتابًا", en: "Books" },
  fatherOfDay: { ar: "أب اليوم", en: "Father of the Day" },
  explore: { ar: "استكشاف الآباء", en: "Explore the Fathers" },
  sayingsTitle: { ar: "أقوال الآباء", en: "Sayings of the Fathers" },
  topics: { ar: "موضوعات روحية", en: "Spiritual Topics" },
  library: { ar: "المكتبة الآبائية", en: "The Patristic Library" },
  searchFather: { ar: "ابحث حسب الأب", en: "Search by Father" },
  searchTopic: { ar: "ابحث حسب الموضوع", en: "Search by topic" },
  searchPlaceholder: { ar: "اسم أب، كتاب، أو موضوع…", en: "A father, a book, or a topic…" },
  readLife: { ar: "اقرأ التعليم", en: "Read teaching" },
  readMore: { ar: "اقرأ المزيد", en: "Read more" },
  all: { ar: "الكل", en: "All" },
  save: { ar: "احفظ", en: "Save" },
  share: { ar: "انشر", en: "Share" },
  like: { ar: "إعجاب", en: "Like" },
  minutes: { ar: "دقيقة", en: "min" },
  entries: { ar: "مادة", en: "entries" },
  viewAll: { ar: "الكل", en: "See all" },
};

/* ---------------- Eras ---------------- */

export type EraKey = "all" | "desert" | "theologians" | "patriarchs" | "modern";

export const eras: EraKey[] = ["all", "desert", "theologians", "patriarchs", "modern"];

export const eraLabel: Record<EraKey, Bi> = {
  all: L.all,
  desert: { ar: "آباء البرّية", en: "Desert" },
  theologians: { ar: "اللاهوتيون", en: "Theologians" },
  patriarchs: { ar: "البطاركة", en: "Patriarchs" },
  modern: { ar: "آباء معاصرون", en: "Modern" },
};

export const eraHue: Record<Exclude<EraKey, "all">, { hue: string; hue2: string }> = {
  desert: { hue: "oklch(0.402 0.062 52)", hue2: "oklch(0.862 0.088 88)" },
  theologians: { hue: "oklch(0.372 0.058 232)", hue2: "oklch(0.792 0.076 224)" },
  patriarchs: { hue: "oklch(0.372 0.086 24)", hue2: "oklch(0.802 0.086 42)" },
  modern: { hue: "oklch(0.362 0.056 156)", hue2: "oklch(0.762 0.070 156)" },
};

/* ---------------- Fathers ---------------- */

export type Father = {
  id: string;
  name: Bi;
  epithet: Bi;
  era: Exclude<EraKey, "all">;
  years: Bi;
  monogram: string;
  image?: string;
  works: number;
  sayings: number;
  excerpt: Bi;
};

export const fathers: Father[] = [
  {
    id: "antony",
    name: { ar: "الأنبا أنطونيوس", en: "St. Antony the Great" },
    epithet: { ar: "أب جميع الرهبان", en: "Father of all monks" },
    era: "desert",
    years: { ar: "251 — 356 م", en: "251 — 356 AD" },
    monogram: "ⲁ",
    image: antonyIcon,
    works: 8,
    sayings: 126,
    excerpt: {
      ar: "أوّل من سكن قلب البرّية، وعلّم أن السلام الداخلي هو أوّل ثمار الصلاة.",
      en: "The first to dwell in the heart of the desert, teaching that inner peace is prayer's first fruit.",
    },
  },
  {
    id: "athanasius",
    name: { ar: "البابا أثناسيوس الرسولي", en: "St. Athanasius the Apostolic" },
    epithet: { ar: "حامي الإيمان", en: "Defender of the faith" },
    era: "theologians",
    years: { ar: "296 — 373 م", en: "296 — 373 AD" },
    monogram: "ⲑ",
    image: athanasiusIcon,
    works: 14,
    sayings: 88,
    excerpt: {
      ar: "كتب «تجسّد الكلمة» وحفظ للكنيسة إيمانها في زمن الاضطراب.",
      en: "Author of On the Incarnation, who guarded the Church's faith in a turbulent age.",
    },
  },
  {
    id: "macarius",
    name: { ar: "الأنبا مقاريوس الكبير", en: "St. Macarius the Great" },
    epithet: { ar: "أب شيهيت", en: "Father of Scetis" },
    era: "desert",
    years: { ar: "300 — 391 م", en: "300 — 391 AD" },
    monogram: "ⲙ",
    image: macariusIcon,
    works: 6,
    sayings: 141,
    excerpt: {
      ar: "معلّم صلاة القلب، وأبو وادي النطرون الذي جمع النفوس حول الهدوء.",
      en: "Teacher of the prayer of the heart and father of Scetis, gathering souls into stillness.",
    },
  },
  {
    id: "cyril",
    name: { ar: "البابا كيرلس الكبير", en: "St. Cyril the Great" },
    epithet: { ar: "عمود الدين", en: "Pillar of the faith" },
    era: "patriarchs",
    years: { ar: "376 — 444 م", en: "376 — 444 AD" },
    monogram: "ⲕ",
    works: 22,
    sayings: 64,
    excerpt: {
      ar: "شارح سرّ التجسّد ومدافع عن أمّنا العذراء «والدة الإله».",
      en: "Expositor of the Incarnation and defender of the Theotokos.",
    },
  },
  {
    id: "shenouda",
    name: { ar: "الأنبا شنودة رئيس المتوحدين", en: "St. Shenouda the Archimandrite" },
    epithet: { ar: "أسد البرّية", en: "Lion of the desert" },
    era: "desert",
    years: { ar: "348 — 466 م", en: "348 — 466 AD" },
    monogram: "ϣ",
    works: 11,
    sayings: 73,
    excerpt: {
      ar: "أعظم كاتب بالقبطية، ونظّم حياة الشركة الرهبانية في الدير الأبيض.",
      en: "The greatest Coptic author, who ordered communal monastic life at the White Monastery.",
    },
  },
  {
    id: "kyrillos6",
    name: { ar: "البابا كيرلس السادس", en: "Pope Kyrillos VI" },
    epithet: { ar: "أب الصلاة", en: "Father of prayer" },
    era: "modern",
    years: { ar: "1902 — 1971 م", en: "1902 — 1971" },
    monogram: "ⲋ",
    works: 5,
    sayings: 58,
    excerpt: {
      ar: "ناسك القرن العشرين الذي علّم أنّ القدّاس هو مركز الحياة كلها.",
      en: "The hermit of the twentieth century, who taught the Liturgy as the centre of all life.",
    },
  },
];

/* ---------------- Sayings ---------------- */

export type Saying = {
  id: string;
  text: Bi;
  author: Bi;
  topic: Bi;
  hue: string;
};

export const sayings: Saying[] = [
  {
    id: "s1",
    text: {
      ar: "لا تخف من الجهاد، بل خف من أن تتوقّف عنه.",
      en: "Do not fear the struggle; fear only ceasing from it.",
    },
    author: { ar: "الأنبا أنطونيوس", en: "St. Antony" },
    topic: { ar: "الجهاد", en: "Struggle" },
    hue: "oklch(0.402 0.062 52)",
  },
  {
    id: "s2",
    text: {
      ar: "الصلاة ليست كلامًا كثيرًا، بل قلبًا حاضرًا.",
      en: "Prayer is not many words, but a heart that is present.",
    },
    author: { ar: "الأنبا مقاريوس", en: "St. Macarius" },
    topic: { ar: "الصلاة", en: "Prayer" },
    hue: "oklch(0.372 0.058 232)",
  },
  {
    id: "s3",
    text: {
      ar: "صار الكلمة إنسانًا لكي نصير نحن أبناء الله.",
      en: "The Word became man so that we might become sons of God.",
    },
    author: { ar: "البابا أثناسيوس", en: "St. Athanasius" },
    topic: { ar: "التجسّد", en: "Incarnation" },
    hue: "oklch(0.372 0.086 24)",
  },
  {
    id: "s4",
    text: {
      ar: "إن أردت أن تعرف الله، فاسكت قليلًا واسمعه في داخلك.",
      en: "If you would know God, be silent a while and hear Him within.",
    },
    author: { ar: "البابا كيرلس السادس", en: "Pope Kyrillos VI" },
    topic: { ar: "الهدوء", en: "Stillness" },
    hue: "oklch(0.362 0.056 156)",
  },
];

/* ---------------- Topics ---------------- */

export type Topic = { id: string; label: Bi; count: number; glyph: string };

export const topics: Topic[] = [
  { id: "prayer", label: { ar: "الصلاة", en: "Prayer" }, count: 212, glyph: "ⲡ" },
  { id: "humility", label: { ar: "التواضع", en: "Humility" }, count: 148, glyph: "ⲧ" },
  { id: "repentance", label: { ar: "التوبة", en: "Repentance" }, count: 131, glyph: "ⲣ" },
  { id: "love", label: { ar: "المحبة", en: "Love" }, count: 176, glyph: "ⲁ" },
  { id: "silence", label: { ar: "الهدوء", en: "Silence" }, count: 94, glyph: "ⲥ" },
  { id: "fasting", label: { ar: "الصوم", en: "Fasting" }, count: 87, glyph: "ⲛ" },
  { id: "eucharist", label: { ar: "الإفخارستيا", en: "Eucharist" }, count: 69, glyph: "ⲉ" },
  { id: "patience", label: { ar: "طول الأناة", en: "Patience" }, count: 102, glyph: "ⲱ" },
];

/* ---------------- Library shelves ---------------- */

export type ShelfKey = "writings" | "homilies" | "commentaries";

export const shelves: ShelfKey[] = ["writings", "homilies", "commentaries"];

export const shelfLabel: Record<ShelfKey, Bi> = {
  writings: { ar: "الكتابات والكتب", en: "Writings & Books" },
  homilies: { ar: "العظات والرسائل", en: "Homilies & Letters" },
  commentaries: { ar: "التفاسير والتأملات", en: "Commentary & Reflection" },
};

export type LibraryItem = {
  id: string;
  title: Bi;
  author: Bi;
  meta: Bi;
  minutes: number;
  shelf: ShelfKey;
};

export const libraryItems: LibraryItem[] = [
  {
    id: "l1",
    title: { ar: "تجسّد الكلمة", en: "On the Incarnation" },
    author: { ar: "البابا أثناسيوس الرسولي", en: "St. Athanasius" },
    meta: { ar: "57 فصلًا", en: "57 chapters" },
    minutes: 180,
    shelf: "writings",
  },
  {
    id: "l2",
    title: { ar: "بستان الرهبان", en: "The Paradise of the Fathers" },
    author: { ar: "آباء البرّية", en: "The Desert Fathers" },
    meta: { ar: "400 قول", en: "400 sayings" },
    minutes: 240,
    shelf: "writings",
  },
  {
    id: "l3",
    title: { ar: "قوانين الأنبا شنودة", en: "The Canons of St. Shenouda" },
    author: { ar: "الأنبا شنودة", en: "St. Shenouda" },
    meta: { ar: "9 أجزاء", en: "9 parts" },
    minutes: 150,
    shelf: "writings",
  },
  {
    id: "l4",
    title: { ar: "عظات عن الصلاة الدائمة", en: "Homilies on Unceasing Prayer" },
    author: { ar: "الأنبا مقاريوس الكبير", en: "St. Macarius" },
    meta: { ar: "12 عظة", en: "12 homilies" },
    minutes: 95,
    shelf: "homilies",
  },
  {
    id: "l5",
    title: { ar: "رسائل الفصح", en: "The Festal Letters" },
    author: { ar: "البابا أثناسيوس الرسولي", en: "St. Athanasius" },
    meta: { ar: "20 رسالة", en: "20 letters" },
    minutes: 120,
    shelf: "homilies",
  },
  {
    id: "l6",
    title: { ar: "تفسير إنجيل يوحنا", en: "Commentary on John" },
    author: { ar: "البابا كيرلس الكبير", en: "St. Cyril the Great" },
    meta: { ar: "12 سفرًا", en: "12 books" },
    minutes: 300,
    shelf: "commentaries",
  },
  {
    id: "l7",
    title: { ar: "تأملات في المزامير", en: "Reflections on the Psalms" },
    author: { ar: "آباء الإسكندرية", en: "The Alexandrian Fathers" },
    meta: { ar: "50 تأملًا", en: "50 reflections" },
    minutes: 140,
    shelf: "commentaries",
  },
];

/* ---------------- Father of the day ---------------- */

export const fatherOfDay = {
  father: fathers[0]!,
  saying: sayings[0]!,
  feast: { ar: "22 طوبة — تذكار نياحته", en: "22 Tobi — his departure" },
};
