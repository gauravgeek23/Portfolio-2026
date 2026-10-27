import SideProjectCard from '../components/SideProjectCard';
import { sideProjects } from '../data/projects';
import './Home.css';

export default function Play() {
  return (
    <main className="container page">
      <header>
        <h1 className="text-medium">Side projects</h1>
        <p className="text-small text-muted">Some actions in pursuit of passion</p>
      </header>
      <div className="side-grid">
        {sideProjects.map((project) => (
          <SideProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
