import StoryTile from "./StoryTile";
import React from "react";
import valersNestCover from "../../../images/ValersNest_cover.webp";

function ValersNest() {
  const storyCover = (
    <img
      src={valersNestCover}
      alt="Free Dungeons and Dragons Story | Faerun adventure | DnD | D&D | Dungeons & Dragons"
    />
  );

  const valersNestDesc =
    "In the city of Everlund, a young man plagued by boredom and over protection, \
    finds himself caught up in adventure.";

  return (
    <StoryTile
      imageElement={storyCover}
      title="Valer's Nest"
      description={valersNestDesc}
      storyLink="/valersNest"
    />
  );
}

export default ValersNest;
