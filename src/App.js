import React, { useEffect, useState } from "react";
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
// import Customers from "./components/Customers";
import AddCustomer from "./components/AddCustomer";
import Navbar from "./components/Navbar";
// import CustomerSearch from "./components/CustomerSearch";
// import CustomerDetails from "./components/CustomerDetails";
import CustomerLookupPage from "./components/CustomerLookupPage";
import SalesPage from "./components/SalesPage";
import AddGame from "./components/AddGame";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    fetch("http://localhost:8080/api/employees/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid token");
        }
        return res.json();
      })
      .then(() => setIsLoading(false))
      .catch(() => {
        localStorage.removeItem("token");
        setToken(null);
        setIsLoading(false);
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        <Route
          path="/customers"
          element={token ? <CustomerLookupPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-customer"
          element={token ? <AddCustomer /> : <Navigate to="/login" />}
        />
        <Route
          path="/sales"
          element={token ? <SalesPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-game"
          element={token ? <AddGame /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
