// models/ServiceRequest.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const ArtisanProfile = require('./ArtisanProfile');

const ServiceRequest = sequelize.define('ServiceRequest', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  artisanProfileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'completed'),
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

// Customer association
User.hasMany(ServiceRequest, { foreignKey: 'customerId' });
ServiceRequest.belongsTo(User, { foreignKey: 'customerId' });

// Artisan association
ArtisanProfile.hasMany(ServiceRequest, { foreignKey: 'artisanProfileId' });
ServiceRequest.belongsTo(ArtisanProfile, { foreignKey: 'artisanProfileId' });


module.exports = ServiceRequest;
