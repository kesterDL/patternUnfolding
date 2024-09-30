import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styles from "./ExploreTheMindPage.module.css";
import ExploreTheMindHeroBanner from "./ExploreTheMindHeroBanner";
import MindMap from "./MindMap";

import eow from "../../data/pattern.json";

function ExploreTheMindPage() {
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>The Pattern Unfolds</title>
          <meta
            name="description"
            content="Wheel of Time discussions, art, and nerd out safe space."
          />
        </Helmet>
        {/* Rest of the page content */}
        <ExploreTheMindHeroBanner />
        <div className={styles.pageContainer}>
          <div className={styles.card}>
            <MindMap json={eow} />
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default ExploreTheMindPage;
