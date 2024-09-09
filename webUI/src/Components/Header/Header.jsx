import React from "react";
import styles from "./Header.module.css";
import Header_Logo from "./Header_Logo";
import { Helmet } from "react-helmet";

function Header() {
  return (
    <>
      <Helmet>
        <title>Unfolding the Pattern</title>
        <meta
          name="description"
          content="Welcome to Bard's Cafe, your source for Dungeons & Dragons (D&D) podcast. Join us for epic DnD adventures, discussions, and more!"
        />
      </Helmet>
      <header className={styles.headerBackdrop}>
        <div className={styles.headerRow}>
          <Header_Logo />
          <div className={styles.navigationGroup}>
            <button className={styles.storeButton}>Store</button>
            <div>Episodes</div>
            <div>Community</div>
            <div>Stories</div>
            <div>Art</div>
            <div>Contact</div>
          </div>
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
