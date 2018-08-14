const
  jwt = require('jsonwebtoken'),
  config = require('config');

exports.isLoggedIn = (req, res, next, token) =>
  jwt.verify(token, config.get('jwtSecretKey'),
    (err, decoded) => {
      if (decoded.exp < Date.now() / 1000) req.session = {};
      next();
    });
