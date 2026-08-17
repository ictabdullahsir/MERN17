// Simple logging middleware
function requestLogger(req, res, next) {
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = { requestLogger };
