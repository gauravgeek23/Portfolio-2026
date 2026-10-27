import './TestimonialCard.css';

export default function TestimonialCard({ testimonial }) {
  const { name, role, url, quote, photo, flag } = testimonial;

  return (
    <figure className="testimonial">
      <figcaption className="testimonial__person">
        <img className="testimonial__photo" src={photo} alt="" width="56" height="56" loading="lazy" />
        <div className="testimonial__who">
          <div className="testimonial__name-row">
            <a className="text-small" href={url} target="_blank" rel="noopener noreferrer">
              {name}
            </a>
            {flag && <img src={flag.src} alt={flag.country} width="24" height="24" />}
          </div>
          <p className="text-small text-muted">{role}</p>
        </div>
      </figcaption>
      <hr className="divider" />
      <blockquote className="testimonial__quote text-small">{quote}</blockquote>
    </figure>
  );
}
