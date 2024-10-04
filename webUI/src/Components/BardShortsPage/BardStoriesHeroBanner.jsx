import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./BardStoriesHeroBanner.module.css";
import skyline from "../../images/mountain_skyline.svg";
import Header from "../Header/Header";
import bardStories from "../../images/paul-schafer-t6oZEgL0z18-unsplash.webp";

function BardStoriesHeroBanner() {
  return (
    <>
      <HelmetProvider>
        <div>
          <Helmet>
            <title>Short Stories</title>
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
              src={bardStories}
              alt="Bard Stories | Photo by Paul Schafer on Unsplash https://unsplash.com/photos/book-lot-in-bookcase-t6oZEgL0z18"
              className={styles.backgroundImage}
            />
            <div className={styles.actionCenter}>
              <div className={styles.artTitle}>Bard Stories</div>
            </div>
            <div className={styles.gradientOverlay}>
              <img
                src={skyline}
                alt="Wheel of Time Skyline"
                className={styles.gradientOverlay}
              />
            </div>
          </div>
        </div>
      </HelmetProvider>
    </>
  );
}

export default BardStoriesHeroBanner;
