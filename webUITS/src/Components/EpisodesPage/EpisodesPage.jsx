import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./EpisodesPage.module.css";
import EpisodeHeroBanner from "./EpisodeHeroBanner";
import EpisodeTile from "../shared-components/EpisodeTile/EpisodeTile";

import thomMoiraine from "../../images/frank-mckenna-cRLEVt6SZxI-unsplash_small.webp";
import channeler from "../../images/nathan-cima-y5aFdoCjB5U-unsplash_small.webp";
import sheep from "../../images/ariana-prestes-24bzOuENxHc-unsplash_small.webp";
import switzerland from "../../images/peter-conlan-axYF1KFjoDY-unsplash_small.webp";
import blight from "../../images/yousef-espanioly-AWYI4-h3VnM-unsplash_small.webp";
import caemlynRoad from "../../images/antonio-janeski-cX5I1Wu_TYg-unsplash_small.webp";

import spotify from "../../logos/Spotify_Logo_only_RGB_Black.png";
import youtube from "../../logos/yt_logo_only_mono_light.png";
import applePodcast from "../../logos/Apple_Podcasts_Icon_blk_lg_060623.svg";

function EpisodesPage() {
  const [playerUrl, setPlayerUrl] = useState(null);

  const PlayerComponent = (url) => {
    return (
      <iframe
        src={url}
        width="100%"
        height="100%"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Episode Player"
        style={{ borderRadius: "12px" }}
      ></iframe>
    );
  };

  const closePlayer = () => {
    setPlayerUrl(null);
  };

  const episodes = [
    {
      title: "The Wind Weaves",
      description:
        "Opening the Eye of the World. Hot spiced cider, honey cakes, and the Black Rider. Walking the well trod path of Tolkien, then going beyond.",
      imageSrc: switzerland,
      streamers: [
        {
          name: "Spotify",
          logo: spotify,
          url: "https://podcasters.spotify.com/pod/show/weaveandthewheel/embed/episodes/The-Wind-Weaves--Wheel-of-Time-e2qjvrn/a-abk7o8v",
        },
        {
          name: "YouTube",
          logo: youtube,
          url: "https://www.youtube.com/embed/rvbFNRTTWH0?si=ZvWPrtpvf5i6HQp6",
        },
        {
          name: "Apple Podcast",
          logo: applePodcast,
          url: "https://embed.podcasts.apple.com/us/podcast/the-wind-weaves-wheel-of-time/id1779188209?i=1000676574116",
        },
      ],
    },
    {
      title: "Farming Life is Intense",
      description:
        "Tam and Rand walk all the way back to the farm the same day after a dangerous journey into town, and immediately start chores until nightfall.",
      imageSrc: sheep,
      streamers: [
        {
          name: "Spotify",
          logo: spotify,
          url: "https://podcasters.spotify.com/pod/show/weaveandthewheel/embed/episodes/Farm-Life-is-Intense--Wheel-of-Time-e2qruh7/a-abkhkjj",
        },
        {
          name: "YouTube",
          logo: youtube,
          url: "https://www.youtube.com/embed/FVdECrxwSOo?si=1MKaEwqu4WU8UgDF",
        },
        {
          name: "Apple Podcast",
          logo: applePodcast,
          url: "https://embed.podcasts.apple.com/us/podcast/farm-life-is-intense-wheel-of-time/id1779188209?i=1000676578043",
        },
      ],
    },
    {
      title: "The Great Blight",
      description:
        "In this episode we venture into the blight. Why do Aes Sedai go into The Blight? How does it expand? Why did Robert Jordan create the blight in the first place?",
      imageSrc: blight,
      streamers: [
        {
          name: "Spotify",
          logo: spotify,
          url: "https://podcasters.spotify.com/pod/show/weaveandthewheel/embed/episodes/The-Great-Blight--Wheel-of-Time-e2qrujr/a-abkhkmm",
        },
        {
          name: "YouTube",
          logo: youtube,
          url: "https://www.youtube.com/embed/tqOzNAVIKmM?si=0bPIWlVvSetEDFF7",
        },
        {
          name: "Apple Podcast",
          logo: applePodcast,
          url: "https://embed.podcasts.apple.com/us/podcast/the-great-blight-wheel-of-time/id1779188209?i=1000676578012",
        },
      ],
    },
    {
      title: "Thom and Moiraine?",
      description:
        "When did they start getting romantic? Was it always there from the beginning, or did RJ throw it in to get better ratings?",
      imageSrc: thomMoiraine,
      streamers: [
        {
          name: "Spotify",
          logo: spotify,
          url: "https://open.spotify.com/embed/episode/56ejd9gTrLCvq3xbncFnlE?utm_source=generator",
        },
        {
          name: "YouTube",
          logo: youtube,
          url: "https://www.youtube.com/embed/mDebSG3MbwM?si=qJDUiTsdeJi6vZwg",
        },
        {
          name: "Apple Podcast",
          logo: applePodcast,
          url: "https://embed.podcasts.apple.com/us/podcast/thom-moiraine-wheel-of-time/id1779188209?i=1000678218128",
        },
      ],
    },
    {
      title: "Road to Caemlyn",
      description:
        "Rand and Mat walk non-stop for 3-4 weeks. Counting on their wits, luck, and Thom Merrilin's teachings to survive.",
      imageSrc: caemlynRoad,
      streamers: [
        {
          name: "Spotify",
          logo: spotify,
          url: "https://open.spotify.com/embed/show/[id]?utm_source=generator",
        },
        {
          name: "YouTube",
          logo: youtube,
          url: "https://www.youtube.com/embed/[id]",
        },
        {
          name: "Apple Podcast",
          logo: applePodcast,
          url: "https://embed.podcasts.apple.com/us/podcast/id[YOUR_APPLE_PODCAST_ID]",
        },
      ],
    },
    {
      title: "Channelers are a Problem",
      description:
        "What if people actually live for 1,000 years and have magic powers? How would that impact society and human progress?",
      imageSrc: channeler,
      streamers: [
        {
          name: "Spotify",
          logo: spotify,
          url: "https://open.spotify.com/embed/show/5sHqxcoUkFoJJqXE2XIENB?utm_source=generator",
        },
        {
          name: "YouTube",
          logo: youtube,
          url: "https://www.youtube.com/embed/Uqx-d6vQbeQ?si=7ha2BA8GH8aXwfal",
        },
        {
          name: "Apple Podcast",
          logo: applePodcast,
          url: "https://embed.podcasts.apple.com/us/podcast/id[YOUR_APPLE_PODCAST_ID]",
        },
      ],
    },
    // {
    //   title: "The Borderlands",
    //   description:
    //     "The Borderlands are a culturally unique place. Art seems to pervade all elements of daily life, in harmony with intense martial and militant practices.",
    //   imageSrc: samurai,
    //   streamers: [
    //     {
    //       name: "Spotify",
    //       logo: spotify,
    //       url: "https://open.spotify.com/embed/show/5sHqxcoUkFoJJqXE2XIENB?utm_source=generator",
    //     },
    //     {
    //       name: "YouTube",
    //       logo: youtube,
    //       url: "https://www.youtube.com/embed/Uqx-d6vQbeQ?si=7ha2BA8GH8aXwfal",
    //     },
    //     {
    //       name: "Apple Podcast",
    //       logo: applePodcast,
    //       url: "https://embed.podcasts.apple.com/us/podcast/id[EXAMPLE_APPLE_PODCAST_ID_2]",
    //     },
    //   ],
    // },
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
              episode={episode}
              setPlayerUrl={setPlayerUrl}
            />
          ))}
        </div>
      </div>
      {playerUrl && (
        <>
          <div className={styles.overlayBackground} onClick={closePlayer}></div>
          <div className={styles.playerContainer}>
            {PlayerComponent(playerUrl)}
          </div>
        </>
      )}
    </>
  );
}

export default EpisodesPage;
