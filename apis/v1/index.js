'use strict';

var express = require('express'),
    router = express.Router();

router.use('/demo', require('./demo'));
router.use('/auth', require('./auth_api'));

router.all('/users*', [require('../../middlewares/auth')]);
router.use('/users', require('./users_api'));

module.exports = router;
