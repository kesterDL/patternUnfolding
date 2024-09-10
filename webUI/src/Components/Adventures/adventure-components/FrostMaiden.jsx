import MediaTile from "../../shared-components/MediaTile";
import styles from "./FrostMaiden.module.css";
import React from "react";
import maidenLights from "../../../images/Frostmaiden_Lights.webp";

function FrostMaiden() {
  const frostMaidenImg = (
    <img
      className={styles.frostMaidenImg}
      src={maidenLights}
      alt="Rime of the Frostmaiden | DnD | D&D | Dungeons & Dragons"
    />
  );

  const frostMaidenDesc =
    "Join our adventure in the frozen north of Icewind Dale. Traversing frozen glaciers, battling deadly monsters, and navigating the unknown.";

  return (
    <MediaTile
      imageElement={frostMaidenImg}
      title="Icewind Dale: Rime of the Frostmaiden"
      description={frostMaidenDesc}
    ></MediaTile>
  );
}

export default FrostMaiden;
