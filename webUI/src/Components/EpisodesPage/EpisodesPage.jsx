import React from "react";
import { Helmet } from "react-helmet";
import styles from "./EpisodesPage.module.css";
import EpisodeHeroBanner from "./EpisodeHeroBanner";
import EpisodeTile from "../shared-components/EpisodeTile/EpisodeTile";
import trail from "../../images/peter-conlan-axYF1KFjoDY-unsplash.jpg";
import spotify from "../../logos/Spotify_Logo_only_RGB_Black.png";
import youtube from "../../logos/yt_logo_only_mono_light.png";
import applePodcast from "../../logos/Apple_Podcasts_Icon_blk_lg_060623.svg";

function EpisodesPage() {
  const episodes = [
    {
      title: "Channeling is a Problem",
      description:
        "What if people actually live for 1,000 years and have magic powers? How would that impact society and human progress?",
      imageSrc: trail,
      streamers: [
        { name: "Spotify", logo: spotify },
        { name: "YouTube", logo: youtube },
        { name: "Apple Podcast", logo: applePodcast },
      ],
    },
    {
      title: "The Dragon Reborn",
      description:
        "What does it mean for someone to be born as the Dragon Reborn? A discussion on the Wheel of Time prophecies.",
      imageSrc: trail,
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
      imageSrc: trail,
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
      imageSrc: trail,
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
        <title>The Pattern Unfolds</title>
        <meta
          name="description"
          content="Wheel of Time discussions, art, and nerd out safe space."
        />
      </Helmet>
      <EpisodeHeroBanner />
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
    </>
  );
}

export default EpisodesPage;
