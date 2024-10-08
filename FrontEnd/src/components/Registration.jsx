import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState(""); // Added username state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(""); // Added phone state
  const [city, setCity] = useState(""); // Added city state
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username, // Sending username
        email,
        password,
        phone, // Sending phone
        city, // Sending city
      });
      console.log("Success")
      setMessage(response.data.message);
      alert(message)
      navigate("/");
      setError("");
    } catch (error) {
        console.log("Error")
      setError(error.response?.data?.message || "An error occurred");
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleRegistration}>
      <h2>Register</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        required
      />
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="City"
        required
      />
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
};

export default Registration;
