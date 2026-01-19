import { useRef, useCallback, useState, useEffect } from 'react';
import { Section } from '../layout/Section';
import { useSectionVisibility } from '../../hooks';
import bulletCircleSvg from '../../assets/bullet_circle.svg';
import image1Svg from '../../assets/page12_image1.svg';
import image2Svg from '../../assets/page12_image2.svg';
import image3Svg from '../../assets/page12_image3.svg';

export function EventsSection() {
  const { ref, hasBeenVisible } = useSectionVisibility();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [image1Animated, setImage1Animated] = useState(false);
  const [image3Animated, setImage3Animated] = useState(false);

  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [ref]);

  // Animation for images
  useEffect(() => {
    if (hasBeenVisible) {
      const timer1 = setTimeout(() => setImage1Animated(true), 300);
      const timer3 = setTimeout(() => setImage3Animated(true), 1300);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer3);
      };
    }
  }, [hasBeenVisible]);

  return (
    <Section id="page12" ref={setRefs}>
      <div className="page12-header">
        <div className="page12-bullet">
          <img src={bulletCircleSvg} alt="Bullet" className="bullet-icon" loading="lazy" />
        </div>
        <p className="page12-text">Users earn points by joining various social events</p>
      </div>

      <div className="page12-images">
        <img
          src={image1Svg}
          alt="Image 1"
          className={`page12-image ${image1Animated ? 'animate' : ''}`}
          loading="lazy"
        />
        <img
          src={image2Svg}
          alt="Image 2"
          className="page12-image"
          loading="lazy"
        />
        <img
          src={image3Svg}
          alt="Image 3"
          className={`page12-image ${image3Animated ? 'animate' : ''}`}
          loading="lazy"
        />
      </div>
    </Section>
  );
}
