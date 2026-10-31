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

// "404" drawn in sparse dots, a shade off the background (big type doesn't need contrast). Like
// the footer's glow, it fades as a gradient: dots thin out and soften towards the bottom. It sits
// still; under the pointer the dots scatter away and spring back into place.
const PUSH_RADIUS = 80;

function DotNumber() {
  const canvas = useRef(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el.getContext('2d');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let dots = [];
    let size = { w: 0, h: 0 };
    let pointer = null;
    let frame = 0;

    const paint = () => {
      ctx.clearRect(0, 0, size.w, size.h);
      for (const d of dots) {
        ctx.globalAlpha = d.a;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const build = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      el.width = w * dpr;
      el.height = h * dpr;
      size = { w, h };

      // Rasterise the glyphs once to know which pixels are "ink".
      const mask = document.createElement('canvas');
      mask.width = w;
      mask.height = h;
      const m = mask.getContext('2d');
      // Digits nearly fill the canvas (their cap height is about 0.74 of the font size).
      const font = h * 1.2;
      m.font = `700 ${font}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
      m.textAlign = 'center';
      m.textBaseline = 'middle';
      m.fillText('404', w / 2, h / 2 + font * 0.065);
      const ink = m.getImageData(0, 0, w, h).data;

      dots = [];
      // Small canvases get proportionally more dots so the number still reads on phones.
      const tries = Math.round(w * h * (w < 500 ? 0.12 : 0.07));
      for (let i = 0; i < tries; i += 1) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        if (ink[(Math.floor(y) * w + Math.floor(x)) * 4 + 3] < 128) continue;
        // 1 at the top, 0 at the bottom: fewer, fainter dots lower down.
        const depth = 1 - y / h;
        if (Math.random() > 0.3 + depth * 0.6) continue;
        dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, r: 0.6 + Math.random() * 0.8, a: 0.55 + depth * 0.45 });
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = getComputedStyle(el).color;
      paint();
    };

    // Each dot is pushed away from the pointer and pulled home by a damped spring; the loop runs
    // only until everything has settled.
    const step = () => {
      let moving = false;
      for (const d of dots) {
        if (pointer) {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < PUSH_RADIUS) {
            const f = ((PUSH_RADIUS - dist) / PUSH_RADIUS) * 2.4;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
        }
        d.vx = (d.vx + (d.hx - d.x) * 0.045) * 0.86;
        d.vy = (d.vy + (d.hy - d.y) * 0.045) * 0.86;
        d.x += d.vx;
        d.y += d.vy;
        if (Math.abs(d.vx) + Math.abs(d.vy) > 0.02 || Math.abs(d.hx - d.x) + Math.abs(d.hy - d.y) > 0.1) moving = true;
      }
      paint();
      frame = moving || pointer ? requestAnimationFrame(step) : 0;
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
      wake();
    };
    const onLeave = () => {
      pointer = null;
      wake();
    };

    build();
    if (!still) {
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerleave', onLeave);
    }
    // Rebuild at the new size, or in the new colour when the theme changes.
    const resize = new ResizeObserver(build);
    resize.observe(el);
    const theme = new MutationObserver(build);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
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
