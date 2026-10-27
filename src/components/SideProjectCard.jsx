import { Link } from 'react-router-dom';
import './ProjectCard.css';
import './SideProjectCard.css';

// Same behaviour as the selected-work cards: cover and title link to /work/<slug>.
export default function SideProjectCard({ project }) {
  const { slug, title, period, summary, cover, coverAlt } = project;
  const href = `/work/${slug}`;

  return (
    <article className="project-card side-card">
      <Link className="project-card__cover side-card__cover" to={href} aria-label={`${title} case study`}>
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
      </Link>
      <div className="side-card__meta">
        <div className="project-card__heading">
          <h3 className="text-medium">
            <Link to={href}>{title}</Link>
          </h3>
          <p className="text-small text-muted">{period}</p>
        </div>
        <p className="text-small text-muted">{summary}</p>
      </div>
    </article>
  );
}
