import { useState } from "react";

const CustomerSearch = ({ onSelectCustomer }) => {
  //console.log("onSelectCustomer prop:", onSelectCustomer);
  const [phone, setPhone] = useState("");
  const [customers, setCustomers] = useState([]);

  const handlePhoneChange = (e) => {
    let input = e.target.value.replace(/\D/g, ""); // remove non-numeric characters

    if (input.length > 6) {
      input = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(
        6,
        10
      )}`;
    } else if (input.length > 3) {
      input = `(${input.slice(0, 3)}) ${input.slice(3)}`;
    } else if (input.length > 0) {
      input = `(${input}`;
    }

    setPhone(input);
  };

  const formatForAPI = (formattedPhone) => {
    return formattedPhone
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  };

  const handleSearch = () => {
    const formattedPhoneForAPI = formatForAPI(phone);
    fetch(
      `http://localhost:8080/api/customers/search?phoneNumber=${formattedPhoneForAPI}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setCustomers([]); // if nothing comes back, no phone number matched, return set customers as empty array
        } else {
          setCustomers(data);
        }
      })
      .catch((err) => console.error("Error fetching customers:", err));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Search Customer</h2>
      <input
        type="text"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="(123) 456-7890"
        className="border p-2 mr-2"
        maxLength="14"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Search
      </button>

      {customers.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Select a Customer:</h3>
          {customers.map((cust) => (
            <div
              key={cust.id}
              className="p-2 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => onSelectCustomer(cust)}
            >
              {cust.firstName} {cust.lastName} - {cust.phoneNumber}
            </div>
          ))}
        </div>
      )}
      {customers.length === 0 && phone !== "" && (
        <p className="text-red-500 mt-2">
          No customer found with that phone number.
        </p>
      )}
    </div>
  );
};

export default CustomerSearch;
