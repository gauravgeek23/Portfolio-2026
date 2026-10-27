import { Link, NavLink, useLocation } from 'react-router-dom';
import { navItems } from '../data/site';
import './Nav.css';

export default function Nav() {
  const { pathname } = useLocation();
  // "work" stays active on the home page and on every /work/* sub-page.
  const isActive = (to) => (to === '/' ? pathname === '/' || pathname.startsWith('/work') : pathname.startsWith(to));

  return (
    <header className="nav">
      <nav className="container nav__inner" aria-label="Main">
        <Link className="nav__logo" to="/" aria-label="Gaurav Kumar, home">
          gk<span className="nav__dot">.</span>
        </Link>
        <ul className="nav__list">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={`nav__link${isActive(item.to) ? ' nav__link--active' : ''}`}
                aria-current={isActive(item.to) ? 'page' : undefined}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
