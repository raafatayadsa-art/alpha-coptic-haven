import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { CopticCross } from "@/components/church/icons";
import { ArrowIcon } from "@/components/khoulagy/khoulagy-icons";
import { Screen } from "@/components/layout/Screen";
import { useLang } from "@/lib/i18n";

/**
 * Shared shell for every Khoulagy screen: amethyst sanctuary surface, gilded
 * glass header, Coptic frieze foot. Presentation only.
 */
export function KhoulagyShell({
  eyebrow,
  title,
  subtitle,
  action,
  children,
  backTo = "/khoulagy",
  pinHeader = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  backTo?: "/" | "/khoulagy" | "/khoulagy-liturgy";
  /** The reader pins its own parts rail instead, so its header scrolls away. */
  pinHeader?: boolean;
}) {
  const { t, dir, isArabic } = useLang();

  return (
    <Screen className="kh-page">
      <div
        dir={dir}
        className={`relative mx-auto w-full max-w-[430px] overflow-x-hidden pb-1 ${
          isArabic ? "font-arabic" : "font-sans"
        }`}
      >
        <header
          className={`safe-top px-4 pb-3 ${
            pinHeader ? "safe-sticky-top sticky top-0 z-30 backdrop-blur-xl" : "relative mt-[104px]"
          }`}
        >
          <div className="kh-glass relative overflow-hidden rounded-[26px] px-4 pt-3.5 pb-4">
            <div className="kh-hairline absolute inset-x-6 top-0 h-px opacity-60" />
            <div className="flex items-center gap-3">
              <Link
                to={backTo}
                aria-label={t("app.back")}
                className="press grid size-10 shrink-0 place-items-center rounded-full border border-khgold/25 bg-sanctnight/50 text-khivory/85"
              >
                <ArrowIcon className="size-[18px] rtl:rotate-180" />
              </Link>
              <div className="min-w-0 flex-1">
                <p className="font-manrope text-[10px] font-bold tracking-[0.16em] text-khbrass uppercase">
                  {eyebrow ?? t("kh.eyebrow")}
                </p>
                <h1 className="truncate font-display text-[21px] font-semibold text-khivory">
                  {title}
                </h1>
              </div>
              {action ?? <CopticCross className="size-4 shrink-0 text-khbrass/70" />}
            </div>
            {subtitle ? (
              <p className="mt-2 font-manrope text-[11.5px] text-khivory/50">{subtitle}</p>
            ) : null}
          </div>
        </header>

        <main className="relative z-10 space-y-5 px-4 pt-1">{children}</main>

        <p className="copt-band mt-8 text-center">ⲁ ⲱ ⲡⲓⲱⲓⲕ ⲛ̀ⲧⲉ ⲡ̀ⲱⲛϧ ⲁ ⲱ</p>
      </div>
    </Screen>
  );
}
