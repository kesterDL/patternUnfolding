import React from "react";
import { Helmet } from "react-helmet";
import styles from "./Hero_Banner.module.css";
import banner from "../../images/tyler-lastovich-8_LZ9UWTKLE-unsplash.jpg";
import skyline from "../../images/mountain_skyline.svg";
import headphones from "../../logos/headphone.svg";
import eyeglasses from "../../logos/eyeglasses.svg";
import fox from "../../logos/fox.svg";
import Header from "../Header/Header";

function Hero_Banner() {
  return (
    <>
      <Helmet>
        <title>Unfolding the Pattern</title>
        <meta name="description" content="Wheel of Time Podcast" />
      </Helmet>
      <div className={styles.overlay}>
        <Header />
      </div>
      <div className={styles.fullWidthImageContainer}>
        <img
          src={banner}
          alt="Dragonmount Pattern Unfolding | Photo by Tyler Lastovich on Unsplash https://unsplash.com/@lastly"
          className={styles.backgroundImage}
        />
        <div className={styles.actionCenter}>
          <div className={styles.podcastTitle}>The Pattern Unfolds</div>
          <div className={styles.subTitle}>- weaves of the wheel -</div>
          <div className={styles.listen}>
            <img
              src={headphones}
              alt="Listen to The Pattern Unfolding"
              className={styles.headphones}
            />
            <div>Listen | Watch</div>
          </div>
          <div className={styles.learnPlay}>
            <div className={styles.secondaryLink}>
              <img
                src={eyeglasses}
                alt="Listen to The Pattern Unfolding"
                className={styles.eyeglasses}
              />
              <div>Learn</div>
            </div>
            <div className={styles.secondaryLink}>
              <img
                src={fox}
                alt="Listen to The Pattern Unfolding"
                className={styles.fox}
              />
              <div>Play</div>
            </div>
          </div>
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

export default Hero_Banner;
