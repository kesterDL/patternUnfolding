import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./ArtGalleryPage.module.css";
import ArtGalleryHeroBanner from "./ArtGalleryHeroBanner";
import ArtGalleryTile from "../shared-components/ArtGalleryTile/ArtGalleryTile";
import ArtModal from "./ArtModal";

function ArtGalleryPage() {
  const [selectedArt, setSelectedArt] = useState(null);

  const arts = [
    {
      title: "Fontaine Pradier in the city center of Nîmes, France",
      artist: "Nathan Cima",
      artistLink: "https://unsplash.com/@nathan_cima",
      imageSrc: "https://unsplash.com/photos/y5aFdoCjB5U/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM4MDc4NDE0fA&force=true&w=640",
      imageLink:
        "https://unsplash.com/photos/a-statue-on-top-of-a-fountain-with-statues-around-it-y5aFdoCjB5U",
    },
    {
      title: "Purple and Pink Kimono",
      artist: "Sorasak",
      artistLink: "https://unsplash.com/@boontohhgraphy",
      imageSrc: "https://unsplash.com/photos/_UIN-pFfJ7c/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM4MDc3NzE1fA&force=true&w=640",
      imageLink:
        "https://unsplash.com/photos/two-women-in-purple-and-pink-kimono-standing-on-street-_UIN-pFfJ7c",
    },
    {
      title: "Sheep in Field",
      artist: "Arians Prestes",
      artistLink: "https://unsplash.com/@arianaprestes",
      imageSrc: "https://unsplash.com/photos/24bzOuENxHc/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM4MDc4NjcwfA&force=true&w=640",
      imageLink: "https://unsplash.com/photos/herd-of-lambs-24bzOuENxHc",
    },
    {
      title: "Lovers Entwined",
      artist: "Frank Mckenna",
      artistLink: "https://unsplash.com/@frankiefoto",
      imageSrc: "https://unsplash.com/photos/cRLEVt6SZxI/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM4MDc5MTU3fA&force=true&w=640",
      imageLink:
        "https://unsplash.com/photos/man-and-woman-hugging-each-other-cRLEVt6SZxI",
    },
    {
      title: "Natural History Museum London",
      artist: "Claudio Testa",
      artistLink: "https://unsplash.com/@claudiotesta",
      imageSrc: "https://unsplash.com/photos/iqeG5xA96M4/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM4MDc3MjIyfA&force=true&w=640",
      imageLink:
        "https://unsplash.com/photos/brown-cathedral-during-daytimer-iqeG5xA96M4",
    },
    {
      title: "Mountain Covered with Mist",
      artist: "Tyler Lastovich",
      artistLink: "https://unsplash.com/@lastly",
      imageSrc: "https://unsplash.com/photos/8_LZ9UWTKLE/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM4MDc5NTU5fA&force=true&w=640",
      imageLink:
        "https://unsplash.com/photos/photo-of-mountain-covered-with-mist-8_LZ9UWTKLE",
    },
    {
      title: "Seeing Switzerland",
      artist: "Peter Conlan",
      artistLink: "https://unsplash.com/@peterconlan",
      imageSrc: "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/peter-conlan-axYF1KFjoDY-unsplash_small.webp",
      imageLink: "https://unsplash.com/photos/grass-field-pathway-axYF1KFjoDY",
    },
    {
      title: "Read Between the Lines",
      artist: "Paul Schafer",
      artistLink: "https://unsplash.com/@paul__schafer",
      imageSrc: "https://unsplash.com/photos/t6oZEgL0z18/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM4MDc5NTM4fA&force=true&w=640",
      imageLink: "https://unsplash.com/photos/book-lot-in-bookcase-t6oZEgL0z18",
    },
    {
      title: "Black and White Experimental Pattern",
      artist: "Max Kleinen",
      artistLink: "https://unsplash.com/@hirmin",
      imageSrc: "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/max-kleinen-GhrqMkA4cVA-unsplash-landscape.webp",
      imageLink:
        "https://unsplash.com/photos/black-and-white-abstract-painting-GhrqMkA4cVA",
    },
    {
      title: "Succulent Plant",
      artist: "Yousef Espanioly",
      artistLink: "https://unsplash.com/@yespanioly",
      imageSrc: "https://unsplash.com/photos/AWYI4-h3VnM/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM4MDc5MzUzfA&force=true&w=640",
      imageLink:
        "https://unsplash.com/photos/close-up-photography-of-succulent-plant-AWYI4-h3VnM",
    },
    {
      title: "Shinto Gates in the Sea",
      artist: "Ryoji Iwata",
      artistLink: "https://unsplash.com/@ryoji__iwata",
      imageSrc: "https://unsplash.com/photos/159p1Wsn9tE/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNzM4MDczOTkxfA&force=true&w=640",
      imageLink: "https://unsplash.com/photos/tori-gate-159p1Wsn9tE",
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
      <ArtGalleryHeroBanner />
      <div className={styles.artsContainer}>
        {arts.map((art, index) => (
          <ArtGalleryTile
            key={index}
            imageSrc={art.imageSrc}
            title={art.title}
            artist={art.artist}
            artistLink={art.artistLink}
            imageLink={art.imageLink}
            onClick={() => setSelectedArt(art)}
          />
        ))}
      </div>

      {/* Modal for enlarged Art Tile */}
      <ArtModal art={selectedArt} onClose={() => setSelectedArt(null)} />
    </>
  );
}

export default ArtGalleryPage;
