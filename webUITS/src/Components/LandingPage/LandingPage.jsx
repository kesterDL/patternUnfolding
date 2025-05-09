import React from "react";
import { Helmet } from "react-helmet";
import styles from "./LandingPage.module.css";
import Hero_Banner from "../Home_Page_Banner/Hero_Banner";
import HeroTile from "../shared-components/LatestEpisodeTile/HeroTile";
import ExploreTile from "./NavTiles/ExploreTile";
import ArtTile from "./NavTiles/ArtTile";
import CommunityStories from "./NavTiles/CommunityStoriesTile";

function LandingPage() {
  return (
    <>
      <Helmet>
        <title>The Pattern Unfolds</title>
        <meta
          name="description"
          content="Wheel of Time discussions, art, and nerd out safe space."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Helmet>
      <Hero_Banner />
      <div className={styles.column}>
        <div className={styles.App}>
          <h2 className={styles.sectionTitle}>- Latest Episode -</h2>
          <HeroTile />
          <div className={styles.exploreSection}>
            <h2 className={styles.sectionTitle}>- Explore the Pattern -</h2>
            <div className={styles.cards}>
              <ExploreTile />
              <ArtTile />
              <CommunityStories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
