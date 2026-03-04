import { useState, useEffect } from 'react';
import toTopBtnSvg from '../../assets/to_top_btn_blue.svg';
import { useSnapScroll } from './SnapScrollProvider';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollToPage } = useSnapScroll();

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      // Show button after scrolling down one viewport height
      setIsVisible(scrollTop > windowHeight);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
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
