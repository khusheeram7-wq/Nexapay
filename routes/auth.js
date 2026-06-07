const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      username,
      email,
      password: hashedPassword,
      fullName
    });

    await user.save();

    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;

    res.json({ 
      message: 'Registered successfully', 
      user: { id: user._id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.status === 'blocked') {
      return res.status(403).json({ message: 'Account is blocked' });
    }

    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;

    res.json({ 
      message: 'Logged in successfully', 
      user: { id: user._id, username: user.username, isAdmin: user.isAdmin }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: 'Error logging out' });
    res.json({ message: 'Logged out successfully' });
  });
});

// Check Auth Status
router.get('/status', (req, res) => {
  if (req.session.userId) {
    res.json({ 
      authenticated: true, 
      userId: req.session.userId,
      isAdmin: req.session.isAdmin
    });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
