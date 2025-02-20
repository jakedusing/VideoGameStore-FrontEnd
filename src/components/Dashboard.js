import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from LocalStorage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>This is the main area after login. Future features will go here.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
