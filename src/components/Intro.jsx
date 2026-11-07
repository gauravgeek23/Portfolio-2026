import { useCallback, useEffect, useRef, useState } from 'react';
import avatar from '../assets/avatar-156.webp';
import peekChangLa from '../assets/book/chang-la-peek.webp';
import peekHampta from '../assets/book/hampta-pass-peek.webp';
import peekBali from '../assets/book/bali-kecak-peek.webp';
import ProfileBook from './ProfileBook';
import { site } from '../data/site';
import { experience } from '../data/experience';
import './Intro.css';

// A company inside a sentence: a small tile with its icon (the same icons as the work experience
// list), then its name as plain text, linking to its site in a new tab when it has one (`href`).
const logoOf = (name) => experience.find((e) => e.company === name)?.logo;

// `label` is the text shown when it isn't just the company name (e.g. a product, "Toppr Answr");
// `strong` sets it in the heavier weight.
function Brand({ name, href, label = name, strong = false }) {
  // The tile stays on the line with the name's first word; the rest of a long name can wrap.
  const [first, ...rest] = label.split(' ');
  const inner = (
    <>
      <span className="intro__nowrap">
        <span className="intro__tile" aria-hidden="true">
          <img src={logoOf(name)} alt="" />
        </span>
        {first}
      </span>
      {rest.length > 0 && ` ${rest.join(' ')}`}
    </>
  );
  const className = `intro__brand${strong ? ' intro__brand--strong' : ''}`;
  if (!href) return <span className={className}>{inner}</span>;
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  );
}

// A figure in the intro. The first time it's on screen (after the landing loader) it counts up
// from zero, one figure after another (`i` is its turn), so the eye reads them in order.
// Reduced motion shows it finished.
function Metric({ value, i, ready }) {
  const [, prefix, digits, suffix] = value.match(/^([^\d]*)([\d.]+)(.*)$/);
  const target = parseFloat(digits);
  const decimals = (digits.split('.')[1] || '').length;
  const ref = useRef(null);
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!ready) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame;
    let timer;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / 900);
        setN(target * (1 - (1 - t) ** 3));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      setN(0);
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timer = setTimeout(run, 250 + i * 220);
      },
      { threshold: 0.6 },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [ready, i, target]);

  // The final value holds the width (and is what screen readers get), so counting never
  // shifts the line; the counting copy sits over it.
  return (
    <span ref={ref} className="intro__metric">
      <span className="intro__metric-final">{value}</span>
      <span className="intro__metric-count" aria-hidden="true">
        {prefix}
        {n.toFixed(decimals)}
        {suffix}
      </span>
    </span>
  );
}

// The small book's cover never lies flat: it rests a little open (Intro.css, .book__cover) and
// opens further while a snapshot peeks or on hover. The big book starts from the cover's angle
// at the click and closes to the resting one, so neither hand-over snaps.
const COVER_REST_DEG = -8;
function coverAngle(cover) {
  const t = getComputedStyle(cover).transform;
  if (!t || t === 'none') return 0;
  const m = new DOMMatrix(t);
  return (Math.atan2(-m.m13, m.m11) * 180) / Math.PI;
}

// The diary's year tabs: each opens the book at that year.
const YEARS = ['2026', '2025', '2024', '2023'];

