import { useParallaxCircles } from '../../hooks';

export function ParallaxCircles() {
  const transforms = useParallaxCircles();

  return (
    <div className="circles-container">
      <div
        id="pink"
        className="circle"
        style={{ transform: `translate(${transforms.pink.x}px, ${transforms.pink.y}px)` }}
      />
      <div
        id="purple2"
        className="circle"
        style={{ transform: `translate(${transforms.purple2.x}px, ${transforms.purple2.y}px)` }}
      />
      <div
        id="purple1"
        className="circle"
        style={{ transform: `translate(${transforms.purple1.x}px, ${transforms.purple1.y}px)` }}
      />
      <div
        id="navy2"
        className="circle"
        style={{ transform: `translate(${transforms.navy2.x}px, ${transforms.navy2.y}px)` }}
      />
      <div
        id="navy1"
        className="circle"
        style={{ transform: `translate(${transforms.navy1.x}px, ${transforms.navy1.y}px)` }}
      />
    </div>
  );
}
