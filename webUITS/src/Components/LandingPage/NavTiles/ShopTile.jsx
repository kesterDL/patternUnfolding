import React from "react";
import PlaceholderCover from "../../../logos/shopping_cart.svg";
import NavigationCard from "./NavigationCard";

function ShopTile() {
  const storyCover = <img src={PlaceholderCover} alt="Shop" />;

  const placeholderDesc = "Shop the White Tower's Store Room.";

  return (
    <NavigationCard
      imageElement={storyCover}
      title="Store"
      description={placeholderDesc}
      storyLink="/"
      buttonText="Shop"
    />
  );
}

export default ShopTile;
