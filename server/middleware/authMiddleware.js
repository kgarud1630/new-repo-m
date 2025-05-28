const admin = require('firebase-admin');
const User = require('../models/User');

// Initialize Firebase Admin with service account if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  });
}

// Middleware to verify Firebase token and set user in request
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }
    
    const token = authHeader.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Invalid authorization format' });
    }
    
    try {
      // Verify token with Firebase
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      
      // Get additional user data from MongoDB
      const user = await User.findOne({ uid: decodedToken.uid });
      
      if (user) {
        req.userDetails = user;
      }
      
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Middleware to check admin role
const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.userDetails || req.userDetails.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin role required.' });
    }
    
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Middleware to check premium subscription
const premiumMiddleware = async (req, res, next) => {
  try {
    if (!req.userDetails) {
      return res.status(403).json({ message: 'User details not found' });
    }
    
    if (!req.userDetails.isPremium) {
      return res.status(403).json({ message: 'Premium subscription required' });
    }
    
    // Check if subscription is expired
    if (req.userDetails.subscriptionEnd && new Date() > req.userDetails.subscriptionEnd) {
      return res.status(403).json({ message: 'Premium subscription expired' });
    }
    
    next();
  } catch (error) {
    console.error('Premium middleware error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  premiumMiddleware
};
