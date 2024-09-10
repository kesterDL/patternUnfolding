import React from "react";
import styles from "./Adventures.module.css";
import FrostMaiden from "./adventure-components/FrostMaiden";
import TbdAdventure from "./adventure-components/TbdAdventure";


function Adventures() {
  return (
    <div className={styles.adventureList}>
      <h1>Current Adventures</h1>
      <FrostMaiden />
      <h1>Upcoming Adventures</h1>
      <TbdAdventure/>
    </div>
  );
}

export default Adventures;
