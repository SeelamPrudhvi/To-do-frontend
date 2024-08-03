import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; // Import the CSS file

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      setToken(response.data.token);
      setMessage("Login successful");
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
      <p>
        Don't have an account?{" "}
        <button
          onClick={handleRegisterRedirect}
          className="register-button" // Apply the CSS class
        >
          Register
        </button>
      </p>
    </div>
  );
};

export default Login;
