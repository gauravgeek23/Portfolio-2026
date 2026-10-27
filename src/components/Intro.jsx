import { useState } from 'react';
import avatar from '../assets/avatar-156.webp';
import ProfileBook from './ProfileBook';
import { site } from '../data/site';
import './Intro.css';

export default function Intro() {
  const [bookOpen, setBookOpen] = useState(false);
  // Where the small book sits, so the big one can grow out of it; while the big one is up the
  // small one is hidden (it "is" the big one).
  const [origin, setOrigin] = useState(null);
  return (
    <section className="intro">
      {/* Profile photo on a little passport-style book (after Airbnb's host profile) that opens a
          little on hover; clicking it opens the full book in a popup. */}
      <div className="intro__avatar">
        <button
          type="button"
          className="intro__book"
          style={{ visibility: origin ? 'hidden' : undefined }}
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
          <span className="book__cover">
            <img src={avatar} alt={`Portrait of ${site.name}`} width="34" height="38" />
          </span>
        </button>
      </div>
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
          Business-driven Product Designer with 5 years of E2E ownership, translating complex business challenges
          into impactful experiences that drive measurable growth.
        </p>
        <p>
          In 2026, led design for growth initiatives at a $45M+ business reshaping India’s engineering education
          landscape.
        </p>
      </div>
    </section>
  );
}
