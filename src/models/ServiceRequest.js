// models/ServiceRequest.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./Users');

const ServiceRequest = sequelize.define('ServiceRequest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  customerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  artisanId: {
    type: DataTypes.UUID,
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

User.hasMany(ServiceRequest, { foreignKey: 'customerId', as: 'serviceRequestsMade' });
User.hasMany(ServiceRequest, { foreignKey: 'artisanId', as: 'serviceRequestsReceived' });
ServiceRequest.belongsTo(User, { foreignKey: 'customerId', as: 'customer' });
ServiceRequest.belongsTo(User, { foreignKey: 'artisanId', as: 'artisan' });

module.exports = ServiceRequest;
