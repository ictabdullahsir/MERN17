const express = require("express");
const router = express.Router();
const {
  createTour,
  getAllTours,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");

router.route("/").post(createTour).get(getAllTours);

router.route("/:id").put(updateTour).delete(deleteTour);

module.exports = router;
