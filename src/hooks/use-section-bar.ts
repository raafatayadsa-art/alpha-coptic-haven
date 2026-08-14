import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Sticky section bar behaviour shared with the Bible reader chrome:
 * - tracks which section the reader is currently inside (for colouring)
 * - tracks overall scroll progress
 * - hides while dragging the page up, reveals on the way back down
 * - hides on its own after five idle seconds
 */
export function useSectionBar(ids: string[], idleMs = 5000) {
  const [active, setActive] = useState(ids[0] ?? "");
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [pinned, setPinned] = useState(false);
  const lastY = useRef(0);
  const idle = useRef<ReturnType<typeof setTimeout> | null>(null);

  const wake = useCallback(() => {
    setVisible(true);
    if (idle.current) clearTimeout(idle.current);
    idle.current = setTimeout(() => setVisible(false), idleMs);
  }, [idleMs]);

  useEffect(() => {
    lastY.current = window.scrollY;

    const measure = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, y / max)) : 0);
      setPinned(y > 170);

      /* The section whose top has passed just under the sticky bar wins. */
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - 150 <= 0) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      measure();
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
        /* Dragging up through the text: get the chrome out of the way. */
        if (idle.current) clearTimeout(idle.current);
        setVisible(false);
      } else {
        wake();
      }
    };

    measure();
    wake();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("touchstart", wake, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", wake);
      if (idle.current) clearTimeout(idle.current);
    };
  }, [ids, wake]);

  return { active, progress, visible: visible && pinned, wake };
}
