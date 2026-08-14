import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* Presentation-only bilingual layer for the Alpha Coptic prototype. */

export type Lang = "ar" | "en";

const STORAGE_KEY = "alpha-lang";

type Dict = Record<string, { ar: string; en: string }>;

export const dict: Dict = {
  /* ── Shared ─────────────────────────────────────────────── */
  "app.church": { ar: "كنيسة السيدة العذراء مريم والقديس مارمرقس", en: "St. Mary & St. Mark Coptic Orthodox Church" },
  "app.churchShort": { ar: "العذراء مريم ومارمرقس", en: "St. Mary & St. Mark" },
  "app.brand": { ar: "ألفا القبطية", en: "Alpha Coptic" },
  "app.language": { ar: "اللغة", en: "Language" },
  "app.notifications": { ar: "التنبيهات", en: "Notifications" },
  "app.churchControl": { ar: "تحكم الكنيسة", en: "Church Control" },
  "app.viewAll": { ar: "عرض الكل", en: "View all" },
  "app.details": { ar: "التفاصيل", en: "Details" },
  "app.back": { ar: "رجوع", en: "Back" },
  "app.public": { ar: "عام", en: "Public" },
  "app.members": { ar: "أعضاء الكنيسة", en: "Church members" },
  "app.likes": { ar: "إعجاب", en: "likes" },
  "app.open": { ar: "فتح", en: "Open" },


  /* ── Bottom navigation ──────────────────────────────────── */
  "nav.main": { ar: "التنقل الرئيسي", en: "Main navigation" },
  "nav.home": { ar: "الرئيسية", en: "Home" },
  "nav.myChurch": { ar: "كنيستي", en: "My Church" },
  "nav.library": { ar: "المكتبة", en: "Library" },
  "nav.bible": { ar: "الكتاب المقدس", en: "Bible" },
  "nav.community": { ar: "المجتمع", en: "Community" },
  "nav.profile": { ar: "صفحتي", en: "My Page" },
  "nav.audio": { ar: "الصوتيات", en: "Audio" },
  "nav.photos": { ar: "الصور", en: "Photos" },
  "nav.account": { ar: "حسابي", en: "Account" },

  /* ── Home / My Church ──────────────────────────────────── */
  "home.liturgyNow": { ar: "القداس مُقام الآن", en: "Liturgy in progress" },
  "home.cover.alt": { ar: "نور الشمس على المذبح وقت القداس الإلهي", en: "Sunlight falling on the altar during the Divine Liturgy" },
  "home.location": { ar: "شبرا · محافظة القاهرة", en: "Shoubra · Cairo Governorate" },
  "home.stat.members": { ar: "الأعضاء", en: "Members" },
  "home.stat.families": { ar: "الأسر", en: "Families" },
  "home.stat.nextLiturgy": { ar: "القداس القادم", en: "Next Liturgy" },
  "home.stat.nextLiturgyValue": { ar: "الأحد ٧:٠٠", en: "Sun 7:00" },
  "home.stat.membersValue": { ar: "١٢٤٨", en: "1,248" },
  "home.stat.familiesValue": { ar: "٣٧٢", en: "372" },
  "home.intro": { ar: "بيت لـ ٣٧٢ أسرة في شبرا منذ عام ١٩٤٨. أنت من هنا.", en: "A home for 372 families in Shoubra since 1948. You belong here." },
  "home.follow": { ar: "متابعة الكنيسة", en: "Follow church" },
  "home.following": { ar: "تمت المتابعة", en: "Following" },

  "home.fathers": { ar: "الآباء الكهنة", en: "The Fathers" },
  "home.fathers.caption": { ar: "رعاة كنيستنا", en: "Shepherds of our parish" },
  "home.appointment": { ar: "حجز موعد", en: "Appointment" },
  "home.call": { ar: "اتصال", en: "Call" },
  "home.message": { ar: "رسالة", en: "Message" },

  "priest.1.name": { ar: "القمص بيشوي صموئيل", en: "Fr. Bishoy Samuel" },
  "priest.1.rank": { ar: "الكاهن المسؤول", en: "Parish Priest" },
  "priest.2.name": { ar: "القمص مينا إسحق", en: "Fr. Mena Isaac" },
  "priest.2.rank": { ar: "قمص الكنيسة", en: "Archpriest" },
  "priest.3.name": { ar: "الأب كيرلس مرقس", en: "Fr. Kyrillos Marcos" },
  "priest.3.rank": { ar: "كاهن مساعد", en: "Associate Priest" },

  "home.churchLife": { ar: "حياة الكنيسة", en: "Church Life" },
  "home.churchLife.caption": { ar: "كل شيء في متناول يدك", en: "Everything within reach" },
  "link.members": { ar: "الأعضاء", en: "Members" },
  "link.families": { ar: "الأسر", en: "Families" },
  "link.services": { ar: "الخدمات", en: "Services" },
  "link.groups": { ar: "المجموعات", en: "Groups" },
  "link.events": { ar: "المناسبات", en: "Events" },
  "link.help": { ar: "طلب مساعدة", en: "Request Help" },
  "link.location": { ar: "الموقع", en: "Location" },
  "link.more": { ar: "المزيد", en: "More" },

  "home.posts": { ar: "منشورات الكنيسة", en: "Church Posts" },
  "home.posts.caption": { ar: "آخر الأخبار والإعلانات", en: "Latest news and announcements" },
  "post.1.category": { ar: "قداسات", en: "Liturgies" },
  "post.1.date": { ar: "الجمعة ٧ أغسطس", en: "Friday, Aug 7" },
  "post.1.title": { ar: "مواعيد قداسات الأسبوع وصلوات نصف الليل", en: "This week's liturgies and midnight praises" },
  "post.1.excerpt": { ar: "القداس الإلهي يوم الأحد الساعة السادسة صباحًا، ويتقدمه رفع بخور عشية السبت.", en: "The Divine Liturgy is on Sunday at 6 AM, preceded by Saturday vespers incense." },
  "post.1.likes": { ar: "١٨٤", en: "184" },
  "post.2.category": { ar: "اجتماعات", en: "Meetings" },
  "post.2.date": { ar: "الأربعاء ٥ أغسطس", en: "Wednesday, Aug 5" },
  "post.2.title": { ar: "اجتماع الخدام — التحضير لخدمة العام الجديد", en: "Servants' meeting — preparing for the new service year" },
  "post.2.excerpt": { ar: "لقاء الخدام في قاعة الكنيسة بعد صلاة العشية، ويشمل مراجعة خطة الخدمة.", en: "Servants gather in the church hall after vespers to review the service plan." },
  "post.2.likes": { ar: "٦٢", en: "62" },

  "home.calendar": { ar: "أجندة الكنيسة", en: "Church Calendar" },
  "home.calendar.caption": { ar: "اللقاءات القادمة", en: "Gatherings ahead" },
  "event.1.when": { ar: "اليوم · ٧:٠٠ ص", en: "Today · 7:00 AM" },
  "event.1.title": { ar: "القداس الإلهي", en: "Divine Liturgy" },
  "event.1.where": { ar: "المذبح الرئيسي · القمص بيشوي صموئيل", en: "Main Altar · Fr. Bishoy Samuel" },
  "event.2.when": { ar: "غدًا · ٦:٣٠ م", en: "Tomorrow · 6:30 PM" },
  "event.2.title": { ar: "اجتماع الشباب الروحي", en: "Youth Spiritual Meeting" },
  "event.2.where": { ar: "قاعة مارمرقس · الدور الثالث", en: "St. Mark's Hall, 3rd Floor" },
  "event.3.when": { ar: "الجمعة · ٩:٠٠ ص", en: "Friday · 9:00 AM" },
  "event.3.title": { ar: "رحلة مدارس الأحد", en: "Sunday School Trip" },
  "event.3.where": { ar: "دير وادي الريان", en: "Wadi El Rayan Monastery" },
  "event.4.when": { ar: "١١ سبتمبر · طول اليوم", en: "Sep 11 · All day" },
  "event.4.title": { ar: "عيد النيروز", en: "Feast of El-Nayrouz" },
  "event.4.where": { ar: "احتفال رأس السنة القبطية", en: "Coptic New Year celebration" },

  "home.announcements": { ar: "إعلانات ولحظات", en: "Announcements" },
  "home.announcements.caption": { ar: "من قلب مجتمعنا", en: "Moments from our community" },
  "feed.comment": { ar: "تعليق", en: "Comment" },
  "feed.read": { ar: "قراءة", en: "Read" },
  "feed.1.author": { ar: "إعلام الكنيسة", en: "Church Media" },
  "feed.1.time": { ar: "منذ ساعتين", en: "2 hours ago" },
  "feed.1.alt": { ar: "شباب أقباط عند باب الدير", en: "Coptic youth gathered in front of the monastery gate" },
  "feed.1.body": { ar: "لمحات من احتفالات عيد القيامة — شكرًا لكل خادم جعل هذا الأسبوع ممكنًا.", en: "Highlights from the Resurrection Feast celebrations — thank you to every servant who made this week possible." },
  "feed.1.commentName": { ar: "مريم ع.", en: "Mariam A." },
  "feed.1.commentText": { ar: "الكورال كان سماويًا — ربنا يبارككم.", en: "The chorus was heavenly — God bless you all." },
  "feed.2.author": { ar: "القمص بيشوي صموئيل", en: "Fr. Bishoy Samuel" },
  "feed.2.time": { ar: "أمس", en: "Yesterday" },
  "feed.2.alt": { ar: "شموع مضاءة في زاوية صلاة هادئة", en: "Candles glowing in a quiet church prayer corner" },
  "feed.2.body": { ar: "زاوية الصلاة مفتوحة طول الأسبوع. تعال أشعل شمعة واسكن قليلًا.", en: "The prayer corner stays open all week. Come light a candle and be still for a while." },
  "feed.2.commentName": { ar: "بيتر ج.", en: "Peter G." },
  "feed.2.commentText": { ar: "مررت بعد العمل — سلام حقيقي.", en: "Passed by after work — such peace." },

  "home.footer.quote": { ar: "«كنيستي… بيتي»", en: "“My Church, my home.”" },
  "home.footer.meta": { ar: "ألفا القبطية · شبرا، القاهرة", en: "Alpha Coptic · Shoubra, Cairo" },

  /* ── Church Control ────────────────────────────────────── */
  "cc.title": { ar: "تحكم الكنيسة", en: "Church Control" },
  "cc.caption": { ar: "إدارة كنيستك", en: "Manage your church" },
  "cc.verified": { ar: "جهة موثقة", en: "Verified entity" },
  "cc.church.name": { ar: "كنيسة السيدة العذراء مريم", en: "St. Mary Coptic Orthodox Church" },
  "cc.church.city": { ar: "شبرا الخيمة", en: "Shoubra El Kheima" },
  "cc.church.governorate": { ar: "محافظة القليوبية", en: "Qalyubia Governorate" },
  "cc.followers": { ar: "متابع", en: "followers" },
  "cc.followersValue": { ar: "١٢.٤ ألف", en: "12.4K" },
  "cc.follow": { ar: "متابعة", en: "Follow" },
  "cc.responsible.role": { ar: "الكاهن المسؤول", en: "Responsible priest" },
  "cc.responsible.name": { ar: "القمص بيشوي صموئيل", en: "Fr. Bishoy Samuel" },
  "cc.action.call": { ar: "اتصال", en: "Call" },
  "cc.action.message": { ar: "رسالة", en: "Message" },
  "cc.action.location": { ar: "موقع", en: "Location" },
  "cc.stat.members": { ar: "أعضاء", en: "Members" },
  "cc.stat.posts": { ar: "منشورات", en: "Posts" },
  "cc.stat.books": { ar: "كتب", en: "Books" },
  "cc.stat.audio": { ar: "صوتيات", en: "Audio" },
  "cc.stat.membersValue": { ar: "٤٨٢", en: "482" },
  "cc.stat.postsValue": { ar: "١٣٦", en: "136" },
  "cc.stat.booksValue": { ar: "٢٤", en: "24" },
  "cc.stat.audioValue": { ar: "٥٧", en: "57" },
  "cc.tabs.label": { ar: "أقسام الكنيسة", en: "Church sections" },
  "cc.tab.home": { ar: "الرئيسية", en: "Overview" },
  "cc.tab.posts": { ar: "المنشورات", en: "Posts" },
  "cc.tab.library": { ar: "المكتبة", en: "Library" },
  "cc.tab.audio": { ar: "الصوتيات", en: "Audio" },
  "cc.tab.video": { ar: "الفيديوهات", en: "Videos" },
  "cc.tab.photos": { ar: "الصور", en: "Photos" },
  "cc.tab.about": { ar: "حول الكنيسة", en: "About" },
  "cc.section.posts": { ar: "منشورات الكنيسة", en: "Church posts" },
  "cc.section.posts.caption": { ar: "آخر الأخبار والإعلانات", en: "Latest news and announcements" },
  "cc.section.library": { ar: "مكتبة الكنيسة", en: "Church library" },
  "cc.section.library.caption": { ar: "كتب وفيديوهات وصوتيات", en: "Books, videos and audio" },
  "cc.section.library.action": { ar: "المكتبة", en: "Library" },
  "cc.section.audio": { ar: "الصوتيات", en: "Audio" },
  "cc.section.audio.caption": { ar: "ألحان وعظات وتأملات", en: "Hymns, sermons and meditations" },
  "cc.section.audio.action": { ar: "الكل", en: "All" },
  "cc.section.video": { ar: "الفيديوهات", en: "Videos" },
  "cc.section.video.caption": { ar: "بث ولقاءات مسجلة", en: "Streams and recorded meetings" },
  "cc.section.photos": { ar: "ألبومات الصور", en: "Photo albums" },
  "cc.section.photos.caption": { ar: "جارٍ التحميل", en: "Loading" },
  "cc.section.about": { ar: "حول الكنيسة", en: "About the church" },
  "cc.section.about.caption": { ar: "بيانات الكنيسة الرسمية", en: "Official church information" },
  "cc.empty.title": { ar: "لا توجد فيديوهات بعد", en: "No videos yet" },
  "cc.empty.body": { ar: "سيظهر هنا كل ما تنشره الكنيسة من لقاءات وقداسات مسجلة.", en: "Recorded meetings and liturgies the church publishes will appear here." },
  "cc.empty.retry": { ar: "إعادة المحاولة", en: "Try again" },
  "cc.footer.meta": { ar: "تحكم الكنيسة · ألفا للكنيسة القبطية الأرثوذكسية", en: "Church Control · Alpha Coptic Orthodox" },
  "cc.footer.quote": { ar: "«بيتي بيت الصلاة يُدعى»", en: "“My house shall be called a house of prayer.”" },

  "cc.about.diocese": { ar: "الإيبارشية", en: "Diocese" },
  "cc.about.dioceseValue": { ar: "إيبارشية شبرا الخيمة", en: "Diocese of Shoubra El Kheima" },
  "cc.about.city": { ar: "المدينة", en: "City" },
  "cc.about.cityValue": { ar: "شبرا الخيمة — القليوبية", en: "Shoubra El Kheima — Qalyubia" },
  "cc.about.country": { ar: "الدولة", en: "Country" },
  "cc.about.countryValue": { ar: "جمهورية مصر العربية", en: "Arab Republic of Egypt" },
  "cc.about.priest": { ar: "الكاهن المسؤول", en: "Responsible priest" },
  "cc.about.priestValue": { ar: "القمص بيشوي صموئيل", en: "Fr. Bishoy Samuel" },
  "cc.about.phone": { ar: "الهاتف الرسمي", en: "Official phone" },
  "cc.about.phoneValue": { ar: "+٢٠ ١٠ ١٢٣٤ ٥٦٧٨", en: "+20 10 1234 5678" },
  "cc.about.email": { ar: "البريد الرسمي", en: "Official email" },
  "cc.about.founded": { ar: "تاريخ التأسيس", en: "Founded" },
  "cc.about.foundedValue": { ar: "١٩٦٨ م", en: "1968 AD" },

  /* ── Content cards ─────────────────────────────────────── */
  "content.visibility.public": { ar: "عام · للمستخدمين الموثقين", en: "Public · verified users" },
  "content.visibility.members": { ar: "أعضاء الكنيسة فقط", en: "Church members only" },
  "content.visibility.private": { ar: "خاص", en: "Private" },
  "content.download": { ar: "تحميل", en: "Download" },
  "content.noDownload": { ar: "التحميل غير متاح", en: "Download unavailable" },

  "lib.1.title": { ar: "الأجبية — صلوات السواعي", en: "The Agpeya — Prayers of the Hours" },
  "lib.1.meta": { ar: "٣٢٠ صفحة", en: "320 pages" },
  "lib.2.title": { ar: "شرح القداس الغريغوري", en: "Explaining the Gregorian Liturgy" },
  "lib.2.meta": { ar: "٤٢:١٠", en: "42:10" },
  "lib.3.title": { ar: "ألحان شهر كيهك", en: "Hymns of the Month of Kiahk" },
  "lib.3.meta": { ar: "١:١٢:٣٠", en: "1:12:30" },
  "aud.1.title": { ar: "مديحة العذراء مريم", en: "Praise of the Virgin Mary" },
  "aud.1.meta": { ar: "٦:٤٢", en: "6:42" },
  "aud.2.title": { ar: "عظة الأحد — الرجاء في الضيقة", en: "Sunday sermon — Hope in tribulation" },
  "aud.2.meta": { ar: "٣٤:٠٥", en: "34:05" },
  "aud.3.title": { ar: "تأمل في المزمور الخمسين", en: "Meditation on Psalm 50" },
  "aud.3.meta": { ar: "١١:٢٠", en: "11:20" },
  "kind.book": { ar: "كتاب", en: "Book" },
  "kind.video": { ar: "فيديو", en: "Video" },
  "kind.audio": { ar: "صوتي", en: "Audio" },
  "kind.hymn": { ar: "لحن", en: "Hymn" },
  "kind.sermon": { ar: "عظة", en: "Sermon" },
  "kind.meditation": { ar: "تأمل", en: "Meditation" },
  "pub.church": { ar: "كنيسة السيدة العذراء مريم", en: "St. Mary Church" },
  "pub.choir": { ar: "كورال الكنيسة", en: "Church Choir" },
  "pub.choirMary": { ar: "كورال كنيسة السيدة العذراء", en: "St. Mary Church Choir" },
  "pub.priest": { ar: "القمص بيشوي صموئيل", en: "Fr. Bishoy Samuel" },
  /* ── Alpha Home (/) ─────────────────────────────────────── */
  "hm.greeting": { ar: "سلام لك", en: "Peace be with you" },
  "hm.today": { ar: "٧ مسرى ١٧٤٢ للشهداء", en: "7 Mesra 1742 A.M." },
  "hm.verse.eyebrow": { ar: "آية اليوم", en: "Verse of the day" },
  "hm.verse.text": {
    ar: "«أَنَا هُوَ النُّورُ، مَنْ يَتْبَعْنِي فَلَا يَمْشِي فِي الظُّلْمَةِ، بَلْ يَكُونُ لَهُ نُورُ الْحَيَاةِ»",
    en: "\u201cI am the light of the world. Whoever follows me will never walk in darkness.\u201d",
  },
  "hm.verse.ref": { ar: "يوحنا ٨ : ١٢", en: "John 8:12" },
  "hm.verse.save": { ar: "احتفظ بالآية", en: "Save verse" },
  "hm.saint.eyebrow": { ar: "قديس اليوم", en: "Saint of the day" },
  "hm.saint.name": { ar: "الأنبا باخوميوس أب الشركة", en: "St. Pachomius the Cenobite" },
  "hm.saint.line": {
    ar: "أبو الرهبنة الشركوية، جمع الآباء على صلاة واحدة وقلب واحد.",
    en: "Father of communal monasticism, who gathered the fathers into one prayer.",
  },
  "hm.saint.read": { ar: "اقرأ السيرة", en: "Read the life" },
  "hm.prayer.eyebrow": { ar: "صلاة اليوم", en: "Prayer of the day" },
  "hm.prayer.hour": { ar: "صلاة الساعة الثالثة", en: "Prayer of the Third Hour" },
  "hm.prayer.line": {
    ar: "أيها الروح القدس، جدّد فينا نعمتك واسكن في قلوبنا.",
    en: "O Holy Spirit, renew Your grace in us and dwell in our hearts.",
  },
  "hm.prayer.start": { ar: "ابدأ الصلاة", en: "Start praying" },
  "hm.prayer.minutes": { ar: "٦ دقائق", en: "6 min" },
  "hm.continue.eyebrow": { ar: "متابعة القراءة", en: "Continue reading" },
  "hm.continue.title": { ar: "إنجيل مرقس — الأصحاح ٤", en: "Mark — Chapter 4" },
  "hm.continue.progress": { ar: "٦٢٪ من قراءة اليوم", en: "62% of today\u2019s reading" },
  "hm.continue.resume": { ar: "أكمل", en: "Resume" },
  "hm.journey.eyebrow": { ar: "رحلة القراءة", en: "Reading journey" },
  "hm.journey.streak": { ar: "١٢ يومًا متصلة", en: "12-day streak" },
  "hm.journey.line": { ar: "ثبات جميل. تبقّى فصل واحد لهذا الأسبوع.", en: "Beautifully steady. One chapter left this week." },
  "hm.hub.eyebrow": { ar: "Spiritual Hub", en: "Spiritual Hub" },
  "hm.hub.title": { ar: "مكانك الروحي", en: "Your spiritual place" },
  "hm.hub.bible": { ar: "الكتاب المقدس", en: "Holy Bible" },
  "hm.hub.agpeya": { ar: "الأجبية", en: "Agpeya" },
  "hm.hub.katameros": { ar: "القطمارس", en: "Katameros" },
  "hm.hub.synaxarium": { ar: "السنكسار", en: "Synaxarium" },
  "hm.hub.khoulagy": { ar: "الخولاجي", en: "Khoulagy" },
  "hm.hub.fathers": { ar: "قسم الآباء", en: "The Fathers" },
  "hm.hub.library": { ar: "المكتبة", en: "Library" },
  "hm.hub.line": { ar: "كتبك في مكان واحد", en: "Your books, gathered" },
  "hm.hub.sub.bible": { ar: "Holy Bible", en: "Holy Bible" },
  "hm.hub.sub.agpeya": { ar: "Agpeya", en: "Book of Hours" },
  "hm.hub.sub.katameros": { ar: "Katameros", en: "Lectionary" },
  "hm.hub.sub.synaxarium": { ar: "Synaxarium", en: "Lives of Saints" },
  "hm.hub.sub.khoulagy": { ar: "Khoulagy", en: "Liturgy Book" },
  "hm.hub.sub.fathers": { ar: "The Fathers", en: "Patristics" },
  "hm.hub.sub.library": { ar: "Library", en: "All books" },

  "hm.church.eyebrow": { ar: "لمحة عن كنيستي", en: "A glimpse of my church" },
  "hm.church.line": { ar: "القداس القادم الأحد ٧:٠٠ صباحًا · ١٢٤٨ عضوًا", en: "Next liturgy Sunday 7:00 AM \u00b7 1,248 members" },
  "hm.church.open": { ar: "افتح كنيستي", en: "Open my church" },
  "hm.connect.eyebrow": { ar: "لمحة عن Alpha Connect", en: "A glimpse of Alpha Connect" },
  "hm.connect.line": {
    ar: "اتصال هادئ بين الكنائس والخدام والمكتبات في مكان واحد.",
    en: "A calm connection between churches, servants and libraries in one place.",
  },
  "hm.connect.cta": { ar: "تعرّف أكثر", en: "Learn more" },
  "hm.community.eyebrow": { ar: "Community", en: "Community" },
  "hm.community.line": { ar: "مجموعات ولقاءات قريبة منك", en: "Groups and gatherings near you" },
  "hm.community.g1": { ar: "خدمة الشباب", en: "Youth service" },
  "hm.community.g2": { ar: "مجموعة الألحان", en: "Hymns group" },
  "hm.community.g3": { ar: "دراسة الكتاب", en: "Bible study" },
  "hm.community.members": { ar: "عضوًا", en: "members" },
  "hm.events.eyebrow": { ar: "المناسبات والأحداث", en: "Occasions & events" },
  "hm.events.e1": { ar: "عيد التجلي", en: "Feast of the Transfiguration" },
  "hm.events.e1t": { ar: "الجمعة · قداس ٦:٣٠ ص", en: "Friday \u00b7 Liturgy 6:30 AM" },
  "hm.events.e2": { ar: "لقاء الشباب الشهري", en: "Monthly youth meeting" },
  "hm.events.e2t": { ar: "السبت · ٧:٠٠ م", en: "Saturday \u00b7 7:00 PM" },
  "hm.events.e3": { ar: "صوم السيدة العذراء", en: "Fast of the Virgin Mary" },
  "hm.events.e3t": { ar: "يبدأ ٧ أغسطس", en: "Begins August 7" },
  "hm.footer": { ar: "«اثبتوا فيَّ وأنا فيكم»", en: "\u201cAbide in me, and I in you.\u201d" },
};

type LanguageValue = {
  lang: Lang;
  dir: "rtl" | "ltr";
  isArabic: boolean;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: keyof typeof dict | string) => string;
};

const LanguageContext = createContext<LanguageValue | null>(null);

function readStored(): Lang {
  if (typeof window === "undefined") return "ar";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" || stored === "ar" ? stored : "ar";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  /* Restore the saved choice after hydration. */
  useEffect(() => {
    setLangState(readStored());
  }, []);

  /* Apply direction + persist. */
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(
    () => setLangState((prev) => (prev === "ar" ? "en" : "ar")),
    [],
  );

  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      isArabic: lang === "ar",
      setLang,
      toggleLang,
      t: (key) => dict[key as string]?.[lang] ?? (key as string),
    }),
    [lang, setLang, toggleLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
