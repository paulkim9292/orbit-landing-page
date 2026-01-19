import { useRef, useCallback, useState, useEffect } from 'react';
import { Section } from '../layout/Section';
import { useSectionVisibility, useCounterAnimation } from '../../hooks';
import arrowSvg from '../../assets/page5_arrow.svg';

export function HiddenYouthSection() {
  const { ref, hasBeenVisible } = useSectionVisibility();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showHiddenYouth, setShowHiddenYouth] = useState(false);

  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [ref]);

  const counterValue = useCounterAnimation({
    start: 4000,
    end: 5500,
    duration: 1000,
    trigger: hasBeenVisible,
  });

  // Show hidden youth text after counter animation
  useEffect(() => {
    if (hasBeenVisible) {
      const timer = setTimeout(() => {
        setShowHiddenYouth(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasBeenVisible]);

  return (
    <Section id="page5" ref={setRefs}>
      <div className="page5-content">
        <b className="page-title">Alertly, more Hong Kong students are skipping classes</b>
        <div className="stat-box-container">
          <div className="stat-box">
            <p>4000</p>
          </div>
          <div className={`stat-box stat-box-large ${hasBeenVisible ? 'animate' : ''}`}>
            <p>{counterValue}</p>
          </div>
          <div className={`page5-arrow ${hasBeenVisible ? 'animate' : ''}`}>
            <img src={arrowSvg} alt="Page 5 Arrow" loading="lazy" />
          </div>
        </div>
        <p>all these data indicate worsening trend of</p>
        <p className={`hidden-youth-txt ${showHiddenYouth ? 'animate' : ''}`}>hidden youth</p>
      </div>
    </Section>
  );
}
