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

      // 1-2. One continuous flight per photo: each drifts in from a different side of the screen
      //      at its own moment, floats on a soft curve with a gentle tilt and flutter, and glides
      //      straight into the book. The cover opens before the first arrives and closes after
      //      the last.
      breathe.cancel();
      book.current.style.scale = String(BIG);
      const FLIGHT = 2300;
      const SPREAD = 1900; // first to last departure
      const n = PHOTOS.length;
      const flights = photos.current.map((el, i) => {
        const side = i % 4; // top, right, bottom, left, in turn
        const along = rnd(i, 1) - 0.5;
        const pad = 140;
        const [sx, sy] = [
          [along * vw, -vh / 2 - pad],
          [vw / 2 + pad, along * vh],
          [along * vw, vh / 2 + pad],
          [-vw / 2 - pad, along * vh],
        ][side];
        // A sideways bow in the path, like the wind carrying it.
        const len = Math.hypot(sx, sy);
        const bow = (rnd(i, 2) > 0.5 ? 1 : -1) * (0.18 + rnd(i, 3) * 0.16) * len;
        const px = -sy / len;
        const py = sx / len;
        const at = (t, b) => [sx * (1 - t) + px * b, sy * (1 - t) + py * b];
        const [mx, my] = at(0.45, bow);
        const [nx, ny] = at(0.8, bow * 0.35);
        const r = (rnd(i, 4) - 0.5) * 40;
        const flip = (rnd(i, 5) - 0.5) * 50;
        const delay = (i / (n - 1)) * SPREAD + (rnd(i, 6) - 0.5) * 220;
        const flight = play(
          el,
          [
            {
              offset: 0,
              translate: `${sx}px ${sy}px`,
              rotate: `${r}deg`,
              transform: 'rotateX(0deg) rotateY(0deg)',
              scale: 0.85,
              opacity: 0,
            },
            { offset: 0.1, opacity: 1 },
            {
              offset: 0.45,
              translate: `${mx}px ${my}px`,
              rotate: `${-r * 0.5}deg`,
              transform: `rotateX(${flip}deg) rotateY(${-flip * 0.6}deg)`,
              scale: 1,
            },
            {
              offset: 0.8,
              translate: `${nx}px ${ny}px`,
              rotate: `${r * 0.3}deg`,
              transform: `rotateX(${-flip * 0.4}deg) rotateY(${flip * 0.3}deg)`,
              scale: 0.75,
              opacity: 1,
            },
            {
              offset: 1,
              translate: '18px 0px',
              rotate: '0deg',
              transform: 'rotateX(0deg) rotateY(0deg)',
              scale: 0.15,
              opacity: 0,
            },
          ],
          { duration: FLIGHT, delay, easing: 'cubic-bezier(0.37, 0, 0.63, 1)' },
        );
        return { delay, flight };
      });
      const first = Math.min(...flights.map((f) => f.delay));
      const last = Math.max(...flights.map((f) => f.delay));
      play(cover.current, [{ transform: 'rotateY(-8deg)' }, { transform: 'rotateY(-36deg)' }], {
        duration: 500,
        delay: first + FLIGHT * 0.6,
        easing: EASE,
      });
      await Promise.all(flights.map((f) => f.flight));
      if (cancelled) return;
      await play(cover.current, [{ transform: 'rotateY(-36deg)' }, { transform: 'rotateY(-8deg)' }], {
        duration: 420,
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
