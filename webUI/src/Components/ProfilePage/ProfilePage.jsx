import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import styles from "./ProfilePage.module.css";
import { jwtDecode } from "jwt-decode";

function ProfilePage() {
  const [profileInfo, setProfileInfo] = useState({
    profilePhoto:
      "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/eyeless.webp",
    userName: "ABC",
    email: "abc@email.com",
  });

  useEffect(() => {
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
    <div className={styles.profilePage}>
      <Helmet>
        <title>Profile Page</title>
      </Helmet>
      <h1>Profile Page</h1>
      <div className={styles.profileInfoSection}>
        <div
          className={styles.profilePhoto}
          style={{ backgroundImage: `url(${profileInfo.profilePhoto})` }}
        ></div>
        <div className={styles.profileInfo}>
          <h2>{profileInfo.userName}</h2>
          <p>{profileInfo.email}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
