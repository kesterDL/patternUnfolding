import React from "react";
import LandingPage from "./Components/LandingPage/LandingPage";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import EpisodesPage from "./Components/EpisodesPage/EpisodesPage";
import ArtGalleryPage from "./Components/ArtGalleryPage/ArtGalleryPage";
import ValersNestReader from "./stories/ValersNestReader";
import ExploreTheMindPage from "./Components/MindMapPage/ExploreTheMindPage";

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
        <Route exact path="/valersNest" element={<ValersNestReader />} />
        <Route exact path="/mindMap" element={<ExploreTheMindPage />} />
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
