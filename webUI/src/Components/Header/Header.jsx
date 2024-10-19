import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./Header.module.css";
import Header_Logo from "./Header_Logo";
import UserAuthModal from "../shared-components/UserAuthModal/UserAuthModal";
import UserSignUp from "../Users/UserSignUp";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false); // Track modal state

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Wheel of Time Podcast" />
      </Helmet>
      <header className={styles.headerBackdrop}>
        <div className={styles.headerRow}>
          <Header_Logo />
          <div className={styles.headerContent}>
            <div className={styles.hamburgerIcon} onClick={toggleMenu}>
              {/* Hamburger Icon (only visible on mobile) */}
              <span>&#9776;</span>
            </div>
            <nav className={styles.navigationGroup}>
              <Link to="/" className={styles.navLink}>
                Home
              </Link>
              <Link to="/episodes" className={styles.navLink}>
                Episodes
              </Link>
              <Link to="/threads" className={styles.navLink}>
                Threads
              </Link>
              <Link to="/stories" className={styles.navLink}>
                Stories
              </Link>
              <Link to="/artgallery" className={styles.navLink}>
                Art
              </Link>
              <Link to="/contact" className={styles.navLink}>
                Contact
              </Link>
            </nav>
            <div className={styles.signUp}>
              <button className={styles.signInButton}>Sign In</button>
              <button
                className={styles.registerButton}
                onClick={openSignUpModal}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hamburger menu for mobile */}
      {menuOpen && (
        <div className={styles.hamburgerMenu}>
          <Link to="/" className={styles.hamburgerMenuLink}>
            Home
          </Link>
          <Link to="/episodes" className={styles.hamburgerMenuLink}>
            Episodes
          </Link>
          <Link to="/threads" className={styles.hamburgerMenuLink}>
            Threads
          </Link>
          <Link to="/stories" className={styles.hamburgerMenuLink}>
            Stories
          </Link>
          <Link to="/artgallery" className={styles.hamburgerMenuLink}>
            Art
          </Link>
          <Link to="/contact" className={styles.hamburgerMenuLink}>
            Contact
          </Link>
          <div className={styles.hamburgerSignUp}>
            <button className={styles.signInButton}>Sign In</button>
            <button className={styles.registerButton} onClick={openSignUpModal}>
              Register
            </button>
          </div>
        </div>
      )}

      {/* Modal for Sign Up */}
      <UserAuthModal show={showSignUpModal} onClose={closeSignUpModal}>
        <UserSignUp />
      </UserAuthModal>
    </>
  );
}

export default Header;
