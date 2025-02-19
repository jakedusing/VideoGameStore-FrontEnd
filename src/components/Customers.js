import React, { useState, useEffect } from "react";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]);

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

  return (
    <div>
      <h1>Customers</h1>
      <ul>
        {customers.map((customer) => (
          <li key={customer.customer_id}>
            <h2>
              {customer.firstName} {customer.lastName}
            </h2>
            <p>{customer.email}</p>
            <p>{customer.phoneNumber}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Customers;
