const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json()); // Application Middleware

const MONGODB_URI = "mongodb+srv://bsse1106_db_user:GlgnLuyiXXjJ3wds@cluster0.m3zhjem.mongodb.net/"

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

app.use('/api', require('./route'));

app.listen(4000, async () => {
  await connectToDatabase();
  console.log("Server is running on port 4000");
});