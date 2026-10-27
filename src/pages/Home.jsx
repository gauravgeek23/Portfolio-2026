import Intro from '../components/Intro';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import SideProjectCard from '../components/SideProjectCard';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { projects, sideProjects } from '../data/projects';
import { testimonials } from '../data/testimonials';
import './Home.css';

export default function Home() {
  return (
    <main className="container page">
      <Intro />

      <hr className="divider" />

      <section className="stack" aria-labelledby="work">
        <SectionHeader id="work" title="Selected work" subtitle="Reach out for more details" />
        <div className="stack home__work-list">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <hr className="divider" />

      <section className="stack" aria-labelledby="side-projects">
        <SectionHeader id="side-projects" title="Side projects" subtitle="Some actions in pursuit of passion" />
        <div className="side-grid">
          {sideProjects.map((project) => (
            <SideProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <hr className="divider" />

      <section className="stack" aria-labelledby="testimonials">
        <SectionHeader id="testimonials" title="Testimonials" subtitle="Covers the boss and the crew" />
        <TestimonialCarousel testimonials={testimonials} />
      </section>
    </main>
  );
}
