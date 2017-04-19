'use strict';
var _ = require('lodash');
var config = require('config');
var logger = require('../helpers/logger');
var moment = require('moment');

const helper = require('../helpers/helpers');
const token_repo = require('../repositories/token_repository');
// var app = require("../app");
module.exports = function(req, res, next) {
    if(req.method === "OPTIONS"){
        return next();
    }

    // Ignore unauthorization url from config
    var unauthorization = config.get('unauthorization');
    var path = req.url.split("?")[0];

    if (_.indexOf(unauthorization, path) < 0) {
        var access_token = req.headers['x-access-token'];
        if(!access_token){
            return res.status(401).json({
                error_code: 2,
                message: "Access Denied"
            });
        }

        token_repo.findByAccessToken(access_token).then(function(result){
            if(!result){
                return res.status(401).json({
                    error_code: 2,
                    message: "Token is not exists, Access Denied"
                });
            }

            // Check expired time for token
            let today = moment.utc();
            let expired_at = moment(result.expired_at, config.get('time_format'));
            if(expired_at.isBefore(today)){
                return res.status(401).json({
                    error_code: 2,
                    message: "Token is expired, please login again"
                });
            }

            let user = helper.decode_token(access_token, config.get("jwt.jwt_secret"));
            req.app.set("current_user", user);

            return next();
        }).catch(function(err){
            logger.error(err);
            return res.status(401).json({
                error_code: 2,
                message: "Access Denied"
            });
        });
    }else{
        return next();
    }
};
