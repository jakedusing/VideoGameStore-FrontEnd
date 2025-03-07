import { useState, useEffect } from "react";

const SalesPage = () => {
  const [games, setGames] = useState([]);
  const [searchPhone, setSearchPhone] = useState("");
  const [customer, setCustomer] = useState(null);

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
              {game.title} ({game.platform}) - ${game.price} - Stock:{" "}
              {game.stock}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SalesPage;
