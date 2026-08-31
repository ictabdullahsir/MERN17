
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const tourRoutes = require("./routes/tourRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/tours", tourRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Travello Tour API is running...");
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
