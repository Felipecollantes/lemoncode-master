import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './styles/index.scss';

const container = document.getElementById('root');

if (!container) {
  throw new Error('No se encontró el elemento con id "root"');
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
