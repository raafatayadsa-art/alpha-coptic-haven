import { Link, createFileRoute } from "@tanstack/react-router";

import { SynaxSectionTitle, SynaxShell } from "@/components/synaxarium/SynaxShell";
import { ChevronGlyph } from "@/components/synaxarium/synax-icons";
import { useLang } from "@/lib/i18n";
import { L, copticMonths, copticToday, monthFeasts, pick } from "@/lib/synaxarium-data";

export const Route = createFileRoute("/synaxarium-months")({
  head: () => ({
    meta: [
      { title: "الشهور القبطية — السنكسار | Alpha" },
      {
        name: "description",
        content: "Browse the thirteen Coptic months and open the commemorations of any day of the Synaxarium.",
      },
      { property: "og:title", content: "الشهور القبطية — السنكسار | Alpha" },
      { property: "og:description", content: "The thirteen Coptic months of the Synaxarium inside Alpha." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SynaxariumMonths,
});

const monogram = ["ⲁ", "ⲃ", "ⲅ", "ⲇ", "ⲉ", "ⲋ", "ⲍ", "ⲏ", "ⲑ", "ⲓ", "ⲕ", "ⲗ", "ⲙ"];

function SynaxariumMonths() {
  const { lang } = useLang();

  return (
    <SynaxShell
      eyebrow={pick(L.title, lang)}
      title={pick(L.monthsTitle, lang)}
      subtitle={pick(L.monthsHint, lang)}
    >
      <div className="mt-2 grid grid-cols-2 gap-2.5">
        {copticMonths.map((m, i) => {
          const current = m.en === copticToday.month.en;
          return (
            <Link
              key={m.en}
              to="/synaxarium-day"
              className={`press relative overflow-hidden rounded-[24px] border px-3.5 py-3.5 ${
                current
                  ? "border-icongold/55 bg-gradient-to-b from-icongold/18 to-transparent"
                  : "border-icongold/14 bg-synaxdeep/42"
              }`}
            >
              <div className="sx-halo absolute -top-8 -end-8 size-20 opacity-30" />
              <span className="relative font-display text-[24px] leading-none text-iconleaf/80">{monogram[i]}</span>
              <p className="relative mt-2.5 font-display text-[14.5px] font-semibold text-ivory">{pick(m, lang)}</p>
              <p className="relative mt-0.5 font-manrope text-[10px] text-ivory/40">
                {i === 12 ? (lang === "ar" ? "٥ أيام" : "5 days") : lang === "ar" ? "٣٠ يومًا" : "30 days"}
              </p>
              {current ? (
                <span className="absolute top-3 end-3 rounded-full bg-saffron/85 px-2 py-[2px] font-manrope text-[9px] font-bold text-synaxnight">
                  {lang === "ar" ? "الآن" : "Now"}
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>

      <SynaxSectionTitle title={pick(L.monthFeasts, lang)} caption={pick(copticToday.month, lang)} />
      <div className="space-y-2.5">
        {monthFeasts.map((f) => (
          <Link
            key={f.day.en}
            to="/synaxarium-day"
            className="press sx-glass flex items-center gap-3 rounded-[22px] px-3.5 py-3"
          >
            <div className="min-w-0 flex-1">
              <p className="font-manrope text-[10px] font-bold tracking-wide text-icongold">{pick(f.day, lang)}</p>
              <p className="mt-0.5 truncate font-display text-[13.5px] font-semibold text-ivory">
                {pick(f.name, lang)}
              </p>
            </div>
            <span className="rounded-full border border-iconleaf/22 px-2 py-[2px] font-manrope text-[9px] text-iconleaf/85">
              {pick(f.kind, lang)}
            </span>
            <ChevronGlyph className="size-4 shrink-0 text-ivory/35 rtl:rotate-180" />
          </Link>
        ))}
      </div>
    </SynaxShell>
  );
}
