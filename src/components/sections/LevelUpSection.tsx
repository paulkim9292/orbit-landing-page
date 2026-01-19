import { useRef, useCallback, useState, useEffect } from 'react';
import { Section } from '../layout/Section';
import { useSectionVisibility } from '../../hooks';
import bulletCircleSvg from '../../assets/bullet_circle.svg';
import orbitTextSvg from '../../assets/orbit_text.svg';
import qrCodeSvg from '../../assets/page13_qr.svg';

export function LevelUpSection() {
  const { ref, hasBeenVisible } = useSectionVisibility();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progressAnimated, setProgressAnimated] = useState(false);
  const [titleAnimated, setTitleAnimated] = useState(false);
  const [qrAnimated, setQrAnimated] = useState(false);

  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [ref]);

  // Staggered animation
  useEffect(() => {
    if (hasBeenVisible) {
      const timer1 = setTimeout(() => setProgressAnimated(true), 0);
      const timer2 = setTimeout(() => setTitleAnimated(true), 300);
      const timer3 = setTimeout(() => setQrAnimated(true), 600);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [hasBeenVisible]);

  return (
    <Section id="page13" ref={setRefs}>
      <div className="page13-header">
        <div className="page13-bullet">
          <img src={bulletCircleSvg} alt="Bullet" className="bullet-icon" loading="lazy" />
        </div>
        <p className="page13-text">Users can level up to the next social level!</p>
      </div>

      <img
        src={orbitTextSvg}
        alt="Progress"
        className={`page13-progress ${progressAnimated ? 'animate' : ''}`}
        loading="lazy"
      />
      <h2 className={`page13-connect-title ${titleAnimated ? 'animate' : ''}`}>
        Connect your space with us.
      </h2>
      <img
        src={qrCodeSvg}
        alt="QR Code"
        className={`page13-qr ${qrAnimated ? 'animate' : ''}`}
        loading="lazy"
      />

      <div className="page13-header2">
        <div className="page13-bullet2">
          <img src={bulletCircleSvg} alt="Bullet" className="bullet-icon" loading="lazy" />
        </div>
        <p className="page13-text">Users get to improve social wellbeing through Orbit</p>
      </div>
    </Section>
  );
}
