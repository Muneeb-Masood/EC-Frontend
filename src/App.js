// src/App.js
import React, { useState , useEffect } from "react";
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
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedKycID , setSelectedKycID] = useState();
  const [kycVerificaionStatus, setKycVerificaionStatus] = useState(null)

    


  useEffect(() => {
      const fetchKycRequests = async () => {
        try {
          const response = await apiRequest('GET', 'http://localhost:5000/api/getKyc');
          
        if (Array.isArray(response.data.kycRequests)) {
          const pendingRequests = response.data.kycRequests.filter(
          request => request.verificationStatus === 'pending'
        );
        setKycRequests(pendingRequests); 
      } else {
        setDisplayMessage({ type: 'error', message: 'KYC data is not in the expected format.' });
      }
        } catch (error) {
          setDisplayMessage({ type: 'error', message: 'Error fetching KYC requests.' });
        }
  
      };
                  fetchKycRequests();  
  
    } , []);
  

  const handleLogin = (kycVerificaionStatus) => {
    setIsLoggedIn(true);
    console.log(kycVerificaionStatus)
    setKycVerificaionStatus(kycVerificaionStatus)
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
  };

  const handleSignup = (userData) => {
      // setUser(userData);
      // setIsLoggedIn(true);

  };

  const handleKYCSubmit = async (kycData) => {
    console.log("From 121");
    setDisplayMessage("Dummy Message");
    // print(kycData);

    const formData = new FormData();
    formData.append("name", kycData.name);
    formData.append("phoneNumber", kycData.phoneNumber);
    formData.append("documentType", kycData.documentType);
    formData.append("currentAddress", kycData.currentAddress);
    formData.append("city", kycData.city);

    formData.append("cnicFront", kycData.cnicFront);
    formData.append("cnicBack", kycData.cnicBack);
    formData.append("selfie", kycData.selfie);
    formData.append("utilityBill", kycData.utilityBill);
    formData.append("longitude", kycData.longitude);
    formData.append("latitude", kycData.latitude);

    console.log("Form data to be submitted:");
    console.log(kycData);

    setKycRequests(kycData);

    const result = await apiRequest('POST', 'http://localhost:5000/api/kyc/uploadDocs', formData);

    if(result.success) {
      setTimeout(() => {
        setIsKYCSubmitted(true);
      }, 2000);
      return;
    }

    setDisplayMessage(genericErrorMessage);
    setIsKYCSubmitted(true);
};


  const handleApproveKYC = async (kycID) => {
    console.log(kycID);
  const response = await apiRequest('POST', 'http://localhost:5000/api/kyc/approve', { kycID });

  if (response.success) {

    const updatedRequests = kycRequests.filter(request => request.kycID !== kycID);
    setKycRequests(updatedRequests);
    setKycStatus("Approved");
    setDisplayMessage("KYC Approved Successfully");
  } else {

  }
};

const submitRejection = async () => {
  if (!rejectionReason.trim()) return;

  const response = await apiRequest('POST', 'http://localhost:5000/api/kyc/reject', {
    kycID: selectedKycID,
    rejectionReason: rejectionReason
  });
  console.log("From 121");
  console.log(response);
  if (response.success) {
    const updatedRequests = kycRequests.filter(request => request.kycID !== selectedKycID);
    setKycRequests(updatedRequests);
    setKycStatus("Rejected");
    setShowRejectModal(false);
    setRejectionReason('');
  } else {
  }
};

const openRejectModal = (kycID) => {
  setSelectedKycID(kycID);
  setShowRejectModal(true);
};



const handleReject = async (kycID) => {
  try {
    const response = await apiRequest('POST', 'http://localhost:5000/api/kyc/reject', { kycID });
    console.log(response);

    if (response.success) {

      const updatedRequests = kycRequests.filter(request => request.kycID !== kycID);
      setKycRequests(updatedRequests);
      setKycStatus("Rejected");
      setDisplayMessage({ type: 'success', message: 'KYC rejected successfully!' });
    } else {
      setDisplayMessage({ type: 'error', message: 'Failed to reject KYC.' });
    }
  } catch (error) {
    setDisplayMessage({ type: 'error', message: 'An error occurred while rejecting KYC.' });
  }
};


  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/kyc" /> : <LoginPage onLogin={handleLogin}/>} />
          <Route path="/admin-login" element={isAdminLoggedIn ? <Navigate to="/admin" /> : <AdminLogin onAdminLogin={handleAdminLogin} />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/kyc" /> : <SignupPage onSignup={handleSignup} />} />
          {/* <Route path="/verify-email" element={<VerifyEmailPage />} /> */}
          <Route path="/kyc" element={kycVerificaionStatus === 'verified' ? <Navigate to="/dashboard" /> : isLoggedIn ? <KYCForm onKYCSubmit={handleKYCSubmit} kycVerificaionStatus={kycVerificaionStatus}/> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={true ? <Dashboard user={user} kycStatus={kycStatus} accountStatus={accountStatus} onLogout={handleLogout}/> : <Navigate to="/login" />} />
          <Route path="/admin" element={isAdminLoggedIn ? <AdminPanel kycRequests={kycRequests} onApprove={handleApproveKYC} onReject={openRejectModal} /> : <Navigate to="/admin-login" />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
        {showRejectModal && (
  <div className="modalOverlay">
    <div className="modalContent">
      <div className="modalHeader">Reject KYC Request</div>
      <textarea
        className="modalTextarea"
        placeholder="Enter rejection reason..."
        value={rejectionReason}
        onChange={(e) => setRejectionReason(e.target.value)}
        rows={4}
      />
      <div className="modalButtons">
        <button className="modalButton rejectConfirm" onClick={submitRejection}>
          Submit
        </button>
        <button className="modalButton cancelModal" onClick={() => setShowRejectModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </Router>
  );
};

export default App;