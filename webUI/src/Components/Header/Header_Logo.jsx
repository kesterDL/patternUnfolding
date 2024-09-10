import React from "react";
import styles from "./Header_Logo.module.css";
import { ReactComponent as LogoLight } from "../../logos/logo_light.svg";
import { Helmet } from "react-helmet";

function Header_Logo() {
  return (
    <>
      <Helmet>
        <title>Unfolding the Pattern</title>
        <meta
          name="description"
          content="Bard's Cafe, your source for Dungeons & Dragons (D&D) podcast. Join us for epic adventures, discussions, and more!"
        />
      </Helmet>
      <LogoLight className={styles.logo} alt="Bard's Cafe Logo" />
    </>
  );
}

export default Header_Logo;
