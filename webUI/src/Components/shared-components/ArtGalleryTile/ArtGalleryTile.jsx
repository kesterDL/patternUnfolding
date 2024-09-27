import React from "react";
import styles from "./ArtGalleryTile.module.css";

function ArtGalleryTile({
  imageSrc,
  title,
  artist,
  artistLink,
  imageLink,
  onClick,
}) {
  return (
    <div className={styles.artTile} onClick={onClick}>
      <div className={styles.artImage}>
        <img src={imageSrc} alt={`Photo named ${title}`} />
      </div>
      <div className={styles.artInfo}>
        <div className={styles.artTitle}>{title}</div>
        <div className={styles.artistName}>{artist}</div>
      </div>
    </div>
  );
}

export default ArtGalleryTile;
