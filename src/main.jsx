import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { initTheme } from './theme.js';

initTheme(); // <-- this must run before React mounts

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
