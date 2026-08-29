const jwt = require('jsonwebtoken');

// Verify JWT Token Middleware
const verifyToken = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided or invalid format. Use: Authorization: Bearer &lt;token&gt;',
        code: 'NO_TOKEN',
      });
    }

    // Extract token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token has expired',
        code: 'TOKEN_EXPIRED',
        expiredAt: error.expiredAt,
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token',
        code: 'INVALID_TOKEN',
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Authentication error',
      code: 'AUTH_ERROR',
    });
  }
};

// Enhanced Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  // JWT Errors
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token has expired',
      code: 'TOKEN_EXPIRED',
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
      code: 'INVALID_TOKEN',
    });
  }

  // Mongoose Validation Errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors)
      .map((error) => error.message)
      .join(', ');

    return res.status(400).json({
      success: false,
      message: messages,
      code: 'VALIDATION_ERROR',
    });
  }

  // Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      success: false,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      code: 'DUPLICATE_FIELD',
    });
  }

  // Cast Error (Invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
      code: 'INVALID_ID',
    });
  }

  // Default error
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server error',
    code: err.code || 'SERVER_ERROR',
  });
};

module.exports = { verifyToken, errorHandler };
