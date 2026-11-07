import { useCallback, useEffect, useRef, useState } from 'react';
import avatar from '../assets/avatar-156.webp';
import peekChangLa from '../assets/book/chang-la-peek.webp';
import peekHampta from '../assets/book/hampta-pass-peek.webp';
import peekBali from '../assets/book/bali-kecak-peek.webp';
import ProfileBook from './ProfileBook';
import HomeLoader from './HomeLoader';
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

// Whether this page load started on the home page (the preview bundle always starts there), and
// whether the loader has already played since. Both reset on every full page load.
const landedOnHome = import.meta.env.VITE_PREVIEW_BUNDLE || window.location.pathname === import.meta.env.BASE_URL;
let loaderPlayed = false;

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

export default function Intro() {
  const [bookOpen, setBookOpen] = useState(false);
  // Where the small book sits, so the big one can grow out of it; while the big one is up the
  // small one is hidden (it "is" the big one).
  const [origin, setOrigin] = useState(null);
  const [coverFrom, setCoverFrom] = useState(COVER_REST_DEG);
  // The landing loader plays on every fresh load of the home page (refreshes included), but not
  // when arriving from another page of the site, nor for visitors who prefer reduced motion.
  const [loading, setLoading] = useState(
    () => !loaderPlayed && landedOnHome && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const bookRef = useRef(null);
  const target = useCallback(() => bookRef.current, []);
  const loaded = useCallback(() => {
    loaderPlayed = true;
    setLoading(false);
  }, []);
  return (
    <section className="intro">
      {/* Profile photo on a little passport-style book (after Airbnb's host profile) that opens a
          little on hover; clicking it opens the full book in a popup. */}
      {/* The glow behind the book lights up once the book is in place (after the loader). */}
      <div className={`intro__avatar${loading ? '' : ' is-lit'}`}>
        {/* `is-away` while the big book is up: the small one's flap and peeks stop, so they start
            again from rest when it reappears, matching the closed big book. */}
        <button
          type="button"
          ref={bookRef}
          className={`intro__book${origin ? ' is-away' : ''}`}
          style={{ visibility: origin || loading ? 'hidden' : undefined }}
          onClick={(e) => {
            setOrigin(e.currentTarget.getBoundingClientRect());
            setCoverFrom(coverAngle(e.currentTarget.querySelector('.book__cover')));
            setBookOpen(true);
          }}
          aria-label={`Open ${site.name}'s book`}
        >
          {/* Three pages under the cover; they fan out as it opens. */}
          <span className="book__page" style={{ '--i': 3 }} />
          <span className="book__page" style={{ '--i': 2 }} />
          <span className="book__page" style={{ '--i': 1 }} />
          {/* A few snapshots tucked inside; at rest they peek out of the edges one at a time to
              invite a click. */}
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
      {loading && <HomeLoader target={target} onDone={loaded} />}
      <ProfileBook
        open={bookOpen}
        origin={origin}
        coverFrom={bookOpen ? coverFrom : COVER_REST_DEG}
        onClose={() => setBookOpen(false)}
        onClosed={() => setOrigin(null)}
      />
      <div>
        <h1 className="text-medium">{site.name}</h1>
        <p className="text-muted">{site.role}</p>
      </div>
      {/* The intro reads in grey; hovering a statement brings just that one up to full ink. */}
      <div className="text-small intro__claims">
        <p>
          <span className="intro__claim">
            Business-driven Product Designer with 5 years of end-to-end ownership, turning complex business problems
            into measurable growth.
          </span>
        </p>
        <p className="intro__ink">
          <span className="intro__claim">
            In 2026, led growth design at{' '}
            <Brand name="Newton School of Technology" href="https://www.newtonschool.co/" />, a{' '}
            <Metric value="$45M+" i={0} ready={!loading} /> business reshaping India’s engineering education.
          </span>
        </p>
      </div>
      {/* Earlier work: a line per company, each led by its icon tile and name. */}
      <div className="text-small intro__claims intro__ink">
        <p>
          <span className="intro__claim">
            <Brand name="LottieFiles" href="https://lottiefiles.com/" strong /> marketplace, from{' '}
            <Metric value="$200K" i={1} ready={!loading} /> to <Metric value="$2.4M" i={2} ready={!loading} /> ARR.
          </span>
        </p>
        <p>
          <span className="intro__claim">
            <Brand name="IconScout" href="https://iconscout.com/" strong /> Figma plugin,{' '}
            <Metric value="#14" i={3} ready={!loading} /> most-used worldwide with{' '}
            <Metric value="1.2M+" i={4} ready={!loading} /> users.
          </span>
        </p>
        <p>
          <span className="intro__claim">
            <Brand name="Toppr" label="Toppr Answr" strong />, we built it from zero to{' '}
            <Metric value="$1.4M" i={5} ready={!loading} /> in revenue.
          </span>
        </p>
      </div>
    </section>
  );
}
