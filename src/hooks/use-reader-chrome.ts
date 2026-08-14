import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Reading-screen chrome visibility, shared by the Bible, Agpeya and Katameros
 * readers:
 * - hides while dragging the page up, reveals on the way back down
 * - hides on its own after a few idle seconds
 * - any touch wakes it again
 */
export function useReaderChrome(idleMs = 5000) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wake = useCallback(() => {
    setVisible(true);
    if (idle.current) clearTimeout(idle.current);
    idle.current = setTimeout(() => setVisible(false), idleMs);
  }, [idleMs]);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const dy = y - lastY.current;

      if (y < 40) {
        lastY.current = y;
        wake();
        return;
      }
      if (Math.abs(dy) < 8) return;
      lastY.current = y;

      if (dy > 0) {
        if (idle.current) clearTimeout(idle.current);
        setVisible(false);
      } else {
        wake();
      }
    };

    wake();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", wake, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", wake);
      if (idle.current) clearTimeout(idle.current);
    };
  }, [wake]);

  return { visible, wake };
}
