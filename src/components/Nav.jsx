import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navItems } from '../data/site';
import { COLOUR_SWATCH, useTheme } from '../hooks/useTheme';
import './Nav.css';

// On the home page the underline sits on "gk." until the Selected work heading
// scrolls up into the top part of the screen, then it moves to "work".
function useHomeSection(enabled) {
  const [section, setSection] = useState('home');

  useEffect(() => {
    if (!enabled) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const heading = document.getElementById('work');
      if (!heading) return;
      const threshold = Math.min(window.innerHeight / 2, 360);
      setSection(heading.getBoundingClientRect().top <= threshold ? 'work' : 'home');
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled]);

  return section;
}

const SUN = (
  <>
    <circle cx="10" cy="10" r="3.25" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M10 2.5v1.75M10 15.75v1.75M2.5 10h1.75M15.75 10h1.75M4.7 4.7l1.24 1.24M14.06 14.06l1.24 1.24M4.7 15.3l1.24-1.24M14.06 5.94l1.24-1.24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </>
);

const MOON = (
  <path
    d="M16.25 11.9A6.5 6.5 0 0 1 8.1 3.75a6.5 6.5 0 1 0 8.15 8.15Z"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinejoin="round"
  />
);

// Ink drop, half filled with the colour theme that comes next.
const drop = (fill) => (
  <>
    <path
      d="M10 2.75c2.6 3.05 5 5.9 5 8.85a5 5 0 0 1-10 0c0-2.95 2.4-5.8 5-8.85Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path d="M5.75 12.25h8.5a4.25 4.25 0 0 1-8.5 0Z" fill={fill} />
  </>
);

// The toggle cycles light → dark → colour (red, blue, green, yellow in turn) → light;
// its icon shows the mode you'll go to next.
function ThemeToggle() {
  const [theme, toggle, nextColour] = useTheme();
  let label = 'Switch to light mode';
  let title = 'Light mode';
  let icon = SUN;
  if (theme === 'light') {
    label = 'Switch to dark mode';
    title = 'Dark mode';
    icon = MOON;
  } else if (theme === 'dark') {
    label = `Switch to ${nextColour} mode`;
    title = `${nextColour[0].toUpperCase()}${nextColour.slice(1)} mode`;
    icon = drop(COLOUR_SWATCH[nextColour]);
  }
  return (
    <button type="button" className="nav__theme" onClick={toggle} aria-label={label} title={title}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        {icon}
      </svg>
    </button>
  );
}

export default function Nav() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === '/';
  const homeSection = useHomeSection(onHome);

  // Which item is underlined: "home" (the gk. logo) or a tab's label.
  let active;
  if (onHome) active = homeSection === 'work' ? 'work' : 'home';
  else if (pathname.startsWith('/work')) active = 'work';
  else active = navItems.find((item) => item.to !== '/' && pathname.startsWith(item.to))?.label;

  // Already on home: glide there instead of re-navigating. The URL is updated with
  // `inPage` so Layout doesn't jump to the target instantly.
  const behavior = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  const goToTop = (e) => {
    if (!onHome) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: behavior() });
    if (hash) navigate('/', { replace: true, state: { inPage: true } });
  };
  const goToSection = (section) => (e) => {
    if (!onHome) return;
    e.preventDefault();
    document.getElementById(section)?.scrollIntoView({ behavior: behavior() });
    if (hash !== `#${section}`) {
      navigate({ pathname: '/', hash: `#${section}` }, { replace: true, state: { inPage: true } });
    }
  };

  const linkProps = (isActive) => ({
    className: `nav__link${isActive ? ' nav__link--active' : ''}`,
    'aria-current': isActive ? 'page' : undefined,
  });

  return (
    <header className="nav">
      <nav className="container nav__inner" aria-label="Main">
        <Link
          to="/"
          onClick={goToTop}
          aria-label="Gaurav Kumar, home"
          aria-current={active === 'home' ? 'page' : undefined}
          className={`nav__link nav__logo${active === 'home' ? ' nav__link--active' : ''}`}
        >
          gk<span className="nav__dot">.</span>
        </Link>
        <ul className="nav__list">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.section ? { pathname: item.to, hash: `#${item.section}` } : item.to}
                onClick={item.section ? goToSection(item.section) : undefined}
                {...linkProps(active === item.label)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
