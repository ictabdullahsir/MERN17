const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { register, login, blogCreate, getBlogs } = require("./controller");
const { checkLoginStatus } = require("./middleware");

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per windowMs
  skipSuccessfulRequests: true, // Only count failed requests
  message: { status: 'fail', error: 'Too many login attempts. Try again in an hour.' }
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login)

router.post("/blog", checkLoginStatus, blogCreate)
router.get("/blog", getBlogs)

module.exports = router;