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
