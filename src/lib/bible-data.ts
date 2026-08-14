/**
 * Presentation-only Bible catalogue for the Alpha prototype.
 * Static data — no backend, no logic.
 */

export type Testament = "old" | "new";

export type BibleBook = {
  id: string;
  ar: string;
  en: string;
  chapters: number;
  category: string;
  /** Visual reading state for the prototype. */
  state: "done" | "reading" | "new";
  /** 0–100, only meaningful when state === "reading". */
  progress?: number;
};

export type BibleCategory = { id: string; ar: string; en: string };

export const oldCategories: BibleCategory[] = [
  { id: "all", ar: "الكل", en: "All" },
  { id: "law", ar: "الأسفار الخمسة", en: "Law" },
  { id: "history", ar: "التاريخية", en: "History" },
  { id: "wisdom", ar: "الحكمة والشعر", en: "Wisdom" },
  { id: "prophets", ar: "الأنبياء", en: "Prophets" },
];

export const newCategories: BibleCategory[] = [
  { id: "all", ar: "الكل", en: "All" },
  { id: "gospels", ar: "الأناجيل", en: "Gospels" },
  { id: "acts", ar: "الأعمال", en: "Acts" },
  { id: "epistles", ar: "الرسائل", en: "Epistles" },
  { id: "vision", ar: "الرؤيا", en: "Vision" },
];

export const oldTestament: BibleBook[] = [
  { id: "gen", ar: "التكوين", en: "Genesis", chapters: 50, category: "law", state: "done" },
  { id: "exo", ar: "الخروج", en: "Exodus", chapters: 40, category: "law", state: "reading", progress: 62 },
  { id: "lev", ar: "اللاويين", en: "Leviticus", chapters: 27, category: "law", state: "new" },
  { id: "num", ar: "العدد", en: "Numbers", chapters: 36, category: "law", state: "new" },
  { id: "deu", ar: "التثنية", en: "Deuteronomy", chapters: 34, category: "law", state: "new" },
  { id: "jos", ar: "يشوع", en: "Joshua", chapters: 24, category: "history", state: "new" },
  { id: "jdg", ar: "القضاة", en: "Judges", chapters: 21, category: "history", state: "new" },
  { id: "rut", ar: "راعوث", en: "Ruth", chapters: 4, category: "history", state: "done" },
  { id: "1sa", ar: "صموئيل الأول", en: "1 Samuel", chapters: 31, category: "history", state: "new" },
  { id: "2sa", ar: "صموئيل الثاني", en: "2 Samuel", chapters: 24, category: "history", state: "new" },
  { id: "psa", ar: "المزامير", en: "Psalms", chapters: 150, category: "wisdom", state: "reading", progress: 34 },
  { id: "pro", ar: "الأمثال", en: "Proverbs", chapters: 31, category: "wisdom", state: "new" },
  { id: "job", ar: "أيوب", en: "Job", chapters: 42, category: "wisdom", state: "new" },
  { id: "ecc", ar: "الجامعة", en: "Ecclesiastes", chapters: 12, category: "wisdom", state: "new" },
  { id: "sng", ar: "نشيد الأناشيد", en: "Song of Songs", chapters: 8, category: "wisdom", state: "done" },
  { id: "isa", ar: "إشعياء", en: "Isaiah", chapters: 66, category: "prophets", state: "new" },
  { id: "jer", ar: "إرميا", en: "Jeremiah", chapters: 52, category: "prophets", state: "new" },
  { id: "eze", ar: "حزقيال", en: "Ezekiel", chapters: 48, category: "prophets", state: "new" },
  { id: "dan", ar: "دانيال", en: "Daniel", chapters: 12, category: "prophets", state: "reading", progress: 25 },
  { id: "hos", ar: "هوشع", en: "Hosea", chapters: 14, category: "prophets", state: "new" },
];

