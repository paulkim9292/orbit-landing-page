import { createFileRoute } from '@tanstack/react-router';
import { useRef, useCallback } from 'react';
import { BulletConnectorLine } from '../components/layout';
import {
  HeroSection,
  IntroSection,
  SocialWellbeingSection,
  HongKongStatisticsSection,
  HiddenYouthSection,
  CausesSection,
  CarouselSection,
  WellbeingIndexSection,
  OrbitIntroSection,
  HowItWorksSection,
  SocialLevelsSection,
  EventsSection,
  LevelUpSection,
} from '../components/sections';
import type { CarouselSectionHandle } from '../components/sections/CarouselSection';

export const Route = createFileRoute('/')({
  component: LandingPage,
});

function LandingPage() {
  const carouselRef = useRef<CarouselSectionHandle>(null);

  const scrollToPage = useCallback((pageId: string) => {
    const page = document.getElementById(pageId);
    if (page) {
      window.scrollTo({
        top: page.offsetTop,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleInfoClick = useCallback(() => {
    scrollToPage('page9');
  }, [scrollToPage]);

  const handleBackgroundClick = useCallback(() => {
    scrollToPage('page3');
  }, [scrollToPage]);

  const handleCauseCardClick = useCallback((boxIndex: number) => {
    const page7 = document.getElementById('page7');
    if (page7) {
      window.scrollTo({
        top: page7.offsetTop,
        behavior: 'smooth',
      });

      // Wait for scroll to complete, then navigate to specific carousel box
      setTimeout(() => {
        carouselRef.current?.goToSlide(boxIndex);
      }, 600);
    }
  }, []);

  return (
    <main>
      <BulletConnectorLine />
      <HeroSection />
      <IntroSection
        onInfoClick={handleInfoClick}
        onBackgroundClick={handleBackgroundClick}
      />
      <SocialWellbeingSection />
      <HongKongStatisticsSection />
      <HiddenYouthSection />
      <CausesSection onCardClick={handleCauseCardClick} />
      <CarouselSection ref={carouselRef} />
      <WellbeingIndexSection />
      <OrbitIntroSection />
      <HowItWorksSection />
      <SocialLevelsSection />
      <EventsSection />
      <LevelUpSection />
    </main>
  );
}
