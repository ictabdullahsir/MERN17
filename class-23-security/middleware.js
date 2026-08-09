async function checkLoginStatus(req, res, next) { // Route Middleware
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

module.exports = { checkLoginStatus };