import { Link } from 'react-router-dom';
import './ProjectCard.css';

// The whole card — cover, title, dates and summary — is one link to the case study.
export default function ProjectCard({ project }) {
  const { slug, title, period, summary, cover, coverAlt } = project;

  return (
    <article>
      <Link className="project-card" to={`/work/${slug}`}>
        <div className="project-card__cover">
          <img
            src={cover.src}
            srcSet={`${cover.src} 800w, ${cover.src2x} 1600w`}
            sizes="(max-width: 832px) calc(100vw - 32px), 800px"
            alt={coverAlt}
            width="800"
            height="400"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="project-card__meta">
          <div className="project-card__heading">
            <h3 className="project-card__title text-medium">{title}</h3>
            <p className="text-small text-muted">{period}</p>
          </div>
          <p className="project-card__summary text-small text-muted">{summary}</p>
        </div>
      </Link>
    </article>
  );
}
