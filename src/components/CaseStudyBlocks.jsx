import { Zoomable } from './Lightbox';
import './CaseStudyBlocks.css';

function Media({ block }) {
  const style = { aspectRatio: block.ratio };
  if (!block.src && !block.video) {
    return (
      <div className="cs-media cs-media--empty" style={style} role="img" aria-label={`${block.alt} (coming soon)`}>
        <span className="text-small text-muted">Media coming soon</span>
      </div>
    );
  }
  return (
    <Zoomable media={{ src: block.src || block.poster, src2x: block.src2x, video: block.video, alt: block.alt }} className="cs-media" style={style}>
      {block.video ? (
        <video src={block.video} poster={block.poster} autoPlay muted loop playsInline aria-label={block.alt} />
      ) : (
        <img src={block.src} srcSet={block.src2x ? `${block.src} 1x, ${block.src2x} 2x` : undefined} alt={block.alt} loading="lazy" />
      )}
    </Zoomable>
  );
}

function Paragraphs({ body }) {
  return body.map((p, i) =>
    typeof p === 'string' ? (
      <p key={i} className="text-small text-muted">
        {p}
      </p>
    ) : (
      <p key={i} className="text-small cs-strong">
        {p.text}
      </p>
    ),
  );
}

// Renders a case study's content blocks (see data/case-studies/*.js).
export default function CaseStudyBlocks({ blocks, hero }) {
  return blocks.map((block, i) => {
    switch (block.type) {
      case 'hero':
        return hero;
      case 'text':
        return (
          <section key={i}>
            <h2 className="text-medium">{block.title}</h2>
            <Paragraphs body={block.body} />
          </section>
        );
      case 'callout':
        return (
          <section key={i} className="cs-box">
            <h2 className="text-medium">{block.title}</h2>
            <p className="text-small text-muted">{block.body}</p>
          </section>
        );
      case 'cards':
        return (
          <div key={i} className="cs-grid">
            {block.items.map((card) => (
              <section key={card.title} className="cs-box">
                <h3 className="text-medium">{card.title}</h3>
                <ul className="cs-list text-small text-muted">
                  {card.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        );
      case 'stats':
        return (
          <dl key={i} className="cs-grid cs-stats">
            {block.items.map((stat) => (
              <div key={stat.label} className="cs-box">
                <dt className="text-small text-muted">{stat.label}</dt>
                <dd className="text-medium">{stat.value}</dd>
              </div>
            ))}
          </dl>
        );
      case 'media':
        return <Media key={i} block={block} />;
      default:
        return null;
    }
  });
}
