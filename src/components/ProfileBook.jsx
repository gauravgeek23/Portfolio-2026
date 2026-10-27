import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import avatar from '../assets/avatar-1200.webp';
import { site } from '../data/site';
import './ProfileBook.css';

// The open book is 920 x 654 (Figma: Desktop - 10); it scales down to fit smaller screens.
const BOOK_W = 920;
const BOOK_H = 654;
const OPEN_MS = 1100;

const contents = [
  ['Part I', 'Programming Pathshala', '2020'],
  ['Part II', 'Toppr', '2021'],
  ['Part III', 'LottieFiles & IconScout', '2021'],
  ['Part IV', 'Newton School of Technology', '2024'],
  ['Part V', 'Beyond Pixels', '∞'],
];

// A popup with a book about Gaurav: it appears closed, with his photo on the cover, then the
// cover swings open in 3D onto a contents page and a first page. Closing plays it in reverse.
export default function ProfileBook({ open, onClose }) {
  const [mounted, setMounted] = useState(open);
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const closeButton = useRef(null);

  // Mount, then open on the next frame so the cover animates from closed.
  useEffect(() => {
    if (open) {
      setMounted(true);
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setIsOpen(true)));
      return () => cancelAnimationFrame(id);
    }
    setIsOpen(false);
    const t = setTimeout(() => setMounted(false), OPEN_MS);
    return () => clearTimeout(t);
  }, [open]);

  useLayoutEffect(() => {
    if (!mounted) return undefined;
    const fit = () =>
      setScale(Math.min(1, (window.innerWidth - 48) / BOOK_W, (window.innerHeight - 160) / BOOK_H));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [mounted]);

  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && close();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  if (!mounted) return null;

  return createPortal(
    <div
      className={`pbook-modal${isOpen ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${site.name}: a short book`}
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="pbook-modal__panel" onClick={(e) => e.target === e.currentTarget && close()}>
        <button ref={closeButton} className="pbook-modal__close" type="button" onClick={close} aria-label="Close">
          ×
        </button>
        <div className="pbook-stage" style={{ '--scale': scale }}>
          <div className="pbook">
            <section className="pbook__page pbook__page--right">
              <h2 className="pbook__title">I</h2>
              <p className="pbook__lede">
                GAURAV KUMAR: a senior product designer based in Bangalore, with five years of end-to-end
                ownership, translating complex business challenges into impactful experiences that drive
                measurable growth.
              </p>
              <p className="pbook__source">PORTFOLIO, 2026</p>
              <p>
                In 2026 he led design for growth initiatives at a $45M+ business reshaping India’s engineering
                education landscape, after shaping products at LottieFiles, IconScout and Toppr.
              </p>
              <p>
                Beyond pixels, he is an avid traveler and motorcyclist with a curious mind for geopolitics,
                economics and human evolution. He recently spent two months in Ladakh, covering 6,000 km on his
                motorcycle.
              </p>
              <p>
                If there is one product he can’t stop admiring, it is Google Maps: where geography, exploration
                and great product thinking meet.
              </p>
              <span className="pbook__folio">3</span>
            </section>

            <div className="pbook__cover">
              <div className="pbook__face pbook__face--front">
                <img src={avatar} alt="" />
                <span className="pbook__name">{site.name}</span>
              </div>
              <section className="pbook__face pbook__face--back pbook__page pbook__page--left">
                <h2 className="pbook__title">CONTENTS</h2>
                <ol className="pbook__contents">
                  {contents.map(([part, title, year]) => (
                    <li key={part}>
                      <span>{part.toUpperCase()}</span>
                      <span>{title.toUpperCase()}</span>
                      <span>{year}</span>
                    </li>
                  ))}
                </ol>
                <span className="pbook__folio">2</span>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
