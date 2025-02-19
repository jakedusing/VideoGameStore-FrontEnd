import React, { useState, useEffect } from "react";
import axios from "axios";

function VideoGames() {
  const [videoGames, setVideoGames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/videogames")
      .then((response) => {
        setVideoGames(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the video games:", error);
      });
  }, []);

  return (
    <div>
      <h1>Video Games</h1>
      <ul>
        {videoGames.map((game) => (
          <li key={game.game_id}>
            <h2>{game.title}</h2>
            <p>{game.genre}</p>
            <p>{game.platform}</p>
            <p>{game.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VideoGames;
