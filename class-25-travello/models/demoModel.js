// Demo Model with Mongoose Schema
const mongoose = require('mongoose');

// Define schema
const demoSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create and export model
const DemoModel = mongoose.model('Demo', demoSchema);

module.exports = DemoModel;
