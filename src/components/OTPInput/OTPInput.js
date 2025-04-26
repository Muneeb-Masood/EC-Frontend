import React from 'react';
import '../../styles.css';

const OtpInput = ({ value, onChange }) => {
  const handleChange = (index, event) => {
    const newValue = event.target.value;
    if (newValue.length <= 1 && !isNaN(newValue)) {
      const updatedOtp = value.split("");
      updatedOtp[index] = newValue;
      onChange(updatedOtp.join(""));
    }
  };

  return (
    <div className="otp-input">
      {Array.from({ length: 4 }).map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          className="otp-digit"
          inputMode="numeric"
          pattern="[0-9]*"
        />
      ))}
    </div>
  );
};

export default OtpInput;