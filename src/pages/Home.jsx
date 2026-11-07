import Intro from '../components/Intro';
import JournalSection from '../components/JournalSection';
import ProjectCard from '../components/ProjectCard';
import SideProjectCard from '../components/SideProjectCard';
import ExperienceList from '../components/ExperienceList';
import PlayBento from '../components/PlayBento';
import { playItems } from '../data/play';
import TestimonialCard from '../components/TestimonialCard';
import { projects, sideProjects } from '../data/projects';
import { experience } from '../data/experience';
import { testimonials } from '../data/testimonials';
import './Home.css';
import usePageMeta from '../hooks/usePageMeta';
import useWide from '../hooks/useWide';

// The work tab (home page): selected work, experience, play, side projects and testimonials.
export default function Home() {
  usePageMeta({});
  const wide = useWide();
  return (
    <main className="container page">
      {/* On wide screens the intro lives in the left panel (Sidebar). */}
      {!wide && (
        <>
          <Intro side />
          <hr className="divider" />
        </>
      )}

      <JournalSection id="work" title="Selected work" note="Reach out for more details">
        <div className="work-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </JournalSection>
      <hr className="divider" />

      <JournalSection id="experience" title="Work Experience" note="Chapters of My Journey">
        <ExperienceList items={experience} />
      </JournalSection>
      <hr className="divider" />

      {/* Play: interaction and motion pieces, at most 8, in a bento. The "play" tab lands here. */}
      <JournalSection id="play" title="Play" note="A playground of small wins and features">
        <PlayBento items={playItems} />
      </JournalSection>
      <hr className="divider" />

      <JournalSection id="side-projects" title="Side projects" note="Some actions in pursuit of passion">
        <div className="side-grid">
          {sideProjects.map((project) => (
            <SideProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </JournalSection>
      <hr className="divider" />

      <JournalSection id="testimonials" title="Testimonials" note="Covers the boss and the crew">
        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </JournalSection>
    </main>
  );
}
