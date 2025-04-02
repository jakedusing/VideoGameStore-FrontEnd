import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    // Clear the token from LocalStorage
    localStorage.removeItem("token");
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex flex-col items-center justify-center bg-gray-900 text-white relative">
      {/* Company info (Top Right) */}
      <div className="absolute top-5 right-5 text-right">
        <h2 className="text-2xl font-bold">Game Haven</h2>
        <p className="text-sm">1234 Retro Lane, Pixel City, VG 90001</p>
        <p className="text-sm">Phone: (555) 123-4567</p>
      </div>

      {/* Main Content */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>

        {/* Navigation Buttons */}
        <div className="flex flex-col space-y-4">
          <Link
            to="/profile"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg"
          >
            Profile
          </Link>
          <Link
            to="/videogames"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg"
          >
            Video Games
          </Link>
          <Link
            to="/sales"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg"
          >
            Sales
          </Link>
          <Link
            to="/customers"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg"
          >
            Customers
          </Link>
          <Link
            to="/add-customer"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg"
          >
            Add Customer
          </Link>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Date and Time (Bottom) */}
      <div className="absolute bottom-5 text-lg font-semibold">
        {dateTime.toLocaleDateString()} {dateTime.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default Dashboard;
