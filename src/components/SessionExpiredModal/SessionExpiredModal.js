import React from 'react';
import '../../styles.css';
//import Notification from '../Notification/Notification';

const SessionExpiredModal = ({ onClose }) => {
    return (
      <div className="session-expired-modal">
        <div className="modal-content">
          <h3>Session Expired</h3>
          <p>Your session has expired due to inactivity. Please log in again.</p>
          <button onClick={onClose} className="button">
            OK
          </button>
        </div>
      </div>
    );
  };
  export default SessionExpiredModal;