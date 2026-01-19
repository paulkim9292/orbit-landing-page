import { Outlet, createRootRoute } from '@tanstack/react-router';
import { ParallaxCircles, Header, ScrollToTopButton } from '../components/layout';

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <ParallaxCircles />
      <Outlet />
      <ScrollToTopButton />
    </>
  ),
});
