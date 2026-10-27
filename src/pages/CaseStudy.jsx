import { Link, Navigate, useParams } from 'react-router-dom';
import { projects } from '../data/projects';
import './CaseStudy.css';

export default function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return <Navigate to="/" replace />;

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="container page case-study">
      <Link className="case-study__back text-small text-muted" to="/#work">
        ← All work
      </Link>

      <header>
        <h1 className="text-medium">{project.title}</h1>
        <p className="text-small text-muted">{project.period}</p>
        <p className="case-study__summary text-small text-muted">{project.summary}</p>
      </header>

      <img
        className="case-study__cover"
        src={project.cover.src}
        srcSet={`${project.cover.src} 800w, ${project.cover.src2x} 1600w`}
        sizes="(max-width: 832px) calc(100vw - 32px), 800px"
        alt={project.coverAlt}
        width="800"
        height="400"
      />

      <article className="case-study__body text-small">
        {project.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-medium">{section.heading}</h2>
            {section.body && <p>{section.body}</p>}
          </section>
        ))}
      </article>

      <hr className="divider" />

      <Link className="case-study__next" to={`/work/${next.slug}`}>
        <span className="text-small text-muted">Next project</span>
        <span className="text-medium">{next.title} →</span>
      </Link>
    </main>
  );
}
