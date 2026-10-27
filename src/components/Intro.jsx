import avatar from '../assets/avatar-156.webp';
import avatarLarge from '../assets/avatar-1200.webp';
import { Zoomable } from './Lightbox';
import { site } from '../data/site';
import './Intro.css';

export default function Intro() {
  return (
    <section className="intro">
      {/* Profile photo on a little passport-style book (after Airbnb's host profile) that opens on
          hover; click to view the full photo in the overlay. */}
      <div className="intro__avatar">
        <Zoomable media={{ src: avatarLarge, alt: `Portrait of ${site.name}` }} className="intro__book">
          {/* Three pages under the cover; they fan out as it opens. */}
          <span className="book__page" style={{ '--i': 3 }} />
          <span className="book__page" style={{ '--i': 2 }} />
          <span className="book__page" style={{ '--i': 1 }} />
          <span className="book__cover">
            <img src={avatar} alt={`Portrait of ${site.name}`} width="46" height="52" />
          </span>
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
