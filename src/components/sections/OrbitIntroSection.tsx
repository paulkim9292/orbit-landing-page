import { useRef, useCallback, useState, useEffect } from 'react';
import { Section } from '../layout/Section';
import { useSectionVisibility } from '../../hooks';
import orbitTextSvg from '../../assets/orbit_text.svg';
import appIconSvg from '../../assets/app_icon.svg';

export function OrbitIntroSection() {
  const { ref, hasBeenVisible } = useSectionVisibility();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animatedElements, setAnimatedElements] = useState([false, false, false, false]);

  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [ref]);

  // Staggered animation
  useEffect(() => {
    if (hasBeenVisible) {
      const delays = [0, 150, 300, 600];
      const timers = delays.map((delay, i) =>
        setTimeout(() => {
          setAnimatedElements(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, delay)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [hasBeenVisible]);

  return (
    <Section id="page9" ref={setRefs}>
      <img
        src={orbitTextSvg}
        alt="Orbit Text"
        className={`page9-orbit-text ${animatedElements[0] ? 'animate' : ''}`}
        loading="lazy"
      />
      <img
        src={appIconSvg}
        alt="App Icon"
        className={`page9-app-icon ${animatedElements[1] ? 'animate' : ''}`}
        loading="lazy"
      />
      <p className={`page9-text ${animatedElements[2] ? 'animate' : ''}`}>We introduce Orbit:</p>
      <p className={`page9-text ${animatedElements[3] ? 'animate' : ''}`}>
        App for your social-wellness and community engagement
      </p>
    </Section>
  );
}
