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

// The open book is 920 x 654 (two 460 x 654 pages); it scales down to fit smaller screens. On
// phones it is a single 460 x 654 page instead, turned one page at a time, so it can be larger.
const PAGE_W = 460;
const BOOK_H = 654;
const SINGLE_QUERY = '(max-width: 640px)';
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

// Phones: one page per leaf, in reading order. Each leaf shows its page on the front; its back
// is plain paper, and a turned leaf folds away to the left and fades.
const PAGES = [
  ['Hello', <Preface key="p" />],
  ['Hello', <Letter key="l" />],
  ['2026', <Y2026Left key="26l" />],
  ['2026', <Y2026Right key="26r" />],
  ['2025', <Y2025Left key="25l" />],
  ['2025', <Y2025Right key="25r" />],
  ['2024', <Y2024Left key="24l" />],
  ['2024', <Y2024Right key="24r" />],
  ['2023', <Y2023Left key="23l" />],
  ['2023', <Y2023Right key="23r" />],
];
const SINGLE_LEAVES = [{ front: <Cover />, back: <Endpaper /> }, ...PAGES.map(([, page]) => ({ front: page, back: <Endpaper /> }))];

function useSinglePage() {
  const [single, setSingle] = useState(() => window.matchMedia(SINGLE_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(SINGLE_QUERY);
    const onChange = () => setSingle(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return single;
}

// A popup with a scrapbook about Gaurav, one spread per year. It grows out of the small book on
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
  const touchX = useRef(null);
  const single = useSinglePage();
  const leaves = single ? SINGLE_LEAVES : LEAVES;
  // Views are 1..LAST (the number of turned leaves); 0 is closed.
  const LAST = leaves.length - 1;
  const bookW = single ? PAGE_W : PAGE_W * 2;
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
      const s = single
        ? // Inside the 12px-inset panel with at least 16px of white on every side.
          Math.min(1, (window.innerWidth - 24 - 32) / PAGE_W, (window.innerHeight - 24 - 120) / BOOK_H)
        : Math.min(1, (window.innerWidth - 48) / (PAGE_W * 2), (window.innerHeight - 200) / BOOK_H);
      setScale(s);
      // Where the closed book starts: over the small book, at its size. The closed book (one
      // page wide) sits at the centre of the screen once enlarged.
      if (origin) {
        setFrom({
          x: origin.left + origin.width / 2 - window.innerWidth / 2,
          y: origin.top + origin.height / 2 - window.innerHeight / 2,
          s: origin.width / (PAGE_W * s),
        });
      }
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [mounted, origin, single]);

  // Switching between one and two pages (e.g. rotating a tablet) starts again from the first view.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setTurned((t) => (t > 0 ? 1 : t));
  }, [single]);

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
    [turned, close, LAST],
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
      className={`pbook-modal${isOpen ? ' is-open' : ''}${single ? ' is-single' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${site.name}: a scrapbook of the last few years`}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="pbook-modal__panel" onClick={(e) => e.target === e.currentTarget && close()}>
        <button ref={closeButton} className="pbook-modal__close" type="button" onClick={close} aria-label="Close">
          ×
        </button>
        <div
          className="pbook-stage"
          style={{
            '--scale': scale,
            '--book-w': `${bookW}px`,
            '--from-x': `${from.x}px`,
            '--from-y': `${from.y}px`,
            '--from-s': from.s,
          }}
          // Phones: swipe left for the next page, right for the previous one.
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - (touchX.current ?? 0);
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="pbook">
            {/* The page blocks under each side: their edges and the book's shadow. */}
            <div className="pbook__block pbook__block--left" />
            <div className="pbook__block pbook__block--right" />
            {leaves.map((leaf, i) => {
              const isTurned = i < turned;
              const z = flipping === i ? 50 : isTurned ? i + 1 : leaves.length - i;
              return (
                <div
                  key={i}
                  className={`pbook__leaf${i === 0 ? ' pbook__leaf--cover' : ''}${isTurned ? ' is-turned' : ''}`}
                  style={{ zIndex: z }}
                  aria-hidden={!(i === turned || (!single && i === turned - 1))}
                >
                  {/* `is-shown` marks the two pages on view, so their items can animate in. */}
                  <div
                    className={`pbook__face pbook__face--front${i === turned && i > 0 ? ' is-shown' : ''}`}
                    onClick={i > 0 ? () => go(1) : undefined}
                  >
                    {leaf.front}
                  </div>
                  <div
                    className={`pbook__face pbook__face--back${!single && i === turned - 1 ? ' is-shown' : ''}`}
                    onClick={() => go(-1)}
                  >
                    {leaf.back}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <nav className="pbook-nav" aria-label="Pages">
          <button type="button" onClick={() => go(-1)} disabled={turned <= 1} aria-label="Previous page">
            ←
          </button>
          {single ? (
            <p className="pbook-nav__count">
              <b>{PAGES[Math.max(0, turned - 1)][0]}</b> {Math.max(1, turned)} / {PAGES.length}
            </p>
          ) : (
            <ol>
              {SPREADS.map((label, i) => (
                <li key={label} aria-current={turned === i + 1 ? 'page' : undefined}>
                  {label}
                </li>
              ))}
            </ol>
          )}
          <button type="button" onClick={() => go(1)} aria-label={turned >= LAST ? 'Close the book' : 'Next pages'}>
            →
          </button>
        </nav>
      </div>
    </div>,
    document.body,
  );
}
