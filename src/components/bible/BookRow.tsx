import { Link } from "@tanstack/react-router";

import { ArrowIcon, CheckGlyph } from "@/components/bible/bible-icons";
import type { BibleBook } from "@/lib/bible-data";
import { useLang } from "@/lib/i18n";

/** A single book line inside the book-picker screen. */
export function BookRow({ book, index }: { book: BibleBook; index: number }) {
  const { t, isArabic } = useLang();
  const name = isArabic ? book.ar : book.en;

  return (
    <Link
      to="/bible-chapters"
      search={{ book: book.id }}
      className="press vellum-card group flex items-center gap-3 rounded-[22px] px-3.5 py-3"
    >
      {/* Illuminated initial */}
      <span className="relative grid size-11 shrink-0 place-items-center rounded-[15px] bg-inkblue/[0.055] ring-1 ring-illum/35">
        <span className="font-display text-[17px] font-semibold text-copper">{name.slice(0, 1)}</span>
        {book.state === "done" ? (
          <span className="absolute -end-1 -bottom-1 grid size-4 place-items-center rounded-full bg-copper text-vellum">
            <CheckGlyph className="size-2.5" />
          </span>
        ) : null}
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-baseline gap-2">
          <span
            className={`truncate text-[15px] font-semibold text-inkblue ${
              isArabic ? "font-arabic" : "font-sans"
            }`}
          >
            {name}
          </span>
          <span className="shrink-0 font-manrope text-[10.5px] tabular-nums text-quiet">
            {book.chapters} {t("bib.chapters")}
          </span>
        </span>

        {book.state === "reading" ? (
          <span className="mt-2 flex items-center gap-2">
            <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-inkblue/10">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-copper to-illum"
                style={{ width: `${book.progress ?? 0}%` }}
              />
            </span>
            <span className="font-manrope text-[10px] font-semibold tabular-nums text-copper">
              {book.progress}%
            </span>
          </span>
        ) : (
          <span className="mt-1 block font-manrope text-[10.5px] text-quiet">
            {book.state === "done" ? t("bib.state.done") : `${t("bib.book")} ${index}`}
          </span>
        )}
      </span>

      <ArrowIcon className="size-4 shrink-0 text-quiet/50 rtl:rotate-180" />
    </Link>
  );
}
