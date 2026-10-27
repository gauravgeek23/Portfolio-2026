import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';

// Shared shell for every tab: fixed nav on top, footer at the bottom.
export default function Layout() {
  const { pathname, hash } = useLocation();

  // Start each new page at the top, unless the link points at a section (#work).
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
