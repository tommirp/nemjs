const express = require('express');

const {
  login,
  loginPage,
  profilePage,
} = require('./auth.controller');

const { isLoggedIn } = require('../helpers/isLoggedIn.middleware');

const router = express.Router();

router.route('/login')
  .get(loginPage)
  .post(login);

router.route('/me')
  .get(isLoggedIn, profilePage);

module.exports = router;
