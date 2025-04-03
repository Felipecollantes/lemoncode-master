import React, { lazy, Suspense } from 'react';
import { AppSkeleton } from './AppSkeleton';

// Importar el componente Home de forma diferida
const HomeLazy = lazy(() => import('./Home').then(module => ({ default: module.Home })));

export const App: React.FC = () => {
  // Sin estado de carga artificial
  // Usamos directamente Suspense para manejar la carga del componente
  return (
    <Suspense fallback={<AppSkeleton />}>
      <HomeLazy />
    </Suspense>
  );
}; 