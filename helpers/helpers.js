'use strict';

const bcrypt = require('bcrypt-nodejs');
const jwt = require("jsonwebtoken");
const moment = require("moment");
var config = require("config");

/**
 * [hash_password description]
 * @param  {String} password [description]
 * @param  {string} salt     [description]
 * @return {string} hash_password [description]
 */
function hash_password(password, salt){
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}

/**
 * [get_salt description]
 * @param  {number} salt_factor [description]
 * @return {string} salt        [description]
 */
function get_salt(salt_factor){
    let salt = bcrypt.genSaltSync(salt_factor);
    return salt;
}

/**
 * [compare_password description]
 * @param  {string} password [raw_password]
 * @param  {string} hash_password    [hash_password]
 * @return {boolean}          [description]
 */
function compare_password(password, hash){
    return bcrypt.compareSync(password, hash);
}

/**
 * [generate_token description]
 * @param  {Object} user       [description]
 * @param  {string} secret     [description]
 * @param  {Date or String} expired_at [description]
 * @return {string} token           [description]
 */
function generate_token(user, secret, expired_at) {
    return jwt.sign(user, secret, {
        expiresIn: expired_at // in seconds
    });
}

/**
 * [decode_token description]
 * @param  {string} access_token [description]
 * @param  {string} secret       [description]
 * @return {Object} payload      [description]
 */
function decode_token(access_token, secret) {
    return jwt.verify(access_token, secret);
}

function normalize_user(user){
    let secret_fields = ["u_password", "u_salt"];
    for(let i = 0; i < secret_fields.length; i++){
        delete user[secret_fields[i]];
    }

    return user;
}

/**
 * [create_expires_date description]
 * @return {expires_date} [description]
 */
function create_expires_date() {
    var time = config.get("jwt.expired_at");
    var today = moment.utc();
    var expires_at = moment(today).add(time, 'hours').format(config.get('time_format'));

    return expires_at;
}


module.exports = {
    get_salt: get_salt,
    hash_password: hash_password,
    compare_password: compare_password,
    generate_token: generate_token,
    decode_token: decode_token,
    normalize_user: normalize_user,
    create_expires_date: create_expires_date
}