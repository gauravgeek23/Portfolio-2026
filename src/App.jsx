import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import CaseStudy from './pages/CaseStudy';
import Play from './pages/Play';
import About from './pages/About';
import Notes from './pages/Notes';
import Resume from './pages/Resume';
import NotFound from './pages/NotFound';

// The interview deck is a full-screen page of its own, loaded only when visited.
const Deck = lazy(() => import('./pages/deck/Deck'));

export default function App() {
  return (
    <Routes>
      <Route
        path="projectppt"
        element={
          <Suspense fallback={null}>
            <Deck />
          </Suspense>
        }
      />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<CaseStudy />} />
        <Route path="play" element={<Play />} />
        <Route path="notes" element={<Notes />} />
        <Route path="about" element={<About />} />
        <Route path="resume" element={<Resume />} />
        {/* Shareable contact links: the resume page opens, then glides down to the footer's contact details. */}
        <Route path="contact" element={<Navigate to="/resume#contact" replace state={{ glide: true }} />} />
        <Route path="contacts" element={<Navigate to="/resume#contact" replace state={{ glide: true }} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
