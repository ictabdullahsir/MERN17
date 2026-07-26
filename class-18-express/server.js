const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.set({
        'shirsho': 'amar header'
    });
    res.cookie('browse', 'chrome');
    res.status(200).json({ message: "Hello, World!" });
})

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});