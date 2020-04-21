import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "react-dropdown";
import parse from "html-react-parser";

import { Route, Link } from "react-router-dom";
import { fetchShow } from './api/fetchShow.js';
import { formatSeasons } from "./utils/formatSeasons.js";
import Episodes from "./components/Episodes.js";
import Episode from "./components/Episode.js"
import "./styles.css";;

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const episodes = seasons[selectedSeason] || [];

  useEffect(() => {
    fetchShow()
      .then(res => {
        setShow(res.data);
        setSeasons(formatSeasons(res.data._embedded.episodes));
      })

  }, []);

  const handleSelect = e => {
    setSelectedSeason(e.value);
  };


  if (!show) {
    return <h2>Fetching data...</h2>;
  }

  return (
    <div className="App">
      <Link  to={`/`} style={{ textDecoration: 'none', color:'white' }}>
      <img className="poster-img" src={show.image.original} alt={show.name} />
      <h1>{show.name}</h1>
      {parse(show.summary)}
      </Link>
      <Route exact path="/">
      <Dropdown
        options={Object.keys(seasons)}
        onChange={handleSelect}
        value={selectedSeason || "Select a season"}
        placeholder="Select an option"
      />
      <Episodes episodes={episodes} season={selectedSeason} />
      </Route>
      <Route path="/:season/episode/:episodenumber">
        <Episode episodes={episodes}/>
        </Route>
    </div>
  );
}
