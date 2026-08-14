import { useLang } from "@/lib/i18n";

/** Premium AR / EN pill toggle. Switches direction app-wide and persists. */
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang();

  return (
    <div
      role="group"
      aria-label={t("app.language")}
      className={`flex items-center gap-0.5 rounded-full bg-parchment p-0.5 ring-1 ring-ink/5 ${className}`}
    >
      {(["ar", "en"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={lang === code}
          className={`press grid h-9 min-w-9 place-items-center rounded-full px-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
            lang === code ? "bg-ink text-ivory shadow-soft" : "text-ink/45"
          }`}
        >
          {code === "ar" ? "ع" : "EN"}
        </button>
      ))}
    </div>
  );
}
