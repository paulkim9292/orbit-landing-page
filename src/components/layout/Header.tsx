import { Link, useLocation } from '@tanstack/react-router';

export function Header() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  return (
    <header className="header">
      <Link to={isAboutPage ? '/' : '/about'}>
        <button className="about-btn">
          {isAboutPage ? 'Home' : 'About Us'}
        </button>
      </Link>
    </header>
  );
}
