const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailVerified: {
  type: DataTypes.BOOLEAN,
  defaultValue: false,
  },
  emailVerificationToken: {
  type: DataTypes.STRING,
  allowNull: true,
  defaultValue: uuidv4,
  },
}, {
  tableName: 'users',
  timestamps: true,

  hooks: {
    // Hash password before creating user
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    
    // Hash password if updated
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

const ArtisanProfile = require('./ArtisanProfile');
User.hasOne(ArtisanProfile, { foreignKey: 'userId' });
ArtisanProfile.belongsTo(User, { foreignKey: 'userId' });


module.exports = User;
