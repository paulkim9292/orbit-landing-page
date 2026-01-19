import { useState, useEffect, useRef } from 'react';

interface UseCounterAnimationOptions {
  start: number;
  end: number;
  duration?: number;
  trigger: boolean;
}

export function useCounterAnimation({
  start,
  end,
  duration = 1000,
  trigger,
}: UseCounterAnimationOptions): number {
  const [value, setValue] = useState(start);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger || hasAnimated.current) return;

    hasAnimated.current = true;
    const startTime = performance.now();

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(start + (end - start) * progress);

      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [trigger, start, end, duration]);

  return value;
}
