import React, { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { App } from '@components/App';

// Renderizar el componente App, que maneja la carga diferida
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

