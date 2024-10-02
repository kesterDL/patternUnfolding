import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./Header.module.css";
import Header_Logo from "./Header_Logo";

function Header() {
  return (
    <>
      <Helmet>
        <meta name="description" content="Wheel of Time Podcast" />
      </Helmet>
      <header className={styles.headerBackdrop}>
        <div className={styles.headerRow}>
          <Header_Logo />
          <nav className={styles.navigationGroup}>
            {/* <button className={styles.storeButton}>Store</button> */}
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
            <button className={styles.registerButton}>Register</button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
