import { useEffect, useState } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Poster image, or a muted looping video when one is provided (paused for reduced motion).
export default function PlayMedia({ media }) {
  const [autoPlay, setAutoPlay] = useState(false);
  useEffect(() => setAutoPlay(!prefersReducedMotion()), []);

  const style = { aspectRatio: media.ratio };

  if (media.video) {
    return (
      <div className="play-item__media" style={style}>
        <video
          src={media.video}
          poster={media.poster2x}
          autoPlay={autoPlay}
          muted
          loop
          playsInline
          controls={!autoPlay}
          aria-label={media.alt}
        />
      </div>
    );
  }

  return (
    <div className="play-item__media" style={style}>
      <img
        src={media.poster}
        srcSet={`${media.poster} 1x, ${media.poster2x} 2x`}
        alt={media.alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
