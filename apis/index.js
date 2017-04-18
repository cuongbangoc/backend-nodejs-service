'use strict';

var express = require('express'),
    router = express.Router();
// add modification header
router.use(function(req, res, next) {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

router.use('/api/v1/demo', require('./demo'));
router.use('/api/v1/auth', require('./auth_api'));

router.all('/api/v1/users*', [require('../middlewares/auth')]);
router.use('/api/v1/users', require('./users_api'));

module.exports = router;
