import { Link, useLocation } from 'react-router-dom';
import Intro from './Intro';
import { ThemeToggle } from './Nav';
import './Sidebar.css';

// The tabs, as a vertical list. "work" is the home page (projects, side projects, experience,
// testimonials) and every case study under /work.
const TABS = [
  { label: 'work', to: '/', match: (p) => p === '/' || p.startsWith('/work') },
  { label: 'play', to: '/play' },
  { label: 'notes', to: '/notes' },
  { label: 'about', to: '/about' },
  { label: 'resume', to: '/resume' },
];

// The wide layout's left panel: who I am (the book, name, role and the intro with company logos)
// and the navigation. It stays put while the content on the right scrolls.
export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="sidebar">
      <Intro side />
      <nav className="sidebar__nav" aria-label="Main">
        <ul>
          {TABS.map((tab) => {
            const active = tab.match ? tab.match(pathname) : pathname.startsWith(tab.to);
            return (
              <li key={tab.label}>
                <Link
                  to={tab.to}
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
