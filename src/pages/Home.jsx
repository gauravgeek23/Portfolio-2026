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

// The home page as a field journal: the hero, then numbered sections, each with its title and a
// handwritten note in the margin (JournalSection).
export default function Home() {
  usePageMeta({});
  return (
    <main className="container page">
      <Intro />

      <hr className="divider" />

      <JournalSection index={1} id="work" title="Selected work" note="Reach out for more details">
        <div className="work-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </JournalSection>

      <hr className="divider" />

      <JournalSection index={2} id="side-projects" title="Side projects" note="Some actions in pursuit of passion">
        <div className="side-grid">
          {sideProjects.map((project) => (
            <SideProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </JournalSection>

      <hr className="divider" />

      <JournalSection index={3} id="experience" title="Work Experience" note="Chapters of my journey">
        <ExperienceList items={experience} />
      </JournalSection>

      <hr className="divider" />

      <JournalSection index={4} id="testimonials" title="Testimonials" note="Covers the boss and the crew">
        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} testimonial={t} />
          ))}
        </div>
      </JournalSection>
    </main>
  );
}
