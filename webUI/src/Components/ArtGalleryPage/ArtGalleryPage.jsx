import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./ArtGalleryPage.module.css";
import ArtGalleryHeroBanner from "./ArtGalleryHeroBanner";
import ArtGalleryTile from "../shared-components/ArtGalleryTile/ArtGalleryTile";
import Modal from "../shared-components/Modal/Modal";

import thomMoiraine from "../../images/frank-mckenna-cRLEVt6SZxI-unsplash_small.webp";
import channeler from "../../images/nathan-cima-y5aFdoCjB5U-unsplash_small.webp";
import sheep from "../../images/ariana-prestes-24bzOuENxHc-unsplash_small.webp";
import samurai from "../../images/sorasak-_UIN-pFfJ7c-unsplash_small.webp";
import gallery from "../../images/claudio-testa-iqeG5xA96M4-unsplash_small.webp";
import switzerland from "../../images/peter-conlan-axYF1KFjoDY-unsplash_small.webp";
import mist from "../../images/tyler-lastovich-8_LZ9UWTKLE-unsplash_small.webp";
import books from "../../images/paul-schafer-t6oZEgL0z18-unsplash_small.webp";
import thread from "../../images/max-kleinen-GhrqMkA4cVA-unsplash_small.webp";

function ArtGalleryPage() {
  const [selectedArt, setSelectedArt] = useState(null);

  const arts = [
    {
      title: "Fontaine Pradier in the city center of Nîmes, France",
      artist: "Nathan Cima",
      artistLink: "https://unsplash.com/@nathan_cima",
      imageSrc: channeler,
      imageLink:
        "https://unsplash.com/photos/a-statue-on-top-of-a-fountain-with-statues-around-it-y5aFdoCjB5U",
    },
    {
      title: "Purple and Pink Kimono",
      artist: "Sorasak",
      artistLink: "https://unsplash.com/@boontohhgraphy",
      imageSrc: samurai,
      imageLink:
        "https://unsplash.com/photos/two-women-in-purple-and-pink-kimono-standing-on-street-_UIN-pFfJ7c",
    },
    {
      title: "Sheep in Field",
      artist: "Arians Prestes",
      artistLink: "https://unsplash.com/@arianaprestes",
      imageSrc: sheep,
      imageLink: "https://unsplash.com/photos/herd-of-lambs-24bzOuENxHc",
    },
    {
      title: "Lovers Entwined",
      artist: "Frank Mckenna",
      artistLink: "https://unsplash.com/@frankiefoto",
      imageSrc: thomMoiraine,
      imageLink:
        "https://unsplash.com/photos/man-and-woman-hugging-each-other-cRLEVt6SZxI",
    },
    {
      title: "Natural History Museum London",
      artist: "Claudio Testa",
      artistLink: "https://unsplash.com/@claudiotesta",
      imageSrc: gallery,
      imageLink:
        "https://unsplash.com/photos/brown-cathedral-during-daytimer-iqeG5xA96M4",
    },
    {
      title: "Mountain Covered with Mist",
      artist: "Tyler Lastovich",
      artistLink: "https://unsplash.com/@lastly",
      imageSrc: mist,
      imageLink:
        "https://unsplash.com/photos/photo-of-mountain-covered-with-mist-8_LZ9UWTKLE",
    },
    {
      title: "Seeing Switzerland",
      artist: "Peter Conlan",
      artistLink: "https://unsplash.com/@peterconlan",
      imageSrc: switzerland,
      imageLink: "https://unsplash.com/photos/grass-field-pathway-axYF1KFjoDY",
    },
    {
      title: "Read Between the Lines",
      artist: "Paul Schafer",
      artistLink: "https://unsplash.com/@paul__schafer",
      imageSrc: books,
      imageLink: "https://unsplash.com/photos/book-lot-in-bookcase-t6oZEgL0z18",
    },
    {
      title: "Black and White Experimental Pattern",
      artist: "Max Kleinen",
      artistLink: "https://unsplash.com/@hirmin",
      imageSrc: thread,
      imageLink:
        "https://unsplash.com/photos/black-and-white-abstract-painting-GhrqMkA4cVA",
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
      {selectedArt && (
        <Modal isOpen={!!selectedArt} onClose={() => setSelectedArt(null)}>
          <div style={{ textAlign: "center" }}>
            <img
              src={selectedArt.imageSrc}
              alt={selectedArt.title}
              style={{ maxWidth: "65%", height: "auto", borderRadius: "8px" }}
            />
            <h2 style={{ marginTop: "20px", fontFamily: "Cinzel, serif" }}>
              {selectedArt.title}
            </h2>
            <p style={{ fontFamily: "Cormorant, serif", fontSize: "18px" }}>
              Art by:{" "}
              <a
                href={selectedArt.artistLink}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "underline", color: "#333" }}
              >
                {selectedArt.artist}
              </a>
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ArtGalleryPage;
