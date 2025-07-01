const { ArtisanProfile, CustomerProfile } = require('../models');
const validate = require('../utils/profileValidator');

exports.isProfileComplete = async (user) => {
  switch (user.userType) {
    case 'artisan': {
      const profile = await ArtisanProfile.findOne({ where: { userId: user.id } });
      return validate.artisanProfile(profile);
    }

    case 'customer': {
      const profile = await CustomerProfile.findOne({ where: { userId: user.id } });
      return validate.customerProfile(profile);
    }

    case 'admin':
      return true;

    default:
      return false;
  }
};
