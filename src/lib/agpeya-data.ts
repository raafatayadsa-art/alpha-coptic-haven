/**
 * Agpeya (Book of Hours) — presentation-only content for the Alpha prototype.
 * Every hour is split into its parts so the reader can walk through them in
 * sequence. Bilingual strings only; no logic, no fetching, no persistence.
 */

export type Bi = { ar: string; en: string };

export type PartHue = { hue: string; hue2: string };

export type PrayerPart = {
  id: string;
  label: Bi;
  ref?: Bi;
  lines: Bi[];
  hue: PartHue;
};

export type PrayerHour = {
  id: string;
  nameKey: string;
  timeKey: string;
  intro: Bi;
  parts: PrayerPart[];
};

/* Colour families cycled across the parts of an hour. */
const HUES: PartHue[] = [
  { hue: "oklch(0.665 0.108 62)", hue2: "oklch(0.855 0.092 82)" },
  { hue: "oklch(0.660 0.108 205)", hue2: "oklch(0.840 0.090 190)" },
  { hue: "oklch(0.520 0.126 278)", hue2: "oklch(0.790 0.086 288)" },
  { hue: "oklch(0.620 0.100 163)", hue2: "oklch(0.830 0.088 155)" },
  { hue: "oklch(0.600 0.120 330)", hue2: "oklch(0.820 0.086 330)" },
];

const hue = (i: number) => HUES[i % HUES.length]!;

const lordsPrayer: Bi[] = [
  {
    ar: "أَبَانَا الَّذِي فِي السَّمَاوَاتِ، لِيَتَقَدَّسِ اسْمُكَ، لِيَأْتِ مَلَكُوتُكَ.",
    en: "Our Father who art in heaven, hallowed be Thy name; Thy kingdom come.",
  },
  {
    ar: "لِتَكُنْ مَشِيئَتُكَ كَمَا فِي السَّمَاءِ كَذَلِكَ عَلَى الأَرْضِ.",
    en: "Thy will be done on earth as it is in heaven.",
  },
  {
    ar: "خُبْزَنَا كَفَافَنَا أَعْطِنَا الْيَوْمَ، وَاغْفِرْ لَنَا ذُنُوبَنَا.",
    en: "Give us this day our daily bread, and forgive us our trespasses.",
  },
];

const thanksgiving: Bi[] = [
  {
    ar: "فَلْنَشْكُرْ صَانِعَ الْخَيْرَاتِ، الرَّحُومَ اللهَ أَبَا رَبِّنَا وَإِلَهِنَا يَسُوعَ الْمَسِيحِ.",
    en: "Let us give thanks to the Doer of good, the merciful God, Father of our Lord Jesus Christ.",
  },
  {
    ar: "لِأَنَّهُ سَتَرَنَا وَأَعَانَنَا وَحَفِظَنَا وَقَبِلَنَا إِلَيْهِ وَأَشْفَقَ عَلَيْنَا.",
    en: "For He has covered us, helped us, guarded us, accepted us to Him and had compassion on us.",
  },
  {
    ar: "وَعَضَدَنَا وَأَتَى بِنَا إِلَى هَذِهِ السَّاعَةِ.",
    en: "He has sustained us and brought us to this hour.",
  },
];

const psalm50: Bi[] = [
  {
    ar: "اِرْحَمْنِي يَا اللهُ كَعَظِيمِ رَحْمَتِكَ، وَكَمِثْلِ كَثْرَةِ رَأْفَتِكَ تَمْحُو إِثْمِي.",
    en: "Have mercy on me, O God, according to Your great mercy; blot out my iniquity.",
  },
  {
    ar: "اِغْسِلْنِي كَثِيرًا مِنْ إِثْمِي وَمِنْ خَطِيَّتِي طَهِّرْنِي.",
    en: "Wash me thoroughly from my iniquity and cleanse me from my sin.",
  },
  {
    ar: "قَلْبًا نَقِيًّا اخْلُقْ فِيَّ يَا اللهُ، وَرُوحًا مُسْتَقِيمًا جَدِّدْ فِي أَحْشَائِي.",
    en: "Create in me a clean heart, O God, and renew a right spirit within me.",
  },
];

const litanies: Bi[] = [
  {
    ar: "يَا رَبُّ ارْحَمْ، يَا رَبُّ ارْحَمْ، يَا رَبُّ بَارِكْ. آمِين.",
    en: "Lord have mercy, Lord have mercy, Lord bless. Amen.",
  },
  {
    ar: "مَجْدًا لِلآبِ وَالابْنِ وَالرُّوحِ الْقُدُسِ، الآنَ وَكُلَّ أَوَانٍ وَإِلَى دَهْرِ الدُّهُورِ. آمِين.",
    en: "Glory be to the Father and to the Son and to the Holy Spirit, now and forever. Amen.",
  },
];

