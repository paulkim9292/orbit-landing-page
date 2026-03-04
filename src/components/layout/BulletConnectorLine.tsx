import { useState, useEffect } from 'react';

export function BulletConnectorLine() {
  const [style, setStyle] = useState<React.CSSProperties>({ top: '0px', height: '0px', left: '0px' });

  useEffect(() => {
    const updateLine = () => {
      const LINE_WIDTH = window.innerWidth <= 767 ? 2 : 4;
      const firstBullet = document.querySelector<HTMLElement>('.page10-bullet .bullet-icon');
      const lastBullet = document.querySelector<HTMLElement>('.page13-bullet2 .bullet-icon');

      if (firstBullet && lastBullet) {
        const firstRect = firstBullet.getBoundingClientRect();
        const lastRect = lastBullet.getBoundingClientRect();

        const firstTop = firstRect.top + window.scrollY + firstRect.height / 2;
        const lastTop = lastRect.top + window.scrollY + lastRect.height / 2;

        const bulletCenterX = firstRect.left + window.scrollX + firstRect.width / 2;
        const lineLeft = bulletCenterX - LINE_WIDTH / 2;

        setStyle({
          top: `${firstTop}px`,
          height: `${lastTop - firstTop}px`,
          left: `${lineLeft}px`,
        });
      }
    };

    // Wait for document to be fully loaded, then defer calculation
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(updateLine, 300);
      }, { once: true });
    } else {
      // Already loaded, wait for images
      Promise.all(
        Array.from(document.images)
          .map(img =>
            img.complete
              ? Promise.resolve()
              : new Promise(resolve => {
                  img.addEventListener('load', resolve, { once: true });
                  img.addEventListener('error', resolve, { once: true });
                })
          )
      ).then(() => {
        setTimeout(updateLine, 100);
      });
    }

    window.addEventListener('resize', updateLine, { passive: true });

    // ResizeObserver on main for layout changes
    const mainEl = document.querySelector('main');
    let ro: ResizeObserver | null = null;
    if (mainEl && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updateLine);
      ro.observe(mainEl);
    }

    // Single safety-net recalculation instead of 2-second polling
    const safetyTimeout = setTimeout(updateLine, 1000);

    return () => {
      window.removeEventListener('resize', updateLine);
      clearTimeout(safetyTimeout);
      ro?.disconnect();
    };
  }, []);

  return (
    <div
      className="bullet-connector-line"
      style={style}
    />
  );
}
