import { useState, useEffect, useRef } from 'react';

export function BulletConnectorLine() {
  const [style, setStyle] = useState<{ top: string; height: string }>({ top: '0px', height: '0px' });
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateLine = () => {
      const firstBullet = document.querySelector('.page10-bullet .bullet-icon');
      const lastBullet = document.querySelector('.page13-bullet2 .bullet-icon');

      if (firstBullet && lastBullet) {
        const firstRect = firstBullet.getBoundingClientRect();
        const lastRect = lastBullet.getBoundingClientRect();

        const firstTop = firstRect.top + window.scrollY + firstRect.height / 2;
        const lastTop = lastRect.top + window.scrollY + lastRect.height / 2;

        setStyle({
          top: `${firstTop}px`,
          height: `${lastTop - firstTop}px`,
        });
      }
    };

    updateLine();
    window.addEventListener('resize', updateLine);

    // Also update after a short delay to ensure DOM is ready
    const timeout = setTimeout(updateLine, 100);

    return () => {
      window.removeEventListener('resize', updateLine);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      ref={lineRef}
      className="bullet-connector-line"
      style={style}
    />
  );
}
