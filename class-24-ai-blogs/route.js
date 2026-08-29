const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { register, login, blogCreate, getBlogs, createBlogWithAI } = require("./controller");
const { checkLoginStatus } = require("./middleware");

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 requests per windowMs
  skipSuccessfulRequests: true, // Only count failed requests
  message: { status: 'fail', error: 'Too many login attempts. Try again in an hour.' }
});

const blogLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { status: 'fail', error: 'Too many requests. Try again later.' }
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login)

router.post("/blog", checkLoginStatus, blogCreate)
router.post("/blog/ai", blogLimiter, checkLoginStatus, createBlogWithAI)
router.get("/blog", getBlogs)

module.exports = router;