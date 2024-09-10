import React from "react";
import styles from "./MediaTile.module.css";
import PropTypes from "prop-types";

function MediaTile({ imageElement, title, description }) {
  return (
    <div className={styles.adventureContainer}>
      <div className={styles.adventureImgContainer}>
        <div className={styles.imageContainer}>{imageElement}</div>
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        <h4 className={styles.description}>{description}</h4>
      </div>
    </div>
  );
}

MediaTile.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageElement: PropTypes.element.isRequired,
};

export default MediaTile;
