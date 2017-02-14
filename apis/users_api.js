var express = require('express'),
    logger = require('../helpers/logger'),
    router = express.Router(),
    user_repo = require("../repositories/user_repository"),
    q = require("q");

var config = require("config");
let helper = require("../helpers/helpers");

router.post("/login", function(req, res) {
    // var data_res = user_repo.findAll();

    // data_res.then(function(rows){
    //     res.status(200).json({
    //         error_code: 0,
    //         message: "Get Demo API SUCCESS",
    //         data: rows,
    //         count: rows.rowCount
    //     });
    // }).catch(function(err){
    //     logger.error(err);
    //     res.status(500).json({
    //         error_code: 6,
    //         message: "Get Demo API ERROR",
    //         data: null
    //     });
    // });
});

router.post("/register", function(req, res) {
    // Check for registration errors
    const email = req.body.email;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const password = req.body.password;
    const type = req.body.type;

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
                u_first_name: firstName,
                u_last_name: lastName,
                u_password: hash,
                u_salt: salt,
                u_type: type
            }).then(function(user){
                if(user){
                    user = helper.normalize_user(user.dataValues);
                    let access_token = helper.generate_token(user, config.get("jwt.jwt_secret"), config.get("jwt.expired_at"));

                    return res.status(200).send({
                        error_code: 0,
                        message: 'Register is success.',
                        user: user,
                        access_token: access_token
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

router.get("/", function(req, res) {
    var data_res = user_repo.findAll();

    data_res.then(function(rows){
        res.status(200).json({
            error_code: 0,
            message: "Get Demo API SUCCESS",
            data: rows,
            count: rows.rowCount
        });
    }).catch(function(err){
        logger.error(err);
        res.status(500).json({
            error_code: 6,
            message: "Get Demo API ERROR",
            data: null
        });
    });
});

module.exports =router;