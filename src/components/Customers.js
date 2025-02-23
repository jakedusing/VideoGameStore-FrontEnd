import React, { useState, useEffect } from "react";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]); // stores all customers
  const [searchQuery, setSearchQuery] = useState(""); // stores the search input

  // get all customers when the component loads
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the customers:", error);
      });
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
        });
    } catch (error) {
      console.error("Error searchign for customers:", error);
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
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
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
