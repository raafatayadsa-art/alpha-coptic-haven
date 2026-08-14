/**
 * Khoulagy (the Coptic liturgy book) — presentation-only content for the Alpha
 * prototype. Bilingual + Coptic strings live here so the screens stay purely
 * visual. No logic, no fetching, no persistence.
 */

export type Bi = { ar: string; en: string };

export type KhGroupKey = "liturgy" | "tasbeha" | "awashy" | "doxology" | "khetam";

/** Colour family per collection — drives --hue / --hue-2 on the cards. */
export const khHue: Record<KhGroupKey, { hue: string; hue2: string }> = {
  liturgy: { hue: "oklch(0.520 0.130 302)", hue2: "oklch(0.822 0.082 304)" },
  tasbeha: { hue: "oklch(0.660 0.112 74)", hue2: "oklch(0.872 0.084 88)" },
  awashy: { hue: "oklch(0.552 0.098 168)", hue2: "oklch(0.836 0.078 166)" },
  doxology: { hue: "oklch(0.510 0.120 268)", hue2: "oklch(0.812 0.078 270)" },
  khetam: { hue: "oklch(0.520 0.126 22)", hue2: "oklch(0.826 0.084 38)" },
};

export const khGroupLabel: Record<KhGroupKey, Bi> = {
  liturgy: { ar: "القداسات", en: "Liturgies" },
  tasbeha: { ar: "التسبحة", en: "Midnight Praise" },
  awashy: { ar: "الأواشي", en: "Litanies" },
  doxology: { ar: "الذكصولوجيات", en: "Doxologies" },
  khetam: { ar: "الختام", en: "Conclusion" },
};

export const khGroupCaption: Record<KhGroupKey, Bi> = {
  liturgy: { ar: "باسيليوس · غريغوريوس · كيرلس", en: "Basil · Gregory · Cyril" },
  tasbeha: { ar: "الهوسات والثيؤطوكيات", en: "Hoses & Theotokias" },
  awashy: { ar: "أواشي الكاهن في القداس", en: "The priest’s litanies" },
  doxology: { ar: "مدائح القديسين والأعياد", en: "Praises of saints & feasts" },
  khetam: { ar: "التوزيع والبركة الختامية", en: "Distribution & final blessing" },
};

/* ── The three liturgies ───────────────────────────────────── */

export type Rite = {
  id: "basil" | "gregory" | "cyril";
  name: Bi;
  coptic: string;
  caption: Bi;
  sections: number;
  minutes: number;
};

export const rites: Rite[] = [
  {
    id: "basil",
    name: { ar: "قداس القديس باسيليوس", en: "Liturgy of St. Basil" },
    coptic: "ⲃⲁⲥⲓⲗⲓⲟⲥ",
    caption: { ar: "القداس المستخدم في معظم أيام السنة", en: "Used on most days of the year" },
    sections: 7,
    minutes: 96,
  },
  {
    id: "gregory",
    name: { ar: "قداس القديس غريغوريوس", en: "Liturgy of St. Gregory" },
    coptic: "ⲅⲣⲏⲅⲟⲣⲓⲟⲥ",
    caption: { ar: "قداس الأعياد السيدية الكبرى", en: "For the great feasts of the Lord" },
    sections: 7,
    minutes: 88,
  },
  {
    id: "cyril",
    name: { ar: "قداس القديس كيرلس", en: "Liturgy of St. Cyril" },
    coptic: "ⲕⲩⲣⲓⲗⲗⲟⲥ",
    caption: { ar: "أقدم القداسات، يُصلَّى في الصوم الكبير", en: "The most ancient rite, prayed in Great Lent" },
    sections: 6,
    minutes: 104,
  },
];

/* ── Parts of a liturgy, in the order they are prayed ──────── */

export type Role = "priest" | "deacon" | "people";

export const roleLabel: Record<Role, Bi> = {
  priest: { ar: "الكاهن", en: "Priest" },
  deacon: { ar: "الشماس", en: "Deacon" },
  people: { ar: "الشعب", en: "People" },
};

export type KhLine = { role: Role; ar: string; en: string; cop?: string };

export type KhPart = {
  id: string;
  group: KhGroupKey;
  title: Bi;
  hint: Bi;
  minutes: number;
  lines: KhLine[];
};

