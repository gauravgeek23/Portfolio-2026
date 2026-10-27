import { Zoomable } from './Lightbox';
import './Photo.css';

// Rounded, cropped photo with an optional caption chip in the bottom-right corner.
// Clicking it opens the photo enlarged.
export default function Photo({ photo, className = '', style, loading = 'lazy' }) {
  return (
    <Zoomable media={photo} className={`photo ${className}`} style={style}>
      <img
        src={photo.src}
        srcSet={`${photo.src} 1x, ${photo.src2x} 2x`}
        alt={photo.alt}
        loading={loading}
        decoding="async"
      />
      {photo.caption && <span className="photo__caption">{photo.caption}</span>}
    </Zoomable>
  );
}
