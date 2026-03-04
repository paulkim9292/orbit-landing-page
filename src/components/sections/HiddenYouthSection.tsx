import { useRef, useCallback, useState, useEffect } from 'react';
import { Section } from '../layout/Section';
import { useSectionVisibility, useCounterAnimation } from '../../hooks';
import arrowSvg from '../../assets/page5_arrow.svg';
import cause1Svg from '../../assets/page6_icon1.svg';
import cause2Svg from '../../assets/page6_icon2.svg';
import cause3Svg from '../../assets/page6_icon3.svg';

interface HiddenYouthSectionProps {
  onCardClick?: (boxIndex: number) => void;
}

export function HiddenYouthSection({ onCardClick }: HiddenYouthSectionProps) {
  const { ref, hasBeenVisible } = useSectionVisibility();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [showHiddenYouth, setShowHiddenYouth] = useState(false);
  const [causeTitleAnimated, setCauseTitleAnimated] = useState(false);
  const [animatedCauses, setAnimatedCauses] = useState([false, false, false]);

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

  // Show hidden youth text and causes after counter animation
  useEffect(() => {
    if (hasBeenVisible) {
      const timers = [
        setTimeout(() => setShowHiddenYouth(true), 1000),
        setTimeout(() => setCauseTitleAnimated(true), 1500),
        ...[1800, 2100, 2400].map((delay, i) =>
          setTimeout(() => {
            setAnimatedCauses(prev => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }, delay)
        ),
      ];
      return () => timers.forEach(clearTimeout);
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
          <div className="stat-box-large-wrapper">
            <div className={`stat-box-large-bar ${hasBeenVisible ? 'animate' : ''}`} />
            <p className="stat-box-large-number">{counterValue}</p>
          </div>
          <div className={`page5-arrow ${hasBeenVisible ? 'animate' : ''}`}>
            <img src={arrowSvg} alt="Page 5 Arrow" loading="lazy" />
          </div>
        </div>
        <p>all these data indicate worsening trend of</p>
        <p className={`hidden-youth-txt ${showHiddenYouth ? 'animate' : ''}`}>hidden youth</p>
      </div>

      <div className="page5-causes">
        <b className={`page5-causes-title ${causeTitleAnimated ? 'animate' : ''}`}>Why is this happening in Hong Kong?</b>
        <div className="page5-causes-list">
          <div className={`page5-cause-card ${animatedCauses[0] ? 'animate' : ''}`}>
            <img src={cause1Svg} alt="Achievement-driven culture" loading="lazy" />
            <div className="page5-cause-info">
              <p>Achievement-driven<br />Competitive Societal Culture</p>
              <button className="page6-btn" onClick={() => onCardClick?.(0)}>Click to Read More</button>
            </div>
          </div>
          <div className={`page5-cause-card ${animatedCauses[1] ? 'animate' : ''}`}>
            <img src={cause2Svg} alt="Social media addiction" loading="lazy" />
            <div className="page5-cause-info">
              <p>Social Media Addiction &amp;<br />Apathy in Physical Activities</p>
              <button className="page6-btn" onClick={() => onCardClick?.(1)}>Click to Read More</button>
            </div>
          </div>
          <div className={`page5-cause-card ${animatedCauses[2] ? 'animate' : ''}`}>
            <img src={cause3Svg} alt="Lack of connection" loading="lazy" />
            <div className="page5-cause-info">
              <p>Lack of Genuine<br />Personal Connection</p>
              <button className="page6-btn" onClick={() => onCardClick?.(2)}>Click to Read More</button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
