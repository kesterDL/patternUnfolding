import React from "react";
import LandingPage from "./Components/LandingPage/LandingPage";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import EpisodesPage from "./Components/EpisodesPage/EpisodesPage";
import ArtGalleryPage from "./Components/ArtGalleryPage/ArtGalleryPage";
import ExploreTheMindPage from "./Components/MindMapPage/ExploreTheMindPage";
import BardStories from "./Components/BardShortsPage/BardStories";
import ContactUsPage from "./Components/ContactUsPage/ContactUsPage";
import SignInPage from "./Components/Users/SignInPage";
import SignUpPage from "./Components/Users/SignUpPage";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import ImageUploadPage from "./Components/ImageUploadPage/ImageUploadPage";
import { AuthProvider } from "./user/AuthContext";

function App() {
  // when in prod, don't be outputting to console.
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  }
  const myName: string = "nate";

  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/about" element={<LandingPage />} />
          <Route path="/episodes" element={<EpisodesPage />} />
          <Route path="/artgallery" element={<ArtGalleryPage />} />
          <Route path="/stories" element={<BardStories />} />
          <Route path="/threads" element={<ExploreTheMindPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/upload" element={<ImageUploadPage />} />
          <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
