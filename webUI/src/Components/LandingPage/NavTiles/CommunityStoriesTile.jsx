import React from "react";
import fountainpen from "../../../logos/fountain_pen.svg";
import NavigationCard from "./NavigationCard";

function CommunityStories() {
  const stories = (
    <img
      src={fountainpen}
      alt="Engage other Fantasy and WoT enthusiasts like yourself!"
    />
  );

  const storiesDesc =
    "Short stories written by you, the members of the community. Share your stories and read stories written by others.";

  return (
    <NavigationCard
      imageElement={stories}
      title="Stories"
      description={storiesDesc}
      storyLink="/stories"
      buttonText="Read"
    />
  );
}

export default CommunityStories;
