import filmDavid from "@/assets/kids/kids-film-david.jpg";
import filmJonah from "@/assets/kids/kids-film-jonah.jpg";
import filmNoah from "@/assets/kids/kids-film-noah.jpg";
import saintIcon from "@/assets/kids/kids-saint.jpg";
import storyShepherd from "@/assets/kids/kids-story-shepherd.jpg";

/**
 * «Alpha Kids» — Storybook Meadow.
 * Static bilingual prototype content only (no backend).
 */

export type Lang = "ar" | "en";
export type Bi = { ar: string; en: string };

export const pick = (v: Bi, lang: Lang) => (lang === "ar" ? v.ar : v.en);

export const L = {
  title: { ar: "ألفا كيدز", en: "Alpha Kids" },
  eyebrow: { ar: "عالم الأطفال", en: "A world for kids" },
  heroTitle: { ar: "أهلاً بيك في عالمك!", en: "Welcome to your world!" },
  heroLine: {
    ar: "قصص وأفلام وترانيم وألعاب — كل حاجة حلوة عن يسوع في مكان واحد.",
    en: "Stories, films, songs and games — everything about Jesus in one happy place.",
  },
  heroCta: { ar: "ابدأ قصة اليوم", en: "Start today's story" },
  ageTitle: { ar: "المحتوى على مقاسك", en: "Pick your age" },
  ages: {
    buds: { ar: "براعم", en: "Buds" },
    kids: { ar: "أطفال", en: "Kids" },
    big: { ar: "أكبر سنًا", en: "Older" },
  },
  ageYears: {
    buds: { ar: "٣ – ٥ سنين", en: "3 – 5 yrs" },
    kids: { ar: "٦ – ٩ سنين", en: "6 – 9 yrs" },
    big: { ar: "١٠ – ١٣ سنة", en: "10 – 13 yrs" },
  },
  storyOfDay: { ar: "قصة اليوم", en: "Story of the Day" },
  listen: { ar: "اسمعها", en: "Listen" },
  read: { ar: "اقرأها", en: "Read it" },
  filmsTitle: { ar: "أفلام وقصص الكتاب المقدس", en: "Bible Films & Stories" },
  filmsLine: {
    ar: "أفلام قصيرة مرسومة من قصص الكتاب المقدس.",
    en: "Short animated films from the Bible.",
  },
  watch: { ar: "شاهد الفيلم", en: "Watch" },
  minutes: { ar: "دقيقة", en: "min" },
  verseTitle: { ar: "آية اليوم", en: "Verse of the Day" },
  verseCta: { ar: "احفظها معايا", en: "Learn it with me" },
  saintsTitle: { ar: "قصص القديسين", en: "Saints & Heroes" },
  saintsLine: {
    ar: "أصحاب شجعان أحبّوا الله.",
    en: "Brave friends who loved God.",
  },
  playTitle: { ar: "العب واتعلم", en: "Play & Learn" },
  hymnsTitle: { ar: "ترانيم وأناشيد", en: "Songs & Hymns" },
  challengeTitle: { ar: "تحدي الأسبوع", en: "This Week's Challenge" },
  challengeLine: {
    ar: "٣ مهام صغيرة تخلّص فيها نجمة ذهبية.",
    en: "Three small missions, one golden star.",
  },
  progress: { ar: "نجومك", en: "Your stars" },
  searchPlaceholder: { ar: "قصة، ترنيمة، أو لعبة…", en: "A story, a song, or a game…" },
  storiesCount: { ar: "قصة", en: "Stories" },
  filmsCount: { ar: "فيلم", en: "Films" },
  songsCount: { ar: "ترنيمة", en: "Songs" },
  new: { ar: "جديد", en: "New" },
  soon: { ar: "قريبًا", en: "Soon" },
  seeAll: { ar: "شوف الكل", en: "See all" },
  safe: { ar: "محتوى آمن ومراجع للأطفال", en: "Safe, reviewed content for children" },
} as const;

export type AgeKey = "buds" | "kids" | "big";
export const ages: AgeKey[] = ["buds", "kids", "big"];

export const ageHue: Record<AgeKey, string> = {
  buds: "var(--kd-mint)",
  kids: "var(--kd-sky)",
  big: "var(--kd-grape)",
};

