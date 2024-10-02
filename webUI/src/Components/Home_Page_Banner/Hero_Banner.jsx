import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Helmet } from "react-helmet";
import styles from "./Hero_Banner.module.css";
import banner from "../../images/tyler-lastovich-8_LZ9UWTKLE-unsplash.webp";
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
          {/* Wrap the 'listen' div in a Link to enable navigation */}
          <Link to="/episodes" className={styles.listen}>
            <img
              src={headphones}
              alt="Listen to The Pattern Unfolding"
              className={styles.headphones}
            />
            <div>Listen | Watch</div>
          </Link>
          <div className={styles.learnPlay}>
            <Link to="/threads" className={styles.secondaryLink}>
              <img
                src={eyeglasses}
                alt="Learn more about The Pattern Unfolding"
                className={styles.eyeglasses}
              />
              <div>Learn</div>
            </Link>
            <Link to="/artgallery" className={styles.secondaryLink}>
              <img
                src={fox}
                alt="Play games related to The Pattern Unfolding"
                className={styles.fox}
              />
              <div>Art</div>
            </Link>
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
