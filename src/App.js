import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import "./App.css";
import VideoGames from "./components/VideoGames";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        {/* If not logged in, redirect to login */}
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/videogames"
          element={token ? <VideoGames /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
