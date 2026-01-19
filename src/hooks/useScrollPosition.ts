import { useState, useEffect, useRef } from 'react';

export function useScrollPosition(): number {
  const [scrollPosition, setScrollPosition] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset || document.documentElement.scrollTop);
      rafId.current = requestAnimationFrame(updatePosition);
    };

    rafId.current = requestAnimationFrame(updatePosition);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return scrollPosition;
}
