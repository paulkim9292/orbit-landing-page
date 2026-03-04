import { useParallaxCircles } from '../../hooks';

export function ParallaxCircles() {
  useParallaxCircles();

  return (
    <div className="circles-container">
      <div id="pink" className="circle" />
      <div id="purple2" className="circle" />
      <div id="purple1" className="circle" />
      <div id="navy2" className="circle" />
      <div id="navy1" className="circle" />
    </div>
  );
}
