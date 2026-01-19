import { useRef, useCallback, useState, useEffect } from 'react';
import { Section } from '../layout/Section';
import { useSectionVisibility } from '../../hooks';
import lineSvg from '../../assets/page8_line.svg';
import fulfilmentSvg from '../../assets/page8_fulfilment.svg';
import physicalWellbeingSvg from '../../assets/page8_physical_wellbeing.svg';
import purposeSvg from '../../assets/page8_purpose.svg';
import arrowSvg from '../../assets/page8_arrow.svg';
import socialWellbeingSvg from '../../assets/page8_social_wellbeing.svg';

export function WellbeingIndexSection() {
  const { ref, hasBeenVisible } = useSectionVisibility();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animatedImages, setAnimatedImages] = useState([false, false, false, false, false]);

  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [ref]);

  // Sequential animation for images
  useEffect(() => {
    if (hasBeenVisible) {
      const delays = [0, 300, 600, 900, 1200];
      const timers = delays.map((delay, i) =>
        setTimeout(() => {
          setAnimatedImages(prev => {
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
    <Section id="page8" ref={setRefs} style={{ justifyContent: 'space-evenly' }}>
      <p className="page8-title">Above factors lowers the <b>overall</b> social wellbeing index</p>
      <div className="page8-image">
        <img src={lineSvg} alt="Line" loading="lazy" />
        <img
          src={fulfilmentSvg}
          alt="Fulfilment"
          className={animatedImages[0] ? 'animate' : ''}
          loading="lazy"
        />
        <img
          src={physicalWellbeingSvg}
          alt="Physical Wellbeing"
          className={animatedImages[1] ? 'animate' : ''}
          loading="lazy"
        />
        <img
          src={purposeSvg}
          alt="Purpose"
          className={animatedImages[2] ? 'animate' : ''}
          loading="lazy"
        />
        <img
          src={arrowSvg}
          alt="Arrow"
          className={animatedImages[3] ? 'animate' : ''}
          loading="lazy"
        />
        <img
          src={socialWellbeingSvg}
          alt="Social Wellbeing"
          className={animatedImages[4] ? 'animate' : ''}
          loading="lazy"
        />
      </div>
      <div className="page8-bottom-text">
        <p>With the increasing severity of such situation</p>
        <b>community-based, socially-engaged activities are in need</b>
      </div>
    </Section>
  );
}
