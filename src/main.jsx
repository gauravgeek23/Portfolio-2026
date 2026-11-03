import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';
import { initSounds } from './lib/sound';

// The shareable single-file preview has no server routes, so it keeps routing in memory.
const Router = import.meta.env.VITE_PREVIEW_BUNDLE ? MemoryRouter : BrowserRouter;

// Soft click sounds on links and buttons across the site (see lib/sound.js).
initSounds();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
