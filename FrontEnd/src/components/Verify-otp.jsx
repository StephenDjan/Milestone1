import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyOTP = () => {
  const location = useLocation();
  const email = location.state?.email || ''; // Get the email from state
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', { email, otp });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error verifying OTP');
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Verify OTP</h1>
      <form onSubmit={handleVerifyOtp}>
        <label>
          Enter OTP:
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        </label>
        <button type="submit">Verify</button>
      </form>
      {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default VerifyOTP;
