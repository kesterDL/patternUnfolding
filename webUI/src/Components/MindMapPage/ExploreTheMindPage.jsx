import React from "react";
import styles from "./ExploreTheMindPage.module.css";
import ExploreTheMindHeroBanner from "./ExploreTheMindHeroBanner";
import MindMap from "./MindMap";

const mindMapData = {
  nodes: [
    { id: "1", label: "Wheel of Time", position: { x: 100, y: 100 } },
    { id: "2", label: "Aes Sedai", position: { x: 200, y: 150 } },
    { id: "3", label: "The Pattern", position: { x: 300, y: 250 } },
  ],
  edges: [
    { source: "1", target: "2", label: "Is linked to" },
    { source: "1", target: "3", label: "Follows" },
  ],
};

function ExploreTheMindPage() {
  return (
    <>
      <ExploreTheMindHeroBanner />
      <div className={styles.pageContainer}>
        <div className={styles.card}>
          <MindMap json={mindMapData} />
        </div>
      </div>
    </>
  );
}

export default ExploreTheMindPage;
