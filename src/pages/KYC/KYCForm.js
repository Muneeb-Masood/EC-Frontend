import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles.css";
import '../../components/Notification/Notification';


const KYCForm = ({ onKYCSubmit }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [documentType, setDocumentType] = useState("passport");
  const [picture, setPicture] = useState(null);
  const [error, setError] = useState("");
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setError("");
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          
          // Optional: Reverse geocode to get address
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setAddress(data.display_name || "Address not available");
          } catch (err) {
            console.error("Geocoding error:", err);
            setAddress("Location captured, address not available");
          }
          setIsGettingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setError("Could not get your location. Please enable location services.");
          setIsGettingLocation(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser");
      setIsGettingLocation(false);
    }
  };

  const handleSubmit = () => {
    // Check if any field is empty
    if (!name || !phoneNumber || !documentType || !picture || !location) {
      setError("Must fill every field before submitting, including location.");
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\+92[\s\-]?\(?(\d{3})\)?[\s\-]?\d{7}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("Invalid phone number. Please use the format +92XXXXXXXXX, +92 (XXX) XXXXXXX, +92-XXX-XXXXXXX, or +92 XXX XXXXXXX.");
      return;
    }

    // If all validations pass, submit the form
    onKYCSubmit({
      name,
      phoneNumber,
      documentType,
      picture,
      location,
      address
    });

    // Clear fields after successful submission
    setName("");
    setPhoneNumber("");
    setDocumentType("passport");
    setPicture(null);
    setLocation(null);
    setAddress("");
    setError("");
  };

  return (
    <div className="kycPage">
      <h2 className="heading">KYC Verification</h2>
      <p>
        Enter your details, select ID type, upload the document, and submit for
        KYC verification
      </p>
      {error && <div className="error">{error}</div>}
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Phone Number (+92XXXXXXXXX format)"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        className="input"
      />
      <select
        value={documentType}
        onChange={(e) => setDocumentType(e.target.value)}
        className="input"
      >
        <option value="passport">Passport</option>
        <option value="driver_license">Driver's License</option>
        <option value="ID_card">ID Card</option>
      </select>
      <input
        type="file"
        onChange={(e) => setPicture(e.target.files[0])}
        className="input"
        accept="image/*"
      />
      
      {/* Location Section */}
      <div className="locationSection">
        <button
          onClick={getCurrentLocation}
          className="button"
          disabled={isGettingLocation}
        >
          {isGettingLocation ? "Getting Location..." : "Get My Location"}
        </button>
        {location && (
          <div className="locationInfo">
            <p>Location captured: {address || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}</p>
            <small>We need this to verify you're within our service area</small>
          </div>
        )}
      </div>
      
      <button
        onClick={handleSubmit}
        className="button"
        disabled={!name || !phoneNumber || !documentType || !picture || !location}
      >
        Submit
      </button>
      
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

export default KYCForm;