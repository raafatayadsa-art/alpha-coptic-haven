import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CopticCross } from "@/components/church/icons";
import { KatamerosShell } from "@/components/katameros/KatamerosShell";
import {
  ArrowGlyph,
  BookmarkGlyph,
  HeadphonesIcon,
  ShareGlyph,
  TextSizeGlyph,
} from "@/components/katameros/katameros-icons";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/katameros-read")({
  head: () => ({
    meta: [
      { title: "قراءة القطمارس — إنجيل القداس | Alpha" },
      {
        name: "description",
        content:
          "The Alpha Katameros reading view: a calm typographic column for the day's passage, with text size, bookmark, share and listen controls.",
      },
      { property: "og:title", content: "قراءة القطمارس — إنجيل القداس | Alpha" },
      { property: "og:description", content: "A quiet reading column for the day's lectionary passage." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: KatamerosRead,
});

/* Presentation-only sample passage. */
const verses = [
  { n: 16, ar: "هَا أَنَا أُرْسِلُكُمْ كَغَنَمٍ فِي وَسْطِ ذِئَابٍ، فَكُونُوا حُكَمَاءَ كَالْحَيَّاتِ وَبُسَطَاءَ كَالْحَمَامِ.", en: "Behold, I send you out as sheep in the midst of wolves. Therefore be wise as serpents and harmless as doves." },
  { n: 17, ar: "وَاحْذَرُوا مِنَ النَّاسِ، لِأَنَّهُمْ سَيُسَلِّمُونَكُمْ إِلَى مَجَالِسَ.", en: "But beware of men, for they will deliver you up to councils." },
  { n: 18, ar: "وَتُقَدَّمُونَ أَمَامَ وُلَاةٍ وَمُلُوكٍ مِنْ أَجْلِي شَهَادَةً لَهُمْ وَلِلْأُمَمِ.", en: "You will be brought before governors and kings for My sake, as a testimony to them and to the Gentiles." },
  { n: 19, ar: "فَمَتَى أَسْلَمُوكُمْ فَلَا تَهْتَمُّوا كَيْفَ أَوْ بِمَا تَتَكَلَّمُونَ.", en: "But when they deliver you up, do not worry about how or what you should speak." },
  { n: 20, ar: "لِأَنْ لَسْتُمْ أَنْتُمُ الْمُتَكَلِّمِينَ بَلْ رُوحُ أَبِيكُمُ الَّذِي يَتَكَلَّمُ فِيكُمْ.", en: "For it is not you who speak, but the Spirit of your Father who speaks in you." },
  { n: 21, ar: "وَسَيُسَلِّمُ الْأَخُ أَخَاهُ إِلَى الْمَوْتِ، وَالْأَبُ وَلَدَهُ.", en: "Now brother will deliver up brother to death, and a father his child." },
  { n: 22, ar: "وَتَكُونُونَ مُبْغَضِينَ مِنَ الْجَمِيعِ مِنْ أَجْلِ اسْمِي، وَلَكِنَّ الَّذِي يَصْبِرُ إِلَى الْمُنْتَهَى فَهَذَا يَخْلُصُ.", en: "And you will be hated by all for My name’s sake. But he who endures to the end will be saved." },
];

const sizes = [
  { id: "s", cls: "text-[15.5px] leading-[2.05]" },
  { id: "m", cls: "text-[17.5px] leading-[2.15]" },
  { id: "l", cls: "text-[20px] leading-[2.2]" },
] as const;

function KatamerosRead() {
  const { t, lang } = useLang();
  const [sizeIndex, setSizeIndex] = useState(1);
  const [saved, setSaved] = useState(false);
  const size = sizes[sizeIndex]!;

  return (
    <KatamerosShell
      backTo="/katameros-day"
      title={t("km.read.title")}
      subtitle={t("km.read.sub")}
      action={
        <button
          type="button"
          aria-label={t("km.tools.save")}
          onClick={() => setSaved((v) => !v)}
          className={`press grid size-10 place-items-center rounded-full border ${
            saved
              ? "border-goldleaf/50 bg-goldleaf/15 text-goldleaf"
              : "border-goldleaf/25 bg-nightwine/50 text-cream/75"
          }`}
        >
          <BookmarkGlyph className="size-[17px]" />
        </button>
      }
    >
      {/* ── Passage head ── */}
      <section className="km-glass relative isolate overflow-hidden rounded-[28px] px-5 py-5 text-center">
        <span
          aria-hidden="true"
          className="km-halo candle-breathe pointer-events-none absolute inset-x-0 -top-20 -z-10 mx-auto size-56 rounded-full"
          style={{ ["--hue" as string]: "oklch(0.560 0.130 30)" }}
        />
        <span className="font-manrope text-[10px] font-bold tracking-[0.18em] text-brass uppercase">
          {t("km.read.moment")}
        </span>
        <h2 className="mt-2 font-display text-[26px] leading-tight font-semibold text-cream">
          {t("km.read.ref")}
        </h2>
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="rounded-full border border-cream/12 bg-nightwine/40 px-3 py-1 font-manrope text-[10.5px] text-cream/55">
            {t("km.today.coptic")}
          </span>
          <span className="rounded-full border border-cream/12 bg-nightwine/40 px-3 py-1 font-manrope text-[10.5px] text-cream/55">
            {t("km.read.minutes")}
          </span>
        </div>
        <div className="km-hairline mx-auto mt-4 h-px w-2/3 opacity-60" />
      </section>

      {/* ── Verses ── */}
      <section className="space-y-2.5">
        {verses.map((verse, i) => (
          <article
            key={verse.n}
            className="rounded-[20px] border border-cream/8 bg-wine/28 px-4 py-3.5"
          >
            <div className="mb-1.5 flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full border border-goldleaf/25 bg-goldleaf/10 font-manrope text-[10px] font-bold tabular-nums text-goldleaf">
                {verse.n}
              </span>
              <span className="km-hairline h-px flex-1 opacity-25" />
            </div>
            <p className={`font-display font-medium text-cream/90 ${size.cls}`}>
              {/* Arabic script must never be split for a drop-cap (it would break
                  letter joining), so the gilded initial is Latin-only. */}
              {i === 0 && lang === "en" ? (
                <span className="drop-cap !text-goldleaf">{verse.en.charAt(0)}</span>
              ) : null}
              {i === 0 && lang === "en" ? verse.en.slice(1) : lang === "ar" ? verse.ar : verse.en}
            </p>
          </article>
        ))}
      </section>

      {/* ── Reader tools, one row ── */}
      <section className="km-glass sticky bottom-4 z-20 flex items-center gap-2 rounded-full px-3 py-2.5">
        <button
          type="button"
          aria-label={t("km.tools.font")}
          onClick={() => setSizeIndex((v) => (v + 1) % sizes.length)}
          className="press grid size-9 place-items-center rounded-full border border-goldleaf/25 bg-nightwine/45 text-goldleaf"
        >
          <TextSizeGlyph className="size-[17px]" />
        </button>
        <button
          type="button"
          className="press flex items-center gap-2 rounded-full border border-goldleaf/25 bg-nightwine/45 px-3 py-1.5 font-manrope text-[11.5px] font-semibold text-cream/80"
        >
          <HeadphonesIcon className="size-4" />
          {t("km.tools.listen")}
        </button>
        <button
          type="button"
          aria-label={t("km.tools.share")}
          className="press grid size-9 place-items-center rounded-full border border-goldleaf/25 bg-nightwine/45 text-cream/75"
        >
          <ShareGlyph className="size-[16px]" />
        </button>
        <span className="km-hairline mx-1 h-px flex-1 opacity-30" />
        <button
          type="button"
          aria-label={t("km.read.prev")}
          className="press grid size-9 place-items-center rounded-full border border-cream/12 bg-nightwine/45 text-cream/70"
        >
          <ArrowGlyph className="size-4 ltr:rotate-180" />
        </button>
        <button
          type="button"
          aria-label={t("km.read.next")}
          className="press grid size-9 place-items-center rounded-full km-cta text-nightwine"
        >
          <ArrowGlyph className="size-4 rtl:rotate-180" />
        </button>
      </section>

      <footer className="flex flex-col items-center gap-2 pt-1 text-center">
        <CopticCross className="size-5 text-brass/70" />
        <p className="font-manrope text-[11.5px] text-cream/35">{t("km.read.footer")}</p>
      </footer>
    </KatamerosShell>
  );
}
