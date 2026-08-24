const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

const {
  register,
  login,
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} = require("./controller");
const { authenticateUser } = require("./middleware");

// Brute-force protection for auth routes
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  skipSuccessfulRequests: true,
  message: { status: "fail", error: "Too many attempts. Try again in an hour." },
});

// ---------------- Auth Routes ----------------
router.post("/auth/register", authLimiter, register);
router.post("/auth/login", authLimiter, login);

// ---------------- Student Routes (Protected) ----------------
router.post("/students", authenticateUser, createStudent);
router.get("/students", authenticateUser, getStudents);
router.get("/students/:id", authenticateUser, getStudent);
router.put("/students/:id", authenticateUser, updateStudent);
router.delete("/students/:id", authenticateUser, deleteStudent);

module.exports = router;
