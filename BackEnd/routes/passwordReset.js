import express from 'express';
import mysql from 'mysql2';

const router = express.Router();
const db = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'StevDB' });

// Forgot Password - Verify Phone
router.post('/forgot-password', (req, res) => {
  const { phone } = req.body;
  db.query('SELECT * FROM Users WHERE phone = ?', [phone], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Phone number not found' });
    }
    res.status(200).json({ message: 'Phone number verified, you can reset your password now.' });
  });
});

// Reset Password - Update Password
router.post('/reset-password', (req, res) => {
  const { phone, password } = req.body;
  const hashedPassword = hashPassword(password);  // Assuming you have a password hashing function

  db.query('UPDATE Users SET password = ? WHERE phone = ?', [hashedPassword, phone], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating password' });
    }
    res.status(200).json({ message: 'Password updated successfully' });
  });
});

export default router;
