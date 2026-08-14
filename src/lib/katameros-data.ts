/**
 * Katameros (lectionary) — presentation-only content for the Alpha prototype.
 * Bilingual strings live here so the screens stay purely visual.
 * No logic, no fetching, no persistence.
 */

export type Bi = { ar: string; en: string };

export type ReadingGroupKey = "vespers" | "matins" | "liturgy" | "synaxarium";

export type Reading = {
  id: string;
  group: ReadingGroupKey;
  kind: Bi;
  ref: Bi;
  excerpt: Bi;
  minutes: number;
};

/** Colour family per reading group — drives --hue / --hue-2 on the cards. */
export const groupHue: Record<ReadingGroupKey, { hue: string; hue2: string }> = {
  vespers: { hue: "oklch(0.520 0.120 300)", hue2: "oklch(0.800 0.082 300)" },
  matins: { hue: "oklch(0.680 0.108 68)", hue2: "oklch(0.868 0.086 84)" },
  liturgy: { hue: "oklch(0.520 0.140 22)", hue2: "oklch(0.822 0.088 40)" },
  synaxarium: { hue: "oklch(0.560 0.096 178)", hue2: "oklch(0.826 0.080 172)" },
};

export const groupLabel: Record<ReadingGroupKey, Bi> = {
  vespers: { ar: "عشية", en: "Vespers" },
  matins: { ar: "باكر", en: "Matins" },
  liturgy: { ar: "القداس الإلهي", en: "Divine Liturgy" },
  synaxarium: { ar: "السنكسار", en: "Synaxarium" },
};

export const groupCaption: Record<ReadingGroupKey, Bi> = {
  vespers: { ar: "مزمور وإنجيل عشية", en: "Vespers psalm & gospel" },
  matins: { ar: "مزمور وإنجيل باكر", en: "Matins psalm & gospel" },
  liturgy: { ar: "البولس · الكاثوليكون · الإبركسيس · المزمور · الإنجيل", en: "Pauline · Catholic · Praxis · Psalm · Gospel" },
  synaxarium: { ar: "سيرة اليوم من السنكسار", en: "Today’s life from the Synaxarium" },
};

