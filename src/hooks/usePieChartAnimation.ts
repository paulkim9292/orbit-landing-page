import { useState, useEffect, useRef } from 'react';

interface UsePieChartAnimationOptions {
  percentage: number;
  duration?: number;
  trigger: boolean;
}

interface UsePieChartAnimationReturn {
  path: string;
  isComplete: boolean;
}

export function usePieChartAnimation({
  percentage,
  duration = 1000,
  trigger,
}: UsePieChartAnimationOptions): UsePieChartAnimationReturn {
  const [path, setPath] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!trigger || hasAnimated.current) return;

    hasAnimated.current = true;
    const targetAngle = (percentage / 100) * 360;
    const startTime = Date.now();

    const draw = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const angle = progress * targetAngle;

      const r = (angle * Math.PI) / 180;
      const x = Math.sin(r) * 100;
      const y = Math.cos(r) * -100;
      const mid = angle > 180 ? 1 : 0;
      const pathD = `M 0 0 v -100 A 100 100 1 ${mid} 1 ${x} ${y} z`;

      setPath(pathD);

      if (progress < 1) {
        requestAnimationFrame(draw);
      } else {
        setIsComplete(true);
      }
    };

    draw();
  }, [trigger, percentage, duration]);

  return { path, isComplete };
}
