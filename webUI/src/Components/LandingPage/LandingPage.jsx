import React from "react";
import { Helmet } from "react-helmet";
import styles from "./LandingPage.module.css";
import Hero_Banner from "../Home_Page_Banner/Hero_Banner";
import HeroTile from "../shared-components/LatestEpisodeTile/HeroTile";
import ExploreTile from "../Stories/story-components/ExploreTile";
import ArtTile from "../Stories/story-components/ArtTile";
import CommunityStories from "../Stories/story-components/CommunityStoriesTile";

function LandingPage() {
  return (
    <>
      <Helmet>
        <title>The Pattern Unfolds</title>
        <meta
          name="description"
          content="Wheel of Time discussions, art, and nerd out safe space."
        />
      </Helmet>
      <Hero_Banner />
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
    </>
  );
}

export default LandingPage;
