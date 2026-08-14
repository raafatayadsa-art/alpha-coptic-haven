import { useLang } from "@/lib/i18n";

/** Single-letter language switch (ع ⇄ EN) — compact, taps to toggle. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, toggleLang, t } = useLang();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t("app.language")}
      title={t("app.language")}
      className={`press grid size-10 place-items-center rounded-full bg-parchment text-[12px] font-bold uppercase tracking-[0.06em] text-ink/70 ring-1 ring-ink/5 transition-colors ${className}`}
    >
      <span key={lang} className="engage-count leading-none">
        {lang === "ar" ? "ع" : "EN"}
      </span>
    </button>
  );
}
