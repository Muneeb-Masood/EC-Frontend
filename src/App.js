// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./styles.css";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Auth/Login/LoginPage";
import SignupPage from "./pages/Auth/Signup/SignupPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPassword/ForgotPasswordPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminPanel from "./pages/Admin/AdminPanel";
import SupportPage from "./pages/Support/SupportPage";
import KYCForm from "./pages/KYC/KYCForm";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isKYCSubmitted, setIsKYCSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [kycRequests, setKycRequests] = useState([]);
  const [kycStatus, setKycStatus] = useState("Pending");
  const [accountStatus, setAccountStatus] = useState("active");
  const [kycVerificaionStatus, setKycVerificaionStatus] = useState(null)

  const handleLogin = (kycVerificaionStatus) => {
    setIsLoggedIn(true);
    console.log(kycVerificaionStatus)
    setKycVerificaionStatus(kycVerificaionStatus)
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleKYCSubmit = (kycData) => {
    setKycRequests([...kycRequests, { ...kycData, status: "Pending" }]);
    setIsKYCSubmitted(true);
  };

  const handleApprove = (index) => {
    const updatedRequests = [...kycRequests];
    updatedRequests[index].status = "Approved";
    setKycRequests(updatedRequests);
    setKycStatus("Approved");
  };

  const handleReject = (index) => {
    const updatedRequests = [...kycRequests];
    updatedRequests[index].status = "Rejected";
    setKycRequests(updatedRequests);
    setKycStatus("Rejected");
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/kyc" /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/admin-login" element={isAdminLoggedIn ? <Navigate to="/admin" /> : <AdminLogin onAdminLogin={handleAdminLogin} />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/kyc" /> : <SignupPage onSignup={handleSignup} />} />
          <Route path="/kyc" element={kycVerificaionStatus === 'verified' ? <Navigate to="/dashboard" /> : isLoggedIn ? <KYCForm onKYCSubmit={handleKYCSubmit} kycVerificaionStatus={kycVerificaionStatus}/> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={kycVerificaionStatus === 'verified' ? <Dashboard user={user} kycStatus={kycStatus} accountStatus={accountStatus} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isAdminLoggedIn ? <AdminPanel kycRequests={kycRequests} onApprove={handleApprove} onReject={handleReject} /> : <Navigate to="/admin-login" />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;