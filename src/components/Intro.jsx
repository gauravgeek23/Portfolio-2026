import { useCallback, useRef, useState } from 'react';
import avatar from '../assets/avatar-156.webp';
import peekChangLa from '../assets/book/chang-la-peek.webp';
import peekHampta from '../assets/book/hampta-pass-peek.webp';
import peekBali from '../assets/book/bali-kecak-peek.webp';
import ProfileBook from './ProfileBook';
import HomeLoader from './HomeLoader';
import { site } from '../data/site';
import nstLogo from '../assets/logos/nst.svg?raw';
import lottieFilesLogo from '../assets/logos/lottiefiles.svg?raw';
import iconScoutLogo from '../assets/logos/iconscout.svg?raw';
import topprLogo from '../assets/logos/toppr.svg?raw';
import redCarpetLogo from '../assets/logos/redcarpet.svg?raw';
import './Intro.css';

// Companies worked with, newest first. The SVGs are inlined (not <img>) so their wordmarks can
// pick up the theme's text colour while the brand marks keep their own colours.
const logos = [
  { name: 'Newton School of Technology', svg: nstLogo },
  { name: 'LottieFiles', svg: lottieFilesLogo },
  { name: 'IconScout', svg: iconScoutLogo },
  { name: 'Toppr', svg: topprLogo },
  { name: 'RedCarpet', svg: redCarpetLogo },
];

// Whether this page load started on the home page (the preview bundle always starts there), and
// whether the loader has already played since. Both reset on every full page load.
const landedOnHome = import.meta.env.VITE_PREVIEW_BUNDLE || window.location.pathname === import.meta.env.BASE_URL;
let loaderPlayed = false;

export default function Intro() {
  const [bookOpen, setBookOpen] = useState(false);
  // Where the small book sits, so the big one can grow out of it; while the big one is up the
  // small one is hidden (it "is" the big one).
  const [origin, setOrigin] = useState(null);
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
        <button
          type="button"
          ref={bookRef}
          className="intro__book"
          style={{ visibility: origin || loading ? 'hidden' : undefined }}
          onClick={(e) => {
            setOrigin(e.currentTarget.getBoundingClientRect());
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
        onClose={() => setBookOpen(false)}
        onClosed={() => setOrigin(null)}
      />
      <div>
        <h1 className="text-medium">{site.name}</h1>
        <p className="text-muted">{site.role}</p>
      </div>
      <div className="text-small">
        <p className="text-muted">
          Business-driven Product Designer with 5 years of E2E ownership, translating complex business challenges into
          impactful experiences that drive measurable growth.
        </p>
        <p>
          In 2026, led design for growth initiatives at a $45M+ business reshaping India’s engineering education
          landscape.
        </p>
      </div>
      <div className="intro__previously">
        <p id="intro-previously" className="text-small text-muted">
          Previously at
        </p>
        <ul className="intro__logos" aria-labelledby="intro-previously">
          {logos.map(({ name, svg }) => (
            <li
              key={name}
              className="intro__logo"
              role="img"
              aria-label={name}
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
