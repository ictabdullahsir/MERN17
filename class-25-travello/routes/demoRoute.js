// Sample Routes
// Replace this with your actual routes

const express = require('express');
const router = express.Router();
const demoController = require('../controllers/demoController');

// GET /api/demo
router.get('/demo', demoController.getDemo);

// POST /api/demo
router.post('/demo', demoController.postDemo);

module.exports = router;
