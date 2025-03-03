import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CustomerSearch from "./CustomerSearch";
import CustomerDetails from "./CustomerDetails";

const CustomerLookupPage = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/customers") {
      setSelectedCustomer(null);
    }
  }, [location.pathname]);

  return (
    <div className="max-w-lg mx-auto mt-6">
      {!selectedCustomer ? (
        <CustomerSearch onSelectCustomer={setSelectedCustomer} />
      ) : (
        <div>
          {/* Back button should now always show when a customer is selected */}
          <button
            className="mb-4 bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setSelectedCustomer(null)}
          >
            Back to Search
          </button>
          <CustomerDetails customer={selectedCustomer} />
        </div>
      )}
    </div>
  );
};

export default CustomerLookupPage;
