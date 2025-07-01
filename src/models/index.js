const sequelize = require('../config/db');

const User = require('./User');
const ArtisanProfile = require('./ArtisanProfile');
const CustomerProfile = require('./CustomerProfile');
const Category = require('./Category');
const ArtisanCategory = require('./ArtisanCategory');
const Review = require('./Review');

// User → ArtisanProfile
User.hasOne(ArtisanProfile, { foreignKey: 'userId' });
ArtisanProfile.belongsTo(User, { foreignKey: 'userId' });

// User → CustomerProfile
User.hasOne(CustomerProfile, { foreignKey: 'userId' });
CustomerProfile.belongsTo(User, { foreignKey: 'userId' });

// ArtisanProfile ↔ Category (Many-to-Many)
ArtisanProfile.belongsToMany(Category, {
  through: ArtisanCategory,
  foreignKey: 'artisanProfileId',
  otherKey: 'categoryId'
});
Category.belongsToMany(ArtisanProfile, {
  through: ArtisanCategory,
  foreignKey: 'categoryId',
  otherKey: 'artisanProfileId'
});

module.exports = {
  sequelize,
  User,
  ArtisanProfile,
  CustomerProfile,
  Category,
  ArtisanCategory,
  Review
};
