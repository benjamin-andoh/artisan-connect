const User = require('../models/User');
const { sendEmail } = require('../utils/emailService');
const { getVerificationEmail } = require('../utils/emailTemplates');

exports.createUser = async (req, res) => {
  console.log("we are currently here req.body", req.body)
  const { username, email, password, userType = 'customer' } = req.body;

  if (!username || !email || !password || !userType) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const validUserTypes = ['artisan', 'customer'];
  if (!validUserTypes.includes(userType)) {
    return res.status(400).json({ error: 'Invalid user type' });
  }

  try {
    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    console.log("new user will be created")
    const user = await User.create({
      username,
      email,
      password,
      userType
    });
    console.log("user has nbeen created successfully")
    const { subject, html } = getVerificationEmail(user.username, user.emailVerificationToken);

    await sendEmail({ to: user.email, subject, html });

    return res.status(201).json({
      message: 'User registered. Please check your email to verify your account.',
      userId: user.id,
    });

  } catch (error) {
    console.error('User creation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getAllUsers = async (_req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.update(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'username', 'email'],
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};