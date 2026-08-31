const Tour = require("../models/Tour");

// @desc    Create a new tour
// @route   POST /api/tours
exports.createTour = async (req, res) => {
  try {
    const { title, location, price, description } = req.body;

    const tour = await Tour.create({ title, location, price, description });

    res.status(201).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all tours
// @route   GET /api/tours
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a tour by id
// @route   PUT /api/tours/:id
exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a tour by id
// @route   DELETE /api/tours/:id
exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;

    const tour = await Tour.findByIdAndDelete(id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    res.status(200).json({
      message: "Tour deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
