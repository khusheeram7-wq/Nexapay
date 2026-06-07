require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

// Route Imports
const authRoutes = require('./routes/users'); // User profile, balance routes
const adminRoutes = require('./routes/admin'); // Admin management core
const transactionRoutes = require('./routes/transactions'); // User transaction core
const createOrderApi = require('./api/create-order');
const checkStatusApi = require('./api/check-status');
const submitUtrApi = require('./api/submit-utr');
const webhookApi = require('./api/webhook');

const app = express();
const PORT = process.env.PORT || 3000;

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nexapay')
  .then(() => console.log('🚀 Connected to MongoDB Database successfully.'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// CORS Configuration
app.use(cors({
  origin: true, // Allow all origins for seamless client sync
  credentials: true
}));

// Body Parsers
app.use(bodyParser.json({ limit: '10mb' })); // Support Base64 Images/Videos uploads
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Session Storage Configuration in MongoDB
app.use(session({
  secret: process.env.SESSION_SECRET || 'nexa_pay_platform_core_secret_key_2026',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    id: 'session-store',
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/nexapay',
    ttl: 14 * 24 * 60 * 60 // Sessions valid for 14 days
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 14 * 24 * 60 * 60 * 1000
  }
}));

// Serve Static Frontend Assets (User App and Admin UI Pages)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'admin')));

// -------------------------------------------------------------
// 🛠️ FAST PAYMENT / AUTOMATED GATEWAY VERIFICATION ENDPOINTS
// -------------------------------------------------------------
app.post('/api/create-order', createOrderApi);
app.post('/api/check-status', checkStatusApi);
app.post('/api/submit-utr', submitUtrApi);
app.post('/api/webhook', webhookApi);

// -------------------------------------------------------------
// 📂 PLATFORM SYSTEM UTILITY CORE API ROUTES
// -------------------------------------------------------------
app.use('/api/user', authRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/admin', adminRoutes);

// Wildcard Redirect Handler for frontend SPA or Routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Active Platform HTTP Tunnel Listener
app.listen(PORT, () => {
  console.log(`🌐 NexaPay Financial Server Engine is live on Port: ${PORT}`);
});