/* ── Story of the day ───────────────────────────── */
export const storyOfDay = {
  image: storyShepherd,
  badge: { ar: "قصة اليوم", en: "Today's story" },
  title: { ar: "الراعي الصالح", en: "The Good Shepherd" },
  line: {
    ar: "خروف صغير تاه… فسابَ الراعي المية والتسعة وتسعين وجري يدوّر عليه.",
    en: "One little lamb was lost… so the shepherd left the ninety-nine and went to find it.",
  },
  minutes: { ar: "٤", en: "4" },
};

/* ── Animated films ─────────────────────────────── */
export type Film = {
  id: string;
  image: string;
  title: Bi;
  line: Bi;
  minutes: Bi;
  hue: string;
  flag?: "new" | "soon";
};

export const films: Film[] = [
  {
    id: "noah",
    image: filmNoah,
    title: { ar: "سفينة نوح", en: "Noah's Ark" },
    line: { ar: "حيوانات وقوس قزح ووعد كبير.", en: "Animals, a rainbow, a big promise." },
    minutes: { ar: "٧", en: "7" },
    hue: "var(--kd-sky)",
    flag: "new",
  },
  {
    id: "david",
    image: filmDavid,
    title: { ar: "داود والعملاق", en: "David & the Giant" },
    line: { ar: "ولد صغير وقلب شجاع.", en: "A small boy with a brave heart." },
    minutes: { ar: "٦", en: "6" },
    hue: "var(--kd-honey)",
  },
  {
    id: "jonah",
    image: filmJonah,
    title: { ar: "يونان والحوت", en: "Jonah & the Whale" },
    line: { ar: "رحلة في البحر وفرصة تانية.", en: "A sea journey and a second chance." },
    minutes: { ar: "٨", en: "8" },
    hue: "var(--kd-grape)",
  },
];

/* ── Verse of the day ───────────────────────────── */
export const verseOfDay = {
  text: {
    ar: "«اَلرَّبُّ رَاعِيَّ فَلَا يُعْوِزُنِي شَيْءٌ»",
    en: "“The Lord is my shepherd; I shall not want.”",
  },
  ref: { ar: "مزمور ٢٣ : ١", en: "Psalm 23:1" },
};

/* ── Saints for kids ────────────────────────────── */
export const kidSaints = [
  {
    id: "abanoub",
    image: saintIcon,
    name: { ar: "أبانوب النهيسي", en: "St. Abanoub" },
    line: { ar: "طفل شجاع أحبّ المسيح", en: "A brave child who loved Christ" },
    hue: "var(--kd-honey)",
  },
  {
    id: "nicholas",
    image: saintIcon,
    name: { ar: "القديس نيقولاوس", en: "St. Nicholas" },
    line: { ar: "الأسقف اللي بيفرّح الناس", en: "The bishop who loved giving" },
    hue: "var(--kd-sky)",
  },
  {
    id: "therese",
    image: saintIcon,
    name: { ar: "القديسة تريزا", en: "St. Thérèse" },
    line: { ar: "الطريق الصغير للمحبة", en: "The little way of love" },
    hue: "var(--kd-coral)",
  },
];

/* ── Play & learn tiles ─────────────────────────── */
export type PlayKey = "learn" | "games" | "color" | "quiz";

export const playTiles: { key: PlayKey; title: Bi; line: Bi; hue: string }[] = [
  {
    key: "learn",
    title: { ar: "اتعلم", en: "Learn" },
    line: { ar: "دروس صغيرة وممتعة", en: "Tiny, fun lessons" },
    hue: "var(--kd-mint)",
  },
  {
    key: "games",
    title: { ar: "ألعاب", en: "Games" },
    line: { ar: "العب مع أصحابك", en: "Play with friends" },
    hue: "var(--kd-sky)",
  },
  {
    key: "color",
    title: { ar: "تلوين وأنشطة", en: "Colour & Craft" },
    line: { ar: "ارسم ولوّن", en: "Draw and colour" },
    hue: "var(--kd-coral)",
  },
  {
    key: "quiz",
    title: { ar: "أسئلة", en: "Quiz" },
    line: { ar: "جرّب معلوماتك", en: "Test what you know" },
    hue: "var(--kd-grape)",
  },
];

/* ── Songs ──────────────────────────────────────── */
export const hymns = [
  {
    id: "h1",
    title: { ar: "يسوع بيحبني", en: "Jesus Loves Me" },
    line: { ar: "ترنيمة للبراعم", en: "For the little ones" },
    minutes: { ar: "٢:٤٠", en: "2:40" },
    hue: "var(--kd-honey)",
  },
  {
    id: "h2",
    title: { ar: "أنا فرحان", en: "I Am Happy" },
    line: { ar: "ترنيمة حركات", en: "Action song" },
    minutes: { ar: "٣:١٠", en: "3:10" },
    hue: "var(--kd-mint)",
  },
  {
    id: "h3",
    title: { ar: "نور المسيح", en: "Light of Christ" },
    line: { ar: "كورال الأطفال", en: "Kids' choir" },
    minutes: { ar: "٤:٠٥", en: "4:05" },
    hue: "var(--kd-sky)",
  },
];

