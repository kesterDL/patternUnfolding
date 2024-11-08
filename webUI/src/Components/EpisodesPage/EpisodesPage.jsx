import React from "react";
import { Helmet } from "react-helmet";
import styles from "./EpisodesPage.module.css";
import EpisodeHeroBanner from "./EpisodeHeroBanner";
import EpisodeTile from "../shared-components/EpisodeTile/EpisodeTile";

import thomMoiraine from "../../images/frank-mckenna-cRLEVt6SZxI-unsplash_small.webp";
import channeler from "../../images/nathan-cima-y5aFdoCjB5U-unsplash_small.webp";
import sheep from "../../images/ariana-prestes-24bzOuENxHc-unsplash_small.webp";
import samurai from "../../images/sorasak-_UIN-pFfJ7c-unsplash_small.webp";

import spotify from "../../logos/Spotify_Logo_only_RGB_Black.png";
import youtube from "../../logos/yt_logo_only_mono_light.png";
import applePodcast from "../../logos/Apple_Podcasts_Icon_blk_lg_060623.svg";

function EpisodesPage() {
  const episodes = [
    {
      title: "Channelers are a Problem",
      description:
        "What if people actually live for 1,000 years and have magic powers? How would that impact society and human progress?",
      imageSrc: channeler,
      streamers: [
        { name: "Spotify", logo: spotify },
        { name: "YouTube", logo: youtube },
        { name: "Apple Podcast", logo: applePodcast },
      ],
    },
    {
      title: "The Borderlands",
      description:
        "The Borderlands are a culturally unique place. Art seems to pervade all elements of daily life, in harmony with intense martial and militant practices.",
      imageSrc: samurai,
      streamers: [
        { name: "Spotify", logo: spotify },
        { name: "YouTube", logo: youtube },
        { name: "Apple Podcast", logo: applePodcast },
      ],
    },
    {
      title: "Farming Life is Intense",
      description:
        "Tam and Rand walk all the way back to the farm the same day after a dangerous journey into town, and immediately start chores until nightfall.",
      imageSrc: sheep,
      streamers: [
        { name: "Spotify", logo: spotify },
        { name: "YouTube", logo: youtube },
        { name: "Apple Podcast", logo: applePodcast },
      ],
    },
    {
      title: "Thom and Moiraine?",
      description:
        "When did they start getting romantic? Was it always there from the beginning, or did RJ throw it in to get better ratings?",
      imageSrc: thomMoiraine,
      streamers: [
        { name: "Spotify", logo: spotify },
        { name: "YouTube", logo: youtube },
        { name: "Apple Podcast", logo: applePodcast },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Wheel of Time discussions, art, and nerd out safe space."
        />
      </Helmet>
      <EpisodeHeroBanner />
      <div className={styles.episodePage}>
        <div className={styles.episodesContainer}>
          {episodes.map((episode, index) => (
            <EpisodeTile
              key={index}
              imageSrc={episode.imageSrc}
              title={episode.title}
              description={episode.description}
              streamers={episode.streamers}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default EpisodesPage;
