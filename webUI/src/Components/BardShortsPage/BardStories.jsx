import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styles from "./BardStories.module.css";
import StoryTile from "../Stories/story-components/StoryTile";
import BardStoriesHeroBanner from "./BardStoriesHeroBanner";
import Modal from "react-modal";
import Reader from "../Stories/story-components/Reader";
import stonesBoat from "../../images/stones_boat.webp";
import valersNestCover from "../../images/ValersNest_cover.webp"; // For ValersNest cover image
import ValersNestStoryText from "../../stories/ValersNestStoryText"; // ValersNest story text

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
      coverImage: valersNestCover,
      storyText: <ValersNestStoryText />, // Valer's Nest full story content
    },
    {
      title: "Starless Sky pt 1",
      description:
        "If Orcs attacks, you fight or you run. Even if Orcs catch you, sometimes, you can beg or bargain.\
      A mountain can't be fought and has no mercy to give and death is often slow and very painful.",
      coverImage: stonesBoat,
      storyText: <ValersNestStoryText />, // Valer's Nest full story content
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
