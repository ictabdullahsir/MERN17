/**
 * Express.js Fundamentals Cheatsheet
 * 
 * SETUP INSTRUCTIONS:
 * 1. npm init -y
 * 2. npm install express cookie-parser
 * 3. node cheatsheet.js
 */

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// ==========================================
// 1. MIDDLEWARE SETUP
// ==========================================

// Parse incoming JSON requests (req.body)
app.use(express.json());

// Parse URL-encoded payloads (form submissions)
app.use(express.urlencoded({ extended: true }));

// Parse Cookie headers and populate req.cookies
app.use(cookieParser());

// Custom Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ==========================================
// 2. UNDERSTANDING REQUESTS (req)
// ==========================================

// Route Params: /users/42
// Query Params: /users/42?role=admin&sort=asc
app.get('/users/:id', (req, res) => {
  const { id } = req.params;      // Path variable
  const { role, sort } = req.query; // Query string parameters

  res.json({
    message: 'Request parameters received',
    params: { id },
    query: { role, sort }
  });
});

// Request Body (POST/PUT/PATCH)
app.post('/users', (req, res) => {
  const { username, email } = req.body; // Populated by express.json()

  if (!username || !email) {
    // 400 Bad Request
    return res.status(400).json({ error: 'Username and email are required' });
  }

  // 201 Created
  res.status(201).json({
    message: 'User created successfully',
    data: { id: Date.now(), username, email }
  });
});

// ==========================================
// 3. RESPONSES & HTTP STATUS CODES
// ==========================================

// Plain Text Response (200 OK)
app.get('/text', (req, res) => {
  res.status(200).send('Hello World! This is plain text.');
});

// JSON Response (200 OK)
app.get('/json', (req, res) => {
  res.status(200).json({ success: true, count: 1 });
});

// Redirects (301 Permanent / 302 Temporary)
app.get('/old-route', (req, res) => {
  res.redirect(301, '/new-route');
});

app.get('/new-route', (req, res) => {
  res.send('You were redirected here!');
});

// File Downloads
app.get('/download-example', (req, res) => {
  // res.download(path, filename) prompts client download
  const filePath = path.join(__dirname, 'cheatsheet.js');
  res.download(filePath, 'express-cheatsheet.js');
});

// ==========================================
// 4. HEADERS & COOKIES
// ==========================================

// Headers Handling
app.get('/headers', (req, res) => {
  // Reading a custom or standard request header
  const authHeader = req.get('Authorization') || req.headers['authorization'];

  // Setting custom response headers
  res.set({
    'X-Custom-Header': 'ExpressCheatsheetV1',
    'Cache-Control': 'no-store'
  });

  res.json({
    receivedAuthHeader: authHeader || 'No Auth Header Provided'
  });
});

// Setting Cookies
app.get('/set-cookie', (req, res) => {
  res.cookie('sessionToken', 'abc123secret', {
    maxAge: 3600000, // 1 hour in milliseconds
    httpOnly: true,  // Prevents client-side JS access (XSS security)
    secure: false,   // Set to true if using HTTPS
    sameSite: 'lax'
  });

  res.send('Cookie "sessionToken" has been set!');
});

// Reading & Clearing Cookies
app.get('/read-cookie', (req, res) => {
  const token = req.cookies.sessionToken; // Requires cookie-parser

  if (!token) {
    return res.status(401).json({ error: 'No cookie found' });
  }

  res.json({ tokenFound: token });
});

app.get('/clear-cookie', (req, res) => {
  res.clearCookie('sessionToken');
  res.send('Cookie "sessionToken" cleared!');
});

// ==========================================
// 5. ERROR HANDLING & FALLBACKS
// ==========================================

// 404 Not Found Catch-all
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ==========================================
// 6. SERVER INITIALIZATION
// ==========================================

app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`=================================`);
});