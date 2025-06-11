const express = require('express');
const User = require('../models/Users')
const bcrypt = require('bcrypt');
const generateToken = require('../utils/jwt');


const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const user = await User.create(req.body);
      console.log("i am here ")
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ error: 'Please provide all required fields' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password, role });

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// ✅ User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const user = await User.findOne({ where: { email } });

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Compare passwords
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate token
    const token = generateToken(user);

    return res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
