const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order_id: { type: String, unique: true, sparse: true },
  type: { type: String, required: true }, // deposit, withdrawal, transfer, commission, bonus
  amount: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // Pending, Success, Approved, Rejected, Timeout, Cancel
  upiReference: { type: String, default: '' }, // UTR or TxID
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);