import { useRef, useCallback } from 'react';
import { Section } from '../layout/Section';
import { useSectionVisibility } from '../../hooks';
import hkIconSvg from '../../assets/page4_hk_icon.svg';
import icon1Svg from '../../assets/page4_icon1.svg';
import icon2Svg from '../../assets/page4_icon2.svg';

export function HongKongStatisticsSection() {
  const { ref, hasBeenVisible } = useSectionVisibility();
  const sectionRef = useRef<HTMLElement | null>(null);

  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [ref]);

  return (
    <Section id="page4" ref={setRefs}>
      <b className="page-title">Contrarily, in Hong Kong, people aged between 18-23...</b>
      <img
        src={hkIconSvg}
        alt="HK Icon"
        className={`hk-icon ${hasBeenVisible ? 'animate' : ''}`}
        loading="lazy"
      />
      <div className="page4-content">
        <div>
          <img
            src={icon1Svg}
            alt="Page 4 Icon 1"
            className={`page4-icon1 ${hasBeenVisible ? 'animate' : ''}`}
            loading="lazy"
          />
          <b>Lack of Activities</b>
          <p>56.3% exercise<br />once in a month</p>
        </div>
        <div>
          <img
            src={icon2Svg}
            alt="Page 4 Icon 2"
            className={`page4-icon2 ${hasBeenVisible ? 'animate' : ''}`}
            loading="lazy"
          />
          <b>Unhealthy Mindset</b>
          <p>51.9% showed symptoms<br />of depression/anxiety</p>
        </div>
      </div>
    </Section>
  );
}
