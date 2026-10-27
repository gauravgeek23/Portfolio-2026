import { useEffect, useRef } from 'react';
import { Zoomable } from './Lightbox';

// Muted looping video that only plays while it's on screen (saves data and battery),
// and never autoplays for people who prefer reduced motion — they see the poster.
export function InViewVideo({ media }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={media.video}
      poster={media.poster2x}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={media.alt}
      style={media.fit ? { objectFit: media.fit } : undefined}
    />
  );
}

// Poster image or video for a play item; clicking opens it enlarged.
export default function PlayMedia({ media }) {
  const style = { aspectRatio: media.ratio };
  const zoomMedia = { src: media.poster, src2x: media.poster2x, video: media.video, alt: media.alt };

  return (
    <Zoomable media={zoomMedia} className="play-item__media" style={style}>
      {media.video ? (
        <InViewVideo media={media} />
      ) : (
        <img
          src={media.poster}
          srcSet={`${media.poster} 1x, ${media.poster2x} 2x`}
          alt={media.alt}
          loading="lazy"
          decoding="async"
        />
      )}
    </Zoomable>
  );
}
