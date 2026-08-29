const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: String,
    content: String,
    userId: mongoose.Schema.Types.ObjectId
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const blogModel = mongoose.model("Blog", BlogSchema);
const userModel = mongoose.model("User", userSchema);

module.exports = { blogModel, userModel };