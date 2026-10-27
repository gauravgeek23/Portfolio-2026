import avatar from '../assets/avatar-104.webp';
import avatar3x from '../assets/avatar-156.webp';
import avatarLarge from '../assets/avatar-1200.webp';
import { Zoomable } from './Lightbox';
import { site } from '../data/site';
import './Intro.css';

export default function Intro() {
  return (
    <section className="intro">
      {/* A little passport-style book (after Airbnb's host profile) that opens on hover. */}
      <div className="intro__book" aria-hidden="true">
        <div className="book__page" />
        <div className="book__cover">
          <img src={avatar3x} alt="" width="64" height="72" />
        </div>
      </div>
      <div className="intro__avatar">
        {/* Click to view the full photo in the overlay. */}
        <Zoomable media={{ src: avatarLarge, alt: `Portrait of ${site.name}` }}>
          <img
            src={avatar}
            srcSet={`${avatar} 2x, ${avatar3x} 3x`}
            alt={`Portrait of ${site.name}`}
            width="52"
            height="52"
          />
        </Zoomable>
      </div>
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
