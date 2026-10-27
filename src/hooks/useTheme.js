import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';
const query = '(prefers-color-scheme: dark)';

function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

// Light/dark theme on <html data-theme>. index.html sets it before first paint
// (saved choice, else the system setting); this keeps React in sync and follows
// system changes until the visitor picks a theme themselves.
export function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = (e) => {
      if (!readStored()) setTheme(e.matches ? 'dark' : 'light');
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

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
