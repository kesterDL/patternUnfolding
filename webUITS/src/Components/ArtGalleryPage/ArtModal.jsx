import React from "react";
import PropTypes from "prop-types";
import Modal from "../shared-components/Modal/Modal";

const ArtModal = ({ art, onClose }) => {
  if (!art) return null;

  return (
    <Modal isOpen={!!art} onClose={onClose}>
      <div style={{ textAlign: "center" }}>
        <img
          src={art.imageSrc}
          alt={art.title}
          style={{ maxWidth: "65%", height: "auto", borderRadius: "8px" }}
        />
        <h2 style={{ marginTop: "20px", fontFamily: "Cinzel, serif" }}>
          {art.title}
        </h2>
        <p style={{ fontFamily: "Cormorant, serif", fontSize: "18px" }}>
          Art by:{" "}
          <a href={art.artistLink} target="_blank" rel="noreferrer">
            {art.artist}
          </a>
        </p>
      </div>
    </Modal>
  );
};

ArtModal.propTypes = {
  art: PropTypes.shape({
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    artistLink: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ArtModal;
