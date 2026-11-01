import { createContext, useContext, useEffect, useState } from 'react';

// Shared bits for the deck's slides: whether the deck is static (print/export, reduced motion),
// a reveal wrapper, and an animated number.
export const DeckContext = createContext({ still: false });

// Fades and lifts its children in when the slide becomes active, `d` steps after the slide.
export function In({ d = 0, as: Tag = 'div', className, style, children, ...rest }) {
  return (
    <Tag data-in className={className} style={{ '--d': d, ...style }} {...rest}>
      {children}
    </Tag>
  );
}

const format = (n, decimals) =>
  n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

// Counts up to `to` when its slide becomes active (static in print and for reduced motion).
export function Count({ to, active, decimals = 0, prefix = '', suffix = '', duration = 1400, delay = 200 }) {
  const { still } = useContext(DeckContext);
  const [value, setValue] = useState(still ? to : 0);

  useEffect(() => {
    if (still) {
      setValue(to);
      return undefined;
    }
    if (!active) {
      setValue(0);
      return undefined;
    }
    let frame;
    const start = performance.now() + delay;
    const tick = (now) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      setValue(to * (1 - (1 - t) ** 3));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, still, to, duration, delay]);

  return (
    <span className="count">
      {prefix}
      {format(value, decimals)}
      {suffix}
    </span>
  );
}

// A small "illustrative" / "reported" tag for anything that isn't a verified fact or a real asset.
export function Tag({ children, tone }) {
  return <span className={`tag${tone ? ` tag--${tone}` : ''}`}>{children}</span>;
}

// Images for the deck's visual slots: any file in assets/deck/slots named after a slot (e.g.
// study-buddy.webp) fills it. Until then the slot shows its name, what belongs there and its shape.
const slotFiles = import.meta.glob('../../assets/deck/slots/*.{webp,png,jpg,jpeg,gif,avif,mp4}', {
  eager: true,
  import: 'default',
});
const SLOTS = Object.fromEntries(
  Object.entries(slotFiles).map(([path, url]) => [
    path
      .split('/')
      .pop()
      .replace(/\.[^.]+$/, ''),
    { url, video: path.endsWith('.mp4') },
  ]),
);

export function Slot({ id, hint, ratio = '4 / 3', caption, fit = 'cover', className = '', style }) {
  const file = SLOTS[id];
  return (
    <figure className={`slot${file ? '' : ' slot--empty'} ${className}`} style={{ aspectRatio: ratio, ...style }}>
      {file?.video && <video src={file.url} autoPlay muted loop playsInline style={{ objectFit: fit }} />}
      {file && !file.video && <img src={file.url} alt={caption || hint} style={{ objectFit: fit }} />}
      {!file && (
        <span className="slot__ph">
          <b>{id}</b>
          <span>{hint}</span>
          <small>{ratio.replace(/ /g, '')}</small>
        </span>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

// A handwritten aside, in the scrapbook hand used elsewhere on the site.
export function Hand({ children, className = '', style }) {
  return (
    <span className={`hand ${className}`} style={style}>
      {children}
    </span>
  );
}
