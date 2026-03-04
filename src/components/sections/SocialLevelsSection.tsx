import { useRef, useCallback, useState, useEffect } from 'react';
import { Section } from '../layout/Section';
import { useSectionVisibility } from '../../hooks';
import bulletCircleSvg from '../../assets/bullet_circle.svg';
import lineSvg from '../../assets/page11_line.svg';
import lv1Svg from '../../assets/page11_lv1.svg';
import lv2Svg from '../../assets/page11_lv2.svg';
import lv3Svg from '../../assets/page11_lv3.svg';
import lv4Svg from '../../assets/page11_lv4.svg';
import lv5Svg from '../../assets/page11_lv5.svg';
import lv6Svg from '../../assets/page11_lv6.svg';
import arrowSvg from '../../assets/page11_arrow.svg';
import screenSvg from '../../assets/page11_screen.svg';
import image1Svg from '../../assets/page12_image1.svg';
import image2Svg from '../../assets/page12_image2.svg';
import image3PhoneSvg from '../../assets/page12_image3_phone.svg';
import image3ArrowSvg from '../../assets/page12_image3_arrow.svg';

export function SocialLevelsSection() {
  const { ref, hasBeenVisible } = useSectionVisibility();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animatedLevels, setAnimatedLevels] = useState([false, false, false, false, false, false]);
  const [arrowAnimated, setArrowAnimated] = useState(false);
  const [screenAnimated, setScreenAnimated] = useState(false);
  const [eventsImage1Animated, setEventsImage1Animated] = useState(false);
  const [eventsImage3Animated, setEventsImage3Animated] = useState(false);

  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [ref]);

  // Staggered animation for levels
  useEffect(() => {
    if (hasBeenVisible) {
      const levelDelays = [0, 300, 600, 900, 1200, 1500];
      const timers = levelDelays.map((delay, i) =>
        setTimeout(() => {
          setAnimatedLevels(prev => {
            const newState = [...prev];
            newState[i] = true;
            return newState;
          });
        }, delay)
      );

      // Arrow animation
      timers.push(
        setTimeout(() => setArrowAnimated(true), 1800)
      );

      // Screen animation
      timers.push(
        setTimeout(() => setScreenAnimated(true), 2200)
      );

      // Events images animation (mobile page12 content)
      timers.push(
        setTimeout(() => setEventsImage1Animated(true), 2500)
      );
      timers.push(
        setTimeout(() => setEventsImage3Animated(true), 3000)
      );

      return () => timers.forEach(clearTimeout);
    }
  }, [hasBeenVisible]);

  const levels = [
    { svg: lv1Svg, className: 'page11-lv1' },
    { svg: lv2Svg, className: 'page11-lv2' },
    { svg: lv3Svg, className: 'page11-lv3' },
    { svg: lv4Svg, className: 'page11-lv4' },
    { svg: lv5Svg, className: 'page11-lv5' },
    { svg: lv6Svg, className: 'page11-lv6' },
  ];

  return (
    <Section id="page11" ref={setRefs}>
      <div className="page11-header">
        <div className="page11-bullet">
          <img src={bulletCircleSvg} alt="Bullet" className="bullet-icon" loading="lazy" />
        </div>
        <p className="page11-text">Initial social level is assigned based on the survey result</p>
      </div>

      <div className="page11-content-wrapper">
        <img src={lineSvg} alt="Line" className="page11-line" loading="lazy" />
        {levels.map((level, index) => (
          <img
            key={level.className}
            src={level.svg}
            alt={`Level ${index + 1}`}
            className={`page11-lv ${level.className} ${animatedLevels[index] ? 'animate' : ''}`}
            loading="lazy"
          />
        ))}
      </div>

      <div className="page11-arrow-screen">
        <img
          src={arrowSvg}
          alt="Arrow"
          className={`page11-arrow ${arrowAnimated ? 'animate' : ''}`}
          loading="lazy"
        />
        <img
          src={screenSvg}
          alt="Screen"
          className={`page11-screen ${screenAnimated ? 'animate' : ''}`}
          loading="lazy"
        />
      </div>

      {/* Mobile: combined events content (page12) */}
      <div className="page11-events">
        <div className="page11-events-header">
          <div className="page12-bullet">
            <img src={bulletCircleSvg} alt="Bullet" className="bullet-icon" loading="lazy" />
          </div>
          <p className="page12-text">Users earn points by joining various social events</p>
        </div>

        <div className="page11-events-layout">
          <div className={`page11-events-detail ${eventsImage1Animated ? 'animate' : ''}`}>
            <img src={image1Svg} alt="Event detail" loading="lazy" />
          </div>
          <img src={image2Svg} alt="Events screen" className="page11-events-phone" loading="lazy" />
          <img src={image3ArrowSvg} alt="Arrow" className={`page11-reports-arrow ${eventsImage3Animated ? 'animate' : ''}`} loading="lazy" />
          <p className={`page11-reports-text ${eventsImage3Animated ? 'animate' : ''}`}>
            Monthly Social Wellbeing<br />Reports provided
          </p>
          <img src={image3PhoneSvg} alt="Reports screen" className={`page11-reports-phone ${eventsImage3Animated ? 'animate' : ''}`} loading="lazy" />
        </div>
      </div>
    </Section>
  );
}