// The home page hero: the story and the proof on the left, the diary on the right, inviting a look
// inside. No loader: the page opens straight onto this.
export default function Intro() {
  const [bookOpen, setBookOpen] = useState(false);
  // Where the small book sits, so the big one can grow out of it; while the big one is up the
  // small one is hidden (it "is" the big one).
  const [origin, setOrigin] = useState(null);
  const [coverFrom, setCoverFrom] = useState(COVER_REST_DEG);
  const [startAt, setStartAt] = useState(null);
  const bookRef = useRef(null);
  const openBook = useCallback((year = null) => {
    const book = bookRef.current;
    setStartAt(year);
    setOrigin(book.getBoundingClientRect());
    setCoverFrom(coverAngle(book.querySelector('.book__cover')));
    setBookOpen(true);
  }, []);

  return (
    <section className="intro" aria-labelledby="intro-title">
      <div className="intro__story">
        <p className="text-small text-muted intro__kicker">{site.name} · Senior Product Designer, Bangalore</p>
        <h1 className="intro__title" id="intro-title">
          I design products that grow businesses.{' '}
          <span className="intro__title-muted">Five years, four companies, and a lot of mountains in between.</span>
        </h1>

        {/* The proof: numbers from the work, each with where it happened, and one from the road. */}
        <ul className="intro__proof">
          <li>
            <span className="intro__figure">
              <Metric value="$45M+" i={0} ready />
            </span>
            <span className="intro__what">
              business I led growth design for at{' '}
              <Brand name="Newton School of Technology" href="https://www.newtonschool.co/" />
            </span>
          </li>
          <li>
            <span className="intro__figure">
              <Metric value="$200K" i={1} ready /> → <Metric value="$2.4M" i={2} ready />
            </span>
            <span className="intro__what">
              ARR for the <Brand name="LottieFiles" href="https://lottiefiles.com/" /> marketplace
            </span>
          </li>
          <li>
            <span className="intro__figure">
              <Metric value="1.2M+" i={3} ready />
            </span>
            <span className="intro__what">
              users on the <Brand name="IconScout" href="https://iconscout.com/" /> Figma plugin, #14 worldwide
            </span>
          </li>
          <li>
            <span className="intro__figure">5,200 km</span>
            <span className="intro__what">across Ladakh and Himachal, on my motorcycle</span>
          </li>
        </ul>

        <div className="intro__actions">
          <button type="button" className="intro__cta" onClick={() => openBook()}>
            Open my diary
          </button>
          <a className="intro__link" href="#work">
            See the work ↓
          </a>
        </div>
      </div>

      {/* The diary: the book, larger, with a tab for each year sticking out of its edge. */}
      <div className="intro__diary">
        <div className="intro__shelf">
          <div className="intro__avatar is-lit">
            {/* `is-away` while the big book is up: the small one's flap and peeks stop, so they start
              again from rest when it reappears, matching the closed big book. */}
            <button
              type="button"
              ref={bookRef}
              className={`intro__book${origin ? ' is-away' : ''}`}
              style={{ visibility: origin ? 'hidden' : undefined }}
              onClick={() => openBook()}
              aria-label={`Open ${site.name}'s diary`}
            >
              {/* Three pages under the cover; they fan out as it opens. */}
              <span className="book__page" style={{ '--i': 3 }} />
              <span className="book__page" style={{ '--i': 2 }} />
              <span className="book__page" style={{ '--i': 1 }} />
              {/* A few snapshots tucked inside; at rest they peek out of the edges one at a time. */}
              <span className="book__peek book__peek--top" style={{ '--d': '0s' }}>
                <img src={peekChangLa} alt="" />
              </span>
              <span className="book__peek book__peek--right" style={{ '--d': '2.5s' }}>
                <img src={peekHampta} alt="" />
              </span>
              <span className="book__peek book__peek--low" style={{ '--d': '5s' }}>
                <img src={peekBali} alt="" />
              </span>
              <span className="book__cover">
                <img src={avatar} alt={`Portrait of ${site.name}`} width="34" height="38" />
              </span>
            </button>
          </div>
          <ul className="intro__years" aria-label="Open the diary at a year">
            {YEARS.map((year) => (
              <li key={year}>
                <button type="button" onClick={() => openBook(year)}>
                  {year}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <p className="intro__note">my diary, a spread for every year</p>
        <ProfileBook
          open={bookOpen}
          origin={origin}
          startAt={startAt}
          coverFrom={bookOpen ? coverFrom : COVER_REST_DEG}
          onClose={() => setBookOpen(false)}
          onClosed={() => setOrigin(null)}
        />
      </div>
    </section>
  );
}
