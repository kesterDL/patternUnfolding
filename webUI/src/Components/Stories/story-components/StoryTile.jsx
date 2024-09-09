import React from "react";
import styles from "./StoryTile.module.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function StoryTile({
  imageElement,
  title,
  description,
  storyLink,
  buttonText,
}) {
  return (
    <NavLink to={storyLink} style={{ textDecoration: "none" }}>
      <div className={styles.storyContainer}>
        <div className={styles.storyImgContainer}>{imageElement}</div>
        <div className={styles.textContainer}>
          <h2 className={`${styles.title} title`}>{title}</h2>
          <h4 className={`${styles.description} description`}>{description}</h4>
        </div>
        <div className={styles.button}>{buttonText}</div>
      </div>
    </NavLink>
  );
}

StoryTile.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageElement: PropTypes.element.isRequired,
  storyLink: PropTypes.string.isRequired,
};

export default StoryTile;
