/**
 * Express.js Beginner Auth & Data Cheatsheet
 * 
 * RUN IT:
 * node cheatsheet.js
 */

const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'my-secret-key';

// In-Memory Database (resets when server restarts)
const usersDB = [];

// ==========================================
// 1. HELPER MIDDLEWARES
// ==========================================

// Allows express to read JSON sent in the request body (req.body)
app.use(express.json());

// Allows express to read form submissions (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Parses cookies sent by the browser so we can read req.cookies
app.use(cookieParser());

// Multer setup: Tells Node to save uploaded files into the 'uploads/' folder
const upload = multer({ dest: 'uploads/' });


// ==========================================
// 2. GET vs. POST & READING DATA
// ==========================================

// GET: Fetching data. Data comes through the URL.
// Example: GET http://localhost:3000/search?term=pizza
app.get('/search', (req, res) => {
  const searchTerm = req.query.term; // Read URL query parameter
  res.send(`You searched for: ${searchTerm}`);
});


// ==========================================
// 3. USER AUTHENTICATION (REGISTER & LOGIN)
// ==========================================

// POST: Sending secret data (passwords, registration details) in req.body
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash the password so we don't save plain text passwords
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save to "database"
  usersDB.push({ username, password: hashedPassword, avatar: null });

  res.send('User registered successfully!');
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find user in database
  const user = usersDB.find((u) => u.username === username);
  if (!user) {
    return res.status(400).send('User not found!');
  }

  // Compare entered password with stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).send('Wrong password!');
  }

  // Generate a digital VIP Pass (JWT Token)
  const token = jwt.sign({ username: user.username }, SECRET_KEY);

  // Send token back to user in a secure HttpOnly cookie
  res.cookie('userToken', token, { httpOnly: true });

  res.send('Login successful!');
});


// ==========================================
// 4. ROUTE PROTECTION (CHECKING THE VIP PASS)
// ==========================================

// Custom Guard Middleware
function requireAuth(req, res, next) {
  // Read token from cookie OR custom header ('Authorization')
  const token = req.cookies.userToken || req.headers['authorization'];

  if (!token) {
    return res.status(401).send('Access denied. Please log in first!');
  }

  try {
    // Verify that the token is valid
    const verifiedUser = jwt.verify(token, SECRET_KEY);
    req.user = verifiedUser; // Attach user info to the request
    next(); // Let them proceed to the route
  } catch (err) {
    res.status(403).send('Invalid token!');
  }
}

// Protected Route (only accessible if logged in)
app.get('/dashboard', requireAuth, (req, res) => {
  res.send(`Welcome to your secret dashboard, ${req.user.username}!`);
});


// ==========================================
// 5. FILE UPLOADS (MULTER)
// ==========================================

// "avatar" must match the name attribute on the HTML file input / form field
app.post('/upload-avatar', requireAuth, upload.single('avatar'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Save path to user profile
  const user = usersDB.find((u) => u.username === req.user.username);
  user.avatar = req.file.path;

  res.send(`File uploaded successfully! Saved to ${req.file.path}`);
});


// LOGOUT ROUTE
app.post('/logout', (req, res) => {
  res.clearCookie('userToken');
  res.send('Logged out!');
});


// ==========================================
// 6. START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});