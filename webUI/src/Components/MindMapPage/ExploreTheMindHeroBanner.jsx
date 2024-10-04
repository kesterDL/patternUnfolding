import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./ExploreTheMindHeroBanner.module.css";
import Header from "../Header/Header";
import pattern from "../../images/max-kleinen-GhrqMkA4cVA-unsplash.webp";

function ExploreTheMindHeroBanner() {
  return (
    <>
      <HelmetProvider>
        <div>
          <Helmet>
            <title>The Pattern Unfolds</title>
            <meta
              name="description"
              content="Wheel of Time discussions, art, and nerd out safe space."
            />
          </Helmet>
          {/* Rest of the page content */}
          <div className={styles.overlay}>
            <Header />
          </div>
          <div className={styles.fullWidthImageContainer}>
            <img
              src={pattern}
              alt="Pattern Threads | Photo by Max Kleinen on Unsplash https://unsplash.com/photos/black-and-white-abstract-painting-GhrqMkA4cVA"
              className={styles.backgroundImage}
            />
            <div className={styles.actionCenter}>
              <div className={styles.artTitle}>Threads of the Pattern</div>
            </div>
          </div>
        </div>
      </HelmetProvider>
    </>
  );
}

export default ExploreTheMindHeroBanner;
