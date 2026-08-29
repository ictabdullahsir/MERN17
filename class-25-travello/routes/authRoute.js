const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected Routes (require JWT token)
router.post('/logout', verifyToken, authController.logout);
router.get('/profile', verifyToken, authController.getProfile);
router.put('/profile', verifyToken, authController.updateProfile);
router.post('/change-password', verifyToken, authController.changePassword);
router.get('/refresh-token', verifyToken, authController.refreshToken);

module.exports = router;
