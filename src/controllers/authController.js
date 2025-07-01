const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const authService = require('../services/authService');


exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ error: 'Verification token is required' });
  }
  try {
    const user = await User.findOne({ where: { emailVerificationToken: token } });

    if (!user) {
      return res.status(404).json({ error: 'Invalid or expired verification token' });
    }
    
    if (user.emailVerified) {
      return res.status(200).json({ message: 'Email already verified' });
    }

    user.emailVerified = true;
    user.emailVerificationToken = null;
    await user.save();
    return res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (err) {
    console.error('Verification error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const result = await authService.login(req.body.email, req.body.password);
    res.status(200).json(result);
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};


