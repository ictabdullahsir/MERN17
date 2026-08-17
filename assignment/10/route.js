const express = require("express");
const router = express.Router();
const {
  createBlogHandler,
  getAllBlogsHandler,
  getBlogByIdHandler,
} = require("./controller");

router.post("/blogs", createBlogHandler);
router.get("/blogs", getAllBlogsHandler);
router.get("/blogs/:id", getBlogByIdHandler);

module.exports = router;
