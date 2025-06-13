const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ArtisanProfile = sequelize.define('ArtisanProfile', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = ArtisanProfile;
