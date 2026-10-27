import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';
import arrowLeft from '../assets/icons/arrow-left.svg';
import arrowRight from '../assets/icons/arrow-right.svg';
import './Lightbox.css';

const LightboxContext = createContext(() => {});

// The media each <Zoomable> button opens, so a gallery can be read back from the page.
const mediaOf = new WeakMap();

// Wrap the app once; any <Zoomable> inside can then open its media in the overlay. Zoomables
// inside the same `data-gallery` element form a gallery: the overlay steps through them in
// page order with the arrow buttons, the left/right arrow keys or a swipe.
export function LightboxProvider({ children }) {
  const [view, setView] = useState(null); // { items, index }
  const returnFocus = useRef(null);
  const closeButton = useRef(null);
  const touchX = useRef(null);

  const open = useCallback((item, button) => {
    returnFocus.current = document.activeElement;
    const gallery = button?.closest('[data-gallery]');
    const items = gallery
      ? [...gallery.querySelectorAll('.zoomable')].map((el) => mediaOf.get(el)).filter(Boolean)
      : [item];
    setView({ items, index: Math.max(0, items.indexOf(item)) });
  }, []);

  const close = useCallback(() => {
    setView(null);
    returnFocus.current?.focus?.();
  }, []);

  const step = useCallback(
    (by) => setView((v) => v && { ...v, index: (v.index + by + v.items.length) % v.items.length }),
    [],
  );

  const many = view ? view.items.length > 1 : false;

  useEffect(() => {
    if (!view) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (many && e.key === 'ArrowRight') step(1);
      else if (many && e.key === 'ArrowLeft') step(-1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [view, many, close, step]);

  const isOpen = Boolean(view);
  useEffect(() => {
    if (isOpen) closeButton.current?.focus();
  }, [isOpen]);

  const media = view?.items[view.index];

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {media &&
        createPortal(
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={media.alt || 'Enlarged media'}
            onClick={(e) => e.target === e.currentTarget && close()}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - (touchX.current ?? 0);
              if (many && Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <button ref={closeButton} className="lightbox__close" type="button" onClick={close} aria-label="Close">
              ×
            </button>
            {many && (
              <>
                <button className="lightbox__step lightbox__step--prev" type="button" onClick={() => step(-1)} aria-label="Previous">
                  <Icon src={arrowLeft} />
                </button>
                <button className="lightbox__step lightbox__step--next" type="button" onClick={() => step(1)} aria-label="Next">
                  <Icon src={arrowRight} />
                </button>
              </>
            )}
            <figure
              key={view.index}
              className="lightbox__figure"
              onClick={(e) => e.target === e.currentTarget && close()}
            >
              {media.video ? (
                <video src={media.video} poster={media.src2x || media.src} controls autoPlay muted loop playsInline />
              ) : media.inset ? (
                // A cut-out graphic: shown on its light tile, as on the page.
                <div
                  className={`lightbox__tile${media.align === 'end' ? ' lightbox__tile--end' : ''}`}
                  style={{ aspectRatio: media.ratio, '--ratio': media.ratio, '--inset': `${media.inset * 100}%` }}
                >
                  <img src={media.src2x || media.src} alt={media.alt} />
                </div>
              ) : (
                <img src={media.src2x || media.src} alt={media.alt} />
              )}
              {(media.caption || media.alt || many) && (
                <figcaption>
                  {media.caption || media.alt}
                  {many && (
                    <span className="lightbox__count">
                      {view.index + 1} / {view.items.length}
                    </span>
                  )}
                </figcaption>
              )}
            </figure>
          </div>,
          document.body,
        )}
    </LightboxContext.Provider>
  );
}

// Makes static media clickable to view it enlarged. `media` = { src, src2x?, video?, alt, caption? },
// plus { inset, align?, ratio } for a cut-out graphic drawn on a light tile.
export function Zoomable({ media, className = '', style, children }) {
  const open = useContext(LightboxContext);
  const ref = useCallback((el) => el && mediaOf.set(el, media), [media]);
  return (
    <button
      ref={ref}
      type="button"
      className={`zoomable ${className}`}
      style={style}
      onClick={(e) => open(media, e.currentTarget)}
      aria-label={`View larger: ${media.caption || media.alt}`}
    >
      {children}
    </button>
  );
}
