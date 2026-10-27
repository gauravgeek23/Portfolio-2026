import './SideProjectCard.css';

export default function SideProjectCard({ project }) {
  const { title, period, summary, cover, coverAlt } = project;

  return (
    <article className="side-card">
      <div className="side-card__cover">
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
      </div>
      <div className="side-card__meta">
        <div>
          <h3 className="text-medium">{title}</h3>
          <p className="text-small text-muted">{period}</p>
        </div>
        <p className="text-small text-muted">{summary}</p>
      </div>
    </article>
  );
}
