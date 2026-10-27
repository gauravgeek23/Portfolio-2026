import { Zoomable } from './Lightbox';
import arrowUpRight from '../assets/icons/arrow-up-right.svg';
import Icon from './Icon';
import './Photo.css';
import './CaseStudyBlocks.css';

function Media({ block }) {
  const style = { aspectRatio: block.ratio, '--ratio': block.ratio };
  if (!block.src && !block.video) {
    return (
      <div className="cs-media cs-media--empty" style={style} role="img" aria-label={`${block.alt} (coming soon)`}>
        <span className="text-small text-muted">Media coming soon</span>
      </div>
    );
  }
  // `inset`: a cut-out graphic drawn at that fraction of the tile's width on the dark
  // tile (centred, or on the bottom edge with `align: 'end'`).
  let className = `cs-media${block.video ? '' : ' cs-media--image'}`;
  if (block.inset) {
    className += ` cs-media--inset${block.align === 'end' ? ' cs-media--inset-end' : ''}`;
    style['--inset'] = `${block.inset * 100}%`;
  }
  return (
    <Zoomable
      media={{
        src: block.src || block.poster,
        src2x: block.src2x,
        video: block.video,
        alt: block.alt,
        caption: block.caption,
        ...(block.inset && { inset: block.inset, align: block.align, ratio: block.ratio }),
      }}
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

// Body items: a string, { text, strong }, an array of inline parts (strings,
// { text, href } links, { text, label } darker lead-in labels), or { list } for
// a bulleted list whose items take the same inline forms.
function Inline({ parts }) {
  if (!Array.isArray(parts)) return parts;
  return parts.map((part, i) => {
    if (typeof part === 'string') return part;
    if (part.href) {
      return (
        <a key={i} className="cs-inline-link" href={part.href} target="_blank" rel="noreferrer">
          {part.text}
        </a>
      );
    }
    return (
      <span key={i} className="cs-label">
        {part.text}
      </span>
    );
  });
}

function Paragraphs({ body }) {
  return body.map((p, i) => {
    if (typeof p === 'string' || Array.isArray(p)) {
      return (
        <p key={i} className="text-small text-muted">
          <Inline parts={p} />
        </p>
      );
    }
    if (p.list) {
      return (
        <ul key={i} className="cs-list cs-bullets text-small text-muted">
          {p.list.map((item, j) => (
            <li key={j}>
              <Inline parts={item} />
            </li>
          ))}
        </ul>
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
          <section key={i} className={block.spaced ? 'cs-text cs-text--spaced' : 'cs-text'}>
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
      case 'vimeo':
        return (
          <div key={i} className="cs-media cs-media--embed">
            <iframe
              src={`https://player.vimeo.com/video/${block.id}?badge=0&autopause=0&dnt=1`}
              title={block.title}
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
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
      // One tall tile beside two stacked ones (`reverse` puts the tall tile on the right);
      // all three stack top to bottom on phones.
      case 'media-grid':
        return (
          <div key={i} className={block.reverse ? 'cs-media-grid cs-media-grid--reverse' : 'cs-media-grid'}>
            <Media block={block.tall} />
            {block.stack.map((item, j) => (
              <Media key={j} block={item} />
            ))}
          </div>
        );
      default:
        return null;
    }
  });
}
