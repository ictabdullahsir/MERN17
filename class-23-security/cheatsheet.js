/**
 * Express.js Security, CORS & Infrastructure Cheatsheet
 * 
 * RUN IT:
 * node production-cheatsheet.js
 */

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'super-secret-key-123';

// ==========================================
// 1. CORS (CROSS-ORIGIN RESOURCE SHARING)
// ==========================================
// CORS dictates which frontend origins (websites/domains) are allowed
// to make HTTP requests to this backend server.

const corsOptions = {
  // Specify allowed origins (Frontend URLs)
  origin: ['http://localhost:5173', 'https://myfrontend.com'],
  
  // Allow browser requests to send cookies/credentials
  credentials: true, 
  
  // Restrict allowed HTTP methods
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  
  // Allow custom headers (e.g., Authorization)
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  
  // Return HTTP 200 for legacy browser preflight requests
  optionsSuccessStatus: 200 
};

// Apply CORS globally to all routes
app.use(cors(corsOptions));


// ==========================================
// 2. SECURITY & REQUEST LIMITING (DOS PROTECTION)
// ==========================================

// A. Payload Size Limits (Prevents JSON memory exhaustion attacks)
app.use(express.json({ limit: '10kb' })); 
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Parse cookies so req.cookies works
app.use(cookieParser());

// B. Global Rate Limiter (Limits overall requests per IP)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // Max 100 requests per 15 minutes per IP
  standardHeaders: true,     // Return rate limit info in standard HTTP headers
  legacyHeaders: false,
  message: { status: 'fail', error: 'Too many requests. Please try again later.' }
});

app.use('/api', globalLimiter);

// C. Strict Rate Limiter (Prevents Brute-Force Login Attacks)
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,                   // Max 5 attempts per hour
  message: { status: 'fail', error: 'Too many login attempts. Try again in an hour.' }
});


// ==========================================
// 3. SECURE COOKIES & AUTHENTICATION
// ==========================================

// Login route setting a secure HttpOnly cookie
app.post('/api/auth/login', authLimiter, (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ status: 'fail', error: 'Username is required' });
  }

  // Create JWT Token
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

  // Set Cookie with Security Flags
  res.cookie('authToken', token, {
    httpOnly: true,  //  Prevents JavaScript access (Stops XSS token theft)
    secure: false,   //  Set to TRUE in production over HTTPS!
    sameSite: 'lax', //  Stops Cross-Site Request Forgery (CSRF)
    maxAge: 3600000  // 1 hour in milliseconds
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged in successfully! Token stored in HttpOnly cookie.'
  });
});


// Middleware to verify HttpOnly Cookie or Authorization Header
function authenticateUser(req, res, next) {
  // Check cookie FIRST, fallback to Authorization header
  const token = req.cookies.authToken || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ status: 'fail', error: 'Unauthorized: Missing token' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next(); // Valid pass! Proceed to controller
  } catch (err) {
    res.status(403).json({ status: 'fail', error: 'Forbidden: Invalid or expired token' });
  }
}


// Protected Route
app.get('/api/user/profile', authenticateUser, (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      username: req.user.username,
      message: 'Access granted to secure profile!'
    }
  });
});


// Logout Route
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('authToken');
  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
});


// ==========================================
// 4. CENTRALIZED ERROR HANDLER
// ==========================================

// 404 Fallback
app.use((req, res) => {
  res.status(404).json({ status: 'fail', error: 'Endpoint not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});


// ==========================================
// 5. START SERVER
// ==========================================

app.listen(PORT, () => {
  console.log(`Server running securely on http://localhost:${PORT}`);
});