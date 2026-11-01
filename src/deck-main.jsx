import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Deck from './pages/deck/Deck';
import './styles/global.css';

// Standalone entry for the interview deck (vite.deck.config.js): the same deck as /projectppt,
// built as its own HTML file with relative assets so it runs offline from a folder.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Deck />
  </StrictMode>,
);
