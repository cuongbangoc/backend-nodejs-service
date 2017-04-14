'use strict';

var models = require("../models");

var UserRepository = {
    findAll: function(){
        return models.users.findAll();
    },
    findByEmail: function(email){
        return models.users.find({
            where: {
                u_email: email
            }
        });
    },
    findById: function(id){
        return models.users.find({
            where: {
                u_id: id
            }
        });
    },
    create: function(user){
        console.log(user);
        return models.users.create(user);
    }
}

module.exports = UserRepository;