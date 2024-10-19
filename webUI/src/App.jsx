import React from "react";
import LandingPage from "./Components/LandingPage/LandingPage";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import EpisodesPage from "./Components/EpisodesPage/EpisodesPage";
import ArtGalleryPage from "./Components/ArtGalleryPage/ArtGalleryPage";
import ExploreTheMindPage from "./Components/MindMapPage/ExploreTheMindPage";
import BardStories from "./Components/BardShortsPage/BardStories";
import ValersNest from "./Components/Stories/story-components/ValersNest";
import UserSignUp from "./Components/Users/UserSignUp";
import SignIn from "./Components/Users/SignIn";

function App() {
  // when in prod, don't be outputting to console.
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  }

  return (
    <HashRouter>
      <Routes>
        <Route exact path="/about" element={<LandingPage />} />
        <Route exact path="/episodes" element={<EpisodesPage />} />
        <Route exact path="/artgallery" element={<ArtGalleryPage />} />
        <Route exact path="/stories" element={<BardStories />} />
        <Route exact path="/threads" element={<ExploreTheMindPage />} />
        <Route exact path="/valersNest" element={<ValersNest />} />
        <Route exact path="/signUp" element={<UserSignUp />} />
        <Route exact path="/signIn" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
