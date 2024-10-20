import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import styles from "./Header.module.css";
import Header_Logo from "./Header_Logo";
import UserAuthModal from "../shared-components/UserAuthModal/UserAuthModal";
import UserSignUp from "../Users/UserSignUp";
import SignIn from "../Users/SignIn";
import cognitoConfig from "../../user/cognitoConfig";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openSignUpModal = () => {
    setShowSignUpModal(true);
  };

  const closeSignUpModal = () => {
    setShowSignUpModal(false);
  };

  const openSignInModal = () => {
    setShowSignInModal(true);
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  const handleSignInSuccess = (username) => {
    setIsSignedIn(true);
    setUsername(username);
    closeSignInModal();
  };

  const handleSignOut = () => {
    const userPool = new CognitoUserPool({
      UserPoolId: cognitoConfig.UserPoolId,
      ClientId: cognitoConfig.ClientId,
    });

    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.signOut();
      setIsSignedIn(false);
      setUsername("");
    }
  };

  // Optionally: check if user is still signed in on page reload
  useEffect(() => {
    const userPool = new CognitoUserPool({
      UserPoolId: cognitoConfig.UserPoolId,
      ClientId: cognitoConfig.ClientId,
    });

    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (session && session.isValid()) {
          // Fetch the username from the session if it's valid
          cognitoUser.getUserAttributes((err, attributes) => {
            if (!err) {
              const usernameAttr = attributes.find(
                (attr) => attr.Name === "preferred_username"
              );
              const fetchedUsername = usernameAttr
                ? usernameAttr.Value
                : cognitoUser.getUsername();
              setUsername(fetchedUsername);
              setIsSignedIn(true);
            }
          });
        }
      });
    }
  }, []);

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

            {/* Show username and sign out button if signed in, otherwise show sign-in/sign-up buttons */}
            <div className={styles.signUp}>
              {isSignedIn ? (
                <>
                  <span>{username}</span>
                  <button
                    className={styles.signOutButton}
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={styles.signInButton}
                    onClick={openSignInModal}
                  >
                    Sign In
                  </button>
                  <button
                    className={styles.registerButton}
                    onClick={openSignUpModal}
                  >
                    Register
                  </button>
                </>
              )}
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
            {isSignedIn ? (
              <>
                <span>{username}</span>
                <button
                  className={styles.signOutButton}
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.signInButton}
                  onClick={openSignInModal}
                >
                  Sign In
                </button>
                <button
                  className={styles.registerButton}
                  onClick={openSignUpModal}
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal for Sign Up */}
      <UserAuthModal show={showSignUpModal} onClose={closeSignUpModal}>
        <UserSignUp />
      </UserAuthModal>

      {/* Modal for Sign In */}
      <UserAuthModal show={showSignInModal} onClose={closeSignInModal}>
        <SignIn onSignInSuccess={handleSignInSuccess} />
      </UserAuthModal>
    </>
  );
}

export default Header;
