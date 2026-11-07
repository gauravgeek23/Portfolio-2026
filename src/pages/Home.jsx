import Intro from '../components/Intro';
import JournalSection from '../components/JournalSection';
import ProjectCard from '../components/ProjectCard';
import SideProjectCard from '../components/SideProjectCard';
import ExperienceList from '../components/ExperienceList';
import TestimonialCard from '../components/TestimonialCard';
import { projects, sideProjects } from '../data/projects';
import { experience } from '../data/experience';
import { testimonials } from '../data/testimonials';
import './Home.css';
import usePageMeta from '../hooks/usePageMeta';

// The home page: the hero, then sections with their title and note in a margin (JournalSection).
export default function Home() {
  usePageMeta({});
  return (
    <main className="container page">
      <Intro />

      <hr className="divider" />

      <JournalSection id="work" title="Selected work" note="Reach out for more details">
        <div className="work-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
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

      <JournalSection id="experience" title="Work Experience" note="Chapters of My Journey">
        <ExperienceList items={experience} />
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
