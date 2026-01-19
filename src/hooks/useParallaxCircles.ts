import { useMemo } from 'react';
import { allPagePositions, page1Positions } from '../data/circlePositions';
import { useScrollPosition } from './useScrollPosition';
import { useViewportBreakpoint } from './useViewportBreakpoint';
import type { CirclePosition } from '../types';

// Linear interpolation function
function lerp(start: number, end: number, progress: number): number {
  return start + (end - start) * progress;
}

// Easing function for smoother animation
function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

interface CircleTransforms {
  pink: { x: number; y: number };
  purple1: { x: number; y: number };
  purple2: { x: number; y: number };
  navy1: { x: number; y: number };
  navy2: { x: number; y: number };
}

export function useParallaxCircles(): CircleTransforms {
  const scrollPosition = useScrollPosition();
  const { animationScale } = useViewportBreakpoint();

  const transforms = useMemo(() => {
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 1000;
    const totalPages = allPagePositions.length;
    const totalScrollHeight = windowHeight * (totalPages - 1);

    // Calculate overall progress (0 to 1 across all pages)
    const overallProgress = Math.min(Math.max(scrollPosition / totalScrollHeight, 0), 1);

    // Calculate which segment we're in
    const segmentProgress = overallProgress * (totalPages - 1);
    const currentSegment = Math.floor(segmentProgress);
    const nextSegment = Math.min(currentSegment + 1, totalPages - 1);

    // Calculate progress within current segment (0 to 1)
    const segmentLocalProgress = segmentProgress - currentSegment;

    // Apply easing for smoother animation
    const easedProgress = easeInOutCubic(segmentLocalProgress);

    // Get positions for current and next page
    const currentPagePositions = allPagePositions[currentSegment];
    const nextPagePositions = allPagePositions[nextSegment];

    const calculateTransform = (circleId: keyof typeof page1Positions): CirclePosition => {
      const startPos = currentPagePositions[circleId];
      const endPos = nextPagePositions[circleId];

      // Calculate interpolated position
      const currentX = lerp(startPos.x, endPos.x, easedProgress);
      const currentY = lerp(startPos.y, endPos.y, easedProgress);

      // Calculate translation from initial CSS position (page1)
      const initialPos = page1Positions[circleId];
      const translateX = (currentX - initialPos.x) * animationScale;
      const translateY = (currentY - initialPos.y) * animationScale;

      return { x: translateX, y: translateY };
    };

    return {
      pink: calculateTransform('pink'),
      purple1: calculateTransform('purple1'),
      purple2: calculateTransform('purple2'),
      navy1: calculateTransform('navy1'),
      navy2: calculateTransform('navy2'),
    };
  }, [scrollPosition, animationScale]);

  return transforms;
}
