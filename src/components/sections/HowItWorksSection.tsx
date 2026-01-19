import { useRef, useCallback, useState, useEffect } from 'react';
import { Section } from '../layout/Section';
import { useSectionVisibility } from '../../hooks';
import bulletCircleSvg from '../../assets/bullet_circle.svg';
import arrowRightSvg from '../../assets/arrow_right.svg';
import phone1Png from '../../assets/page10_phone1.png';
import phone2Png from '../../assets/page10_phone2.png';
import phone3Png from '../../assets/page10_phone3.png';
import phone4Png from '../../assets/page10_phone4.png';

export function HowItWorksSection() {
  const { ref, hasBeenVisible } = useSectionVisibility();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animatedPhones, setAnimatedPhones] = useState([false, false, false, false]);

  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [ref]);

  // Staggered animation for phones
  useEffect(() => {
    if (hasBeenVisible) {
      const delays = [0, 150, 300, 450];
      const timers = delays.map((delay, i) =>
        setTimeout(() => {
          setAnimatedPhones(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, delay)
      );
      return () => timers.forEach(clearTimeout);
    }
  }, [hasBeenVisible]);

  const phones = [
    { img: phone1Png, badge: 'Social Connection' },
    { img: phone2Png, badge: 'Emotional Status' },
    { img: phone3Png, badge: 'Active Lifestyle' },
    { img: phone4Png, badge: 'Digital Lifestyle' },
  ];

  return (
    <Section id="page10" ref={setRefs}>
      <h1 className="page10-title">How does it work?</h1>

      <div className="page10-flow">
        <div className="page10-bullet">
          <img src={bulletCircleSvg} alt="Bullet" className="bullet-icon" loading="lazy" />
        </div>
        <p className="page10-flow-text">User creates Orbit account</p>
        <img src={arrowRightSvg} alt="Arrow" className="page10-arrow" loading="lazy" />
        <p className="page10-flow-text">takes On-Board Questionnaires</p>
      </div>

      <p className="page10-subtitle">There are a total of 20 questions, 4 questions per aspect:</p>

      <div className="page10-phone-grid">
        {phones.map((phone, index) => (
          <div
            key={phone.badge}
            className={`page10-phone-item ${animatedPhones[index] ? 'animate' : ''}`}
          >
            <img src={phone.img} alt={`Questionnaire ${index + 1}`} loading="lazy" />
            <div className="page10-badge">{phone.badge}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
