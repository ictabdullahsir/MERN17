// Sample Middleware
// Replace this with your actual middleware logic

const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
};

module.exports = logger;
