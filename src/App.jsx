import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Work from './pages/Work';
import CaseStudy from './pages/CaseStudy';
import Play from './pages/Play';
import About from './pages/About';
import Notes from './pages/Notes';
import ComingSoon from './pages/ComingSoon';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<CaseStudy />} />
        <Route path="play" element={<Play />} />
        <Route path="notes" element={<Notes />} />
        <Route path="about" element={<About />} />
        <Route path="resume" element={<ComingSoon title="Resume" subtitle="Resume — coming soon." />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
