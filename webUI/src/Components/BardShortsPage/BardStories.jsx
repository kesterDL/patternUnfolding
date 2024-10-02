import React from "react";
import { Helmet } from "react-helmet";
import styles from "./BardStories.module.css";
import ValersNest from "../Stories/story-components/ValersNest";
import StarlessSky from "../Stories/story-components/ExploreTile";
import Placeholder from "../Stories/story-components/StoryTile";
import BardStoriesHeroBanner from "./BardStoriesHeroBanner";

function BardStories() {
  return (
    <>
      <Helmet>
        <title>Unfolding the Pattern</title>
        <meta
          name="description"
          content="Dungeons & Dragons (D&D) stories. Bards share DnD stories without all the boring stuff. Just the epic adventure part."
        />
      </Helmet>
      <BardStoriesHeroBanner />
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.valersContainer}>
            <ValersNest />
            <StarlessSky />
            <Placeholder />
          </div>
        </div>
      </div>
    </>
  );
}

export default BardStories;
