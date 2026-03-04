import { useEffect } from 'react';
import { allPagePositions, page1Positions } from '../data/circlePositions';
import type { PagePositions } from '../types';

function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function getAnimationScale(width: number): number {
  if (width <= 480) return 0.5;
  if (width <= 767) return 0.6;
  if (width <= 1024) return 0.8;
  if (width <= 1366) return 0.95;
  return 1;
}

const circleIds = ['pink', 'purple2', 'purple1', 'navy2', 'navy1'] as const;

export function useParallaxCircles(): void {
  useEffect(() => {
    const elements = new Map<string, HTMLElement>();
    for (const id of circleIds) {
      const el = document.getElementById(id);
      if (el) elements.set(id, el);
    }

    if (elements.size === 0) return;

    let ticking = false;

    const applyTransforms = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const animationScale = getAnimationScale(window.innerWidth);
      const totalPages = allPagePositions.length;
      const totalScrollHeight = windowHeight * (totalPages - 1);

      const overallProgress = Math.min(Math.max(scrollY / totalScrollHeight, 0), 1);
      const segmentProgress = overallProgress * (totalPages - 1);
      const currentSegment = Math.floor(segmentProgress);
      const nextSegment = Math.min(currentSegment + 1, totalPages - 1);
      const easedProgress = easeInOutCubic(segmentProgress - currentSegment);

      const currentPagePositions = allPagePositions[currentSegment];
      const nextPagePositions = allPagePositions[nextSegment];

      for (const id of circleIds) {
        const el = elements.get(id);
        if (!el) continue;

        const startPos = currentPagePositions[id as keyof PagePositions];
        const endPos = nextPagePositions[id as keyof PagePositions];
        const initialPos = page1Positions[id as keyof PagePositions];

        const translateX = (lerp(startPos.x, endPos.x, easedProgress) - initialPos.x) * animationScale;
        const translateY = (lerp(startPos.y, endPos.y, easedProgress) - initialPos.y) * animationScale;

        el.style.transform = `translate(${translateX}px, ${translateY}px)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          applyTransforms();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Apply initial transforms
    applyTransforms();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}
