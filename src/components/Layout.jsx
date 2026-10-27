import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import { LightboxProvider } from './Lightbox';

// Shared shell for every tab: fixed nav on top, footer at the bottom.
export default function Layout() {
  const { pathname, hash } = useLocation();

  // Every new page opens at the top (or at its #section), instantly and before it paints,
  // so it never shows the previous page's scroll position or glides up with smooth scrolling.
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    const target = hash && document.getElementById(hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return (
    <LightboxProvider>
      <Nav />
      <Outlet />
      <Footer />
    </LightboxProvider>
  );
}
