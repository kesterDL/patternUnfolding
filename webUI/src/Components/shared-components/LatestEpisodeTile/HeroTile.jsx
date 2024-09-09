import React from "react";
import { Helmet } from "react-helmet";
import styles from "./HeroTile.module.css";
import latest from "../../../images/peter-conlan-axYF1KFjoDY-unsplash.jpg";
import wreath from "../../../logos/wovenWreath.svg";

function HeroTile() {
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
            Black Rider. Walking the well tred path of Tolkien, then going
            beyond.
          </p>
          <div className={styles.listenNow}>Listen Now</div>
        </div>
      </div>
    </>
  );
}

export default HeroTile;
