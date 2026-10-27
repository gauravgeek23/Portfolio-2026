import { useEffect, useState } from 'react';
import { Zoomable } from './Lightbox';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Poster image, or a muted looping video when one is provided (paused for reduced motion).
export default function PlayMedia({ media }) {
  const [autoPlay, setAutoPlay] = useState(false);
  useEffect(() => setAutoPlay(!prefersReducedMotion()), []);

  const style = { aspectRatio: media.ratio };
  const zoomMedia = { src: media.poster, src2x: media.poster2x, video: media.video, alt: media.alt };

  if (media.video) {
    return (
      <Zoomable media={zoomMedia} className="play-item__media" style={style}>
        <video
          src={media.video}
          poster={media.poster2x}
          autoPlay={autoPlay}
          muted
          loop
          playsInline
          aria-label={media.alt}
        />
      </Zoomable>
    );
  }

  return (
    <Zoomable media={zoomMedia} className="play-item__media" style={style}>
      <img
        src={media.poster}
        srcSet={`${media.poster} 1x, ${media.poster2x} 2x`}
        alt={media.alt}
        loading="lazy"
        decoding="async"
      />
    </Zoomable>
  );
}