export const readings: Reading[] = [
  {
    id: "vsp-psalm",
    group: "vespers",
    kind: { ar: "مزمور عشية", en: "Vespers psalm" },
    ref: { ar: "مزمور ٩٦ : ١١ ، ١٢", en: "Psalm 96 : 11, 12" },
    excerpt: {
      ar: "نُورٌ قَدْ أَشْرَقَ لِلصِّدِّيقِ، وَفَرَحٌ لِلْمُسْتَقِيمِي الْقَلْبِ.",
      en: "Light is sown for the righteous, and gladness for the upright in heart.",
    },
    minutes: 1,
  },
  {
    id: "vsp-gospel",
    group: "vespers",
    kind: { ar: "إنجيل عشية", en: "Vespers gospel" },
    ref: { ar: "لوقا ١٢ : ٣٢ - ٣٤", en: "Luke 12 : 32 - 34" },
    excerpt: {
      ar: "لَا تَخَفْ أَيُّهَا الْقَطِيعُ الصَّغِيرُ، لِأَنَّ أَبَاكُمْ قَدْ سُرَّ أَنْ يُعْطِيَكُمُ الْمَلَكُوتَ.",
      en: "Do not fear, little flock, for it is your Father’s good pleasure to give you the kingdom.",
    },
    minutes: 2,
  },
  {
    id: "mat-psalm",
    group: "matins",
    kind: { ar: "مزمور باكر", en: "Matins psalm" },
    ref: { ar: "مزمور ٦٣ : ١ - ٣", en: "Psalm 63 : 1 - 3" },
    excerpt: {
      ar: "يَا اللهُ إِلَهِي، إِلَيْكَ أَبْتَكِرُ، عَطِشَتْ إِلَيْكَ نَفْسِي.",
      en: "O God, You are my God; early will I seek You; my soul thirsts for You.",
    },
    minutes: 1,
  },
  {
    id: "mat-gospel",
    group: "matins",
    kind: { ar: "إنجيل باكر", en: "Matins gospel" },
    ref: { ar: "متى ٥ : ١٤ - ١٦", en: "Matthew 5 : 14 - 16" },
    excerpt: {
      ar: "أَنْتُمْ نُورُ الْعَالَمِ. لَا يُمْكِنُ أَنْ تُخْفَى مَدِينَةٌ مَوْضُوعَةٌ عَلَى جَبَلٍ.",
      en: "You are the light of the world. A city set on a hill cannot be hidden.",
    },
    minutes: 2,
  },
  {
    id: "lit-pauline",
    group: "liturgy",
    kind: { ar: "البولس", en: "Pauline epistle" },
    ref: { ar: "عبرانيين ١١ : ٣٢ - ٤٠", en: "Hebrews 11 : 32 - 40" },
    excerpt: {
      ar: "الَّذِينَ بِالْإِيمَانِ قَهَرُوا مَمَالِكَ، صَنَعُوا بِرًّا، نَالُوا مَوَاعِيدَ.",
      en: "Who through faith subdued kingdoms, worked righteousness, obtained promises.",
    },
    minutes: 4,
  },
  {
    id: "lit-catholic",
    group: "liturgy",
    kind: { ar: "الكاثوليكون", en: "Catholic epistle" },
    ref: { ar: "١ بطرس ٤ : ١٢ - ١٩", en: "1 Peter 4 : 12 - 19" },
    excerpt: {
      ar: "بَلْ كَمَا شَارَكْتُمْ آلَامَ الْمَسِيحِ، افْرَحُوا.",
      en: "But rejoice to the extent that you partake of Christ’s sufferings.",
    },
    minutes: 3,
  },
  {
    id: "lit-praxis",
    group: "liturgy",
    kind: { ar: "الإبركسيس", en: "Praxis" },
    ref: { ar: "أعمال ٧ : ٥٤ - ٦٠", en: "Acts 7 : 54 - 60" },
    excerpt: {
      ar: "هَا أَنَا أَنْظُرُ السَّمَاوَاتِ مَفْتُوحَةً، وَابْنَ الْإِنْسَانِ قَائِمًا.",
      en: "Look! I see the heavens opened and the Son of Man standing.",
    },
    minutes: 3,
  },
  {
    id: "lit-psalm",
    group: "liturgy",
    kind: { ar: "مزمور القداس", en: "Liturgy psalm" },
    ref: { ar: "مزمour ١١٥ : ١٥", en: "Psalm 116 : 15" },
    excerpt: {
      ar: "كَرِيمٌ أَمَامَ الرَّبِّ مَوْتُ قِدِّيسِيهِ.",
      en: "Precious in the sight of the Lord is the death of His saints.",
    },
    minutes: 1,
  },
  {
    id: "lit-gospel",
    group: "liturgy",
    kind: { ar: "إنجيل القداس", en: "Liturgy gospel" },
    ref: { ar: "متى ١٠ : ١٦ - ٢٢", en: "Matthew 10 : 16 - 22" },
    excerpt: {
      ar: "وَمَنْ يَصْبِرْ إِلَى الْمُنْتَهَى فَهَذَا يَخْلُصُ.",
      en: "But he who endures to the end will be saved.",
    },
    minutes: 4,
  },
  {
    id: "syn-day",
    group: "synaxarium",
    kind: { ar: "سنكسار اليوم", en: "Today’s Synaxarium" },
    ref: { ar: "٢٢ أبيب", en: "22 Abib" },
    excerpt: {
      ar: "في هذا اليوم تُذكار نياحة القديس، وقد جاهد جهادًا حسنًا وأكمل سعيه.",
      en: "On this day is the departure of the saint, who fought the good fight and finished his course.",
    },
    minutes: 3,
  },
];

/* ── Coptic calendar ─────────────────────────────────────── */

export const copticMonths: { id: string; name: Bi; season?: Bi }[] = [
  { id: "tout", name: { ar: "توت", en: "Tout" } },
  { id: "baba", name: { ar: "بابه", en: "Baba" } },
  { id: "hatour", name: { ar: "هاتور", en: "Hatour" } },
  { id: "kiahk", name: { ar: "كيهك", en: "Kiahk" }, season: { ar: "صوم الميلاد", en: "Nativity fast" } },
  { id: "touba", name: { ar: "طوبة", en: "Touba" } },
  { id: "amshir", name: { ar: "أمشير", en: "Amshir" } },
  { id: "baramhat", name: { ar: "برمهات", en: "Baramhat" }, season: { ar: "الصوم الكبير", en: "Great Lent" } },
  { id: "baramouda", name: { ar: "برمودة", en: "Baramouda" }, season: { ar: "أسبوع الآلام", en: "Holy Week" } },
  { id: "bashans", name: { ar: "بشنس", en: "Bashans" }, season: { ar: "الخمسين", en: "Pentecost" } },
  { id: "paona", name: { ar: "بؤونة", en: "Paona" }, season: { ar: "صوم الرسل", en: "Apostles’ fast" } },
  { id: "abib", name: { ar: "أبيب", en: "Abib" } },
  { id: "misra", name: { ar: "مسرى", en: "Misra" }, season: { ar: "صوم العذراء", en: "St. Mary’s fast" } },
  { id: "nasie", name: { ar: "النسي", en: "El-Nasi" } },
];

