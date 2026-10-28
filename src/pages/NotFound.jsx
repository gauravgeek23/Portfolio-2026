import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { projects, sideProjects } from '../data/projects';
import './NotFound.css';

// What the "maps" card says while it tries (and fails) to find the page.
const REROUTES = [
  'Recalculating…',
  'No road found. Typical Ladakh.',
  'Rerouting via Umling La (19,024 ft)…',
  'Make a U-turn when possible.',
  'Signal lost. Enjoy the view.',
  'Your destination is on the other side of this mountain.',
  'Still recalculating. Have some chai.',
];

const ROAD = 'M -40 128 C 90 40, 200 170, 330 96 S 560 20, 680 92 S 800 150, 860 110';

// A little scrambler with its rider; a click pops a wheelie.
function Bike({ wheelie, onClick, bikeRef }) {
  return (
    <g ref={bikeRef} className={`nf-bike${wheelie ? ' is-wheelie' : ''}`} onClick={onClick}>
      <g transform="scale(1.45) translate(-34 -38)">
        <g className="nf-bike__body" style={{ transformOrigin: '12px 32px' }}>
          <circle className="nf-bike__wheel" cx="12" cy="32" r="9" />
          <circle className="nf-bike__wheel" cx="56" cy="32" r="9" />
          <path className="nf-bike__frame" d="M12 32 L26 20 L44 20 L56 32 M26 20 L34 32 L44 20 M44 20 L50 12" />
          <path className="nf-bike__tank" d="M28 13 h14 l3 7 h-19 z" />
          {/* Rider: helmet, back, arm to the bars */}
          <circle className="nf-bike__helmet" cx="34" cy="-2" r="6" />
          <path className="nf-bike__rider" d="M32 4 L28 16 L36 20 M31 7 L45 11" />
          {/* A flag on the back, of course */}
          <path className="nf-bike__pole" d="M10 22 L4 2" />
          <path className="nf-bike__flag" d="M4 2 l12 2 l-1 7 l-12 -2 z" />
        </g>
      </g>
    </g>
  );
}

// 404: you've ridden off the map. A yellow Border Roads milestone marks "404 Pass", a bike rides
// a winding road under prayer flags, and a maps card keeps recalculating.
export default function NotFound() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [wheelie, setWheelie] = useState(false);
  const [wobble, setWobble] = useState(0);
  const road = useRef(null);
  const bike = useRef(null);

  // Ride the bike along the road, nose following the bends, over and over (9s a lap).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const path = road.current;
    const length = path.getTotalLength();
    let frame;
    const start = performance.now();
    const ride = (now) => {
      const at = (((now - start) / 9000) % 1) * length;
      const p = path.getPointAtLength(at);
      const q = path.getPointAtLength(Math.min(length, at + 1));
      const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
      bike.current?.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${angle})`);
      frame = requestAnimationFrame(ride);
    };
    frame = requestAnimationFrame(ride);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % REROUTES.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!wheelie) return undefined;
    const t = setTimeout(() => setWheelie(false), 1200);
    return () => clearTimeout(t);
  }, [wheelie]);

  const detour = () => {
    const all = [...projects, ...sideProjects];
    navigate(`/work/${all[Math.floor(Math.random() * all.length)].slug}`);
  };

  return (
    <main className="container page nf">
      {/* Prayer flags strung across the top, fluttering. */}
      <div className="nf-flags" aria-hidden="true">
        {Array.from({ length: 15 }, (_, i) => (
          <span key={i} style={{ '--i': i }} />
        ))}
      </div>

      <div className="nf-scene">
        {/* Contour lines, like a topo map, drifting slowly behind everything. */}
        <svg className="nf-topo" viewBox="0 0 800 420" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <path
              key={k}
              d={`M -50 ${120 + k * 40} C 150 ${60 + k * 40}, 280 ${200 + k * 34}, 420 ${130 + k * 38} S 700 ${70 + k * 42}, 860 ${150 + k * 36}`}
            />
          ))}
        </svg>

        <div className="nf-maps" role="status" aria-live="polite">
          <span className="nf-maps__dot" />
          <span key={step} className="nf-maps__text">
            {REROUTES[step]}
          </span>
        </div>

        <button
          type="button"
          className="nf-milestone"
          onClick={() => setWobble((w) => w + 1)}
          aria-label="404 Pass milestone"
          key={wobble}
        >
          <span className="nf-milestone__cap" />
          <span className="nf-milestone__flag" />
          <span className="nf-milestone__small">Border Roads welcomes you to</span>
          <span className="nf-milestone__big">404 PASS</span>
          <span className="nf-milestone__small">Altitude: 404 ft · Page: not found</span>
          <span className="nf-milestone__tiny">Drive slow. Enjoy the mountains.</span>
        </button>

        <svg className="nf-road" viewBox="0 0 800 170" aria-label="A motorcycle riding a winding mountain road">
          <path ref={road} className="nf-road__edge" d={ROAD} />
          <path className="nf-road__lane" d={ROAD} />
          <Bike bikeRef={bike} wheelie={wheelie} onClick={() => setWheelie(true)} />
        </svg>
      </div>

      <section className="nf-copy">
        <h1 className="nf-title">Well, this road doesn’t exist.</h1>
        <p className="text-muted">
          I’ve ridden 6,000 km across Ladakh and over 20 high passes, and I’ve still never been this lost. The page
          you’re after has gone off-map, probably chasing a sunset.
        </p>
        <div className="nf-actions">
          <Link className="nf-btn nf-btn--primary" to="/">
            Make a U-turn, go home
          </Link>
          <button type="button" className="nf-btn" onClick={detour}>
            Take a random detour
          </button>
          <Link className="nf-btn" to="/about">
            See where I actually went
          </Link>
        </div>
        <p className="nf-hint">psst… click the bike. and the milestone.</p>
      </section>
    </main>
  );
}
