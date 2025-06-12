const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ArtisanProfile = sequelize.define('ArtisanProfile', {
  userId: {
    type: DataTypes.UUID,
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
