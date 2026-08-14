/**
 * Alpha Shield System — visual registry.
 *
 * Each shield is a CDN-hosted PNG cut from the original Alpha shield sheet.
 * Shapes and colours are preserved exactly as designed; nothing is redrawn.
 */

import agpeya from "@/assets/shields/agpeya.png.asset.json";
import audio from "@/assets/shields/audio.png.asset.json";
import bible from "@/assets/shields/bible.png.asset.json";
import books from "@/assets/shields/books.png.asset.json";
import church from "@/assets/shields/church.png.asset.json";
import community from "@/assets/shields/community.png.asset.json";
import controlPanel from "@/assets/shields/control-panel.png.asset.json";
import donate from "@/assets/shields/donate.png.asset.json";
import events from "@/assets/shields/events.png.asset.json";
import founder from "@/assets/shields/founder.png.asset.json";
import katameros from "@/assets/shields/katameros.png.asset.json";
import khoulagy from "@/assets/shields/khoulagy.png.asset.json";
import kids from "@/assets/shields/kids.png.asset.json";
import library from "@/assets/shields/library.png.asset.json";
import meditations from "@/assets/shields/meditations.png.asset.json";
import member from "@/assets/shields/member.png.asset.json";
import messagesAudio from "@/assets/shields/messages-audio.png.asset.json";
import myPrayer from "@/assets/shields/my-prayer.png.asset.json";
import priest from "@/assets/shields/priest.png.asset.json";
import saintsGallery from "@/assets/shields/saints-gallery.png.asset.json";
import servant from "@/assets/shields/servant.png.asset.json";
import synaxarium from "@/assets/shields/synaxarium.png.asset.json";

export type ShieldGroup = "people" | "trust" | "sections";

export type ShieldSlug =
  | "priest"
  | "servant"
  | "member"
  | "founder"
  | "messages-audio"
  | "control-panel"
  | "bible"
  | "church"
  | "katameros"
  | "synaxarium"
  | "khoulagy"
  | "library"
  | "community"
  | "events"
  | "agpeya"
  | "my-prayer"
  | "audio"
  | "books"
  | "kids"
  | "meditations"
  | "donate"
  | "saints-gallery";

export type ShieldMeta = {
  slug: ShieldSlug;
  group: ShieldGroup;
  url: string;
  /** Arabic label as it appears in the original shield sheet. */
  ar: string;
  en: string;
};

export const shields: Record<ShieldSlug, ShieldMeta> = {
  priest: { slug: "priest", group: "people", url: priest.url, ar: "الكاهن", en: "Priest" },
  servant: { slug: "servant", group: "people", url: servant.url, ar: "الخادم", en: "Servant" },
  member: { slug: "member", group: "people", url: member.url, ar: "العضو", en: "Member" },
  founder: { slug: "founder", group: "people", url: founder.url, ar: "المؤسس", en: "Founder" },

  "messages-audio": {
    slug: "messages-audio",
    group: "trust",
    url: messagesAudio.url,
    ar: "الرسائل الصوتية",
    en: "Audio messages",
  },
  "control-panel": {
    slug: "control-panel",
    group: "trust",
    url: controlPanel.url,
    ar: "تحكم الكنيسة",
    en: "Church control",
  },
  bible: { slug: "bible", group: "trust", url: bible.url, ar: "الكتاب المقدس", en: "Holy Bible" },
  church: { slug: "church", group: "trust", url: church.url, ar: "الكنيسة", en: "Church" },

  katameros: {
    slug: "katameros",
    group: "sections",
    url: katameros.url,
    ar: "القطمارس",
    en: "Katameros",
  },
  synaxarium: {
    slug: "synaxarium",
    group: "sections",
    url: synaxarium.url,
    ar: "السنكسار",
    en: "Synaxarium",
  },
  khoulagy: {
    slug: "khoulagy",
    group: "sections",
    url: khoulagy.url,
    ar: "الخولاجي",
    en: "Khoulagy",
  },
  library: { slug: "library", group: "sections", url: library.url, ar: "المكتبة", en: "Library" },
  community: {
    slug: "community",
    group: "sections",
    url: community.url,
    ar: "مجتمعي",
    en: "Community",
  },
  events: { slug: "events", group: "sections", url: events.url, ar: "المناسبات", en: "Events" },
  agpeya: { slug: "agpeya", group: "sections", url: agpeya.url, ar: "الأجبية", en: "Agpeya" },
  "my-prayer": {
    slug: "my-prayer",
    group: "sections",
    url: myPrayer.url,
    ar: "صلاتي",
    en: "My prayer",
  },
  audio: { slug: "audio", group: "sections", url: audio.url, ar: "الصوتيات", en: "Audio" },
  books: { slug: "books", group: "sections", url: books.url, ar: "الكتب", en: "Books" },
  kids: { slug: "kids", group: "sections", url: kids.url, ar: "الأطفال", en: "Kids" },
  meditations: {
    slug: "meditations",
    group: "sections",
    url: meditations.url,
    ar: "تأملات روحية",
    en: "Meditations",
  },
  donate: { slug: "donate", group: "sections", url: donate.url, ar: "التبرع", en: "Donate" },
  "saints-gallery": {
    slug: "saints-gallery",
    group: "sections",
    url: saintsGallery.url,
    ar: "معرض القديسين",
    en: "Saints gallery",
  },
};

export const shieldList: ShieldMeta[] = Object.values(shields);

export const shieldGroups: { group: ShieldGroup; ar: string; en: string; items: ShieldMeta[] }[] = [
  {
    group: "people",
    ar: "الأشخاص",
    en: "People",
    items: shieldList.filter((s) => s.group === "people"),
  },
  {
    group: "trust",
    ar: "الثقة",
    en: "Trust",
    items: shieldList.filter((s) => s.group === "trust"),
  },
  {
    group: "sections",
    ar: "الأقسام",
    en: "Sections",
    items: shieldList.filter((s) => s.group === "sections"),
  },
];

/** Pixel sizes for the shield scale — keeps usage consistent across screens. */
export const shieldSizes = { xs: 28, sm: 40, md: 56, lg: 76, xl: 104 } as const;

export type ShieldSize = keyof typeof shieldSizes;
