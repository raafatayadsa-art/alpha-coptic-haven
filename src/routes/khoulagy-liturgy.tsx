import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";

import { KhoulagyShell } from "@/components/khoulagy/KhoulagyShell";
import { ChaliceIcon } from "@/components/khoulagy/khoulagy-icons";
import { khHue, parts, rites } from "@/lib/khoulagy-data";
import { useLang } from "@/lib/i18n";

type RiteId = "basil" | "gregory" | "cyril";

export const Route = createFileRoute("/khoulagy-liturgy")({
  validateSearch: (s: Record<string, unknown>): { rite: RiteId } => ({
    rite: (["basil", "gregory", "cyril"] as const).includes(s["rite"] as RiteId)
      ? (s["rite"] as RiteId)
      : "basil",
  }),
  component: LiturgyParts,
  head: () => ({
    meta: [
      { title: "أجزاء القداس · Liturgy parts — Alpha Coptic" },
      {
        name: "description",
        content:
          "Every part of the Coptic Divine Liturgy in order — preparation, offering, litanies, readings, anaphora, communion and the final blessing.",
      },
      { property: "og:title", content: "أجزاء القداس · Liturgy parts — Alpha Coptic" },
      {
        property: "og:description",
        content: "Walk through the liturgy part by part and open the sequential Alpha reader.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function LiturgyParts() {
  const { rite } = Route.useSearch();
  const { t, isArabic } = useLang();
  const pick = (b: { ar: string; en: string }) => (isArabic ? b.ar : b.en);
  const current = rites.find((r) => r.id === rite) ?? rites[0]!;

  return (
    <KhoulagyShell
      eyebrow={current.coptic}
      title={pick(current.name)}
      subtitle={`${current.sections} ${t("kh.parts")} · ${current.minutes} ${t("kh.min")}`}
    >
      <Link
        to="/khoulagy-read"
        search={{ rite }}
        className="press kh-cta flex h-12 items-center justify-center gap-2 rounded-full font-sora text-[13.5px] font-bold text-sanctnight"
      >
        <ChaliceIcon className="size-[18px]" />
        {t("kh.startReading")}
      </Link>

      <ol className="relative space-y-3 ps-6">
        <span className="absolute inset-y-3 start-[9px] w-px bg-gradient-to-b from-khgold/45 via-khgold/15 to-transparent" />
        {parts.map((p, i) => (
          <li key={p.id} className="relative">
            <span className="absolute top-6 -start-6 grid size-[19px] place-items-center rounded-full border border-khgold/40 bg-sanctnight font-manrope text-[9.5px] font-bold text-khgold">
              {i + 1}
            </span>
            <Link
              to="/khoulagy-read"
              search={{ rite }}
              style={
                ({ "--hue": khHue[p.group].hue, "--hue-2": khHue[p.group].hue2 }) as CSSProperties
              }
              className="press kh-card block rounded-[22px] p-3.5"
            >
              <span className="block font-display text-[15.5px] font-semibold text-khivory">
                {pick(p.title)}
              </span>
              <span className="mt-0.5 block font-manrope text-[11px] text-khivory/45">
                {pick(p.hint)}
              </span>
              <span className="mt-1.5 block font-manrope text-[10px] text-khbrass">
                {p.minutes} {t("kh.min")}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </KhoulagyShell>
  );
}
