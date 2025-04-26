// src/components/Notification/Notification.js
import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, onClose, type = 'success' }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const notificationClass = type === 'success' ? 'success' : 'error';
  const is2FANotification = message.includes('2FA');
  const twoFAClass = is2FANotification ? 
    (message.includes('Enabled') ? 'twofa-enabled' : 'twofa-disabled') : '';

  return (
    <div className={`notification ${notificationClass} ${twoFAClass}`}>
      {message}
      <span className="notification-close" onClick={onClose}>&times;</span>
    </div>
  );
};

export default Notification;