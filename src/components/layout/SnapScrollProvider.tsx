import { createContext, useContext, useCallback, type ReactNode } from 'react';

interface SnapScrollContextValue {
  scrollToPage: (pageId: string) => void;
}

const fallbackScrollToPage = (pageId: string) => {
  document.getElementById(pageId)?.scrollIntoView({ behavior: 'smooth' });
};

const SnapScrollContext = createContext<SnapScrollContextValue>({
  scrollToPage: fallbackScrollToPage,
});

export function useSnapScroll() {
  return useContext(SnapScrollContext);
}

export function SnapScrollProvider({ children }: { children: ReactNode }) {
  const scrollToPage = useCallback((pageId: string) => {
    document.getElementById(pageId)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <SnapScrollContext.Provider value={{ scrollToPage }}>
      {children}
    </SnapScrollContext.Provider>
  );
}
