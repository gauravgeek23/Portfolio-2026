import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

// The shareable single-file preview has no server routes, so it keeps routing in memory.
const Router = import.meta.env.VITE_PREVIEW_BUNDLE ? MemoryRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
