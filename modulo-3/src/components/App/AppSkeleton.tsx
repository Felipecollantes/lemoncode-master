import React from 'react';
import * as styles from './AppSkeleton.module.scss';

export const AppSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Título Skeleton */}
      <div className={styles.title} />
      
      {/* Contenedor de imágenes Skeleton */}
      <div className={styles.logoContainer}>
        {/* Logo 1 Skeleton */}
        <div className={styles.logo} />
        
        {/* Logo 2 Skeleton */}
        <div className={styles.logo} />
      </div>
      
      {/* Skeleton para el componente de información */}
      <div className={styles.infoContainer}>
        <div className={styles.infoHeader} />
        <div className={styles.infoItemsContainer}>
          {[1, 2, 3, 4, 5, 6].map(item => (
            <div 
              key={item}
              className={styles.infoItem}
            >
              <div className={styles.infoItemLabel} />
              <div 
                className={`${styles.infoItemValue} ${item % 2 === 0 ? styles.even : styles.odd}`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 