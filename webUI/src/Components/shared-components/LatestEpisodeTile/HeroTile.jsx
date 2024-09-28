import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./HeroTile.module.css";
import wreath from "../../../logos/wovenWreath.svg";

function HeroTile() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPodcast = () => {
    setIsPlaying(true); // Show the Spotify player when clicked
  };

  return (
    <>
      <Helmet>
        <title>The Pattern Unfolds</title>
        <meta
          name="description"
          content="Wheel of Time discussions, art, and nerd out safe space."
        />
      </Helmet>
      <div className={styles.latestEpisodeTile}>
        <div className={styles.episode}>
          <img src={wreath} alt="Wheel of Time" className={styles.wreath} />
          <h3 className={styles.episodeTitle}>The Wind Weaves</h3>
          <p className={styles.description}>
            Opening the Eye of the World. Hot spiced cider, honey cakes, and the
            Black Rider. Walking the well-trodden path of Tolkien, then going
            beyond.
          </p>

          {/* Show the Listen Now button or the Spotify player */}
          {!isPlaying ? (
            <div className={styles.listenNow} onClick={handlePlayPodcast}>
              Listen Now
            </div>
          ) : (
            <div className={styles.spotifyPlayer}>
              <iframe
                style={{ borderRadius: "12px" }}
                src="https://open.spotify.com/embed/episode/0J5rVspYAeZlvvzlqussUS?utm_source=generator"
                width="100%"
                height="152" // Adjusted height for better layout
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Episode - The Wind Weaves"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HeroTile;
