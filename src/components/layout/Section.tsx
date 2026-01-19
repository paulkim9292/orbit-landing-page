import { forwardRef } from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, children, className = '', style }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={`landing-page ${className}`}
        style={style}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';
