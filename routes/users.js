const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

// Get current user
router.get('/profile', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Update profile
router.put('/profile', requireAuth, async (req, res) => {
  try {
    const { fullName, phone, upiId } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.session.userId,
      { fullName, phone, upiId, updatedAt: Date.now() },
      { new: true }
    ).select('-password');

    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Get balance
router.get('/balance', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('balance');
    res.json({ balance: user.balance });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching balance' });
  }
});

module.exports = router;
