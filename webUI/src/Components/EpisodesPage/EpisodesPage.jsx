import React from "react";
import { Helmet } from "react-helmet";
import styles from "./EpisodesPage.module.css";
import EpisodeHeroBanner from "./EpisodeHeroBanner";

function EpisodesPage() {
  return (
    <>
      <Helmet>
        <title>The Pattern Unfolds</title>
        <meta
          name="description"
          content="Wheel of Time discussions, art, and nerd out safe space."
        />
      </Helmet>
      <EpisodeHeroBanner />
    </>
  );
}

export default EpisodesPage;
