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

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      <Routes>
        {/* If not logged in, redirect to login */}
        <Route
          path="/"
          element={token ? <VideoGames /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
      </Routes>
    </Router>
  );
}

export default App;
