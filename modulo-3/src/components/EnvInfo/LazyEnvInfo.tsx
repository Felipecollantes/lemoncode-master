import React, { lazy, Suspense } from 'react';
import { EnvInfoSkeleton } from './EnvInfoSkeleton';

// Importar el componente de forma perezosa - sin retraso artificial
const EnvInfoLazy = lazy(() => import('./EnvInfo'));

// Componente envoltorio con Suspense
export const LazyEnvInfo: React.FC = () => {
  // Usar directamente Suspense sin retrasos artificiales
  return (
    <Suspense fallback={<EnvInfoSkeleton />}>
      <EnvInfoLazy />
    </Suspense>
  );
}; 