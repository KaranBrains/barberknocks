const jwt = require('jsonwebtoken');
require('dotenv').config();
const config = require('../config/config');

exports.createToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, name: user.fullName ,role: user.role ,isEmailVerified : user.isEmailVerified, isNumberVerified: user.isNumberVerified , phone:user.phone}, config.jwtSecret, {
    expiresIn: 60 * 60 * 12 * 24 // expires in 24 days
  });
}