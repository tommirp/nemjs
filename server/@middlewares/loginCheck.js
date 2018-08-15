const
  jwt = require('jsonwebtoken'),
  config = require('config');

exports.loginCheck = (req, res, next) => {
  jwt.verify(req.session.token, config.get('jwtSecretKey'),
    (err, decoded) => {
      if (err) console.log(err);
      if (decoded && decoded.exp > Date.now() / 1000) return next();
      return res.redirect('/auth/logout');
    });
};
