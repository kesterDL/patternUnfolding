import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import styles from "./Reader.module.css";
import ValersNestStory from "../../../stories/ValersNestStoryText";

function Reader({
  storyTitle,
  storyText,
  coverImage,
  coverImageAlt,
  metaTitle,
  metaDescriptions,
}) {
  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescriptions} />
      </Helmet>
      <div className={styles.page}>
        <div className={styles.readingArea}>
          <div className={styles.bookCover}>
            <img
              src={coverImage}
              alt={coverImageAlt}
              className={styles.backgroundImage}
            />
            <div className={styles.podcastTitle}>
              <h1>{storyTitle}</h1>
            </div>
            <div className={styles.gradientOverlay}></div>
          </div>
          <div className={styles.storyText}>{storyText}</div>
        </div>
      </div>
    </>
  );
}

Reader.propTypes = {
  storyTitle: PropTypes.string.isRequired,
  storyText: PropTypes.element.isRequired,
  coverImage: PropTypes.element.isRequired,
  coverImageAlt: PropTypes.string.isRequired,
  metaTitle: PropTypes.string.isRequired,
  metaDescriptions: PropTypes.string.isRequired,
};

export default Reader;
