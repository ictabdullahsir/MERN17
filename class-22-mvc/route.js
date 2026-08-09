const express = require("express");
const router = express.Router();
const { register, login, blogCreate, getBlogs } = require("./controller");
const { checkLoginStatus } = require("./middleware");

router.post("/register", register);
router.post("/login", login)

router.post("/blog", checkLoginStatus, blogCreate)
router.get("/blog", getBlogs)

module.exports = router;