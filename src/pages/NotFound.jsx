import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import './NotFound.css';

// A different line on every visit: growth, economics and moving on.
const THOUGHTS = [
  ['Someone’s sitting in the shade today because someone planted a tree a long time ago.', 'Warren Buffett'],
  ['Price is what you pay. Value is what you get.', 'Warren Buffett'],
  ['Productivity isn’t everything, but in the long run it is almost everything.', 'Paul Krugman'],
  ['Play long-term games with long-term people.', 'Naval Ravikant'],
  ['If you are not embarrassed by the first version of your product, you’ve launched too late.', 'Reid Hoffman'],
  ['The biggest risk is not taking any risk.', 'Mark Zuckerberg'],
  ['Your most unhappy customers are your greatest source of learning.', 'Bill Gates'],
  ['A ship in harbour is safe, but that is not what ships are built for.', 'John A. Shedd'],
  ['The four most dangerous words in investing are: this time it’s different.', 'Sir John Templeton'],
  ['Stay hungry. Stay foolish.', 'Steve Jobs'],
];

// "404" drawn in fine dots, sampled from the glyphs at random so it reads as grain rather than a
// grid. The dots are a shade off the background (big type doesn't need contrast) and fade in.
function DotNumber() {
  const canvas = useRef(null);

  useEffect(() => {
    const el = canvas.current;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame;

    const draw = () => {
      cancelAnimationFrame(frame);
      const w = el.clientWidth;
      const h = el.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      el.width = w * dpr;
      el.height = h * dpr;

      // Rasterise the glyphs once to know which pixels are "ink".
      const mask = document.createElement('canvas');
      mask.width = w;
      mask.height = h;
      const m = mask.getContext('2d');
      m.font = `700 ${h * 1.05}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
      m.textAlign = 'center';
      m.textBaseline = 'middle';
      m.fillText('404', w / 2, h * 0.54);
      const ink = m.getImageData(0, 0, w, h).data;

      const dots = [];
      const count = Math.round(w * h * 0.06);
      for (let i = 0; i < count * 4 && dots.length < count; i += 1) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        if (ink[(Math.floor(y) * w + Math.floor(x)) * 4 + 3] > 128) {
          dots.push([x, y, 0.5 + Math.random() * 1.1, Math.random()]);
        }
      }

      const colour = getComputedStyle(el).color;
      const ctx = el.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = colour;
      const start = performance.now();
      const paint = (now) => {
        const t = still ? 1 : Math.min(1, (now - start) / 1400);
        ctx.clearRect(0, 0, w, h);
        for (const [x, y, r, at] of dots) {
          // Each dot fades in at its own moment, so the number gathers out of the grain.
          const a = Math.max(0, Math.min(1, (t - at * 0.7) / 0.3));
          if (!a) continue;
          ctx.globalAlpha = a;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
        if (t < 1) frame = requestAnimationFrame(paint);
      };
      frame = requestAnimationFrame(paint);
    };

    draw();
    // Redraw at the new size, or in the new colour when the theme changes.
    const resize = new ResizeObserver(draw);
    resize.observe(el);
    const theme = new MutationObserver(draw);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      theme.disconnect();
    };
  }, []);

  return <canvas ref={canvas} className="not-found__number" aria-hidden="true" />;
}

export default function NotFound() {
  usePageMeta({ title: 'Page not found', noindex: true });
  const [[quote, author]] = useState(() => THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)]);

  return (
    <main className="container page not-found">
      <h1 className="visually-hidden">Page not found (404)</h1>
      <DotNumber />
      <figure className="not-found__thought">
        <blockquote className="text-medium">“{quote}”</blockquote>
        <figcaption className="text-small text-muted">{author}</figcaption>
      </figure>
      <p className="text-small text-muted">
        This page doesn’t exist. <Link to="/">Back home</Link>
      </p>
    </main>
  );
}
