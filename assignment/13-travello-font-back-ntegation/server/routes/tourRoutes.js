const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dbPath = path.join(__dirname, "..", "data", "db.json");

function readDb() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

router.get("/", (req, res) => {
  const db = readDb();
  const search = String(req.query.search || "").toLowerCase();

  const tours = db.tours.filter((tour) => {
    return (
      tour.title.toLowerCase().includes(search) ||
      tour.destination.toLowerCase().includes(search)
    );
  });

  res.json({ tours });
});

router.get("/:id", (req, res) => {
  const db = readDb();
  const tour = db.tours.find((item) => item.id === req.params.id);

  if (!tour) {
    return res.status(404).json({ message: "Tour not found" });
  }

  res.json({ tour });
});

module.exports = router;
