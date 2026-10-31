import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import usePageMeta from '../../hooks/usePageMeta';
import { DeckContext } from './kit';
import { SLIDES } from './slides';
import './Deck.css';

const W = 1920;
const H = 1080;
const total = SLIDES.length;
const pad = (n) => String(n).padStart(2, '0');
const clamp = (n) => Math.max(0, Math.min(total - 1, n));

// The interview deck: a 1920 x 1080 canvas scaled to fit the window. Arrow keys, Page Up/Down,
// space, swipe or the ruler move between slides; F fullscreen, N speaker notes, G the overview.
// `?print` lays every slide out at full size, finished and still, for PDF and image export.
export default function Deck() {
  usePageMeta({ title: 'Growth Season 2025–26 · Presentation', noindex: true });
  const print = useMemo(() => new URLSearchParams(window.location.search).has('print'), []);
  const reduced = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const [index, setIndex] = useState(() => clamp((parseInt(window.location.hash.slice(1), 10) || 1) - 1));
  const [scale, setScale] = useState(1);
  const [notes, setNotes] = useState(false);
  const [grid, setGrid] = useState(false);
  const [idle, setIdle] = useState(false);
  const touchX = useRef(null);

  const go = useCallback((n) => setIndex(clamp(n)), []);

  // The site reserves a scrollbar gutter; the deck never scrolls, so give the canvas the full width.
  useEffect(() => {
    const html = document.documentElement;
    const before = html.style.scrollbarGutter;
    html.style.scrollbarGutter = 'auto';
    return () => {
      html.style.scrollbarGutter = before;
    };
  }, []);

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / W, window.innerHeight / H));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  // Keep the slide in the URL, so a refresh (or a shared link) lands on the same slide.
  useEffect(() => {
    if (!print) window.history.replaceState(null, '', `#${index + 1}`);
  }, [index, print]);

  useEffect(() => {
    if (print) return undefined;
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key;
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(k)) go(index + 1);
      else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)) go(index - 1);
      else if (k === 'Home') go(0);
      else if (k === 'End') go(total - 1);
      else if (k === 'f' || k === 'F') toggleFullscreen();
      else if (k === 'n' || k === 'N') setNotes((v) => !v);
      else if (k === 'g' || k === 'G') setGrid((v) => !v);
      else if (k === 'Escape') setGrid(false);
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go, print]);

  // Controls fade out while presenting and come back on mouse movement.
  useEffect(() => {
    if (print) return undefined;
    let t;
    const wake = () => {
      setIdle(false);
      clearTimeout(t);
      t = setTimeout(() => setIdle(true), 2500);
    };
    wake();
    window.addEventListener('mousemove', wake);
    return () => {
      clearTimeout(t);
      window.removeEventListener('mousemove', wake);
    };
  }, [print]);

  const ctx = useMemo(() => ({ still: print || reduced }), [print, reduced]);

  if (print) {
    return (
      <DeckContext.Provider value={ctx}>
        <div className="deck deck--print">
          {SLIDES.map((s, i) => (
            <Slide key={i} slide={s} i={i} active />
          ))}
        </div>
      </DeckContext.Provider>
    );
  }

  const slide = SLIDES[index];
  return (
    <DeckContext.Provider value={ctx}>
      <div
        className={`deck${idle ? ' is-idle' : ''}${reduced ? ' is-still' : ''}`}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - (touchX.current ?? 0);
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        }}
      >
        <div className="deck__stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
          {SLIDES.map((s, i) => (
            <Slide key={i} slide={s} i={i} active={i === index} go={go} />
          ))}
        </div>

        <div className="deck__controls" role="toolbar" aria-label="Presentation controls">
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide">
            ←
          </button>
          <span className="deck__count" aria-live="polite">
            {pad(index + 1)} / {total}
          </span>
          <button type="button" onClick={() => go(index + 1)} disabled={index === total - 1} aria-label="Next slide">
            →
          </button>
          <span className="deck__sep" />
          <button
            type="button"
            className={notes ? 'is-on' : ''}
            onClick={() => setNotes((v) => !v)}
            title="Speaker notes (N)"
          >
            Notes
          </button>
          <button
            type="button"
            className={grid ? 'is-on' : ''}
            onClick={() => setGrid((v) => !v)}
            title="All slides (G)"
          >
            Slides
          </button>
          <button type="button" onClick={toggleFullscreen} title="Fullscreen (F)">
            Fullscreen
          </button>
        </div>

        {notes && (
          <aside className="deck__notes" aria-label="Speaker notes">
            <header>
              <b>
                {pad(index + 1)} · {slide.title}
              </b>
              <span>~{slide.min} min</span>
            </header>
            {slide.notes.split('\n\n').map((p) => (
              <p key={p}>{p}</p>
            ))}
          </aside>
        )}

        {grid && (
          <div className="deck__grid" role="dialog" aria-label="All slides" onClick={() => setGrid(false)}>
            <ol>
              {SLIDES.map((s, i) => (
                <li key={i}>
                  <button
                    type="button"
                    className={i === index ? 'is-on' : ''}
                    onClick={(e) => {
                      e.stopPropagation();
                      go(i);
                      setGrid(false);
                    }}
                  >
                    <span>{pad(i + 1)}</span>
                    {s.title}
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </DeckContext.Provider>
  );
}

function toggleFullscreen() {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else document.documentElement.requestFullscreen?.();
}

// One slide with its chrome: section label, the gk. mark and a ruler that doubles as navigation.
function Slide({ slide, i, active, go }) {
  const { C } = slide;
  return (
    <section
      className={`slide${slide.dark ? ' slide--dark' : ''}${active ? ' is-active' : ''}`}
      aria-hidden={!active}
      aria-roledescription="slide"
      aria-label={`${i + 1} of ${total}: ${slide.title}`}
    >
      <C active={active} />
      <div className="chrome">
        {slide.section && <span className="chrome__section">{slide.section}</span>}
        <span className="chrome__mark mark">
          gk
          <i />
        </span>
        <div className="chrome__ruler">
          {SLIDES.map((s, k) => (
            <button
              key={k}
              type="button"
              tabIndex={active ? 0 : -1}
              className={`chrome__tick${k === i ? ' is-here' : ''}${k === 11 || k === 20 ? ' is-act' : ''}`}
              onClick={() => go?.(k)}
              aria-label={`Go to slide ${k + 1}: ${s.title}`}
            >
              <em>{s.title}</em>
            </button>
          ))}
        </div>
        <span className="chrome__num">
          {pad(i + 1)} <span>/ {total}</span>
        </span>
      </div>
    </section>
  );
}
