import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navItems } from '../data/site';
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

  // Already on home: scroll there smoothly instead of re-navigating.
  const goToTop = (e) => {
    if (!onHome) return;
    e.preventDefault();
    window.scrollTo({ top: 0 });
    if (hash) navigate('/', { replace: true });
  };
  const goToSection = (section) => (e) => {
    if (!onHome) return;
    e.preventDefault();
    document.getElementById(section)?.scrollIntoView();
    if (hash !== `#${section}`) navigate({ pathname: '/', hash: `#${section}` }, { replace: true });
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
      </nav>
    </header>
  );
}
