import StoryTile from "./StoryTile";
import React from "react";
import PlaceholderCover from "../../../logos/shopping_cart.svg";

function ShopTile() {
  const storyCover = <img src={PlaceholderCover} alt="Shop" />;

  const placeholderDesc = "Shop the White Tower's Store Room.";

  return (
    <StoryTile
      imageElement={storyCover}
      title="Store"
      description={placeholderDesc}
      storyLink="/"
      buttonText="Shop"
    />
  );
}

export default ShopTile;
