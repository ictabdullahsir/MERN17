const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dbPath = path.join(__dirname, "..", "data", "db.json");

function readDb() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function writeDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

function createToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: "Password must be at least 6 characters"
    });
  }

  const db = readDb();
  const normalizedEmail = email.toLowerCase().trim();

  if (db.users.some((user) => user.email === normalizedEmail)) {
    return res.status(409).json({
      message: "Email already registered"
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString()
  };

  db.users.push(user);
  writeDb(db);

  res.status(201).json({
    message: "Registration successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const db = readDb();

  const user = db.users.find(
    (item) => item.email === String(email || "").toLowerCase().trim()
  );

  if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  res.json({
    message: "Login successful",
    token: createToken(user),
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

router.get("/me", require("../middleware/authMiddleware"), (req, res) => {
  const db = readDb();
  const user = db.users.find((item) => item.id === req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});

module.exports = router;
