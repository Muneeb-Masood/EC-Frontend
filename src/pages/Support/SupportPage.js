import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles.css";
import '../../components/Notification/Notification';

//Support page 
const SupportPage = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors[name];
          return newErrors;
        });
      }
      
      if (name === 'email' && value.includes('@') && errors.email) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.email;
          return newErrors;
        });
      }
    };
  
    const validateForm = () => {
      const newErrors = {};
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!formData.email.includes('@')) {
        newErrors.email = 'Please enter a valid email address';
      }
      if (!formData.message.trim()) newErrors.message = 'Message is required';
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validateForm()) return;
  
      setNotification({
        type: 'success',
        message: 'Your message has been sent successfully!'
      });
  
      setFormData({
        name: '',
        email: '',
        message: ''
      });
  
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    };
  
    return (
      <div className="supportPage">
        <h2 className="heading">📞Customer Support</h2>
        <p>We're here to help you with any issues or questions you may have.</p>
        
        {/* Contact Info - No container div */}
        <h3 className="contactHeading">Contact Us</h3>
        <p className="contactInfo">Email: support@Zentron.com</p>
        <p className="contactInfo">Phone: +92 79074707</p>
        <p className="contactInfo">Live Chat: Available 24/7</p>
        
        {/* Form - No wrapper div */}
        <form onSubmit={handleSubmit} className="supportForm">
          <h3 className="formHeading">Send us a message</h3>
          
          {notification && (
            <div className={notification.type === 'success' ? 'success' : 'error'}>
              {notification.message}
            </div>
          )}
          
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="input"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="error">{errors.name}</div>}
          
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="input"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
          
          <textarea
            name="message"
            placeholder="Your Message"
            className="input"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && <div className="error">{errors.message}</div>}
          
          <button 
            type="submit"
            className="button"
            disabled={!formData.name || !formData.email || !formData.message || errors.email}
          >
            Send Message
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
export default SupportPage;