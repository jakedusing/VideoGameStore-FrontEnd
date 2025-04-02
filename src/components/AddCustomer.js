import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState(""); // to show success or error messages
  const navigate = useNavigate();

  // handles input change
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // reset message before sending request

    try {
      const response = await fetch("http://localhost:8080/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer),
      });
      if (response.ok) {
        setMessage("Customer added successfully!");
        setCustomer({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
        }); // reset form
        setTimeout(() => navigate("/customers"), 2000); // redirect after 2 sec
      } else {
        setMessage("Error adding customer. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occured while adding the customer.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4.5rem)] bg-gray-900">
      <div className="max-w-md w-full p-6 bg-gray-800 shadow-lg rounded-md text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add New Customer
        </h2>

        {message && <p className="text-center mb-4 text-red-500">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={customer.firstName}
            onChange={handleChange}
            required
            className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={customer.lastName}
            onChange={handleChange}
            required
            className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={customer.email}
            onChange={handleChange}
            required
            className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={customer.phoneNumber}
            onChange={handleChange}
            required
            className="w-full p-2 mb-3 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Add Customer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
