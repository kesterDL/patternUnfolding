import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styles from "./BardStories.module.css";
import StoryTile from "../Stories/story-components/StoryTile";
import BardStoriesHeroBanner from "./BardStoriesHeroBanner";
import Modal from "react-modal";
import Reader from "../Stories/story-components/Reader";
import ValersNestStoryText from "../../stories/ValersNestStoryText"; // ValersNest story text
import WolfBannerSong from "../../stories/WolfBannerSong"; // WolfBanner story text
import LamansSin from "../../stories/LamansSin"; // Lamans Sin story
import AlcairDal from "../../stories/AlcairDal";
import DanceWithMeShadowMan from "../../stories/DanceWithMeShadowMan";
import SlayersSoul from "../../stories/SlayersSoul";
import JakOTheShadows from "../../stories/DanceWithJakOTheShadows";
import MalkiersCrown from "../../stories/MalkiersCrown";
import TowersFlames from "../../stories/TowersFlames";

import BirgittesSeveredString from "../../stories/BirgettesSeveredString";
import GaidalsHall from "../../stories/GaidalsHall";

Modal.setAppElement("#root");

function BardStories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const openModal = (story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
    document.body.classList.add("modal-open"); // Disable background scroll
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
    document.body.classList.remove("modal-open"); // Enable background scroll
  };

  const stories = [
    {
      title: "Valer's Nest",
      description:
        "In the city of Everlund, a young man plagued by boredom and over protection, \
        finds himself caught up in adventure.",
      coverImage:
        "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/ValersNest_cover.webp",
      storyText: <ValersNestStoryText />, // Valer's Nest full story content
    },
    {
      title: "Starless Sky pt 1",
      description:
        "If Orcs attacks, you fight or you run. Even if Orcs catch you, sometimes, you can beg or bargain.\
      A mountain can't be fought and has no mercy to give and death is often slow and very painful.",
      coverImage:
        "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/stones_boat.webp",
      storyText: <ValersNestStoryText />, // Valer's Nest full story content
    },
    {
      title: "The Wolfhead Banner",
      description: "A song for the Battle of the Two Rivers",
      coverImage:
        "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/Manetheren.webp",
      storyText: <WolfBannerSong />,
    },
    {
      title: "Birgitte's Severed String",
      description: "Birgitte's lament for Gaidal Cain",
      coverImage:
        "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/severed_string.webp",
      storyText: <BirgittesSeveredString />,
    },
    {
      title: "Guidal's Hall",
      description: "Gaidal Cain's lament for Birgitte",
      coverImage:
        "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/the_brave_fall.webp",
      storyText: <GaidalsHall />,
    },
    {
      title: "Laman's Sin",
      description:
        "A song about the heart break and anger felt by the Aiel people when they learned that Laman cut down the Chora tree.",
      coverImage:
        "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/Chora.webp",
      storyText: <LamansSin />,
    },
    {
      title: "Alcair Dal",
      description:
        "Alcair Dal is a call and response style song about the Seia Doon Warrior Society taunting everyone else.",
      coverImage:
        "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/AlcairDal.webp",
      storyText: <AlcairDal />,
    },
    {
      title: "Dance With Me Shadowman",
      description:
        "A song about the Aiel circling and taunting three Myrddraal.",
      coverImage:
        "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/eyeless.webp",
      storyText: <DanceWithMeShadowMan />,
    },
    {
      title: "Slayer's Soul",
      description: "An origin story song about Slayer.",
      coverImage:
        "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/SlayersSoul.webp",
      storyText: <SlayersSoul />,
    },
    {
      title: "Jak o' the Shadows",
      description: "Robert Jordan's Jak o' the Shadows Song in full form.",
      coverImage:
        "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/Jak.webp",
      storyText: <JakOTheShadows />,
    },
    {
      title: "Malkier's Crown",
      description: "Lan thinking about his parents and Malkier.",
      coverImage:
        "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/golden_crane.webp",
      storyText: <MalkiersCrown />,
    },
    {
      title: "Seven Towers Flames",
      description:
        "A song for the hope and sorrow of those Malkieri who fought the Shadow during the fall of their nation.",
      coverImage:
        "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/seven_tower_flames.webp",
      storyText: <TowersFlames />,
    },
    // Add more stories here if needed
  ];

  return (
    <>
      <Helmet>
        <title>Short Stories</title>
        <meta
          name="description"
          content="Short Stories Written by the Community"
        />
      </Helmet>
      <BardStoriesHeroBanner />
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.storiesContainer}>
            {stories.map((story, index) => (
              <div key={index} onClick={() => openModal(story)}>
                <StoryTile
                  imageElement={story.coverImage}
                  title={story.title}
                  description={story.description}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for the story */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        {selectedStory && (
          <Reader
            storyTitle={selectedStory.title}
            storyText={selectedStory.storyText}
            coverImage={selectedStory.coverImage}
            coverImageAlt={`Cover of ${selectedStory.title}`}
            metaTitle={selectedStory.title}
            metaDescriptions={selectedStory.description}
          />
        )}
      </Modal>
    </>
  );
}

export default BardStories;
