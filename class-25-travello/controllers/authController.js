const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/userModel');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// Auth Controller
const authController = {
  // Register: POST /auth/register
  register: async (req, res) => {
    try {
      const { name, email, password, passwordConfirm } = req.body;

      // Validation
      if (!name || !email || !password || !passwordConfirm) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields',
          code: 'MISSING_FIELDS',
        });
      }

      // Validate email format
      if (!validator.isEmail(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address',
          code: 'INVALID_EMAIL',
        });
      }

      // Password validation
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters',
          code: 'PASSWORD_TOO_SHORT',
        });
      }

      if (password !== passwordConfirm) {
        return res.status(400).json({
          success: false,
          message: 'Passwords do not match',
          code: 'PASSWORD_MISMATCH',
        });
      }

      // Check if email already exists
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email already registered',
          code: 'EMAIL_EXISTS',
        });
      }

      // Create new user
      const user = await User.create({
        name,
        email,
        password,
      });

      // Generate token
      const token = generateToken(user._id);

      // Return response
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        token,
        user: user.toJSON(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server error during registration',
        code: 'REGISTER_ERROR',
      });
    }
  },

  // Login: POST /auth/login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Please provide email and password',
          code: 'MISSING_CREDENTIALS',
        });
      }

      // Find user and include password field
      const user = await User.findOne({ email: email.toLowerCase() }).select(
        '+password'
      );

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS',
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'User account is inactive',
          code: 'USER_INACTIVE',
        });
      }

      // Compare password
      const isPasswordCorrect = await user.comparePassword(password);

      if (!isPasswordCorrect) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password',
          code: 'INVALID_CREDENTIALS',
        });
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Generate token
      const token = generateToken(user._id);

      // Return response
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: user.toJSON(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server error during login',
        code: 'LOGIN_ERROR',
      });
    }
  },

  // Logout: POST /auth/logout
  logout: async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server error during logout',
        code: 'LOGOUT_ERROR',
      });
    }
  },

  // Get Profile: GET /auth/profile
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        });
      }

      res.status(200).json({
        success: true,
        user: user.toJSON(),
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server error fetching profile',
        code: 'PROFILE_ERROR',
      });
    }
  },

  // Update Profile: PUT /auth/profile
  updateProfile: async (req, res) => {
    try {
      const { name, phone, bio } = req.body;
      const userId = req.user.id;

      // Build update object with only provided fields
      const updateData = {};
      if (name) updateData.name = name;
      if (phone !== undefined) updateData.phone = phone;
      if (bio !== undefined) updateData.bio = bio;

      // Update user
      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user: user.toJSON(),
      });
    } catch (error) {
      // Handle duplicate phone error
      if (error.code === 11000 && error.keyPattern.phone) {
        return res.status(409).json({
          success: false,
          message: 'Phone number already in use',
          code: 'PHONE_EXISTS',
        });
      }

      res.status(500).json({
        success: false,
        message: error.message || 'Server error updating profile',
        code: 'UPDATE_ERROR',
      });
    }
  },

  // Change Password: POST /auth/change-password
  changePassword: async (req, res) => {
    try {
      const { currentPassword, newPassword, newPasswordConfirm } = req.body;
      const userId = req.user.id;

      // Validation
      if (!currentPassword || !newPassword || !newPasswordConfirm) {
        return res.status(400).json({
          success: false,
          message: 'Please provide all required fields',
          code: 'MISSING_FIELDS',
        });
      }

      // Validate new password length
      if (newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters',
          code: 'PASSWORD_TOO_SHORT',
        });
      }

      // Check if passwords match
      if (newPassword !== newPasswordConfirm) {
        return res.status(400).json({
          success: false,
          message: 'New passwords do not match',
          code: 'PASSWORD_MISMATCH',
        });
      }

      // Get user with password field
      const user = await User.findById(userId).select('+password');

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        });
      }

      // Verify current password
      const isPasswordCorrect = await user.comparePassword(currentPassword);

      if (!isPasswordCorrect) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect',
          code: 'INVALID_PASSWORD',
        });
      }

      // Update password
      user.password = newPassword;
      await user.save();

      res.status(200).json({
        success: true,
        message: 'Password changed successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server error changing password',
        code: 'PASSWORD_CHANGE_ERROR',
      });
    }
  },

  // Refresh Token: GET /auth/refresh-token
  refreshToken: async (req, res) => {
    try {
      const userId = req.user.id;

      // Verify user still exists
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        });
      }

      if (!user.isActive) {
        return res.status(403).json({
          success: false,
          message: 'User account is inactive',
          code: 'USER_INACTIVE',
        });
      }

      // Generate new token
      const newToken = generateToken(userId);

      res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        token: newToken,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Server error refreshing token',
        code: 'REFRESH_ERROR',
      });
    }
  },
};

module.exports = authController;
