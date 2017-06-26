'use strict';

var express = require('express'),
    logger = require('../../helpers/logger'),
    router = express.Router(),
    user_repo = require("../../repositories/user_repository"),
    token_repo = require("../../repositories/token_repository"),
    q = require("q");

var config = require("config");
let helper = require("../../helpers/helpers");

router.post("/login", function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    // Return error if no email provided
    if (!email) {
        return res.status(422).json({
            error_code: 6,
            message: 'You must enter an email address.'
        });
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({
            error_code: 6,
            message: 'You must enter a password.'
        });
    }

    user_repo.findByEmail(email).then(function(user){
        if(!user){
            return res.status(401).send({
                error_code: 6,
                message: 'That email address is not exists, please register!'
            });
        }else{
            if(helper.compare_password(password, user.u_password)){
                user = user.dataValues;
                delete user.u_password;
                delete user.u_salt;

                // Generate token with exprire time by hours
                let access_token = helper.generate_token(user, config.get("jwt.jwt_secret"), config.get("jwt.expired_at") + "h");
                token_repo.create({
                    user_id: user.u_id,
                    access_token: access_token,
                    expired_at: helper.create_expires_date(),
                    created_at: new Date()
                }).then(function(result){
                    let token = result.dataValues;

                    return res.status(200).json({
                        error_code: 0,
                        access_token: access_token,
                        user: user
                    });
                }).catch(function(err){
                    logger.error(err);
                    return res.status(401).send({
                        error_code: 2,
                        message: 'Could not generate token'
                    });
                })
            }else{
                return res.status(401).json({
                    error_code: 2,
                    message: "Password is not correct"
                });
            }
        }
    }).catch(function(err){
        logger.error(err);
        return res.status(500).send({
            error_code: 6,
            message: 'Something is wrong when check isexist, Please try again.'
        });
    });
});

router.post("/register", function(req, res) {
    // Check for registration errors
    let email = req.body.email;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let password = req.body.password;
    let type = req.body.type;

    // Return error if no email provided
    if (!email) {
        return res.status(422).json({
            error_code: 6,
            message: 'You must enter an email address.'
        });
    }

    // Return error if no password provided
    if (!password) {
        return res.status(422).send({
            error_code: 6,
            message: 'You must enter a password.'
        });
    }

    user_repo.findByEmail(email).then(function(result){
        if(result){
            return res.status(422).send({
                error_code: 6,
                message: 'That email address is already in use.'
            });
        }else{
            let saltRounds = config.get("salt_factor");
            let salt = helper.get_salt(saltRounds);
            let hash = helper.hash_password(password, salt);

            user_repo.create({
                u_email: email,
                u_first_name: first_name,
                u_last_name: last_name,
                u_password: hash,
                u_salt: salt,
                u_type: type
            }).then(function(user){
                if(user){
                    user = helper.normalize_user(user.dataValues);

                    return res.status(200).send({
                        error_code: 0,
                        message: 'Register is success.',
                        user: user
                    });
                }else{
                    logger.error("Could not create new user");
                    return res.status(500).json({
                        error_code: 6,
                        message: 'Could not create new user'
                    });
                }
            }).catch(function(err){
                logger.error(err);
                return res.status(422).send({
                    error_code: 6,
                    message: 'Something is wrong when create new user, Please try again.'
                });
            });
        }
    }).catch(function(err){
        logger.error(err);
        return res.status(422).send({
            error_code: 6,
            message: 'Something is wrong when check isexist, Please try again.'
        });
    });
});

module.exports =router;
