import React from "react";
import styles from "./EpisodeTile.module.css";

function EpisodeTile({ episode, onStreamerClick }) {
  return (
    <div className={styles.episodeTile}>
      <div className={styles.episodeImage}>
        <img src={episode.imageSrc} alt={`Listen to ${episode.title}`} />
      </div>
      <div className={styles.episodeInfo}>
        <div className={styles.episodeTitle}>{episode.title}</div>
        <div className={styles.episodeDescription}>{episode.description}</div>
        <div className={styles.streamingChannels}>
          {episode.streamers.map((streamer, index) => (
            <div
              key={index}
              className={styles.streamerCardLink}
              onClick={() => onStreamerClick(streamer.url)}
            >
              <img
                src={streamer.logo}
                alt={`Listen to ${episode.title} on ${streamer.name}`}
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
