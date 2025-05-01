import styles from "./NavTabs.module.css";
import { NavLink } from "react-router-dom";
import React from "react";

function NavTabs() {
  return (
    <div className={styles.header}>
      <div className={styles.flexboxContainer}>
        <nav className={styles.tabs}>
          <NavLink
            className={(isActive) =>
              isActive.isActive ? styles.activeTab : styles.tab
            }
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className={(isActive) =>
              isActive.isActive ? styles.activeTab : styles.tab
            }
            to="/adventures"
          >
            Adventures
          </NavLink>
          <NavLink
            className={(isActive) =>
              isActive.isActive ? styles.activeTab : styles.tab
            }
            to="/bardStories"
          >
            Bard Stories
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

export default NavTabs;
