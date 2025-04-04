import React, { lazy, Suspense } from 'react';
import { EnvInfoSkeleton } from './EnvInfoSkeleton';

// Importar el componente EnvInfo de forma diferida
const EnvInfoLazy = lazy(() => import('./EnvInfo'));

export const LazyEnvInfo: React.FC = () => {
  return (
    <Suspense fallback={<EnvInfoSkeleton />}>
      <EnvInfoLazy />
    </Suspense>
  );
}; 