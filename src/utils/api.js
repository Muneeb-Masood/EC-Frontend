// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const handleApiError = (error, defaultMessage) => {
  const errorMessage = error.response?.data?.message || 
                      error.message || 
                      defaultMessage;
  
  if (process.env.REACT_APP_DEBUG === 'true') {
    console.error('API Error:', error);
  }
  
  return errorMessage;
};

export const generateFingerprint = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export default axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});