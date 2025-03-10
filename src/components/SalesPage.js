import { useState, useEffect } from "react";

const SalesPage = () => {
  const [games, setGames] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [customer, setCustomer] = useState(null);
  const [cart, setCart] = useState([]);

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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">New Sale</h1>

      {/* Customer Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter customer phone number"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={searchCustomer} className="bg-blue-500 text-white p-2">
          Search
        </button>
      </div>

      {/* Show Customer Info */}
      {customer && (
        <div className="mb-4 p-2 border">
          <p>
            Customer: {customer.firstName} {customer.lastName}
          </p>
          <p>Email: {customer.email}</p>
        </div>
      )}

      {/* Available Games List */}
      <div>
        <h2 className="text-lg font-bold">Available Games</h2>
        <ul>
          {games.map((game) => (
            <li key={game.id} className="p-2 border-b">
              <span>
                {game.title} ({game.platform}) - ${game.price} - Stock:{" "}
                {game.stock}
              </span>
              <button
                onClick={() => addToCart(game)}
                className="bg-green-500 text-white px-2 py-1"
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Cart Section */}
      <div className="w-1/3 p-4 border-1">
        <h2 className="text-lg font-bold">Cart</h2>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="p-2 border-b flex justify-between">
                  <span>
                    {item.title} ({item.platform}) - ${item.price} x{" "}
                    {item.quantity}
                  </span>
                  <div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-red-500 text-white px-2 py-1 ml-2"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total Price Display */}
            <div className="my-4 p-2 border-t text-right">
              <p className="text-lg font-bold">
                Total: ${totalPrice.toFixed(2)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SalesPage;
