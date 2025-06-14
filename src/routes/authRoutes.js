const express = require('express');
const router = express.Router();
const { loginUser, verifyEmail } = require('../controllers/authController.js');


router.get('/verify-email', verifyEmail);
router.post('/login', loginUser);

module.exports = router;
