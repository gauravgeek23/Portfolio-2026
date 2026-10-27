import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PlayMedia from '../components/PlayMedia';
import arrowUpRight from '../assets/icons/arrow-up-right.svg';
import Icon from '../components/Icon';
import { playItems } from '../data/play';
import './Play.css';

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
  return (
    <main className="container page" data-gallery>
      <header>
        <h1 className="text-medium">Play</h1>
        <p className="text-small text-muted">A playground of small wins and features.</p>
      </header>

      {playItems.map((item) => (
        <Fragment key={item.title}>
          <article className="play-item">
            <PlayMedia media={item.media} />
            <div>
              <div className="play-item__heading">
                <h2 className="text-medium">{item.title}</h2>
                {item.links && (
                  <div className="play-item__links">
                    {item.links.map((link) => (
                      <PlayLink key={link.label} link={link} />
                    ))}
                  </div>
                )}
              </div>
              {item.description && <p className="text-small text-muted">{item.description}</p>}
            </div>
          </article>
          {item.divider && <hr className="divider" />}
        </Fragment>
      ))}
    </main>
  );
}
