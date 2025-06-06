const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check for existing user
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: 'User already exists' });
    
    // Create and save new user
    user = new User({ username, email, password });
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d' // Token expires in 30 days
    });
    
    res.status(201).json({ 
      token, 
      user: { id: user._id, username, email } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login existing user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });
    
    res.json({ 
      token, 
      user: { id: user._id, username: user.username, email } 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get current user profile
exports.getMe = async (req, res) => {
  try {
    // Exclude password from response
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};