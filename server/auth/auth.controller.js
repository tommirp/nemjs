const
  config = require('config'),
  jwt = require('jsonwebtoken');

const User = require('../@models/accounts');

exports.loginPage = (_, res) =>
  res.render('Auth/login');

exports.login = (req, res) => {
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (!user || err) res.redirect('/auth/logout');
    if (!user.authenticate(req.body.password)) {
      return res.redirect('/auth/logout?error=password');
    }
    const token = jwt.sign({
      _id: user._id,
    }, config.get('jwtSecretKey'), {
      expiresIn: '1d',
    });

    req.session = {
      token,
      _id: user._id,
    };

    return res.redirect('/');
  });
};

exports.profilePage = (req, res) => {
  User.findById(req.session._id, (err, user) => {
    if (err) console.log(err);
    return res.redirect('Auth/profile', { user });
  }).select('-passwordHash -salt -__v');
};

exports.logout = (req, res) => {
  req.session = {};
  return res.redirect('/auth/login');
};
