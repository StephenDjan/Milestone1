// verify-otp.js
import express from 'express';
import mysql from 'mysql2';

const router = express.Router();

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'StevDB'
});

// OTP verification endpoint
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  // Query the database for the OTP associated with the email
  db.query('SELECT otp FROM Users WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const storedOtp = result[0].otp;

    if (storedOtp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, clear it or take further actions (e.g., mark user as verified)
    db.query('UPDATE Users SET otp = NULL WHERE email = ?', [email], (err) => {
      if (err) {
        console.error('Error clearing OTP:', err);
        return res.status(500).json({ message: 'Error clearing OTP' });
      }

      return res.status(200).json({ message: 'OTP verified successfully' });
    });
  });
});

export default router;
