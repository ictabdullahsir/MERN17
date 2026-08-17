// Simple in-memory "database" for blogs
let blogs = [];
let nextId = 1;

function createBlog({ title, description, author }) {
  const blog = {
    id: nextId++,
    title,
    description,
    author,
  };
  blogs.push(blog);
  return blog;
}

function getAllBlogs() {
  return blogs;
}

function getBlogById(id) {
  return blogs.find((blog) => blog.id === Number(id));
}

module.exports = { createBlog, getAllBlogs, getBlogById };
