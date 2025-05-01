import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles.css";
import '../../components/Notification/Notification';
import {useMessage } from "../../context/MessageContext";


//KYC Form component
const KYCForm = ({ onKYCSubmit }) => {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [documentType, setDocumentType] = useState("passport");
    const [picture, setPicture] = useState(null);
    const {displayMessage , setDisplayMessage} =  useMessage();
  
    const handleSubmit = () => {
      // Check if any field is empty
      if (!name || !phoneNumber || !documentType || !picture) {
        setDisplayMessage("Must fill every field before submitting.");
        return;
      }
  
      // Validate phone number format
      const phoneRegex = /^\+92[\s\-]?\(?(\d{3})\)?[\s\-]?\d{7}$/;
      if (!phoneRegex.test(phoneNumber)) {
        setDisplayMessage("Invalid phone number. Please use the format +92XXXXXXXXX, +92 (XXX) XXXXXXX, +92-XXX-XXXXXXX, or +92 XXX XXXXXXX.");
        return;
      }
  
      // If all validations pass, submit the form
      console.log("Submitting KYC with:", {
        name,
        phoneNumber,
        documentType,
        picture,
      });
      onKYCSubmit({
        name,
        phoneNumber,
        documentType,
        document : picture
      });
        
      // Clear fields after successful submission
      setName("");
      setPhoneNumber("");
      setDocumentType("");
      setPicture(null);
      setDisplayMessage(""); // Clear any previous errors
    };
  
    // Clear displayMessage when phone number is updated and meets the requirements
    useEffect(() => {
      const phoneRegex = /^\+92[\s\-]?\(?(\d{3})\)?[\s\-]?\d{7}$/;
      if (phoneRegex.test(phoneNumber)) {
        setDisplayMessage((prevError) =>
          prevError === "Invalid phone number. Please use the format +92XXXXXXXXX, +92 (XXX) XXXXXXX, +92-XXX-XXXXXXX, or +92 XXX XXXXXXX."
            ? ""
            : prevError
        );
      }
    }, [phoneNumber]);
  
    return (
      <div className="kycPage">
        <h2 className="heading">KYC Verification</h2>
        <p>
          Enter your details, select ID type, upload the document, and submit for
          KYC verification
        </p>
        {displayMessage && <div className="error">{displayMessage}</div>}
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
          <option value="picture">Picture</option>
        </select>
        <input
          type="file"
          onChange={(e) => setPicture(e.target.files[0])}
          className="input"
        />
        <button
          onClick={handleSubmit}
          className="button"
          disabled={!name || !phoneNumber || !documentType || !picture}
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