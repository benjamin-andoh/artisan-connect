const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ArtisanCategory = sequelize.define('ArtisanCategory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  artisanProfileId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'artisan_categories',
  timestamps: false,
});

module.exports = ArtisanCategory;
