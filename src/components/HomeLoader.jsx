import { useEffect, useRef } from 'react';
import avatar from '../assets/avatar-156.webp';
import { images } from '../data/about-images';
import academicCalendar from '../assets/work/academic-calendar-800.webp';
import lottie from '../assets/work/lottiefiles-vision-pro-800.webp';
import toppr from '../assets/work/toppr-answr-800.webp';
import iconscout from '../assets/work/iconscout-plugin-800.webp';
import changLa from '../assets/book/chang-la-peek.webp';
import hampta from '../assets/book/hampta-pass-peek.webp';
import bali from '../assets/book/bali-kecak-peek.webp';
import './HomeLoader.css';

// Snapshots that fly into the book: travel photos and the work they sit beside on the site.
const PHOTOS = [
  images.altitude1.src,
  academicCalendar,
  images.kang1.src,
  lottie,
  changLa,
  images.ebc1.src,
  toppr,
  hampta,
  images.nomad1.src,
  iconscout,
  bali,
  images.photo10.src,
];

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

// First visit to the home page: the site's photos load, swirl around the screen and fly into
// a big copy of the hero's book, which then shrinks into its place at the top left. `target`
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
      // An oval ring around the book that fits the screen.
      const rx = Math.min(vw * 0.4, vh * 0.5);
      const ry = Math.min(vh * 0.34, vw * 0.45);

      // The book waits in the middle, breathing, while the photos load (at most ~2.5s).
      const breathe = book.current.animate([{ scale: BIG }, { scale: BIG * 1.04 }, { scale: BIG }], {
        duration: 1600,
        iterations: Infinity,
        easing: 'ease-in-out',
      });
      anims.push(breathe);
      await Promise.race([Promise.all(PHOTOS.map(load)), wait(2500)]);
      if (cancelled) return;

      // 1. Photos swirl in from beyond the edges to a ring around the book, spinning as they go.
      const n = PHOTOS.length;
      const ring = photos.current.map((el, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(a) * rx * (0.85 + (i % 3) * 0.12);
        const y = Math.sin(a) * ry * (0.85 + ((i + 1) % 3) * 0.12);
        const r = ((i * 47) % 50) - 25;
        const fromA = a + 0.9;
        const far = Math.hypot(vw, vh) * 0.65;
        play(
          el,
          [
            {
              translate: `${Math.cos(fromA) * far}px ${Math.sin(fromA) * far}px`,
              rotate: `${r - 220}deg`,
              scale: 0.6,
              opacity: 0,
            },
            { opacity: 1, offset: 0.25 },
            { translate: `${x}px ${y}px`, rotate: `${r}deg`, scale: 1, opacity: 1 },
          ],
          { duration: 1100, delay: i * 45, easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)' },
        );
        return { x, y, r };
      });
      await wait(1100 + n * 45 + 150);
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
              { translate: `${ring[i].x}px ${ring[i].y}px`, rotate: `${ring[i].r}deg`, scale: 1, opacity: 1 },
              { opacity: 1, offset: 0.75 },
              { translate: '18px 0px', rotate: `${ring[i].r + 160}deg`, scale: 0.15, opacity: 0 },
            ],
            { duration: 620, delay: 120 + i * 70, easing: 'cubic-bezier(0.55, 0, 0.75, 0.3)' },
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
