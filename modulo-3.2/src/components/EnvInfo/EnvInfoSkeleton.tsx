import React from 'react';
import styles from './EnvInfoSkeleton.module.scss';

export const EnvInfoSkeleton: React.FC = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.title}></div>
      <div className={styles.list}>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <div key={item} className={styles.item}>
            <div className={styles.label}></div>
            <div className={styles.value}></div>
          </div>
        ))}
      </div>
    </div>
  );
}; 