const absolution: Bi[] = [
  {
    ar: "أَيُّهَا السَّيِّدُ الرَّبُّ الإِلَهُ الْقَادِرُ عَلَى كُلِّ شَيْءٍ، شَافِي نُفُوسِنَا وَأَجْسَادِنَا.",
    en: "O Master, Lord God Almighty, the Healer of our souls and bodies.",
  },
  {
    ar: "أَنْتَ يَا رَبُّ اشْفِ نُفُوسَنَا وَأَجْسَادَنَا وَأَرْوَاحَنَا.",
    en: "You, O Lord, heal our souls, our bodies and our spirits.",
  },
];

/** Builds the standard skeleton of an hour, with its own psalms and gospel. */
function buildHour(
  id: string,
  intro: Bi,
  psalms: { label: Bi; ref: Bi; lines: Bi[] },
  gospel: { ref: Bi; lines: Bi[] },
): PrayerHour {
  return {
    id,
    nameKey: `ag.p.${id}`,
    timeKey: `ag.p.${id}.t`,
    intro,
    parts: [
      {
        id: "lords",
        label: { ar: "أبانا الذي في السماوات", en: "The Lord’s Prayer" },
        lines: lordsPrayer,
        hue: hue(0),
      },
      {
        id: "thanks",
        label: { ar: "صلاة الشكر", en: "Thanksgiving" },
        lines: thanksgiving,
        hue: hue(1),
      },
      {
        id: "psalm50",
        label: { ar: "المزمور الخمسون", en: "Psalm 50" },
        ref: { ar: "مزمور 50", en: "Psalm 50" },
        lines: psalm50,
        hue: hue(2),
      },
      {
        id: "psalms",
        label: psalms.label,
        ref: psalms.ref,
        lines: psalms.lines,
        hue: hue(3),
      },
      {
        id: "gospel",
        label: { ar: "الإنجيل", en: "The Gospel" },
        ref: gospel.ref,
        lines: gospel.lines,
        hue: hue(4),
      },
      {
        id: "litanies",
        label: { ar: "القطع والطلبات", en: "Litanies" },
        lines: litanies,
        hue: hue(0),
      },
      {
        id: "absolution",
        label: { ar: "التحليل", en: "Absolution" },
        lines: absolution,
        hue: hue(1),
      },
    ],
  };
}

