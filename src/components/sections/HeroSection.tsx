import { Section } from '../layout/Section';
import planetVideo from '../../assets/planet.mp4';

export function HeroSection() {
  return (
    <Section id="page1">
      <video
        className="page1-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={planetVideo} type="video/mp4" />
      </video>
    </Section>
  );
}
