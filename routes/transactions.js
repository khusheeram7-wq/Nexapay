const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

// Get user transactions
router.get('/history', requireAuth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.session.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching transactions' });
  }
});

// Deposit
router.post('/deposit', requireAuth, async (req, res) => {
  try {
    const { amount, upiReference } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const transaction = new Transaction({
      userId: req.session.userId,
      type: 'deposit',
      amount,
      status: 'success',
      upiReference,
      description: 'Wallet deposit'
    });

    await transaction.save();

    await User.findByIdAndUpdate(
      req.session.userId,
      { $inc: { balance: amount } }
    );

    res.json({ message: 'Deposit successful', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Error processing deposit' });
  }
});

// Withdrawal
router.post('/withdrawal', requireAuth, async (req, res) => {
  try {
    const { amount, upiId } = req.body;

    if (amount <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const user = await User.findById(req.session.userId);
    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    const transaction = new Transaction({
      userId: req.session.userId,
      type: 'withdrawal',
      amount,
      status: 'success',
      description: `Withdrawal to ${upiId}`
    });

    await transaction.save();

    await User.findByIdAndUpdate(
      req.session.userId,
      { $inc: { balance: -amount } }
    );

    res.json({ message: 'Withdrawal successful', transaction });
  } catch (err) {
    res.status(500).json({ message: 'Error processing withdrawal' });
  }
});

module.exports = router;
