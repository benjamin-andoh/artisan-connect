const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const profileService = require('../services/allProfileService');

exports.login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw { statusCode: 404, message: 'User not found' };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw { statusCode: 401, message: 'Invalid credentials' };

  const token = jwt.sign(
    { id: user.id, userType: user.userType },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  const profileCompleted = await profileService.isProfileComplete(user);

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      userType: user.userType,
      profileCompleted,
    },
  };
};
