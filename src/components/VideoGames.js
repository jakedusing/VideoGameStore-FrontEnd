import React, { useState, useEffect } from "react";
import axios from "axios";

function VideoGames() {
  const [videoGames, setVideoGames] = useState([]);
  const [editingGameId, setEditingGameId] = useState(null); // Track the game being edited
  const [updatedValues, setUpdatedValues] = useState({}); // Store changes for individual game
  const [sortBy, setSortBy] = useState("title"); // Default sorting by title
  const [searchTerm, setSearchTerm] = useState(""); // Search term for platform

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Video Game Stock
        </h1>

        {/* Sorting and Search */}
        <div className="mb-4 flex items-center space-x-4">
          {/* Sorting Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-2 py-1"
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
            className="border px-2 py-1"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Platform</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Stock</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedGames.map((game) => (
                <tr key={game.id} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">
                    {game.title}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {game.platform}
                  </td>

                  {/* Price */}
                  <td className="border border-gray-300 px-4 py-2">
                    {editingGameId === game.id ? (
                      <input
                        type="number"
                        value={updatedValues[game.id]?.price ?? game.price}
                        onChange={(e) =>
                          handleInputChange(game.id, "price", e.target.value)
                        }
                        className="border px-2 py-1 w-20"
                      />
                    ) : (
                      <span>${game.price}</span>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="border border-gray-300 px-4 py-2">
                    {editingGameId === game.id ? (
                      <input
                        type="number"
                        value={updatedValues[game.id]?.stock ?? game.stock}
                        onChange={(e) =>
                          handleInputChange(game.id, "stock", e.target.value)
                        }
                        className="border px-2 py-1 w-20"
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
                          className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => startEditing(game.id)}
                        className="bg-blue-500 text-white px-2 py-1 rounded ml-2"
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
