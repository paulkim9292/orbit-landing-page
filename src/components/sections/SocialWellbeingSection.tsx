import { useRef, useCallback } from 'react';
import { Section } from '../layout/Section';
import { useSectionVisibility } from '../../hooks';
import peopleSvg from '../../assets/page3_people.svg';

export function SocialWellbeingSection() {
  const { ref, hasBeenVisible } = useSectionVisibility();
  const sectionRef = useRef<HTMLElement | null>(null);

  const setRefs = useCallback((node: HTMLElement | null) => {
    sectionRef.current = node;
    (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  }, [ref]);

  return (
    <Section id="page3" ref={setRefs}>
      <b className="page-title">Social wellbeing is ...</b>
      <p className="page3-text">
        The ability to create and maintain healthy relationships with others by participating in community or group activities
      </p>
      <img
        src={peopleSvg}
        alt="Page 3 People"
        className={`page3-people ${hasBeenVisible ? 'animate' : ''}`}
        loading="lazy"
      />
    </Section>
  );
}
