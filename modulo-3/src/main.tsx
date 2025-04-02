import React, { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { Home } from './components/Home';

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <div>
//     <h1>Hello world from React</h1>
//   </div>
// );
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)

