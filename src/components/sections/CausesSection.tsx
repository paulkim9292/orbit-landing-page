import { useRef, useCallback, useState, useEffect } from 'react';
import { Section } from '../layout/Section';
import { useSectionVisibility } from '../../hooks';
import icon1Svg from '../../assets/page6_icon1.svg';
import icon2Svg from '../../assets/page6_icon2.svg';
import icon3Svg from '../../assets/page6_icon3.svg';

interface CausesSectionProps {
  onCardClick?: (boxIndex: number) => void;
}

export function CausesSection({ onCardClick }: CausesSectionProps) {
  const { ref, hasBeenVisible } = useSectionVisibility();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animatedCards, setAnimatedCards] = useState([false, false, false]);

  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [ref]);

  // Staggered animation for cards
  useEffect(() => {
    if (hasBeenVisible) {
      const timers = [
        setTimeout(() => setAnimatedCards(prev => [true, prev[1], prev[2]]), 0),
        setTimeout(() => setAnimatedCards(prev => [prev[0], true, prev[2]]), 300),
        setTimeout(() => setAnimatedCards(prev => [prev[0], prev[1], true]), 600),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [hasBeenVisible]);

  const handleClick = (boxIndex: number) => {
    onCardClick?.(boxIndex);
  };

  return (
    <Section id="page6" ref={setRefs} style={{ justifyContent: 'space-around' }}>
      <b className="page-title">Why is this happening in Hong Kong?</b>
      <div className="page6-container">
        <div className={`page6-card ${animatedCards[0] ? 'animate' : ''}`}>
          <img src={icon1Svg} alt="Page 6 Icon 1" loading="lazy" />
          <p>Achievement-driven<br />Competitive<br />Societal Culture</p>
          <button className="page6-btn" onClick={() => handleClick(0)}>
            Click to Read More
          </button>
        </div>
        <div className={`page6-card ${animatedCards[1] ? 'animate' : ''}`}>
          <img src={icon2Svg} alt="Page 6 Icon 2" loading="lazy" />
          <p>Superficial Facade<br />of Social Media<br />Addiction</p>
          <button className="page6-btn" onClick={() => handleClick(1)}>
            Click to Read More
          </button>
        </div>
        <div className={`page6-card ${animatedCards[2] ? 'animate' : ''}`}>
          <img src={icon3Svg} alt="Page 6 Icon 3" loading="lazy" />
          <p>Lack of Genuine<br />Personal<br />Connection</p>
          <button className="page6-btn" onClick={() => handleClick(2)}>
            Click to Read More
          </button>
        </div>
      </div>
    </Section>
  );
}