/* ── Weekly challenge ───────────────────────────── */
export const missions = [
  { id: "m1", text: { ar: "اسمع قصة اليوم", en: "Listen to today's story" }, done: true },
  { id: "m2", text: { ar: "احفظ آية اليوم", en: "Learn the verse of the day" }, done: true },
  { id: "m3", text: { ar: "قول شكراً لحد النهارده", en: "Say thank you to someone today" }, done: false },
];

/* ── Colour & Craft: palette + line-art sheets ──── */
export const colourPalette: { name: Bi; value: string }[] = [
  { name: { ar: "ذهبي", en: "Gold" }, value: "oklch(0.856 0.150 82)" },
  { name: { ar: "سماوي", en: "Sky" }, value: "oklch(0.802 0.116 232)" },
  { name: { ar: "كورال", en: "Coral" }, value: "oklch(0.788 0.142 32)" },
  { name: { ar: "نعناعي", en: "Mint" }, value: "oklch(0.846 0.114 162)" },
  { name: { ar: "بنفسجي", en: "Grape" }, value: "oklch(0.726 0.118 300)" },
  { name: { ar: "أزرق ليلي", en: "Night" }, value: "oklch(0.520 0.086 268)" },
];

export type ColourSheet = {
  id: string;
  title: Bi;
  regions: { id: string; label: Bi; d: string }[];
};

export const colourSheets: ColourSheet[] = [
  {
    id: "fish",
    title: { ar: "السمكة", en: "The Fish" },
    regions: [
      { id: "body", label: { ar: "الجسم", en: "Body" }, d: "M40 80c22-30 62-40 92-24 12 6 20 15 24 24-4 9-12 18-24 24-30 16-70 6-92-24Z" },
      { id: "tail", label: { ar: "الذيل", en: "Tail" }, d: "M40 80 18 58v44L40 80Z" },
      { id: "fin", label: { ar: "الزعنفة", en: "Fin" }, d: "M96 58c6-12 16-18 26-16-2 10-8 18-16 24l-10-8Z" },
      { id: "eye", label: { ar: "العين", en: "Eye" }, d: "M138 74a6 6 0 1 0 .1 0Z" },
      { id: "wave", label: { ar: "الموج", en: "Water" }, d: "M14 128c16-10 30-10 46 0s30 10 46 0 30-10 46 0 22 8 32 2v22H14v-24Z" },
    ],
  },
  {
    id: "cross",
    title: { ar: "الصليب", en: "The Cross" },
    regions: [
      { id: "v", label: { ar: "العمود", en: "Beam" }, d: "M88 16h24v128H88z" },
      { id: "h", label: { ar: "الذراع", en: "Arms" }, d: "M40 56h120v24H40z" },
      { id: "ring", label: { ar: "الدائرة", en: "Circle" }, d: "M100 46a22 22 0 1 0 .1 0Zm0 10a12 12 0 1 1-.1 0Z" },
      { id: "glow", label: { ar: "الشعاع", en: "Glow" }, d: "M100 148c26 0 46 4 46 8H54c0-4 20-8 46-8Z" },
    ],
  },
  {
    id: "dove",
    title: { ar: "الحمامة", en: "The Dove" },
    regions: [
      { id: "body", label: { ar: "الجسم", en: "Body" }, d: "M30 92c30 6 52-8 66-32 12-20 34-30 54-24 12 4 16 12 16 20 0 38-34 66-72 66-26 0-48-12-64-30Z" },
      { id: "wing", label: { ar: "الجناح", en: "Wing" }, d: "M92 74c16-4 32 2 42 16-14 10-32 12-46 4l4-20Z" },
      { id: "branch", label: { ar: "الغصن", en: "Branch" }, d: "M60 118c14 8 28 12 42 12v10c-18 0-34-6-46-16l4-6Z" },
      { id: "sky", label: { ar: "السماء", en: "Sky" }, d: "M8 8h184v22H8z" },
    ],
  },
];

