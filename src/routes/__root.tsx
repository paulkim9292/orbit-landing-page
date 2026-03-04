import { useEffect } from 'react';
import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router';
import { ParallaxCircles, Header, ScrollToTopButton } from '../components/layout';

function RootComponent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <ParallaxCircles />
      <Outlet />
      <ScrollToTopButton />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
