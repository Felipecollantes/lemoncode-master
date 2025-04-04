import React from 'react';
import styles from './EnvInfo.module.scss';

interface EnvVarInfo {
  key: string;
  value: string;
}

export const EnvInfo: React.FC = () => {
  // Obtener variables de entorno de Vite
  const envVars: EnvVarInfo[] = [
    {
      key: 'NODE_ENV',
      value: import.meta.env.MODE || 'development'
    },
    {
      key: 'Entorno',
      value: import.meta.env.DEV ? 'Desarrollo (servidor de desarrollo)' : 'Producción (build optimizado)'
    },
    {
      key: 'PROD',
      value: import.meta.env.PROD ? 'true' : 'false'
    },
    {
      key: 'DEV',
      value: import.meta.env.DEV ? 'true' : 'false'
    },
    {
      key: 'BASE_URL',
      value: import.meta.env.BASE_URL || '/'
    }
  ];

  return (
    <div className={styles.envContainer}>
      <h2 className={styles.envTitle}>Información del Entorno</h2>
      <div className={styles.envList}>
        {envVars.map((item, index) => (
          <div key={index} className={styles.envItem}>
            <span className={styles.envLabel}>{item.key}:</span>
            <span className={styles.envValue}>{item.value}</span>
          </div>
        ))}
      </div>
      {import.meta.env.PROD ? (
        <div className={styles.envOptimized}>
          <p>✅ Bundle optimizado para producción:</p>
          <ul>
            <li>Tree-shaking aplicado</li>
            <li>Código minificado</li>
            <li>División de chunks</li>
            <li>Console logs eliminados</li>
          </ul>
        </div>
      ) : (
        <div className={styles.envDevelopment}>
          <p>⚙️ Modo de desarrollo activo:</p>
          <ul>
            <li>Hot Module Replacement (HMR)</li>
            <li>Sourcemaps completos</li>
            <li>Console logs preservados</li>
            <li>Sin minificación para mejor depuración</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EnvInfo; 