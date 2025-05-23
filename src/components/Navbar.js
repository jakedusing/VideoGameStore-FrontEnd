import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: nav links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-400 transition">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile" className="hover:text-gray-400 transition">
              View Profile
            </Link>
          </li>
          <li>
            <Link to="/videogames" className="hover:text-gray-400 transition">
              Stock
            </Link>
          </li>
          <li>
            <Link to="/salesreport" className="hover:text-gray-400 transition">
              View Sales
            </Link>
          </li>
          <li>
            <Link to="/customers" className="hover:text-gray-400 transition">
              Customers
            </Link>
          </li>
          <li>
            <Link to="/add-customer" className="hover:text-gray-400 transition">
              Add Customer
            </Link>
          </li>
        </ul>

        {/* Right side: Logout button (only shown when logged in) */}
        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rouded transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
