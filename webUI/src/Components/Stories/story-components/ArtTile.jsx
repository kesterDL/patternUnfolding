import StoryTile from "./StoryTile";
import React from "react";
import squareFrames from "../../../logos/square_frames.svg";

function ArtTile() {
  const art = (
    <img
      src={squareFrames}
      alt="Engage other Fantasy and WoT enthusiasts like yourself!"
    />
  );

  const artGalleryDesc =
    "Wander the halls of the art gallery. In one wing we display community art works submitted by you. Another wing is a catalog of ai generated images.";

  return (
    <StoryTile
      imageElement={art}
      title="Art Gallery"
      description={artGalleryDesc}
      storyLink="/valersNest"
      buttonText="View"
    />
  );
}

export default ArtTile;
