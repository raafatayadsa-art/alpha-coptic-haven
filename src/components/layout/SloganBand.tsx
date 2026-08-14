/**
 * Alpha global slogan band — rendered once at the foot of every screen from
 * the root layout. Presentation only: faint gilded Coptic Alpha/Omega framing
 * the app tagline.
 */
export function SloganBand() {
  return (
    <div className="pointer-events-none relative mx-auto w-full max-w-[430px] px-6 pt-10 pb-4 text-center select-none">
      <span
        aria-hidden="true"
        className="gold-hairline mx-auto mb-3 block h-px w-24 opacity-40"
      />
      <p
        className="flex items-center justify-center gap-2 font-manrope text-[8.5px] font-semibold tracking-[0.2em] uppercase"
        style={{ color: "color-mix(in oklab, var(--sc-gold) 78%, transparent)", opacity: 0.62 }}
        dir="ltr"
      >
        <span
          className="font-display text-[13px] tracking-normal illum-breathe"
          style={{ textShadow: "0 0 8px color-mix(in oklab, var(--sc-gold) 45%, transparent)" }}
        >
          Ⲁ
        </span>
        <span>— The Coptic Orthodox Digital Home —</span>
        <span
          className="font-display text-[13px] tracking-normal illum-breathe"
          style={{ textShadow: "0 0 8px color-mix(in oklab, var(--sc-gold) 45%, transparent)" }}
        >
          Ⲱ
        </span>
      </p>
    </div>
  );
}
