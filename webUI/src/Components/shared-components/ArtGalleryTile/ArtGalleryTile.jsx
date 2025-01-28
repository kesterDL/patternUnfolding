import React from "react";
import styles from "./ArtGalleryTile.module.css";
import placeholder from "../../../logos/tomoe_plain-min.svg"
import { useImageLoader } from "../../../Utilities/useImageLoader";

function ArtGalleryTile({
  imageSrc,
  title,
  artist,
  artistLink,
  imageLink,
  onClick,
}) {
  const displayedImage = useImageLoader(imageSrc, placeholder)

  return (
    <div className={styles.artTile} onClick={onClick}>
      <div className={styles.artImage}>
        <img src={displayedImage} alt={`Photo named ${title}`} />
      </div>
      <div className={styles.artInfo}>
        <div className={styles.artTitle}>{title}</div>
        <div className={styles.artistName}>{artist}</div>
      </div>
    </div>
  );
}

export default ArtGalleryTile;
