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
import apiRequest from "./utils/helper_function";
import { useMessage } from "./context/MessageContext";
import genericErrorMessage from "./constant";
import baseUrl from "./constant";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isKYCSubmitted, setIsKYCSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [kycRequests, setKycRequests] = useState([]);
  const [kycStatus, setKycStatus] = useState("Pending");
  const [accountStatus, setAccountStatus] = useState("active");
  const {displayMessage , setDisplayMessage} = useMessage();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleKYCSubmit = async (kycData) => {
    setDisplayMessage("Dummy Message");

    const formData = new FormData();
    formData.append("name", kycData.name);
    formData.append("phoneNumber", kycData.phoneNumber);
    formData.append("documentType", kycData.documentType);
    formData.append("document", kycData.document);

    // console.log("From line 50");
    // console.log(kycData.picture);
    console.log(kycData.document);
    setKycRequests(kycData);
    const result = await apiRequest('POST', 'http://localhost:5000/api/kyc/uploadDocs', formData);
    if(result.success){
      setTimeout(() => {
        setIsKYCSubmitted(true);
      }, 2000);
      return;
    }

    setDisplayMessage(genericErrorMessage);
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
          <Route path="/kyc" element={isKYCSubmitted ? <Navigate to="/dashboard" /> : isLoggedIn ? <KYCForm onKYCSubmit={handleKYCSubmit} /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={isKYCSubmitted ? <Dashboard user={user} kycStatus={kycStatus} accountStatus={accountStatus} /> : <Navigate to="/login" />} />
          <Route path="/admin" element={isAdminLoggedIn ? <AdminPanel kycRequests={kycRequests} onApprove={handleApprove} onReject={handleReject} /> : <Navigate to="/admin-login" />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;