import React from "react";
import { Helmet } from "react-helmet";
import styles from "./ExploreTheMindHeroBanner.module.css";
import skyline from "../../images/mountain_skyline.svg";
import Header from "../Header/Header";
import gallery from "../../images/claudio-testa-iqeG5xA96M4-unsplash.webp";

function ExploreTheMindHeroBanner() {
  return (
    <>
      <Helmet>
        <title>Explore the Pattern</title>
        <meta name="description" content="Wheel of Time Podcast" />
      </Helmet>
      <div className={styles.overlay}>
        <Header />
      </div>
      <div className={styles.fullWidthImageContainer}>
        <img
          src={gallery}
          alt="Art Gallery | Photo by Claudio Testa on Unsplash https://unsplash.com/@claudiotesta"
          className={styles.backgroundImage}
        />
        <div className={styles.actionCenter}>
          <div className={styles.artTitle}>Threads of the Pattern</div>
        </div>
        <div className={styles.gradientOverlay}>
          <img
            src={skyline}
            alt="Wheel of Time Skyline"
            className={styles.gradientOverlay}
          />
        </div>
      </div>
    </>
  );
}

export default ExploreTheMindHeroBanner;
