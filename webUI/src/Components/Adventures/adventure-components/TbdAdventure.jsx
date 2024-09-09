import MediaTile from "../../shared-components/MediaTile";
import styles from "./TbdAdventure.module.css";
import React from "react";

function TbdAdventure() {
  const tbdAdventureImg = (
    <img
      className={styles.tbdAdventureImg}
      src="Blue_Ice_D20_192px.png"
      alt="DnD | D&D | Dungeons & Dragons | Critical Role"
    />
  );

  const tbdAdventureDesc =
    "ᛞᚢᛖ ᛏᛟ ᛏᚺᛖ ᚢᚾᛈᚱᛖᛞᛁᚲᛏᚨᛒᛚᛖ ᚾᚨᛏᚢᚱᛖ ᛟᚠ ᚨᛞᚡᛖᚾᛏᚢᚱᛖᛋ, ᚹᛖ ᛞᛟᚾ'ᛏ ᚴᚾᛟᚹ ᚹᚺᚨᛏ ᛋᚺᛟᚢᛚᛞ ᛒᛖ ᚹᚱᛁᛏᛏᛖᚾ ᚺᛖᚱᛖ. ᚠᛟᚱ ᛁᚾᛞᛖᛖᛞ ᛁᚠ ᛖᚡᛖᚾᛏᛋ ᚹᛖᚱᛖ ᛋᚲᚱᛁᛈᛏᛖᛞ ᛟᚱ ᛖᚡᛖᚾ ᛗᛁᛚᛞᛚᚤ ᛈᚱᛖᛞᛁᚲᛏᚨᛒᛚᛖ, ᛁᛏ ᚹᛟᚢᛚᛞ ᚾᛟᛏ ᛒᛖ ᚨᚾ ᚨᛞᚡᛖᚾᛏᚢᚱᛖ.";
  /**
   * Due to the unpredictable nature of adventures, we don't know what should be written here.
   * For indeed if events were scripted or even mildly predictable, it would not be an adventure.
   */

  return (
    <MediaTile
      imageElement={tbdAdventureImg}
      title="ᚨᛞᚡᛖᚾᛏᚢᚱᛖ ᚢᚾᚴᚾᛟᚹᚾ"
      /*Adventure Unknown*/
      description={tbdAdventureDesc}
    ></MediaTile>
  );
}

export default TbdAdventure;
