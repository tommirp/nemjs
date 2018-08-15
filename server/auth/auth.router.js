const
  express = require('express'),
  router = express.Router();

const {
  loginPage,
  login,
  logout,
} = require('./auth.controller');

router.route('/login')
  .get(loginPage)
  .post(login);

router.route('/logout')
  .get(logout);

module.exports = router;
