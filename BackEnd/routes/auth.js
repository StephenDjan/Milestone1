import express from 'express';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2';

const router = express.Router();

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'StevDB'
});

// Registration endpoint
router.post('/register', async (req, res) => {
  const { username, email, password, phone, city } = req.body;
  const admin = 0;

  try {
    // Check if user already exists
    db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      if (result.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password before saving it
      try {
        const salt = await bcrypt.genSalt(10); // Generate salt
        const hashedPassword = await bcrypt.hash(password, salt); // Hash password

        console.log('Hashed Password:', hashedPassword); // Debugging output

        // Insert the user into the database with the hashed password
        db.query(
          'INSERT INTO Users (email, password, username, phone, city, admin) VALUES (?, ?, ?, ?, ?, ?)',
          [email, hashedPassword, username, phone, city, admin],
          (err) => {
            if (err) {
              console.error('Database error during registration:', err);
              return res.status(500).json({ message: 'Database error during registration' });
            }
            res.status(201).json({ message: 'User registered successfully' });
          }
        );
      } catch (hashingError) {
        console.error('Error hashing password:', hashingError);
        return res.status(500).json({ message: 'Error hashing password' });
      }
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
