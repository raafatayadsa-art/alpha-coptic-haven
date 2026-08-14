import { useEffect } from "react";

/**
 * Silky window auto-scroll, shared by every Alpha reading screen.
 *
 * Sub-pixel accumulation on each animation frame keeps the motion continuous
 * instead of stepping. Stops itself at the foot of the document.
 */
export function useAutoScroll(active: boolean, pxPerSecond: number, onEnd?: () => void) {
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last = performance.now();
    let acc = window.scrollY;

    const step = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      acc += (pxPerSecond * dt) / 1000;
      window.scrollTo({ top: acc, behavior: "auto" });
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 2) {
        onEnd?.();
        return;
      }
      raf = window.requestAnimationFrame(step);
    };

    raf = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, pxPerSecond]);
}
