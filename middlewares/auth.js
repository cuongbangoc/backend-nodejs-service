'use strict';
var _ = require('lodash');
var config = require('config');
var logger = require('../helpers/logger');
var moment = require('moment');

// var app = require("../app");

module.exports = function(req, res, next) {
    return res.status(401).json({});
    // Authentication
    var access_token = req.query.access_token;
    access_token = access_token;

    // Add current user
    var current_user = {
        u_id: "guest",
        u_email: "",
        u_type: null,
        access_token: "",
        expired_at: ""
    };
    req.app.set("current_user", current_user);

    return next();
};
