import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import VideoGames from "./components/VideoGames";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <Router>
      {token && <Navbar token={token} setToken={setToken} />}
      <Routes>
        {/* If not logged in, redirect to login */}
        <Route
          path="/"
          element={
            token ? <Dashboard setToken={setToken} /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route
          path="/videogames"
          element={token ? <VideoGames /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
