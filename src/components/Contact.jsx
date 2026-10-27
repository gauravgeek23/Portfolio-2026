import arrowUpRight from '../assets/icons/arrow-up-right.svg';
import Icon from './Icon';
import { site } from '../data/site';
import LiveClock from './LiveClock';
import './Contact.css';

export default function Contact() {
  return (
    <section className="contact" aria-labelledby="contact-title">
      <div className="contact__grid">
        <h2 className="contact__title text-medium" id="contact-title">
          Let's Build Something
          <br />
          Meaningful Together
        </h2>
        <LiveClock timeZone={site.location.timeZone} label={site.location.city} />
        <address className="contact__address text-muted">
          <p>{site.location.city}</p>
          <p>{site.location.region}</p>
        </address>
      </div>

      <div className="contact__links">
        <p className="contact__mail">
          <span className="text-medium">Mail to</span>
          <a className="text-muted" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
        <ul className="contact__socials">
          {site.socials.map((social) => (
            <li key={social.label}>
              <a className="text-medium" href={social.href} target="_blank" rel="noopener noreferrer">
                {social.label}
                <Icon src={arrowUpRight} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
