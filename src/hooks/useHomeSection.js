import { useEffect, useState } from 'react';

// Which part of the home page is being read: 'home' (the intro, above Selected work), 'work', or
// 'play' once that section's heading has scrolled up into the top part of the screen. Drives which
// tab the navigation marks as current.
export default function useHomeSection(enabled) {
  const [section, setSection] = useState('home');

  useEffect(() => {
    if (!enabled) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const threshold = Math.min(window.innerHeight / 2, 360);
      const above = (id) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top <= threshold : false;
      };
      // Play sits below work; once it's up, it's the one being read, until the next section takes over.
      const play = document.getElementById('play');
      const after = document.getElementById('experience');
      if (play && above('play') && !(after && above('experience'))) setSection('play');
      else setSection(above('work') ? 'work' : 'home');
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled]);

  return section;
}

// Glide to a section of the home page (or jump, for reduced motion).
export function scrollToSection(id) {
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  document.getElementById(id)?.scrollIntoView({ behavior });
}
