/**
 * Alpha global slogan line — rendered as the last element INSIDE each screen's
 * own frame, so it inherits that screen's background and colour. Presentation
 * only: faint gilded Coptic Alpha/Omega framing the app tagline, drawn in
 * `currentColor` so it never reads as a separate band.
 */
export function SloganBand({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none relative mx-auto w-full max-w-[430px] px-6 pt-4 pb-1 text-center select-none ${className ?? ""}`}
    >
      <span
        aria-hidden="true"
        className="mx-auto mb-2 block h-px w-20 bg-current opacity-15"
      />
      <p
        className="flex items-center justify-center gap-2 font-manrope text-[8.5px] font-semibold tracking-[0.2em] uppercase opacity-40"
        dir="ltr"
      >
        <span aria-hidden="true" className="font-display text-[13px] tracking-normal">
          ⲁ
        </span>
        <span>— The Coptic Orthodox Digital Home —</span>
        <span aria-hidden="true" className="font-display text-[13px] tracking-normal">
          ⲱ
        </span>
      </p>
    </div>
  );
}
