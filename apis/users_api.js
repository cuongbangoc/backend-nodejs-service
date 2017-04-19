'use strict';

var express = require('express'),
    logger = require('../helpers/logger'),
    router = express.Router(),
    user_repo = require("../repositories/user_repository"),
    q = require("q");

var config = require("config");
let helper = require("../helpers/helpers");

router.get("/", function(req, res) {
    var current_user = req.app.get("current_user");
    var data_res = user_repo.findAll();

    data_res.then(function(rows){
        res.status(200).json({
            error_code: 0,
            message: "Get Users API SUCCESS",
            data: rows,
            count: rows.rowCount
        });
    }).catch(function(err){
        logger.error(err);
        res.status(500).json({
            error_code: 6,
            message: "Get Users API ERROR",
            data: null
        });
    });
});

module.exports =router;