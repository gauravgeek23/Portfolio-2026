import { Link, Navigate, useParams } from 'react-router-dom';
import { Zoomable } from '../components/Lightbox';
import { InViewVideo } from '../components/PlayMedia';
import CaseStudyBlocks from '../components/CaseStudyBlocks';
import arrowLeft from '../assets/icons/arrow-left.svg';
import arrowRight from '../assets/icons/arrow-right.svg';
import { projects, sideProjects } from '../data/projects';
import './CaseStudy.css';

export default function CaseStudy() {
  const { slug } = useParams();
  // "Next project" cycles within the list the project belongs to (selected work or side projects).
  const list = projects.some((p) => p.slug === slug) ? projects : sideProjects;
  const index = list.findIndex((p) => p.slug === slug);
  if (index === -1) return <Navigate to="/" replace />;

  const project = list[index];
  const next = list[(index + 1) % list.length];
  const coverWidth = list === projects ? 800 : 370;
  const { caseStudy } = project;

  const hero = (
    <Zoomable key="hero" className="case-study__hero" media={{ ...project.cover, alt: project.coverAlt }}>
      {project.cover.video ? (
        <div className="case-study__cover case-study__cover--video">
          <InViewVideo media={{ video: project.cover.video, poster2x: project.cover.poster, alt: project.coverAlt }} />
        </div>
      ) : (
        <img
          className="case-study__cover"
          src={project.cover.src}
          srcSet={`${project.cover.src} ${coverWidth}w, ${project.cover.src2x} ${coverWidth * 2}w`}
          sizes="(max-width: 832px) calc(100vw - 32px), (min-width: 1100px) 1000px, 800px"
          alt={project.coverAlt}
          width="800"
          height="400"
        />
      )}
    </Zoomable>
  );

  return (
    <main className={`container page case-study${caseStudy ? ' case-study--wide-media' : ''}`}>
      <Link className="case-study__back text-small text-muted" to="/#work">
        <img src={arrowLeft} alt="" width="20" height="20" />
        <span>All Work</span>
      </Link>

      {caseStudy ? (
        <>
          <h1 className="text-medium">{caseStudy.heading}</h1>
          <CaseStudyBlocks blocks={caseStudy.blocks} hero={hero} />
        </>
      ) : (
        <>
          <header>
            <h1 className="text-medium">{project.title}</h1>
            <p className="text-small text-muted">{project.period}</p>
            <p className="case-study__summary text-small text-muted">{project.summary}</p>
          </header>
          {hero}
          <article className="case-study__body text-small">
            {project.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-medium">{section.heading}</h2>
                {section.body && <p>{section.body}</p>}
              </section>
            ))}
          </article>
        </>
      )}

      <hr className="divider" />

      <Link className="case-study__next" to={`/work/${next.slug}`}>
        <span className="case-study__next-title text-medium">
          <span>{next.title}</span>
          <img src={arrowRight} alt="" width="20" height="20" />
        </span>
        <span className="text-small text-muted">Next Project</span>
      </Link>
    </main>
  );
}
