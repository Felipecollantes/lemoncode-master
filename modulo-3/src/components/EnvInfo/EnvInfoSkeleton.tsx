import React from 'react';
import * as styles from './EnvInfoSkeleton.module.scss';

export const EnvInfoSkeleton: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header} />
      <div className={styles.itemsContainer}>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <div 
            key={item}
            className={styles.item}
          >
            <div className={styles.itemLabel} />
            <div className={`${styles.itemValue} ${item % 2 === 0 ? styles.even : styles.odd}`} />
          </div>
        ))}
      </div>
    </div>
  );
}; 