import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VideoGames() {
  const [videoGames, setVideoGames] = useState([]);
  const [editingGameId, setEditingGameId] = useState(null); // Track the game being edited
  const [updatedValues, setUpdatedValues] = useState({}); // Store changes for individual game
  const [sortBy, setSortBy] = useState("title"); // Default sorting by title
  const [searchTerm, setSearchTerm] = useState(""); // Search term for platform

  const navigate = useNavigate();

  // Fetch video games data
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/videogames")
      .then((response) => setVideoGames(response.data))
      .catch((error) => console.error("Error fetching video games:", error));
  }, []);

  // Start editing the selected game
  const startEditing = (gameId) => {
    setEditingGameId(gameId); // Set the game as editable
    setUpdatedValues((prev) => ({
      ...prev,
      [gameId]: {
        price: videoGames.find((game) => game.id === gameId)?.price,
        stock: videoGames.find((game) => game.id === gameId)?.stock,
      },
    })); // Reset updated values when starting editing
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingGameId(null); // Cancel editing and reset state
    setUpdatedValues({});
  };

  // Handle input changes for price and stock
  const handleInputChange = (gameId, field, value) => {
    setUpdatedValues((prev) => ({
      ...prev,
      [gameId]: {
        ...prev[gameId],
        [field]: value,
      },
    }));
  };

  // Save the updated data
  const handleUpdate = (gameId) => {
    const gameData = updatedValues[gameId];

    // Make sure the data has valid price and stock values
    if (gameData?.price === undefined || gameData?.stock === undefined) {
      console.error("Price or Stock is not defined!");
      return;
    }

    axios
      .put(`http://localhost:8080/api/videogames/${gameId}`, gameData)
      .then(() => {
        axios
          .get("http://localhost:8080/api/videogames")
          .then((response) => setVideoGames(response.data)); // Reload data
        cancelEditing(); // Exit editing mode
      })
      .catch((error) => console.error("Update failed:", error));
  };

  // Sort the video games based on selected criteria
  const sortGames = (games) => {
    return games.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortBy === "price") {
        return a.price - b.price;
      } else if (sortBy === "stock") {
        return a.stock - b.stock;
      }
      return 0;
    });
  };

  // Filter games by platform based on search term
  const filterGamesByPlatform = (games) => {
    return games.filter((game) =>
      game.platform.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Apply sorting and filtering
  const filteredAndSortedGames = filterGamesByPlatform(sortGames(videoGames));

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6">
      <div className="w-full max-w-6xl bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Video Game Stock
        </h1>

        {/* Add New Game Button */}
        <button
          onClick={() => navigate("/add-game")}
          className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Game
        </button>

        {/* Sorting and Search */}
        <div className="mb-4 flex items-center space-x-4">
          {/* Sorting Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-2 py-1 bg-gray-700 text-gray-200 rounded"
          >
            <option value="title">Sort by Title</option>
            <option value="price">Sort by Price</option>
            <option value="stock">Sort by Stock</option>
          </select>

          {/* Search Input for Platform */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Platform"
            className="border px-2 py-1 bg-gray-700 text-gray-200 rounded"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="border-b-2">
              <tr className="bg-gray-700 text-white">
                <th className="border border-gray-600 px-4 py-2">Title</th>
                <th className="border border-gray-600 px-4 py-2">Platform</th>
                <th className="border border-gray-600 px-4 py-2">Price</th>
                <th className="border border-gray-600 px-4 py-2">Stock</th>
                <th className="border border-gray-600 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedGames.map((game, index) => (
                <tr
                  key={game.id}
                  className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
                >
                  <td className="border border-gray-300 px-4 py-2 text-white">
                    {game.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-white">
                    {game.platform}
                  </td>

                  {/* Price */}
                  <td className="border px-4 py-2 text-white">
                    {editingGameId === game.id ? (
                      <input
                        type="number"
                        value={updatedValues[game.id]?.price ?? game.price}
                        onChange={(e) =>
                          handleInputChange(game.id, "price", e.target.value)
                        }
                        className="border px-2 py-1 bg-gray-700 text-white w-20 rounded"
                      />
                    ) : (
                      <span>${game.price}</span>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="border px-4 py-2 text-white">
                    {editingGameId === game.id ? (
                      <input
                        type="number"
                        value={updatedValues[game.id]?.stock ?? game.stock}
                        onChange={(e) =>
                          handleInputChange(game.id, "stock", e.target.value)
                        }
                        className="border px-2 py-1 bg-gray-700 text-white w-20 rounded"
                      />
                    ) : (
                      <span>{game.stock}</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="border border-gray-300 px-4 py-2">
                    {editingGameId === game.id ? (
                      <>
                        <button
                          onClick={() => handleUpdate(game.id)}
                          className="bg-green-500 text-white px-2 py-1 rounded ml-2 hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="bg-gray-500 text-white px-2 py-1 rounded ml-2 hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => startEditing(game.id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded ml-2 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VideoGames;
