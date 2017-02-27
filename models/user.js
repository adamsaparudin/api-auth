'use strict';
const crypto = require('crypto');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {type: DataTypes.STRING, unique: true},
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: function(User) {
        User.salt = Math.random().toString(36).substring(2, 15)
        let hmac = crypto.createHmac('sha512', User.salt)
                         .update(User.password)
        User.password = hmac.digest('hex')
        User.role = "user"
      }
    }
  });
  return User;
};
