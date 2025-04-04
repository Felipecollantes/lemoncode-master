import React, { lazy, Suspense } from 'react';
import { AppSkeleton } from './AppSkeleton';

// Importar Home de forma diferida
const LazyHome = lazy(() => import('../Home'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<AppSkeleton />}>
      <LazyHome />
    </Suspense>
  );
};

export { App };
export default App; 