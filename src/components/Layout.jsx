import { useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import { LightboxProvider } from './Lightbox';

// A full page load (first visit or refresh) always starts at the top, even from /#work.
let firstLoad = true;

// Shared shell for every tab: fixed nav on top, footer at the bottom.
export default function Layout() {
  const { pathname, hash, state } = useLocation();
  const navigate = useNavigate();
  const inPage = Boolean(state?.inPage);
  const glide = Boolean(state?.glide);

  // Every new page opens at the top (or at its #section), instantly and before it paints,
  // so it never shows the previous page's scroll position or glides up with smooth scrolling.
  // In-page jumps from the nav (gk. / work on the home page) scroll smoothly themselves,
  // so they're left alone here.
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    if (firstLoad) {
      firstLoad = false;
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      // Drop a leftover #section (e.g. from scrolling to Selected work) so the page stays at the top.
      if (hash) navigate(pathname, { replace: true });
      return;
    }
    if (inPage) return;
    const target = hash && document.getElementById(hash.slice(1));
    if (!target) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return undefined;
    }
    // `glide` (the /contact link): open the page at the top, then scroll down to the target in view
    // of the visitor, and once more after it lands in case images above it loaded and moved it.
    // Any wheel, touch or key from the visitor stops it. Reduced motion jumps straight there.
    if (glide && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      const go = () => target.scrollIntoView({ behavior: 'smooth' });
      const timers = [setTimeout(go, 600), setTimeout(go, 2000)];
      const stop = () => timers.forEach(clearTimeout);
      const events = ['wheel', 'touchstart', 'keydown'];
      events.forEach((e) => window.addEventListener(e, stop, { once: true, passive: true }));
      return () => {
        stop();
        events.forEach((e) => window.removeEventListener(e, stop));
      };
    }
    target.scrollIntoView({ behavior: 'instant' });
    // Images above the target can load after the jump and push it down, so follow it for a
    // moment, until the visitor scrolls themselves.
    let last = window.scrollY;
    const follow = () => {
      if (Math.abs(window.scrollY - last) > 2) return;
      target.scrollIntoView({ behavior: 'instant' });
      last = window.scrollY;
    };
    const timers = [150, 400, 900, 1600].map((ms) => setTimeout(follow, ms));
    return () => timers.forEach(clearTimeout);
  }, [pathname, hash, inPage, glide, navigate]);

  return (
    <LightboxProvider>
      <Nav />
      <Outlet />
      <Footer />
    </LightboxProvider>
  );
}
