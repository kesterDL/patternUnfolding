import React from "react";
import { Helmet } from "react-helmet";
import styles from "./EpisodeHeroBanner.module.css";
import banner from "../../images/peter-conlan-axYF1KFjoDY-unsplash.webp";
import skyline from "../../images/mountain_skyline.svg";
import spotify from "../../logos/Spotify_Logo_only_RGB_Black.png";
import youtube from "../../logos/yt_logo_only_mono_light.png";
import applePodcast from "../../logos/Apple_Podcasts_Icon_blk_lg_060623.svg";
import Header from "../Header/Header";

function Episode_Hero_Banner() {
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
          <div className={styles.episodeTitle}>The Wind Weaves</div>
          <div className={styles.episodeDescription}>
            - Opening the Eye of the World. Hot spiced cider, honey cakes, and
            the Black Rider. Walking the well tred path of Tolkien, then going
            beyond. -
          </div>
          <div className={styles.streamingChannels}>
            <div className={styles.streamerLink}>
              <img
                src={spotify}
                alt="Listen to The Pattern Unfolding"
                className={styles.streamer_logo}
              />
              <div>Spotify</div>
            </div>
            <div className={styles.streamerLink}>
              <img
                src={youtube}
                alt="Listen to The Pattern Unfolding"
                className={styles.streamer_logo}
              />
              <div>YouTube</div>
            </div>
            <div className={styles.streamerLink}>
              <img
                src={applePodcast}
                alt="Listen to The Pattern Unfolding"
                className={styles.streamer_logo}
              />
              <div>Apple Podcast</div>
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

export default Episode_Hero_Banner;
