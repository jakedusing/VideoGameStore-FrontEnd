import { useState, useEffect } from "react";

const CustomerSalesHistory = ({ customerId }) => {
  const [sales, setSales] = useState({});
  const [expandedOrders, setExpandedOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/sales/customer/${customerId}`)
      .then((res) => res.json())
      .then((data) => {
        // group sales by orderId
        const groupedSales = data.reduce((acc, sale) => {
          if (!acc[sale.orderId]) {
            acc[sale.orderId] = {
              orderDate: sale.orderDate,
              totalPrice: sale.totalPrice,
              games: [],
            };
          }
          acc[sale.orderId].games.push(sale);
          return acc;
        }, {});
        setSales(groupedSales);
      })
      .catch((err) => console.error("Error fetching sales:", err));
  }, [customerId]);

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Sales History</h2>
      {Object.entries(sales).map(([orderId, order]) => (
        <div key={orderId} className="border-b border-gray-300 mb-2">
          <div
            className="cursor-pointer p-3 bg-gray-100 hover:bg-gray-200 flex justify-between"
            onClick={() => toggleOrder(orderId)}
          >
            <span>{new Date(order.orderDate).toLocaleDateString()}</span>
            <span className="font-bold">${order.totalPrice.toFixed(2)}</span>
          </div>
          {expandedOrders.includes(orderId) && (
            <div className="p-3 bg-gray-50">
              {order.games.map((game) => (
                <div key={game.saleId} className="flex justify-between py-1">
                  <span>Game ID: {game.gameId}</span>
                  <span>
                    {game.quantity} × ${game.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomerSalesHistory;
