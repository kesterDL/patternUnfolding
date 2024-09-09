import React from "react";
import { Helmet } from "react-helmet";
import styles from "./BardStories.module.css";
import ValersNest from "../Stories/story-components/ValersNest";
import StarlessSky from "../Stories/story-components/ExploreTile";
import Placeholder from "../Stories/story-components/StoreTile";

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
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.letter}>
            <h1 className={styles.title}>Cafe DnD Stories</h1>
            <p>
              While Dungeons & Dragons games are fun to watch, adventures can be
              long and uncomfortable things. Which is why we have Bards.
            </p>
            <p>
              Bards share the stories created during long games. Told in the
              cafe in short 20 minute episodes. No Dice Rolls. No Game Rules. No
              Player Characters. Just epic stories.
            </p>
          </div>
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
