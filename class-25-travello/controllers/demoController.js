// Demo Controller with MongoDB operations
const DemoModel = require('../models/demoModel');

const demoController = {
  // GET all demos
  getDemo: async (req, res) => {
    try {
      const data = await DemoModel.find();
      res.json({ success: true, data });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST new demo
  postDemo: async (req, res) => {
    try {
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ success: false, error: 'Message is required' });
      }

      const newDemo = new DemoModel({ message });
      const result = await newDemo.save();
      res.status(201).json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

module.exports = demoController;
