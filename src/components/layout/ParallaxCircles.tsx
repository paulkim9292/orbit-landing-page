import { useParallaxCircles } from '../../hooks';
import pinkSvg from '../../assets/pink.svg';
import purple1Svg from '../../assets/purple1.svg';
import purple2Svg from '../../assets/purple2.svg';
import navy1Svg from '../../assets/navy1.svg';
import navy2Svg from '../../assets/navy2.svg';

export function ParallaxCircles() {
  const transforms = useParallaxCircles();

  return (
    <div className="circles-container">
      <div
        id="pink"
        className="circle"
        style={{ transform: `translate(${transforms.pink.x}px, ${transforms.pink.y}px)` }}
      >
        <img src={pinkSvg} alt="Pink circle" />
      </div>
      <div
        id="purple2"
        className="circle"
        style={{ transform: `translate(${transforms.purple2.x}px, ${transforms.purple2.y}px)` }}
      >
        <img src={purple2Svg} alt="Purple circle 2" />
      </div>
      <div
        id="purple1"
        className="circle"
        style={{ transform: `translate(${transforms.purple1.x}px, ${transforms.purple1.y}px)` }}
      >
        <img src={purple1Svg} alt="Purple circle 1" />
      </div>
      <div
        id="navy2"
        className="circle"
        style={{ transform: `translate(${transforms.navy2.x}px, ${transforms.navy2.y}px)` }}
      >
        <img src={navy2Svg} alt="Navy circle 2" />
      </div>
      <div
        id="navy1"
        className="circle"
        style={{ transform: `translate(${transforms.navy1.x}px, ${transforms.navy1.y}px)` }}
      >
        <img src={navy1Svg} alt="Navy circle 1" />
      </div>
    </div>
  );
}
