const API_BASE_URL = 'http://localhost:5000/api';

export const login = async (email, password, fingerprint, latitude, longitude) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        fingerprint,
        latitude,
        longitude
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signUp = async (email, password, phone) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        phone
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

export const enable2FA = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/verify-2fa`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Enable 2FA error:', error);
    throw error;
  }
};

export const disable2FA = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/disable2FA`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Disable 2FA error:', error);
    throw error;
  }
};

export const verify2FA = async (otp, otpToken, fingerprint, latitude, longitude) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/verify-2fa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otp,
        otpToken,
        fingerprint,
        latitude,
        longitude
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('2FA verification error:', error);
    throw error;
  }
};

export const sendPasswordResetOTP = async (email) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/sendPwdOtp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Send password reset OTP error:', error);
    throw error;
  }
};

export const resetPassword = async (email, otp, newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/resetPwd`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        otp,
        newPassword
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};