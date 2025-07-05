const sequelize = require('../config/db');

const User = require('./User');
const ArtisanProfile = require('./ArtisanProfile');
const CustomerProfile = require('./CustomerProfile');
const Category = require('./Category');
const ArtisanCategory = require('./ArtisanCategory');
const Review = require('./Review');
const JobRequest = require('./JobRequest');

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


// ArtisanProfile has many JobRequests (as artisan)
ArtisanProfile.hasMany(JobRequest, { foreignKey: 'artisanId' });
JobRequest.belongsTo(ArtisanProfile, { foreignKey: 'artisanId' });

// CustomerProfile has many JobRequests (as customer)
CustomerProfile.hasMany(JobRequest, { foreignKey: 'customerId' });
JobRequest.belongsTo(CustomerProfile, { foreignKey: 'customerId' });

// JobRequest has one Review
JobRequest.hasOne(Review, { foreignKey: 'jobRequestId' });
Review.belongsTo(JobRequest, { foreignKey: 'jobRequestId' });

// Artisan has many Reviews
ArtisanProfile.hasMany(Review, { foreignKey: 'artisanId' });
Review.belongsTo(ArtisanProfile, { foreignKey: 'artisanId' });

// Customer has many Reviews
CustomerProfile.hasMany(Review, { foreignKey: 'customerId' });
Review.belongsTo(CustomerProfile, { foreignKey: 'customerId' });


module.exports = {
  sequelize,
  User,
  ArtisanProfile,
  CustomerProfile,
  Category,
  ArtisanCategory,
  Review,
  JobRequest
};
