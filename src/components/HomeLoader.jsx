import { useEffect, useRef } from 'react';
import avatar from '../assets/avatar-156.webp';
import { images } from '../data/about-images';
import './HomeLoader.css';

// Travel photos that blow around on the wind before settling into the book.
const PHOTOS = [
  images.altitude1.src,
  images.kang2.src,
  images.photo3.src,
  images.ebc1.src,
  images.nomad1.src,
  images.photo10.src,
  images.altitude2.src,
  images.kang3.src,
  images.photo1.src,
  images.ebc2.src,
  images.nomad2.src,
  images.photo8.src,
  images.altitude3.src,
  images.photo5.src,
];

// A repeatable pseudo-random number in [0, 1) for photo i, so every run looks the same.
const rnd = (i, k) => {
  const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

// The book's size in the middle of the screen, relative to the hero's book (smaller on phones).
const bigScale = () => (window.innerWidth < 640 ? 2 : 2.6);
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';

const load = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = resolve;
    img.src = src;
  });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// First visit to the home page: travel photos load, blow around the screen on the wind and fly
// into a big copy of the hero's book, which then shrinks into its place at the top left. `target`
// returns the hero book's element; `onDone` reveals the real one.
export default function HomeLoader({ target, onDone }) {
  const root = useRef(null);
  const book = useRef(null);
  const cover = useRef(null);
  const photos = useRef([]);

  useEffect(() => {
    let cancelled = false;
    const anims = [];
    const play = (el, frames, opts) => {
      const a = el.animate(frames, { fill: 'forwards', ...opts });
      anims.push(a);
      return a.finished.catch(() => {});
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    (async () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const BIG = bigScale();

      // The book waits in the middle, breathing, while the photos load (at most ~2.5s).
      const breathe = book.current.animate([{ scale: BIG }, { scale: BIG * 1.04 }, { scale: BIG }], {
        duration: 1600,
        iterations: Infinity,
        easing: 'ease-in-out',
      });
      anims.push(breathe);
      await Promise.race([Promise.all(PHOTOS.map(load)), wait(2500)]);
      if (cancelled) return;

      // 1. The photos ride the wind: each blows in from the left, drifting across the screen on a
      //    wavy path, tumbling and flipping like paper, and comes to rest somewhere on screen.
      const n = PHOTOS.length;
      const DRIFT = 2400;
      const rest = photos.current.map((el, i) => {
        // Rest somewhere on screen, but clear of the book in the middle.
        let x = (rnd(i, 1) - 0.5) * vw * 0.84;
        const clear = 120 * BIG * 0.6;
        if (Math.abs(x) < clear) x = (x < 0 ? -1 : 1) * (clear + rnd(i, 8) * 60);
        // ...and fully on screen.
        const edge = vw / 2 - Math.min(120, Math.max(64, vw * 0.09)) / 2 - 8;
        x = Math.max(-edge, Math.min(edge, x));
        const y = (rnd(i, 2) - 0.5) * vh * 0.75;
        const r = (rnd(i, 3) - 0.5) * 50;
        const startY = (rnd(i, 4) - 0.5) * vh * 0.9;
        const startX = -vw / 2 - 140;
        const lift = (rnd(i, 5) - 0.5) * vh * 0.35;
        const frames = [0, 0.25, 0.5, 0.75, 1].map((t) => {
          const wave = Math.sin(t * Math.PI * 2.5 + i) * (1 - t) * 70;
          return {
            offset: t,
            translate: `${startX + (x - startX) * (1 - (1 - t) ** 2)}px ${startY + (y - startY) * t + lift * Math.sin(t * Math.PI) + wave}px`,
            rotate: `${r + (1 - t) * (rnd(i, 6) > 0.5 ? 1 : -1) * 540}deg`,
            transform: `rotateX(${(1 - t) * 70 * Math.sin(t * 9 + i)}deg) rotateY(${(1 - t) * 60 * Math.cos(t * 7 + i)}deg)`,
            opacity: t === 0 ? 0 : 1,
          };
        });
        play(el, frames, { duration: DRIFT, delay: rnd(i, 7) * 700, easing: 'cubic-bezier(0.25, 0.6, 0.3, 1)' });
        return { x, y, r };
      });
      await wait(DRIFT + 450);
      if (cancelled) return;

      // 2. The cover opens a little and the photos dive into the book, one after another.
      breathe.cancel();
      book.current.style.scale = String(BIG);
      play(cover.current, [{ transform: 'rotateY(-8deg)' }, { transform: 'rotateY(-38deg)' }], {
        duration: 350,
        easing: EASE,
      });
      await Promise.all(
        photos.current.map((el, i) =>
          play(
            el,
            [
              { translate: `${rest[i].x}px ${rest[i].y}px`, rotate: `${rest[i].r}deg`, scale: 1, opacity: 1 },
              { opacity: 1, offset: 0.75 },
              { translate: '18px 0px', rotate: `${rest[i].r + 200}deg`, scale: 0.15, opacity: 0 },
            ],
            { duration: 650, delay: 120 + i * 55, easing: 'cubic-bezier(0.55, 0, 0.75, 0.3)' },
          ),
        ),
      );
      if (cancelled) return;
      await play(cover.current, [{ transform: 'rotateY(-38deg)' }, { transform: 'rotateY(-8deg)' }], {
        duration: 380,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      });
      if (cancelled) return;

      // 3. The book shrinks into the hero's spot while the screen behind it clears.
      const box = book.current.getBoundingClientRect();
      const to = target()?.getBoundingClientRect();
      if (to) {
        const cx = box.left + box.width / 2;
        const cy = box.top + box.height / 2;
        const dx = to.left + to.width / 2 - cx;
        const dy = to.top + to.height / 2 - cy;
        play(
          root.current,
          [{ backgroundColor: getComputedStyle(root.current).backgroundColor }, { backgroundColor: 'transparent' }],
          {
            duration: 700,
            delay: 250,
            easing: 'ease',
          },
        );
        await play(
          book.current,
          [
            { translate: '0px 0px', scale: BIG },
            { translate: `${dx}px ${dy}px`, scale: 1 },
          ],
          { duration: 900, easing: EASE },
        );
      }
      if (!cancelled) onDone();
    })();

    return () => {
      cancelled = true;
      anims.forEach((a) => a.cancel());
      document.body.style.overflow = overflow;
    };
  }, [target, onDone]);

  return (
    <div ref={root} className="home-loader" aria-hidden="true">
      {PHOTOS.map((src, i) => (
        <span key={src} ref={(el) => (photos.current[i] = el)} className="home-loader__photo">
          <img src={src} alt="" />
        </span>
      ))}
      <div ref={book} className="home-loader__book" style={{ scale: bigScale() }}>
        <span className="book__page" style={{ '--i': 3 }} />
        <span className="book__page" style={{ '--i': 2 }} />
        <span className="book__page" style={{ '--i': 1 }} />
        <span ref={cover} className="book__cover">
          <img src={avatar} alt="" width="34" height="38" />
        </span>
      </div>
    </div>
  );
}
