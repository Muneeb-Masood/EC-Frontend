import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import "../../../styles.css";
import OtpInput from '../../../components/OTPInput/OTPInput';


const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [otp, setOtp] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };
  
    const handleSubmit = async () => {
      if (!email) {
        setError("Please enter your email.");
        return;
      }
  
      if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
      }
  
      setIsLoading(true);
      setError("");
      
      try {
        await axios.post(`${API_BASE_URL}/api/auth/sendPwdOtp`, { email });
        setShowOtpField(true);
        setSuccess("A recovery OTP has been sent to your email.");
      } catch (error) {
        handleApiError(error, "Failed to send OTP. Please try again.");
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
        // In a real app, you would verify the OTP with the server here
        setIsOtpVerified(true);
        setSuccess("OTP verified. Please enter your new password.");
        setError("");
      } catch (error) {
        handleApiError(error, "OTP verification failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    const handlePasswordReset = async () => {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
  
      if (newPassword.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }
  
      setIsLoading(true);
      
      try {
        await axios.post(`${API_BASE_URL}/api/auth/resetPwd`, {
          email,
          otp,
          newPassword
        });
  
        setSuccess("Password reset successfully. You can now log in with your new password.");
        resetForm();
      } catch (error) {
        handleApiError(error, "Password reset failed. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    const resetForm = () => {
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setShowOtpField(false);
      setIsOtpVerified(false);
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
    }, [email]);
  
    return (
      <div className="forgotPasswordPage">
        <h2 className="heading">🔓Trouble logging in?</h2>
        <p>Enter your email and we'll send you an OTP to reset your password.</p>
        
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        
        {!showOtpField && !isOtpVerified && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            autoComplete="email"
          />
        )}
  
        {showOtpField && !isOtpVerified && (
          <>
            <p>Enter OTP:</p>
            <OtpInput value={otp} onChange={setOtp} />
          </>
        )}
  
        {isOtpVerified && (
          <>
            <input
              type="password"
              placeholder="New Password (min 8 characters)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input"
              autoComplete="new-password"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              autoComplete="new-password"
            />
          </>
        )}
  
        <button
          onClick={
            isOtpVerified
              ? handlePasswordReset
              : showOtpField
              ? handleOtpVerification
              : handleSubmit
          }
          className={`button ${isLoading ? 'loading' : ''}`}
          disabled={
            isLoading ||
            (isOtpVerified
              ? !newPassword || !confirmPassword
              : showOtpField
              ? otp.length !== 4
              : !email)
          }
        >
          {isLoading ? (
            <span className="spinner"></span>
          ) : isOtpVerified ? "Reset Password" : showOtpField ? "Verify OTP" : "Send Recovery OTP"}
        </button>
  
        <p className="linkText">
          <Link to="/login" className="link">
            Back to Login
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
  
export default ForgotPasswordPage;  