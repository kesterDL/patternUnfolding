import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styles from "./ProfilePage.module.css";
import Header from "../Header/Header";
import { jwtDecode } from "jwt-decode";

import StoryTile from "../Stories/story-components/StoryTile";
import ArtGalleryTile from "../shared-components/ArtGalleryTile/ArtGalleryTile";
import eyeless from "../../images/eyeless.webp"; // default profile photo

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({
    profilePhoto: eyeless,
    userName: "ABC",
    email: "abc@email.com",
  });
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    // TODO: Uncomment this code to fetch profile info from the API
    // Commented out so it doesn't call the API constantly
    const fetchProfileInfo = async () => {
      try {
        // Get JWT from local storage
        const token = localStorage.getItem("idToken");
        if (!token) {
          throw new Error("No authentication token found");
        }
        // Decode JWT to get account_sub
        const decoded = jwtDecode(token);
        const account_sub = decoded.sub;
        const response = await fetch(
          "https://enwvvfsu32.execute-api.us-east-1.amazonaws.com/v1/fetchUserProfile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              httpMethod: "POST",
              account_sub: account_sub,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile info");
        }
        const responseData = await response.json(); // convert response object into json
        const data = JSON.parse(responseData.body); // parses a json string into a JS object
        setProfileInfo({
          profilePhoto: data.profilePhoto || profileInfo.profilePhoto,
          userName: data.userName || profileInfo.userName,
          email: data.email || profileInfo.email,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfileInfo();
  }, []);

  return (
    <>
      <Header />
      <div className={styles.profilePage}>
        <Helmet>
          <title>Profile Page</title>
        </Helmet>
        <div className={styles.menu}>
          <h2>Profile</h2>
          <ul>
            <div className={styles.menuItem}>Change Password</div>
            <div className={styles.menuItem}>Change User Name</div>
          </ul>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.profileInfoCard}>
            <img
              src={profileInfo.profilePhoto}
              alt="Profile Photo"
              className={styles.profilePhoto}
            />
            <h2>{profileInfo.userName}</h2>
          </div>
          <div className={styles.tabs}>
            <div
              onClick={() => setActiveTab("account")}
              className={`${styles.tab} ${
                activeTab === "account" ? styles.activeTab : ""
              }`}
            >
              Account
            </div>
            <div
              onClick={() => setActiveTab("userStories")}
              className={`${styles.tab} ${
                activeTab === "userStories" ? styles.activeTab : ""
              }`}
            >
              My Stories
            </div>
            <div
              onClick={() => setActiveTab("userArt")}
              className={`${styles.tab} ${
                activeTab === "userArt" ? styles.activeTab : ""
              }`}
            >
              My Art
            </div>
          </div>
          <div className={styles.contentDisplay}>
            {activeTab === "account" && (
              <div>
                <h3>Account Information</h3>
                <p>
                  <strong>Email:</strong> {profileInfo.email}
                </p>
                <p>
                  <strong>User Name:</strong> {profileInfo.userName}
                </p>
              </div>
            )}
            {activeTab === "userStories" && (
              <div className={styles.userContent}>
                <StoryTile
                  imageElement={eyeless}
                  title="Coming Soon"
                  description="Soon you will be able to upload and share your stories with others here!"
                />
              </div>
            )}
            {activeTab === "userArt" && (
              <div className={styles.userContent}>
                <ArtGalleryTile
                  key="0"
                  imageSrc={eyeless}
                  title="Coming Soon! You can share your Wheel of Time Art here!"
                  artist={profileInfo.userName}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
