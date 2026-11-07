import PlayMedia from '../components/PlayMedia';
import { playItems } from '../data/play';
import './Play.css';
import usePageMeta from '../hooks/usePageMeta';

export default function Play() {
  usePageMeta({
    title: 'Play',
    description: 'Interaction explorations, motion studies and side projects by Gaurav Kumar.',
  });
  return (
    <main className="container page" data-gallery>
      <header>
        <h1 className="text-medium">Play</h1>
        <p className="text-small text-muted">A playground of small wins and features.</p>
      </header>

      {/* A masonry wall of the pieces. Hovering one shows its title; clicking opens it larger, with
          what it is and its links. */}
      <div className="play-wall">
        {playItems.map((item) => (
          <article className="play-item" key={item.title}>
            <h2 className="visually-hidden">{item.title}</h2>
            <PlayMedia media={item.media} details={item} />
          </article>
        ))}
      </div>
    </main>
  );
}
