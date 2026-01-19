import { useRef, useCallback } from 'react';
import { Section } from '../layout/Section';
import { useSectionVisibility } from '../../hooks';
import orbitTextSvg from '../../assets/orbit_text.svg';
import scrollArrowSvg from '../../assets/scroll_arrow.svg';

interface IntroSectionProps {
  onInfoClick?: () => void;
  onBackgroundClick?: () => void;
}

export function IntroSection({ onInfoClick, onBackgroundClick }: IntroSectionProps) {
  const { ref, hasBeenVisible } = useSectionVisibility({ threshold: 0.7 });
  const sectionRef = useRef<HTMLElement | null>(null);

  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [ref]);

  return (
    <Section id="page2" ref={setRefs}>
      <div className="page2-content">
        <div className="page2-1">
          <p>Your space to connect</p>
          <div className={`expand-line ${hasBeenVisible ? 'animate' : ''}`} />
        </div>
        <div className="page2-2" onClick={onInfoClick}>
          <img
            src={orbitTextSvg}
            alt="Orbit Text"
            className={`orbit-text orbit-text-element ${hasBeenVisible ? 'animate' : ''}`}
          />
          <p className={`orbit-text-overlay ${hasBeenVisible ? 'animate' : ''}`}>
            Click for more <b>information</b>
          </p>
        </div>
        <div className="page2-3" onClick={onBackgroundClick}>
          <img src={scrollArrowSvg} alt="Scroll Arrow" className="scroll-arrow" />
          <p>Scroll to Read Background</p>
        </div>
      </div>
    </Section>
  );
}
