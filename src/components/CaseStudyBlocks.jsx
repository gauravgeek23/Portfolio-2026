import { Zoomable } from './Lightbox';
import arrowUpRight from '../assets/icons/arrow-up-right.svg';
import Icon from './Icon';
import './Photo.css';
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
  const className = `cs-media${block.video ? '' : ' cs-media--image'}`;
  return (
    <Zoomable
      media={{ src: block.src || block.poster, src2x: block.src2x, video: block.video, alt: block.alt, caption: block.caption }}
      className={className}
      style={style}
    >
      {block.video ? (
        <video src={block.video} poster={block.poster} autoPlay muted loop playsInline aria-label={block.alt} />
      ) : (
        <img src={block.src} srcSet={block.src2x ? `${block.src} 1x, ${block.src2x} 2x` : undefined} alt={block.alt} loading="lazy" />
      )}
      {block.caption && <span className="photo__caption">{block.caption}</span>}
    </Zoomable>
  );
}

// A wide composite on desktop; its `mobile` pieces stacked top to bottom on small screens.
function ResponsiveMedia({ block }) {
  if (!block.mobile) return <Media block={block} />;
  return (
    <div className="cs-media-switch">
      <div className="cs-media-switch__desktop">
        <Media block={block} />
      </div>
      <div className="cs-media-switch__mobile">
        {block.mobile.map((piece) => (
          <Media key={piece.src} block={piece} />
        ))}
      </div>
    </div>
  );
}

// A paragraph is a string, { text, strong }, or an array of strings and { text, href } links.
function Inline({ parts }) {
  return parts.map((part, i) =>
    typeof part === 'string' ? (
      part
    ) : (
      <a key={i} className="cs-inline-link" href={part.href} target="_blank" rel="noreferrer">
        {part.text}
      </a>
    ),
  );
}

function Paragraphs({ body }) {
  return body.map((p, i) => {
    if (typeof p === 'string' || Array.isArray(p)) {
      return (
        <p key={i} className="text-small text-muted">
          {Array.isArray(p) ? <Inline parts={p} /> : p}
        </p>
      );
    }
    return (
      <p key={i} className="text-small cs-strong">
        {p.text}
      </p>
    );
  });
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
            {block.title && <h2 className="text-medium">{block.title}</h2>}
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
      case 'links':
        return (
          <ul key={i} className="cs-links">
            {block.items.map((link) => (
              <li key={link.href}>
                <a className="cs-box cs-link text-medium" href={link.href} target="_blank" rel="noreferrer">
                  <span>{link.label}</span>
                  <Icon src={arrowUpRight} />
                </a>
              </li>
            ))}
          </ul>
        );
      case 'youtube':
        return (
          <div key={i} className="cs-media cs-media--embed">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${block.id}?rel=0`}
              title={block.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        );
      case 'media':
        return <ResponsiveMedia key={i} block={block} />;
      case 'media-row':
        return (
          <div key={i} className="cs-media-row">
            {block.items.map((item) => (
              <Media key={item.video || item.src} block={item} />
            ))}
          </div>
        );
      default:
        return null;
    }
  });
}
