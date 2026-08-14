import { Link, createFileRoute } from "@tanstack/react-router";

import { CopticCross } from "@/components/church/icons";
import { KatamerosShell } from "@/components/katameros/KatamerosShell";
import {
  ArrowGlyph,
  BookmarkGlyph,
  CalendarGlyph,
  FeastStarIcon,
} from "@/components/katameros/katameros-icons";
import { useLang } from "@/lib/i18n";
import { groupHue, groupLabel, readings } from "@/lib/katameros-data";
import { SloganBand } from "@/components/layout/SloganBand";

export const Route = createFileRoute("/katameros-saved")({
  head: () => ({
    meta: [
      { title: "محفوظات القطمارس | Alpha" },
      {
        name: "description",
        content:
          "Your saved Katameros readings and days in Alpha: bookmarked passages, marked feasts and the days you want to return to.",
      },
      { property: "og:title", content: "محفوظات القطمارس | Alpha" },
      { property: "og:description", content: "Bookmarked lectionary readings and days." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: KatamerosSaved,
});

const savedIds = ["lit-gospel", "mat-gospel", "syn-day", "lit-pauline"];

const savedDays = [
  { id: "s1", name: { ar: "٢٩ كيهك — عيد الميلاد", en: "29 Kiahk — Nativity" }, note: { ar: "قراءات العيد", en: "Feast readings" } },
  { id: "s2", name: { ar: "١١ طوبة — عيد الغطاس", en: "11 Touba — Epiphany" }, note: { ar: "عشية وباكر", en: "Vespers & matins" } },
];

function KatamerosSaved() {
  const { t, lang } = useLang();
  const saved = readings.filter((r) => savedIds.includes(r.id));

  return (
    <KatamerosShell title={t("km.sv.title")} subtitle={t("km.sv.sub")}>
      {/* ── Counters ── */}
      <section className="km-glass grid grid-cols-2 gap-2.5 rounded-[26px] p-3.5">
        {[
          { icon: <BookmarkGlyph className="size-[17px]" />, value: saved.length, label: t("km.sv.readings") },
          { icon: <CalendarGlyph className="size-[17px]" />, value: savedDays.length, label: t("km.sv.days") },
        ].map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-[20px] border border-cream/10 bg-wine/35 px-3.5 py-3"
          >
            <span className="grid size-9 place-items-center rounded-2xl border border-goldleaf/25 bg-goldleaf/10 text-goldleaf">
              {stat.icon}
            </span>
            <span>
              <span className="block font-display text-[19px] leading-none font-semibold text-cream tabular-nums">
                {stat.value}
              </span>
              <span className="mt-1 block font-manrope text-[10px] text-cream/45">{stat.label}</span>
            </span>
          </div>
        ))}
      </section>

      {/* ── Saved readings ── */}
      <section>
        <div className="mb-2.5 flex items-center gap-3 px-1">
          <span className="size-1.5 rounded-full bg-brass" />
          <h2 className="font-display text-[15.5px] font-semibold text-cream">{t("km.sv.readings")}</h2>
          <span className="km-hairline h-px flex-1 opacity-40" />
        </div>

        <div className="space-y-2.5">
          {saved.map((reading) => {
            const hue = groupHue[reading.group];
            return (
              <Link
                key={reading.id}
                to="/katameros-read"
                className="press km-card relative isolate block overflow-hidden rounded-[22px] p-4"
                style={{ ["--hue" as string]: hue.hue, ["--hue-2" as string]: hue.hue2 }}
              >
                <span
                  aria-hidden="true"
                  className="km-halo pointer-events-none absolute -end-8 -top-10 -z-10 size-28 rounded-full opacity-70"
                />
                <div className="flex items-center gap-2">
                  <span className="hue-text rounded-full border bg-nightwine/40 px-2.5 py-0.5 font-manrope text-[10px] font-semibold hue-ring">
                    {groupLabel[reading.group][lang]}
                  </span>
                  <span className="font-manrope text-[10.5px] text-cream/45">{reading.ref[lang]}</span>
                  <BookmarkGlyph className="ms-auto size-4 text-goldleaf" />
                </div>
                <p className="mt-2.5 line-clamp-2 font-display text-[14.5px] leading-relaxed text-cream/85">
                  {reading.excerpt[lang]}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Saved days ── */}
      <section>
        <div className="mb-2.5 flex items-center gap-3 px-1">
          <span className="size-1.5 rounded-full bg-brass" />
          <h2 className="font-display text-[15.5px] font-semibold text-cream">{t("km.sv.days")}</h2>
          <span className="km-hairline h-px flex-1 opacity-40" />
        </div>
        <div className="km-glass overflow-hidden rounded-[26px]">
          {savedDays.map((day, i) => (
            <Link
              key={day.id}
              to="/katameros-day"
              className={`press flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t border-cream/8" : ""}`}
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-2xl border border-goldleaf/25 bg-goldleaf/10 text-goldleaf">
                <FeastStarIcon className="size-[17px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-display text-[15px] font-semibold text-cream">
                  {day.name[lang]}
                </span>
                <span className="mt-0.5 block font-manrope text-[10.5px] text-cream/45">
                  {day.note[lang]}
                </span>
              </span>
              <ArrowGlyph className="size-4 shrink-0 text-cream/25 rtl:rotate-180" />
            </Link>
          ))}
        </div>
      </section>

      <footer className="flex flex-col items-center gap-2 pt-1 text-center">
        <CopticCross className="size-5 text-brass/70" />
        <p className="font-manrope text-[11.5px] text-cream/35">{t("km.sv.footer")}</p>
      </footer>
      <SloganBand />
    </KatamerosShell>
  );
}
