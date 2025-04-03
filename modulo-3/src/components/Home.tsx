import React from "react";
import * as styles from "./Home.module.scss";
import logo1 from "@content/logo_1.png";
import logo2 from "@content/logo_2.png";
import { LazyEnvInfo } from "./LazyEnvInfo";

export const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello world from React!</h1>
      <div className={styles.imagesContainer}>
        <img className={styles.logo} src={logo1} alt="logo_1" />
        <img className={styles.logo} src={logo2} alt="logo_2" />
      </div>
      <LazyEnvInfo />
    </div>
  );
}