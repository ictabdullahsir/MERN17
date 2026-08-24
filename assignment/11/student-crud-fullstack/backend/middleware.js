const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "student_management_secret_key";

function authenticateUser(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token not found!" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { userId }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid or expired token!" });
  }
}

module.exports = { authenticateUser, JWT_SECRET };
