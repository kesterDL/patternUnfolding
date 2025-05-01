import React from "react";
import banner from "../images/ValersNest_cover.webp";
import ValersNestStory from "./ValersNestStoryText";
import Reader from "../Components/Stories/story-components/Reader";

function ValersNestReader() {
  return (
    <Reader
      storyTitle="Valer's Nest"
      storyText={<ValersNestStory />}
      coverImage={banner}
      coverImageAlt="D&D | Dungeons & Dragons | Short Free Adventure"
      metaTitle="Valer's Nest | Bard Stories"
      metaDescriptions="A free adventure set in Dungeon and Dragon's Faerun. Fast D&D adventure to keep the party inspired."
    />
  );
}

export default ValersNestReader;
