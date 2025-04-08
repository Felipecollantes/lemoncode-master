import React from 'react';
import * as styles from './EnvInfo.module.scss';
import classNames from 'classnames';

const EnvInfo: React.FC = () => {
  const isProduction = process.env.IS_PRODUCTION === 'true';
  
  const containerClassName = classNames(
    styles.envContainer,
    isProduction ? styles.production : styles.development
  );

  return (
    <div className={containerClassName}>
      <h2>Información del Entorno</h2>
      <ul className={styles.infoList}>
        <li className={styles.infoItem}>
          <span className={styles.label}>Entorno:</span>
          {process.env.NODE_ENV}
        </li>
        <li className={styles.infoItem}>
          <span className={styles.label}>API URL:</span>
          {process.env.API_URL}
        </li>
        <li className={styles.infoItem}>
          <span className={styles.label}>STATIC URL:</span>
          {process.env.STATIC_URL}
        </li>
        <li className={styles.infoItem}>
          <span className={styles.label}>Es Desarrollo:</span>
          {process.env.IS_DEVELOPMENT}
        </li>
        <li className={styles.infoItem}>
          <span className={styles.label}>Es Producción:</span>
          {process.env.IS_PRODUCTION}
        </li>
        <li className={styles.infoItem}>
          <span className={styles.label}>Versión de la App:</span>
          {process.env.APP_VERSION}
        </li>
      </ul>
    </div>
  );
};

export { EnvInfo };

// Exportación por defecto para lazy loading
export default EnvInfo; 