const express = require("express");


const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());

// // Route
// //const route = require("./route");


// // Router
// app.use("/", router);

// Route
const { router, checkUser } = require("./route");

// Router
app.use("/", router);



// // Home
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});