// src/utils/session.js

// Session timeout duration (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000; 

// Initialize session tracking
export const initSessionTracking = (onExpire) => {
  let lastActivityTime = Date.now();
  let activityInterval;

  const updateLastActivity = () => {
    lastActivityTime = Date.now();
  };

  const checkIdleTime = () => {
    const currentTime = Date.now();
    const idleTime = currentTime - lastActivityTime;
    
    if (idleTime > SESSION_TIMEOUT) {
      onExpire();
      clearInterval(activityInterval);
    }
  };

  // Set up activity listeners
  const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
  
  const handleActivity = () => {
    updateLastActivity();
  };

  activityEvents.forEach(event => {
    window.addEventListener(event, handleActivity);
  });

  // Start checking for idle time
  activityInterval = setInterval(checkIdleTime, 1000);

  // Return cleanup function
  return () => {
    clearInterval(activityInterval);
    activityEvents.forEach(event => {
      window.removeEventListener(event, handleActivity);
    });
  };
};

// Token management
export const tokenManager = {
  getToken: () => localStorage.getItem('token'),
  setToken: (token) => localStorage.setItem('token', token),
  removeToken: () => localStorage.removeItem('token'),
  isValid: () => {
    const token = localStorage.getItem('token');
    return token && token.length > 0;
  }
};

// User session management
export const userSession = {
  start: (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('sessionStart', Date.now());
  },
  end: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('sessionStart');
    tokenManager.removeToken();
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  getSessionDuration: () => {
    const start = localStorage.getItem('sessionStart');
    return start ? Date.now() - parseInt(start) : 0;
  }
};