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
import ApiTextPage from "./Components/ApiTextPage/ApiTextPage";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import { AuthProvider } from "./user/AuthContext";

function App() {
  // when in prod, don't be outputting to console.
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  }

  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route exact path="/about" element={<LandingPage />} />
          <Route exact path="/episodes" element={<EpisodesPage />} />
          <Route exact path="/artgallery" element={<ArtGalleryPage />} />
          <Route exact path="/stories" element={<BardStories />} />
          <Route exact path="/threads" element={<ExploreTheMindPage />} />
          <Route exact path="/contact" element={<ContactUsPage />} />
          <Route exact path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route exact path="/apitext" element={<ApiTextPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/about" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