export const newTestament: BibleBook[] = [
  { id: "mat", ar: "متى", en: "Matthew", chapters: 28, category: "gospels", state: "done" },
  { id: "mrk", ar: "مرقس", en: "Mark", chapters: 16, category: "gospels", state: "reading", progress: 44 },
  { id: "luk", ar: "لوقا", en: "Luke", chapters: 24, category: "gospels", state: "new" },
  { id: "jhn", ar: "يوحنا", en: "John", chapters: 21, category: "gospels", state: "reading", progress: 71 },
  { id: "act", ar: "أعمال الرسل", en: "Acts", chapters: 28, category: "acts", state: "new" },
  { id: "rom", ar: "رومية", en: "Romans", chapters: 16, category: "epistles", state: "new" },
  { id: "1co", ar: "كورنثوس الأولى", en: "1 Corinthians", chapters: 16, category: "epistles", state: "done" },
  { id: "2co", ar: "كورنثوس الثانية", en: "2 Corinthians", chapters: 13, category: "epistles", state: "new" },
  { id: "gal", ar: "غلاطية", en: "Galatians", chapters: 6, category: "epistles", state: "new" },
  { id: "eph", ar: "أفسس", en: "Ephesians", chapters: 6, category: "epistles", state: "done" },
  { id: "php", ar: "فيلبي", en: "Philippians", chapters: 4, category: "epistles", state: "new" },
  { id: "col", ar: "كولوسي", en: "Colossians", chapters: 4, category: "epistles", state: "new" },
  { id: "heb", ar: "العبرانيين", en: "Hebrews", chapters: 13, category: "epistles", state: "new" },
  { id: "jas", ar: "يعقوب", en: "James", chapters: 5, category: "epistles", state: "new" },
  { id: "1pe", ar: "بطرس الأولى", en: "1 Peter", chapters: 5, category: "epistles", state: "new" },
  { id: "1jn", ar: "يوحنا الأولى", en: "1 John", chapters: 5, category: "epistles", state: "done" },
  { id: "rev", ar: "الرؤيا", en: "Revelation", chapters: 22, category: "vision", state: "new" },
];

/** Chapter read-state stripe for the chapter picker (prototype pattern). */
export const chapterStates = (count: number): Array<"done" | "reading" | "new"> =>
  Array.from({ length: count }, (_, i) =>
    i < 6 ? "done" : i === 6 ? "reading" : "new",
  );

/** Sample passage used by the reading screen. */
export const samplePassage: Array<{ n: number; ar: string; en: string }> = [
  {
    n: 1,
    ar: "في البدء كان الكلمة، والكلمة كان عند الله، وكان الكلمة الله.",
    en: "In the beginning was the Word, and the Word was with God, and the Word was God.",
  },
  {
    n: 2,
    ar: "هذا كان في البدء عند الله.",
    en: "He was in the beginning with God.",
  },
  {
    n: 3,
    ar: "كل شيء به كان، وبغيره لم يكن شيء ممّا كان.",
    en: "All things were made through him, and without him was not any thing made that was made.",
  },
  {
    n: 4,
    ar: "فيه كانت الحياة، والحياة كانت نور الناس.",
    en: "In him was life, and the life was the light of men.",
  },
  {
    n: 5,
    ar: "والنور يضيء في الظلمة، والظلمة لم تدركه.",
    en: "The light shines in the darkness, and the darkness has not overcome it.",
  },
  {
    n: 6,
    ar: "كان إنسان مرسل من الله اسمه يوحنا.",
    en: "There was a man sent from God, whose name was John.",
  },
  {
    n: 7,
    ar: "هذا جاء ليشهد للنور، لكي يؤمن الكل بواسطته.",
    en: "He came as a witness to the light, that all might believe through him.",
  },
  {
    n: 8,
    ar: "لم يكن هو النور، بل ليشهد للنور.",
    en: "He was not the light, but came to bear witness about the light.",
  },
];
