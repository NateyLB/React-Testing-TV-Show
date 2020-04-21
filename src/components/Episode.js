import React from 'react';
import parse from 'html-react-parser';
import { useRouteMatch } from "react-router-dom";



const Episode = props =>{
    const { path, url } = useRouteMatch();
    console.log(url,"url")
    console.log(props.episodes)
    const episodeNumber = parseInt(url.slice (18));

    const episode = props.episodes[episodeNumber-1]
    console.log(episode)
    return (
        <div className="episode" key={episode.id}>
          {episode.image && (
            <img className="episode-image" src={episode.image.medium} alt={episode.name} />
          )}
          <div className="episode-info">
            <p className="episode-number">
              Season {episode.season}, Episode {episode.number}
            </p>
            <h3>{episode.name}</h3>
            {episode.summary && parse(episode.summary)}
            <div className="flex-spacer" />
            <p className="episode-runtime">{episode.runtime} minutes</p>
          </div>
        </div>
    )
}

export default Episode;