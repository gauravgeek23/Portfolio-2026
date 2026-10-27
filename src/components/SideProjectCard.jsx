import { Link } from 'react-router-dom';
import { InViewVideo } from './PlayMedia';
import './ProjectCard.css';
import './SideProjectCard.css';

// Same behaviour as the selected-work cards: the whole card links to /work/<slug>.
export default function SideProjectCard({ project }) {
  const { slug, title, period, summary, cover, coverAlt } = project;

  return (
    <article>
      <Link className="project-card side-card" to={`/work/${slug}`}>
        <div className="project-card__cover side-card__cover">
          {cover.video ? (
            <InViewVideo media={{ video: cover.video, poster2x: cover.poster, alt: coverAlt }} />
          ) : (
            <img
              src={cover.src}
              srcSet={`${cover.src} 370w, ${cover.src2x} 740w`}
              sizes="(max-width: 640px) calc(100vw - 32px), 370px"
              alt={coverAlt}
              width="370"
              height="185"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <div className="side-card__meta">
          <div className="project-card__heading">
            <h3 className="project-card__title text-medium">{title}</h3>
            <p className="text-small text-muted">{period}</p>
          </div>
          <p className="text-small text-muted">{summary}</p>
        </div>
      </Link>
    </article>
  );
}