/* ── Light touch game glyphs ────────────────────── */
export const memoryGlyphs = [
  { id: "star", icon: KdStar, label: { ar: "نجمة", en: "Star" }, hue: "var(--kd-honey)" },
  { id: "cross", icon: KdCross, label: { ar: "صليب", en: "Cross" }, hue: "var(--kd-grape)" },
  { id: "dove", icon: KdDove, label: { ar: "حمامة", en: "Dove" }, hue: "var(--kd-sky)" },
  { id: "heart", icon: KdHeart, label: { ar: "قلب", en: "Heart" }, hue: "var(--kd-coral)" },
  { id: "book", icon: KdBook, label: { ar: "كتاب", en: "Book" }, hue: "var(--kd-mint)" },
  { id: "music", icon: KdMusic, label: { ar: "ترنيمة", en: "Song" }, hue: "var(--kd-grape)" },
] as const;

/* ── After-film story beats ─────────────────────── */
export type FilmBeat = {
  filmId: string;
  verse: Bi;
  ref: Bi;
  lesson: Bi;
  question: Bi;
  options: Bi[];
  answer: number;
  badge: Bi;
};

export const filmBeats: FilmBeat[] = [
  {
    filmId: "noah",
    verse: { ar: "«أَجْعَلُ قَوْسِي فِي السَّحَابِ»", en: "“I set my rainbow in the cloud.”" },
    ref: { ar: "تكوين ٩ : ١٣", en: "Genesis 9:13" },
    lesson: { ar: "الله بيحفظ اللي بيسمعوا كلامه.", en: "God keeps those who listen to Him." },
    question: { ar: "إيه علامة عهد الله مع نوح؟", en: "What was the sign of God's promise?" },
    options: [
      { ar: "قوس قزح", en: "A rainbow" },
      { ar: "نجمة", en: "A star" },
      { ar: "سفينة", en: "A boat" },
    ],
    answer: 0,
    badge: { ar: "درع قوس قزح", en: "Rainbow badge" },
  },
  {
    filmId: "david",
    verse: { ar: "«أَنَا آتِي إِلَيْكَ بِاسْمِ رَبِّ الْجُنُودِ»", en: "“I come to you in the name of the Lord.”" },
    ref: { ar: "١ صموئيل ١٧ : ٤٥", en: "1 Samuel 17:45" },
    lesson: { ar: "الشجاعة بتيجي من الثقة في الله.", en: "Courage comes from trusting God." },
    question: { ar: "داود واجه العملاق بإيه؟", en: "What did David face the giant with?" },
    options: [
      { ar: "سيف كبير", en: "A big sword" },
      { ar: "مقلاع وحجر", en: "A sling and a stone" },
      { ar: "درع حديد", en: "Iron armour" },
    ],
    answer: 1,
    badge: { ar: "درع القلب الشجاع", en: "Brave heart badge" },
  },
  {
    filmId: "jonah",
    verse: { ar: "«صَرَخْتُ فَسَمِعْتَ صَوْتِي»", en: "“I cried out, and You heard my voice.”" },
    ref: { ar: "يونان ٢ : ٢", en: "Jonah 2:2" },
    lesson: { ar: "ربنا بيسمعنا في أي مكان.", en: "God hears us anywhere." },
    question: { ar: "يونان صلّى وهو فين؟", en: "Where did Jonah pray?" },
    options: [
      { ar: "جوه الحوت", en: "Inside the whale" },
      { ar: "على الجبل", en: "On a mountain" },
      { ar: "في البيت", en: "At home" },
    ],
    answer: 0,
    badge: { ar: "درع الفرصة التانية", en: "Second chance badge" },
  },
];

/* ── Parent mode ────────────────────────────────── */
export const parentControls: { id: string; title: Bi; line: Bi; on: boolean }[] = [
  { id: "films", title: { ar: "أفلام الأنيميشن", en: "Animated films" }, line: { ar: "السماح بمشاهدة الأفلام", en: "Allow watching films" }, on: true },
  { id: "games", title: { ar: "الألعاب والأنشطة", en: "Games & activities" }, line: { ar: "ألعاب لمس بسيطة", en: "Light touch games" }, on: true },
  { id: "songs", title: { ar: "الترانيم", en: "Songs" }, line: { ar: "قائمة الترانيم المعتمدة", en: "Approved songs list" }, on: true },
  { id: "search", title: { ar: "البحث الحر", en: "Free search" }, line: { ar: "اقتراحات محتوى خارج المرحلة", en: "Suggestions beyond the age stage" }, on: false },
];
