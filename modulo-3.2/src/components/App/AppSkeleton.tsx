import React from 'react';
import styles from './AppSkeleton.module.scss';

export const AppSkeleton: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      {/* Título */}
      <div className={styles.title}></div>
      
      {/* Contenedor de imágenes */}
      <div className={styles.imageContainer}>
        <div className={styles.image}></div>
        <div className={styles.image}></div>
      </div>
    </div>
  );
}; 