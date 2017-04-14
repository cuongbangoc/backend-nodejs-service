'use strict';

const bcrypt = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");

var config = require("config");

function hash_password(password, salt){
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}

function get_salt(salt_factor){
    let salt = bcrypt.genSaltSync(salt_factor);
    return salt;
}

function compare_password(password, hash){
    return bcrypt.compareSync(password, hash);
}

function generate_token(user, secret, expired_at) {
    return jwt.sign(user, secret, {
        expiresIn: expired_at // in seconds
    });
}

function normalize_user(user){
    let secret_fields = ["u_password", "u_salt"];
    for(let i = 0; i < secret_fields.length; i++){
        delete user[secret_fields[i]];
    }

    return user;
}

module.exports = {
    get_salt: get_salt,
    hash_password: hash_password,
    compare_password: compare_password,
    generate_token: generate_token,
    normalize_user: normalize_user
}