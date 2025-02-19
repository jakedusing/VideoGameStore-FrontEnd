import React from "react";
import "./App.css";
import VideoGames from "./components/VideoGames";
import Customers from "./components/Customers";
import Employees from "./components/Employees";

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Video Game Store</h1>
      <Employees />
      <VideoGames />
      <Customers />
    </div>
  );
}

export default App;
