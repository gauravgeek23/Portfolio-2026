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
