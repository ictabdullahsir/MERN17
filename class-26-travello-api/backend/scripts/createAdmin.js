require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const email = process.argv[2];
    const password = process.argv[3];
    const name = process.argv[4] || 'Travello Admin';

    if (!email || !password) {
      throw new Error('Usage: npm run create-admin -- admin@example.com Password123 "Admin Name"');
    }
    if (password.length < 6) throw new Error('Password must be at least 6 characters.');

    const hash = await bcrypt.hash(password, 12);
    const user = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $set: { name, email: email.toLowerCase(), password: hash, role: 'admin', isVerified: true }, $unset: { otp: 1, otpExpires: 1 } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`Admin ready: ${user.email}`);
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
