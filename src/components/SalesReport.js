import axios from "axios";
import { useState, useEffect } from "react";

const SalesReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [topGames, setTopGames] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/reports/daily-sales")
      .then((response) => setSalesData(response.data))
      .catch((error) => console.error("Error fetching sales data:", error));

    axios
      .get("http://localhost:8080/api/reports/top-games")
      .then((response) => setTopGames(response.data))
      .catch((error) => console.error("Error fetching sales data:", error));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 shadow-lg rounded-md text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Sales Dashboard</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Daily Sales Table */}
        <div className="bg-gray-800 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Daily Sales
          </h3>
          <table className="w-full border-collapse border border-gray-600 text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 p-2">Date</th>
                <th className="border border-gray-600 p-2">Orders</th>
                <th className="border border-gray-600 p-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale) => (
                <tr key={sale.saleDate} className="text-center">
                  <td className="border border-gray-600 p-2">
                    {sale.saleDate}
                  </td>
                  <td className="border border-gray-600 p-2">
                    {sale.totalOrders}
                  </td>
                  <td className="border border-gray-600 p-2">
                    ${sale.totalRevenue.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Games Table */}
        <div className="bg-gray-800 p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Top 10 Selling Games
          </h3>
          <table className="w-full border-collapse border border-gray-600 text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 p-2">Title</th>
                <th className="border border-gray-600 p-2">Total Sold</th>
              </tr>
            </thead>
            <tbody>
              {topGames.map((game, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-600 p-2">{game.title}</td>
                  <td className="border border-gray-600 p-2">
                    {game.totalSold}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
