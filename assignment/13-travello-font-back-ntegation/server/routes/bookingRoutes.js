const express = require("express");
const fs = require("fs");
const path = require("path");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const dbPath = path.join(__dirname, "..", "data", "db.json");

function readDb() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function writeDb(db) {
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
}

router.use(authMiddleware);

router.post("/", (req, res) => {
  const { tourId, date, guests } = req.body;
  const db = readDb();

  const tour = db.tours.find((item) => item.id === tourId);

  if (!tour) {
    return res.status(404).json({ message: "Tour not found" });
  }

  if (!date || !guests || Number(guests) < 1) {
    return res.status(400).json({
      message: "Valid date and guest count are required"
    });
  }

  const booking = {
    id: `booking-${Date.now()}`,
    userId: req.user.id,
    tourId,
    tourTitle: tour.title,
    date,
    guests: Number(guests),
    totalPrice: tour.price * Number(guests),
    status: "Pending",
    createdAt: new Date().toISOString()
  };

  db.bookings.push(booking);
  writeDb(db);

  res.status(201).json({
    message: "Booking created successfully",
    booking
  });
});

router.get("/my", (req, res) => {
  const db = readDb();

  const bookings = db.bookings.filter(
    (booking) => booking.userId === req.user.id
  );

  res.json({ bookings });
});

module.exports = router;
