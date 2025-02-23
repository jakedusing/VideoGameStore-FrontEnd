import React, { useState, useEffect } from "react";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]); // stores all customers
  const [searchQuery, setSearchQuery] = useState(""); // stores the search input
  const [isSearching, setIsSearching] = useState(false); // track is user is viewing search results

  // get all customers when the component loads
  const fetchAllCustomers = () => {
    axios
      .get("http://localhost:8080/api/customers")
      .then((response) => {
        setCustomers(response.data);
        setIsSearching(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the customers:", error);
      });
  };

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  // function to handle search
  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      return; // don't search if input is empty
    }

    try {
      axios
        .get(
          `http://localhost:8080/api/customers/search?firstName=${searchQuery}`
        )
        .then((response) => {
          setCustomers(response.data);
          setIsSearching(true);
        });
    } catch (error) {
      console.error("Error searchign for customers:", error);
    }
  };

  // function to reset search and show all customers again
  const handleReset = () => {
    setSearchQuery(""); // clear search input
    fetchAllCustomers(); // fetch all customers
  };

  // handle enter key press in the search input
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      {/* Search Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by first name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Listen for Enter key
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
        {isSearching && (
          <button
            onClick={handleReset}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
        )}
      </div>

      {/* Customer List */}
      <ul className="border rounded p-4">
        {customers.length > 0 ? (
          customers.map((customer) => (
            <li key={customer.id} className="border-b py-2">
              <strong>
                {customer.firstName} {customer.lastName}
              </strong>{" "}
              - {customer.email} ({customer.phoneNumber})
            </li>
          ))
        ) : (
          <p>No customers found.</p>
        )}
      </ul>
    </div>
  );
}

export default Customers;
