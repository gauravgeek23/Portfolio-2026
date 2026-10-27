import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

// Light/dark theme on <html data-theme>. Every visit opens light; a dark choice is
// kept for the current visit only (sessionStorage), restored before first paint by
// index.html. This keeps React in sync.
export function useTheme() {
  const [theme, setTheme] = useState(() => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        sessionStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage unavailable: the choice lasts until the page is reloaded.
      }
      return next;
    });
  }, []);

  return [theme, toggle];
}
