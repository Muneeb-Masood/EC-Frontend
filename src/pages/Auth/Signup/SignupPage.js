import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import '../../../styles.css'; 
//import OtpInput from '../../components/OTPInput/OTPInput';
import Notification from '../../../components/Notification/Notification'; 

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const SignupPage = ({ onSignup }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };
  
    const validatePhone = (phone) => {
      const re = /^\+92[\s\-]?\(?(\d{3})\)?[\s\-]?\d{7}$/;
      return re.test(phone);
    };
  
    const handleSignup = async () => {
      if (!email || !password || !phone) {
        setError("Please fill in all fields.");
        return;
      }
  
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
  
      if (!validatePhone(phone)) {
        setError("Invalid phone number. Please use the format +92XXXXXXXXX, +92 (XXX) XXXXXXX, +92-XXX-XXXXXXX, or +92 XXX XXXXXXX.");
        return;
      }
  
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
  
      setIsLoading(true);
      setError("");
      
      try {
        await axios.post(`${API_BASE_URL}/api/auth/signUp`, {
          email,
          password,
          phone
        });
  
        setShowOtpField(true);
        setSuccessMessage("A verification OTP has been sent to your email.");
      } catch (error) {
        handleApiError(error, "Signup failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleOtpVerification = async () => {
      if (otp.length !== 4 || isNaN(otp)) {
        setError("OTP must be a 4-digit number.");
        return;
      }
  
      setIsLoading(true);
      
      try {
        setSuccessMessage("OTP Verified! Account created successfully.");
        setTimeout(() => {
          onSignup({ email, password, phone });
          resetForm();
        }, 2000);
      } catch (error) {
        handleApiError(error, "OTP verification failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    const resetForm = () => {
      setEmail("");
      setPassword("");
      setPhone("");
      setOtp("");
      setShowOtpField(false);
    };
  
    const handleApiError = (error, defaultMessage) => {
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          defaultMessage;
      setError(errorMessage);
      
      if (process.env.REACT_APP_DEBUG === 'true') {
        console.error('API Error:', error);
      }
    };
  
    useEffect(() => {
      if (email && validateEmail(email)) {
        setError("");
      }
      if (phone && validatePhone(phone)) {
        setError("");
      }
    }, [email, phone]);
  
    return (
      <div className="signupPage">
        <h2 className="heading">🔐Sign Up</h2>
        <p>Create a new account by filling out the fields below.</p>
        
        {error && <div className="error">{error}</div>}
        {successMessage && <div className="success">{successMessage}</div>}
        
        {!showOtpField ? (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password (min 8 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              autoComplete="new-password"
            />
            <input
              type="tel"
              placeholder="Phone Number (+92XXXXXXXXX)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
              autoComplete="tel"
            />
          </>
        ) : (
          <>
            <p>Enter OTP:</p>
            <OtpInput value={otp} onChange={setOtp} />
          </>
        )}
  
        <button
          onClick={showOtpField ? handleOtpVerification : handleSignup}
          className={`button ${isLoading ? 'loading' : ''}`}
          disabled={
            isLoading || 
            (showOtpField ? otp.length !== 4 : !email || !password || !phone)
          }
        >
          {isLoading ? (
            <span className="spinner"></span>
          ) : showOtpField ? "Verify OTP" : "Sign Up"}
        </button>
        
        <p className="linkText">
          Already have an account?{" "}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
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
  export default SignupPage;