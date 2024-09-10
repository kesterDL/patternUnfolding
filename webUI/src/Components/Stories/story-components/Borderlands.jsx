import StoryTile from "./StoryTile";
import React from "react";
import squareFrames from "../../../logos/square_frames.svg";

function Borderlands() {
  const art = (
    <img
      src={squareFrames}
      alt="Engage other Fantasy and WoT enthusiasts like yourself!"
    />
  );

  const artGalleryDesc = `
    Men and Women both wear their hair in two braids over the ears and typically below the shoulders.
    Arafellins were considered very touchy and fought duels. The one challenged chose the weapons, 
    and it was sometimes very creative. Such as fighting in a dark room or bows on horseback. Women also dueled
    but it wasn't considered lady like for woemn to duel, and the women didn't swords typically though on rare occasions
    they did use whips.
    Arafel has kings and the queen rules while the king is on campagin. 
    Arafel had "a fair number" of gemstone mines producing most notebly firedrops but also other gems. 
    They also have number of gold and silver mines. Their major exports were Timber and furs.
  `;

  return (
    <StoryTile
      imageElement={art}
      title="Arafel"
      description={artGalleryDesc}
      storyLink="/valersNest"
      buttonText="View"
    />
  );
}

export default Borderlands;
