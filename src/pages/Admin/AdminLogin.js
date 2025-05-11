import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../styles.css";
import axios from 'axios';
import '../../components/Notification/Notification';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const AdminLogin = ({ onAdminLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const handleApiError = (error, defaultMessage) => {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          defaultMessage;
      setError(errorMessage);
      
      if (process.env.REACT_APP_DEBUG === 'true') {
        console.error('API Error:', error);
      }
    };

    const handleLogin = async () => {
      if (!username || !password) {
        setError("Please fill in all fields.");
        return;
      }
      try {
        const response = await axios.post(`${API_BASE_URL}/api/login/adminLogin`, {
          username,
          password,
        });
        console.log(response.data.token)
        localStorage.setItem('AdminLoginToken', response.data.token);
          onAdminLogin();
         
      } catch (error) {
        handleApiError(error, "Login failed. Please try again.");
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