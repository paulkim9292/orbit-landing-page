import { useState, useEffect, useRef } from 'react';

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

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return { ref, isVisible, hasBeenVisible };
}
