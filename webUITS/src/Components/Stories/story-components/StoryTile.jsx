import React from "react";
import styles from "./StoryTile.module.css";
import PropTypes from "prop-types";

function StoryTile({ imageElement, title, description, storyLink }) {
  return (
    <div className={styles.storyContainer}>
      <div className={styles.storyImgContainer}>
        <img src={imageElement} alt="Story Cover Art" />
      </div>
      <div className={styles.textContainer}>
        <h2 className={`${styles.title} title`}>{title}</h2>
        <h4 className={`${styles.description} description`}>{description}</h4>
      </div>
      <div className={styles.button}>Read Now</div>
    </div>
  );
}

StoryTile.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageElement: PropTypes.element.isRequired,
  storyLink: PropTypes.string.isRequired,
};

export default StoryTile;