export const parts: KhPart[] = [
  {
    id: "prep",
    group: "liturgy",
    title: { ar: "الاستعداد وصلاة المزامير", en: "Preparation & psalm prayer" },
    hint: { ar: "قبل رفع البخور", en: "Before the raising of incense" },
    minutes: 6,
    lines: [
      {
        role: "priest",
        ar: "أَيُّهَا الرَّبُّ الإِلَهُ ضَابِطُ الْكُلِّ، أَبُو رَبِّنَا وَإِلَهِنَا وَمُخَلِّصِنَا يَسُوعَ الْمَسِيحِ.",
        en: "O Lord God the Almighty, Father of our Lord, God and Saviour Jesus Christ.",
        cop: "Ⲡ̀ⲟⲩⲣⲟ ⲛ̀ⲧⲉ ϯϩⲓⲣⲏⲛⲏ",
      },
      {
        role: "people",
        ar: "نَسْجُدُ لآبِ النُّورِ، وَابْنِهِ الوَحِيدِ، وَالرُّوحِ الْقُدُسِ الْمُعَزِّي.",
        en: "We worship the Father of light, His only-begotten Son, and the Holy Spirit the Comforter.",
        cop: "ⲧⲉⲛⲟⲩⲱϣⲧ ⲙ̀Ⲫ̀ⲓⲱⲧ",
      },
      {
        role: "deacon",
        ar: "صَلُّوا، قِفُوا لِلصَّلاةِ.",
        en: "Pray. Stand up for prayer.",
        cop: "ⲉ̀ⲡⲓ ⲡⲣⲟⲥⲉⲩⲭⲏ ⲥⲧⲁⲑⲏⲧⲉ",
      },
      {
        role: "priest",
        ar: "طَهِّرْ قُلُوبَنَا، وَقَدِّسْ أَنْفُسَنَا كُلَّهَا، لِكَيْ نَخْدِمَكَ بِطَهَارَةٍ.",
        en: "Purify our hearts and sanctify all our souls, that we may serve You in purity.",
      },
    ],
  },
  {
    id: "offering",
    group: "liturgy",
    title: { ar: "تقديم الحمل", en: "The offering of the Lamb" },
    hint: { ar: "اختيار القربان ورشمه", en: "Choosing and signing the oblation" },
    minutes: 8,
    lines: [
      {
        role: "priest",
        ar: "مَجْدًا وَإِكْرَامًا، إِكْرَامًا وَمَجْدًا لِلثَّالُوثِ الأَقْدَسِ.",
        en: "Glory and honour, honour and glory to the All-Holy Trinity.",
        cop: "ⲟⲩⲱⲟⲩ ⲛⲉⲙ ⲟⲩⲧⲁⲓⲟ",
      },
      {
        role: "people",
        ar: "آمِينَ. يَا رَبُّ ارْحَمْ، يَا رَبُّ ارْحَمْ، يَا رَبُّ بَارِكْ. آمِينَ.",
        en: "Amen. Lord have mercy, Lord have mercy, Lord bless us. Amen.",
        cop: "Ⲕⲩⲣⲓⲉ ⲉ̀ⲗⲉⲏⲥⲟⲛ",
      },
      {
        role: "deacon",
        ar: "صَلُّوا مِنْ أَجْلِ هَذِهِ الذَّبِيحَةِ الْمُقَدَّسَةِ الْمُقَرَّبَةِ.",
        en: "Pray for this holy sacrifice offered up.",
      },
      {
        role: "priest",
        ar: "اللهُ الَّذِي قَبِلَ إِلَيْهِ قَرَابِينَ هَابِيلَ الصِّدِّيقِ، اقْبَلْ إِلَيْكَ قُرْبَانَنَا.",
        en: "O God who accepted the offerings of righteous Abel, accept our offering.",
      },
    ],
  },
  {
    id: "thanksgiving",
    group: "awashy",
    title: { ar: "صلاة الشكر", en: "The prayer of thanksgiving" },
    hint: { ar: "أوشية المرضى والمسافرين", en: "Litanies for the sick & travellers" },
    minutes: 7,
    lines: [
      {
        role: "priest",
        ar: "فَلْنَشْكُرْ صَانِعَ الْخَيْرَاتِ، الرَّحُومَ اللهَ أَبَا رَبِّنَا يَسُوعَ الْمَسِيحِ.",
        en: "Let us give thanks to the Doer of good, the merciful God, Father of our Lord Jesus Christ.",
        cop: "ⲙⲁⲣⲉⲛϣⲉⲡ̀ϩⲙⲟⲧ",
      },
      {
        role: "people",
        ar: "أَمَامَ الرَّبِّ نَسْأَلُ أَنْ يَرْحَمَنَا وَيَتَرَاءَفَ عَلَيْنَا.",
        en: "Before the Lord we ask that He have mercy and compassion on us.",
      },
      {
        role: "priest",
        ar: "المَرْضَى شَعْبِكَ افْتَقِدْهُمْ بِالرَّحَمَاتِ وَالرَّأْفَاتِ، اشْفِهِمْ.",
        en: "Visit the sick of Your people with mercies and compassions; heal them.",
      },
    ],
  },
  {
    id: "readings",
    group: "liturgy",
    title: { ar: "القراءات والبولس", en: "The readings & Pauline" },
    hint: { ar: "البولس · الكاثوليكون · الإبركسيس", en: "Pauline · Catholic · Praxis" },
    minutes: 12,
    lines: [
      {
        role: "deacon",
        ar: "بُولُسُ عَبْدُ رَبِّنَا يَسُوعَ الْمَسِيحِ، الرَّسُولُ الْمَدْعُوُّ.",
        en: "Paul, the servant of our Lord Jesus Christ, called to be an apostle.",
        cop: "Ⲡⲁⲩⲗⲟⲥ ⲫ̀ⲃⲱⲕ",
      },
      {
        role: "people",
        ar: "نِعْمَةُ اللهِ الآبِ فَلْتَأْتِ عَلَى أَرْوَاحِنَا يَا آبَائِي وَإِخْوَتِي.",
        en: "The grace of God the Father come upon our spirits, my fathers and brethren.",
      },
      {
        role: "priest",
        ar: "بَارِكْ يَا رَبُّ سَامِعِي إِنْجِيلِكَ الْمُقَدَّسِ.",
        en: "Bless, O Lord, those who hear Your holy Gospel.",
      },
    ],
  },
  {
    id: "anaphora",
    group: "doxology",
    title: { ar: "الأنافورا والقدّوس", en: "The Anaphora & the Holy" },
    hint: { ar: "قلب القداس الإلهي", en: "The heart of the Divine Liturgy" },
    minutes: 14,
    lines: [
      {
        role: "priest",
        ar: "الرَّبُّ مَعَ جَمِيعِكُمْ. ارْفَعُوا قُلُوبَكُمْ.",
        en: "The Lord be with you all. Lift up your hearts.",
        cop: "Ⲟ̀ Ⲕⲩⲣⲓⲟⲥ ⲙⲉⲧⲁ ⲡⲁⲛⲧⲱⲛ",
      },
      {
        role: "people",
        ar: "قُدُّوسٌ، قُدُّوسٌ، قُدُّوسٌ، رَبُّ الصَّبَاؤُوتِ. السَّمَاءُ وَالأَرْضُ مَمْلُوءَتَانِ مِنْ مَجْدِكَ الأَقْدَسِ.",
        en: "Holy, Holy, Holy, Lord of Hosts. Heaven and earth are full of Your holy glory.",
        cop: "Ⲁ̀ⲅⲓⲟⲥ ⲁ̀ⲅⲓⲟⲥ ⲁ̀ⲅⲓⲟⲥ",
      },
      {
        role: "deacon",
        ar: "أَنْصِتُوا بِخَوْفِ اللهِ.",
        en: "Attend with the fear of God.",
      },
    ],
  },
  {
    id: "communion",
    group: "tasbeha",
    title: { ar: "التوزيع والمزامير", en: "Communion & psalms" },
    hint: { ar: "مزمور ١٥٠ وألحان التوزيع", en: "Psalm 150 & communion hymns" },
    minutes: 11,
    lines: [
      {
        role: "people",
        ar: "سَبِّحُوا اللهَ فِي جَمِيعِ قِدِّيسِيهِ. أَلِّلُويَا.",
        en: "Praise God in all His saints. Alleluia.",
        cop: "Ⲁⲗⲗⲏⲗⲟⲩⲓⲁ",
      },
      {
        role: "priest",
        ar: "الأَقْدَاسُ لِلْقِدِّيسِينَ. مُبَارَكٌ الرَّبُّ يَسُوعُ الْمَسِيحُ ابْنُ اللهِ.",
        en: "The holies for the holy. Blessed be the Lord Jesus Christ, the Son of God.",
      },
    ],
  },
  {
    id: "khetam",
    group: "khetam",
    title: { ar: "بركة الختام", en: "The final blessing" },
    hint: { ar: "الانصراف بسلام", en: "Dismissal in peace" },
    minutes: 4,
    lines: [
      {
        role: "priest",
        ar: "أَيُّهَا الْمَسِيحُ إِلَهُنَا، احْفَظْ لَنَا حَيَاةَ وَقِيَامَ أَبِينَا الْمُكَرَّمِ.",
        en: "O Christ our God, keep for us the life and standing of our honoured father.",
      },
      {
        role: "people",
        ar: "آمِينَ. لِتَكُنْ نِعْمَةُ رَبِّنَا يَسُوعَ الْمَسِيحِ مَعَ جَمِيعِكُمْ.",
        en: "Amen. May the grace of our Lord Jesus Christ be with you all.",
        cop: "ϩⲏⲛⲟⲩϥⲓ ⲛ̀ⲧⲉ Ⲡ̀ⲟⲩⲣⲟ",
      },
    ],
  },
];

/* ── Hymn collections shown on the dashboard ──────────────── */

export type Collection = {
  id: string;
  group: KhGroupKey;
  title: Bi;
  count: Bi;
};

export const collections: Collection[] = [
  { id: "tasbeha", group: "tasbeha", title: { ar: "التسبحة", en: "Midnight Praise" }, count: { ar: "٤ ألحان", en: "4 hymns" } },
  { id: "awashy", group: "awashy", title: { ar: "الأواشي", en: "Litanies" }, count: { ar: "٧ ألحان", en: "7 hymns" } },
  { id: "doxology", group: "doxology", title: { ar: "الذكصولوجيات", en: "Doxologies" }, count: { ar: "٥ ألحان", en: "5 hymns" } },
  { id: "khetam", group: "khetam", title: { ar: "الختام", en: "Conclusion" }, count: { ar: "لحن واحد", en: "1 hymn" } },
];
