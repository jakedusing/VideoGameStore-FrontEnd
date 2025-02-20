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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
