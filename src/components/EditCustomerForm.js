import { useState } from "react";

const EditCustomerForm = ({ customer, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phoneNumber: customer.phoneNumber,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/api/customers/${customer.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedCustomer = await response.json();
        onUpdate(updatedCustomer);
      } else {
        console.error("Failed to update customer");
      }
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-2">Edit Customer</h2>
      <div className="mb-2">
        <label className="block text-sm font-medium">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditCustomerForm;
