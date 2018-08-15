const express = require('express');

const {
  dashboard,
} = require('./general.controller');

const {
  loginCheck,
} = require('../@middlewares/loginCheck');

const router = express.Router();

router.route('/')
  .get(dashboard);

module.exports = router;