export const seasons: { id: string; name: Bi; span: Bi; accent: string }[] = [
  { id: "kiahk", name: { ar: "شهر كيهك", en: "Month of Kiahk" }, span: { ar: "تسابيح وصوم الميلاد", en: "Praises & Nativity fast" }, accent: "oklch(0.560 0.120 300)" },
  { id: "lent", name: { ar: "الصوم الكبير", en: "Great Lent" }, span: { ar: "٥٥ يومًا · آحاد الصوم", en: "55 days · Lenten Sundays" }, accent: "oklch(0.520 0.100 265)" },
  { id: "holyweek", name: { ar: "أسبوع الآلام", en: "Holy Week" }, span: { ar: "البصخة المقدسة", en: "The Holy Pascha" }, accent: "oklch(0.500 0.150 22)" },
  { id: "pentecost", name: { ar: "الخمسين المقدسة", en: "Holy Fifty" }, span: { ar: "من القيامة إلى العنصرة", en: "Resurrection to Pentecost" }, accent: "oklch(0.680 0.110 140)" },
  { id: "apostles", name: { ar: "صوم الرسل", en: "Apostles’ Fast" }, span: { ar: "يختم بعيد الرسل", en: "Ends with the Apostles’ feast" }, accent: "oklch(0.660 0.108 200)" },
  { id: "annual", name: { ar: "الأيام السنوية", en: "Annual days" }, span: { ar: "قراءات الأسبوع العادية", en: "Ordinary weekday readings" }, accent: "oklch(0.720 0.100 78)" },
];

export const majorFeasts: { id: string; name: Bi; date: Bi }[] = [
  { id: "nativity", name: { ar: "عيد الميلاد المجيد", en: "Nativity" }, date: { ar: "٢٩ كيهك", en: "29 Kiahk" } },
  { id: "epiphany", name: { ar: "عيد الغطاس", en: "Epiphany" }, date: { ar: "١١ طوبة", en: "11 Touba" } },
  { id: "annunciation", name: { ar: "عيد البشارة", en: "Annunciation" }, date: { ar: "٢٩ برمهات", en: "29 Baramhat" } },
  { id: "resurrection", name: { ar: "عيد القيامة", en: "Resurrection" }, date: { ar: "عيد متغيّر", en: "Movable feast" } },
  { id: "ascension", name: { ar: "عيد الصعود", en: "Ascension" }, date: { ar: "بعد ٤٠ يومًا", en: "After 40 days" } },
  { id: "pentecost", name: { ar: "عيد العنصرة", en: "Pentecost" }, date: { ar: "بعد ٥٠ يومًا", en: "After 50 days" } },
];

/** Seven-day strip around the current day (presentation only). */
export const weekStrip: { id: string; dow: Bi; copt: Bi; greg: string; today?: boolean; feast?: boolean }[] = [
  { id: "d1", dow: { ar: "أحد", en: "Sun" }, copt: { ar: "١٩ أبيب", en: "19 Abib" }, greg: "٢٦" },
  { id: "d2", dow: { ar: "إثنين", en: "Mon" }, copt: { ar: "٢٠ أبيب", en: "20 Abib" }, greg: "٢٧" },
  { id: "d3", dow: { ar: "ثلاثاء", en: "Tue" }, copt: { ar: "٢١ أبيب", en: "21 Abib" }, greg: "٢٨" },
  { id: "d4", dow: { ar: "أربعاء", en: "Wed" }, copt: { ar: "٢٢ أبيب", en: "22 Abib" }, greg: "٢٩", today: true },
  { id: "d5", dow: { ar: "خميس", en: "Thu" }, copt: { ar: "٢٣ أبيب", en: "23 Abib" }, greg: "٣٠", feast: true },
  { id: "d6", dow: { ar: "جمعة", en: "Fri" }, copt: { ar: "٢٤ أبيب", en: "24 Abib" }, greg: "٣١" },
  { id: "d7", dow: { ar: "سبت", en: "Sat" }, copt: { ar: "٢٥ أبيب", en: "25 Abib" }, greg: "١" },
];

export const orderedGroups: ReadingGroupKey[] = ["vespers", "matins", "liturgy", "synaxarium"];

export function readingsOf(group: ReadingGroupKey) {
  return readings.filter((r) => r.group === group);
}
