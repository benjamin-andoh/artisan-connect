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
  userType: {
    type: DataTypes.ENUM('customer', 'artisan'),
    defaultValue: 'customer',
    allowNull: false
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
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },

        afterCreate: async (user, options) => {
      const { ArtisanProfile } = require('./ArtisanProfile');
      const { CustomerProfile } = require('./CustomerProfile');

      if (user.userType === 'artisan') {
        await ArtisanProfile.create({
          userId: user.id,
          bio: 'Your artisan bio goes here...',
          skills: [],
          location: '',
        });
      } else if (user.userType === 'customer') {
        await CustomerProfile.create({
          userId: user.id,
          address: '',
          phone: '',
        });
      }
    }
  },
});

module.exports = User;
