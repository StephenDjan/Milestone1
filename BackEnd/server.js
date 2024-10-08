import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods if needed
    credentials: true // Allow credentials if you are using cookies or HTTP Auth
}))

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Use your MySQL username
  password: '',  // Use your MySQL password
  database: 'StevDB' // The database we created
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { username, email, password, phone, city } = req.body;
  const admin = 0;
  console.log("username")
  console.log(username)
  console.log("email")
  console.log(email)
  console.log("password")
  console.log(password)
  console.log("phone")
  console.log(phone)
  console.log("city")
  console.log(city)

  console.log("typeof phone")
  console.log(typeof phone)

  // Check if user already exists
  db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    
    if (result.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    // db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
    db.query('INSERT INTO Users (email, password, username, phone, city, admin) VALUES (?, ?, ?, ?, ?, ?)', [email, password, username, phone, city, admin], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Database error during registration' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
    // INSERT INTO `Users`(`email`, `password`, `username`,`phone`, `city`, `admin`) VALUES ('Test','Test','Test','Test','Test', 0)
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
    console.log("Called Post")

  const { email, password } = req.body;
  console.log("email ", email)
  console.log("password ", password)


  // Find the user by email
  db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (result.length == 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = result[0];

    // Compare the entered password with the hashed password
    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!passwordMatch) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }
    console.log("Logged in")
    res.status(200).json({ message: 'Login successful', user: user });
  });
});

// Starting server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
