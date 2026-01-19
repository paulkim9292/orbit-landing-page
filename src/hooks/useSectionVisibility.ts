import { useState, useEffect, useRef, useCallback } from 'react';

interface UseSectionVisibilityOptions {
  threshold?: number;
  triggerOnce?: boolean;
}

interface UseSectionVisibilityReturn {
  ref: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
  hasBeenVisible: boolean;
}

export function useSectionVisibility(
  options: UseSectionVisibilityOptions = {}
): UseSectionVisibilityReturn {
  const { threshold = 0.3, triggerOnce = true } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  const checkVisibility = useCallback(() => {
    if (!ref.current) return;

    const windowHeight = window.innerHeight;
    const rect = ref.current.getBoundingClientRect();

    // Trigger when section is 30% visible from top (matching original)
    const visible = rect.top < windowHeight * (1 - threshold) && rect.bottom > 0;

    if (visible) {
      setIsVisible(true);
      if (!hasBeenVisible) {
        setHasBeenVisible(true);
      }
    } else if (!triggerOnce) {
      setIsVisible(false);
    }
  }, [threshold, triggerOnce, hasBeenVisible]);

  useEffect(() => {
    // Initial check
    checkVisibility();

    // Use scroll event for more precise control (matching original behavior)
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [checkVisibility]);

  return { ref, isVisible, hasBeenVisible };
}
