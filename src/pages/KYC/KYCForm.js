import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../../styles.css";
import "../../components/Notification/Notification";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const KYCForm = ({ onKYCSubmit }) => {
    // Auth state
    const [authState, setAuthState] = useState({
        isAuthenticated: true,
        isKYCVerified: false,
        isLoading: false
    });

    // KYC form state
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [documentType, setDocumentType] = useState("passport");
    const [selfie, setSelfie] = useState(null);
    const [idFront, setIdFront] = useState(null);
    const [idBack, setIdBack] = useState(null);
    const [utilityBill, setUtilityBill] = useState(null);
    const [currentAddress, setCurrentAddress] = useState("");
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const [location, setLocation] = useState(null);
    const [isGettingLocation, setIsGettingLocation] = useState(false);

    const cities = ["Karachi", "Lahore", "Islamabad", "Multan", "Quetta", "Peshawar"];
    const navigate = useNavigate();

    // Check auth and KYC status
    // useEffect(() => {
    //     const checkAuthAndKYC = async () => {
    //         try {
    //             const token = localStorage.getItem('token');
    //             if (!token) throw new Error('No token found');
                
    //             const authResponse = await axios.get(`${API_BASE_URL}/api/auth/check-auth`, {
    //                 headers: { Authorization: `Bearer ${token}` }
    //             });
                
    //             const kycResponse = await axios.get(`${API_BASE_URL}/api/kyc/status`, {
    //                 headers: { Authorization: `Bearer ${token}` }
    //             });
                
    //             setAuthState({
    //                 isAuthenticated: true,
    //                 isKYCVerified: kycResponse.data.isVerified,
    //                 isLoading: false
    //             });

    //         } catch (error) {
    //             setAuthState({
    //                 isAuthenticated: false,
    //                 isKYCVerified: false,
    //                 isLoading: false
    //             });
    //         }
    //     };
        
    //     checkAuthAndKYC();
    // }, []);

    // Handle redirects
    // useEffect(() => {
    //     if (!authState.isLoading) {
    //         if (!authState.isAuthenticated) {
    //             navigate('/login');
    //         } else if (authState.isKYCVerified) {
    //             navigate('/dashboard');
    //         }
    //     }
    // }, [authState, navigate]);

    const getCurrentLocation = () => {
        setIsGettingLocation(true);
        setError("");
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                    setIsGettingLocation(false);
                },
                (err) => {
                    setError("Unable to retrieve your location. Please enable location services.");
                    setIsGettingLocation(false);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
            setIsGettingLocation(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No authentication token found');
            
            const formData = new FormData();
            formData.append('name', name);
            formData.append('phoneNumber', phoneNumber);
            formData.append('documentType', documentType);
            formData.append('selfie', selfie);
            formData.append('idFront', idFront);
            formData.append('idBack', idBack);
            formData.append('utilityBill', utilityBill);
            formData.append('currentAddress', currentAddress);
            formData.append('city', city);
            formData.append('location', JSON.stringify(location));
            
            const response = await axios.post(`${API_BASE_URL}/api/kyc/submit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            
            if (onKYCSubmit) {
                onKYCSubmit(response.data);
            }
            navigate('/dashboard');
        } catch (error) {
            setError(error.response?.data?.message || "Failed to submit KYC form. Please try again.");
        }
    };

    const handleFileChange = (setter) => (e) => {
        if (e.target.files && e.target.files[0]) {
            setter(e.target.files[0]);
        }
    };

    // if (authState.isLoading) {
    //     return <div className="loading-spinner">Loading...</div>;
    // }

    return (
        <div className="kycPage">
            <h2 className="heading">KYC Verification</h2>
            <p>Enter your details, select ID type, upload the required documents, and submit for KYC verification</p>
            
            {error && <div className="error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    required
                />
                
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="input"
                    required
                />
                
                <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="input"
                    required
                >
                    <option value="passport">Passport</option>
                    <option value="nic">National ID Card</option>
                    <option value="driver_license">Driver's License</option>
                </select>
                
                <div className="file-upload-section">
                    <label>Selfie with ID:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange(setSelfie)}
                        required
                    />
                    
                    <label>ID Front:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange(setIdFront)}
                        required
                    />
                    
                    <label>ID Back:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange(setIdBack)}
                        required
                    />
                    
                    <label>Utility Bill (Proof of Address):</label>
                    <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange(setUtilityBill)}
                        required
                    />
                </div>
                
                <input
                    type="text"
                    placeholder="Current Address"
                    value={currentAddress}
                    onChange={(e) => setCurrentAddress(e.target.value)}
                    className="input"
                    required
                />
                
                <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="input"
                    required
                >
                    <option value="">Select City</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                
                <div className="location-section">
                    <button
                        type="button"
                        onClick={getCurrentLocation}
                        disabled={isGettingLocation}
                        className="button"
                    >
                        {isGettingLocation ? "Getting Location..." : "Get Current Location"}
                    </button>
                    {location && (
                        <span className="location-success">Location captured!</span>
                    )}
                </div>
                
                <button
                    type="submit"
                    className="button"
                    disabled={!name || !phoneNumber || !documentType || !selfie || !idFront || 
                             !idBack || !utilityBill || !currentAddress || !city || !location}
                >
                    Submit
                </button>
            </form>
            
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

export default KYCForm;