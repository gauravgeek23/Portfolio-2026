import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

// Light/dark theme on <html data-theme>. The site is light by default; index.html
// applies a saved "dark" choice before first paint, and this keeps React in sync.
export function useTheme() {
  const [theme, setTheme] = useState(() => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage unavailable (private mode): the choice lasts for this visit.
      }
      return next;
    });
  }, []);

  return [theme, toggle];
}
