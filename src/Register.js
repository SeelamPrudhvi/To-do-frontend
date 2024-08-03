import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        email,
        password,
      });
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div>
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
      {message && <p>{message}</p>}
      <p>
        Already registered?{" "}
        <button
          onClick={handleLoginRedirect}
          style={{
            cursor: "pointer",
            color: "blue",
            textDecoration: "underline",
          }}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;
