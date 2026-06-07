const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Transaction = require('../models/Transaction');
const Settings = require('../models/Settings');
const { requireAdmin } = require('../middleware/auth');

// Admin only middleware - check if admin
router.use(requireAdmin);

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').limit(100);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Search users
router.get('/users/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { fullName: { $regex: query, $options: 'i' } }
      ]
    }).select('-password').limit(50);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error searching users' });
  }
});

// Get user details
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Update user status
router.put('/users/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    ).select('-password');
    res.json({ message: 'User status updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Update user balance (admin)
router.put('/users/:id/balance', async (req, res) => {
  try {
    const { amount, reason } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $inc: { balance: amount }, updatedAt: Date.now() },
      { new: true }
    ).select('-password');

    // Log transaction
    new Transaction({
      userId: req.params.id,
      type: 'transfer',
      amount,
      status: 'success',
      description: `Admin adjustment: ${reason || 'Balance update'}`
    }).save();

    res.json({ message: 'Balance updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating balance' });
  }
});

// Get all transactions
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('userId', 'username email')
      .sort({ createdAt: -1 })
      .limit(500);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'active' });
    const totalTransactions = await Transaction.countDocuments();
    
    const totalDeposits = await Transaction.aggregate([
      { $match: { type: 'deposit' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      totalUsers,
      activeUsers,
      totalTransactions,
      totalDeposits: totalDeposits[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
});

// Get settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await Settings.find();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching settings' });
  }
});

// Update settings
router.put('/settings/:key', async (req, res) => {
  try {
    const { value } = req.body;
    const setting = await Settings.findOneAndUpdate(
      { key: req.params.key },
      { value, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.json({ message: 'Setting updated', setting });
  } catch (err) {
    res.status(500).json({ message: 'Error updating setting' });
  }
});

module.exports = router;
