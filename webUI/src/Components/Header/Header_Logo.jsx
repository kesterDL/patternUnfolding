import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styles from "./Header_Logo.module.css";
import { ReactComponent as LogoLight } from "../../logos/tomoe_plain-min.svg";

function Header_Logo() {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="The Pattern Unfolding, a Wheel of Time discussion podcast. Join us for epic adventures, discussions, and more!"
        />
      </Helmet>
      <Link to="/" aria-label="Navigate to Landing Page">
        <LogoLight className={styles.logo} alt="Pattern Unfolding Logo" />
      </Link>
    </>
  );
}

export default Header_Logo;
