import { useState, useEffect } from "react";

const SalesPage = () => {
  const [games, setGames] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [customer, setCustomer] = useState(null);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState(null);

  const employeeId = 1;

  // fetch available games
  useEffect(() => {
    fetch("http://localhost:8080/api/videogames")
      .then((res) => res.json())
      .then((data) => setGames(data))
      .catch((err) => console.error("Error fetching games:", err));
  }, []);

  // search customer by phone
  const searchCustomer = () => {
    fetch(
      `http://localhost:8080/api/customers/search?phoneNumber=${searchPhone}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCustomer(data[0]);
        } else {
          setCustomer(null);
        }
      })
      .catch(() => setCustomer(null));
  };

  // Add game to cart
  const addToCart = (game) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === game.id);
      if (existingItem) {
        // increase quantity if already in cart
        return prevCart.map((item) =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // add new item to cart
        return [...prevCart, { ...game, quantity: 1 }];
      }
    });
  };

  // Remove game from cart
  const removeFromCart = (gameId) => {
    setCart(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === gameId ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0) // remove item if quantity reaches 0
    );
  };

  // Calculate total price of items in the cart
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Complete sale function
  const completeSale = () => {
    if (!customer) {
      setMessage({ type: "error", text: "Please select a customer first." });
      return;
    }

    if (cart.length === 0) {
      setMessage({
        type: "error",
        text: "Cart is empty. Add items to proceed.",
      });
      return;
    }

    const saleData = {
      customerId: customer.id,
      orderDate: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      employeeId: employeeId,
      items: cart.map((item) => ({
        gameId: item.id,
        quantity: item.quantity,
      })),
    };

    fetch("http://localhost:8080/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(saleData),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage({
          type: "success",
          text: `Sale completed! Order ID: ${data.orderId}`,
        });

        setCart([]);

        // Re-fetch updated game list
        fetch("http://localhost:8080/api/videogames")
          .then((res) => res.json())
          .then((data) => setGames(data))
          .catch((err) => console.error("Error fetching updated games:", err));
      })
      .catch((err) => {
        setMessage({
          type: "error",
          text: "Error completing sale. Please try again.",
        });
        console.error("Error:", err);
      });
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4 text-gray-100">New Sale</h1>

      {/* Customer Search */}
      <div className="mb-6 flex items-center">
        <input
          type="text"
          placeholder="Enter customer phone number"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          className="bg-gray-800 border border-gray-700 text-white p-2 rounded-md w-64 mr-2"
        />
        <button
          onClick={searchCustomer}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Search
        </button>
      </div>

      {/* Show Customer Info */}
      {customer && (
        <div className="mb-6 p-4 bg-gray-800 border border-gray-700 rounded-md">
          <p>
            <span className="font-semibold text-gray-300">Customer: </span>
            {customer.firstName} {customer.lastName}
          </p>
          <p>
            <span className="font-semibold text-gray-300">Email: </span>
            {customer.email}
          </p>
        </div>
      )}

      <div className="flex gap-6">
        {/* Available Games List */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4 text-gray-100">
            Available Games
          </h2>
          <ul className="space-y-4 min-h-[400px]">
            {games.map((game) => (
              <li
                key={game.id}
                className="p-4 bg-gray-800 border border-gray-700 rounded-md flex justify-between items-center"
              >
                <span>
                  {game.title} ({game.platform}) - ${game.price} - Stock:{" "}
                  {game.stock}
                </span>
                <button
                  onClick={() => addToCart(game)}
                  className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded-md"
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Cart Section */}
        <div className="w-1/3 p-4 mt-11 bg-gray-800 border border-gray-700 rounded-md self-start">
          <h2 className="text-xl font-bold mb-4 text-gray-100">Cart</h2>
          {cart.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <>
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="p-4 bg-gray-700 rounded-md flex justify-between items-center"
                  >
                    <span>
                      {item.title} ({item.platform}) - ${item.price} x{" "}
                      {item.quantity}
                    </span>
                    <div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-md"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Total Price Display */}
              <div className="my-4 p-4 bg-gray-700 rounded-md text-right">
                <p className="text-lg font-bold text-gray-200">
                  Total: ${totalPrice.toFixed(2)}
                </p>
              </div>

              {/* Complete Sale Button */}
              <button
                onClick={completeSale}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 w-full rounded-md mt-4"
              >
                Complete Sale
              </button>
            </>
          )}
          {/* Message Display */}
          {message && (
            <div
              className={`mt-4 p-3 rounded-md text-center ${
                message.type === "success"
                  ? "bg-green-700 text-green-300"
                  : "bg-red-700 text-red-300"
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesPage;
