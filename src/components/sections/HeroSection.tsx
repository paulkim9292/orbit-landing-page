import { useRef, useCallback } from 'react';
import { Section } from '../layout/Section';
import { useSectionVisibility } from '../../hooks';
import planetVideo from '../../assets/planet.webm';
import planetVideoMp4 from '../../assets/planet.mp4';
import orbitTextSvg from '../../assets/orbit_text.svg';
import scrollArrowSvg from '../../assets/scroll_arrow.svg';

interface HeroSectionProps {
  onInfoClick?: () => void;
  onBackgroundClick?: () => void;
}

export function HeroSection({ onInfoClick, onBackgroundClick }: HeroSectionProps) {
  const { ref, hasBeenVisible } = useSectionVisibility({ threshold: 0.3 });
  const sectionRef = useRef<HTMLElement | null>(null);

  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [ref]);

  return (
    <Section id="page1" ref={setRefs}>
      <video className="page1-video" autoPlay loop muted playsInline>
        <source src={planetVideo} type="video/webm" />
        <source src={planetVideoMp4} type="video/mp4" />
      </video>

      <div className="page1-intro">
        <div className="page1-intro-top">
          <p>Your space to connect</p>
          <div className={`expand-line ${hasBeenVisible ? 'animate' : ''}`} />
        </div>
        <div className="page1-intro-orbit" onClick={onInfoClick}>
          <img
            src={orbitTextSvg}
            alt="Orbit Text"
            className={`orbit-text orbit-text-element ${hasBeenVisible ? 'animate' : ''}`}
          />
          <p className={`orbit-text-overlay ${hasBeenVisible ? 'animate' : ''}`}>
            Click for more <b>information</b> about Orbit
          </p>
        </div>
        <div className="page1-intro-scroll" onClick={onBackgroundClick}>
          <img src={scrollArrowSvg} alt="Scroll Arrow" className="scroll-arrow" />
          <p>Scroll to Read Background</p>
        </div>
      </div>
    </Section>
  );
}
