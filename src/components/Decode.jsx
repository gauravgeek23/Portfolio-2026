import { useEffect, useRef, useState } from 'react';

const GLYPHS = '01<>/{}[]=;:_+*#$&%';
const rand = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
const scramble = (text) => text.replace(/\S/g, rand);

// Text that first shows as scrambled code, then resolves, left to right, into the real words
// (`delay` ms after it's first on screen). Screen readers get the real text throughout; reduced
// motion shows it straight away.
export default function Decode({ text, delay = 0, duration = 900 }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(() => scramble(text));
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(text);
      setDone(true);
      return undefined;
    }
    let frame;
    let timer;
    let last = 0;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        // Re-roll the unresolved glyphs about 30 times a second.
        if (now - last > 33 || t === 1) {
          last = now;
          const fixed = Math.floor(t * text.length);
          setShown(text.slice(0, fixed) + scramble(text.slice(fixed)));
        }
        if (t < 1) frame = requestAnimationFrame(tick);
        else setDone(true);
      };
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      timer = setTimeout(run, delay);
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [text, delay, duration]);

  return (
    <span ref={ref} className={`decode${done ? ' is-done' : ''}`}>
      <span className="visually-hidden">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </span>
  );
}
