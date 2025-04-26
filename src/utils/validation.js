// src/utils/validation.js

// Email validation
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  // Pakistan phone number validation
  export const validatePhonePK = (phone) => {
    const re = /^\+92[\s\-]?\(?(\d{3})\)?[\s\-]?\d{7}$/;
    return re.test(phone);
  };
  
  // Password validation (min 8 chars)
  export const validatePassword = (password) => {
    return password.length >= 8;
  };
  
  // OTP validation (4 digits)
  export const validateOTP = (otp) => {
    return otp.length === 4 && !isNaN(otp);
  };
  
  // Form validation helper
  export const validateForm = (fields) => {
    const errors = {};
    
    if (fields.email && !validateEmail(fields.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (fields.phone && !validatePhonePK(fields.phone)) {
      errors.phone = 'Invalid phone number format. Use +92XXXXXXXXX';
    }
    
    if (fields.password && !validatePassword(fields.password)) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (fields.otp && !validateOTP(fields.otp)) {
      errors.otp = 'OTP must be a 4-digit number';
    }
    
    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };