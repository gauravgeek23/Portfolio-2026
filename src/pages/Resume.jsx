import Icon from '../components/Icon';
import downloadIcon from '../assets/icons/download.svg';
import { experience, education, features } from '../data/resume';
import { site } from '../data/site';
import './Resume.css';

function Entry({ entry }) {
  return (
    <div className="resume-row">
      <div className="resume-row__details">
        <h3 className="text-medium">{entry.title}</h3>
        {entry.lines?.map((line) => (
          <p key={line} className="text-small text-muted">
            {line}
          </p>
        ))}
      </div>
      <ul className="resume-row__points text-small text-muted">
        {entry.points?.map((point) => (
          <li key={point}>{point}</li>
        ))}
        {entry.items?.map((item) => (
          <li key={item.label} className="resume-row__dated">
            <span>{item.label}</span>
            <span>{item.year}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Section({ id, title, entries }) {
  return (
    <section className="resume-section" aria-labelledby={id}>
      <h2 className="text-medium" id={id}>
        {title}
      </h2>
      {entries.map((entry) => (
        <Entry key={entry.title} entry={entry} />
      ))}
    </section>
  );
}

export default function Resume() {
  return (
    <main className="container page">
      <header className="resume-header">
        <div>
          <h1 className="text-medium">Resume</h1>
          <p className="text-small text-muted">Chapters of My Journey</p>
        </div>
        <a
          className="resume-download text-small"
          href={site.resumePdf}
          aria-label="Download resume (PDF)" target="_blank" rel="noopener noreferrer">
          <Icon src={downloadIcon} />
          <span>
            Download<span className="resume-download__extra"> resume</span>
          </span>
        </a>
      </header>

      <hr className="divider" />
      <Section id="experience" title="EXPERIENCE" entries={experience} />
      <hr className="divider" />
      <Section id="education" title="EDUCATION & CLUBS" entries={education} />
      <hr className="divider" />
      <Section id="features" title="FEATURES & AWARDS" entries={features} />
    </main>
  );
}
