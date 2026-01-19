import { useState, useEffect } from 'react';
import type { ViewportInfo, Breakpoint } from '../types';

function getViewportInfo(): ViewportInfo {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1920;

  let breakpoint: Breakpoint;
  let animationScale: number;

  if (width <= 480) {
    breakpoint = 'mobile-small';
    animationScale = 0.5;
  } else if (width <= 767) {
    breakpoint = 'mobile-large';
    animationScale = 0.6;
  } else if (width <= 1024) {
    breakpoint = 'tablet';
    animationScale = 0.8;
  } else if (width <= 1366) {
    breakpoint = 'laptop-small';
    animationScale = 0.95;
  } else {
    breakpoint = 'desktop';
    animationScale = 1;
  }

  return { width, breakpoint, animationScale };
}

export function useViewportBreakpoint(): ViewportInfo {
  const [viewportInfo, setViewportInfo] = useState<ViewportInfo>(getViewportInfo);

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setViewportInfo(getViewportInfo());
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return viewportInfo;
}
