'use strict';

var models = require("../models");

var TokenRepository = {
    findAll: function(){
        return models.tokens.findAll();
    },
    findByAccessToken: function(access_token){
        return models.tokens.find({
            where: {
                access_token: access_token
            }
        });
    },
    findById: function(id){
        return models.tokens.find({
            where: {
                id: id
            }
        });
    },
    create: function(token){
        return models.tokens.create(token);
    }
}

module.exports = TokenRepository;