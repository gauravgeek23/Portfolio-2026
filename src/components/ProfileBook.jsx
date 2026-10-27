import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import avatar from '../assets/avatar-1200.webp';
import { site } from '../data/site';
import {
  Endpaper,
  Letter,
  Preface,
  Y2023Left,
  Y2023Right,
  Y2024Left,
  Y2024Right,
  Y2025Left,
  Y2025Right,
  Y2026Left,
  Y2026Right,
} from './BookPages';
import './ProfileBook.css';

// The open book is 920 x 654 (two 460 x 654 pages); it scales down to fit smaller screens.
const BOOK_W = 920;
const BOOK_H = 654;
// Closing: the panel fades, then the book closes back into the small one.
const CLOSE_MS = 1400;
const FLIP_MS = 900;

function Cover() {
  return (
    <div className="pbook__cover-face">
      <img src={avatar} alt="" />
      <span className="pbook__name">{site.name}</span>
    </div>
  );
}

// The book is a stack of leaves hinged on the spine. Each leaf has a front (a right-hand page)
// and a back (the left-hand page of the next spread); turning a leaf flips it from right to left.
// Spread n shows the back of leaf n - 1 and the front of leaf n.
const LEAVES = [
  { front: <Cover />, back: <Preface /> },
  { front: <Letter />, back: <Y2026Left /> },
  { front: <Y2026Right />, back: <Y2025Left /> },
  { front: <Y2025Right />, back: <Y2024Left /> },
  { front: <Y2024Right />, back: <Y2023Left /> },
  { front: <Y2023Right />, back: <Endpaper /> },
];
const SPREADS = ['Preface', '2026', '2025', '2024', '2023'];
const LAST = SPREADS.length; // spreads are 1..LAST (turned leaves); 0 is closed

// A popup with a magazine about Gaurav, one spread per year. It grows out of the small book on
// the home page (`origin`, that book's bounding box), its cover swinging open as it enlarges; then
// the white panel fades in. Pages turn with the buttons, the arrow keys or a click on a page;
// "next" on the last spread closes the book back into the small one.
export default function ProfileBook({ open, onClose, origin, onClosed }) {
  const [mounted, setMounted] = useState(open);
  const [turned, setTurned] = useState(0);
  const [flipping, setFlipping] = useState(null);
  const [scale, setScale] = useState(1);
  const [from, setFrom] = useState({ x: 0, y: 0, s: 0.2 });
  const closeButton = useRef(null);
  const onClosedRef = useRef(onClosed);
  onClosedRef.current = onClosed;
  const isOpen = turned > 0;

  // Mount, then open on the next frame so the cover animates from closed.
  useEffect(() => {
    if (open) {
      setMounted(true);
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setTurned(1)));
      return () => cancelAnimationFrame(id);
    }
    setTurned(0);
    const t = setTimeout(() => {
      setMounted(false);
      onClosedRef.current?.();
    }, CLOSE_MS);
    return () => clearTimeout(t);
  }, [open]);

  useLayoutEffect(() => {
    if (!mounted) return undefined;
    const fit = () => {
      const s = Math.min(1, (window.innerWidth - 48) / BOOK_W, (window.innerHeight - 200) / BOOK_H);
      setScale(s);
      // Where the closed book starts: over the small book, at its size. The closed book (one
      // page wide) sits at the centre of the screen once enlarged.
      if (origin) {
        setFrom({
          x: origin.left + origin.width / 2 - window.innerWidth / 2,
          y: origin.top + origin.height / 2 - window.innerHeight / 2,
          s: origin.width / ((BOOK_W / 2) * s),
        });
      }
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [mounted, origin]);

  const close = useCallback(() => onClose(), [onClose]);

  const go = useCallback(
    (by) => {
      if (by > 0 && turned >= LAST) {
        close();
        return;
      }
      const next = Math.max(1, Math.min(LAST, turned + by));
      if (next === turned) return;
      // The leaf being turned stays on top of both stacks while it flips.
      setFlipping(by > 0 ? turned : next);
      setTurned(next);
    },
    [turned, close],
  );

  useEffect(() => {
    if (flipping === null) return undefined;
    const t = setTimeout(() => setFlipping(null), FLIP_MS);
    return () => clearTimeout(t);
  }, [flipping]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close, go]);

  useEffect(() => {
    if (open) closeButton.current?.focus();
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`pbook-modal${isOpen ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${site.name}: a magazine of the last few years`}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="pbook-modal__panel" onClick={(e) => e.target === e.currentTarget && close()}>
        <button ref={closeButton} className="pbook-modal__close" type="button" onClick={close} aria-label="Close">
          ×
        </button>
        <div
          className="pbook-stage"
          style={{ '--scale': scale, '--from-x': `${from.x}px`, '--from-y': `${from.y}px`, '--from-s': from.s }}
        >
          <div className="pbook">
            {/* The page blocks under each side: their edges and the book's shadow. */}
            <div className="pbook__block pbook__block--left" />
            <div className="pbook__block pbook__block--right" />
            {LEAVES.map((leaf, i) => {
              const isTurned = i < turned;
              const z = flipping === i ? 50 : isTurned ? i + 1 : LEAVES.length - i;
              return (
                <div
                  key={i}
                  className={`pbook__leaf${i === 0 ? ' pbook__leaf--cover' : ''}${isTurned ? ' is-turned' : ''}`}
                  style={{ zIndex: z }}
                  aria-hidden={!(i === turned || i === turned - 1)}
                >
                  <div className="pbook__face pbook__face--front" onClick={i > 0 ? () => go(1) : undefined}>
                    {leaf.front}
                  </div>
                  <div className="pbook__face pbook__face--back" onClick={() => go(-1)}>
                    {leaf.back}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <nav className="pbook-nav" aria-label="Pages">
          <button type="button" onClick={() => go(-1)} disabled={turned <= 1} aria-label="Previous pages">
            ←
          </button>
          <ol>
            {SPREADS.map((label, i) => (
              <li key={label} aria-current={turned === i + 1 ? 'page' : undefined}>
                {label}
              </li>
            ))}
          </ol>
          <button type="button" onClick={() => go(1)} aria-label={turned >= LAST ? 'Close the book' : 'Next pages'}>
            →
          </button>
        </nav>
      </div>
    </div>,
    document.body,
  );
}
