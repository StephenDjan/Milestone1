import React, { useState } from "react";
import axios from "axios";
import './forgotPassword.css'; // Import your CSS file

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/forgot-password", { email });
      setMessage(response.data.message);
      setError(""); // Clear error if successful
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
      setMessage(""); // Clear message if error
    }
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleForgotPassword}>
        <h2>Reset Password</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;
