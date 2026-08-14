import { createFileRoute } from "@tanstack/react-router";

import { NoteIcon } from "@/components/bible/bible-icons";
import { StatTile, ToolScreen } from "@/components/bible/ToolScreen";
import { useLang } from "@/lib/i18n";
import { SloganBand } from "@/components/layout/SloganBand";

export const Route = createFileRoute("/bible-notes")({
  head: () => ({
    meta: [
      { title: "ملاحظاتي — الكتاب المقدس | Alpha" },
      {
        name: "description",
        content: "Your personal Bible notes in Alpha, kept beside the verses that inspired them.",
      },
      { property: "og:title", content: "ملاحظاتي — الكتاب المقدس | Alpha" },
      { property: "og:description", content: "Your reflections beside God's word." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BibleNotes,
});

const notes = [
  {
    id: 1,
    refAr: "يوحنا ١ : ٥",
    refEn: "John 1:5",
    verseAr: "«والنور يضيء في الظلمة، والظلمة لم تدركه»",
    verseEn: "“The light shines in the darkness, and the darkness has not overcome it.”",
    noteAr: "النور لا يجاهد ليُثبت نفسه، هو فقط يضيء. تذكير أن الحضور أقوى من الجدال.",
    noteEn: "Light does not argue to prove itself, it simply shines. Presence over debate.",
    whenAr: "اليوم",
    whenEn: "Today",
  },
  {
    id: 2,
    refAr: "مزمور ٤٦ : ١٠",
    refEn: "Psalm 46:10",
    verseAr: "«كفوا واعلموا أني أنا الله»",
    verseEn: "“Be still, and know that I am God.”",
    noteAr: "الهدوء ليس فراغًا، بل مساحة يسمع فيها القلب.",
    noteEn: "Stillness is not emptiness; it is the space where the heart listens.",
    whenAr: "الأربعاء",
    whenEn: "Wednesday",
  },
];

function BibleNotes() {
  const { t, isArabic } = useLang();

  return (
    <ToolScreen title={t("bib.nt.title")} subtitle={t("bib.nt.sub")}>
      <div className="grid grid-cols-2 gap-2.5">
        <StatTile value={isArabic ? "٢" : "2"} label={t("bib.nt.count")} />
        <StatTile value={isArabic ? "٢" : "2"} label={t("bib.hl.books")} />
      </div>

      <div className="space-y-3">
        {notes.map((n) => (
          <article key={n.id} className="vellum-card rounded-[24px] p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-manrope text-[11.5px] font-semibold text-copper">
                <NoteIcon className="size-[15px]" />
                {isArabic ? n.refAr : n.refEn}
              </span>
              <span className="font-manrope text-[10.5px] text-quiet">
                {isArabic ? n.whenAr : n.whenEn}
              </span>
            </div>
            <p className="mt-2.5 rounded-[18px] bg-illum/15 px-3.5 py-3 font-display text-[13.5px] leading-[1.95] text-inkblue">
              {isArabic ? n.verseAr : n.verseEn}
            </p>
            <p className="mt-2.5 font-manrope text-[12.5px] leading-relaxed text-quiet">
              {isArabic ? n.noteAr : n.noteEn}
            </p>
          </article>
        ))}
      </div>
      <SloganBand />
    </ToolScreen>
  );
}
