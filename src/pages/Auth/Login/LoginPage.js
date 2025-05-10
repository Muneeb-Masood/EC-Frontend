import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import "../../../styles.css";
import OtpInput from '../../../components/OTPInput/OTPInput';
import Notification from '../../../components/Notification/Notification';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpField, setShowOtpField] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [geoLocation, setGeoLocation] = useState({ 
    latitude: null, 
    longitude: null 
  });

  // Generate device fingerprint
  // const generateFingerprint = async () => {

  //         const fp = await FingerprintJS.load();
  //         const result = await fp.get();
  

  //     console.log(result.visitorId)
  //     return result.visitorId;

  // };

  // Email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle login submission
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError("");
    
    try {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      console.log(result.visitorId)
      const fingerprint = result.visitorId;
      const response = await axios.post(`${API_BASE_URL}/api/login/login`, {
        email,
        password,
        fingerprint,
        latitude: geoLocation.latitude,
        longitude: geoLocation.longitude
      });

      if (response.data.otpToken) {
        setOtpToken(response.data.otpToken);
        setShowOtpField(true);
        setSuccessMessage("An OTP has been sent to your email.");
      } else {
        handleSuccessfulLogin(response.data.token, response.data.kycVerificaionStatus);
      }
    } catch (error) {
      handleApiError(error, "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle successful login
  const handleSuccessfulLogin = (token, kycVerificaionStatus) => {
    setSuccessMessage("Login successful!");
    localStorage.setItem('token', token);
    setTimeout(() => {
      onLogin(kycVerificaionStatus);
      resetForm();
    }, 2000);
  };

  // Handle OTP verification
  const handleOtpVerification = async () => {
    if (otp.length !== 4 || isNaN(otp)) {
      setError("OTP must be a 4-digit number.");
      return;
    }

    setIsLoading(true);
    
    try {
      // const fingerprint = generateFingerprint();

      const fp = await FingerprintJS.load();
      const result = await fp.get();

      console.log(result.visitorId)
      const fingerprint = result.visitorId;

      const response = await axios.post(`${API_BASE_URL}/api/login/verify-2fa`, {
        otp,
        otpToken,
        fingerprint,
        latitude: geoLocation.latitude,
        longitude: geoLocation.longitude
      });

      handleSuccessfulLogin(response.data.token, response.data.kycVerificaionStatus);
    } catch (error) {
      handleApiError(error, "OTP verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setOtp("");
    setShowOtpField(false);
  };

  // Handle API errors
  const handleApiError = (error, defaultMessage) => {
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        defaultMessage;
    setError(errorMessage);
    
    if (process.env.REACT_APP_DEBUG === 'true') {
      console.error('API Error:', error);
    }
  };

  // Get geolocation on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGeoLocation({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
        },
        () => {
          setGeoLocation({ latitude: null, longitude: null }); // Default values
        }
      );
    }
  }, []);

  // Clear email error when valid
  useEffect(() => {
    if (email && validateEmail(email)) {
      setError("");
    }
  }, [email]);

  return (
    <div className="loginPage">
      <h2 className="heading">🔒Login</h2>
      <p>Enter your email and password to login to your account.</p>
      
      {error && <Notification message={error} type="error" onClose={() => setError("")} />}
      {successMessage && <Notification message={successMessage} type="success" />}
      
      {!showOtpField ? (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            autoComplete="username"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            autoComplete="current-password"
          />
        </>
      ) : (
        <>
          <p>Enter OTP:</p>
          <OtpInput value={otp} onChange={setOtp} />
        </>
      )}
      
      <button
        onClick={showOtpField ? handleOtpVerification : handleLogin}
        className={`button ${isLoading ? 'loading' : ''}`}
        disabled={
          isLoading || 
          (showOtpField ? otp.length !== 4 : !email || !password)
        }
      >
        {isLoading ? (
          <span className="spinner"></span>
        ) : showOtpField ? "Verify OTP" : "Login"}
      </button>
      
      <div className="auth-links">
        <p className="linkText">
          <Link to="/forgot-password" className="link">
            Forgot Password?
          </Link>
        </p>
        <p className="linkText">
          Don't have an account?{" "}
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </p>
      </div>
      
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

export default LoginPage;