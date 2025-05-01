import React, { useState } from "react";
import { Helmet } from "react-helmet";
import styles from "./ImageUploadPage.module.css";
import { jwtDecode } from "jwt-decode";

function ImageUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [titleName, setTitleName] = useState(null);

  const fetchPresignedUrl = async (file, token) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      var payload = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ httpMethod: "POST", file_name: titleName }),
      };
      const response = await fetch(
        "https://enwvvfsu32.execute-api.us-east-1.amazonaws.com/v1/upload",
        payload
      );

      const responseJson = await response.json();
      return JSON.parse(responseJson.body);
    } catch (error) {
      console.error();
      console.error("Upload error:", error);
    }
  };

  const uploadFile = async (presignedUrl, file) => {
    try {
      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
      });
      if (response.ok) {
        return true;
      } else {
        alert("File upload failed.");
        return false;
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const handleTitleNameChange = (event) => {
    if (
      event.target &&
      event.target.value &&
      event.target.value.length > 0 &&
      event.target.value.length <= 100 &&
      event.target.value.match(/^[a-zA-Z0-9-_]+$/)
    ) {
      setTitleName(event.target.value);
    } else {
      alert(
        "Invalid file name. Please enter a title that is 1-100 characters long and contains only letters, numbers, hyphens, and underscores."
      );
      setTitleName(null);
      event.target.value = ""; // Reset the file input
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/webp"];
      if (validImageTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        alert(
          "Invalid file type. Please upload an image (JPEG, PNG, GIF, or WEBP)."
        );
        setSelectedFile(null);
        event.target.value = ""; // Reset the file input
      }
    }
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    // Get JWT from local storage
    const token = localStorage.getItem("idToken");
    if (!token) {
      throw new Error("No authentication token found");
    }
    // Decode JWT to get account_sub
    const decoded = jwtDecode(token);
    const account_sub = decoded.sub;
    if (selectedFile) {
      const presignedResponse = await fetchPresignedUrl(selectedFile, token);
      const presignedUrl = presignedResponse.presignedUrl;
      const s3Key = presignedResponse.pathToImage;
      const uploadSuccessful = await uploadFile(presignedUrl, selectedFile);
      if (uploadSuccessful) {
        // Call api to associate the image with the user
        // Redirect to the user's profile page
      }
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <div className={styles.imageUploadPage}>
      <Helmet>
        <title>Image Upload</title>
      </Helmet>
      <form onSubmit={handleUpload} className={styles.uploadForm}>
        <input
          type="file"
          accept="image/*" // Restrict file input to images only
          onChange={handleFileChange}
          className={styles.fileInput}
        />
        <input
          type="text"
          placeholder="Title of your work"
          onChange={handleTitleNameChange}
          className={styles.fileName}
        />
        <button
          type="submit"
          className={styles.uploadButton}
          disabled={!selectedFile || !titleName}
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default ImageUploadPage;
