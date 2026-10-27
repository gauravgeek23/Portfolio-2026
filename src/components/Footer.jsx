import { site } from '../data/site';
import Ruler from './Ruler';
import Contact from './Contact';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__stack">
        <div>
          <hr className="divider" />
          <Ruler />
        </div>
        <Contact />
      </div>
      <div className="footer__wordmark" aria-hidden="true">
        <span>{site.name}</span>
      </div>
    </footer>
  );
}
