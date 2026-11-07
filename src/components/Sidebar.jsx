import { Link, useLocation, useNavigate } from 'react-router-dom';
import Intro from './Intro';
import { ThemeToggle } from './Nav';
import useHomeSection, { scrollToSection } from '../hooks/useHomeSection';
import './Sidebar.css';

// The tabs, as a vertical list. "work" is the home page (projects, side projects, experience,
// testimonials) and every case study under /work; "play" is the Play section of the home page.
const TABS = [
  { label: 'work', to: '/', section: 'work' },
  { label: 'play', to: '/', section: 'play' },
  { label: 'notes', to: '/notes' },
  { label: 'about', to: '/about' },
  { label: 'resume', to: '/resume' },
];

// The wide layout's left panel: who I am (the book, name, role and the intro with company logos)
// and the navigation. It stays put while the content on the right scrolls.
export default function Sidebar() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === '/';
  const homeSection = useHomeSection(onHome);

  const isActive = (tab) => {
    if (tab.section === 'play') return onHome && homeSection === 'play';
    if (tab.section === 'work') return (onHome && homeSection !== 'play') || pathname.startsWith('/work');
    return pathname.startsWith(tab.to);
  };

  // A home-page section: on the home page, glide to it; from another page, open the home page and
  // glide down (Layout's glide) for play, or open at the top for work.
  const go = (tab) => (e) => {
    if (!tab.section) return;
    e.preventDefault();
    if (onHome) {
      if (tab.section === 'work') window.scrollTo({ top: 0, behavior: 'smooth' });
      else scrollToSection(tab.section);
      const next = tab.section === 'work' ? '' : `#${tab.section}`;
      if (hash !== next) navigate({ pathname: '/', hash: next }, { replace: true, state: { inPage: true } });
      return;
    }
    if (tab.section === 'work') navigate('/');
    else navigate({ pathname: '/', hash: `#${tab.section}` }, { state: { glide: true } });
  };
  return (
    <aside className="sidebar">
      <Intro side />
      <nav className="sidebar__nav" aria-label="Main">
        <ul>
          {TABS.map((tab) => {
            const active = isActive(tab);
            return (
              <li key={tab.label}>
                <Link
                  to={tab.section && tab.section !== 'work' ? { pathname: tab.to, hash: `#${tab.section}` } : tab.to}
                  onClick={go(tab)}
                  className={`sidebar__link${active ? ' is-active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <ThemeToggle />
      </nav>
    </aside>
  );
}
