const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const validator = require('validator');

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name cannot exceed 50 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Please provide a valid email address',
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't return password by default
    },
    phone: {
      type: String,
      unique: true,
      sparse: true, // Allow null values
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// Create index on email for faster lookups
userSchema.index({ email: 1 });

// Hash password before saving
userSchema.pre('save', async function (next) {
  // Only hash if password is modified
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const rounds = parseInt(process.env.BCRYPT_ROUNDS) || 10;
    const salt = await bcryptjs.genSalt(rounds);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password with hash
userSchema.methods.comparePassword = async function (inputPassword) {
  return await bcryptjs.compare(inputPassword, this.password);
};

// Method to get user data without sensitive info
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

// Create and export User model
const User = mongoose.model('User', userSchema);

module.exports = User;
