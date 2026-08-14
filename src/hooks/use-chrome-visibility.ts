import { useEffect, useRef, useState } from "react";

/**
 * Facebook-style chrome visibility.
 *
 * Scrolling the page up (content dragged up / moving down the document) hides
 * the chrome; scrolling back down (dragging the content down) reveals it again.
 * Near the very top of the page the chrome is always visible.
 */
export function useChromeVisibility(threshold = 8) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;

      if (y < 40) {
        setVisible(true);
        lastY.current = y;
        return;
      }
      if (Math.abs(dy) < threshold) return;

      setVisible(dy < 0);
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return visible;
}
