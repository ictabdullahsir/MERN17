const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require('express-async-errors');
const express = require('express');
const path = require('path');
require('dotenv').config();

// Import middleware, routes & database
const logger = require('./middleware/logger');
const { errorHandler } = require('./middleware/authMiddleware');
const demoRoute = require('./routes/demoRoute');
const authRoute = require('./routes/authRoute');
const connectDB = require('./config/db');

const app = express();
const PORT = 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '.')));
app.use(logger);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use('/api/auth', authRoute);
app.use('/api', demoRoute);

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
