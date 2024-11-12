import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./EpisodeHeroBanner.module.css";
import banner from "../../images/peter-conlan-axYF1KFjoDY-unsplash.webp";
import skyline from "../../images/mountain_skyline.svg";
import spotify from "../../logos/Spotify_Logo_only_RGB_Black.png";
import youtube from "../../logos/yt_logo_only_mono_light.png";
import applePodcast from "../../logos/Apple_Podcasts_Icon_blk_lg_060623.svg";
import Header from "../Header/Header";

function Episode_Hero_Banner() {
  const [player, setPlayer] = useState(null);

  const showPlayer = (type) => {
    switch (type) {
      case "spotify":
        setPlayer(
          <iframe
            style={{ borderRadius: "12px" }}
            src="https://podcasters.spotify.com/pod/show/weaveandthewheel/embed/episodes/The-Wind-Weaves--Wheel-of-Time-e2qjvrn/a-abk7o8v"
            width="100%"
            height="152" // Adjusted height for better layout
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Episode - The Wind Weaves"
          ></iframe>
        );
        break;
      case "youtube":
        setPlayer(
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/rvbFNRTTWH0?si=ZvWPrtpvf5i6HQp6"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        );
        break;
      case "applePodcast":
        setPlayer(
          <iframe
            title="applePodcast"
            allow="autoplay *; encrypted-media *;"
            height="175"
            style={{
              width: "100%",
              maxWidth: "660px",
              overflow: "hidden",
              borderRadius: "10px",
            }}
            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
            src="https://embed.podcasts.apple.com/us/podcast/the-wind-weaves-wheel-of-time/id1779188209?i=1000676574116"
          />
        );
        break;
      default:
        setPlayer(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>Episodes Woven</title>
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
            the Black Rider. Walking the well trod path of Tolkien, then going
            beyond. -
          </div>
          <div className={styles.streamingChannels}>
            <div
              className={styles.streamerLink}
              onClick={() => showPlayer("spotify")}
            >
              <img
                src={spotify}
                alt="Listen to The Pattern Unfolding on Spotify"
                className={styles.streamer_logo}
              />
              <div>Spotify</div>
            </div>
            <div
              className={styles.streamerLink}
              onClick={() => showPlayer("youtube")}
            >
              <img
                src={youtube}
                alt="Listen to The Pattern Unfolding on YouTube"
                className={styles.streamer_logo}
              />
              <div>YouTube</div>
            </div>
            <div
              className={styles.streamerLink}
              onClick={() => showPlayer("applePodcast")}
            >
              <img
                src={applePodcast}
                alt="Listen to The Pattern Unfolding on Apple Podcasts"
                className={styles.streamer_logo}
              />
              <div>Apple Podcast</div>
            </div>
          </div>
          {player && (
            <>
              <div
                className={styles.overlayBackground}
                onClick={() => setPlayer(null)}
              ></div>
              <div className={styles.playerContainer}>{player}</div>
            </>
          )}
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