export const agpeyaHours: PrayerHour[] = [
  buildHour(
    "prime",
    { ar: "صلاة بدء النهار وشكر الله على النور الجديد", en: "The prayer that begins the day and thanks God for new light" },
    {
      label: { ar: "مزامير باكر", en: "Psalms of the Morning" },
      ref: { ar: "مزمور 62 ، 66 ، 69", en: "Psalms 62, 66, 69" },
      lines: [
        {
          ar: "يَا اللهُ إِلَهِي، إِلَيْكَ أَبْتَكِرُ، عَطِشَتْ إِلَيْكَ نَفْسِي.",
          en: "O God, You are my God; early will I seek You; my soul thirsts for You.",
        },
        {
          ar: "لِأَنَّ رَحْمَتَكَ خَيْرٌ مِنَ الْحَيَاةِ، فَشَفَتَايَ تُسَبِّحَانِكَ.",
          en: "Because Your mercy is better than life, my lips shall praise You.",
        },
      ],
    },
    {
      ref: { ar: "يوحنا 1 : 1 - 17", en: "John 1 : 1 - 17" },
      lines: [
        {
          ar: "فِي الْبَدْءِ كَانَ الْكَلِمَةُ، وَالْكَلِمَةُ كَانَ عِنْدَ اللهِ، وَكَانَ الْكَلِمَةُ اللهَ.",
          en: "In the beginning was the Word, and the Word was with God, and the Word was God.",
        },
        {
          ar: "كَانَ النُّورُ الْحَقِيقِيُّ الَّذِي يُنِيرُ كُلَّ إِنْسَانٍ آتِيًا إِلَى الْعَالَمِ.",
          en: "That was the true Light which gives light to every man coming into the world.",
        },
      ],
    },
  ),
  buildHour(
    "terce",
    { ar: "تذكار حلول الروح القدس على التلاميذ", en: "A remembrance of the Spirit descending on the disciples" },
    {
      label: { ar: "مزامير الثالثة", en: "Psalms of the Third Hour" },
      ref: { ar: "مزمور 19 ، 22 ، 23", en: "Psalms 19, 22, 23" },
      lines: [
        {
          ar: "الرَّبُّ يَرْعَانِي فَلَا يُعْوِزُنِي شَيْءٌ.",
          en: "The Lord is my shepherd; I shall not want.",
        },
      ],
    },
    {
      ref: { ar: "يوحنا 14 : 26 - 31", en: "John 14 : 26 - 31" },
      lines: [
        {
          ar: "وَأَمَّا الْمُعَزِّي، الرُّوحُ الْقُدُسُ، فَهُوَ يُعَلِّمُكُمْ كُلَّ شَيْءٍ.",
          en: "But the Helper, the Holy Spirit, He will teach you all things.",
        },
      ],
    },
  ),
  buildHour(
    "sext",
    { ar: "تذكار صلب المخلص عن خلاص العالم", en: "A remembrance of the Saviour’s crucifixion for the world" },
    {
      label: { ar: "مزامير السادسة", en: "Psalms of the Sixth Hour" },
      ref: { ar: "مزمور 53 ، 66 ، 69", en: "Psalms 53, 66, 69" },
      lines: [
        {
          ar: "أَمَّا أَنَا فَإِلَى اللهِ صَرَخْتُ، وَالرَّبُّ يَسْمَعُ لِي.",
          en: "As for me, I will call upon God, and the Lord shall hear me.",
        },
      ],
    },
    {
      ref: { ar: "متى 5 : 1 - 16", en: "Matthew 5 : 1 - 16" },
      lines: [
        {
          ar: "طُوبَى لِلْمَسَاكِينِ بِالرُّوحِ، لِأَنَّ لَهُمْ مَلَكُوتَ السَّمَاوَاتِ.",
          en: "Blessed are the poor in spirit, for theirs is the kingdom of heaven.",
        },
      ],
    },
  ),
  buildHour(
    "none",
    { ar: "تذكار موت الرب على الصليب", en: "A remembrance of the Lord’s death on the cross" },
    {
      label: { ar: "مزامير التاسعة", en: "Psalms of the Ninth Hour" },
      ref: { ar: "مزمور 96 ، 97 ، 98", en: "Psalms 96, 97, 98" },
      lines: [
        {
          ar: "الرَّبُّ قَدْ مَلَكَ فَلْتَتَهَلَّلِ الأَرْضُ.",
          en: "The Lord reigns; let the earth rejoice.",
        },
      ],
    },
    {
      ref: { ar: "لوقا 9 : 10 - 17", en: "Luke 9 : 10 - 17" },
      lines: [
        {
          ar: "فَأَخَذَ الْأَرْغِفَةَ وَبَارَكَ وَكَسَّرَ وَأَعْطَى التَّلَامِيذَ.",
          en: "Then He took the loaves, blessed them, broke them, and gave them to the disciples.",
        },
      ],
    },
  ),
  buildHour(
    "vespers",
    { ar: "شكر على انتهاء النهار وطلب رحمة عند الغروب", en: "Thanks for the ended day and mercy at sunset" },
    {
      label: { ar: "مزامير الغروب", en: "Psalms of Vespers" },
      ref: { ar: "مزمور 116 ، 117 ، 118", en: "Psalms 116, 117, 118" },
      lines: [
        {
          ar: "سَبِّحُوا الرَّبَّ يَا جَمِيعَ الأُمَمِ، بَارِكُوهُ يَا كُلَّ الشُّعُوبِ.",
          en: "Praise the Lord, all you nations; bless Him, all you peoples.",
        },
      ],
    },
    {
      ref: { ar: "لوقا 4 : 38 - 41", en: "Luke 4 : 38 - 41" },
      lines: [
        {
          ar: "وَعِنْدَ غُرُوبِ الشَّمْسِ جَمِيعُ الَّذِينَ كَانَ عِنْدَهُمْ مَرْضَى أَتَوْا بِهِمْ إِلَيْهِ.",
          en: "When the sun was setting, all those who had any sick brought them to Him.",
        },
      ],
    },
  ),
  buildHour(
    "compline",
    { ar: "صلاة قبل النوم وفحص القلب أمام الله", en: "A prayer before sleep, examining the heart before God" },
    {
      label: { ar: "مزامير النوم", en: "Psalms of Compline" },
      ref: { ar: "مزمور 129 ، 130 ، 131", en: "Psalms 129, 130, 131" },
      lines: [
        {
          ar: "مِنَ الأَعْمَاقِ صَرَخْتُ إِلَيْكَ يَا رَبُّ، يَا رَبُّ اسْتَمِعْ صَوْتِي.",
          en: "Out of the depths I have cried to You, O Lord; Lord, hear my voice.",
        },
      ],
    },
    {
      ref: { ar: "لوقا 7 : 36 - 50", en: "Luke 7 : 36 - 50" },
      lines: [
        {
          ar: "مَغْفُورَةٌ لَكِ خَطَايَاكِ. إِيمَانُكِ قَدْ خَلَّصَكِ، اذْهَبِي بِسَلَامٍ.",
          en: "Your sins are forgiven. Your faith has saved you; go in peace.",
        },
      ],
    },
  ),
  buildHour(
    "veil",
    { ar: "صلاة الستار للرهبان قبل السكون", en: "The Prayer of the Veil, before the night’s stillness" },
    {
      label: { ar: "مزامير الستار", en: "Psalms of the Veil" },
      ref: { ar: "مزمور 4 ، 6 ، 12", en: "Psalms 4, 6, 12" },
      lines: [
        {
          ar: "بِسَلَامٍ أَنَامُ وَأَسْتَرِيحُ، لِأَنَّكَ أَنْتَ يَا رَبُّ وَحْدَكَ فِي رَجَاءٍ أَسْكَنْتَنِي.",
          en: "I will lie down in peace and sleep, for You alone, O Lord, make me dwell in hope.",
        },
      ],
    },
    {
      ref: { ar: "لوقا 23 : 39 - 43", en: "Luke 23 : 39 - 43" },
      lines: [
        {
          ar: "الْيَوْمَ تَكُونُ مَعِي فِي الْفِرْدَوْسِ.",
          en: "Today you will be with Me in Paradise.",
        },
      ],
    },
  ),
  buildHour(
    "mid1",
    { ar: "الخدمة الأولى من صلاة نصف الليل", en: "The first service of the Midnight Prayer" },
    {
      label: { ar: "مزامير الخدمة الأولى", en: "Psalms of the first watch" },
      ref: { ar: "مزمور 119", en: "Psalm 119" },
      lines: [
        {
          ar: "سِرَاجٌ لِرِجْلِي كَلَامُكَ وَنُورٌ لِسَبِيلِي.",
          en: "Your word is a lamp to my feet and a light to my path.",
        },
      ],
    },
    {
      ref: { ar: "متى 25 : 1 - 13", en: "Matthew 25 : 1 - 13" },
      lines: [
        {
          ar: "هُوَذَا الْعَرِيسُ مُقْبِلٌ، فَاخْرُجُوا لِلِقَائِهِ.",
          en: "Behold, the bridegroom is coming; go out to meet him.",
        },
      ],
    },
  ),
  buildHour(
    "mid2",
    { ar: "الخدمة الثانية من صلاة نصف الليل", en: "The second service of the Midnight Prayer" },
    {
      label: { ar: "مزامير الخدمة الثانية", en: "Psalms of the second watch" },
      ref: { ar: "مزمور 120 - 128", en: "Psalms 120 - 128" },
      lines: [
        {
          ar: "رَفَعْتُ عَيْنَيَّ إِلَى الْجِبَالِ، مِنْ حَيْثُ يَأْتِي عَوْنِي.",
          en: "I lift up my eyes to the hills; from whence comes my help.",
        },
      ],
    },
    {
      ref: { ar: "لوقا 12 : 32 - 46", en: "Luke 12 : 32 - 46" },
      lines: [
        {
          ar: "لِتَكُنْ أَحْقَاؤُكُمْ مُمَنْطَقَةً وَسُرُجُكُمْ مُوقَدَةً.",
          en: "Let your waist be girded and your lamps burning.",
        },
      ],
    },
  ),
  buildHour(
    "mid3",
    { ar: "الخدمة الثالثة من صلاة نصف الليل", en: "The third service of the Midnight Prayer" },
    {
      label: { ar: "مزامير الخدمة الثالثة", en: "Psalms of the third watch" },
      ref: { ar: "مزمور 129 - 133", en: "Psalms 129 - 133" },
      lines: [
        {
          ar: "هَا مَا أَحْسَنَ وَمَا أَجْمَلَ أَنْ يَسْكُنَ الإِخْوَةُ مَعًا.",
          en: "Behold, how good and pleasant it is for brethren to dwell together.",
        },
      ],
    },
    {
      ref: { ar: "لوقا 18 : 1 - 8", en: "Luke 18 : 1 - 8" },
      lines: [
        {
          ar: "يَنْبَغِي أَنْ يُصَلَّى كُلَّ حِينٍ وَلَا يُمَلَّ.",
          en: "Men always ought to pray and not lose heart.",
        },
      ],
    },
  ),
];

export const findHour = (id: string) =>
  agpeyaHours.find((h) => h.id === id) ?? agpeyaHours[0]!;
