import { useState } from "react";
import CustomerSalesHistory from "./CustomerSalesHistory";

const CustomerDetails = ({ customer }) => {
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold">Customer Details</h2>
      <p>
        <strong>Name:</strong> {customer.firstName} {customer.lastName}
      </p>
      <p>
        <strong>Phone:</strong> {customer.phoneNumber}
      </p>
      <p>
        <strong>Email:</strong> {customer.email}
      </p>

      <button
        onClick={() => setShowHistory(!showHistory)}
        className="mt-4 bg-green-500 text-white px-4 py-2"
      >
        {showHistory ? "Hide" : "View"} Order History
      </button>

      {showHistory && <CustomerSalesHistory customerId={customer.id} />}
    </div>
  );
};

export default CustomerDetails;
