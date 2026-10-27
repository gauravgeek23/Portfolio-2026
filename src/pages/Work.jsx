import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';
import './Home.css';

export default function Work() {
  return (
    <main className="container page">
      <h1 className="text-medium">Selected work</h1>
      <div className="stack home__work-list">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
