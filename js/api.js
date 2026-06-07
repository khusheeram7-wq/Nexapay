// API Configuration
const API = {
  URL: 'http://localhost:3000/api',
  
  async fetch(endpoint, options = {}) {
    const url = `${this.URL}${endpoint}`;
    const config = {
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', ...options.headers }
    };

    const response = await fetch(url, { ...config, ...options });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API Error');
    }
    return data;
  },

  // Auth
  async register(username, email, password, fullName) {
    return this.fetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, fullName })
    });
  },

  async login(email, password) {
    return this.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  async logout() {
    return this.fetch('/auth/logout', { method: 'POST' });
  },

  async checkAuth() {
    return this.fetch('/auth/status');
  },

  // User
  async getProfile() {
    return this.fetch('/user/profile');
  },

  async updateProfile(fullName, phone, upiId) {
    return this.fetch('/user/profile', {
      method: 'PUT',
      body: JSON.stringify({ fullName, phone, upiId })
    });
  },

  async getBalance() {
    return this.fetch('/user/balance');
  },

  // Transactions
  async getTransactionHistory() {
    return this.fetch('/transaction/history');
  },

  async deposit(amount, upiReference) {
    return this.fetch('/transaction/deposit', {
      method: 'POST',
      body: JSON.stringify({ amount, upiReference })
    });
  },

  async withdraw(amount, upiId) {
    return this.fetch('/transaction/withdrawal', {
      method: 'POST',
      body: JSON.stringify({ amount, upiId })
    });
  }
};

// Helper functions for common tasks
async function redirectIfNotAuthenticated() {
  try {
    const status = await API.checkAuth();
    if (!status.authenticated) {
      window.location.href = '/';
    }
  } catch {
    window.location.href = '/';
  }
}

async function redirectIfNotAdmin() {
  try {
    const status = await API.checkAuth();
    if (!status.authenticated || !status.isAdmin) {
      window.location.href = '/';
    }
  } catch {
    window.location.href = '/';
  }
}

function showError(message) {
  const alert = document.createElement('div');
  alert.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #ff4444; color: white; padding: 15px 20px; border-radius: 5px; z-index: 9999;';
  alert.innerText = message;
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 3000);
}

function showSuccess(message) {
  const alert = document.createElement('div');
  alert.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #44ff44; color: #000; padding: 15px 20px; border-radius: 5px; z-index: 9999;';
  alert.innerText = message;
  document.body.appendChild(alert);
  setTimeout(() => alert.remove(), 3000);
}
