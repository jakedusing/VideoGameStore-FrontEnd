import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VideoGames() {
  const [videoGames, setVideoGames] = useState([]);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    // Clear the token from LocalStorage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Video Games</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videoGames.map((game) => (
            <li
              key={game.game_id}
              className="bg-blue-50 border border-blue-200 shadow-sm rounded-lg p-4"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {game.title}
              </h2>
              <p className="text-gray-700">
                <strong>Genre:</strong> {game.genre}
              </p>
              <p className="text-gray-700">
                <strong>Platform:</strong> {game.platform}
              </p>
              <p className="text-gray-600 font-semibold">
                <strong>Price:</strong> ${game.price}
              </p>
              <p className="text-gray-700">
                <strong>Stock:</strong> {game.stock}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VideoGames;
