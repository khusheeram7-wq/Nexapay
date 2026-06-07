# 🚀 NexaPay - Digital Payment Wallet with Admin Panel

A complete payment wallet application with admin control panel built with Express.js, MongoDB, and Session-based authentication.

## Features

✅ **User Management**
- User Registration & Login (Session-based)
- Profile Management
- Balance Tracking

✅ **Payment Features**
- Deposit Money (via UPI)
- Withdraw Money
- Transaction History
- UPI Integration

✅ **Admin Panel**
- Complete User Management
- User Search & Filtering
- Block/Unblock Users
- Manual Balance Adjustment
- Transaction Monitoring
- System Settings
- Real-time Stats Dashboard

## Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: Express-session
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **API**: RESTful API with session-based auth

## Prerequisites

- Node.js (v14+)
- MongoDB (running on localhost:27017)
- npm

## Installation

1. **Clone/Download the project**
```bash
cd nexapay
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure Environment Variables**

Edit `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/nexapay
PORT=3000
SESSION_SECRET=your_secret_key_here_change_in_production
NODE_ENV=development
```

4. **Make sure MongoDB is running**
```bash
# On Windows
mongod

# On Mac
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

5. **Start the server**
```bash
npm start
```

The server will run on `http://localhost:3000`

## Usage

### For Users

1. **Register**: Visit `http://localhost:3000/` and create an account
2. **Login**: Use your credentials to login
3. **Profile**: View and edit your profile at `/profile`
4. **Deposit**: Add money to your wallet
5. **Withdraw**: Withdraw money to your UPI
6. **History**: Check all your transactions

### For Admins

1. **Access Admin Panel**: Navigate to `http://localhost:3000/admin`
2. **Dashboard**: View overall statistics
3. **User Management**: 
   - Search and filter users
   - View user details
   - Adjust user balances
   - Block/Unblock accounts
4. **Transactions**: Monitor all transactions
5. **Settings**: Configure system settings

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/status` - Check auth status

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update profile
- `GET /api/user/balance` - Get balance

### Transactions
- `GET /api/transaction/history` - Get transaction history
- `POST /api/transaction/deposit` - Deposit money
- `POST /api/transaction/withdrawal` - Withdraw money

### Admin (Admin-only)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/search/:query` - Search users
- `GET /api/admin/users/:id` - Get user details
- `PUT /api/admin/users/:id/status` - Update user status
- `PUT /api/admin/users/:id/balance` - Adjust user balance
- `GET /api/admin/transactions` - Get all transactions
- `GET /api/admin/stats` - Get dashboard stats
- `GET /api/admin/settings` - Get settings
- `PUT /api/admin/settings/:key` - Update setting

## Project Structure

```
nexapay/
├── models/              # Mongoose schemas
│   ├── User.js
│   ├── Transaction.js
│   └── Settings.js
├── routes/              # API routes
│   ├── auth.js
│   ├── users.js
│   ├── transactions.js
│   └── admin.js
├── middleware/          # Express middleware
│   └── auth.js          # Authentication middleware
├── admin/               # Admin dashboard
│   └── dashboard.html
├── js/                  # Frontend scripts
│   └── api.js           # API client
├── index.html           # Landing page
├── register.html        # Registration page
├── home.html            # Dashboard page
├── me.html              # Profile page
├── deposit.html         # Deposit page
├── upi.html             # UPI page
├── team.html            # Team/Referral page
├── server.js            # Main server file
├── package.json         # Dependencies
├── .env                 # Environment variables
└── README.md            # This file
```

## Features Documentation

### User Registration & Login
- Users can register with username, email, and password
- Passwords are hashed using bcryptjs
- Session-based authentication
- Sessions stored in MongoDB

### Payment System
- Deposit: Add money to wallet via UPI
- Withdrawal: Withdraw to UPI with instant balance update
- Transaction history with dates and status

### Admin Features
- View all users with pagination
- Search users by name, email, or username
- View detailed user information
- Adjust user balance manually (with reason logging)
- Block/Unblock user accounts
- View all transactions system-wide
- Real-time dashboard statistics
- System settings management

## Security Considerations

1. **Passwords**: Hashed with bcryptjs
2. **Sessions**: Stored securely in MongoDB
3. **Authentication**: Express-session middleware
4. **Authorization**: Admin check middleware on all admin routes
5. **Input Validation**: Basic validation on all inputs

⚠️ **Note for Production:**
- Change `SESSION_SECRET` to a strong random string
- Use HTTPS instead of HTTP
- Add CSRF protection
- Implement rate limiting
- Add input sanitization
- Use environment-specific configurations

## Troubleshooting

**Problem**: Cannot connect to MongoDB
- **Solution**: Ensure MongoDB is running on localhost:27017

**Problem**: Port 3000 already in use
- **Solution**: Change PORT in .env file or stop the process using port 3000

**Problem**: Session data not persisting
- **Solution**: Check MongoDB connection and ensure connect-mongo is properly configured

## Next Steps

1. ✅ Connect all frontend pages to API
2. ✅ Implement admin dashboard
3. 📝 Add email verification
4. 📝 Add 2FA (Two-Factor Authentication)
5. 📝 Add UPI payment gateway integration
6. 📝 Add referral system
7. 📝 Deploy to production

## Support

For issues or questions, check the logs and error messages in the console.

## License

ISC

---

**Built with ❤️ by NexaPay Team**
