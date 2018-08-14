const
  config = require('config'),
  jwt = require('jsonwebtoken');

const User = require('../accounts/accounts.model');

exports.loginPage = (_, res) =>
  res.render('Auth/login');

exports.login = (req, res) => {
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err || !user) res.redirect('/logout');
    if (!user.authenticate(req.body.password)) {
      return res.redirect('/logout?error=password');
    }
    const token = jwt.sign({
      _id: user._id,
    }, config.get('jwtSecretKey'), {
      expiresIn: '1d',
    });

    req.session = {
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
    };

    return res.redirect('/');
  });
};

exports.profilePage = (req, res) => {
  User.findById(req.auth._id, (err, user) => {
    if (err) console.log(err);
    return res.redirect('Auth/profile', { user });
  }).select('-passwordHash -salt -__v');
};
