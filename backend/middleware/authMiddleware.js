// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const User = require('../model/Registeruser');

const protect = async (req, res, next) => {
  try {
    // Header se token lo
    const token = req.headers.authorization?.split(' ')[1];
    // Format hoga: "Bearer eyJhbGc..."

    if (!token) {
      return res.status(401).json({ message: "Login karo pehle" });
    }

    // Token verify karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User dhundo aur req mein attach karo
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: "User nahi mila" });
    }

    req.user = user;  // ← Ab kisi bhi controller mein req.user milega
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Admin only access
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      message: "Admin access required" 
    });
  }
  next();
};

module.exports = { protect, adminOnly };