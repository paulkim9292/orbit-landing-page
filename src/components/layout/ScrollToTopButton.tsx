import { useState, useEffect } from 'react';
import toTopBtnSvg from '../../assets/to_top_btn_blue.svg';
import { useSnapScroll } from './SnapScrollProvider';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToPage } = useSnapScroll();

  useEffect(() => {
    const hero = document.getElementById('page1');
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    scrollToPage('page1');
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <img src={toTopBtnSvg} alt="Scroll to top" />
    </button>
  );
}
