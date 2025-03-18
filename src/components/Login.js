import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState(""); // email state to store user input
  const [password, setPassword] = useState(""); // password state to store user input
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // sending POST request to the backend Login endpoint with the email and password
      const response = await fetch(
        "http://localhost:8080/api/employees/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" }, // sending data as JSON
          body: JSON.stringify({ email, password }), // sending the email and password in the request body
        }
      );

      // Parsing JSON response from server
      const data = await response.json();

      // if the response is successful and a token is returned
      if (response.ok && data.token) {
        localStorage.setItem("token", data.token); // store token
        setToken(data.token); // update React state
        navigate("/");
      } else {
        alert("Invalid Login");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:ring-2 focus:outline-none transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:ring-2 focus:outline-none transition-all"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md transition-all duration-200 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
