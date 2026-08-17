const { createBlog, getAllBlogs, getBlogById } = require("./model");

// POST /api/blogs
function createBlogHandler(req, res) {
  const { title, description, author } = req.body;

  if (!title || !description || !author) {
    return res.status(400).json({
      success: false,
      message: "title, description and author are required",
      data: {},
    });
  }

  const blog = createBlog({ title, description, author });

  res.status(201).json({
    success: true,
    message: "Blog created successfully",
    data: blog,
  });
}

// GET /api/blogs
function getAllBlogsHandler(req, res) {
  const blogs = getAllBlogs();

  res.status(200).json({
    success: true,
    message: "Blogs fetched successfully",
    data: blogs,
  });
}

// GET /api/blogs/:id
function getBlogByIdHandler(req, res) {
  const blog = getBlogById(req.params.id);

  if (!blog) {
    return res.status(404).json({
      success: false,
      message: "Blog not found",
      data: {},
    });
  }

  res.status(200).json({
    success: true,
    message: "Blog fetched successfully",
    data: blog,
  });
}

module.exports = { createBlogHandler, getAllBlogsHandler, getBlogByIdHandler };
