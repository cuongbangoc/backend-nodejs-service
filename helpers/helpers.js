var bcrypt = require('bcrypt-nodejs');
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

module.exports = {
    get_salt: get_salt,
    hash_password: hash_password,
    compare_password: compare_password
}