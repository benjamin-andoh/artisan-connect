const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ArtisanProfile = require('./ArtisanProfile');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  artisanProfileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'reviews',
  timestamps: true,
});

// ArtisanProfile.hasMany(Review, { foreignKey: 'artisanProfileId' });
// Review.belongsTo(ArtisanProfile, { foreignKey: 'artisanProfileId' });

module.exports = Review;
