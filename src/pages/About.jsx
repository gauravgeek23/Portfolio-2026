import Photo from '../components/Photo';
import LayeredHero from '../components/LayeredHero';
import { about, stories, photos } from '../data/about';
import { site } from '../data/site';
import './About.css';

function Story({ story }) {
  const [main, ...side] = story.photos;
  return (
    <article className="story">
      <div className="story__collage">
        <Photo className="story__main" photo={main} />
        <div className="story__side">
          {side.map((photo) => (
            <Photo key={photo.alt} photo={photo} style={{ flexGrow: photo.weight }} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-medium">{story.title}</h2>
        <p className="text-small text-muted">{story.body}</p>
      </div>
    </article>
  );
}

export default function About() {
  return (
    <main className="container page about">
      <section className="about__intro">
        <header>
          <h1 className="text-medium">About</h1>
          <p className="text-small text-muted">{site.name}</p>
        </header>
        <LayeredHero className="about__hero" photo={about.hero} />
        <h2 className="visually-hidden">Expeditions</h2>
        <p className="text-small text-muted">
          Beyond pixels, I’m an avid traveler and motorcyclist with a curious mind for{' '}
          <strong className="about__highlight">geopolitics, economics, and human evolution</strong>. Recently, I spent two
          months in <strong className="about__highlight">Ladakh, covering 6,000 km on my motorcycle</strong>. If there’s
          one product I can’t stop admiring, it’s <strong className="about__highlight">Google Maps</strong>. Where
          geography, exploration, and great product thinking meet.
        </p>
      </section>

      <hr className="divider" />

      {stories.map((story) => (
        <Story key={story.title} story={story} />
      ))}

      <hr className="divider" />

      <section className="stack" aria-labelledby="photos">
        <header>
          <h2 className="text-medium" id="photos">
            Photos and captures
          </h2>
          <p className="text-small text-muted">Visual notes from places and pauses</p>
        </header>

        <div className="about__photos">
          {photos.map((photo) => (
            <Photo key={photo.alt} photo={photo} />
          ))}
        </div>

        <div className="text-small text-muted">
          <p>
            Since I started traveling, I found a deep love for capturing moments. Each photo tells a story — quiet, honest,
            and often personal. These are a few shots that made it to my portfolio.
          </p>
          <p className="about__more">Check more on</p>
          <a className="about__instagram text-medium" href={site.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </section>
    </main>
  );
}
