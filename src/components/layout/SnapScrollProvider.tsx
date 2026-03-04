import { createContext, useContext, useCallback, type ReactNode } from 'react';

interface SnapScrollContextValue {
  scrollToPage: (pageId: string) => void;
}

const fallbackScrollToPage = (pageId: string) => {
  const el = document.getElementById(pageId);
  if (!el) return;

  const html = document.documentElement;
  html.style.scrollSnapType = 'none';
  el.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    html.style.scrollSnapType = '';
  }, 1000);
};

const SnapScrollContext = createContext<SnapScrollContextValue>({
  scrollToPage: fallbackScrollToPage,
});

export function useSnapScroll() {
  return useContext(SnapScrollContext);
}

export function SnapScrollProvider({ children }: { children: ReactNode }) {
  const scrollToPage = useCallback((pageId: string) => {
    const el = document.getElementById(pageId);
    if (!el) return;

    const html = document.documentElement;
    html.style.scrollSnapType = 'none';
    el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      html.style.scrollSnapType = '';
    }, 1000);
  }, []);

  return (
    <SnapScrollContext.Provider value={{ scrollToPage }}>
      {children}
    </SnapScrollContext.Provider>
  );
}
