import { Zoomable } from './Lightbox';
import './LayeredHero.css';

const srcSet = (layer) => `${layer.src} 1x, ${layer.src2x} 2x`;

// Three stacked layers (sky, title, foreground). On hover the scene zooms in and the
// title sinks behind the foreground; it rises back when the pointer leaves.
// Clicking opens the flattened photo in the lightbox.
export default function LayeredHero({ photo, className = '' }) {
  const { back, text, front } = photo.layers;
  return (
    <Zoomable media={photo} className={`layered-hero ${className}`}>
      <img className="layered-hero__back" src={back.src} srcSet={srcSet(back)} alt={photo.alt} />
      <img className="layered-hero__text" src={text.src} srcSet={srcSet(text)} alt="" />
      <img className="layered-hero__front" src={front.src} srcSet={srcSet(front)} alt="" />
    </Zoomable>
  );
}
