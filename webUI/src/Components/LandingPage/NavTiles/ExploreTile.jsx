import React from "react";
import knot from "../../../logos/celtic_knot.svg";
import NavigationCard from "./NavigationCard";

function ExploreTile() {
  const storyCover = (
    <img src={knot} alt="Threads of the Pattern make the weave" />
  );

  const exploreDesc =
    "Explore new areas of the pattern in a manner you may not have seen before.";

  return (
    <NavigationCard
      imageElement={storyCover}
      title="Weave the Threads"
      description={exploreDesc}
      storyLink="/threads"
      buttonText="Explore"
    />
  );
}

export default ExploreTile;
