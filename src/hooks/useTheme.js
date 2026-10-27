import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const STORAGE_KEY = 'theme';
const COLOUR_KEY = 'theme-colour';
// The toggle goes light -> dark -> a colour theme -> light ..., and the colour theme
// rotates each time round: red, then blue, green, yellow.
export const COLOURS = ['red', 'blue', 'green', 'yellow'];
export const THEMES = ['light', 'dark', ...COLOURS];

// Bright swatch of each colour theme for the toggle icon (it only shows on the dark
// theme, where the deep theme colours would barely read).
export const COLOUR_SWATCH = { red: '#e5383b', blue: '#4c7dff', green: '#2fbf71', yellow: '#f6c333' };

function readColourIndex() {
  try {
    const i = Number(sessionStorage.getItem(COLOUR_KEY));
    return Number.isInteger(i) && i >= 0 && i < COLOURS.length ? i : 0;
  } catch {
    return 0;
  }
}

// Slow, fluid ease-in-out for the circle reveal (no overshoot).
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
const DURATION = 1400;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Light / dark / colour theme on <html data-theme>. Every visit opens light; the choice is
// kept for the current visit only (sessionStorage), restored before first paint by
// index.html. This keeps React in sync.
//
// Switching animates as a circle from the toggle: into dark or a colour, the new page grows
// out of the icon to fill the screen; back to light, the coloured page shrinks into it.
// Uses the View Transitions API where available.
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    THEMES.includes(document.documentElement.dataset.theme) ? document.documentElement.dataset.theme : 'light',
  );

  // Which colour theme comes after dark this time round.
  const [colourIndex, setColourIndex] = useState(readColourIndex);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(
    (event) => {
      let next = 'light';
      let nextColourIndex = colourIndex;
      if (theme === 'light') next = 'dark';
      else if (theme === 'dark') next = COLOURS[colourIndex];
      else nextColourIndex = (colourIndex + 1) % COLOURS.length; // leaving a colour: line up the next one

      const apply = () => {
        document.documentElement.dataset.theme = next;
        flushSync(() => {
          setTheme(next);
          setColourIndex(nextColourIndex);
        });
      };
      try {
        sessionStorage.setItem(STORAGE_KEY, next);
        sessionStorage.setItem(COLOUR_KEY, String(nextColourIndex));
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
      // Into dark or a colour the new page grows out of the icon; back to light the
      // coloured page shrinks into it.
      const expand = next !== 'light';

      root.classList.add(expand ? 'theme-expand' : 'theme-contract');
      const transition = document.startViewTransition(apply);
      // fill: 'forwards' holds the last frame until the transition ends (otherwise the
      // old snapshot pops back to full screen for a frame going light). The held
      // animation is cancelled once the transition finishes, so it can't leak into
      // the next switch.
      let animation;
      transition.ready.then(() => {
        const full = `circle(${radius}px at ${x}px ${y}px)`;
        const none = `circle(0px at ${x}px ${y}px)`;
        animation = expand
          ? root.animate(
              { clipPath: [none, full] },
              { duration: DURATION, easing: EASE, fill: 'forwards', pseudoElement: '::view-transition-new(root)' },
            )
          : root.animate(
              { clipPath: [full, none] },
              { duration: DURATION, easing: EASE, fill: 'forwards', pseudoElement: '::view-transition-old(root)' },
            );
      });
      transition.finished.finally(() => {
        animation?.cancel();
        root.classList.remove('theme-expand', 'theme-contract');
      });
    },
    [theme, colourIndex],
  );

  return [theme, toggle, COLOURS[colourIndex]];
}
