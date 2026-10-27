import './Icon.css';

// A 20px SVG icon drawn in the surrounding text colour (via CSS mask), so it
// follows light/dark mode and hover colours like the text beside it.
export default function Icon({ src, className = '' }) {
  return <span className={`icon ${className}`} style={{ '--icon': `url("${src}")` }} aria-hidden="true" />;
}
