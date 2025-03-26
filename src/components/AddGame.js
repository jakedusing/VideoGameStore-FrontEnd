import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddGame() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    platform: "",
    price: "",
    stock: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    axios
      .post("http://localhost:8080/api/videogames/add", formData)
      .then(() => {
        setSuccessMessage("Game added successfully!");
        setTimeout(() => navigate("/videogames"), 1500); // redirect after 1.5 sec
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrorMessage("Game already exists!");
        } else {
          setErrorMessage("Error adding game. Try again.");
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center p-6">
      <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Add New Game
        </h2>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border px-3 py-2 mb-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="text"
            name="platform"
            placeholder="Platform"
            value={formData.platform}
            onChange={handleChange}
            className="border px-3 py-2 mb-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border px-3 py-2 mb-2 bg-gray-700 text-white rounded"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="border px-3 py-2 mb-2 bg-gray-700 text-white rounded"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add Game
          </button>
          <button
            type="button"
            onClick={() => navigate("/videogames")}
            className="mt-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddGame;
