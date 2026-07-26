const express = require("express");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const app = express();

const upload = multer({ dest: 'uploads/' });
app.use(express.json());

app.post("/upload", upload.single("file"), (req, res) => {
    res.json({ message: "File uploaded successfully" });
});

app.get("/oneuser", (req, res) => { // /oneuser?id=123
    const userId = req.query.id
    console.log("User ID:", userId);
    // Logic to fetch a single user from the database using userId
    const user = { id: userId, name: "John Doe" };
    res.status(200).json(user);
});

app.get("/users", (req, res) => {
    // Logic to fetch users from the database
    const users = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
    ];
    res.status(200).json(users);
});

app.post("/users", (req, res) => {
    const info = req.body;
    // password hashing logic here
    // Logic to create a new user in the database (info.name, info.email, etc.)
    res.status(201).json({ message: "User created successfully" });
});

// login
// email, password
// persist user session (cookie, JWT, etc.)
app.post("/login", (req, res) => {
    const info = req.body;
    // password hashing logic here
    // email, password user exists in the database?
    // if yes, create a session (cookie, JWT, etc.)
    const token = jwt.sign({ email: info.email }, "your_secret_key", { expiresIn: "1h" });
    console.log("Token:", token);
    res.set("Authorization", `Bearer ${token}`);
    res.json({ message: "Login successful" });
});

app.get("/profile", (req, res) => {
    // check if user is logged in (check cookie, JWT, etc.)
    const token = req.headers.authorization?.split(" ")[1];
    
    jwt.verify(token, "your_secret_key", (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    })

    res.json({ message: "User profile data" });
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});

// REST API
// GET, POST, PUT, PATCH, DELETE

// Create, Read, Update, Delete : CRUD Operations