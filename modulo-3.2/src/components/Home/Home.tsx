import React from 'react';
import { EnvInfo } from '../EnvInfo';
import styles from './Home.module.scss';

export const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bienvenido a la aplicación de React con Vite</h1>
      
      <div className={styles.imageContainer}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" 
          alt="Logo de React"
          className={styles.logo}
        />
        <img
          src="https://vitejs.dev/logo.svg"
          alt="Logo de Vite"
          className={styles.logo}
        />
      </div>
      
      <EnvInfo />
    </div>
  );
};

export default Home; 