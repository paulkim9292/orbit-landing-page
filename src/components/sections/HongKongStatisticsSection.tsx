import { useRef, useCallback, useEffect, useState } from 'react';
import { Section } from '../layout/Section';
import { useSectionVisibility } from '../../hooks';
import peopleSvg from '../../assets/page3_people.svg';
import hkIconSvg from '../../assets/page4_hk_icon.svg';
import icon1Svg from '../../assets/page4_icon1.svg';
import icon2Svg from '../../assets/page4_icon2.svg';

export function HongKongStatisticsSection() {
  const { ref, hasBeenVisible } = useSectionVisibility();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [peopleAnimated, setPeopleAnimated] = useState(false);
  const [hkAnimated, setHkAnimated] = useState(false);
  const [stat1Animated, setStat1Animated] = useState(false);
  const [stat2Animated, setStat2Animated] = useState(false);

  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [ref]);

  useEffect(() => {
    if (hasBeenVisible) {
      const t1 = setTimeout(() => setPeopleAnimated(true), 0);
      const t2 = setTimeout(() => setHkAnimated(true), 400);
      const t3 = setTimeout(() => setStat1Animated(true), 800);
      const t4 = setTimeout(() => setStat2Animated(true), 1100);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }
  }, [hasBeenVisible]);

  return (
    <Section id="page4" ref={setRefs}>
      <div className="page4-definition">
        <b className="page4-wellness-title">Social Wellness :</b>
        <p className="page4-wellness-text">
          The ability to create and maintain healthy relationships with others by participating in{' '}
          <b>community</b> or <b>group activities</b>
        </p>
        <img
          src={peopleSvg}
          alt="People"
          className={`page4-people ${peopleAnimated ? 'animate' : ''}`}
          loading="lazy"
        />
      </div>

      <p className="page4-transition-text">
        Contrarily, in Hong Kong, people aged between 18-23...
      </p>

      <div className="page4-hk-emblem">
        <img
          src={hkIconSvg}
          alt="Hong Kong emblem"
          className={`hk-icon ${hkAnimated ? 'animate' : ''}`}
          loading="lazy"
        />
      </div>

      <div className="page4-stats">
        <div className={`page4-stat-row ${stat1Animated ? 'animate' : ''}`}>
          <img
            src={icon1Svg}
            alt="Lack of activities"
            className="page4-stat-icon"
            loading="lazy"
          />
          <div className="page4-stat-text">
            <b>Lack of Activities</b>
            <p>56.3% exercise<br />once in a month</p>
          </div>
        </div>

        <div className={`page4-stat-row ${stat2Animated ? 'animate' : ''}`}>
          <img
            src={icon2Svg}
            alt="Unhealthy mindset"
            className="page4-stat-icon"
            loading="lazy"
          />
          <div className="page4-stat-text">
            <b>Unhealthy Mindset</b>
            <p>51.9% showed symptoms<br />of depression/anxiety</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
