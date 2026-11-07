import { Link } from 'react-router-dom';
import PlayMedia from '../components/PlayMedia';
import arrowUpRight from '../assets/icons/arrow-up-right.svg';
import Icon from '../components/Icon';
import { playItems } from '../data/play';
import './Play.css';
import usePageMeta from '../hooks/usePageMeta';

function PlayLink({ link }) {
  const content = (
    <>
      <span>{link.label}</span>
      <Icon src={arrowUpRight} />
    </>
  );
  return link.to ? (
    <Link className="play-item__link" to={link.to}>
      {content}
    </Link>
  ) : (
    <a className="play-item__link" href={link.href} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}

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

      {/* A masonry wall of the pieces. The title, a line about it and its links rise over the piece
          on hover; touch screens show them under it. */}
      <div className="play-wall">
        {playItems.map((item) => (
          <article className="play-item" key={item.title}>
            <PlayMedia media={item.media} />
            <div className="play-item__info">
              <h2 className="text-medium">{item.title}</h2>
              {item.description && <p className="text-small play-item__desc">{item.description}</p>}
              {item.links && (
                <div className="play-item__links">
                  {item.links.map((link) => (
                    <PlayLink key={link.label} link={link} />
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
