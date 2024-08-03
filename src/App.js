import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import Navbar from "./Navbar";
import Home from "./Home";

const App = () => {
  const [token, setToken] = useState("");

  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/"
            element={token ? <Home token={token} /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
