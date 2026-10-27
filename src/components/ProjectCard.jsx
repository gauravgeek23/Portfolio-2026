import { Link } from 'react-router-dom';
import './ProjectCard.css';

export default function ProjectCard({ project }) {
  const { slug, title, period, summary, cover, coverAlt } = project;
  const href = `/work/${slug}`;

  return (
    <article className="project-card">
      <Link className="project-card__cover" to={href} aria-label={`${title} case study`}>
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
      </Link>
      <div className="project-card__meta">
        <div className="project-card__heading">
          <h3 className="text-medium">
            <Link to={href}>{title}</Link>
          </h3>
          <p className="text-small text-muted">{period}</p>
        </div>
        <p className="project-card__summary text-small text-muted">{summary}</p>
      </div>
    </article>
  );
}
