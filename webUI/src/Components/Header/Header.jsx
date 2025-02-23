import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useAuth } from "../../user/AuthContext";
import styles from "./Header.module.css";
import Header_Logo from "./Header_Logo";

function Header() {
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  const handleSignOut = () => {
    logout();
  };

  const username = currentUser?.username || currentUser?.email;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Helmet>
        <meta name="description" content="Wheel of Time Podcast" />
      </Helmet>
      <header className={styles.headerBackdrop}>
        <div className={styles.headerRow}>
          <Header_Logo />
          {isMobile ? (
            <>
              <div className={styles.hamburgerIcon} onClick={toggleMenu}>
                &#9776;
              </div>
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
                  <Link to="/apitext" className={styles.hamburgerMenuLink}>
                    Api Text
                  </Link>
                  <div className={styles.userSignIn}>
                    {currentUser ? (
                      <>
                        <span className={styles.usernameLabel}>{username}</span>
                        <button
                          className={styles.signOutButton}
                          onClick={handleSignOut}
                        >
                          Sign Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/signin" className={styles.signInLink}>
                          Sign In
                        </Link>
                        <Link to="/signup" className={styles.registerButton}>
                          Register
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className={styles.headerContent}>
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
                <Link to="/apitext" className={styles.navLink}>
                  Api Text
                </Link>
              </nav>
              <div className={styles.userSignIn}>
                {currentUser ? (
                  <>
                    <span className={styles.usernameLabel}>{username}</span>
                    <button
                      className={styles.signOutButton}
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/signin" className={styles.signInLink}>
                      Sign In
                    </Link>
                    <Link to="/signup" className={styles.registerButton}>
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
