const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, default: '' },
  email: { type: String, default: '' },
  upiId: { type: String, default: '' },
  bankDetails: { type: String, default: '' },
  balance: { type: Number, default: 0 },
  recharge: { type: Number, default: 0 },
  commission: { type: Number, default: 0 },
  topupBonus: { type: Number, default: 0 },
  teamCommission: { type: Number, default: 0 },
  todayDep: { type: Number, default: 0 },
  todayWith: { type: Number, default: 0 },
  lifeDep: { type: Number, default: 0 },
  lifeWith: { type: Number, default: 0 },
  team1Count: { type: Number, default: 0 }, // Level 1 Direct
  team2Count: { type: Number, default: 0 }, // Level 2 Indirect
  referredBy: { type: String, default: 'admin123' },
  referrerCodeId: { type: String, default: '' },
  freezeDeposit: { type: Boolean, default: false },
  googleAuth: { type: Boolean, default: false },
  accountBlocked: { type: Boolean, default: false },
  status: { type: String, default: 'ACTIVE' }, // ACTIVE, BLOCKED, TRASH
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);