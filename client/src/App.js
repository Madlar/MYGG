import * as React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import './App.css';
import LandingPage from "./components/views/LandingPage/LandingPage";
import ChampionPage from "./components/views/ChampionPage/ChampionPage";
import ArmaPage from "./components/views/ArmaPage/ArmaPage";
import NavBar from "./components/views/NavBar/NavBar";
import SummonerPage from "./components/views/SummonerPage/SummonerPage";
import IsExist from './hoc/isExist'

function App() {

  const WithIsExist = IsExist(SummonerPage)

  return (
    <div className="App">
      {/* Routes nest inside one another. Nested route paths build upon
      parent route paths, and nested route elements render inside
      parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route element={<NavBar />} >
          <Route path="/" element={<LandingPage />} />
          <Route path="/summoner/userName=:name" element={<WithIsExist />} />
          <Route path="/champion" element={<ChampionPage />} />
          <Route path="/arma" element={<ArmaPage />} />
          {/* Using path="*"" means "match anything", so this route
          acts like a catch-all for URLs that we don't have explicit
          routes for. */}
          <Route path="*" element={<NoMatch />} />
          </Route>
      </Routes>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;
