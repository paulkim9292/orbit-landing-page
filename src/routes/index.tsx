import { createFileRoute } from '@tanstack/react-router';
import { useRef, useCallback } from 'react';
import { BulletConnectorLine, SnapScrollProvider, useSnapScroll } from '../components/layout';
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
  return (
    <SnapScrollProvider>
      <LandingPageContent />
    </SnapScrollProvider>
  );
}

function LandingPageContent() {
  const carouselRef = useRef<CarouselSectionHandle>(null);
  const { scrollToPage } = useSnapScroll();

  const handleInfoClick = useCallback(() => {
    scrollToPage('page9');
  }, [scrollToPage]);

  const handleBackgroundClick = useCallback(() => {
    scrollToPage('page3');
  }, [scrollToPage]);

  const handleCauseCardClick = useCallback((boxIndex: number) => {
    scrollToPage('page7');
    // Wait for scroll animation to settle, then navigate to specific carousel box
    setTimeout(() => {
      carouselRef.current?.goToSlide(boxIndex);
    }, 600);
  }, [scrollToPage]);

  return (
    <main>
      <BulletConnectorLine />
      <HeroSection
        onInfoClick={handleInfoClick}
        onBackgroundClick={handleBackgroundClick}
      />
      <IntroSection
        onInfoClick={handleInfoClick}
        onBackgroundClick={handleBackgroundClick}
      />
      <SocialWellbeingSection />
      <HongKongStatisticsSection />
      <HiddenYouthSection onCardClick={handleCauseCardClick} />
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
