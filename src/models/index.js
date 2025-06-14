const sequelize = require('../config/db');

const User = require('./User');
const ArtisanProfile = require('./ArtisanProfile');
const Category = require('./Category');
const ArtisanCategory = require('./ArtisanCategory');
const Review = require('./Review');

// User -> ArtisanProfile
User.hasOne(ArtisanProfile, { foreignKey: 'userId' });
ArtisanProfile.belongsTo(User, { foreignKey: 'userId' });

// ArtisanProfile -> Categories (Many-to-Many)
ArtisanProfile.belongsToMany(Category, {
  through: ArtisanCategory,
  foreignKey: 'artisanProfileId',
});

Category.belongsToMany(ArtisanProfile, {
  through: ArtisanCategory,
  foreignKey: 'categoryId',
});

module.exports = {
  sequelize,
  User,
  ArtisanProfile,
  Category,
  ArtisanCategory,
  Review
};
