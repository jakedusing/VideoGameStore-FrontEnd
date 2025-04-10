import axios from "axios";
import { useState, useEffect } from "react";

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/reports/daily-sales")
      .then((response) => setSalesData(response.data))
      .catch((error) => console.error("Error fetching sales data:", error));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 shadow-lg rounded-md text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Daily Sales Report
      </h2>
      <table className="w-full border-collapse border border-gray-600">
        <thead>
          <tr className="bg-gray-700">
            <th className="border border-gray-600 p-2">Date</th>
            <th className="border border-gray-600 p-2">Total Orders</th>
            <th className="border border-gray-600 p-2">Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.saleDate} className="text-center">
              <td className="border border-gray-600 p-2">{sale.saleDate}</td>
              <td className="border border-gray-600 p-2">{sale.totalOrders}</td>
              <td className="border border-gray-600 p-2">
                {sale.totalRevenue.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;
