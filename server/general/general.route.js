const express = require('express');

const {
  dashboard,
} = require('./general.controller');

const { isLoggedIn } = require('../helpers/isLoggedIn.middleware');

const router = express.Router();

router.route('/')
  .get(isLoggedIn, dashboard);

module.exports = router;
