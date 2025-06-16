const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');


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
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


