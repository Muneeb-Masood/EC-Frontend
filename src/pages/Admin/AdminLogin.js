import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../styles.css";
import '../../components/Notification/Notification';

const AdminLogin = ({ onAdminLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleLogin = () => {
      if (!username || !password) {
        setError("Please fill in all fields.");
        return;
      }
      if (username === "a" && password === "a") {
        onAdminLogin();
        // Clear fields after successful login
        setUsername("");
        setPassword("");
      } else {
        setError("Invalid credentials.");
      }
    };
  
    return (
      <div className="adminLogin">
        <h2 className="heading"> 🗝️Admin Login</h2>
        <h5>Restricted Access – Authorized Personnel Only</h5>
        <p>Enter Your Admin Credentials to Proceed</p>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button
          onClick={handleLogin}
          className="button"
          disabled={!username || !password}
        >
          Login
        </button>
        <p className="linkText">
          <Link to="/" className="link">
            Back to Home
          </Link>
        </p>
            {/* Footer */}
            <div className="footer">
          <p>© 2025 Zentron. All rights reserved.</p>
          <p>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Contact Us</a>
          </p>
        </div>
      </div>
    );
  };
  
  
  export default AdminLogin;  