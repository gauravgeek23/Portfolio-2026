import './Photo.css';

// Rounded, cropped photo with an optional caption chip in the bottom-right corner.
export default function Photo({ photo, className = '', style, loading = 'lazy' }) {
  return (
    <figure className={`photo ${className}`} style={style}>
      <img
        src={photo.src}
        srcSet={`${photo.src} 1x, ${photo.src2x} 2x`}
        alt={photo.alt}
        loading={loading}
        decoding="async"
      />
      {photo.caption && <figcaption className="photo__caption">{photo.caption}</figcaption>}
    </figure>
  );
}
