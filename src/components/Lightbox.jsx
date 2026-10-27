import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import './Lightbox.css';

const LightboxContext = createContext(() => {});

// Wrap the app once; any <Zoomable> inside can then open its media in the overlay.
export function LightboxProvider({ children }) {
  const [media, setMedia] = useState(null);
  const returnFocus = useRef(null);
  const closeButton = useRef(null);

  const open = useCallback((item) => {
    returnFocus.current = document.activeElement;
    setMedia(item);
  }, []);

  const close = useCallback(() => {
    setMedia(null);
    returnFocus.current?.focus?.();
  }, []);

  useEffect(() => {
    if (!media) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [media, close]);

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
          >
            <button ref={closeButton} className="lightbox__close" type="button" onClick={close} aria-label="Close">
              ×
            </button>
            <figure className="lightbox__figure" onClick={(e) => e.target === e.currentTarget && close()}>
              {media.video ? (
                <video src={media.video} poster={media.src2x || media.src} controls autoPlay muted loop playsInline />
              ) : (
                <img src={media.src2x || media.src} alt={media.alt} />
              )}
              {(media.caption || media.alt) && <figcaption>{media.caption || media.alt}</figcaption>}
            </figure>
          </div>,
          document.body,
        )}
    </LightboxContext.Provider>
  );
}

// Makes static media clickable to view it enlarged. `media` = { src, src2x?, video?, alt, caption? }.
export function Zoomable({ media, className = '', style, children }) {
  const open = useContext(LightboxContext);
  return (
    <button
      type="button"
      className={`zoomable ${className}`}
      style={style}
      onClick={() => open(media)}
      aria-label={`View larger: ${media.caption || media.alt}`}
    >
      {children}
    </button>
  );
}
