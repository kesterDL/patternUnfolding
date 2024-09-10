import React from "react";
import LandingPage from "./Components/LandingPage/LandingPage";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import Hero_Banner from "./Components/Home_Page_Banner/Hero_Banner";
import NavTabs from "./Components/Navigation_Tabs/NavTabs";
import Adventures from "./Components/Adventures/Adventures";
import BardStories from "./Components/BardShortsPage/BardStories";
import Reader from "./Components/Stories/story-components/Reader";
import ValersNestReader from "./stories/ValersNestReader";
import FormSelector from "./Components/Forms/Form_Selector";

function App() {
  // when in prod, don't be outputting to console.
  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  }

  return (
    <HashRouter>
      <Hero_Banner />
      <Routes>
        <Route exact path="/about" element={<LandingPage />} />
        <Route exact path="/adventures" element={<Adventures />} />
        <Route exact path="/unfold" element={<FormSelector />} />
        <Route exact path="/valersNest" element={<ValersNestReader />} />
        <Route path="*" element={<Navigate to="/about" replace />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
