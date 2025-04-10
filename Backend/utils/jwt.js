const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_EXPIRATION } = require('../constants/constant')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = ACCESS_TOKEN_EXPIRATION;

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = {
  generateToken,
  verifyToken,
};
