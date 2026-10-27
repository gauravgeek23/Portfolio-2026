import avatar from '../assets/avatar-104.webp';
import { site } from '../data/site';
import './Intro.css';

export default function Intro() {
  return (
    <section className="intro">
      <div className="intro__avatar">
        <img src={avatar} alt={`Portrait of ${site.name}`} width="52" height="52" />
      </div>
      <div>
        <h1 className="text-medium">{site.name}</h1>
        <p className="text-muted">{site.role}</p>
      </div>
      <div className="text-small">
        <p className="text-muted">
          Business-driven Product Designer with 5 years of E2E ownership, translating complex business challenges
          into impactful experiences that drive measurable growth.
        </p>
        <p>
          In 2026, led design for growth initiatives at a $45M+ business reshaping India’s engineering education
          landscape.
        </p>
      </div>
    </section>
  );
}
