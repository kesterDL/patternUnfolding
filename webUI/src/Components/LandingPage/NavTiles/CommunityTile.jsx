import React from "react";
import longhouse from "../../../logos/longhouse.svg";
import NavigationCard from "./NavigationCard";

function CommunityTile() {
  const community = (
    <img
      src={longhouse}
      alt="Engage other Fantasy and WoT enthusiasts like yourself!"
    />
  );

  const communityDesc =
    "Our community is a great place to share your love for the Wheel of Time and other fantasy novels. A place we like to nerd out and everyone else is totally in to it.";

  return (
    <NavigationCard
      imageElement={community}
      title="Community"
      description={communityDesc}
      storyLink="/valersNest"
      buttonText="Share"
    />
  );
}

export default CommunityTile;
