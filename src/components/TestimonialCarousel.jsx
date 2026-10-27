import { useEffect, useRef } from 'react';
import TestimonialCard from './TestimonialCard';
import './TestimonialCarousel.css';

const SPEED = 24; // px per second
const DRAG_THRESHOLD = 5; // px moved before a press counts as a drag

// Endless, slowly auto-scrolling row of testimonials.
// Pauses on hover, keyboard focus or touch; drag with the mouse (or swipe) to move it manually.
export default function TestimonialCarousel({ testimonials }) {
  const track = useRef(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let pos = el.scrollLeft;
    let last = performance.now();
    let frame = 0;
    let hovering = false;
    let focused = false;
    let touching = false;
    let resumeTimer = 0;
    const drag = { active: false, moved: false, startX: 0, startPos: 0 };

    // The list is rendered twice; once we scroll past the first copy, jump back by exactly
    // one copy's width (distance between the first card of each copy).
    const loopWidth = () => {
      const items = el.children;
      const half = items.length / 2;
      return items[half] ? items[half].offsetLeft - items[0].offsetLeft : 0;
    };
    const wrap = (value) => {
      const w = loopWidth();
      if (w <= 0) return value;
      return ((value % w) + w) % w;
    };
    const paused = () => reducedMotion || hovering || focused || touching || drag.active;

    const tick = (now) => {
      const dt = Math.min(now - last, 64) / 1000;
      last = now;
      if (!paused()) {
        pos = wrap(pos + SPEED * dt);
        el.scrollLeft = pos;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // Manual scrolling (trackpad, swipe) moves the position the auto-scroll continues from.
    const onScroll = () => {
      if (!paused()) return;
      const wrapped = wrap(el.scrollLeft);
      if (Math.abs(wrapped - el.scrollLeft) > 1) el.scrollLeft = wrapped;
      pos = wrapped;
    };

    const onPointerDown = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag.active = true;
      drag.moved = false;
      drag.startX = e.clientX;
      drag.startPos = el.scrollLeft;
    };
    const onPointerMove = (e) => {
      if (!drag.active) return;
      const dx = e.clientX - drag.startX;
      if (!drag.moved && Math.abs(dx) > DRAG_THRESHOLD) {
        drag.moved = true;
        el.setPointerCapture(e.pointerId);
        el.classList.add('is-dragging');
      }
      if (drag.moved) {
        pos = wrap(drag.startPos - dx);
        el.scrollLeft = pos;
      }
    };
    const endDrag = () => {
      drag.active = false;
      el.classList.remove('is-dragging');
    };
    // A drag shouldn't also count as a click on a name link.
    const onClickCapture = (e) => {
      if (drag.moved) {
        e.preventDefault();
        e.stopPropagation();
        drag.moved = false;
      }
    };

    const onEnter = () => (hovering = true);
    const onLeave = () => {
      hovering = false;
      endDrag();
    };
    // Only keyboard focus pauses (a mouse press also focuses the region, but shouldn't stop it).
    const onFocusIn = (e) => (focused = e.target.matches(':focus-visible'));
    const onFocusOut = (e) => (focused = el.contains(e.relatedTarget));
    const onTouchStart = () => {
      touching = true;
      clearTimeout(resumeTimer);
    };
    const onTouchEnd = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => (touching = false), 2000);
    };

    const listeners = [
      ['scroll', onScroll],
      ['pointerdown', onPointerDown],
      ['pointermove', onPointerMove],
      ['pointerup', endDrag],
      ['pointercancel', endDrag],
      ['click', onClickCapture, true],
      ['mouseenter', onEnter],
      ['mouseleave', onLeave],
      ['focusin', onFocusIn],
      ['focusout', onFocusOut],
      ['touchstart', onTouchStart, { passive: true }],
      ['touchend', onTouchEnd],
    ];
    listeners.forEach(([type, fn, opts]) => el.addEventListener(type, fn, opts));
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(resumeTimer);
      listeners.forEach(([type, fn, opts]) => el.removeEventListener(type, fn, opts));
    };
  }, []);

  return (
    <div className="carousel" ref={track} aria-label="Testimonials" role="region" tabIndex={0}>
      {[0, 1].map((copy) =>
        testimonials.map((testimonial) => (
          <div
            key={`${copy}-${testimonial.name}`}
            className="carousel__item"
            aria-hidden={copy === 1 || undefined}
            inert={copy === 1}
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        )),
      )}
    </div>
  );
}
