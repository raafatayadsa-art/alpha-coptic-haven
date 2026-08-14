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
  {
    n: 9,
    ar: "كان النور الحقيقي الذي يُنير كل إنسان آتيًا إلى العالم.",
    en: "The true light, which gives light to everyone, was coming into the world.",
  },
  {
    n: 10,
    ar: "كان في العالم، وكُوِّن العالم به، ولم يعرفه العالم.",
    en: "He was in the world, and the world was made through him, yet the world did not know him.",
  },
  {
    n: 11,
    ar: "إلى خاصته جاء، وخاصته لم تقبله.",
    en: "He came to his own, and his own people did not receive him.",
  },
  {
    n: 12,
    ar: "وأما كل الذين قبلوه فأعطاهم سلطانًا أن يصيروا أولاد الله، أي المؤمنون باسمه.",
    en: "But to all who did receive him, he gave the right to become children of God.",
  },
  {
    n: 13,
    ar: "الذين وُلدوا ليس من دم، ولا من مشيئة جسد، ولا من مشيئة رجل، بل من الله.",
    en: "Who were born, not of blood nor of the will of man, but of God.",
  },
  {
    n: 14,
    ar: "والكلمة صار جسدًا وحلَّ بيننا، ورأينا مجده، مجدًا كما لوحيد من الآب، مملوءًا نعمة وحقًّا.",
    en: "And the Word became flesh and dwelt among us, full of grace and truth.",
  },
  {
    n: 15,
    ar: "يوحنا شهد له فنادى قائلًا: هذا هو الذي قلت عنه إن الذي يأتي بعدي هو أقدم مني.",
    en: "John bore witness about him, crying out, “He who comes after me ranks before me.”",
  },
  {
    n: 16,
    ar: "ومن ملئه نحن جميعًا أخذنا، ونعمة فوق نعمة.",
    en: "For from his fullness we have all received, grace upon grace.",
  },
  {
    n: 17,
    ar: "لأن الناموس بموسى أُعطي، أما النعمة والحق فبيسوع المسيح صارا.",
    en: "For the law was given through Moses; grace and truth came through Jesus Christ.",
  },
  {
    n: 18,
    ar: "الله لم يره أحد قط. الابن الوحيد الذي في حضن الآب هو خبَّر.",
    en: "No one has ever seen God; the only Son, who is at the Father's side, has made him known.",
  },
  {
    n: 19,
    ar: "وهذه هي شهادة يوحنا، حين أرسل اليهود من أورشليم كهنة ولاويين ليسألوه: من أنت؟",
    en: "And this was the testimony of John, when the Jews sent priests and Levites to ask him, “Who are you?”",
  },
  {
    n: 20,
    ar: "فأقرَّ ولم ينكر، وأقرَّ أني لست أنا المسيح.",
    en: "He confessed, and did not deny, “I am not the Christ.”",
  },
  {
    n: 21,
    ar: "فسألوه: إذًا ماذا؟ إيليا أنت؟ فقال: لست أنا. النبي أنت؟ فأجاب: لا.",
    en: "They asked him, “What then? Are you Elijah?” He said, “I am not.”",
  },
  {
    n: 22,
    ar: "فقالوا له: من أنت، لنعطي جوابًا للذين أرسلونا؟",
    en: "So they said to him, “Who are you? We need to give an answer to those who sent us.”",
  },
  {
    n: 23,
    ar: "قال: أنا صوت صارخ في البرية: قوِّموا طريق الرب، كما قال إشعياء النبي.",
    en: "He said, “I am the voice of one crying in the wilderness: Make straight the way of the Lord.”",
  },
  {
    n: 24,
    ar: "وكان الذين أُرسلوا من الفريسيين.",
    en: "Now they had been sent from the Pharisees.",
  },
  {
    n: 25,
    ar: "فسألوه: فما بالك تعمِّد إن لم تكن أنت المسيح ولا إيليا ولا النبي؟",
    en: "They asked him, “Then why are you baptizing?”",
  },
  {
    n: 26,
    ar: "أجابهم يوحنا: أنا أعمِّد بماء، ولكن في وسطكم قائم الذي لستم تعرفونه.",
    en: "John answered, “I baptize with water, but among you stands one you do not know.”",
  },
  {
    n: 27,
    ar: "هو الذي يأتي بعدي، الذي لست مستحقًا أن أحل سيور حذائه.",
    en: "He who comes after me, the strap of whose sandal I am not worthy to untie.",
  },
  {
    n: 28,
    ar: "وكان هذا في بيت عبرة في عبر الأردن، حيث كان يوحنا يعمِّد.",
    en: "These things took place at Bethany across the Jordan, where John was baptizing.",
  },
  {
    n: 29,
    ar: "وفي الغد نظر يوحنا يسوع مقبلًا إليه فقال: هوذا حمل الله الذي يرفع خطية العالم.",
    en: "The next day he saw Jesus and said, “Behold, the Lamb of God, who takes away the sin of the world!”",
  },
  {
    n: 30,
    ar: "هذا هو الذي قلت عنه: يأتي بعدي رجل صار قدَّامي، لأنه كان قبلي.",
    en: "This is he of whom I said, “After me comes a man who ranks before me.”",
  },
  {
    n: 31,
    ar: "وأنا لم أكن أعرفه، لكن ليُظهَر لإسرائيل جئت أعمِّد بالماء.",
    en: "I myself did not know him, but I came baptizing with water that he might be revealed.",
  },
  {
    n: 32,
    ar: "وشهد يوحنا قائلًا: إني رأيت الروح نازلًا مثل حمامة من السماء فاستقر عليه.",
    en: "And John bore witness: “I saw the Spirit descend from heaven like a dove, and it remained on him.”",
  },
  {
    n: 33,
    ar: "وأنا لم أكن أعرفه، لكن الذي أرسلني لأعمِّد بالماء ذاك قال لي…",
    en: "I myself did not know him, but he who sent me to baptize with water said to me…",
  },
  {
    n: 34,
    ar: "وأنا قد رأيت وشهدت أن هذا هو ابن الله.",
    en: "And I have seen and have borne witness that this is the Son of God.",
  },
  {
    n: 35,
    ar: "وفي الغد أيضًا كان يوحنا واقفًا هو واثنان من تلاميذه.",
    en: "The next day again John was standing with two of his disciples.",
  },
  {
    n: 36,
    ar: "فنظر إلى يسوع ماشيًا فقال: هوذا حمل الله.",
    en: "And he looked at Jesus walking by and said, “Behold, the Lamb of God!”",
  },
  {
    n: 37,
    ar: "فسمعه التلميذان يتكلم فتبعا يسوع.",
    en: "The two disciples heard him say this, and they followed Jesus.",
  },
  {
    n: 38,
    ar: "فالتفت يسوع ونظرهما يتبعانه فقال لهما: ماذا تطلبان؟ فقالا: يا معلِّم، أين تمكث؟",
    en: "Jesus turned and said to them, “What are you seeking?” They said, “Rabbi, where are you staying?”",
  },
  {
    n: 39,
    ar: "فقال لهما: تعاليا وانظرا. فأتيا ونظرا حيث كان يمكث ومكثا عنده ذلك اليوم.",
    en: "He said to them, “Come and you will see.” So they came and stayed with him that day.",
  },
  {
    n: 40,
    ar: "كان أندراوس أخو سمعان بطرس واحدًا من الاثنين اللذين سمعا يوحنا وتبعا يسوع.",
    en: "One of the two was Andrew, Simon Peter's brother.",
  },
  {
    n: 41,
    ar: "هذا وجد أولًا أخاه سمعان فقال له: قد وجدنا مسيَّا، الذي تفسيره المسيح.",
    en: "He first found his own brother Simon and said, “We have found the Messiah.”",
  },
  {
    n: 42,
    ar: "فجاء به إلى يسوع، فنظر إليه يسوع وقال: أنت سمعان بن يونا، أنت تُدعى صفا.",
    en: "He brought him to Jesus, who said, “You are Simon; you shall be called Cephas.”",
  },
  {
    n: 43,
    ar: "وفي الغد أراد يسوع أن يخرج إلى الجليل، فوجد فيلبس فقال له: اتبعني.",
    en: "The next day Jesus decided to go to Galilee. He found Philip and said, “Follow me.”",
  },
  {
    n: 44,
    ar: "وكان فيلبس من بيت صيدا، من مدينة أندراوس وبطرس.",
    en: "Now Philip was from Bethsaida, the city of Andrew and Peter.",
  },
  {
    n: 45,
    ar: "فيلبس وجد نثنائيل وقال له: وجدنا الذي كتب عنه موسى في الناموس والأنبياء.",
    en: "Philip found Nathanael and said, “We have found him of whom Moses wrote.”",
  },
  {
    n: 46,
    ar: "فقال له نثنائيل: أمن الناصرة يمكن أن يكون شيء صالح؟ قال له فيلبس: تعال وانظر.",
    en: "Nathanael said, “Can anything good come out of Nazareth?” Philip said, “Come and see.”",
  },
  {
    n: 47,
    ar: "ورأى يسوع نثنائيل مقبلًا إليه فقال عنه: هوذا إسرائيلي حقًّا لا غش فيه.",
    en: "Jesus saw Nathanael coming and said, “Behold, an Israelite indeed, in whom there is no deceit!”",
  },
  {
    n: 48,
    ar: "قال له نثنائيل: من أين تعرفني؟ أجاب يسوع: قبل أن يدعوك فيلبس رأيتك تحت التينة.",
    en: "Nathanael said, “How do you know me?” Jesus answered, “I saw you under the fig tree.”",
  },
  {
    n: 49,
    ar: "أجاب نثنائيل: يا معلِّم، أنت ابن الله، أنت ملك إسرائيل.",
    en: "Nathanael answered, “Rabbi, you are the Son of God! You are the King of Israel!”",
  },
  {
    n: 50,
    ar: "أجاب يسوع: هل آمنت لأني قلت لك إني رأيتك تحت التينة؟ سوف ترى أعظم من هذا.",
    en: "Jesus answered, “You will see greater things than these.”",
  },
  {
    n: 51,
    ar: "وقال له: الحق الحق أقول لكم: من الآن ترون السماء مفتوحة وملائكة الله صاعدين ونازلين على ابن الإنسان.",
    en: "And he said, “Truly, you will see heaven opened, and the angels of God ascending and descending on the Son of Man.”",
  },
];


/** Illuminated initial: drops the Arabic definite article so initials stay distinct. */
export const bookInitial = (name: string) =>
  (name.startsWith("ال") && name.length > 3 ? name.slice(2) : name).slice(0, 1);
