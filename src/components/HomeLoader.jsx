import { useEffect, useRef } from 'react';
import avatar from '../assets/avatar-156.webp';
import { images } from '../data/about-images';
import './HomeLoader.css';

// Travel prints that gather into the book, in the order they appear around it.
const PHOTOS = [
  images.altitude1.src,
  images.kang2.src,
  images.photo3.src,
  images.ebc2.src,
  images.nomad1.src,
  images.photo10.src,
  images.altitude3.src,
  images.photo9.src,
  images.ebc1.src,
  images.photo1.src,
];

// A repeatable pseudo-random number in [0, 1) for photo i, so every run looks the same.
const rnd = (i, k) => {
  const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

// The book's size in the middle of the screen, relative to the hero's book (smaller on phones).
const bigScale = () => (window.innerWidth < 640 ? 2 : 2.6);
const OUT = 'cubic-bezier(0.16, 1, 0.3, 1)'; // expo out: arrives softly
const IN = 'cubic-bezier(0.55, 0, 0.8, 0.2)'; // accelerates, like being drawn in
const IN_OUT = 'cubic-bezier(0.65, 0, 0.35, 1)';

const load = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = img.onerror = resolve;
    img.src = src;
  });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Landing on the home page: "gathering memories". Travel prints bloom into a ring around a big
// copy of the hero's book, floating gently; the cover opens and they swirl into it; the book
// closes with a little gulp and settles into its place at the top left. `target` returns the
// hero book's element; `onDone` reveals the real one.
export default function HomeLoader({ target, onDone }) {
  const root = useRef(null);
  const book = useRef(null);
  const cover = useRef(null);
  const note = useRef(null);
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
      const n = PHOTOS.length;

      // 0. The book arrives in the middle and the note fades in while the prints load.
      play(
        book.current,
        [
          { scale: BIG * 0.9, opacity: 0 },
          { scale: BIG, opacity: 1 },
        ],
        {
          duration: 600,
          easing: OUT,
        },
      );
      play(note.current, [{ opacity: 0 }, { opacity: 1 }], {
        duration: 500,
        delay: 250,
        easing: OUT,
      });
      await Promise.race([Promise.all(PHOTOS.map(load)), wait(2500)]);
      await wait(300);
      if (cancelled) return;

      // 1. Bloom: the prints appear one after another around a ring about the book, out of a
      //    soft blur, at slightly different depths, and keep floating where they land.
      const rx = Math.min(vw * 0.37, 500);
      const ry = Math.min(vh * 0.36, 330);
      const slots = photos.current.map((el, i) => {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2;
        const reach = i % 2 ? 0.92 : 1.04;
        const x = Math.cos(a) * rx * reach;
        const y = Math.sin(a) * ry * reach;
        const r = (rnd(i, 3) - 0.5) * 14;
        const depth = i % 3 === 1 ? 0.84 : 1; // a few sit further back
        play(
          el,
          [
            {
              translate: `${x * 1.15}px ${y * 1.15}px`,
              rotate: `${r * 2}deg`,
              scale: depth * 0.85,
              opacity: 0,
              filter: 'blur(10px)',
            },
            {
              translate: `${x}px ${y}px`,
              rotate: `${r}deg`,
              scale: depth,
              opacity: 1,
              filter: depth === 1 ? 'blur(0px)' : 'blur(0.6px)',
            },
          ],
          { duration: 900, delay: i * 110, easing: OUT },
        );
        // A slow float of its own, on the inner element.
        const drift = 6 + rnd(i, 4) * 6;
        anims.push(
          el.firstChild.animate(
            [
              { transform: 'translate(0, 0)' },
              { transform: `translate(${drift * 0.5}px, ${-drift}px)` },
              { transform: 'translate(0, 0)' },
            ],
            { duration: 2600 + rnd(i, 5) * 1200, iterations: Infinity, easing: 'ease-in-out' },
          ),
        );
        return { x, y, r, depth, a };
      });
      await wait(900 + (n - 1) * 110 + 450);
      if (cancelled) return;

      // 2. Gather: the cover opens and the prints swirl into the book, one after another around
      //    the ring, speeding up as they enter.
      play(cover.current, [{ transform: 'rotateY(-8deg)' }, { transform: 'rotateY(-40deg)' }], {
        duration: 450,
        easing: OUT,
      });
      play(note.current, [{ opacity: 1 }, { opacity: 0 }], { duration: 400, easing: 'ease' });
      await Promise.all(
        photos.current.map((el, i) => {
          const { x, y, r, depth, a } = slots[i];
          // Halfway in, each print has swung a little further round the book.
          const ma = a + 0.6;
          return play(
            el,
            [
              { translate: `${x}px ${y}px`, rotate: `${r}deg`, scale: depth, opacity: 1, filter: 'blur(0px)' },
              {
                offset: 0.55,
                translate: `${Math.cos(ma) * rx * 0.45}px ${Math.sin(ma) * ry * 0.45}px`,
                rotate: `${r * 0.4}deg`,
                scale: 0.6,
                opacity: 1,
              },
              { translate: '16px 0px', rotate: '0deg', scale: 0.12, opacity: 0, filter: 'blur(0px)' },
            ],
            { duration: 820, delay: i * 85, easing: IN },
          );
        }),
      );
      if (cancelled) return;

      // The book swallows them: the cover closes with a bounce and the book gives a small gulp.
      play(cover.current, [{ transform: 'rotateY(-40deg)' }, { transform: 'rotateY(-8deg)' }], {
        duration: 500,
        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      });
      await play(book.current, [{ scale: BIG }, { scale: BIG * 1.06 }, { scale: BIG }], {
        duration: 500,
        easing: 'ease-in-out',
      });
      await wait(150);
      if (cancelled) return;

      // 3. The book settles into the hero's spot while the screen behind it clears.
      const box = book.current.getBoundingClientRect();
      const to = target()?.getBoundingClientRect();
      if (to) {
        const dx = to.left + to.width / 2 - (box.left + box.width / 2);
        const dy = to.top + to.height / 2 - (box.top + box.height / 2);
        play(
          root.current,
          [{ backgroundColor: getComputedStyle(root.current).backgroundColor }, { backgroundColor: 'transparent' }],
          { duration: 800, delay: 200, easing: 'ease' },
        );
        await play(
          book.current,
          [
            { translate: '0px 0px', scale: BIG },
            { translate: `${dx}px ${dy}px`, scale: 1 },
          ],
          { duration: 1000, easing: IN_OUT },
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
          <span className="home-loader__print">
            <img src={src} alt="" />
          </span>
        </span>
      ))}
      <div ref={book} className="home-loader__book" style={{ scale: bigScale(), opacity: 0 }}>
        <span className="book__page" style={{ '--i': 3 }} />
        <span className="book__page" style={{ '--i': 2 }} />
        <span className="book__page" style={{ '--i': 1 }} />
        <span ref={cover} className="book__cover">
          <img src={avatar} alt="" width="34" height="38" />
        </span>
      </div>
      <p ref={note} className="home-loader__note" style={{ '--big': bigScale() }}>
        gathering memories…
      </p>
    </div>
  );
}
