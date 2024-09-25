import React from "react";
import styles from "./EpisodeTile.module.css";

function EpisodeTile({ imageSrc, title, description, streamers }) {
  return (
    <div className={styles.episodeTile}>
      <div className={styles.episodeImage}>
        <img src={imageSrc} alt={`Listen to ${title}`} />
      </div>
      <div className={styles.episodeInfo}>
        <div className={styles.episodeTitle}>{title}</div>
        <div className={styles.episodeDescription}>{description}</div>
        <div className={styles.streamingChannels}>
          {streamers.map((streamer, index) => (
            <div key={index} className={styles.streamerCardLink}>
              <img
                src={streamer.logo}
                alt={`Listen to ${title} on ${streamer.name}`}
                className={styles.streamer_logo}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EpisodeTile;
