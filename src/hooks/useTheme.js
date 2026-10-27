import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const STORAGE_KEY = 'theme';

// Slow, fluid ease-in-out for the circle reveal (no overshoot).
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
const DURATION = 1400;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Light/dark theme on <html data-theme>. Every visit opens light; a dark choice is
// kept for the current visit only (sessionStorage), restored before first paint by
// index.html. This keeps React in sync.
//
// Switching animates as a circle from the toggle: going dark, the dark page grows
// out of the icon to fill the screen; going light, the dark page shrinks back into
// it. Uses the View Transitions API where available.
export function useTheme() {
  const [theme, setTheme] = useState(() => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(
    (event) => {
      const next = theme === 'dark' ? 'light' : 'dark';
      const apply = () => {
        document.documentElement.dataset.theme = next;
        flushSync(() => setTheme(next));
      };
      try {
        sessionStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage unavailable: the choice lasts until the page is reloaded.
      }

      if (!document.startViewTransition || prefersReducedMotion()) {
        apply();
        return;
      }

      // Circle centre: the toggle (or the click point), radius: to the farthest corner.
      const rect = event?.currentTarget?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
      const y = rect ? rect.top + rect.height / 2 : 30;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const root = document.documentElement;
      const expand = next === 'dark';

      root.classList.add(expand ? 'theme-expand' : 'theme-contract');
      const transition = document.startViewTransition(apply);
      // fill: 'forwards' holds the last frame until the transition ends; without it
      // the old (dark) snapshot pops back to full screen for a frame going light.
      transition.ready.then(() => {
        const full = `circle(${radius}px at ${x}px ${y}px)`;
        const none = `circle(0px at ${x}px ${y}px)`;
        if (expand) {
          root.animate(
            { clipPath: [none, full] },
            { duration: DURATION, easing: EASE, fill: 'forwards', pseudoElement: '::view-transition-new(root)' },
          );
        } else {
          root.animate(
            { clipPath: [full, none] },
            { duration: DURATION, easing: EASE, fill: 'forwards', pseudoElement: '::view-transition-old(root)' },
          );
        }
      });
      transition.finished.finally(() => root.classList.remove('theme-expand', 'theme-contract'));
    },
    [theme],
  );

  return [theme, toggle];
}
