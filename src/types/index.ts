export interface CirclePosition {
  x: number;
  y: number;
}

export interface PagePositions {
  pink: CirclePosition;
  purple1: CirclePosition;
  purple2: CirclePosition;
  navy1: CirclePosition;
  navy2: CirclePosition;
}

export type Breakpoint = 'mobile-small' | 'mobile-large' | 'tablet' | 'laptop-small' | 'desktop';

export interface ViewportInfo {
  width: number;
  breakpoint: Breakpoint;
  animationScale: number;
}

export interface TeamMember {
  name: string;
  image: string;
  achievements: string[];
}
