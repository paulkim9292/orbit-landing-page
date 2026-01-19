import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Section } from '../layout/Section';
import { usePieChartAnimation } from '../../hooks';
import arrowSvg from '../../assets/page7_arrow.svg';

interface PieChartProps {
  percentage: number;
  trigger: boolean;
  id: string;
}

function PieChart({ percentage, trigger, id }: PieChartProps) {
  const { path } = usePieChartAnimation({ percentage, trigger, duration: 1000 });

  return (
    <svg className="pie-chart" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="90" fill="#AEB1E7" />
      <path id={id} d={path} fill="#924D90" transform="translate(100, 100)" />
      <text x="175" y="70" className="pie-percent" textAnchor="end" dominantBaseline="hanging">
        {percentage}%
      </text>
    </svg>
  );
}

export interface CarouselSectionHandle {
  goToSlide: (index: number) => void;
}

export const CarouselSection = forwardRef<CarouselSectionHandle>((_, forwardedRef) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [boxAnimations, setBoxAnimations] = useState([false, false, false]);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Expose goToSlide method to parent
  useImperativeHandle(forwardedRef, () => ({
    goToSlide: (index: number) => {
      const boxes = carouselWrapperRef.current?.querySelectorAll('.carousel-box');
      if (boxes && boxes[index]) {
        boxes[index].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
        setCurrentSlide(index);
        triggerBoxAnimation(index);
      }
    },
  }));

  const triggerBoxAnimation = (index: number) => {
    if (!boxAnimations[index]) {
      setBoxAnimations(prev => {
        const newState = [...prev];
        newState[index] = true;
        return newState;
      });
    }
  };

  // Handle scroll to update active slide
  useEffect(() => {
    const wrapper = carouselWrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const boxes = wrapper.querySelectorAll('.carousel-box');
      if (!boxes.length) return;

      const boxWidth = boxes[0].clientWidth;
      const gap = 32; // 2rem
      const scrollLeft = wrapper.scrollLeft;

      const newSlide = Math.round(scrollLeft / (boxWidth + gap));
      if (newSlide !== currentSlide && newSlide >= 0 && newSlide < boxes.length) {
        setCurrentSlide(newSlide);
        triggerBoxAnimation(newSlide);
      }
    };

    wrapper.addEventListener('scroll', handleScroll);
    return () => wrapper.removeEventListener('scroll', handleScroll);
  }, [currentSlide, boxAnimations]);

  // Observer for when carousel section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && currentSlide === 0) {
            triggerBoxAnimation(0);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [currentSlide]);

  const handleDotClick = (index: number) => {
    const boxes = carouselWrapperRef.current?.querySelectorAll('.carousel-box');
    if (boxes && boxes[index]) {
      boxes[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setCurrentSlide(index);
      setTimeout(() => triggerBoxAnimation(index), 100);
    }
  };

  return (
    <Section id="page7" ref={sectionRef}>
      <div className="carousel-container">
        <div className="carousel-wrapper" ref={carouselWrapperRef}>
          {/* Box 1: Achievement-oriented Culture */}
          <div className={`carousel-box ${currentSlide === 0 ? 'active' : ''} ${boxAnimations[0] ? 'animated' : ''}`}>
            <div className="box-content">
              <h2 className="box-title">Achievement-oriented, Competitive Societal Culture</h2>

              <div className="box-charts-wrapper">
                <div className="pie-section">
                  <PieChart percentage={85} trigger={boxAnimations[0]} id="box1-pie-path" />
                  <p className="pie-label">Private tutoring<br />participation rate</p>
                </div>

                <div className="bar-section">
                  <div className="bar-row">
                    <span className="bar-year">2016</span>
                    <div className="bar bar-blue" style={{ '--final-width': '14%' } as React.CSSProperties}>24%</div>
                    <div className="bar bar-purple" style={{ '--final-width': '25%' } as React.CSSProperties}>42%</div>
                    <img src={arrowSvg} alt="Arrow" className="bar-arrow" />
                  </div>
                  <div className="bar-row">
                    <span className="bar-year">2024</span>
                    <div className="bar bar-blue" style={{ '--final-width': '36%' } as React.CSSProperties}>60%</div>
                    <div className="bar bar-purple" style={{ '--final-width': '48%' } as React.CSSProperties}>80%</div>
                  </div>
                  <div className="box-legend">
                    <div className="legend-item">
                      <span className="legend-color legend-blue"></span>
                      <span>Students at risk to develop depression/anxiety</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color legend-purple"></span>
                      <span>Students already showing depression symptoms</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="box-caption">
                <p>Compulsion for high achievements are exhausting students mentally</p>
              </div>
            </div>
          </div>

          {/* Box 2: Social Media Addiction */}
          <div className={`carousel-box ${currentSlide === 1 ? 'active' : ''} ${boxAnimations[1] ? 'animated' : ''}`}>
            <div className="box-content">
              <h2 className="box-title">Social Media Addiction & Apathy in Physical Activities</h2>

              <div className="box-charts-wrapper box-charts-wrapper-center">
                <div className="pie-section">
                  <PieChart percentage={98} trigger={boxAnimations[1]} id="box2-pie-path-left" />
                  <p className="pie-label">Smartphone<br />penetration rate<br />(world's highest)</p>
                </div>

                <div className="pie-section">
                  <PieChart percentage={57} trigger={boxAnimations[1]} id="box2-pie-path-right" />
                  <p className="pie-label">Face-to-face<br />social activities<br />(&lt;2 times/week)</p>
                </div>
              </div>

              <div className="box-caption">
                <p>Higher digital presence, lower offline activities weaken them physically</p>
              </div>
            </div>
          </div>

          {/* Box 3: Lack of Personal Connection */}
          <div className={`carousel-box ${currentSlide === 2 ? 'active' : ''} ${boxAnimations[2] ? 'animated' : ''}`}>
            <div className="box-content">
              <h2 className="box-title">Lack of Genuine Personal Connection</h2>

              <div className="box-charts-wrapper box-charts-wrapper-center">
                <div className="pie-section">
                  <PieChart percentage={85} trigger={boxAnimations[2]} id="box3-pie-path-left" />
                  <p className="pie-label">Feels like no one to<br />talk to receive<br />emotional support</p>
                </div>

                <div className="pie-section">
                  <PieChart percentage={30} trigger={boxAnimations[2]} id="box3-pie-path-right" />
                  <p className="pie-label">Youth Suicidal Rate<br />among Hidden Youth<br />(socially withdrawn)</p>
                </div>
              </div>

              <div className="box-caption">
                <p>Despite hyper-network through media, students feel socially isolated</p>
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-dots">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
});

CarouselSection.displayName = 'CarouselSection';
